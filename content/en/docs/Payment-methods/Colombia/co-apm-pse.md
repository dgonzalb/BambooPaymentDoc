---
title: "PSE"
linkTitle: "PSE"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with PSE.
weight: 20
tags: ["subtopic"]
---

## Bank Transfer using PSE
PSE (Pagos Seguros en Línea) is a widely used online payment system in Colombia. It enables secure electronic transactions by allowing users to make payments directly from their bank accounts.
There are two possible payment flows:

1. **First flow:**  
   A URL is provided to the user, who can access it to select their preferred bank to complete the payment. Then, they are automatically redirected to the selected bank's website.

2. **Second flow:**  
   Initially, the [get bank list](/en/docs/payment-methods/colombia/co-apm-pse.html#request-parameters-get-bank-list) operation is used to retrieve the available bank list. This list can be displayed during the merchant's checkout process. During the purchase processing, the necessary data is sent to redirect the user directly to their preferred bank using the additional fields in the request.


### Request Parameters - Bank Selection URL Flow {#request-parameters}
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase_v3.md >}}#response-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/colombia.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentType` | `string` | Yes | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/colombia.html#document-types) to see the possible values. |
| `Customer` → `DocumentNumber` | `string` | Yes | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | Yes | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | Yes | Customer's State. |
| `Customer` → `Address` → `City` | `string` | Yes | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | Yes | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `Redirection` → `Url_Approved` | `string` | No | Callback URL when the purchase status is `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Callback URL when the purchase status is `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Callback URL when the purchase status is `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Callback URL when the purchase status is `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | Webhook notification URL. The Purchase status is notified to this URL once the payment method processor notifies Bamboo. The notification to this URL is a REST POST with JSON payload instead of redirection. It can also be static and configured by Support Team. |

### Additional Parameters - Direct Bank URL Flow {#request-parameters-get-bank-list}

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `MetaDataIn` → `financialInstitutionCode` | `string` | No | Bank code where the transaction will take place.<br> This code must be previously obtained from the [bank list endpoint](/en/docs/payment-methods/colombia/co-apm-pse.html#get-bank-list). |
| `MetaDataIn` → `personType` | `string` | No | Represents the type of person performing the transaction. <br>Possible values: <br>`1` → Natural Person (individuals).<br> `2` → Legal Person (companies). |
| `MetaDataIn` → `identificationType` | `string` | No | User identification type for the transaction. <br>Possible values: <br>`RegistroCivilDeNacimiento`<br>`TarjetaDeIdentidad`<br>`CedulaDeCiudadania`<br>`TarjetaDeExtranjeria`<br>`CedulaDeExtranjeria`<br>`Pasaporte`<br>`DocumentoDeIdentificacionExtranjero`<br>`NIT` |

> _The purchase status for Alternative Payment methods will remain **Pending** until the customer completes the payment._

#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_pse >}}
{{< /highlight >}}

### Response parameters
We return the `Purchase` with the status _Pending for Redirection_ and a `Action` object with `Reason` as `REDIRECTION_NEEDED_EXTERNAL_SERVICE` and the `URL` parameter with the external service URL. You must redirect the customer to this URL to finish the payment following the PSE flow. In this flow, your payer selects their bank, choose whether they are a Natural or Legal person and their document type.
<br> If a specific bank is sent, obtained and selected from the [get bank list](/es/docs/payment-methods/colombia/co-apm-pse.html#request-parameters-get-bank-list) operation, the redirection will lead directly to the selected bank's website.

![PrintScreen](/assets/PSE.png)

According to the result of the transaction, the payer will be directed to the URL defined in the `Redirection` object. For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example 
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_pse >}}
{{< /highlight >}}

### Bank List Retrieval Endpoint {#get-bank-list}

* **Production**: `https://pse.prod.bamboopayment.com/api/Bank/GetBanks`
* **Stage**: `https://pse.stage.bamboopayment.com/api/Bank/GetBanks`

#### Response Example {#get-bank-list-response}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/response_bankList_pse >}}
{{< /highlight >}}

#### Response example for a specific bank {#request-example-bank}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_pse_bank >}}
{{< /highlight >}}


{{% alert title="Important Notes" color="info"%}}
**Refunds**: Bamboo allows you to refund a PSE purchase via a Bank Transfer to your customer, find more information in the [APM Refunds section]({{< ref "apm-refunds.md" >}}).
{{% /alert %}}