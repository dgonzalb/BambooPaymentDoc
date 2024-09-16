---
title: "Integration Guide"
linkTitle: "Integration Guide"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate Bamboo's payment solutions into your VTEX e-commerce store. This guide provides step-by-step instructions for seamless setup and configuration.
weight: 10
tags: ["subtopic"]
---

You'll find detailed instructions for setting up authentication, configuring payment settings, and establishing conditions for both installment and single payment options. 

---
## General Setup

To configure Bamboo as a payment provider in your VTEX store, follow these steps:

1. Log in to your VTEX admin panel using your credentials.

![PrintScreen](/assets/VTEX/bamboo-vtex-000.png)

2. Navigate to 'Store Configuration' > 'Providers' > 'New Provider'.

![PrintScreen](/assets/VTEX/bamboo-vtex-001.png)

3. Search for **Bamboo-Payments** in the list of providers and select it.

![PrintScreen](/assets/VTEX/bamboo-vtex-002.png)

## Bamboo Plugin Configuration

### Authentication Setup

Enter your store credentials in the designated fields. For information on generating your store keys, refer to the <a href="https://help.vtex.com/en/tutorial/claves-de-aplicacion--2iffYzlvvz4BDMr6WGUtet#generar-claves-de-aplicacion-internas" target="_blank">VTEX Keys documentation</a>

![PrintScreen](/assets/VTEX/bamboo-vtex-003.png)

### Payment Control

1. Choose whether to operate in test mode.

![PrintScreen](/assets/VTEX/bamboo-vtex-004.png)


2. Select your preferred type of settlement.

{{% alert title="Info" color="info"%}}
Test mode allows you to simulate Bamboo transactions in your store before offering it to customers. Deselect this option when you're ready to process real transactions.
{{% /alert %}}



### Provider Fields

Configure the following settings:

1. **Private Key**: Enter your Bamboo PrivateKey.
2. **Enable Authorization and Capture**: If enabled, you'll need to manually capture payments made with Bamboo from your store.
3. **Operating Country**: Select the country where your store operates.

![PrintScreen](/assets/VTEX/bamboo-vtex-005.png)


After completing these fields, click the **'Save'** button.

## Payment Methods Configuration

To set up payment methods:

1. Go to the 'Payment Conditions' tab.

![PrintScreen](/assets/VTEX/bamboo-vtex-006.png)

2. Click the '+' icon to add a new condition.
3. Configure the payment method you want to offer to your customers.

![PrintScreen](/assets/VTEX/bamboo-vtex-007.png)


### Installments for Credit Cards

To set up installments for Credit Cards:

1. Select the desired card brand from the list.

![PrintScreen](/assets/VTEX/bamboo-vtex-008.png)

2. Activate the condition.

![PrintScreen](/assets/VTEX/bamboo-vtex-009.png)

3. Select Bamboo-Payments as the provider.

![PrintScreen](/assets/VTEX/bamboo-vtex-010.png)

4. Enter a name to identify the payment condition.

![PrintScreen](/assets/VTEX/bamboo-vtex-011.png)

5. Choose the 'Installments' option and enter the requested data.
6. Configure interest rates and/or external interests as needed.
7. Save the changes.

![PrintScreen](/assets/VTEX/bamboo-vtex-013.png)

### Single Payment (One-time Payment) for Credit and Debit Cards

To set up single payments (payments in one installment):

1. Follow the same process as 'Installment Payments'.
2. Instead of selecting 'Installments', choose the 'Single Payment' option.

![PrintScreen](/assets/VTEX/bamboo-vtex-015.png)

3. Configure the necessary details for one-time payments.
4. Save the changes.

![PrintScreen](/assets/VTEX/bamboo-vtex-016.png)

By following these steps, you'll successfully offer Bamboo as a payment method to your customers in your VTEX store, including both installment plans and single payment options.

{{% alert title="Info" color="info"%}}
Changes to payment conditions may take up to **10 minutes** to apply at your VTEX store's checkout.
{{% /alert %}}

## Antifraud Script

For the correct functioning of transactions made through Bamboo, an anti-fraud analysis script must be injected into the store. To configure it, follow the steps below:


{{% alert title="Important note" color="info"%}}
 This configuration only applies to **PayFac merchants.** It is not valid for the Gateway modality. If you have any doubts, please consult with support or your account manager.
{{% /alert %}}


1. Inside the VTEX administrative panel, go to 'Store Settings'.

![PrintScreen](/assets/VTEX/bamboo-vtex-antifraud-001.png)

2. Navigate to 'Storefront > Checkout'.
3. Click on the configuration icon for the 'Default' option.

![PrintScreen](/assets/VTEX/bamboo-vtex-antifraud-002.png)

4. Enter 'Code > checkout-custom.js'.

![PrintScreen](/assets/VTEX/bamboo-vtex-antifraud-003.png)

5. Insert the following code block into the file and save:

```javascript
const API_Environment = "https://api.bamboopayment.com",
    PublicAccountKey = "CT4XUYw10xDemA4UqCgU0m_I56ONV7HQ";

async function getIp() {
    return fetch("https://api.ipify.org/?format=json")
}

async function loadScript(e, t) {
    if (!window.vtex || window.vtex.deviceFingerprint) {
        console.debug(window.vtex ? `already deviceFingerprint: ${window.vtex.deviceFingerprint}` : "there is no VTEX");
        return
    }
    let n = document.createElement("script");
    n.src = e,
    n.onload = t,
    document.head.appendChild(n)
}

async function generateFingerPrint() {
    if (!window.setSessionID) {
        console.debug("SetSessionID not found");
        await new Promise(e => setTimeout(() => e(!0), 1e3));
        console.debug("Retrying...");
        return generateFingerPrint();
    }
    let e = window.getSessionAntifraud(),
        t = await getIp().then(e => e.json()).then(({ip: e}) => e),
        n = JSON.stringify({
            sessionId: e,
            ip: t
        });
    window.vtex.deviceFingerprint = n
}

window.addEventListener("DOMContentLoaded", () => {
    console.info("==== RUNNING FINGER PRINT ====");
    loadScript(`${API_Environment}/v1/Scripts/Antifraud.js?key=${PublicAccountKey}`, generateFingerPrint)
});
```

This script will ensure that the anti-fraud analysis is performed correctly for transactions processed through Bamboo.