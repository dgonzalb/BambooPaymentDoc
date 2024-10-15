---
title: "Refunds and voids"
linkTitle: "Refunds and voids"
date: 2023-08-02T08:46:32-05:00
Description: >
  Refunds and voids are related to the process of reversing a purchase already confirmed or the cancellation of a pre-authorized purchase.
weight: 40
tags: ["subtopic"]
---

Before we start, let's review some concepts.

* **Void**: A void is the act of canceling a pre-authorized transaction (rollback) before it is finalized or settled. When a transaction is voided, it is as if the purchase never occurred, and no money is transferred. Voids usually occur before the payment is fully processed, so the customer's payment method is not charged for the voided transaction.

* **Refund**: A refund, on the other hand, is a transaction that occurs when a customer returns a purchased item or cancels a service, and the merchant reimburses the customer for the amount paid. The refunded amount is usually returned to the original payment method used by the customer. Unlike voids, the refund occurs after the transaction has been settled.

## Setting the language of the response codes
You can receive the error description by relying on localization features. To do this, you need to send the `lang` header in your integration, using any of the following languages in **ISO 639-1** format.

<div id="shortTable"></div>

| Code | Language |
|:-:|---|
| `en` | English.<br>_This is the default language. If you don't send this header or set a non-existent language, you will receive errors in this language._ |
| `es` | Spanish. |
| `pt` | Portuguese. |

## Rollback a purchase
The _**rollback**_ operation is only available for purchases previously [authorized]({{< ref "purchase-operations.md" >}}#confirm-a-purchase) with state _PreAuthorized_.

{{% alert title="Note" color="info"%}}
Pre-authorization feature may not be supported by all payment methods and it's available for the following countries.

<div style="text-align: center;">

<a href="/en/docs/payment-methods/brazil.html"><img src="/assets/Flags/FlagBR.png" width="30" /></a>
<a href="/en/docs/payment-methods/chile.html"><img src="/assets/Flags/FlagCL.png" width="30" /></a>
<a href="/en/docs/payment-methods/colombia.html"><img src="/assets/Flags/FlagCO.png" width="30" /></a>
<a href="/en/docs/payment-methods/uruguay.html"><img src="/assets/Flags/FlagUY.png" width="30" /></a>

</div>

{{% /alert %}}

<!--
### Considerations
_To be defined_
-->

### Request URL
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/rollback`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/rollback`

<!--
## Refund a purchase
The _**refund**_ operation is only available for purchases with state _Approved_. Refunds can be total or partial.

### Request URL
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/refund`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/refund`
-->

### Request parameters
Request body is not required to rollback a purchase. If you don't send any request the purchase will be voided with its original amount. 

The amount to be void may vary with respect to the one that was sent in the initial Purchase process, but the new amount cannot be higher than the original amount.

#### Request example
To perform the rollback of a purchase with a lower amount than the original, you need to include the new amount in the request. For example:

```json
{
  "Amount": 50
}
```

### Response parameters
When you perform the rollback, you will get the same `Response` object [returned]({{< ref "purchase-operations.md" >}}#response-parameters).

## Refund a purchase
The _**refund**_ operation is only available for purchases with state _Approved_. Refunds can be total or partial.

<!--
### Considerations
_To be defined_
-->

### Request URL
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v2/api/purchase/{{PurchaseId}}/refund`
* **Stage**: `https://api.stage.bamboopayment.com/v2/api/purchase/{{PurchaseId}}/refund`

### Request parameters
Consider the following parameters when invoking a refund request.

| Parameter | Type | Mandatory | Description |
|---|---|---|---|---|
| `Amount` | `number` | No | Amount to be refunded (Partial refund). If this parameter is not send, the refund will be for the amount of the purchase (Total refund).<br>If you require to include decimals in the amount, concatenate the decimal places without de decimal point. Example: `12,25` > `1225`.<br>This value **cannot** be higher than the original amount of the purchase. |
| `MetadataIn`  → `Description` | `string` | No | Optional description for the refund. |

#### Request example 

```json
{
  "Amount":"2500",
  "MetadataIn": {
    "Description": "Refund description"
  }
}
```

### Response parameters

| Parameter | Type | Description |
|---|---|---|
| `Response` → `PurchaseRefundId` | `number` | Internal identifier of the refund. |
| `Response` → `Created` | `date` | Date and time when the refund was created.<br>Date format _**ISO-8601**_. |
| `Response` → `Amount` | `number` | Refund amount as sent in the request. |
| `Response` → `Currency` | `string` | Currency of the refund, according to ISO-4217 (alphanumeric codes). |
| `Response` → `StatusId` | `number` | Identifier of the refund status. |
| `Response` → `Status` | `string` | Description of the refund status. |
| `Response` → `AuthorizationCode` | `string` | Refund code returned by the acquirer of the transaction. |
| `Response` → `Code` | `string` | Error code returned by the acquirer of the transaction. |
| `Response` → `Description` | `string` | Description returned by the acquirer of the transaction. |
| `Response` → `MetadataOut` | `object` | Additional information returned by the acquirer. |
| `Errors` → `ErrorCode` | `string` | Error code returned by Bamboo. |
| `Errors` → `Created` | `string` | Date and time when the error was generated. |
| `Errors` → `Message` | `string` | Descriptive text of the error. |
| `Errors` → `Detail` | `string` | Error detail. |

#### Response example

```json
{
    "Response": {
        "PurchaseRefundId": 1246459,
        "Created": "2023-09-22T13:46:47.089",
        "Amount": 100.00,
        "Currency": "CLP",
        "StatusId": 10,
        "Status": "Refund_OK",
        "AuthorizationCode": null,
        "Code": "0",
        "Description": "REVERSED",
        "MetadataOut": null
    },
    "Errors": []
}
```
