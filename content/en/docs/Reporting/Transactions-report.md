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

## Authorization
In the header, the `Authorization` parameter must be configured by concatenating the word `Basic`, a space and the _**Private Key**_ of the merchant.

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
```json
{
  "Response": {
    "Data": [
      {
        "TransactionId": 15660802,
        "Type": "Purchase",
        "Created": "2024-08-01T21:34:34.1308881",
        "Status": "Approved",
        "Amount": 4279,
        "Currency": "BRL",
        "Country": "BR",
        "Transaction_source": "DirectPurchase",
        "Tenant": "Bamboo.BR",
        "Merchant_account": "Loja Virtual BR",
        "Payment_method_type": "PrePaid",
        "Payment_method": "VISA",
        "Card_bin": "426717",
        "Card_last4": "5636",
        "Order": "f4bb4b41-2476-41ce-ac7a-ad3e6e50d77e",
        "Unique_id": "f922b26e-76af-476d-aada-502a46e3c365",
        "Authorization_code": "202597",
        "Installments": 1,
        "Issuer": "VISA",
        "Customer_name": "Maria Silva",
        "Customer_document_type": "24",
        "Customer_document_number": "12345678900",
        "Customer_email": "maria.silva@mail.com"
      },
      {
        "TransactionId": 15919451,
        "Type": "Refund",
        "Created": "2024-08-04T14:22:43.4766824",
        "Status": "Rejected",
        "Error_code": "TR019",
        "Amount": 8560,
        "Currency": "BRL",
        "Country": "BR",
        "Transaction_source": "DirectPurchase",
        "Tenant": "Bamboo.BR",
        "Merchant_account": "Loja Online BR",
        "Payment_method_type": "PrePaid",
        "Payment_method": "MasterCard",
        "Card_bin": "569130",
        "Card_last4": "8461",
        "Order": "9cdc4d58-3aa9-4f2c-b204-8c2c96ab6bd7",
        "Unique_id": "b5caf213-d76e-4d15-b691-6b0fccb16e86",
        "Authorization_code": "526661",
        "Installments": 1,
        "Issuer": "MasterCard",
        "Customer_name": "João Santos",
        "Customer_document_type": "24",
        "Customer_document_number": "98765432100",
        "Customer_email": "joao.santos@mail.com"
      }
    ],
    "Page": 2,
    "PageSize": 2,
    "Total": 4
  },
  "Errors": []
}
```