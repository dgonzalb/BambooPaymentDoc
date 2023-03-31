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
All methods used in Payous API requires an authentication header, which is configured using the following parameters.

| Key | Value | Coments |
|---|---|---|
| `Content-Type` | `application/json` | This parameter causes the request to be sent in _json_ format.  |
| `Authorization` | `Basic {{MerchantPrivateKey}}` | Sent the `{{MerchantPrivateKey}}` (your merchant identifier) and the word `Basic`.<br>Example: `Basic RVkeLrs86_iTzSMLvDtuyQ-1zqIcsmFGcoSzncn_uFvQnj7bhB3rtZg__` |
| `DigitalSignature` | `{{DigitalSignature}}` | Signature to validate the transaction using _HmacSHA256_ algorithm |

### Signing the message
The hash to be sent is built using the parameters `country`, `amount`, `currency`, and `reference` of the Request. The `secret-key` and the `MerchantPrivateKey` is provied to you when sing the onboarding contract with Bamboo.

#### Signature sample code
```javascript
var json = JSON.parse(request.data);
let signdata = {Country:json.country, Amount: json.amount,Currency:json.currency, Reference:json.reference, Type: json.type};
var data = JSON.stringify(json);
var hexHash = CryptoJS.HmacSHA256(data, apiSignature);
var hash = hexHash.toString(CryptoJS.enc.Hex);
```

## API methods
Payouts API enable two main methods to be used during the request of Payouts.

### Get Bank list
This method allows you to get the list of available banks in a given country

#### Request URL
Use any to the follwoing URLS accoriding to your needs.

* **Production**: `https://payout-processing-engine.prod.bamboopayment.com/api/payout/Bank/country/{{Country}}`
* **Development**: `https://payout-processing-engine.dev.bamboopayment.com/api/payout/Bank/country/{{Country}}`

Where `{Country}}` is the ISO code of the country you want to consult in format `ISO 3166-2`.

#### Response parameters

| Parameter | Format | Size | Description |
|---|:-:|:-:|---|
| `id` | Integer |  | Internal identification of the bank. |
| `countryIsoCode` | String | 2 | Country to which the bank belongs.  |
| `bankCode` | Strting | 4 | Internal code of the bank used in the paremeter `payee.bankaccount.codebank` when requesting a Payout. |
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
Use any to the follwoing URLS accoriding to your needs.

* **Production**: `https://payout-api.prod.bamboopayment.com/api/payout`
* **Development**: `https://payout-api.dev.bamboopayment.com/api/payout`

#### Request parameters
| Field | Type | Required | Description |
|---|---|:-:|---|---|
| `country` | String(2) | Yes | ISO code of the country in format `ISO 3166-2`. |
| `amount` | Intenger | Yes | Amount of the payout, the format has two digits for decimals. Example 100 => USD 1,00 |
| `currency` | String(3) | Yes | ISO code of the currency.<br>_Only USD available_ |
| `reason` | String | No | Description of the payment. |
| `reference` | String | Yes | Unique identifier of the Payout defined by you.<br>_Must be unique_ |
| `type` | Intenger | Yes | Payout type.<br>Set `1` for Cash, `2` for Bank Transfer, and `3` for Wallet |
| `notification_Url` | String | No | Callbak to notify the result of the payour |
| `payee.FirstName` | String | Yes | First Name of the Payee. | 
| `payee.lastName `| String | Yes | Last Name of the Payee. | 
| `payee.email` | String | No | Email address of the Payee. |  
| `payee.phone` | String | No | Phone number of the Payee. | 
| `payee.address` | String | No |   | 
| `payee.document.type` | String | Yes | Document type of the Payee.<br>[Find the document list here](/payouts/payouts-api/variables.html#id-types). |
| `payee.document.number` | String | Yes | Document number of the Payee. | 
| `payee.bankaccount.number` | String | Yes<sup>*</sup> | Bank account number of the Payee. |
| `payee.bankaccount.type` | Intenger | Yes<sup>*</sup> |  Account type of the Payee. Set `1` for Checking, and `2` for Savings. |
| `payee.bankaccount.codebank` | String |  Yes<sup>*</sup> | Bank code of the Payee. | 
| `payee.bankaccount.branch` | String | No | Branch code of the Payee's bank. | 

 <sup>*</sup> _Only for bank transfers; otherwise, the parameter is not required_.

 #### Request example
```json
{
  "country": "CO",
  "amount": 100,
  "currency": "USD",
  "reason": "string",
  "reference": "PAB-34",
  "type": 1,
  "payee": {
    "firstName": "Juan",
    "lastName": "Perez",
    "email": "jperez@mail.com",
    "phone": "099999999",
    "address": "address",
    "document": {
      "type": "CC",
      "number": "11111111"
    },
    "bankAccount": {
      "number": "2288",
      "type": 1,
      "codeBank": "1007",
      "branch": "1"
    }
  },
  "notification_Url": "string"
}
```

#### Responses
* `Ok`: HttpCode `200`.<br>
Message received correctly, at this point the Payout starts to be processed

* `Unauthorized`: HttpCode `401`.<br>
Authorization error.

* `BadRequest`: HttpCode `HttpCode 400`.<br>
The validation of the message failed and the payout is **Declined**.

BadRequest Body:
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