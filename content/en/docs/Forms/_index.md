---
title: "Tokenization Form"
linkTitle: "Tokenization Form"
date: 2024-07-31T09:28:16-05:00
Description: >
  The Tokenization Form securely captures the customer's credit or debit card information and converts sensitive data into a token. The **token** can then be used to process transactions without storing card information directly on the merchant's systems.
weight: 50
notopicssection: true
---

This form is used when a customer makes an online purchase, and their card information must be securely captured for payment processing. Instead of directly storing the card data, this form generates a token that can be sent to the merchant's server to complete the purchase process.


{{% alert title="Looking for previous versions of the Capture Form?" color="info"%}}
If you're searching for documentation on earlier version of the Capture Form, please refer to our [Legacy Systems section]({{< ref Checkout-Form.md >}})
{{% /alert %}}

## Importing the JavaScript Library

To integrate the Tokenization Form into your website, it's necessary to include a script that points to the form's URL. This allows access to the **BambooForm** object containing the methods needed to render Bamboo forms.

```javascript
//STAGE - Test Environment:
<script src="https://capture.stage.bamboopayment.com"></script>
```

<br/>

```javascript
//PRODUCTION:
<script src="https://capture.bamboopayment.com"></script>
```

### **renderTokenizationForm** Method

Once the Script pointing to Bamboo forms is imported, you'll have access to the **renderTokenizationForm** method that renders the **Tokenization Form** in your application, allowing your users to securely enter their cards.

```javascript
BambooForm.renderTokenizationForm(configuration);
```

<br/>
<div style="text-align: center"><img src="/assets/Tokenization_Form.png" alt="Tokenization Form" width="300"/></div>

### Request Example

```javascript
<script> 
BambooForm.renderTokenizationForm({
  containerId: 'MERCHANT_PAGE_CONTAINER_ID',
  metadata: {
    publicKey: 'MERCHANT_PUBLIC_KEY',
    targetCountryISO: 'UY',
    customer: {
      email: 'cliente@example.com',
      cardHolderName: 'Juan Pérez'
    },
    locale: 'es',
    logoUrl: '<https://mieshop.com/logo.png>'
  },
  hooks: {
    onOperationSuccess: (token) => {
      console.log('Token received:', token);
    },
    onOperationError: (error) => {
      console.error('Error:', error);
    }
  }
});
</script>
```

### Configuration Parameters

| Parameter | Type | Mandatory? | Description |
|-----------|------|:----------:|-------------|
| `containerId` | `string` | Yes | HTML container ID where the form will be displayed. |
| `metadata` | `object` | Yes | Configures information related to the customer and transaction. |
| `hooks` | `object` | Yes | Callback functions to handle form events. |

### Customize your Tokenization Form | metadata object

You can customize the tokenization form with your logo and preferred language, besides pre-fill data already provided by your customer, or restrict the tokenization to specific cards.

| Parameter | Type | Mandatory? | Description |
|-----------|------|:----------:|-------------|
| `metadata` → `publicKey` | `string` | Yes | Merchant's public key, necessary for secure tokenization. |
| `metadata` → `targetCountryISO` | `string` | Yes | ISO code of the country where the transaction will be processed. |
| `metadata` → `customer` | `object` | No | Customer information. |
| `metadata` → `locale` | `string` | No | Form language, using ISO code Spanish: 'es' (default) English: 'en' |
| `metadata` → `logoUrl` | `string` | No | URL of the logo that will appear on the form. If not defined, it's shown without a logo in the header |
| `metadata` → `filters` | `object` | No | Allows restricting the card entered by the user to a specific issuing bank or card type |

#### Customer Information

| Parameter | Type | Mandatory? | Description |
|-----------|------|:----------:|-------------|
| `metadata` → `customer` → `uniqueId` | `string` | No | Unique customer identifier. Indicates if a single-use or recurring Token is generated [Token Types](https://docs.bamboopayment.com/en/docs/purchase-workflow/customer-types/anonymous-users.html) |
| `metadata` → `customer` → `email` | `string` | No | Customer's email. It's pre-loaded in the form and allows editing if there are syntax errors that prevent token generation |
| `metadata` → `customer` → `cardHolderName` | `string` | No | Cardholder's name. It's pre-loaded in the form without editing option. |

#### Tokenization restricted to specific Cards

| Parameter | Type | Mandatory? | Description |
|-----------|------|:----------:|-------------|
| `metadata` → `filters` → `paymentMediaType` | `number` | No | Identifier of the payment method type (credit card, debit card, etc.). ([See payment methods](https://docs.bamboopayment.com/en/docs/payment-methods.html#payment-method-types)) |
| `metadata` → `filters` → `issuerBank` | `number` | No | Issuing bank identifier. ([See banks](https://docs.bamboopayment.com/en/docs/payment-methods/uruguay.html#issuer-banks-table)) |

### Manage your customer interaction | hooks object

| Parameter | Type | Mandatory? | Description |
|-----------|------|:----------:|-------------|
| `hooks` → `onOperationSuccess` | `function` | Yes | Callback executed upon successful tokenization. Receives the token as a parameter. |
| `hooks` → `onOperationFinalize` | `function` | No | Optional callback executed when the operation is finalized. |
| `hooks` → `onOperationError` | `function` | No | Optional callback that handles errors during tokenization. |
| `hooks` → `onApplicationLoaded` | `function` | No | Callback executed when the form has been loaded correctly. |

<br/>
<div style="text-align: center"><img src="/assets/Tokenization_Form_Details.png" alt="Tokenization Form Details" width="500"/></div>


## Successful tokenization | Token object 

The **token** object is returned in the **onOperationSuccess** hook executed upon successful tokenization and contains the following parameters.

| Property | Type | Description |
|---|:-:|---|
| `TokenId` | `string` | Token identifier. |
| `Created` | `timestamp` | Token creation date and time. |
| `Type` | `string` | Token type, possible values: `OneTime`, `Commerce` |
| `Brand` | `string` | Card brand or payment method used. |
| `IssuerBank` | `string` | Card Issuing Bank. |
| `Owner` | `string` | Cardholder's name. |
| `Bin` | `numeric[6]` | Card identifier. |
| `Last4` | `numeric[4]` | Last four digits of the card. |
| `CardType` | `string` | Payment method or card type, possible values: `CreditCard`, `DebitCard`, `PhysicalNetwork`, `PrePaid` |
| `CardExpMonth` | `numeric[2]` | Card expiration month. |
| `CardExpYear` | `numeric[2]` | Card expiration year. |