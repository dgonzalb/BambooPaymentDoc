---
title: "Credit and Debit cards"
linkTitle: "Credit and Debit cards"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process credit or debit card payments.
weight: 10
tags: ["subtopic"]
---

## Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref Purchase_V3.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/en/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `SoftDescriptor` | `string` | No | Text that will appear on the customer's statement when making a purchase. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/colombia.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No<sup>*</sup> | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `TaxAmount` | `numeric` | No | The VAT amount of the gross amount. For domestic purchases, this parameter is required.<br>When you must include decimals in this amount, concatenate the decimal places without de decimal point. Example `12,25` > `1225`. |

{{% alert title="Info" color="info"%}}
Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase>}}
{{< /highlight >}}

## Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

### Response example

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved currency="COP">}}
{{< /highlight >}}

## Testing cards
Use the following cards to simulate the different status of the purchase.

| Brand | PAN | CVV | Expiration |
|---|---|---|---|
| Mastercard | `5303710409428783` | `355` | `05/26` |
| Visa | `4513076106055348` | `159` | `06/26` |
| Diners | `36032429319768` | `9052` | `12/26 `|
| ***Insufficient funds*** |  |  |  |
| Mastercard | `5529030604551745` | `124` | `11/26` |