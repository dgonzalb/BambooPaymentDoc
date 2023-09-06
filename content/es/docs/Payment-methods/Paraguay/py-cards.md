---
title: "Credit and Debit cards"
linkTitle: "Credit and Debit cards"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process credit or debit card payments.
weight: 10
tags: ["subtopic"]
---
<!--
## Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indicate the destination currency. |
| `Customer` → `Email` | `string` | Sí | Customer's email. |
| `Customer` → `FirstName` | `string` | Sí | Customer's first name. |
| `Customer` → `LastName` | `string` | Sí | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/es/docs/payment-methods/paraguay.html#document-types) to see the posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No<sup>*</sup> | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |

{{% alert title="Info" color="info"%}}

Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Request example
```json

```

## Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

### Response example

```json

```

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
-->