---
title: "Payment Links"
linkTitle: "Payment Links"
date: 2025-02-17
type: docs
Description: >
weight: 50
---


Payment Links allow merchants to generate unique URLs for their customers to make secure payments. Each link is single-use and expires once used or when it reaches its time limit.


## Payment Links List


The main view displays a table with all generated links and their relevant information:


| Field | Description |
|------|-------------|
| Link ID | Unique payment link identifier |
| Reference | Reference code assigned by the merchant |
| Status | Current link status |
| Amount | Payment amount and currency |
| Creation | Link generation date and time |
| Expiration | Date and time when the link will become invalid |


The list also includes a **context menu** that allows you to copy the payment link to the clipboard or cancel it.


<a href="/assets/MerchantPanel/7-Reporte Link de pago.png" target="_blank">
    <img src="/assets/MerchantPanel/7-Reporte Link de pago.png" width="100%" alt="PrintScreen"/>
</a>




### Available Filter Options:


The list can be filtered by:


| Data Type | Filter | Description |
|--------------|------|-------------|
| General | Date | Specific creation period |
| General | Link ID | Unique link identifier |
| General | Account | Filter by specific account |
| Customer | Document | Customer ID number |
| Customer | Email | Customer email |
| Customer | Customer name | Customer full name |
| Link details | Status | Payment link status |
| Link details | Reference | Reference code |




## Creating Payment Links


The creation process is completed in two steps:


### Step 1: Link Details




| Field | Description | Mandatory |
|------|-------------|------------|
| Account | Select the account where the payment will be processed | Yes |
| Country | Country where the transaction will take place | Yes |
| Currency | Currency for the charge | Yes |
| Amount | Amount to charge | Yes |
| Reference | Internal identifier for the merchant | No |
| Description | Payment detail or concept | No |
| Expiration | Link validity period | Yes |




<a href="/assets/MerchantPanel/8-Link de Pago Creacion 1.png" target="_blank">
    <img src="/assets/MerchantPanel/8-Link de Pago Creacion 1.png" width="100%" alt="PrintScreen"/>
</a>


### Step 2: Customer Details


| Field | Description | Mandatory |
|------|-------------|------------|
| Full Name | Customer identification | No |
| Email | Contact email | No |
| Phone number | Contact phone | No |
| Document Type and Number | Customer ID | No |
| Country and City | Customer location | No |
| State | State or province | No |
| Address | Customer physical address | No |


<a href="/assets/MerchantPanel/9-Link de Pago Creacion 2.png" target="_blank">
    <img src="/assets/MerchantPanel/9-Link de Pago Creacion 2.png" width="100%" alt="PrintScreen"/>
</a>
