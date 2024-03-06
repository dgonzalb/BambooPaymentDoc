---
title: "Using Payouts API"
linkTitle: "Using Payouts API"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  The Payouts API allows you to request multiple payments using the balance available in your account.
weight: 10
---

To learn more about Payouts, refer to this [article](../overview.html).

## Configuring the authentication
All methods used in Payouts API require the following authentication headers.

| Key | Value | Comments |
|---|---|---|
| `Content-Type` | `application/json` | With this header, the request will be transmitted in _JSON_ format. |
| `Authorization` | `Basic {{MerchantPrivateKey}}` | Send the `{{MerchantPrivateKey}}` (your merchant identifier) and the word `Basic`.<br>Example: `Basic RVkeL-s86_iTzSMLvDtuyQ-1zqIcsmF-coSzncn_uFvQnj7b-B3rtZg__` |
| `DigitalSignature` | `{{DigitalSignature}}` | Signature to validate the transaction using the _HmacSHA256_ algorithm. This header is mandatory only for Payout creation. |

### Signing the message
Build the hash using the parameters `country`, `amount`, `currency`, `reference`, and `type` of the Request. When signing the onboarding contract with Bamboo, the `secret-key` and `MerchantPrivateKey` are provided to you.

#### Signature sample code
```javascript
var json = JSON.parse(request.data);
let signdata = {Country:json.country, Amount: json.amount,Currency:json.currency, Reference:json.reference, Type: json.type};
var data = JSON.stringify(signdata);
var hexHash = CryptoJS.HmacSHA256(data, secret-key);
var hash = hexHash.toString(CryptoJS.enc.Hex);
```

## API methods
The Payouts API offers four primary methods that you can use when requesting Payouts.

* [Get Bank list](#get-bank-list)
* [Payout Preview](#payout-preview)
* [Payout request](#payout-request)
* [Obtaining a Payout](#obtaining-a-payout)

### Get Bank list
This method lets you get the list of available banks in a country.

#### Request URL
You must invoke a **GET** request to the following URLs according to your needs.

* **Production**: `https://payout-api.bamboopayment.com/api/bank/country/{{Country}}`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/bank/country/{{Country}}`

Where `{{Country}}` represents the ISO code of the country you wish to inquire about, using the ISO 3166-2 format. [List of countries available for Payouts](../overview.html#coverage).

#### Response parameters

| Parameter | Format | Size | Description |
|---|:-:|:-:|---|
| `id` | `integer` | - | Internal identification of the bank. |
| `countryIsoCode` | `string` | 2 | Country to which the bank belongs.  |
| `bankCode` | `string` | 4 | Internal code of the bank used in the parameter `payee.bankaccount.codebank` when requesting a Payout. |
| `bankName` | `string` | - | Name of the bank. |

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

### Payout Preview
The Payout preview method allows you to show the final value received by the payee and the expected date when the payee will receive the money.

![PrintScreen](/assets/Payouts/Payouts12_en.png)

{{% alert title="Warning" color="warning"%}}
The Preview is for informational purposes only, and it does not freeze the exchange rate, which is frozen when you [request the Payout](#payout-request).
{{% /alert %}}

#### Request URL {#request-url-3}
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://payout-api.bamboopayment.com/api/payout/preview`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/payout/preview`

#### Request parameters {#request-parameters-1}
The following table shows the mandatory and optional parameters for the Payout preview.

| Field | Type | Mandatory? | Description |
|---|---|:-:|---|---|
| `amount` | `number` | Yes | Amount of the Payout, the format has two digits for decimals.<br>Example _100_ => _$ 1,00_. |
| `destinationCountryIsoCode` | `string(2)` | Yes | ISO code of the country in the format `ISO 3166-2`.<br>[List of countries available for Payouts](../overview.html#coverage). |
| `destinationCurrencyIsoCode` | `string(3)` | Yes <sup>*</sup> | ISO code of the destination currency.<br>[Find the currencies list here](../payouts-api/variables.html#currencies) |
| `originalCurrencyIsoCode` | `string(3)` | Yes | ISO code of the origin currency.<br>[Find the currencies list here](../payouts-api/variables.html#currencies) |

<sup>*</sup> _If the parameter is not provided, the system will default to the currency of the destination country (parameter `destinationCountryIsoCode`)._

#### Request example {#request-example-1}
```json
{
  "amount": 1000,
  "destinationCountryIsoCode": "CO",
  "destinationCurrencyIsoCode": "COP",
  "originalCurrencyIsoCode": "USD"
}
```
#### Response parameters {#response-parameters-2}

| Parameter | Format | Description |
|---|:-:|---|
| `amountInOrignalCurrency` | `number` | Value requested in the Payout preview. |
| `fee` | `number` | Amount charged by Bamboo to process the Payout. You or the payee can assume the fee according to your contract. |
| `amountToBeSentInOrignalCurrency` | `number` | The amount to be sent to the Payee, which is calculated as the difference between `amountInOrignalCurrency` and `fee`. |
| `exchangeRate` | `number` | Conversion value between the origin and target currencies. This parameter includes up to `5` decimal places. |
| `amountToBeSentInLocalCurrency` | `number` | The amount received by the payee, which is calculated by multiplying `amountToBeSentInOriginalCurrency` by `exchangeRate`.|
| `errors` | `object` | Errors that may appear. The error codes for this method start with `6`.<br>Find the possible errors [here]({{< ref "Payout-Error-Codes.md">}}). |
| `errors` → `ErrorCode` | `string` | Internal code of the error. Find the possible errors [here]({{< ref "Payout-Error-Codes.md">}}). |
| `errors` → `PropertyName` | `string` | Property that triggered the error. |
| `errors` → `Message` | `string` | Error description. |

#### Response example {#response-example-2}
```json
{
    "amountInOrignalCurrency": 10,
    "fee": 1.8369100168676186120617370001,
    "amountToBeSentInOrignalCurrency": 8.163089983132381387938263000,
    "exchangeRate": 3878.5558000000,
    "amountToBeSentInLocalCurrency": 31661.0,
    "expectedPaymentDate": "2024-01-26T00:00:00Z",
    "error": null
}
```

### Payout request
This method allows you to request one or more Payouts using the funds settled in your account.

#### Request URL
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://payout-api.bamboopayment.com/api/payout`
* **stage**: `https://payout-api.stage.bamboopayment.com/api/payout`

#### Request parameters
The following table shows the mandatory and optional parameters to create a Payout for all the countries.

| Field | Type | Mandatory? | Description |
|---|---|:-:|---|---|
| `country` | `string(2)` | Yes | ISO code of the country in the format `ISO 3166-2`.<br>[List of countries available for Payouts](../overview.html#coverage). |
| `amount` | `integer` | Yes | Amount of the Payout, the format has two digits for decimals.<br>Example _100_ => _$ 1,00_. |
| `currency` | `string(3)` | Yes | ISO code of the origin currency. This currency must meet the one configured in your account.<br>[Find the currencies list here](../payouts-api/variables.html#currencies). |
| `reason` | `string` | No | Description of the Payout. |
| `destinationCurrency` | `string(3)` | Yes | ISO code of the currency in which the beneficiary will receive the payout. This parameter is not required for **USD2L**_ and _**L2L**_ models, and the system will default to the currency of the destination country.<br>This currency must meet the [model]({{< ref  Payout-Concepts.md >}}#payout-models) of your account.<br>For example:<br><ul style="margin-bottom: initial;"><li>For _**USD2L**_, the `currency` parameter must be _USD_, and the `destinationCurrency` is optional.</li><li>For _**USD2USD**_, both `currency` and `destinationCurrency` must be _USD_.</li><li>For _**L2L**_, `currency` and `destinationCurrency` must be the chosen country's currency.</li></ul><br>[Find the currencies list here](../payouts-api/variables.html#currencies). |
| `reference` | `string` | Yes | Unique identifier of the Payout defined by you.<br>_It must be unique_. |
| `type` | `integer` | Yes | Payout type. Set any of the following values:<br><ul style="margin-bottom: initial;"><li>`1` for Cash</li><li>`2` for Bank Transfer</li><li>`3` for Wallet</li><li>`4` for Instant Bank Transfer in Brazil</li></ul>|
| `InstantPaymentData` → `PixDocument` | `string` | Yes<sup>1</sup> | The CPF/CNPJ number of the Payee configured as the PIX key.<br>_The number of digits for **CPF** must be 11, and **CNPJ** must be 14._ |
| `InstantPaymentData` → `PixEmail` | `string` | Yes<sup>1</sup> | The email address of the Payee configured as the PIX key.<br>_This parameter must be a valid email address._ |
| `InstantPaymentData` → `PixPhone` |`string` | Yes<sup>1</sup> | Phone number of the Payee configured as the PIX key.<br>_The phone number must start with `+55`._ |
| `InstantPaymentData` → `PixRandom` | `string` | Yes<sup>1</sup> | The random key the Payee generated as the PIX key. |
| `notification_Url` | `string` | No | Webhook to notify the result of the Payout. For more information about the configuration of this webhook, refer to this [article]({{< ref Payout-Webhook.md >}}). |
| `payee` → `FirstName` | `string` | Yes | First Name of the Payee. | 
| `payee` → `lastName `| `string` | Yes | Last Name of the Payee. | 
| `payee` → `email` | `string` | No | Email address of the Payee. |  
| `payee` → `phone` | `string` | No | Phone number of the Payee. | 
| `payee` → `address` | `string` | No | Address of the Payee. | 
| `payee` → `document` → `type` | `string` | Yes | Document type of the Payee.<br>[Find the document list here](../payouts-api/variables.html#document-types). |  
| `payee` → `document` → `number` | `string` | Yes | Document number of the Payee. | 
| `payee` → `bankaccount` → `number` | `string` | Yes<sup>2</sup> | Bank account number of the Payee.<br>Take into account the following considerations:<br><ul style="margin-bottom: initial;"><li>For Argentina, set the CBU/CVU.</li><li>For Mexico, set the CLABE number.</li></ul> |
| `payee` → `bankaccount` → `type` | `integer` | Yes<sup>2</sup> |  Account type of the Payee. Set `1` for Checking and `2` for Savings. |
| `payee` → `bankaccount` → `codebank` | `string` |  Yes<sup>2</sup> | Bank code of the Payee.<br>You can get the list of banks for a given country using the [_**Get Bank list**_ method](#get-bank-list). Alternatively, [find the bank list here](../payouts-api/variables.html#bank-codes). |  
| `payee` → `bankaccount` → `branch` | `string` | No | Branch code of the Payee's bank. This field applies only to Brazil and is mandatory when using Bank transfer as the Payout type. | 

<sup>1</sup> _Applies only to Brazil using Instant Bank Transfer. Otherwise, the object_ `payee.InstantPaymentData` _and its parameters must not be present in the request._<br>
<sup>2</sup> _When using Bank transfer, these parameters are mandatory for_ ***ALL*** _countries. For Instant Bank Transfer in Brazil, the object_ `payee.bankaccount` _and its parameters must not be present in the request._


#### Request example
Refer to the corresponding tab according to the payee's country.


{{< tabs tabTotal="7" tabID="countries" tabName1="Argentina" tabName2="Brazil" tabName3="Chile" tabName4="Colombia" tabName5="Mexico" tabName6="Peru" tabName7="Uruguay" >}}
{{< tab tabNum="1" >}}
<br>

**USD2L**

```json
{
  "country": "AR",
  "amount": 1000,
  "currency": "USD",
  "destinationCurrency":"ARS",
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
      "type": "CUIL",
      "number": "12345678901"
    },
    "bankAccount": {
      "number": "0071234567890123456789",
      "type": 1,
      "codeBank": "7"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**L2L**

```json
{
  "country": "AR",
  "amount": 1000,
  "currency": "ARS",
  "reason": "string",
  "destinationCurrency":"ARS",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Sara",
    "lastName": "Jáquez",
    "email": "sarasouez@mail.com",
    "phone": "099999999",
    "address": "Francisco  51 Gral. Ximena, AR-H 0376",
    "document": {
      "type": "CUIL",
      "number": "12345678901"
    },
    "bankAccount": {
      "number": "0071234567890123456789",
      "type": 1,
      "codeBank": "7"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

As mentioned before, the object `payee.bankaccount` must not be present in the request. Therefore, when using _Instant Bank Transfer_ you need to send the request as follows:

**USD2L**

```json
{
  "country": "BR",
  "amount": 100,
  "currency": "USD",
  "destinationCurrency":"BRL",
  "reason": "string",
  "reference": "PayOut34",
  "type": 4,
  "InstantPaymentData": {
    "PixEmail":"tcosta@mail.com" // Can also be PixDocument, PixPhone, or PixRandom
  },
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**L2L**

```json
{
  "country": "BR",
  "amount": 100,
  "currency": "BRL",
  "destinationCurrency":"BRL",
  "reason": "string",
  "reference": "PayOut34",
  "type": 4,
  "InstantPaymentData": {
    "PixEmail":"tcosta@mail.com" // Can also be PixDocument, PixPhone, or PixRandom
  },
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}


{{< tab tabNum="3" >}}
<br>

**USD2L**

```json
{
  "country": "CL",
  "amount": 1000,
  "currency": "USD",
  "destinationCurrency":"CLP",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Mercedes",
    "lastName": "Garrido",
    "email": "merceddo@mail.com",
    "phone": "099999999",
    "address": "Camino Franco, 13, Atico 4, 93631, L Garay",
    "document": {
      "type": "CI",
      "number": "26068762K"
    },
    "bankAccount": {
      "number": "1234567890123450",
      "type": 1,
      "codeBank": "1"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**L2L**

```json
{
  "country": "CL",
  "amount": 1000,
  "currency": "CLP",
  "destinationCurrency":"CLP",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Mercedes",
    "lastName": "Garrido",
    "email": "merceddo@mail.com",
    "phone": "099999999",
    "address": "Camino Franco, 13, Atico 4, 93631, L Garay",
    "document": {
      "type": "CI",
      "number": "26068762K"
    },
    "bankAccount": {
      "number": "1234567890123450",
      "type": 1,
      "codeBank": "1"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< tab tabNum="4" >}}
<br>

**USD2L**

```json
{
  "country": "CO",
  "amount": 100,
  "currency": "USD",
  "destinationCurrency":"COP",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Diego",
    "lastName": "Silva",
    "email": "dsilva@mail.com",
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**L2L**

```json
{
  "country": "CO",
  "amount": 100,
  "currency": "COP",
  "reason": "string",
  "destinationCurrency":"COP",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Diego",
    "lastName": "Silva",
    "email": "dsilva@mail.com",
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< tab tabNum="5" >}}
<br>

**USD2L**

```json
{
  "country": "MX",
  "amount": 1000,
  "currency": "USD",
  "destinationCurrency":"MXN",
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**L2L**

```json
{
  "country": "MX",
  "amount": 1000,
  "currency": "MXN",
  "reason": "string",
  "destinationCurrency":"MXN",
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< tab tabNum="6" >}}
<br>

**USD2L**

```json
{
  "country": "PE",
  "amount": 1000,
  "currency": "USD",
  "destinationCurrency":"PEN",
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**L2L**

```json
{
  "country": "PE",
  "amount": 1000,
  "currency": "PEN",
  "reason": "string",
  "destinationCurrency":"PEN",
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**USD2USD**

```json
{
  "country": "PE",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "destinationCurrency":"USD",
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< tab tabNum="7" >}}
<br>

**USD2L**

```json
{
  "country": "UY",
  "amount": 1000,
  "currency": "USD",
  "destinationCurrency":"UYU",
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**L2L**
```json
{
  "country": "UY",
  "amount": 1000,
  "currency": "UYU",
  "reason": "string",
  "destinationCurrency":"UYU",
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
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< /tabs >}}

#### Responses
* `Ok`: HttpCode `200`.<br>
Message received correctly, at this point the Payout starts to be processed.

**Response body**
```json
{
    "payoutId": 145,
    "status": 5,
    "statusDescription": "Received",
    "reference": "PayOut34",
    "errors": []
}
```
<br>
Where:

| Field | Description |
|---|---|
| `payoutId` | Internal identifier of the Payout. |
| `status` | Internal code of the current status of the Payout. |
| `statusDescription` | Current status of the Payout. Refer to [this article]({{< ref "Payout-Status.md" >}}) to learn more about Payout status. |
| `reference` | Unique identifier of the Payout you defined when you requested the Payout. |
| `errors` | Errors that may appear. Find the possible errors [here]({{< ref "Payout-Error-Codes.md">}}). |

* `BadRequest`: HttpCode `HttpCode 400`.<br>
The validation of the message failed, and the Payout is **Declined**.

**Response body**
```json
{
    "errors": [
        {
            "ErrorCode": "ExactLengthValidator",
            "PropertyName": "Country",
            "Message": "'Country' must be 2 characters in length. You entered 1 characters."
        }
    ]
}
```
<br>

* `Unauthorized`: HttpCode `401`.<br>
Authorization error.

* `Conflict` - `Declined`: HttpCode `HttpCode 409`.<br>
The validation of the message was successful, but the Payout is **Declined** due to business rules.

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
    ]
}
```

### Obtaining a Payout
This method allows you to retrieve the information of a Payout. You can retrieve the Payouts using the generated identifier (ID) or the reference you provided when requesting the Payout.

#### Request URL
You must invoke a **GET** request to the following URLs according to your needs.

* **Production**: `https://payout-api.bamboopayment.com/api/payout`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/payout`

To get the payout, include the following endpoints according to your needs.

* **Using Payout ID**: `{{URL}}/api/payout/{{PayoutID}}`
* **Using Payout Reference**: `{{URL}}/api/payout/reference/{{PayoutReference}}`

#### Response parameters

| Parameter | Format | Description |
|---|:-:|---|
| `payoutId` | `integer` | Internal identification of the Payout. |
| `reference` | `string` | Unique identifier of the Payout you defined when you requested the Payout. |
| `isoCountry` | `string` | ISO code of the country in format `ISO 3166-2`. |
| `created` | `date` | Date and time when the Payout was requested. |
| `lastUpdate` | `date` | Date and time of the last update of the Payout. |
| `status` | `integer` | Internal code of the current status of the Payout. |
| `statusDescription` | `string` | Current status of the Payout. Refer to [this article]({{< ref "Payout-Status.md" >}}) to learn more about Payout status. |
| `errorCode` | `string` | Internal code of the error for the declined Payout. Find the possible errors [here]({{< ref "Payout-Error-Codes.md">}}). |
| `errorDescription` | `string` | Error description for declined Payouts. |
| `amount` | `object` | Value and currency requested in the Payout. |
| `localAmount` | `object` | Value and currency requested in the Payout in local currency. |
| `exchangeRate` | `numeric` | Conversion value used in the Payout. |
| `payee` | `object` | Information of the recipient or beneficiary of the Payout.  |


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