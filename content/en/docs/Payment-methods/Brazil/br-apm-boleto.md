---
title: "Boleto"
linkTitle: "Boleto"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with **Boleto Bancario**.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for Alternative Payment methods will remain _Pending_ until the customer completes payment.
{{% /alert %}}

## Boleto Bancario
_Boleto Bancário_ is a popular payment method in Brazil that allows for paying bills and online purchases without a credit card. It generates a unique barcode that can be printed or accessed through a digital platform and paid at any bank or authorized payment center.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase_v3.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/brazil.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentType` | `string` | Yes | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/brazil.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | Yes | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | Yes | Customer's State. |
| `Customer` → `Address` → `City` | `string` | Yes | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | Yes | Customer’s Postal Code. The postal code must have eight digits—for example, `29018660`. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |
| `MetadataIn` → `AddressStreet` | `string` | Yes | Customer address street. |
| `MetadataIn` → `AddressNumber` | `string` | Yes | Customer address number, floor, apartment. |
| `MetadataIn` → `AddressDistrict` | `string` | Yes | Customer address district. 


#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Brasil/request_boleto >}}
{{< /highlight >}}


### Response parameters
In the response, you will find the following parameters:

| Property | Type | Description |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string` | Payment code generated by **Boleto Bancario** |
| `Response` → `MetadataOut` → `PaymentBarCode` | `string`  | Code of the barcode generated to complete the payment. |
| `Response` → `MetadataOut` → `PaymentBarCodeUrl` | `string` | URL of the payment page. You can redirect the payer to this page to download the boleto. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Date when the payment will expire.<br>Format _DD/MM/YYYY HH:MM:SS_. |

#### Payment page in Boleto

![PrintScreen](/assets/Boleto.png)

#### Response example

{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Brasil/response_boleto >}}
{{< /highlight >}}