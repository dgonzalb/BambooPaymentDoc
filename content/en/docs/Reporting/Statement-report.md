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

## Authorization
In the header, the `Authorization` parameter must be configured by concatenating the word `Basic`, a space and the _**Private Key**_ of the merchant.

## Request parameters
| Property | Type | Mandatory? | Description |
|----------|------|------------|-------------|
| `merchantAccount` | `Integer` | Yes | The unique identifier for the merchant account |
| `from` | `String` | Yes | Start date for the transaction query (format: YYYY-MM-DD) |
| `to` | `String` | Yes | End date for the transaction query (format: YYYY-MM-DD) |
| `page` | `Integer` | Yes | Page number for pagination |
| `pageSize` | `Integer` | Yes | Number of records per page |
| `columns` | `Array` | No | Array of specific columns to include in the response (empty array returns all columns) |

### Request example
```json
{
    "merchantAccount": 1,
    "from":"2021-01-01",
    "to":"2021-01-31",
    "page":1,
    "pageSize":10,
    "columns": []
}
```

## Response Parameters

{{% alert title="Note" color="info"%}}
Currently, the API may return information up to D-1 (the previous day). This means that the most recent data available through the API might be from the day before the current date. Please take this into consideration when querying for recent transactions.
{{% /alert %}}


| Property | Type | Description |
|----------|------|-------------|
| `success` | `Boolean` | Indicates if the request was successful |
| `message` | `String` | Provides additional information about the response |
| `data` | `Array` | Array of transaction objects |
| `data` → `transactionid` | `String` |  Transaction ID associated with this financial movement  |
| `data` → `movementid` | `Integer` | Identifier for the financial movement |
| `data` → `created` | `String` | Date and time when the financial movement was created |
| `data` → `type` | `String` | Type of transaction (e.g., `Refund`, `Purchase`, `Payout"` , `Fee`, `FX`, `Withdrawal`, `Debit adjustment`, `Credit adjustment`.) |
| `data` → `country` | `String` | Country code where the transaction occurred `ISO 3166-1 alpha-2 format` |
| `data` → `currency` | `String` | Currency code for the financial movement |
| `data` → `sign` | `String` | Indicates if the amount is a credit or debit |
| `data` → `amount` | `Integer` | Transaction amount |
| `data` → `availabledate` | `String` | Date when the funds become available |
| `data` → `referenceid` | `String` | Reference ID for the transaction |
| `data` → `endusernotes` | `String` | Any notes associated with the transaction |
| `data` → `exchangerate` | `Number` | Exchange rate used (if applicable) |
| `data` → `status` | `String` | Current status of the transaction |
| `data` → `merchant_account_id` | `Integer` | ID of the merchant account |
| `data` → `merchant_account_name` | `String` | Name of the merchant account |
| `data` → `merchant_id` | `Integer` | ID of the merchant |
| `data` → `merchant_name` | `String` | Name of the merchant |
| `data` → `payment_method` | `String` | Payment Method used |
| `data` → `payment_media_brand` | `String` | Brand of the payment method (if applicable) |
| `data` → `last_status_date` | `String` | Date of the last status update |
| `total` | `Integer` | Total number of records matching the query |
| `page` | `Integer` | Current page number |
| `pageSize` | `Integer` | Number of records per page |
| `errors` | `Array` | Array of error messages if any occurred during the request processing |


### Response example
```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "transactionid": "17041776",
      "movementid": 13211952,
      "created": "2024-08-12T13:44:18.397",
      "type": "Refund",
      "country": "PE",
      "currency": "USD",
      "sign": "Debit",
      "amount": -1,
      "availabledate": "2024-09-01T19:44:16.093",
      "referenceid": "REF123456",
      "endusernotes": "Customer requested refund",
      "exchangerate": 3.73,
      "status": "Confirmed",
      "merchant_account_id": 2081,
      "merchant_account_name": "ACME Online Store",
      "merchant_id": 35,
      "merchant_name": "Global Retail Group",
      "payment_method": "BankTransfer",
      "payment_media_brand": null,
      "last_status_date": "2024-08-12T14:00:00.000"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 10,
  "errors": null
}
```