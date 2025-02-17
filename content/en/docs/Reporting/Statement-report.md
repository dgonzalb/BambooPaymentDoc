---
title: "Statement Report API"
linkTitle: "Statement Report API"
date: 2024-10-02T08:40:29-03:00
Description: >
  Statement Movements API provides access to detailed financial data. It enables merchants to retrieve an overview of their account's monetary activities within specified time periods. Includes all credits (incoming funds), debits (outgoing payments or fees), and costs.
weight: 20
---

## Request URL
You must invoke a **GET** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v2/api/Reporting/billing-movements`
* **Stage**: `https://api.stage.bamboopayment.com/v2/api/Reporting/billing-movements`

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

* **Example**: `https://api.stage.bamboopayment.com/v2/api/Reporting/billing-movements?From=2024-01-01&To=2024-01-31&Page=1&PageSize=10`


## Response Parameters

{{% alert title="Note" color="info"%}}
Currently, the API may return information up to D-1 (the previous day). This means that the most recent data available through the API might be from the day before the current date. Please take this into consideration when querying for recent transactions.
{{% /alert %}}


| Property | Type | Description |
|----------|------|-------------|
| `Data` | `Array` | Array of transaction objects |
| `Data` → `transactionid` | `String` |  Transaction ID associated with this financial movement  |
| `Data` → `movementid` | `Integer` | Identifier for the financial movement |
| `Data` → `created` | `String` | Date and time when the financial movement was created |
| `Data` → `type` | `String` | Type of transaction (e.g., `Refund`, `Purchase`, `Payout"` , `Fee`, `FX`, `Withdrawal`, `Debit adjustment`, `Credit adjustment`.) |
| `Data` → `country` | `String` | Country code where the transaction occurred `ISO 3166-1 alpha-2 format` |
| `Data` → `currency` | `String` | Currency code for the financial movement |
| `Data` → `sign` | `String` | Indicates if the amount is a credit or debit |
| `Data` → `amount` | `Integer` | Transaction amount |
| `Data` → `availabledate` | `String` | Date when the funds become available |
| `Data` → `referenceid` | `String` | Reference ID for the transaction |
| `Data` → `endusernotes` | `String` | Any notes associated with the transaction |
| `Data` → `exchangerate` | `Number` | Exchange rate used (if applicable) |
| `Data` → `status` | `String` | Current status of the transaction |
| `Data` → `merchant_account_id` | `Integer` | ID of the merchant account |
| `Data` → `merchant_account_name` | `String` | Name of the merchant account |
| `Data` → `merchant_id` | `Integer` | ID of the merchant |
| `Data` → `merchant_name` | `String` | Name of the merchant |
| `Data` → `payment_method` | `String` | Payment Method used |
| `Data` → `payment_media_brand` | `String` | Brand of the payment method (if applicable) |
| `Data` → `last_status_date` | `String` | Date of the last status update |
| `Page` | `Integer` | Current page number |
| `PageSize` | `Integer` | Number of records per page |
| `Total` | `Integer` | Total number of records matching the query |
| `Errors` | `Array` | Array of error messages if any occurred during the request processing |

<!--
| `success` | `Boolean` | Indicates if the request was successful |
| `message` | `String` | Provides additional information about the response |
-->

### Response example
{{< highlight json >}}
{{< Payins/Reporting/movements_api >}}
{{< /highlight >}} 