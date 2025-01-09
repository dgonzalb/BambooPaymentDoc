---
title: "Cash Payments"
linkTitle: "Cash Payments"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with Cash.
weight: 20
tags: ["subtopic"]
---

## PuntoXpress
_PuntoXpress_ is a cash collection network with regional coverage in Central America. When the customers of e-commerce platforms make purchases on their websites, the merchant requests us to generate a debt. Subsequently, the customer goes to a _PuntoXpress_ collection point, checks the debt associated with a reference, and makes the payment. Then, _PuntoXpress_ notifies us, and we report to the merchant.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase_v3.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/central-america.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/central-america.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the validity of the generated debt using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/CentroAmerica/request_puntoExpress >}}
{{< /highlight >}}

### Response parameters
In the response, you find the parameter `MetadataOut.PaymentCode` with the reference number of the generated debt that the customer must present in a _PuntoXpress_ agency to pay the debt. Furthermore, the parameter `MetadataOut.PaymentExpirationDate` displays the validity date in ISO 8601 format (_YYYY-MM-DDTHH:MM:SS_).

#### Response example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/CentroAmerica/response_puntoExpress >}}
{{< /highlight >}}