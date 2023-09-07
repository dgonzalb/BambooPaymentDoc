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

La página del comercio puede suscribirse al evento _tokenCreated_ que se disparará al recibir la notificación de que los datos de la tarjeta fueron capturados.

La página también puede configurar la propiedad `form_id` (utilizando el método `SetProperties`) para enviar el identificador del formulario en la página que será controlada por la librería **PWCheckout**. La librería enviará el formulario una vez capturada la información de la tarjeta.

En respuesta a la notificación recibida (por el evento JavaScript o por el envío del formulario), la página del comercio debe volver a solicitar la información actualizada del cliente realizando la siguiente llamada `HTTP/GET` (server to server): `{environment_api}/v1/api/customer/{customer-id}`. 

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

### Utilizando la Tokenización Directa {#using-direct-tokenization}
Como el usuario está registrado en su comercio, debe invocar el método para [crear el token para usuarios registrados]({{< ref "Direct-Tokenization.md" >}}#CT).

{{% alert title="Nota" color="warning"%}}
Debe mantener la información del _CommerceToken_ privada porque representa una tarjeta capturada que cualquiera puede usar para múltiples transacciones.
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

## Compras recurrentes en un clic {#recurring-purchases-in-one-click}
Después de que los clientes se registren correctamente, algunas tarjetas permiten ciertas transacciones sin necesidad de un Código de Verificación (CVV), lo que permite una experiencia de usuario más ágil (pagos en un solo clic). En estos casos, las compras se pueden enviar directamente sin solicitar más información al cliente, como se explica en el punto anterior, [Compra básica](#create-a-basic-purchase).

Debe solicitar el Código de Verificación cada vez que realice transacciones en las que la tarjeta no permita esta función, ya que no podemos almacenarlo en nuestros servidores.

## Flujo de Solicitud de Código de Verificación {#verification-code-request-flow}
Para las Tarjetas que requieren ingresar del Código de Verificación en todas las transacciones, hemos diseñado el siguiente flujo de trabajo:

![PrintScreen](/assets/VerificationCodeRequestFlow_en.png)

1. El cliente, identificado correctamente en la web de Comercio, inicia el proceso de pago de una compra utilizando una tarjeta previamente registrada y asociada a su cuenta.

2. La página del Comercio envía los datos al web server para preparar la información enviada a Bamboo Payment.

3. El Web Server del comercio envía la compra a través de la API de Bamboo Payment, identificando el _CommerceToken_ como el método de pago que el cliente seleccionó.

4. Realizamos una serie de validaciones; en este caso, verificamos si el método de pago elegido permite la ejecución de transacciones sin el Código de Verificación. El Método de Pago seleccionado no permite esta funcionalidad en este flujo, por lo que la transacción sólo podrá completarse una vez haya obtenido el Código de Verificación de la tarjeta.

5. Retornamos el objeto `Purchase` en estado _Pending_ (pendiente) como respuesta, indicando que es necesaria alguna acción para completar el proceso. El objeto `Purchase` devuelto también contiene el objeto `CommerceAction` que describe los pasos necesarios que debe realizar el comercio.

![PrintScreen](/assets/CVVRequestFlow.png)

El comercio debe almacenar la información de la compra pendiente (al menos el `PurchaseId` para futuras validaciones) y procesar la información del `CommerceAction` para determinar la acción requerida. Tenga en cuenta las siguientes propiedades en este escenario:

**ActionReason**: Tiene el valor `VERIFICATION_CODE_NEED` ya que la compra requiere este Código de Verificación.
* **ActionType**: Este campo tiene el valor **2** correspondiente a la acción `PWCapture`, que es una función del componente javascript `PWCheckout` que permite procesar este tipo de acciones.
* **ActionURL**: Este campo especifica la URL que debe enviar como parámetro al método `PWCapture` del componente `PWCheckout`.

6. La página web del comercio debe mostrar el formulario de solicitud de Código de Verificación al cliente utilizando el método `PWCapture` de la siguiente forma:

```html
<script type="text/javascript">
  PWCheckout.PWCapture(url);
</script>
```
<br>

Donde el valor del parámetro `url` corresponde al campo `ActionURL` del objeto `CommerceAction` recibido. 

7. El cliente ve el iframe con el Formulario de Captura, que en este caso se presenta mostrando el número de tarjeta enmascarado (sólo los cuatro últimos dígitos) y un campo de texto para ingresar el Código de Verificación.

![PrintScreen](/assets/CVVCaptureForm.png)

8. El cliente ingresa el Código de Verificación de la tarjeta utilizada para realizar la compra.

9. El código de verificación que ingresa el cliente se envía directamente a los servidores de Bamboo Payment, donde se utiliza para crear el mensaje de autorización.

10. Bamboo Payment envía el mensaje de autorización a la entidad adquirente correspondiente con los datos completos. 

11. Bamboo Payment procesa la respuesta del adquirente y actualiza el estado de la compra de acuerdo con dicha respuesta.

12. Bamboo Payment genera una notificación al comercio, informando el objeto **Purchase** y de su estado final determinado por el proceso de autorización. La **Purchase** enviada es la misma previamente respondida en el paso 5, el comercio debe validar la información recibida (al menos que el `PurchaseId` coincide con el esperado). Esta notificación se envía al [servicio de **WebHook**]({{< ref Notification-Webhooks.md >}}) que el comercio debe implementar para obtener las diferentes notificaciones generadas por Bamboo Payment.

## Alternativa de Notificación {#notification-alternative}
Además de la opción de recibir una notificación desde Bamboo Payment al finalizar el proceso de compra (paso 12 del flujo normal), se puede ejecutar un flujo alternativo para consultar explícitamente el resultado de la compra una vez detectado que el proceso pendiente ha finalizado (tras el paso 5).

![PrintScreen](/assets/VerificationCodeRequestFlow2_en.png)

Este flujo utiliza las funcionalidades implementadas en la librería JavaScript **PWCheckout** para informar de la finalización del proceso de compra pendiente.

A continuación se enumeran y se explican los pasos relacionados con este flujo; las etapas iniciales antes del paso 12 son las mismas que las descritas anteriormente.

12. Una vez finalizado el proceso pendiente, la librería **PWCheckout** recibe una notificación del estado del proceso. 

13. La librería **PWCheckout** lanza el evento `notificationReceived` event. El comercio debe suscribirse previamente al evento a través del método **Bind** de la siguiente manera:

```html
<script type="text/javascript"> 
  PWCheckout.Bind("notificationReceived", NotificationHandler);
</script>
```
<br>

El comercio debe implementar la función **NotificationHandler** (el nombre es sólo un ejemplo), que recibirá la información sobre el estado final del proceso.

Ejemplo de la función para el manejo de notificaciones:

```html
<script type="text/javascript">
    function NotificationHandler(notification) {
        if (notification.ProcessStatus == 1) {
            //Proceso OK
        } else {
            //Proceso con errores
        }
    }
</script>
```
<br>

El campo `ProcessStatus` de la notificación recibida determina el estado final del proceso. Los posibles valores son:

**OK** (valor 1) - El proceso ha finalizado correctamente.
* **Pending** (valor 2) - El proceso sigue pendiente.
* **Error** (valor 3) - El proceso finalizó con error.

14. Después de que la página web reciba el evento `notificationReceived`, puede continuar con el flujo. 

15. El comercio debe invocar una llamada GET desde el servidor web a la API de Compras de Bamboo Payment, consultando el `PurchaseId` almacenado previamente en el paso 5.

Para esto, se realiza la llamada: HTTP/GET (server to server):

`{environment_api}/v1/api/purchase/{purchase-id} `

16. La respuesta de Bamboo Payment contiene el objeto `Purchase` con un estado distinto de _Pending_ (dependiendo del resultado de la transacción), por lo que puede procesarse como una respuesta de compra normal.

Para esto, se realiza la llamada: HTTP/POST (server to server):

`{environment_api}/v1/api/purchase`