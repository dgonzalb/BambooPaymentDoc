---
title: "Cash Payments"
linkTitle: "Cash Payments"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with Cash.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for Alternative Payment methods will remain _Pending_ until the customer completes the payment.
{{% /alert %}}

## Cash
The Cash payment method allows your customers to generate a coupon and complete the payment in a physical payment office.

### Cash acquirers
You can offer your customer the possibility to pay using cash in the following networks.

<div id="shortTable"></div>

| | Description |
|:-----:|:-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Apostar_PhysicalNetwork.png" width="52" /> | Apostar |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Bancolombia_PhysicalNetwork.png" width="52" /> |  Bancolombia |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Efecty_PhysicalNetwork.png" width="52" /> |  Efecty |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Gana_PhysicalNetwork.png" alt="Diners" width="52" /> |  Gana |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Puntored_PhysicalNetwork.png" width="52" /> |  Puntored |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Superpagos_PhysicalNetwork.png" width="52" /> |  Superpagos |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Sured_PhysicalNetwork.png" width="52" /> |  SuRed |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Susuerte_PhysicalNetwork.png" width="52" /> |  SuSuerte |

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethodId` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/colombia.html#payment-methods). |
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
* Colombian Pesos don't support decimal amounts, so all received values will be rounded.
* The `amount` value needs to include two zeros as decimal places. Example `COP 5.000` > `500000`.
{{% /alert %}}

#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_cash>}}
{{< /highlight >}}

### Response parameters
In the response, you will find the following parameters:

| Property | Type | Description |
|---|:-:|---|
| `Response` → `Action` → `URL` | `string` | URL of the coupon to be presented by your customer in the physical network. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Payment reference returned by the acquirer to identify the order generated. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Date when the payment will expire.<br>Format _DD/MM/YYYY_. |
| `Response` → `MetadataOut` → `AgreementCode` | `string`  | Agreement number between the acquirer and the physical network. |

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example 
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_cash>}}
{{< /highlight >}}
