---
title: "Bank Transfers"
linkTitle: "Bank Transfers"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with Bank transfers.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
* The purchase status for Alternative Payment methods will remain _Pending_ until the customer completes payment either in their _Khipu_.
* Chile does not support decimal amounts, so all received amount values will be rounded.
{{% /alert %}}

## Khipu
**Khipu** allows payers to pay using transfers from their bank accounts using the _Khipu_ app. The payer can pay using bank accounts or through the **Khipu** app where the payment experience is better.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase_v3.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/chile.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/chile.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `Redirection` → `Url_Approved` | `string` | No | Callback URL when the purchase status is `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Callback URL when the purchase status is `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Callback URL when the purchase status is `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Callback URL when the purchase status is `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | Webhook notification URL. The Purchase status is notified to this URL once the payment method processor notifies Bamboo. The notification to this URL is a REST POST with JSON payload instead of redirection. It can also be static and configured by Support Team. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

{{% alert title="Info" color="info"%}}

The `Redirection` object and its parameter are not required; nevertheless, you must configure it to redirect your customer after the transaction finishes in any status.

{{% /alert %}}

#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Chile/request_khipu >}}
{{< /highlight >}}

### Response parameters
We return the `Purchase` with the status _Pending for Redirection_ and a `Action` object with `Reason` as `REDIRECTION_NEEDED_EXTERNAL_SERVICE` and the `URL` parameter with the external service URL. You must redirect the customer to this URL to finish the payment on the _**Khipu**_ app.

{{% alert title="Info" color="info"%}}
If the RUT and password are requested during testing, please use a valid RUT (for example **11.111.111-1**) and password **123**.
{{% /alert %}}

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Chile/response_khipu >}}
{{< /highlight >}}