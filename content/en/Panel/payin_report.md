---
title: "Payin Report"
linkTitle: "Payin Report"
date: 2025-02-17
type: docs
Description: >
weight: 35
tags: ["parenttopic"]
---


The **Payin Report** section allows users to view a detailed list of all transactions processed through Bamboo Payments. This view provides relevant information about each transaction, such as customer details, status, amount, payment method, and other useful information for management and analysis.


<a href="/assets/MerchantPanel/2-ReportePayins.png" target="_blank">
    <img src="/assets/MerchantPanel/2-ReportePayins.png" width="100%" alt="PrintScreen"/>
</a>




## Main Features


### 1. Transaction List
Each row in the table represents an individual transaction and displays:
| Field | Description | Notes |
|------|-------------|---------------|
| Purchase ID | Unique transaction identifier | Clickable link for more details |
| Type | Transaction type | - |
| Customer | Customer name associated with the transaction | - |
| Status | Current transaction status | Approved, Rejected, Cancelled, etc. |
| Amount | Transaction amount | Includes currency |
| Payment method | Method used for payment | Mastercard, VISA, OCA, etc. |
| Date | Date and time when the transaction was recorded | - |
| Order | Order number or reference | - |




### 2. Download Report


Option to download a file with the complete report of displayed transactions, adapted to the applied date range and filters.


### 3. Advanced Filtering
Users can customize the displayed results using the filter module, accessible through the **Filters** button.


| Data type | Filter | Description |
|--------------|--------|-------------|
| General | Account | Select merchant accounts |
| General | Status | Filter by transaction status |
| General | Order | Filter by order type |
| General | Transaction ID | Search by specific identifiers |
| General | Type | Filter by transaction type |
| Purchase details | Payment method | Select specific methods |
| Purchase details | Currency | Select currency types |
| Purchase details | Amount | Filter by monetary value |
| Customer | Customer | Search by customer name |
| Customer | Email | Search by email |
| Customer | Document | Search by ID document |

---

## Navigation
From this view, users can click on the **Transaction ID** to access [specific transaction details]({{< ref "transaction_detail.md" >}}).
