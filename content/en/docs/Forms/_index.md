---
title: "Forms"
date: 2023-03-02T08:28:16-05:00
Description: >
  A Form in Bamboo Payment, allows your customers to perform operations such as purchases or tokenization through a web interface.
weight: 50
---

## Methods supported

### GetToken

This method receives an object with the specific parameters for the desired payment method.

#### Object tokenRequest:

| Property    |     Description     |  | Mandatory? | |
|-------------|--------------------|:-----------:|:------:|:------:|
|               |                      | Physical Network | Cards | Redirect
| **PaymentMediaId** <br> *numeric*    | Payment media identifier | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/>
| **PaymentMediaType** <br> *numeric*  | Payment media type identifier (see [table](/docs/payment-methods.html#payment-method-types) Payment method types) |  |  | 
| **IssuerBank** <br> *numeric*     | Bank identifier (see [table](/docs/payment-methods/uruguay.html#issuer-banks-table) Issuer Bank) |    |   |  
| **Email**  <br> *string*      |   Email address of the Customer.    | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/>
| **DocumentNumber**  <br> *string*      |   Customer document number.    |    <img src="/assets/check_mark_64.png" width="15px"/> |   |  
| **DocumentType**  <br> *numeric*      |   Customer document type |    <img src="/assets/check_mark_64.png" width="15px"/> |   |  
| **LoyaltyPlanId** <br> *numeric*            | Loyalty Plan identifier |    |   |  |
| **LoyaltyPlanUserIdentification** <br> *string*|  Loyalty Plan user identifier|    |   |  

Examples:

{{< tabs tabTotal="5" tabID="tabs" tabName1="CashPayment" tabName2="MasterCard" tabName3="MasterCard(Santander)" tabName4="Cards" tabName5="Redirect" >}}

{{< tab tabNum="1" >}}
<br>
This example generates a token for RedPagos.

```javascript
var tokenRequest = {
      PaymentMediaId: 5, 
      Email: "john@bamboopayment.com", 
      DocumentNumber: "12345672", 
      DocumentType: 2
    };
    
PWCheckout.Iframe.GetToken(tokenRequest);

 ```

{{< /tab >}}
{{< tab tabNum="2" >}}
<br>

This example opens the capture form only for MasterCard cards

```javascript
var tokenRequest = {
      PaymentMediaId: 2, 
      Email: "john@bamboopayment.com"
    };
    
PWCheckout.Iframe.GetToken(tokenRequest);
```

{{< /tab >}}
{{< tab tabNum="3" >}}
<br>

This example opens the capture form only for MasterCard cards emitted by Santander Bank

```javascript
var tokenRequest = {
      PaymentMediaId: 2, 
      IssuerBank: 1, 
      Email: "john@bamboopayment.com"
    };
    
PWCheckout.Iframe.GetToken(tokenRequest);

```
{{< /tab >}}
{{< tab tabNum="4" >}}
<br>

This example opens the capture form only for Visa Debit cards

```javascript
var tokenRequest = {
      PaymentMediaId: 1, 
      PaymentMediaType: 2, 
      Email: "john@bamboopayment.com"
    };
    
PWCheckout.Iframe.GetToken(tokenRequest);

```
{{< /tab >}}
{{< tab tabNum="5" >}}
<br>

This example generates an OneTimeToken for Khipu payments

```javascript
var tokenRequest = {
      PaymentMediaId: 110, 
      Email: "john@bamboopayment.com"
    };
    
PWCheckout.Iframe.GetToken(tokenRequest);

 ```
{{< /tab >}}
{{< /tabs >}}


### GetCustomToken
This method is used to get a **Token** without showing the capture form to the customer. This method is useful when the Purchase transaction will be submitted throw a Cash Payment network.

In fact, this method is available only to these payment methods types.

| Property        |      Description      |   Mandatory |
|-------------|-----------|:-----: |
| **paymentMediaId** <br> *numeric*     | Identifier of the payment methods (cash collection network) for which the payment token is required. <br>Possible values:<br> • 5 – Abitab <br> • 10 – Redpagos  <br>  | Yes |
| **email**  <br> *string*      |  Customer’s email address |   Yes |
| **documentNumber**  <br> *string*      |   Customer’s document number.    |   Yes |
| **documentType**  <br> *numeric*      |   Customer’s document type. <br>If it is not informed, the national document type will be assumed (“Cédula de Identidad” in Uruguay).<br>Possible values: <br>• 1. RUT <br> • 2. Cédula de identidad <br> • 3. Extranjero   |   No |

Example:

```javascript
    PWCheckout.GetCustomToken(5, "email@domain.com", "12345672");
 ```

{{% alert title="Note" color="info"%}}
The payment **token** will be delivered in the same way as the other methods, it will be included in the hidden text field `PWToken` and the `tokenCreated` event will be triggered as well as the other methods to get the **Token**
{{% /alert %}}

### GetCustomRedirectToken

This method is used to get a **Token** for Redirect flow payments.

| Property    | Description | Mandatory |
|-------------|-------------|:--------:|
| **paymentMediaId** <br> *numeric*     | Identifier of the payment methods for which the **token** is required.<br>Possible values:<br>⦁	All Redirect flow payments.  | Yes |
| **email**  <br> *string*      |   Customer’s email address.  |   Yes |

Example:

```javascript
    PWCheckout.GetCustomRedirectToken(106, "email@domain.com");
 ```

{{% alert title="Note" color="info"%}}
The payment **token** will be delivered in the same way as the other methods, that is, it will be included in the hidden text field `PWToken` and also the `tokenCreated` event will be triggered as well as the other methods of obtaining the Token.
{{% /alert %}}

## Javascript Objects

### CloseInfo
The `CloseInfo` object is returned in the "closed" event, which is triggered in response to the closing of the card data capture form window.

| Field        |      Description      | 
| ------------- |-----------|
| Reason <br> *string*      |  Description of the reason why the window was closed. The possible reasons are the following: <br>  • **ESCAPE**: The “Esc” button was pressed.<br> • **CLOSE_BUTTON**: The closing button of the window was pressed. <br> • **TIMEOUT**: The maximum waiting time for the user to enter the data was exceeded. <br> • **COMMERCE_ACTION**: An action need to be taken by the Commerce. <br> • **ERROR**: An error occurred. <br> • **TOKEN_RECEIVED**: The generated token was received from the data entered by the user. <br> • **NOTIFICATION_RECEIVED**: A notification has been received. <br> • **PAGE_CLICK**: The page was clicked (outside the capture from) and the Property "close_onclick" was set to “true”. | 

<br>

### TokenInfo
The TokenInfo object is returned in the "tokenCreated" event, which is triggered when the Token created from the data informed by the user is received in the card data capture form.

| Field <br> *type*       |      Description      | 
| ------------- |-----------|
|  TokenId <br> *String*    | Generated Token identifier.|
| Created <br> *TimeStamp* |  Token creation date and time.|
| Type <br> *string* | Token type, possible values: <br>- `OneTime` <br> - `Commerce` |
| Brand <br> *string* | Brand of the card or means of payment used|
| IssuerBank <br> *string* | Card issuer bank (in case it can be determined).|
| Owner <br> *string* | Cardholder name|
| Last4 <br> Numeric[4] | Card last 4 digits. |
| CardType <br> *string* |  Means of payment (or card) type, possible values:<br> • “CreditCard” <br> • “DebitCard” <br> • “PhysicalNetwork” <br> • “PrePaid” |
|CardExpMonth <br> *Numeric\[2\]* | Card expiration month|
|CardExpYear <br> Numeric\[2\]| Card expiration year

<br>

### NotificationInfo

The **NotificationInfo** object is returned in the “notificationReceived” event, which is triggered when the ***Verification Code Request Flow finish***.


| Field <br> *Type*       |      Description      | 
| ------------- |-----------|
|ProcessType <br>string |Defines the process type for which the notification is being issued.<br>Possible values are:<br>⦁	PURCHASE_PENDING – process to authorize a pending purchase. |
|ProcessStatus <br> Numeric\[1\]| Possible statuses of a process are:<br> • 1 – OK (the process completed successfully) <br> • 2 – PENDING (the process is still pending). <br> • 3 – ERROR (the process completed with error)|