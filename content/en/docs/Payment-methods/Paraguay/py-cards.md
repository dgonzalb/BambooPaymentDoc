---
title: "Credit and Debit cards"
linkTitle: "Credit and Debit cards"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process credit or debit card payments.
weight: 10
tags: ["subtopic"]
---

{{% alert title="Note" color="info"%}}
We only offer support for merchants in Paraguay through the **Gateway** model, and we send the invoice to them from Uruguay.
{{% /alert %}}

## Considerations
The acquirer does not accept online returns, only cancellations are allowed within the same business day (which ends at 7:59 p.m. Paraguay time). refunds must be processed manually by the merchant.

## Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref Purchase_V3.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/en/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/paraguay.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No<sup>*</sup> | Customer's State. |
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
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

### Response example

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved currency="PYG">}}
{{< /highlight >}}

## Risk index information (local credit cards)
The acquirer processes the transactions and establishes a _**risk index**_ associated with transactions with **local credit cards**. This information must be processed by the merchant to ensure that the transaction is legitimate and to be able to process the order or cancel it if necessary.

The acquirer reports the risk index as an error code in the response (within the Transaction object); even though the status is `Approved`, you must validate the `ErrorCode` field, which may have one of the following values:

* **RSK01**: The acquirer marked the transaction with a low risk of fraud. You can process it normally.
* **RSK02**: The acquirer marked the transaction with a medium risk of fraud. You decide the actions to take in this case.
* **RSK03**: The acquirer marked the transaction with a high risk of fraud. We suggest to verify the data, including direct contact with the end customer.

You are responsible for processing and managing the risk responses, and the gateway will only report the index established by the acquirer.