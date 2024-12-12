---
title: "Card on File"
linkTitle: "Card on File"
date: 2024-08-02T08:43:44-05:00
Description: >
  Use the Card on File (CoF) feature for processing recurring payments, subscriptions, and one-click transactions. This helps merchants comply with Visa and Mastercard regulations and improves approval rates. 
weight: 60
tags: ["subtopic"]
---

Card on File (CoF) is a feature that enables merchants to process transactions using customer card information for subsequent purchases. This capability facilitates various transaction types depending on the entity that initiates the transaction, be it the customer or the merchant.

## Overview {#cof-overview}

Card networks require merchants to include specific identifiers when using stored card credentials in the payment request. Card on File helps establish trust, confirming that customers have authorized storing their card details and subsequent payments.

Card on File transactions can be categorized into three types:

<img src="/assets/CoF/CoFTypeEN.png" width="100%" alt="CoF Types"/>

{{% alert title="Note" color="info"%}}
Please check with your account manager for Card on File availability per country.
{{% /alert %}}

## CardOnFile Object
### Request Fields

| Parameter | Type | Mandatory? | Description |
|-----------|------|:----------:|-------------|
| `CardOnFile` | `object` | No | Contains information about the Card on File transaction. |
| `CardOnFile` → `TransactionType` | `string` | Yes | Specifies the type of Card on File transaction. Possible values: `"CIT"`, `"FIT"`, `"MIT"`. |
| `CardOnFile` → `NetworkTransactionId` | `string` | No | Identifier for transaction tracking, can be either a network transaction or subscription agreement. |

<br />

> **Note**: The `CardOnFile` object is optional. Transactions will be processed normally if this object is not included in the request. However, including it helps improve approval rates by properly identifying the transaction type and complying with card network requirements.

### Transaction Types

| | CIT | FIT | MIT |
|---|---|---|---|
| **Initiator** | Customer | Customer | Merchant |
| **Use Cases** | • One-click payments<br>• Customer portal purchases<br>• Manual subscription renewals | • Starting a subscription<br>• Setting up recurring donations<br> | • Subscription renewals<br>• Recurring membership fees<br>• Scheduled installment charges |
| **Authentication** | Authentication is recommended. You can [pass 3DS results]({{< ref "3D_Secure.md" >}}) in the request |Authentication is recommended. You can [pass 3DS results]({{< ref "3D_Secure.md" >}}) in the request | No additional authentication needed after FIT. Previous authentication data can be referenced using NetworkTransactionId |
| **Authentication TransactionID** | Optional | Optional, but the 3DS `TransactionId` from response should be stored | Optional <br>(`TransactionId` from original FIT) |

#### Request Example for CIT (Customer Initiated Transaction) {#example-cit}

{{< highlight json >}}
{{< Payins/V3/Card_on_File/CIT >}}
{{< /highlight >}} 

#### Request Example for FIT (First Initial Transaction) {#example-fit}

{{< highlight json >}}
{{< Payins/V3/Card_on_File/FIT >}}
{{< /highlight >}} 

#### Request Example for MIT (Merchant Initiated Transaction) {#example-mit}

{{< highlight json >}}
{{< Payins/V3/Card_on_File/MIT >}}
{{< /highlight >}} 

<br /> 

> The response follows the standard response format. See [Create a Purchase]({{< ref "purchase_v3.md#response" >}}) for details.