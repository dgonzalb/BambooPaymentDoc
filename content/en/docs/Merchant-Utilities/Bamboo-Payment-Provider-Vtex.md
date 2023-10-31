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
Before proceeding, it is required for you to take into account the following prerequisites.

### Register your commerce in VTEX
Log into the [VTEX site](https://vtex.com/) to register you eCommerce. Once you are registered, you must have an administrator user to be used along the whole integration process with Bamboo Payment System.

### Generate Key and Token for VTEX
Open your Merchant console (Production or Stage) and expand the ***Setting*** section in the left menu.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_01.png)

This window displays the configuration setting of your account. Go to the ***VTEX*** tab.<br>In the **App Key-Token Bamboo** section of the VTEX settings, click the _**Generate new key and token**_ button to create the new credentials.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_02.png)

Keep both keys `Bamboo app key` and `Bamboo app token` in a safe place as they will be required later.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_03.png)

## Enable Sandbox environment
To enable testing in the Sandbox environment, you must use the _testing_ workspace and request an access to the merchant console in stage environment. This step is required before moving to the production environment.

To create this workspace, download and install `nodejs` from the [node's official page](https://nodejs.org/en/download).

Then, run the following command in your command prompt.

```cmd
npx vtex use testing
```

{{% alert title="Warning" color="warning"%}}
Do not use this configuration in production environment and you must always use the _master_ workspace.
{{% /alert %}}

## Install and configure Bamboo Payment Provider on VTEX
Open the _VTEX App Store_ using the following URL `https://{your-site}.myvtex.com/admin/store/`. 

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_04.png)

Then, search _Payment Provider Bamboo_. In case you could not find the component, use the following URL `https://{your-site}.myvtex.com/admin/apps/bamboopayments.payment@1.3.4/setup/`

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_05.png)

Once you have installed the component, you need to configure the payment methods to be used. To do so, add Bamboo as payment processor as mentioned in the [Configure Bamboo Payment provider](#configure-bamboo-payment-provider) section.

## Configure Bamboo Payment provider
To configure the payment provider, click the _**Store Settings**_ option in the left panel. Then, select the _**Settings**_ option in the _**Payment**_ group.

The _Payment settings_ window opens, go to the _**Gateway Affiliations**_ tab. Alternatively, you can use to the following URL `https://{your-site}.myvtex.com/admin/pci-gateway/#/affiliations`

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_06.png)

Click the plus icon in the top right corner to add the connector, then search for the Bamboo connector in the _**OTHER**_ section.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_07.png)

Provide the following information for the Bamboo Gateway Affiliation:

* **Affiliation name**: VTEX assigns a name by default. Nevertheless, you can set one of your choice.
* **Test or Live toggle**: select mode of the Gateway Affiliation. You should select the _Test_ mode first to try out the Gateway Affiliation before start using it in real transactions.
* **Application Key**: Use the _**Bamboo app key**_ field [generated before](#generate-key-and-token-for-vtex).
* **Application Token**: Use the _**Bamboo app token**_ field [generated before](#generate-key-and-token-for-vtex).

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_08.png)

Click _**Save**_ when finish.

## Configure the payment methods
After you configured the Bamboo Gateway Affiliation, you need to configure the payment methods. You can configure the payment methods predefined by VTEX or custom payment methods.

### Configure predefined payment methods
Within the payment methods, you can configure the pre-existing ones in VTEX (Visa, Mastercard, Cabal, etc). Follow the next procedure to add a payment method.

Go to the _**Store Settings**_ option in the left panel. Then, select the _**Settings**_ option in the _**Payment**_ group.

The _Payment settings_ window opens, go to the _**Payment conditions**_ tab.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_09.png)

Click the plus icon in the top right corner to add a new payment condition, then search for the payment method you want to include.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_10.png)

Provide the following information for the payment condition:

* **Condition name**: Provide a meaningful name for the condition in the field next to the payment method name.
* **Status**: define whether the condition is enabled.
* **Process with affiliation**: select the Bamboo Gateway Affiliation created in the previous step.
* **Payment conditions**: In the right panel, add the conditions related to the payment method such as installments, rates, among others.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_11.png)

Click _**Save**_ when finish.