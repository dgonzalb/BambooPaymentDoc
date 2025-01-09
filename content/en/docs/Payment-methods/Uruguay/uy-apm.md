---
title: "Cash Payments"
linkTitle: "Cash Payments"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with cash.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for cash payment methods will remain _Pending_ until the customer completes payment either in a physical payment office.
{{% /alert %}}

## Cash
The Cash payment method allows your customers to generate a coupon and complete the payment in a physical payment office.

### Cash acquirers

<div id="shortTable"></div>

| | PaymentMethod | Acquirer |
|-----|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Abitab_PhysicalNetwork.png"  width="52" /> | `ABT`| Abitab |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/RedPagos_PhysicalNetwork.png"  width="52" /> | `RDP` | RedPagos |

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref Purchase_V3.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Send the `PaymentMethod` according to the selected Cash acquirer in this [table](#cash-acquirers). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/uruguay.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Uruguay/request_redpagos >}}
{{< /highlight >}}

### Response parameters
In the `MetadataOut.PaymentBarcodeUrl` parameter, the response returns the coupon in _PDF_ format that the client must present in the agency to pay the generated debt.

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example 
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Uruguay/response_redpagos>}}
{{< /highlight >}}