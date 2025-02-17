---
title: "Recurring Payment Links"
linkTitle: "Recurring Payment Links"
date: 2025-02-14
type: docs
Description: >
weight: 65
---


Recurring Links allow merchants to generate payment URLs that can be used multiple times for repetitive charges or recurring services, or for different users to purchase the same product.


## Recurring Links List


The main view displays a table with all recurring links and their information:


| Field | Description | Status |
|------|-------------|--------|
| Name | Descriptive identifier of the product or service | - |
| Reference | Internal reference code | - |
| Amount | Payment amount and currency | - |
| Status | Current link status | Active, Inactive |
| Creation | Link generation date | - |
| Expiration | Expiration date (if applicable) or "No expiration" | - |




The list also includes a **context menu** that allows you to copy the recurring link to the clipboard, change its status, or delete it.


<a href="/assets/MerchantPanel/10-Reporte Link Recurrente.png" target="_blank">
    <img src="/assets/MerchantPanel/10-Reporte Link Recurrente.png" width="100%" alt="PrintScreen"/>
</a>


### Available Filter Options:


| Filter | Description |
|------|-------------|
|Date range | Creation period|
|Name          | Product name|
|Link details | Currency <br> Price <br> Status <br> Reference|








## Creating Recurring Links


The creation process is completed in two steps:


### Step 1: Link Details


| Field | Description | Mandatory |
|------|-------------|------------|
| Account | Select the account where payments will be processed | Yes |
| Name | Product or service identifier | Yes |
| Status | Initial link status (active/inactive) | Yes |
| Currency | Currency for charges | Yes |
| Price | Amount to charge | Yes |
| Reference | Optional internal identifier | No |
| Expiration | Link validity period | Yes |




<a href="/assets/MerchantPanel/11-Link Recurrente Creacion 1.png" target="_blank">
    <img src="/assets/MerchantPanel/11-Link Recurrente Creacion 1.png" width="100%" alt="PrintScreen"/>
</a>


### Step 2: Product


Additional product information:


| Field | Description | Mandatory | Restrictions |
|------|-------------|------------|---------------|
| Description | Product or service details | No | - |
| Images | Option to upload product images | No | Formats: jpg, jpeg, png<br>Maximum size: 10 MB per file |




<a href="/assets/MerchantPanel/12-Link Recurrente Creacion 2.png" target="_blank">
    <img src="/assets/MerchantPanel/12-Link Recurrente Creacion 2.png" width="100%" alt="PrintScreen"/>
</a>
