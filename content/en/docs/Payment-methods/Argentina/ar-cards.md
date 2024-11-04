---
title: "Credit and Debit cards"
linkTitle: "Credit and Debit cards"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process credit or debit card payments.
weight: 10
tags: ["subtopic"]
---

## Considerations 
* **For VISA Debit**: It is not required to be in the _Verified by Visa_ program.<br>When operating outside a wallet, you must request the _Expiration Date_ and _CVV_. It serves as a single payment due to being a debit card. It accepts Full Cancellations and Refunds (Total and Partial). It does not allow Two-Step operations (Pre-Authorization).
* **Purchases without CVV**: Allows tokenization and recurrence.<br>In the case of tokenization, the API generates a charge for a minimum of **ARS 3**, which is refunded to validate the cardholder data. With this token, it is possible to make purchases without CVV.

## Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase_v3.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/en/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/argentina.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No<sup>*</sup> | Customer's State.<br><sup>*</sup>_This parameter is required to calculate **II.BB** Tax. Refer to [provinces](/en/docs/payment-methods/argentina.html#argentina-provinces) to know its possible values_. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |

{{% alert title="Info" color="info"%}}

Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Argentina/requestPurchase>}}
{{< /highlight >}}

## Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md>}}#response-parameters) of the Purchase creation.

### Response example

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved currency="ARG">}}
{{< /highlight >}}

## Testing cards
Use the following cards to simulate the different status of the purchase.

### For approved purchases

| Brand | PAN | CVV | Expiration Date | Details |
|---|---|---|---|---|
| Mastercard | `5299910010000015` | `123` | `08/30` | No amount limit. |
| Visa (credit or Debit) | `4507990000004905` | `123` | `08/30` | No amount limit. |
| Amex | `373953192351004` | `1234` | `08/30` | Amounts: $1 or $10 |

### For rejected purchases

| PAN | CVV | Expiration Date | Document Type | Document |
|---|---|---|---|---|
| `4304968001555104` | `617` | `12/18` | `4` - DNI | `38499826` |