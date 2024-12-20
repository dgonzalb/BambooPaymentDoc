---
title: "Cash Payments"
linkTitle: "Cash Payments"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments in physical payment branches.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for Cash payment methods will remain _Pending_ until the customer completes the payment at a physical payment office.
{{% /alert %}}


## OXXOPay
**OXXO**, the largest chain of convenience stores in Mexico, offers a service that allows customers to pay for their purchases. Customers need to provide a payment reference at the store and can make payments using cash or cards. Once payment is made, you will receive instant confirmation of the purchase.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref Purchase_V3.md >}}#request-parameters)  article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/mexico.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. Including the Indicative for Mexico `+52` |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | Yes | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |


#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/request_oxxopay >}}
{{< /highlight >}}

### Response parameters
In the response, you will find the following parameters:

| Property | Type | Description |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL of the payment coupon. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Payment reference. |
| `Response` → `MetadataOut` → `PaymentBarcodeUrl` | `string` | Payment barcode image URL. |

You can redirect your customer to the URL displayed in the parameter `Response.MetadataOut.PaymentUrl`, where they can use the voucher and complete the payment in an **OXXO** store.

<img src="/assets/OXXOPayVoucher.png" width="60%" alt="PrintScreen"/>

#### Response example

{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/response_oxxopay >}}
{{< /highlight >}}

## Paynet Cash
**Paynet** allows your customers to generate a coupon and complete the payment in a physical payment office.

### Cash acquirers
You can offer your customer the possibility to pay using cash in the following networks:

* Farmacias Benavides
* 7Eleven
* Walmart
* Farmacias de Ahorro
* Sam´s
* Walmart Express
* Bodega Aurrera
* Circle K

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref Purchase_V3.md >}}#request-parameters)  article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/mexico.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
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
{{< Payins/V3/PaymentMethods/Mexico/request_paynet >}}
{{< /highlight >}}


### Response parameters
In the response, you will find the following parameters:

| Property | Type | Description |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Payment number generated by **Paynet**. |
| `Response` → `MetadataOut` → `PaymentBarcodeUrl` | `string` | URL of the payment barcode image. |
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL of the payment coupon in PDF format. |

You can redirect your customer to the URL displayed in the parameter `Response.MetadataOut.PaymentUrl` to download the voucher and complete the payment in an physical payment branch.

<img src="/assets/PaynetVoucher.png" width="60%" alt="PrintScreen"/>

#### Response example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/response_paynet >}}
{{< /highlight >}}
