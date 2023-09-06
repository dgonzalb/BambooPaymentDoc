---
title: "Usuarios Registrados"
linkTitle: "Usuarios Registrados"
date: 2023-07-17T07:28:16-05:00
description: >
  A diferencia de los [Usuarios Anónimos]({{< ref Anonymous-users.md>}}), estos usuarios están registrados en el sitio web por lo que peude indentificarlos y la información de su tarjeta puede ser asociada para realizar otras compras sin tener que ingresar nuevamente la información.
weight: 20
tags: ["subtopic"]
---

El cliente recibe un _CommerceToken_ despues de registrar su tarjeta, la cual peude se rutilizada para futuras transacciones. A continuación, se encuentran los pasos para comprar como un usuario registrado en el sitio web.

## Crear un Cliente {#create-a-customer}
El primer paso es crear el cliente en Bamboo Payment. Para esto, debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/customer`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/customer`

### Parámetros del Request {#request-parameters}

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|---|---|:-:|---|
| `Email` | `string` | Sí | Dirección de correo electrónico del cliente. |
| `FirstName` | `string` | Sí | Nombre del cliente. |
| `LastName` | `string` | Sí | Apellido del cliente. |
| `DocumentTypeId` | `string` | Sí | Tipo de documento del cliente. Encuentre los posibles valores en la tabla de Tipos de Docuemnto de acuerdo con el [país](/es/docs/payment-methods.html). |
| `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Owner` | `string` | No | Determina si el usuario es anónimo o si el comercio, o nosotros, lo regirstró.<br>Los posibles valores son:<ul style="margin-bottom: initial;"><li>_Our_</li><li>_Commerce_. Este es el valor por defecto.</li><li>_Anonymous_</li></ul>|
| `PhoneNumber` | `string` | Sí | Número de teléfono de contacto del cliente. |
| `BillingAddress` | `object` | Sí | Este parámetro es la dirección de facturación del cliente. |
| `BillingAddress`→`AddressID` | `integer` | Sí | Identificador de la dirección. |
| `BillingAddress`→`AddressType` | `string` | Sí | Tipo de dirección. |
| `BillingAddress`→`Country` | `string` | Sí | País de la dirección. |
| `BillingAddress`→`State` | `string` | Sí | Estado de la dirección. |
| `BillingAddress`→`City` | `string` | Sí | Ciudad de la dirección. |
| `BillingAddress`→`AddressDetail` | `string` | Sí |Este parámetro corresponde a la información adicional de la dirección, como calle, número, etc. |

#### Ejemplo del Request {#request-example}

```json
{
    "Email": "kristeldyoder@teleworm.us",
    "FirstName": "Kristel",
    "LastName": "Yoder",
    "DocNumber": "31130749",
    "DocumentTypeId": 2,
    "Owner": "Commerce",
    "PhoneNumber": "093000000",
    "BillingAddress": {
        "AddressType": 1,
        "Country": "Uruguay",
        "State": "Montevideo",
        "City": "Montevideo",
        "AddressDetail": "100"
    }
}
```

### Parámetros del Response {#response-parameters}
El objeto de respuesta retorna la información del cliente recién creado o el error que se haya podido producir. En el parámetro `Response.CustomerId` se encuentra el identificador de cliente generado por la API para poder consultarlo o actualizarlo.

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "CustomerId": 249205,
        "Created": "2023-08-22T11:26:53.343",
        "CommerceCustomerId": null,
        "Owner": "Commerce",
        "Email": "kristeldyoder@teleworm.us",
        "Enabled": true,
        "ShippingAddress": null,
        "BillingAddress": {
            "AddressId": 373151,
            "AddressType": 1,
            "Country": "Uruguay",
            "State": "Montevideo",
            "AddressDetail": "100",
            "PostalCode": null,
            "City": "Montevideo"
        },
        "Plans": null,
        "AdditionalData": null,
        "PaymentProfiles": [],
        "CaptureURL": "https://api.stage.bamboopayment.com/Capture/",
        "UniqueID": "UI_b53cb8db-771e-4622-a5db-0e58e156f192",
        "URL": "https://api.stage.bamboopayment.com/api/Customer/249205",
        "FirstName": "Kristel",
        "LastName": "Yoder",
        "DocNumber": "31130749",
        "DocumentTypeId": 2,
        "PhoneNumber": "093000000",
        "ExternalValue": null
    },
    "Errors": []
}
```

### Operaciones sobre los clientes {#customer-operations}
Una vez haya creado un usuario, puede realizar operaciones para obtener o actualizar su información.

#### Obtener un cliente {#get-a-customer}
Se puede obtener la información de cliente usando su Id o su dirección de correo electrónico.

Para esto, debe invocar un request **GET** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/customer`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/customer`

<div id="shortTable"></div>

| | Endpoint |
|---|---|---|
| Obtener por el _Identificador del cliente_ | `/{{customer-id}}` |
| Obtener por el _correo electrónico del cliente_ | `/GetCustomerByEmail?email={{EmailAddress}}` |

En la respuesta, se obtiene una lista con el mismo objeto retornado en la [creación del cliente](#response-example). Ejemplo:

```json
{
    "Response": [
        {
            "CustomerId": 249205,
            "Created": "2023-08-22T14:26:53.343",
            "CommerceCustomerId": null,
            "Owner": "Commerce",
            "Email": "kristeldyoder@teleworm.us",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 373151,
                "AddressType": 1,
                "Country": "Uruguay",
                "State": "Montevideo",
                "AddressDetail": "100",
                "PostalCode": null,
                "City": "Montevideo"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [],
            "CaptureURL": "https://api.stage.bamboopayment.com/Capture/",
            "UniqueID": "UI_61109a7f-5414-4424-8654-18c30060cd2b",
            "URL": "https://api.stage.bamboopayment.com/api/Customer/249205",
            "FirstName": "Kristel",
            "LastName": "Yoder",
            "DocNumber": "31130749",
            "DocumentTypeId": 2,
            "PhoneNumber": "093000000",
            "ExternalValue": null
        }
    ],
    "Errors": []
}
```

#### Actualizar un cliente {#update-a-customer}
Para actualizar la información de un cliente, debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/customer/{{{{customer-id}}}}/update`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/customer/{{customer-id}}/update`

Donde `{{customer-id}}` es el id generado cuando creó el usuario. In elñ cuerpo del request los [parámetros](#request-parameters) que quiera actualizar.

En la respuesta, se obtiene  el mismo objeto retornado en la [creación del cliente](#response-example).

## Capturar la información de la tarjeta {#capture-the-card-data}
El siguiente paso es obtener el token de la tarjeta del cliente. Para esto, puede invocar el formulario de inscripción de tarjeta o utilizar la [Tokenización Directa]({{< ref "Direct-Tokenization.md" >}}) si su comercio cumple la normativa PCI.

{{% alert title="Info" color="info"%}}
Si utiliza el identificador del Medio alternativo, no requiere realizar este paso y debe incluir el **PaymentMediaId**.
{{% /alert %}}

### Invocando el formulario de inscripción de tarjeta {#invoking-the-card-enrollment}
El siguiente diagrama de secuencia explica el flujo de inscripción de tarjetas.

![PrintScreen](/assets/CardEnrollmentFlow_en.png)

**Llamadas API durante el flujo:**

* **3**  HTTP/GET (server to server): `{environment_api}/v1/api/customer/{customer-id}`
* **11**  HTTP/GET (server to server): `{environment_api}/v1/api/customer/{customer-id}`

Con la información obtenida en el [paso anterior](#create-a-customer), puede invocar los métodos **OpenIframeCustom** o **OpenIframeCustomWithPaymentMediaOptions** (ver detalles más abajo) de la librería JavaScript `PWCheckout`, que gestionarán la captura de datos de la tarjeta.

#### OpenIframeCustom
El método **OpenIframeCustom** recibe dos parámetros:

* **URL:** La URL especifica la dirección del iFrame donde los clientes introducen los datos de la Tarjeta.<br>La URL se crea concatenando los datos recibidos de la siguiente manera: `{CaptureURL}?key={publicKey}&session_id={UniqueID}``
* **UniqueID:** un identificador para distinguir la sesión de captura de datos.

```javascript
<script type="text/javascript">
        PWCheckout.OpenIframeCustom(url, UniqueID);
</script>
```

#### OpenIframeCustomWithPaymentMediaOptions
El método  **OpenIframeCustomWithPaymentMediaOptions** recibe cuatro parámetros:

* **URL:** Igual que en OpenIframeCustom.
* **UniqueID:** Igual que en OpenIframeCustom.
* **PaymentMediaid:** Identificador del Medio de Pago. Si se envía, el Formulario de Captura de Tarjeta sólo aceptará tarjetas de este medio de pago. _Este parámetro sólo aplica para Uruguay_.
* **BankId:** [Identificador del banco](/es/docs/payment-methods/uruguay.html#issuer-banks-table). _Este parámetro sólo aplica para Uruguay_.

Si se envían ambos parámetros, el Formulario de Captura de Tarjeta sólo aceptará tarjetas del Medio de Pago y Banco especificados, pero son opcionales.

Ejemplos de llamadas al método **OpenIframeCustomWithPaymentMediaOptions**:

1. Llamada con `PaymentMediaId` y `BankId` enviados:

```javascript
<script type="text/javascript">
      PWCheckout.Iframe.OpenIframeCustomWithPaymentMediaOptions(url, UniqueID, paymentMediaId,bankId);
</script>
```
<br>

2. Llamada con `PaymentMediaId` y `BankId` vacíos:

```javascript
<script type="text/javascript">
      PWCheckout.Iframe.OpenIframeCustomWithPaymentMediaOptions(url, UniqueID, null, null);
</script>
```
<br>

El cliente ingresa los datos de la tarjeta y, tras confirmar, la librería **PWCheckout** recibe la notificación de que la tarjeta se ha capturado correctamente.

La página del vendedor puede suscribirse al evento _tokenCreated_ que se disparará al recibir la notificación de que los datos de la tarjeta fueron capturados.

La página también puede configurar la propiedad `form_id` (utilizando el método `SetProperties`) para enviar el identificador del formulario en la página que será controlada por la librería **PWCheckout**. La librería enviará el formulario una vez capturada la información de la tarjeta.

En respuesta a la notificación recibida (por el evento JavaScript o por el envío del formulario), la página del vendedor debe volver a solicitar la información actualizada del cliente realizando la siguiente llamada `HTTP/GET` (server to server): `{environment_api}/v1/api/customer/{customer-id}`. 

El objeto **Customer** retornado contiene los _PaymentProfiles_ del cliente. Estos objetos tienen información sobre los métodos de pago asociados al cliente, donde en los campoc _Token_ y _CommerceToken_ representan la tarjeta de pago.

Ejemplo de respuesta que incluye un **PaymentProfile**:

```json
{
  "Response": {
    "CustomerId": 53479,
    "Created": "2021-04-06T16:08:43.767",
    "CommerceCustomerId": null,
    "Owner": "Commerce",
    "Email": "Email222222@mail.com",
    "Enabled": true,
    "ShippingAddress": null,
    "BillingAddress": {
      "AddressId": 51615,
      "AddressType": 1,
      "Country": "UY",
      "State": "Montevideo",
      "AddressDetail": "10000",
      "PostalCode": null,
      "City": "MONTEVIDEO"
    },
    "Plans": null,
    "AdditionalData": null,
    "PaymentProfiles": [
      {
        "PaymentProfileId": 55591,
        "PaymentMediaId": 2,
        "Created": "2021-04-19T11:26:17.693",
        "LastUpdate": null,
        "Brand": "MasterCard",
        "CardOwner": "John Simpson",
        "Bin": null,
        "IssuerBank": "Santander",
        "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
        "Type": "CreditCard",
        "Token": "OT__wZcNQkcZtnYWeHIgR2vgWUUliS3lR18E4jiYpVJ8SzQ_",
        "Expiration": "202211",
        "Last4": "0001",
        "Enabled": true
      }
    ],
    "CaptureURL": "https://testapi.BambooPayment.com/v1/Capture/",
    "UniqueID": "UI_263b2dde-b151-4f09-b8bf-c65883d2cb3b",
    "URL": "https://testapi.BambooPayment.com/v1/api/Customer/53479",
    "FirstName": "FistName 2222",
    "LastName": "LastName 2222",
    "DocNumber": "12345672",
    "DocumentTypeId": 2,
    "PhoneNumber": "24022330"
  },
  "Errors": []
}
```

### Using Direct tokenization
Since the user is not registered in your commerce, you must invoke the method to [create the token for usuarios registrados]({{< ref "Direct-Tokenization.md" >}}#CT).

{{% alert title="Nota" color="warning"%}}
You should keep the information of the _CommerceToken_ private because it represents a captured card that anyone can use for multiple transactions.
{{% /alert %}}

## Crear una Compra Básica {#using-direct-tokenization}
Debe enviar el token recién obtenido desde el navegador o la aplicación móvil al servidor de aplicaciones para crear la transacción de compra.

Desde el servidor, invoque el método [Crear una Compra]({{< ref "Purchase-Operations.md" >}}#create-a-purchase), incluyendo el objeto `Purchase` con el token y los datos de la transacción adicionales.

```json
{
  "TrxToken": "CT_kYv0qTHckRiZ4wjCz5NguZRuwFLSIrQc4jiYpVJ8SzQ_",
  "Order": "17030613595101621fb",
  "Amount": 123456,
  "Currency": "USD",
  "Capture": true,
  "TargetCountryISO":"CL",
  "PaymentMediaId":106
}
```
<br>

Los campos **PaymentMediaId** y **TrxToken**  son opcionales, pero es obligatorio enviar uno dependiendo del flujo que quiere utilizar.

* **PaymentMediaId**: Identificador de medio de pago alternativo (transferencia, efectivo y procesamiento que requiere redirección del cliente). Puede obtener este identificado consultado la sección [Métodos de pago por país](/es/docs/payment-methods.html).

* **TrxToken**: Puede generar el tokn y transaccionar enviándolo en este campo.

## Recurring Purchases in One Click
After customers register correctly, some cards allow certain transactions without needing a Verification Code (CVV), which allows a more agile user experience (payments in one click). In these cases, purchases can be sent directly without requesting more information from the customer, as explained in the previous point, [Basic purchase](#create-a-basic-purchase).

You must request the Verification Code every time for transactions where the card does not support this feature, as we cannot store it on our servers.

## Verification Code Request Flow
For the Payment Cards that require the entry of the Verification Code in all transactions, we designed the following workflow:

![PrintScreen](/assets/VerificationCodeRequestFlow_en.png)

1. The customer, identified correctly on the Commerce website, initiates the payment process of a purchase using a card previously registered and associated with their account.

2. The merchant page submits the data to the web server to prepare the information sent to Bamboo Payment.

3. The merchant’s Web Server sends the purchase through the BambooPayment API, identifying the _CommerceToken_ as the Payment Method the customer selects.

4. We carry out a series of validations; in this case, we verify if the payment method chosen allows the execution of transactions without the Verification Code. The selected Payment method does not support this functionality in this flow, so the transaction can only be completed once the Card Verification Code has been obtained.

5. We return the Purchase object in _Pending_ status as a response, indicating that some action is needed to complete the process. The `Purchase` object returned will also contain the `CommerceAction` object that describes the necessary steps to be performed by the merchant.

![PrintScreen](/assets/CVVRequestFlow.png)

The merchant must store the pending purchase information (at least the `PurchaseId` for future validations) and process the CommerceAction information to determine the required action. Take into consideration the following properties in this scenario:

* **ActionReason**: Will have the value `VERIFICATION_CODE_NEEDED` because the purchase requires this Verification Code.
* **ActionType**: This field will have the value **2** corresponding to the action `PWCapture`, a function of the javascript component `PWCheckout` that allows to process this type of actions.
* **ActionURL**: This field specifies the URL that you must send as parameter to the `PWCapture` method of the `PWCheckout` component.

6. The merchant’s web page must show the Verification Code request form to the client using the `PWCapture` method as shown here:

```html
<script type="text/javascript">
  PWCheckout.PWCapture(url);
</script>
```
<br>

Where the value of the `url` parameter corresponds to the `ActionURL` field of the received `Capture` object. 

7. The customer will see the iframe with the Capture Form, which in this case will be presented showing the masked card number (only the last four digits) and a text field for the entry of the Verification Code.

![PrintScreen](/assets/CVVCaptureForm.png)

8. The customer enters the Verification Code of the card used to create the purchase.

9. The verification code the customer enters is sent directly to the Bamboo Payment servers, where it's used to create the authorization message.

10. Bamboo Payment sends the authorization message to the corresponding acquirer with the complete data. 

11. Bamboo Payment processes the acquirer’s response and updates the purchase status according to this response.

12. Bamboo Payment generates a notification to the merchant, informing the **Purchase** object and its final status determined by the authorization process. The **Purchase** sent is the same previously answered in step 5, the merchant should validate the information received (at least the `PurchaseId` matches the expected one). This notification is sent to the **WebHook** service the merchant must implement to obtain the different notifications generated by Bamboo Payment. 

## Notification Alternative
In addition to the option to receive a notification from Bamboo Payment at the end of the purchase process (step 12 of the normal flow), an alternative flow can be executed to explicitly query the result of the purchase once it is detected that the pending process has finished (after step 5).

![PrintScreen](/assets/VerificationCodeRequestFlow2_en.png)

This flow uses the functionalities implemented in the **PWCheckout** JavaScript library to inform the completion of the pending purchase process.

The steps related to this flow are listed below and explained; the initial stages before 12 are the same as those previously described.

12. Once the pending process has finished, the **PWCheckout** library receives a notification of the status of the process. 

13. The **PWCheckout** library triggers the `notificationReceived` event. The merchant must subscribe previously to the event through the **Bind** method in the following way:

```html
<script type="text/javascript"> 
  PWCheckout.Bind("notificationReceived", NotificationHandler);
</script>
```
<br>

The merchant must implement the **NotificationHandler** function (the name is just an example), which will receive information about the final state of the process.

Example of the function for handling notifications:

```html
<script type="text/javascript">
    function NotificationHandler(notification) {
        if (notification.ProcessStatus == 1) {
            //Process OK
        } else {
            //Process with errors
        }
    }
</script>
```
<br>

The `ProcessStatus` field of the received notification will determine the final state of the process. The posibles valores are:

* **OK** (value 1) – The process finished successfully.
* **Pending** (value 2) – The process is still pending.
* **Error** (value 3) – The process ended in error.

14. After the web page receives the `notificationReceived` event, it may continue with the flow. 

15. The merchant must invoke a GET call from the web server to the BambooPayment Purchase API, querying the `PurchaseId` previously stored in step 5.

For this, the call is made: HTTP/GET (server to server):

`{environment_api}/v1/api/purchase/{purchase-id} `

16. The Bamboo Payment response will contain the `Purchase` object with a status other than _Pending_ (depending on the result of the transaction), so it can be processed as a regular purchase response.

For this, the call is made: HTTP/POST (server to server):

`{environment_api}/v1/api/purchase`