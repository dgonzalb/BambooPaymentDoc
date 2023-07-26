---
title: "Using Payouts API"
linkTitle: "Using Payouts API"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  The Payouts API allows you to request multiple payments using the balance available in your account.
weight: 10
---

To learn more about Payouts, refer to this [article](/payouts/overview.html).

## Configuring the authentication
All methods used in Payouts API requires an authentication header, which is configured using the following parameters.

| Key | Value | Comments |
|---|---|---|
| `Content-Type` | `application/json` | This parameter causes the request to be sent in _json_ format.  |
| `Authorization` | `Basic {{MerchantPrivateKey}}` | Sent the `{{MerchantPrivateKey}}` (your merchant identifier) and the word `Basic`.<br>Example: `Basic RVkeLrs86_iTzSMLvDtuyQ-1zqIcsmFGcoSzncn_uFvQnj7bhB3rtZg__` |
| `DigitalSignature` | `{{DigitalSignature}}` | Signature to validate the transaction using _HmacSHA256_ algorithm. This header is only required for Payout creation. |

### Signing the message
The hash to be sent is built using the parameters `country`, `amount`, `currency`, and `reference` of the Request. The `secret-key` and the `MerchantPrivateKey` is provided to you when sing the onboarding contract with Bamboo.

#### Signature sample code
```javascript
var json = JSON.parse(request.data);
let signdata = {Country:json.country, Amount: json.amount,Currency:json.currency, Reference:json.reference, Type: json.type};
var data = JSON.stringify(signdata);
var hexHash = CryptoJS.HmacSHA256(data, secret-key);
var hash = hexHash.toString(CryptoJS.enc.Hex);
```

## API methods
Payouts API enable two main methods to be used during the request of Payouts.

### Get Bank list
This method allows you to get the list of available banks in a given country

#### Request URL
Use any to the following URLS according to your needs.

* **Production**: `https://payout-api.bamboopayment.com/api/Bank/country/{{Country}}`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/Bank/country/{{Country}}`

Where `{{Country}}` is the ISO code of the country you want to consult in format `ISO 3166-2`. [Countries available for Payouts](/payouts/overview.html#coverage).

#### Response parameters

| Parameter | Format | Size | Description |
|---|:-:|:-:|---|
| `id` | Integer |  | Internal identification of the bank. |
| `countryIsoCode` | String | 2 | Country to which the bank belongs.  |
| `bankCode` | String | 4 | Internal code of the bank used in the parameter `payee.bankaccount.codebank` when requesting a Payout. |
| `bankName` | String |  | Name of the bank. |

#### Response example
```json
[
  {
    "id": 1,
    "countryIsoCode": "CO",
    "bankCode": "1002",
    "bankName": "BANCO POPULAR"
  },
  {
    "id": 3,
    "countryIsoCode": "CO",
    "bankCode": "1007",
    "bankName": "BANCOLOMBIA"
  },
  {
    "id": 4,
    "countryIsoCode": "CO",
    "bankCode": "1009",
    "bankName": "CITIBANK"
  },
  {
    ...
  }
]
```

### Payout request
This method allows you to request one or more Payouts using the funds settled in your account.

#### Request URL
Use any to the following URLS according to your needs.

* **Production**: `https://payout-api.bamboopayment.com/api/payout`
* **stage**: `https://payout-api.stage.bamboopayment.com/api/payout`

#### Request parameters
The following table shows the mandatory and optional parameters to create a Payout for all the countries.

| Field | Type | Mandatory? | Description |
|---|---|:-:|---|---|
| `country` | String(2) | Yes | ISO code of the country in format `ISO 3166-2`.<br>[Countries available for Payouts](/payouts/overview.html#coverage). |
| `amount` | Integer | Yes | Amount of the payout, the format has two digits for decimals.<br>Example _100_ => _USD 1,00_. |
| `currency` | String(3) | Yes | ISO code of the currency.<br>_Only USD available_. |
| `reason` | String | No | Description of the payment. |
| `reference` | String | Yes | Unique identifier of the Payout defined by you.<br>_Must be unique_. |
| `type` | Integer | Yes | Payout type. Set any of the following values:<br><ul style="margin-bottom: initial;"><li>`1` for Cash</li><li>`2` for Bank Transfer</li><li>`3` for Wallet</li><li>`4` for PIX</li></ul>|
| `notification_Url` | String | No | Callback to notify the result of the payout |
| `payee.FirstName` | String | Yes | First Name of the Payee. | 
| `payee.lastName `| String | Yes | Last Name of the Payee. | 
| `payee.email` | String | No | Email address of the Payee. |  
| `payee.phone` | String | No | Phone number of the Payee. | 
| `payee.address` | String | No | Address of the Payee. | 
| `payee.document.type` | String | Yes | Document type of the Payee.<br>[Find the document list here](/payouts/payouts-api/variables.html#id-types). |  
| `payee.document.number` | String | Yes | Document number of the Payee. | 
| `payee.bankaccount.number` | String | Yes<sup>*</sup> | Bank account number of the Payee.<br>Take into account the following considerations:<br><ul style="margin-bottom: initial;"><li>For Argentina, set the CBU/CVU.</li><li>For Mexico, set the CLABE number.</li></ul> |
| `payee.bankaccount.type` | Integer | Yes<sup>*</sup> |  Account type of the Payee. Set `1` for Checking, and `2` for Savings. |
| `payee.bankaccount.codebank` | String |  Yes<sup>*</sup> | Bank code of the Payee. | 
| `payee.bankaccount.branch` | String | No | Branch code of the Payee's bank. This field applies only for Brazil and is mandatory when using Bank transfer as Payout type. | 


<sup>*</sup> _When using Bank transfer, these parameters are mandatory for_ ***ALL*** _countries. For PIX, the object_ `payee.bankaccount` _and its parameters must not be present in the request._


#### Request example
Refer to the corresponding tab according to the payee's country.


{{< tabs tabTotal="7" tabID="countries" tabName1="Argentina" tabName2="Brazil" tabName3="Chile" tabName4="Colombia" tabName5="Mexico" tabName6="Peru" tabName7="Uruguay" >}}
{{< tab tabNum="1" >}}
<br>

```json
{
  "country": "AR",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Sara",
    "lastName": "Jáquez",
    "email": "sarasouez@mail.com",
    "phone": "099999999",
    "address": "Francisco  51 Gral. Ximena, AR-H 0376",
    "document": {
      "type": "DNI",
      "number": "123456789"
    },
    "bankAccount": {
      "number": "0071234567890123456789",
      "type": 1,
      "codeBank": "7"
    }
  },
  "notification_Url": "string"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

As mentioned before, the object `payee.bankaccount` must not be present in the request. Therefore, when using _PIX_ you need to send the request as follows:


```json
{
  "country": "BR",
  "amount": 100,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 4,
  "payee": {
    "firstName": "Tiago",
    "lastName": "Costa",
    "email": "tcosta@mail.com",
    "phone": "92799322",
    "address": "55489-272, Travessa Eduardo, 90 Esteves do Norte - CE",
    "document": {
      "type": "CPF",
      "number": "54562271779"
    }
  },
  "notification_Url": "string"
}
```
<br>

When using _Bank transfer_ you need to send the request as follows:

```json
{
  "country": "BR",
  "amount": 100,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Tiago",
    "lastName": "Costa",
    "email": "tcosta@mail.com",
    "phone": "92799322",
    "address": "55489-272, Travessa Eduardo, 90 Esteves do Norte - CE",
    "document": {
      "type": "CPF",
      "number": "54562271779"
    },
    "bankAccount": {
      "number": "12345678901234-5",
      "type": 1,
      "codeBank": "104",
      "branch": "1234"
    }
  },
  "notification_Url": "string"
}
```

{{< /tab >}}


{{< tab tabNum="3" >}}
<br>

```json
{
  "country": "CL",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Mercedes",
    "lastName": "Garrido",
    "email": "merceddo@mail.com",
    "phone": "099999999",
    "address": "Camino Franco, 13, Ático 4º, 93631, L' Garay",
    "document": {
      "type": "CI",
      "number": "12345678"
    },
    "bankAccount": {
      "number": "1234567890123450",
      "type": 1,
      "codeBank": "1"
    }
  },
  "notification_Url": "string"
}
```

{{< /tab >}}

{{< tab tabNum="4" >}}
<br>

```json
{
  "country": "CO",
  "amount": 100,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Juan",
    "lastName": "Perez",
    "email": "jperez@mail.com",
    "phone": "099999999",
    "address": "Cra 23 # 123-45 Apto 601",
    "document": {
      "type": "CC",
      "number": "11111111"
    },
    "bankAccount": {
      "number": "2288",
      "type": 1,
      "codeBank": "1007"
    }
  },
  "notification_Url": "string"
}
```
{{< /tab >}}

{{< tab tabNum="5" >}}
<br>

```json
{
  "country": "MX",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Rubén",
    "lastName": "Torres",
    "email": "rubentres@mail.com",
    "phone": "01 55 5601 7965",
    "address": "Coyoacan 2000",
    "document": {
      "type": "CURP",
      "number": "OEAF771012HMCRGR09"
    },
    "bankAccount": {
      "number": "123456789012345678",
      "type": 1,
      "codeBank": "2"
    }
  },
  "notification_Url": "string"
}
```

{{< /tab >}}

{{< tab tabNum="6" >}}
<br>

```json
{
  "country": "PE",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Ornela",
    "lastName": "Olivera",
    "email": "ornelera@mail.com",
    "phone": "099999999",
    "address": "Cl. Jesús Bueno # 64 Dpto. 229",
    "document": {
      "type": "DNI",
      "number": "12345678"
    },
    "bankAccount": {
      "number": "11487349",
      "type": 1,
      "codeBank": "2"
    }
  },
  "notification_Url": "string"
}
```

{{< /tab >}}

{{< tab tabNum="7" >}}
<br>

```json
{
  "country": "UY",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Daniel",
    "lastName": "Lorenzo",
    "email": "danielzo@mail.com",
    "phone": "999999999",
    "address": "12900 Montevideo",
    "document": {
      "type": "CI",
      "number": "38067788"
    },
    "bankAccount": {
      "number": "12345678912345",
      "type": 2,
      "codeBank": "999",
      "branch": "1"
    }
  },
  "notification_Url": "string"
}
```

{{< /tab >}}

{{< /tabs >}}

#### Responses
* `Ok`: HttpCode `200`.<br>
Message received correctly, at this point the Payout starts to be processed

**Response body**
```json
{
    "payoutId": 145,
    "status": 5,
    "statusDescription": "Received",
    "reference": "PayOut34",
    "errors": [],
    "statusCode": 200
}
```
<br>
Where:

| Field | Description |
|---|---|
| `payoutId` | Internal identifier of the Payout. |
| `status` | Internal code of the current status of the Payout. |
| `statusDescription` | Current status of the Payout. Refer to [this article]({{< ref "Payout-Status.md" >}}) to learn more about Payout status. |
| `reference` | Unique identifier of the Payout defined by you when the Payout was requested. |
| `errors` | Errors that may appear  |
| `statusCode` | HTTP code of the response. |

* `Unauthorized`: HttpCode `401`.<br>
Authorization error.

**Response body**
```json
{
    "statusCode": 401
}
```
<br>

* `BadRequest`: HttpCode `HttpCode 400`.<br>
The validation of the message failed and the payout is **Declined**.

**Response body**
```json
{
    "errors": [
        {
            "ErrorCode": "ExactLengthValidator",
            "PropertyName": "Country",
            "Message": "'Country' must be 2 characters in length. You entered 1 characters."
        }
    ],
    "statusCode": 400
}
```
<br>

* `Conflict` - `Declined`: HttpCode `HttpCode 409`.<br>
The validation of the message was successful but the payout is **Declined** due to business rules.

**Response body**
```json
{
    "payoutId": 1,
    "status": 8,
    "statusDescription": "Declined",
    "reference": "PayOut567",
    "errors": [
        {
            "ErrorCode": "B101",
            "PropertyName": "BankAccount",
            "Message": "BankAccount invalid"
        }
    ],
    "statusCode": 409
}
```

### Obtaining a Payout
This method allows you to retrieve the information of a Payout. You can retrieve the payouts by using either the generated identification (ID) or by using the reference that you provided when requesting the Payout.

#### Request URL
Use any to the following URLS according to your needs.

* **Production**: `https://payout-api.bamboopayment.com/api/payout`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/payout`

To get the payout, include the following endpoints according to your needs.

* **Using Payout ID**: `{{URL}}/api/Payout/{{PayoutId}}`
* **Using Payout Reference**: `{{URL}}/api/Payout/reference/{{PayoutReference}}`

#### Response parameters

| Parameter | Format | Description |
|---|:-:|---|
| `payoutId` | Integer | Internal identification of the payout. |
| `reference` | String | Unique identifier of the Payout defined by you when the Payout was requested. |
| `isoCountry` | String | ISO code of the country in format `ISO 3166-2`. |
| `created` | Date Time | Date when the Payout was requested. |
| `lastUpdate` | Date Time | Date of the last update of the Payout was. |
| `status` | Integer | Internal code of the current status of the Payout. |
| `statusDescription` | String | Current status of the Payout. Refer to [this article]({{< ref "Payout-Status.md" >}}) to learn more about Payout status. |
| `errorCode` | String | Internal code of the error for the declined Payout. |
| `errorDescription` | String | Error description for declined Payouts. |
| `amount` | Object | Value and currency requested in the payout. |
| `localAmount` | Object | Value and currency requested in the payout in local currency. |
| `exchangeRate` | Numeric | Conversion value used in the Payout. |
| `payee` | Object | Information of the recipient or beneficiary of the Payout.  |


#### Response example
```json
{
    "payoutId": 1100,
    "reference": "QA-545",
    "isoCountry": "CO",
    "created": "2023-06-02T15:15:34.475614Z",
    "lastUpdate": "2023-06-02T15:20:18.1507484Z",
    "status": 1,
    "statusDescription": "Paid",
    "errorCode": null,
    "errorDescription": null,
    "amount": {
        "value": 10.0,
        "isoCurrency": "USD"
    },
    "localAmount": {
        "value": 42843.0,
        "isoCurrency": "COP"
    },
    "exchangeRate": 4394.23,
    "payee": {
        "firstName": "Paul",
        "lastName": "Doe",
        "email": "pauld@test.com",
        "phone": "099999999",
        "address": "address",
        "document": {
            "number": "11111111",
            "type": "CC"
        }
    }
}
```