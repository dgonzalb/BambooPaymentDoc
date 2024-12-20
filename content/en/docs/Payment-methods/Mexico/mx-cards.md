---
title: "Credit and Debit cards"
linkTitle: "Credit and Debit cards"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process credit or debit card payments.
weight: 10
tags: ["subtopic"]
---
You can create the purchase using [API](#card-payments-using-api-flow) or [Redirection](#card-payments-using-redirection-flow) flow.

## Card payments using API flow
Using this flow, you can offer the possibility to receive payments using cards without the intervention of the payer.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref Purchase_V3.md >}}#request-parameters)  article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/en/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Installments` | `integer` | No | This parameter refers to the number of payments that a credit card purchase is divided into. You can select `1`, `3`, `6`, `9`, and `12` installments.<br>Default value is `1`. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `AntifraudData` → `AntifraudFingerprintId` | `string` | Yes | Session Id (`AntifraudFingerprintId`) which is obtained by the javascript function [getSessionAntifraud]({{< ref Antifraud.md>}}#getsessionantifraud). |
| `AntifraudData` → `ClientIP` | `string` | No | IP of to the customer connected to the commerce website. |

{{% alert title="Info" color="info"%}}

Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/requestPurchase>}}
{{< /highlight >}}

### Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved currency="MXN">}}
{{< /highlight >}}

## Testing cards
Use the following cards to simulate the different status of the purchase. These cards apply for both API and redirection flow.

| Brand | PAN | CVV | Expiration Date |
|---|---|---|---|
| Visa | `4111111111111111` | `123` | `10/29` |
| Visa | `4242424242424242` | `123` | `10/29` |
| MasterCard | `5555555555554444` | `123` | `10/29` |
| MasterCard | `5105105105105100` | `123` | `10/29` |
| Amex | `345678000000007` | `1234` | `10/29` |
| Amex | `341111111111111` | `1234` | `10/29` |
| Amex | `343434343434343` | `1234` | `10/29` |
| Carnet | `5062541600005232` | `123` | `10/29` |
| Carnet | `5064050100000063` | `123` | `10/29` |
| Carnet | `5064510000300020` | `123` | `10/29` |