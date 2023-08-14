---
title: "Anonymous users"
linkTitle: "Anonymous users"
date: 2023-07-17T07:28:16-05:00
description: >
  An anonymous user is not registered on the site and makes a one-time purchase. In this case, you must always ask for the card data to complete the transaction.
weight: 10
tags: ["subtopic"]
---

Next, we describe the steps to create a purchase with an anonymous user.

## Capture the Card Data
The first step is to get the token of the customer's card. To do so, you can invoke the [Checkout Form]({{< ref "Checkout-Form.md" >}}) in the last stage of the shopping cart. Recall that you must gather the _**Checkout Form**_ through the Bamboo Payment JavaScript library. Alternatively, you can use [Direct tokenization]({{< ref "Direct-Tokenization.md" >}}) if your commerce is PCI-compliant.

This form is displayed within an iframe of your page and requests the Card data.

{{% alert title="Info" color="info"%}}
If you use the Alternative payment method identifier, you don't require this step and must include the **PaymentMediaId**.
{{% /alert %}}

### Invoking the Checkout Form
The Javascript **PWCheckout** library has properties to customize its appearance according to merchant requirements. Once you invoke the Checkout form and the customer fills in the data, the merchant can obtain the _token associated with the customer's card. 

### Using Direct tokenization
Since the user is not registered in your commerce, you must invoke the method too [create the token for unregistered users]({{< ref "Direct-Tokenization.md" >}}#OTT).

{{% alert title="Info" color="info"%}}
The token generated using any method above is a _**One Time Token**_ (OTT) valid only once and for 10 minutes.
{{% /alert %}}

## Create a Basic Purchase
The token just obtained must be sent from the browser or the mobile app to the application server to create the purchase transaction.

From the server, invoke the [Create a purchase]({{< ref "Purchase-Operations.md" >}}#create-a-purchase), including the `Purchase` object with the token and other transaction data.

```json
{
   "TrxToken": "OT_01_kYv0qTHckRiZ4wjCz5NguZRuwFLSIrQc4jiYpVJ8SzQ_",
  "Order": "17030613595101621fb",
  "Amount": 123456,
  "Currency": "USD",
  "Capture": true,
  "TargetCountryISO":"CL",
  "PaymentMediaId":106
}
```
<br>

The **PaymentMediaId** and **TrxToken** fields are optional, but sending one is mandatory, depending on the flow you want to use.

* **PaymentMediaId**: Alternative payment method identifier (transfer, cash, and processing that requires customer redirection). You can obtain this identifier by consulting the [Payment Methods by country](/docs/payment-methods.html) section.

* **TrxToken**: You can generate the token and transact by sending it in this field.

## Payment Workflow Sequence Diagram
The following sequence diagram lists the steps in the payment process.

![PrintScreen](/assets/AnonymousUserFlow_en.png)

In the above flow, the following calls are made:

* **10** - `HTTP/POST` (server to server): `{EnvironmentAPI}/v1/api/purchase`
* **12** - `HTTP/GET `(server to server): `{EnvironmentAPI}/v1/api/customer/{{customer-id}}`