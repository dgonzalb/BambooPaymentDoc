---
title: "Refunds for Alternative Payment Methods"
linkTitle: "Refunds for APM"
date: 2025-02-15T08:46:32-05:00
Description: >
  Process refunds for Alternative Payment Methods that don't support this feature natively through Bamboo's Instant Payout system to your customer's bank account.
weight: 10
tags: ["subtopic"]
---

## Overview
This endpoint allows you to process refunds for completed purchases made with _**Alternative Payment Methods**_ (APMs) that don't natively support this feature. Bamboo processes these refunds through an _**Instant Payout**_ to your customer's bank account, providing an unmatched SLA for claim resolution.

For details on authentication, url request and basic refund parameters, refer to our [refunds operation guide.]({{< ref "../Refunds/_index.md" >}})

<img src="/assets/Refunds/IMG-en-refunds-apm-metadata.png" width="100%" alt="Metadata for refunds"/>


## Request Parameters
Include the following specific fields in the `MetadataIn` object of your Refund request to process an APM Refund.

### Customer Information
Payee data is necessary to process a Refund via a Payout, for purchases where these parameters (Customer Name and Document) haven’t been defined, they should be sent in the Refund Request.

| Parameter | Type | Mandatory | Description |
|-----------|------|:----------:|-------------|
| `MetadataIn` → `CustomerFirstName` | `string` | Yes | Customer's first name receiving the refund (from `Customer.FirstName` in the Purchase) |
| `MetadataIn` → `CustomerLastName` | `string` | Yes | Customer's last name receiving the refund (from `Customer.LastName` in the Purchase) |
| `MetadataIn` → `CustomerDocumentType` | `string` | Yes | Customer's document type (Format: `DOCUMENT.COUNTRY`) |
| `MetadataIn` → `CustomerDocumentNumber` | `string` | Yes | Customer's document number |
| `MetadataIn` → `CustomerEmail` | `string` | Yes<sup>1</sup> | Customer's email for notifications and bank data collection |
| `MetadataIn` → `CustomerPhoneNumber` | `string` | Yes<sup>1</sup> | Customer's phone number for notifications and bank data collection |

<small>
1. Either the Customer’s Email OR Phone Number is required when Bamboo manages the bank data collection.
</small>

### Bank Account Information
Required when merchants collect bank account information through their own claims process, in case these parameters are not received it’s necessary to provide Customer’s contact data.

| Parameter | Type | Mandatory | Description |
|-----------|------|:----------:|-------------|
| `MetadataIn` → `RefundBankID` | `string` | Yes | Refund recipient's bank code. [See bank list]({{< ref "Variables.md" >}}) |
| `MetadataIn` → `RefundBankAccountType` | `string` | Yes | Refund recipient's Bank Account type: `1` for Checking, `2` for Savings |
| `MetadataIn` → `RefundBankAccountNumber` | `string` | Yes | Refund Recipient's Bank Account number |

### Additional Configuration
Allows customization of your customer’s experience when Bamboo manages the bank data collection.

| Parameter | Type | Mandatory | Description |
|-----------|------|:---------:|-------------|
| `MetadataIn` → `PayinMerchantLogoURL` | `string` | No | URL of merchant's logo for notifications and web forms |
| `MetadataIn` → `ResponseURL-Success` | `string` | No | Success page URL after customer completes bank data form |
| `MetadataIn` → `ResponseURL-Failure` | `string` | No | Error page URL for failed bank data collection |


### Request Examples


{{< tabs tabTotal="2" tabName1="Bank Data Provided by Merchant" tabName2="Bank Data provided by Customer / Payee" >}}
{{< tab tabNum="1" >}}
<br>

**Bank Data Provided by Merchant**

{{< highlight json >}}
{{< Payins/V3/Refunds/refund_apm_data_merchant >}}
{{< /highlight >}} 

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

**Bank Data provided by Customer / Payee**
{{< highlight json >}}
{{< Payins/V3/Refunds/refund_apm_data_payee >}}
{{< /highlight >}} 

{{< /tab >}}

{{< /tabs >}}

## Response Example
{{< highlight json >}}
{{< Payins/V3/Refunds/refund_apm_response >}}
{{< /highlight >}} 

{{% alert title="Important Notes" color="info"%}}
* **Pending Status**: APM refunds remain in `PENDING` status while the bank transfer is being processed.
* **Final Result**: The final refund result will be notified through the [Transaction webhook]({{< ref "Notification-Webhooks.md" >}}#transaction-webhook). 
* **Status Updates**: You can check the latest refund status using the [GET Transaction]({{< ref "Get_transaction.md" >}}) operation with the `Transaction ID` you get in the refund request response.
{{% /alert %}}