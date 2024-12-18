---
title: "Cash Payments"
linkTitle: "Cash Payments"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process Cash payments in Colombia.
weight: 30
tags: ["subtopic"]
---

The Cash payment method allows your customers to generate a payment voucher and complete the payment at a physical payment location.

## Payment Networks
The following networks are available for cash payments.

<div id="shortTable"></div>

| Logo | PaymentMethod| Description |
|:-----:|:-----:|:-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Apostar_PhysicalNetwork.png" width="52" /> | `APC` | Apostar |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Bancolombia_PhysicalNetwork.png" width="52" /> | `BCC` | Bancolombia |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Efecty_PhysicalNetwork.png" width="52" /> | `EFC` | Efecty |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Gana_PhysicalNetwork.png" width="52" /> | `GNC` | Gana |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Puntored_PhysicalNetwork.png" width="52" /> | `PNC` | Puntored |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Superpagos_PhysicalNetwork.png" width="52" /> | `SPC` | Superpagos |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Sured_PhysicalNetwork.png" width="52" /> | `SRC` | SuRed |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Susuerte_PhysicalNetwork.png" width="52" /> | `SSC` | SuSuerte |

### Request parameters
To process cash payments, you need to include specific fields in your request. For information about authentication, response languages, and basic purchase parameters such as amount and currency, please refer to the [Purchase operation]({{< ref purchase-operations.md >}}) article.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/colombia.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/colombia.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | Yes | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

{{% alert title="Considerations" color="info"%}}
* Colombian Pesos (COP) does not support decimal amounts; all values will be rounded.
* The `amount` parameter must include two zeros as decimal places. For example, COP 5,000 should be sent as 500000.
{{% /alert %}}


> _The purchase status for Alternative Payment methods will remain **Pending** until the customer completes the payment at a physical location._


#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_cash>}}
{{< /highlight >}}

### Response parameters
The response will include the following parameters:

| Property | Type | Description |
|---|:-:|---|
| `Response` → `Action` → `URL` | `string` | URL of the payment voucher to be presented by your customer at the physical network. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Payment reference returned by the acquirer to identify the order generated. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Date when the payment will expire.<br>Format _DD/MM/YYYY_. |
| `Response` → `MetadataOut` → `AgreementCode` | `string`  | Agreement number between the acquirer and the physical network. |

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example 
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_cash>}}
{{< /highlight >}}