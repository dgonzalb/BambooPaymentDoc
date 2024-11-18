---
title: "Nequi"
linkTitle: "Nequi"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with Nequi.
weight: 40
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for Alternative Payment methods will remain _Pending_ until the customer completes the payment.
{{% /alert %}}

## Nequi QR
Allows your customer to pay by scanning a QR code using their Nequi application. Bamboo's Payment API generates the QR code in the response to the payment request.

#### Payment Flow {#qr-code}
<img src="/assets/NequiQREN.png" width="100%" alt="Nequi QR Payment Flow"/>

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethodId` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/colombia.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No <sup>*</sup>| Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/colombia.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | No <sup>*</sup>| Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No <sup>*</sup>| Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

{{% alert title="Important!" color="danger"%}}
<sup>*</sup> If you wish to process refunds, the `PhoneNumber`, `DocumentType` and `DocumentNumber` parameters are required in the request. Otherwise, a refund cannot be processed if the parameters were not sent.
{{% /alert %}}

#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_nequiQr>}}
{{< /highlight >}}


### Response parameters
The following example shows the response to the request.

El siguiente ejemplo muestra la respuesta al request.
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_nequiQr>}}
{{< /highlight >}}
<br>

In the field `MetadataOut` inside the purchase `Response` object, the QR code is returned as a _base64_ image (Parameter `Base64Qr`); add this image inside an image HTML tag. For example:

{{< highlight html >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_nequiQr_qr>}}
{{< /highlight >}}

<br>

Result:

<img src="/assets/QRNequi.png" width="40%" alt="PrintScreen"/>


## Nequi Push
Using this payment method, your customer will receive a notification to open their _Nequi_ app to accept or reject the payment.

#### Payment Flow {#push-notification}
<img src="/assets/NequiPushEN.png" width="100%" alt="Nequi Payment Flow"/>

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethodId` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/colombia.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentType` | `string` | No <sup>*</sup>| Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/colombia.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | No <sup>*</sup>| Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes| Customer's phone number. The format number must be 10 digits long and must not have prefixes. Example: _3188255555_. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

{{% alert title="Important!" color="danger"%}}
<sup>*</sup> To process refunds, the `DocumentType` and `DocumentNumber` parameters are required in the request.Otherwise, a refund cannot be processed if the parameters were not sent.
{{% /alert %}}

#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_nequiPush>}}
{{< /highlight >}}


### Response parameters
_Nequi_ generates the payment order and sends a push notification to the payer; then, the payer needs to log in Nequi app to accept or reject the payment.

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example

{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_nequiPush>}}
{{< /highlight >}}