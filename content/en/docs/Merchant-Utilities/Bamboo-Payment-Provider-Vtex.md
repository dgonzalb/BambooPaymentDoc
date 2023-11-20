---
title: "Payment Provider Installation Guide on VTEX"
linkTitle: "Payment Provider Installation Guide on VTEX"
date: 2023-03-02T11:40:29-05:00
Description: >
  This guide provides all the necessary steps to integrate our payment solution into your VTEX e-commerce platform. We designed the Bamboo Payment Provider to be easy to install and configure to help you optimize your checkout process and enhance your customer experience.
weight: 20
---

{{% alert title="Important" color="info"%}}
* The Bamboo Payment Provider is available only for Uruguay.
* Along this guide, we will refer your VTEX site as `{your-site}`.
{{% /alert %}}

## Prerequisites
Please consider the following prerequisites before proceeding.

### Register your commerce in VTEX
Log into the [VTEX site](https://vtex.com/) to register you eCommerce. Once you are registered, you need an administrator user for the entire integration process with Bamboo Payment Systems.

### Generate Key and Token for VTEX
Open your Merchant console (Production or Stage) and expand the ***Settings*** section in the left menu.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_01.png)

This window displays the configuration setting of your account. Go to the ***VTEX*** tab.<br>In the **App Key-Token Bamboo** section of the VTEX settings, click the _**Generate new key and token**_ button to create the new credentials.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_02.png)

Keep both keys, the `Bamboo app key` and `Bamboo app token`, safe as you need them later.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_03.png)

### Enable Sandbox environment
To enable testing in the Sandbox environment, you must use the _testing_ workspace and request access to the merchant console in the stage environment. Complete this step before moving to the production environment.

To create this workspace, download and install `nodejs` from the [node's official page](https://nodejs.org/en/download).

Then, run the following command in your command prompt.

```cmd
npx vtex use testing
```

{{% alert title="Warning" color="warning"%}}
Do not use this configuration in the production environment; always use the _master_ workspace.
{{% /alert %}}

## Install and configure the Bamboo Payment Provider on VTEX
Open the _VTEX App Store_ using the URL: `https://{your-site}.myvtex.com/admin/store/`. 

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_04.png)

Then, search _Payment Provider Bamboo_. In case you cannot find the component, use the following URL: `https://{your-site}.myvtex.com/admin/apps/bamboopayments.payment@1.3.4/setup/`

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_05.png)

After installing the component, configure the payment methods for use. Add Bamboo as a payment processor, as mentioned in the [Configure Bamboo Payment Provider](#configure-bamboo-payment-provider) section.

## Configure Bamboo Payment provider
To configure the payment provider, click the _**Store Settings**_ option in the left panel. Then, select the _**Settings**_ option in the _**Payment**_ group.

The _Payment settings_ window opens. Go to the _**Gateway Affiliations**_ tab. Alternatively, you can use to the following URL `https://{your-site}.myvtex.com/admin/pci-gateway/#/affiliations`

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_06.png)

Click the plus icon in the top right corner to add the connector, then search for the Bamboo connector in the _**OTHER**_ section.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_07.png)

Provide the following information for the Bamboo Gateway Affiliation:

* **Affiliation name**: VTEX assigns a name by default. Nevertheless, you can set one of your choice.
* **Test or Live toggle**: select the mode of the Gateway Affiliation. Before using the Gateway Affiliation in real transactions, try it out in the _Test_ mode first.
* **Application Key**: Use the _**Bamboo app key**_ field [generated before](#generate-key-and-token-for-vtex).
* **Application Token**: Use the _**Bamboo app token**_ field [generated before](#generate-key-and-token-for-vtex).

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_08.png)

Click _**Save**_ when finished.

## Configure the payment methods
After configuring the Bamboo Gateway Affiliation, you must configure the payment methods. You can configure the payment methods predefined by VTEX or custom payment methods.

### Configure predefined payment methods
You can configure the pre-existing ones in VTEX (Visa, Mastercard, Cabal, etc.) within the payment methods. Follow the next procedure to add a payment method.

Go to the _**Store Settings**_ option in the left panel. Then, select the _**Settings**_ option in the _**Payment**_ group.

The _Payment settings_ window opens. Go to the _**Payment conditions**_ tab.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_09.png)

Click the plus icon in the top right corner to add a new payment condition, then search for the payment method you want to include.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_10.png)

Provide the following information for the payment condition:

* **Condition name**: provide a meaningful name for the condition in the field next to the payment method name.
* **Status**: define whether the condition is enabled.
* **Process with affiliation**: select the Bamboo Gateway Affiliation created in the previous step.
* **Payment conditions**: on the right panel, include payment method conditions, such as installment rates and other relevant factors.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_11.png)

Click _**Save**_ when finished.

### Configure custom payment methods
Within the custom payment methods, you can configure the out-of-the-box payment methods of VTEX and configure the following cards.

<div id="cards" style="padding: 10px;text-align: center;">

<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Oca_CreditCard.png" style="max-width: 40%"/>
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Creditel_CreditCard.png" style="max-width: 40%" />
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/CreditosDirectos_CreditCard.png" style="max-width: 40%" />
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Lider_CreditCard.png" style="max-width: 40%" />
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Passcard_CreditCard.png" style="max-width: 40%" />
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/ClubDelEste_CreditCard.png" style="max-width: 40%" />
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Anda_CreditCard.png" style="max-width: 40%" />

</div><br>

Go to the _**Store Settings**_ option in the left panel. Then, select the _**Settings**_ option in the _**Payment**_ group.

The _Payment settings_ window opens. Go to the _**Custom Payments**_ tab.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_12.png)

You can add either _**Co-branded**_ or _**Private label**_ cards using the respective section. To do so, click one of the empty boxes with the label _**Config**_. In the form displayed, provide the following information according to the card bines and brands.

* OCA: `589892,542991`
* Creditel: `601933,608700`
* Creditos Directos: `601828`
* Lider: `501109,501088,505863,505864,505865,505866,505867,505868,505869,505870,505871,505872`
* PassCard: `628026`
* Club del Este: `504736`
* Anda: `603199`

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_13.png)

{{% alert title="Info" color="info"%}}
For the fields _**Description**_ and _**Acquirer payment code**_, use the same value as used in the field _**Name**_.
{{% /alert %}}

## Checkout
For this integration, the Checkout and the card capture are done by VTEX performing a direct debit. You can configure any card-type payment method displayed [here](/docs/payment-methods/uruguay.html#payment-methods).

### Cards with pre-authorization
By default, VTEX reserves the purchase amount in the customer's card (pre-authorization). When you generate the invoice, the amount to debit is confirmed, but it cannot be greater than the amount reserved initially. If the customer cancels the purchase before invoice generation, VTEX also cancels the amount reserved.

### Cards without pre-authorization
VTEX performs a direct debit to these cards, and in the invoice generation, the amount must be the same as the purchase's original amount. This type of transaction does not allow you to change the purchase amount from the VTEX admin panel. You can only request full refunds if the payment method supports it, and if you want to request a partial refund, you must request it from the Bamboo Merchant console.

## Enable pre-authorizations
Open your Merchant console (Production or Stage) and expand the ***Setting*** section in the left menu.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_01.png)

This window displays the configuration settings of your account. Go to the ***VTEX*** tab. In the **Pre-authorization** section of the VTEX settings, you can enable the pre-authorizations and provide the reserve percentage you want to configure in each transaction using the corresponding fields.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_14.png)

* **Pre-authorization enabled**: when you select this option, you indicate that all the purchases performed using a payment method that supports pre-authorization remain pre-authorized until you complete the purchase invoice in VTEX and, if the result is successful, it becomes approved in Bamboo.

* **Percentage of reserve over purchase amount**: this value is optional and only has effect when you have enabled the Pre-authorization. If you enter a value in this field, VTEX will add the percentage to the pre-authorized purchase amount. For example, if the purchase amount is USD 100 and the percentage is 10%, the system will pre-authorize the purchase for a value of USD 110.00.

{{% alert title="Important" color="info"%}}
The percentage of the reserve is applied only on the Bamboo side. In VTEX, you will always see the original amount of the purchase. You can increase this amount later if required. For example, the final price might exceed the initial estimate in the case of weighable items.
{{% /alert %}}

## Amount changing and purchase cancellation
VTEX allows, in their purchase flow, to cancel the amount, change the original amount by increasing it, or perform a partial refund.

Cancellation and partial refund actions will be limited with respect to the different functionalities supported for each means of payment.

To request an amount increase or a total/partial refund, go to the order detail from the VTEX console. Expand the _**Orders**_ section and click the _**All Orders**_ option. Alternatively, you can use the URL: `https://{your-site}.myvtex.com/admin/checkout/#/orders`.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_15.png)

### Increase purchase amount
This option is only available for pre-authorized purchases. From the details of an order, you must take it to the _**Ready for handling**_ step.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_16.png)

Once the order is in this step, VTEX enables the _**Change value**_ option, where you can enter the amount to increase. Before confirming the action, make sure you are in the increase option.
