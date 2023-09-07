---
title: "Forms"
date: 2023-03-02T08:28:16-05:00
Description: >
 A Form in Bamboo Payment allows customers to perform purchases or tokenization through a web interface.
weight: 50
---

## Methods supported

### GetToken

This method receives an object with the specific parameters for the desired payment method.

#### Object tokenRequest:

| Property | Description | | Mandatory? | |
|-------------|--------------------|:-----------:|:------:|:------:|
| | | Physical Network | Cards | Redirect |
| **PaymentMediaId** <br> *numeric* | Payment media identifier. | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |
| **PaymentMediaType** <br> *numeric* | Payment media type identifier (see [table](/es/docs/payment-methods.html#payment-method-types) Payment method types). | | | |
| **IssuerBank** <br> *numeric* | Bank identifier (see [table](/es/docs/payment-methods/uruguay.html#issuer-banks-table) Issuer Bank). | | | 
| **Email** <br> *string* | Email address of the Customer. | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |
| **DocumentNumber** <br> *string* | Número de documento del cliente. | <img src="/assets/check_mark_64.png" width="15px"/> | | |
| **DocumentType** <br> *numeric* | Tipo de documento del cliente. | <img src="/assets/check_mark_64.png" width="15px"/> | | |
| **LoyaltyPlanId** <br> *numeric* | Loyalty Plan identifier. | | | |
| **LoyaltyPlanUserIdentification** <br> *string*| Loyalty Plan user identifier. | | | |

Examples:

{{< tabs tabTotal="5" tabID="tabs" tabName1="Cash Payment" tabName2="MasterCard" tabName3="MasterCard (Santander)" tabName4="Only Credit or Debit Cards" tabName5="Redirect" >}}

{{< tab tabNum="1" >}}
<br>
This example generates a token for _RedPagos_.<br>

```javascript
var tokenRequest = {
 PaymentMediaId: 5, 
 Email: "john@mail.com", 
 DocumentNumber: "12345672", 
 DocumentType: 2
 };
 
PWCheckout.Iframe.GetToken(tokenRequest);

```

{{< /tab >}}
{{< tab tabNum="2" >}}
<br>

This example opens the capture form only for _MasterCard_ cards.<br>

```javascript
var tokenRequest = {
 PaymentMediaId: 2, 
 Email: "john@mail.com"
 };
 
PWCheckout.Iframe.GetToken(tokenRequest);
```

{{< /tab >}}
{{< tab tabNum="3" >}}
<br>

This example opens the capture form only for _MasterCard_ cards issued by _Santander_ Bank.<br>

```javascript
var tokenRequest = {
 PaymentMediaId: 2, 
 IssuerBank: 1, 
 Email: "john@mail.com"
 };
 
PWCheckout.Iframe.GetToken(tokenRequest);

```
{{< /tab >}}
{{< tab tabNum="4" >}}
<br>

This example opens the capture form only for _Visa Debit_ cards.<br>

```javascript
var tokenRequest = {
 PaymentMediaId: 1, 
 PaymentMediaType: 2, 
 Email: "john@mail.com"
 };
 
PWCheckout.Iframe.GetToken(tokenRequest);

```
{{< /tab >}}
{{< tab tabNum="5" >}}
<br>

This example generates a `OneTimeToken` for _Khipu_ payments.<br>

```javascript
var tokenRequest = {
 PaymentMediaId: 110, 
 Email: "john@mail.com"
 };
 
PWCheckout.Iframe.GetToken(tokenRequest);

 ```
{{< /tab >}}
{{< /tabs >}}


### GetCustomToken
Use this method to get a **Token** without showing the capture form to the customer. This method is proper when you submit the Purchase transaction through a Cash Payment network.

This method is available only to these payment method types.

| Property | Description | Mandatory |
|-------------|-----------|:-----:|
| **paymentMediaId** <br> *numeric* | Identify the payment method (cash collection network) for which you require the Token.<br>Posibles valores:<br><ul style="margin-bottom: initial;"><li>**5** – Abitab</li><li>**10** – Redpagos</li></ul> | Sí |
| **email** <br> *string* | Customer’s email address | Sí |
| **documentNumber** <br> *string* | Customer’s document number. | Sí |
| **documentType** <br> *numeric* | Customer’s document type. <br>If it's not sent, the method considers the national document type (_Cédula de Identidad_ in Uruguay).<br>Posibles valores:<ul style="margin-bottom: initial;"><li>**1** – RUT</li><li>**2** – Cédula de identidad</li><li>**3** – Extranjero</li></ul> | No |

Example:

```javascript
 PWCheckout.GetCustomToken(5, "email@domain.com", "12345672");
 ```

{{% alert title="Nota" color="info"%}}
The method delivers the payment **token** in the same way as the other methods; it is included in the hidden text field `PWToken` and triggers the `tokenCreated` event like the other methods.
{{% /alert %}}

### GetCustomRedirectToken

This method is used to get a **Token** for Redirect flow payments.

| Property | Description | Mandatory |
|-------------|-------------|:--------:|
| **paymentMediaId** <br> *numeric* | Identifier of the payment methods for which they require the **token**.<br>Posibles valores:<br><ul style="margin-bottom: initial;"><li>All Redirect flow payments.</li></ul> | Sí |
| **email** <br> *string* | Customer's email address. | Sí |

Example:

```javascript
 PWCheckout.GetCustomRedirectToken(106, "email@domain.com");
 ```

{{% alert title="Nota" color="info"%}}
The method delivers the payment **token** in the same way as the other methods; it is included in the hidden text field `PWToken` and triggers the `tokenCreated` event like the other methods.
{{% /alert %}}

## JavaScript Objects

### CloseInfo
The `CloseInfo` object is returned in the `closed` event, triggered when the user closes the card data capture form.

| Field | Description | 
| ------------- |-----------|
| Reason <br> *string* | Description of the reason why the window was closed. The possible causes are the following: <br><ul style="margin-bottom: initial;"><li>**ESCAPE**: The user pressed the _**Esc**_ button.</li><li>**CLOSE_BUTTON**: The user pressed the closing button of the window.<li>**TIMEOUT**: The user has exceeded the maximum waiting time to enter the data.</li><li>**COMMERCE_ACTION**: The commerce needs to take an action.</li><li>**ERROR**: An error occurred.</li><li>**TOKEN_RECEIVED**: The generated token was received from the data entered by the user.</li><li>**NOTIFICATION_RECEIVED**: A notification has been received.</li><li>**PAGE_CLICK**: The user clicked the page outside the capture form, and the property `close_onclick` is `true`.</li></ul> | 

### TokenInfo
The `TokenInfo` object is returned in the `tokenCreated` event triggered by the card data capture form after processing the user's data.

| Field <br> *type* | Description | 
| ------------- |-----------|
| TokenId <br> *String* | Token identifier. |
| Created <br> *TimeStamp* | Token creation date and time. |
| Type <br> *string* | Token type, posibles valores: <br><ul style="margin-bottom: initial;"><li>`OneTime`</li><li>`Commerce`</li></ul> |
| Brand <br> *string* | Brand of the card or payment method used |
| IssuerBank <br> *string* | Card issuer bank. |
| Owner <br> *string* | Cardholder name. |
| Last4 <br> Numeric[4] | The cards last four digits. |
| CardType <br> *string* | Payment method (or card) type, posibles valores:<br><ul style="margin-bottom: initial;"><li>`CreditCard`</li><li>`DebitCard`</li><li>`PhysicalNetwork`</li><li>`PrePaid`</li></ul> |
| CardExpMonth <br> *Numeric[2]* | Card expiration month. |
| CardExpYear <br> *Numeric[2]*| Card expiration year. |

### NotificationInfo

The **NotificationInfo** object is returned in the `notificationReceived` event, which is triggered when the Verification Code Request Flow finishes.

| Field <br> *Type* | Description | 
| ------------- |-----------|
|ProcessType <br>*string* | Defines the process type of the notification is being issued.<br>Posibles valores are:<br><ul style="margin-bottom: initial;"><li>`PURCHASE_PENDING` – process to authorize a pending purchase.</li></ul> |
|ProcessStatus <br> *Numeric[1]*| Possible statuses of a process are:<br><ul style="margin-bottom: initial;"><li>**1** – OK (the process completed successfully)</li><li>**2** – PENDING (the process is still pending)</li><li>**3** – ERROR (the process completed with error)</li></ul> |