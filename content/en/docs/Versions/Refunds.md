---
title: "Refunds"
linkTitle: "Refunds"
date: 2024-08-02T08:46:32-05:00
Description: >
  Refunds and voids are related to the process of reversing a purchase already confirmed or the cancellation of a pre-authorized purchase.
weight: 30
tags: ["subtopic"]
---

## Refund a purchase
This endpoint allows you to process a refund for a previously completed purchase. You can refund either the full amount or a partial amount of the original transaction. The _**refund**_ operation is only available for purchases with state _Approved_.


### Request URL
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v3/api/purchase/{{PurchaseId}}/refund`
* **Stage**: `https://api.stage.bamboopayment.com/v3/api/purchase/{{PurchaseId}}/refund`

### Request parameters
Consider the following parameters when invoking a refund request.

| Parameter | Type | Mandatory | Description |
|---|---|---|---|---|
| `Amount` | `integer` (64 bits) | No | Amount to be refunded (Partial refund). If this parameter is not send, the refund will be for the amount of the purchase (Total refund).<br>If you require to include decimals in the amount, concatenate the decimal places without de decimal point. Example: `12,25` > `1225`.<br>This value **cannot** be higher than the original amount of the purchase. |
| `MetadataIn` | `object` |  No   | Additional metadata for the refund transaction. |
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
|-----------|------|-------------|
| `TransactionId` | `string` | Unique identifier for the refund transaction. |
| `Result` | `string` | The result of the refund operation (e.g., `COMPLETED`). |
| `Status` | `string` | The status of the refund (e.g., `APPROVED`, `PENDING`). |
| `ErrorCode` | `string` | Error code if the refund failed (null if successful). |
| `ErrorDescription` | `string` | Description of the error if the refund failed (null if successful). |
| `Created` | `string` | Timestamp of when the refund was initiated. |
| `AuthorizationDate` | `string` | Timestamp of when the refund was authorized. |
| `AuthorizationCode` | `string` | Authorization code for the refund transaction. |
| `Amount` | `integer` | The amount that was refunded. |
| `Currency` | `string` | The currency of the refund. |
| `MetadataOut` | `object` | Additional metadata returned with the refund response. |

#### Response example

**Result:**`COMPLETED` - **Status:** `APPROVED`

```json
{
    "TransactionId": "79632697147789184",
    "Result": "COMPLETED",
    "Status": "APPROVED",
    "ErrorCode": null,
    "ErrorDescription": null,
    "Created": "2024-09-02T15:58:13.078",
    "AuthorizationDate": "2024-09-02T15:58:18.334",
    "AuthorizationCode": "673531",
    "Amount": 25000,
    "Currency": "BRL",
    "MetadataOut": null
}
```
<br>

* **Pending Status:** A refund may remain in a pending status depending on the payment method and acquirer. This means that while the refund request has been initiated, it may not be processed immediately.

**Result:**`COMPLETED` - **Status:** `PENDING`

```json
{
    "TransactionId": "79632697147789184",
    "Result": "COMPLETED",
    "Status": "PENDING",
    "ErrorCode": null,
    "ErrorDescription": null,
    "Created": "2024-09-02T15:58:13.078",
    "AuthorizationDate": null,
    "AuthorizationCode": null,
    "Amount": 25000,
    "Currency": "BRL",
    "MetadataOut": null
}
```

<br>

* **Final Result Notification:** The final result of the refund will be notified through a [webhook]({{< ref "Notification-Webhooks.md" >}}). This ensures that you receive real-time updates on the status of your refund request, even if it initially shows as pending.


{{% alert title="Important" color="info"%}}
Refund availability and processing times may vary depending on the payment method and the country. For more detailed information about refund capabilities for specific payment methods in your country, please refer to our Payment Methods by Country.
{{% /alert %}}