---
title: "Transaction Report API"
linkTitle: "Transaction Report API"
date: 2023-03-02T11:40:29-05:00
Description: >
  The Bamboo Transaction Report API offers detailed transactional data retrieval. It enables users to access transaction information for specified time periods, select specific data columns for customized reports and obtain comprehensive transaction details, including buyer information, payment methods, and transaction statuses.
weight: 10
---

## Request URL
You must invoke a **GET** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v2/api/Reporting/payin-transactions`
* **Stage**: `https://api.stage.bamboopayment.com/v2/api/Reporting/payin-transactions`

<br />

> Remember to include your **merchant's Private Key** in the request headers. <br /> For more details, check our [Authentication Guide]({{< ref "Authentication.md" >}}).

## Request parameters
| Property | Type | Mandatory? | Description |
|----------|------|------------|-------------|
| `from` | `String` | Yes | Start date for the transaction query (format: YYYY-MM-DD) |
| `to` | `String` | Yes | End date for the transaction query (format: YYYY-MM-DD) |
| `page` | `Integer` | Yes | Page number for pagination |
| `pageSize` | `Integer` | Yes | Number of records per page |

{{% alert title="Important" color="info"%}}
The parameters go in the request appended to the endpoint URL, followed by a `?` indicating the start of the parameters.
{{% /alert %}}

### Format and example of the request (Request)
* **Format**: `{endpoint}?From=YYYY-MM-DD&To=YYYY-MM-DD&Page=#&PageSize=#`

* **Example**: `https://api.bamboopayment.com/v2/api/Reporting/payin-transactions?From=2024-01-01&To=2024-01-31&Page=1&PageSize=10`

## Response Parameters

{{% alert title="Note" color="info"%}}
Currently, the API may return information up to D-1 (the previous day). This means that the most recent data available through the API might be from the day before the current date. Please take this into consideration when querying for recent transactions.
{{% /alert %}}


| Property | Type | Description |
|----------|------|-------------|
| `success` | `Boolean` | Indicates if the request was successful |
| `message` | `String` | Provides additional information about the response |
| `data` | `Array` | Array of transaction objects containing the following fields: |
| `data` → `TransactionId` | `Integer` | Unique identifier for the transaction |
| `data` → `Type` | `String` | Type of transaction (e.g., "Purchase", "Refund") |
| `data` → `Created` | `Date-time` | Date and time when the transaction was created |
| `data` → `Status` | `String` | Status of the transaction (e.g., "Approved", "Rejected") |
| `data` → `Error_code` | `String` | Error code if applicable |
| `data` → `Amount` | `Decimal` | Amount of the transaction |
| `data` → `Currency` | `String` | Currency of the transaction |
| `data` → `Country` | `String` | Country where the transaction occurred |
| `data` → `Transaction_source` | `String` | Source of the transaction |
| `data` → `Tenant` | `String` | Name of the tenant |
| `data` → `Merchant_account` | `String` | Name of the merchant account |
| `data` → `Payment_method_type` | `String` | Type of payment method used |
| `data` → `Payment_method` | `String` | Specific payment method used |
| `data` → `Card_bin` | `String` | Bank Identification Number (6 digits) |
| `data` → `Card_last4` | `String` | Last 4 digits of the card |
| `data` → `Order` | `String` | Order identifier |
| `data` → `Unique_id` | `String` | Unique identifier for the transaction |
| `data` → `Authorization_code` | `String` | Authorization code for the transaction |
| `data` → `Installments` | `Integer` | Number of installments if applicable |
| `data` → `Issuer` | `String` | Name of the issuing bank |
| `data` → `Customer_name` | `String` | Full name of the customer |
| `data` → `Customer_document_type` | `String` | Type of identification document |
| `data` → `Customer_document_number` | `String` | Identification document number |
| `data` → `Customer_email` | `String` | Email address of the customer |
| `total` | `Integer` | Total number of records matching the query |
| `page` | `Integer` | Current page number |
| `pageSize` | `Integer` | Number of records per page |
| `errors` | `Array` | Array of error messages if any occurred during the request processing |

### Response example
{{< highlight json >}}
{{< Payins/Reporting/transaction_api >}}
{{< /highlight >}} 