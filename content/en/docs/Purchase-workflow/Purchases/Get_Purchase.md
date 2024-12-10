---
title: "Get a Purchase"
linkTitle: "Get a Purchase"
date: 2024-08-02T08:46:32-05:00
Description: >
   GET Purchase allows merchants to promptly address transaction discrepancies and retrieve the details of a specific purchase transaction.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Looking for previous API versions?" color="info"%}}
If you're searching for documentation on earlier API versions (V2), please refer to our [Legacy Systems section]({{< ref Purchase-Operations.md >}}#get-purchases)
{{% /alert %}}

## Get Purchase by Transaction ID {#get-transactionID}
You must invoke a **GET** request to the following URLs according to your needs.

### Request URL {#request-url-transactionID}

* **Production**: `https://api.bamboopayment.com/v3/api/Purchase/{{TransactionId}}`
* **Stage**: `https://api.stage.bamboopayment.com/v3/api/Purchase/{{TransactionId}}`

Where `{{TransactionId}}` is the identifier of the transaction you want to retrieve.

<br />

> Remember to include your **merchant's Private Key** in the request headers. <br /> For more details, check our [Authentication Guide]({{< ref "Authentication.md" >}}).

{{% alert title="Using Reporting API" color="info"%}}
For bulk transaction analysis and reporting needs, please refer to our [Transaction Report API]({{< ref "Transactions-report.md" >}}), which is optimized for handling large datasets and generating reports.
{{% /alert %}}


## Get Purchase by Order {#get-Order}
You can retrieve transaction details using the merchant's order identifier by making a GET request to the following endpoints.

### Request URL {#request-url-Order}
You must invoke a **GET** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v3/api/Purchase/order/{{Order}}`
* **Stage**: `https://api.stage.bamboopayment.com/v3/api/Purchase/order/{{Order}}`

Where `{{Order}}` is the merchant order identifier for the transaction you want to retrieve.

<br />

> Remember to include your **merchant's Private Key** in the request headers. <br /> For more details, check our [Authentication Guide]({{< ref "Authentication.md" >}}).


## Get Purchase by Unique ID {#get-uniqueID}
You can retrieve transaction details using a custom unique identifier by making a GET request to the following endpoints.

### Request URL {#request-url-uniqueID}
You must invoke a **GET** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v3/api/Purchase/uniqueId/{{UniqueId}}`
* **Stage**: `https://api.stage.bamboopayment.com/v3/api/Purchase/uniqueId/{{UniqueId}}`

Where `{{UniqueID}}` is the custom unique identifier for the transaction you want to retrieve.

<br />

> Remember to include your **merchant's Private Key** in the request headers. <br /> For more details, check our [Authentication Guide]({{< ref "Authentication.md" >}}).


## Response parameters
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

{{< highlight json >}}
{{< Payins/V3/GetPurchase/requestGetPurchase >}}
{{< /highlight >}} 


{{% alert title="Note" color="info"%}}
All fields, statuses, and error codes described in the [purchase response]({{< ref "Purchase_V3.md" >}}#response) apply equally to this Get Purchase Details response.
{{% /alert %}}