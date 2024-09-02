---
title: "Direct Tokenization for PCI Merchants"
linkTitle: "Direct Tokenization for PCI Merchants"
date: 2023-07-17T07:28:16-05:00
description: >
  If your commerce is **PCI-compliant**,  this functionality allows you to create the tokens for the cards used in your Web through API, so you don't need to invoke the [Checkout Form]({{< ref "Checkout-Form.md" >}}). 
weight: 30
tags: ["subtopic"]
---

{{% alert title="Note" color="info"%}}
Contact your sales representative to enable this feature.
{{% /alert %}}

## Request URL
Regardless of the token you want to create, You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://directtoken.bamboopayment.com/api/Token?commerceKey={{Merchant Private Key}}`
* **Stage**: `https://directtoken.stage.bamboopayment.com/api/Token?commerceKey={{Merchant Private Key}}`

Where `{{Merchant Private Key}}` is your merchant identifier.

## Setting the language of the response codes
You can receive the error description by relying on localization features. You must send the `lang` header in your integration using any of the following languages in **ISO 639-1** format to do this.

<div id="shortTable"></div>

| Code | Language |
|:-:|---|
| `en` | English.<br>_This is the default language. If you don't send this header or set a non-existent language, you will receive errors in this language._ |
| `es` | Spanish. |
| `pt` | Portuguese. |

## Request parameters

| Parameter | Type | Mandatory? | Description |
|---|---|---|---|
| `Email` | `string` | Yes | Email address of the cardholder. |
| `Pan` | `string` | Yes | Card number. |
| `CVV` | `string` | Yes | The security code of the card. |
| `Expiration` | `string` | Yes | Expiration date printed on the card. |
| `Titular` | `string` | Yes | Name of the cardholder. | 
| `CrossBorderData` → `TargetCountryISO` | `string` | No | Indicates the country of the cardholder. For _CrossBorder_ tokenization, this parameter is mandatory.<br>You can find the list of countries available [here](/en/docs/payment-methods.html#countries-table-iso-3166-1). |
| `CustomerId` | `string` | No | Identifier of the customer. If sent, the API generates a payment within the customer with a _Commerce Token_ (CT) for future use.<br>Refer to [create a customer]({{< ref Registered-users.md >}}#create-a-customer) for more information. | 

### Create a One Time Token (OTT) {#OTT}
This token allows you to store the card data for unique usage and is valid for 10 minutes. 

#### Request example
```json
{
    "Email": "rserrano@mail.com",
    "Pan": "5275412766556942",
    "CVV": "172",
    "Expiration": "07/26",
    "Titular": "Rodrigo Serrano",
    "CrossBorderData": {
        "TargetCountryISO": "AR"
    }
}
```


### Create a Commerce Token (CT) {#CT}
This token allows you to store the card data, which can be processed in any account.

#### Request example
```json
{
    "Email": "rserrano@mail.com",
    "Pan": "5275412766556942",
    "CVV": "172",
    "Expiration": "07/26",
    "Titular": "Rodrigo Serrano",
    "CrossBorderData": {
        "TargetCountryISO": "AR"
    },
    "CustomerId":251179
}
```

## Response parameters
Regardless of the token you create, you receive the following parameters in the response.

| Property | Type | Description |
|---|:-:|---|
| `TokenId` | `string` | Represents the registered payment method without exposing its sensitive data.<br>Use this data to carry out payment transactions through the registered card. |
| `IdCommerceToken` | `int` | Id of the token created. For OT, the id is `0` as we store it for 10 minutes at maximum. |
| `Created`| `date` | Date and time of the card tokenization.  |
| `Type` | `string` | Token type created. It can be `OneTime` for OT or `Commerce` for CT. |
| `Brand` | `string` | Name associated with the brand of the payment card, for example, `VISA`. | 
| `Owner` | `string` | Name of the cardholder. | 
| `Last4` | `string` | The last four digits of the card. | 
| `Bin` | `string` | The first six digits of the card number. This number identifies the issuing bank. | 
| `CardExpMonth` | `int` | Month of the expiration date. |
| `CardExpYear` | `int` | Year of the expiration date. |
| `IssuerBank` | `string` | Name of the Issuing Bank. |
| `CardType` | `string` | Type of the card. |
| `PaymentMediaId` | `int` | Identifier of the payment method. |
| `AffinityGroup` | `string` | Affinity program of the card. |
| `Error` | `object` | Error that the system can launch during the tokenization process. |

### Response example

**For One Time Token**

```json
{
    "TokenId": "OT__OnZr7uB0WcBIxTZDYgelObTuqbROpSxJ4jiYpVJ8SzQ_",
    "IdCommerceToken": 0,
    "Created": "2023-09-04T12:29:56.0351102",
    "Type": "OneTime",
    "Brand": "MasterCard",
    "Owner": "Rodrigo Serrano",
    "Last4": "0015",
    "Bin": null,
    "CardExpMonth": 8,
    "CardExpYear": 30,
    "Error": null,
    "IssuerBank": null,
    "CommerceAction": null,
    "CardType": "CreditCard",
    "Installments": null,
    "PaymentMediaId": 2,
    "AffinityGroup": null,
    "CardId": null
}
```
<br>

**For Commerce Token**

```json
{
    "TokenId": "CT__i10IcFjy3amyaNLK0D4isUI5PXmTO5ytnM5Xdz7VMRE_",
    "IdCommerceToken": 42909,
    "Created": "2023-09-04T12:29:10.4160761",
    "Type": "Commerce",
    "Brand": "MasterCard",
    "Owner": null,
    "Last4": "0015",
    "Bin": "529991",
    "CardExpMonth": 8,
    "CardExpYear": 30,
    "Error": null,
    "IssuerBank": null,
    "CommerceAction": null,
    "CardType": null,
    "Installments": null,
    "PaymentMediaId": 2,
    "AffinityGroup": null,
    "CardId": null
}
```
