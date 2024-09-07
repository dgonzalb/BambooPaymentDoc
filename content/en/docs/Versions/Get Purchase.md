---
title: "Get a Purchase"
linkTitle: "Get a Purchase"
date: 2024-08-02T08:46:32-05:00
Description: >
   GET Purchase allows merchants to promptly address transaction discrepancies and retrieve the details of a specific purchase transaction.
weight: 20
tags: ["subtopic"]
---

### Request URL
You must invoke a **GET** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v3/api/Purchase/{{TransactionId}}`
* **Stage**: `https://api.stage.bamboopayment.com/v3/api/Purchase/{{TransactionId}}`

Where `{{TransactionId}}` is the identifier of the transaction you want to retrieve.

{{% alert title="Using Reporting API" color="info"%}}
For bulk transaction analysis and reporting needs, please refer to our [Transaction Report API]({{< ref "Transactions-report.md" >}}), which is optimized for handling large datasets and generating reports.
{{% /alert %}}

### Response parameters
The response structure for this operation is identical to the standard [purchase response]({{< ref "Purchase_V3.md" >}}#response). This ensures consistency across different transaction types and simplifies integration processes.

| Parameter | Type | Description |
|---|---|---|
| `TransactionId` | `string` | Unique identifier for the transaction. A 19-digit number sent as a string for compatibility. |
| `Result` | `string` | Outcome of the transaction. `COMPLETED` or `ACTION_REQUIRED`. See the "Action" object for instructions. |
| `Status` | `string` | Current status of the transaction (e.g., Approved, Rejected). |
| `ErrorCode` | `string` | Error code if the transaction was rejected. |
| `ErrorDescription` | `string` | Detailed description of the error if the transaction was rejected. |
| `Created` | `string` | Timestamp of when the transaction was created, in **ISO 8601** format. |
| `AuthorizationDate` | `string` | Timestamp of when the transaction was authorized, in **ISO 8601** format. |
| `AuthorizationCode` | `string` | Unique code provided by the issuer to confirm the transaction authorization. |
| `Amount` | `integer` | Total transaction amount. |
| `Currency` | `string` | Currency code used for the transaction. May differ from the request currency based on business agreements. |
| `Installments` | `integer` | Number of payment installments for the transaction. |
| `TaxableAmount` | `integer` | Amount subject to taxes. |
| `Tip` | `integer` | Tip amount. |
| `Url` | `string` | Link to access additional transaction details. |
| `MetadataOut` | `object` | Additional metadata returned with the transaction response. |
| `Action` | `object` | Details of required actions when Result is "ACTION_REQUIRED". |
| `PaymentMethod` | `object` | Information about the payment method used for the transaction. |

### Response example

```json
{
    "TransactionId": "79632697147789184",
    "Result": "COMPLETED",
    "Status": "APPROVED",
    "ErrorCode": null,
    "ErrorDescription": null,
    "Created": "2024-08-07T17:51:54.620",
    "AuthorizationDate": "2024-08-07T17:51:56.879",
    "AuthorizationCode": "839936",
    "Amount": 25000,
    "Currency": "BRL",
    "Installments": 2,
    "TaxableAmount": null,
    "Tip": null,
    "Url": "https://api.stage.bamboopayment.com/Purchase/79632697147789184",
    "MetadataOut": null,
    "Action": null,
    "PaymentMethod": {
        "Brand": "Visa",
        "CardOwner": "João Silva",
        "Bin": "450799",
        "IssuerBank": "Banco do Brasil",
        "Type": "CreditCard",
        "Expiration": "203008",
        "Last4": "4905"
    }
}
```

{{% alert title="Note" color="info"%}}
All fields, statuses, and error codes described in the [purchase response]({{< ref "Purchase_V3.md" >}}#response) apply equally to this Get Purchase Details response.
{{% /alert %}}