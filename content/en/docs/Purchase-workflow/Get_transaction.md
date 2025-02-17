---
title: "Get Transaction"
linkTitle: "Get Transaction"
date: 2025-02-17
Description: >
   GET Transaction allows merchants to query any transaction type, such as purchase, refund, providing detailed information about the operation.
weight: 35

---
## Get Transaction by ID {#get-transactionID}
You must invoke a **GET** request to the following URLs according to your needs.

### Request URL {#request-url-transactionID}

* **Production**: `https://api.bamboopayment.com/v3/api/transaction/{{TransactionId}}`
* **Stage**: `https://api.stage.bamboopayment.com/v3/api/transaction/{{TransactionId}}`

Where `{{TransactionId}}` is the identifier of the transaction you want to retrieve.

<br />

> Remember to include your **merchant's Private Key** in the request headers. <br /> For more details, check our [Authentication Guide]({{< ref "Authentication.md" >}}).

## Response parameters
The response includes details about the transaction according to its type. The following table describes all possible fields in the response.

| Parameter | Type | Description |
|---|---|---|
| `TransactionId` | `string` | Unique identifier for the transaction. A 19-digit number sent as a string for compatibility. |
| `Type` | `string` | Transaction Type. `PURCHASE` or `REFUND`. |
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

### Response examples

{{< tabs tabTotal="3" tabName1="Purchase" tabName2="Refund" tabName3="Refund APM" >}}
{{< tab tabNum="1" >}}
<br>


{{< highlight json >}}
{{< Payins/V3/GetTransactions/get_transaction_response_purchase >}}
{{< /highlight >}} 

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

{{< highlight json >}}
{{< Payins/V3/GetTransactions/get_transaction_response_refund >}}
{{< /highlight >}} 

{{< /tab >}}

{{< tab tabNum="3" >}}
<br>


{{< highlight json >}}
{{< Payins/V3/GetTransactions/get_transaction_response_refundApm >}}
{{< /highlight >}} 

{{< /tab >}}
{{< /tabs >}}

{{% alert title="Note" color="info"%}}
Refunds for alternative payment methods that don't natively support refunds include in the `MetadataOut` object the information of the bank transfer made to the customer.
{{% /alert %}}