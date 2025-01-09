---
title: "Bank Transfers"
linkTitle: "Bank Transfers"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with cash and Bank transfers.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for bank transfers will remain _Pending_ until the customer completes payment either in their bank app or at a physical payment office.
{{% /alert %}}

## Bank Transfers {#bank-transfers}
With **Bank Transfers** allow your customers to make payments using bank transfers. Customers will need to transfer the purchase amount to the specified account details provided in the response using their home banking system. We accept payments from all banks.


### Request parameters 
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref Purchase_V3.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/uruguay.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Description` | `string` | Yes | Purchase Description. This field is required for this payment method. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/uruguay.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Uruguay/request_infinia >}}
{{< /highlight >}}

### Response parameters
We return the `Purchase` with the status _Pending for Redirection_ and a `Action` object with `Reason` as `REDIRECTION_NEEDED_EXTERNAL_SERVICE` and the `URL` parameter with the URL of the coupon. In this URL, the payer must log in to their home banking app and complete the payment. Refer to the [Payment Experience](#payment-experience) section to see the payment flow.

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Uruguay/response_infinia >}}
{{< /highlight >}}

### Payment experience
As mentioned, you must redirect your customer to the URL returned in the response (parameter `Action.URL`).

Then, we show your customer the coupon with the bank information to where they need to create the transfer.

<img src="/assets/InfiniaAR/InfiniaAR_05.png" alt="PrintScreen" style="width: 70%; height:auto;"><br>

{{% alert title="Info" color="info"%}}
You can customize this coupon to display your logo at the top. Contact Bamboo support to include it.
{{% /alert %}}

Once your customer completes the transfer, they can use the confirmation button at the bottom of this screen.

<img src="/assets/InfiniaAR/InfiniaAR_06.png" alt="PrintScreen" style="width: 50%; height:auto;">