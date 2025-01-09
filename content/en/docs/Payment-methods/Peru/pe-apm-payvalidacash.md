---
title: "Cash Payments"
linkTitle: "Cash Payments"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with cash collection networks.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
* The purchase status for [Cash collection networks](#cash-collection-networks) will remain _Pending_ until the customer completes the payment.
{{% /alert %}}

## Cash collection networks
Using this payment method, your customer can go to a Cash collection network and complete the payment using the generated reference number.

### Networks
You can offer your customer the possibility to pay using cash in the following networks:

<div id="shortTable"></div>

| | PaymentMethod| Description |
|-----|-----|-----|
| <img src="/assets/LogosCashPeru/bcp.png" width="52" />          | `BCP` | BCP | 
| <img src="/assets/LogosCashPeru/arequipa.png" width="52" />     | `ARC` | Caja Arequipa  | 
| <img src="/assets/LogosCashPeru/cusco.png" width="52" />        | `CSC` | Caja Cusco  | 
| <img src="/assets/LogosCashPeru/huancayo.png" width="52" />     | `HCC` | Caja Huancayo  | 
| <img src="/assets/LogosCashPeru/ica.png" width="52" />          | `ICC` | Caja Ica  | 
| <img src="/assets/LogosCashPeru/piura.png" width="52" />        | `PIC` | Caja Piura  | 
| <img src="/assets/LogosCashPeru/tacna.png" width="52" />        | `TNC` | Caja Tacna  | 
| <img src="/assets/LogosCashPeru/trujillo.png" width="52" />     | `TRC` | Caja Trujillo  | 
| <img src="/assets/LogosCashPeru/interbank.png" width="52" />    | `IBC` | Interbank  | 
| <img src="/assets/LogosCashPeru/westernunion.png" width="52" /> | `WUC` | Western Union  | 
| <img src="/assets/LogosCashPeru/bbva.png" width="52" />         | `BBV` | BBVA  | 


### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase_v3.md >}}#response-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/peru.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/peru.html#document-types) to see the possible values. |
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
{{< Payins/V3/PaymentMethods/Peru/request_payvalidaCash >}}
{{< /highlight >}}

### Response parameters
In the response, you will find the following parameters:

| Property | Type | Description |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL of the payment information. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Payment reference returned by the acquirer to identify the order generated. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Date when the payment will expire.<br>Format _DD/MM/YYYY_. |
| `Response` → `MetadataOut` → `AgreementCode` | `string`  | Agreement number between the acquirer and the physical network. |

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example 
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Peru/response_payvalidaCash >}}
{{< /highlight >}}