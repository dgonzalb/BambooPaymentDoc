---
title: "Credit cards"
linkTitle: "Credit cards"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process credit card payments.
weight: 10
tags: ["subtopic"]
---

## Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase_v3.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/en/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Description` | `string` | Yes | As acquirer requirement, send the purchase description using the following format. `MerchantName+OrderId+ [merchantUrl]`.<br>Example: `TestCommerce #order2572023, [testcommerce.com.br]`. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentType` | `string` | Yes | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/brazil.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | Yes | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | Yes | Customer's State.<br>Refer to [states of residence](/en/docs/payment-methods/brazil.html#customers-state-of-residence) to know its possible values. |
| `Customer` → `Address` → `City` | `string` | Yes | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | Yes | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | Yes | Customer's Postal Code. Do not include hyphens. |

{{% alert title="Info" color="info"%}}

Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Brasil/requestPurchase>}}
{{< /highlight >}}

## Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md>}}#response-parameters) of the Purchase creation.

### Response example

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved currency="BRL">}}
{{< /highlight >}}


## Testing cards
Use the following cards to simulate the different status of the purchase.

| Brand | PAN | CVV | Expiration Date |
|---|---|---|---|
| Mastercard | `5555666677778884` |  `123` | `12/29` |
| Visa | `4984123412341234` |  `123` | `12/29` |
<!--| Diners | `30111122223331` |  `123` | `12/29` |
| Amex | `376411112222331` |  `1234` | `12/29` |
| Hipercard | `6062111122223339` |  `123` | `12/29` |
| Elo | `6362970000457013` |  `123` | `12/29` |-->

{{% alert title="Info" color="info"%}}

To ensure successful testing, please use the following specific details: docNumber: “13394559358” and docType: “24” (CPF).
Failure to use these details may result in unsuccessful transactions.

{{% /alert %}}