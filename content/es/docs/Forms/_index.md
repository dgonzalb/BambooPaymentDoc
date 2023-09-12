---
title: "Formularios"
date: 2023-03-02T08:28:16-05:00
Description: >
 Un formulario en Bamboo Payment le permite a sus clientes realizar compras o tokenizaciones a través de una interfaz web.
weight: 50
---

## Métodos soportados {#methods-supported}

### GetToken
Este método recibe un objeto con los parámetros específicos del medio de pago deseado.

#### Objeto tokenRequest: {#object-tokenrequest}

| Propiedad | Descripción | | ¿Obligatorio? | |
|-------------|--------------------|:-----------:|:------:|:------:|
| | | **Red física** | **Tarjetas** | **Flujo Redirect** |
| **PaymentMediaId** <br> *numeric* | Identificador del medio de pago. | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |
| **PaymentMediaType** <br> *numeric* | Identificador del tipo de medio de pago (vea la [tabla](/es/docs/payment-methods.html#payment-method-types) tipos de medio de pago). | | | |
| **IssuerBank** <br> *numeric* | Identificador del banco (vea la [tabla](/es/docs/payment-methods/uruguay.html#issuer-banks-table) Banco Emisor). | | | 
| **Email** <br> *string* | Dirección de correo electrónico del cliente. | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |
| **DocumentNumber** <br> *string* | Número de documento del cliente. | <img src="/assets/check_mark_64.png" width="15px"/> | | |
| **DocumentType** <br> *numeric* | Tipo de documento del cliente. | <img src="/assets/check_mark_64.png" width="15px"/> | | |
| **LoyaltyPlanId** <br> *numeric* | Identificador del plan de fidelización. | | | |
| **LoyaltyPlanUserIdentification** <br> *string*| Identificador del usuario del plan de fidelización. | | | |

Ejemplos:

{{< tabs tabTotal="5" tabID="tabs" tabName1="Pago en Efectivo" tabName2="MasterCard" tabName3="MasterCard (Santander)" tabName4="Solo tarjetas crédito y débito" tabName5="Redirect" >}}

{{< tab tabNum="1" >}}
<br>

Este ejemplo genera un token para _RedPagos_.<br>

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

Este ejemplo abre el formulario de captura solo para tarjetas _MasterCard_.<br>

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

Este ejemplo abre el formulario de captura solo para tarjetas _MasterCard_ emitidas por banco _Santander_.<br>

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
 
Este ejemplo abre el formulario de captura solo para tarjetas _Visa Débito_.<br>

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

Este ejemplo genera un `OneTimeToken` para pagos en _Khipu_.<br>

```javascript
var tokenRequest = {
 PaymentMediaId: 110, 
 Email: "john@mail.com"
 };
 
PWCheckout.Iframe.GetToken(tokenRequest);

 ```
{{< /tab >}}
{{< /tabs >}}

<!--
### GetCustomToken
Use this method to get a **Token** without showing the capture form to the customer. This method is proper when you submit the Purchase transaction through a Cash Payment network.

This method is available only to these payment method types.

| Propiedad | Descripción | ¿Obligatorio? |
|-------------|-----------|:-----:|
| **paymentMediaId** <br> *numeric* | Identify the payment method (cash collection network) for which you require the Token.<br>Posibles valores:<br><ul style="margin-bottom: initial;"><li>**5** – Abitab</li><li>**10** – Redpagos</li></ul> | Sí |
| **email** <br> *string* | Customer’s email address | Sí |
| **documentNumber** <br> *string* | Customer’s document number. | Sí |
| **documentType** <br> *numeric* | Customer’s document type. <br>If it's not sent, the method considers the national document type (_Cédula de Identidad_ in Uruguay).<br>Posibles valores:<ul style="margin-bottom: initial;"><li>**1** – RUT</li><li>**2** – Cédula de identidad</li><li>**3** – Extranjero</li></ul> | No |

Ejemplo:

```javascript
 PWCheckout.GetCustomToken(5, "email@domain.com", "12345672");
 ```

{{% alert title="Nota" color="info"%}}
The method delivers the payment **token** in the same way as the other methods; it is included in the hidden text field `PWToken` and triggers the `tokenCreated` event like the other methods.
{{% /alert %}}

### GetCustomRedirectToken

This method is used to get a **Token** for Redirect flow payments.

| Propiedad | Descripción | ¿Obligatorio? |
|-------------|-------------|:--------:|
| **paymentMediaId** <br> *numeric* | Identifier of the payment methods for which they require the **token**.<br>Posibles valores:<br><ul style="margin-bottom: initial;"><li>All Redirect flow payments.</li></ul> | Sí |
| **email** <br> *string* | Correo electrónico del cliente address. | Sí |

Ejemplo:

```javascript
 PWCheckout.GetCustomRedirectToken(106, "email@domain.com");
 ```

{{% alert title="Nota" color="info"%}}
The method delivers the payment **token** in the same way as the other methods; it is included in the hidden text field `PWToken` and triggers the `tokenCreated` event like the other methods.
{{% /alert %}}-->

## Objetos JavaScript {#javascript-objects}

### CloseInfo
El objeto `CloseInfo` se retorna en el evento `closed`, que se lanza cuando el usuario cierra el formulario de captura de datos de la tarjeta.

| Campo | Descripción | 
| ------------- |-----------|
| Reason <br> *string* | Descripción de la razón del cierre de la ventana. Las causas posibles son las siguientes: <br><ul style="margin-bottom: initial;"><li>**ESCAPE**: El usuario presionó el botón _**Esc**_.</li><li>**CLOSE_BUTTON**: El usuario presionó el botón de cierre de la ventana.<li>**TIMEOUT**: EL usuario ha excedido el tiempo máximo para ingresar la información.</li><li>**COMMERCE_ACTION**: EL comercio necesita realizar una acción.</li><li>**ERROR**: Ocurrió un error.</li><li>**TOKEN_RECEIVED**: Se recibió el token de la información ingresada por el usuario.</li><li>**NOTIFICATION_RECEIVED**: Se recibió una notificación.</li><li>**PAGE_CLICK**: El usuario hizo clic fuera de la forma de captura y la propiedad `close_onclick` está en `true`.</li></ul> | 

### TokenInfo
El objeto `TokenInfo` se retorna en el evento `tokenCreated` lanzado por el formulario de captura de datos de la tarjeta después de procesar la información del usuario.

| Campo <br> *Tipo* | Descripción | 
| ------------- |-----------|
| TokenId <br> *string* | Identificador del token. |
| Created <br> *timestamp* | Fecha y hora de creación del token. |
| Type <br> *string* | Tipo de token, posibles valores: <br><ul style="margin-bottom: initial;"><li>`OneTime`</li><li>`Commerce`</li></ul> |
| Brand <br> *string* | Marca de la tarjeta o medio de pago utilizado. |
| IssuerBank <br> *string* | Banco Emisor de la tarjeta. |
| Owner <br> *string* | Nombre del tarjetahabiente. |
| Last4 <br> *numeric[4]* | Cuatro últimos dígitos de la tarjeta. |
| CardType <br> *string* | Tipo de medio de pago o tarjeta, posibles valores:<br><ul style="margin-bottom: initial;"><li>`CreditCard`</li><li>`DebitCard`</li><li>`PhysicalNetwork`</li><li>`PrePaid`</li></ul> |
| CardExpMonth <br> *numeric[2]* | Mes de vencimiento de la tarjeta. |
| CardExpYear <br> *numeric[2]*| Año de vencimiento de la tarjeta. |

### NotificationInfo

El objeto `NotificationInfo` se retorna en el evento `notificationReceived`, que se lanza cuando termina el flujo de Solicitud del código de verificación.

| Campo <br> *Tipo* | Descripción | 
| ------------- |-----------|
|ProcessType <br>*string* | Define el tipo de proceso de la notificación que se está lanzando.<br>Los posibles valores son:<br><ul style="margin-bottom: initial;"><li>`PURCHASE_PENDING` – proceso para autorizar compras pendientes.</li></ul> |
|ProcessStatus <br> *numeric[1]*| Los estados posibles del proceso son:<br><ul style="margin-bottom: initial;"><li>**1** – OK (el proceso se completó exitosamente)</li><li>**2** – PENDING (el proceso sigue pendiente)</li><li>**3** – ERROR (el proceso se completó con errores)</li></ul> |