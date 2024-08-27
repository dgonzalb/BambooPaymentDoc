---
title: "Getting Started"
linkTitle: "Getting Started"
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
* [Payouts Preview](payouts-preview.html)
* [Payout Request](using-payouts-api.html)
* [Obtaining a Payout](using-payouts-api.html#obtaining-a-payout)

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