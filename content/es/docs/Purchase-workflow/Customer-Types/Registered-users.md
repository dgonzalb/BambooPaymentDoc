---
title: "Token de Uso Recurrente"
linkTitle: "Token de Uso Recurrente"
date: 2023-07-17T07:28:16-05:00
description: >
  A diferencia de los [Usuarios Anónimos]({{< ref Anonymous-users.md>}}), estos usuarios están registrados en el sitio web por lo que puede identificarlos y la información de su tarjeta puede ser asociada para realizar otras compras sin tener que ingresar nuevamente la información.
weight: 20
tags: ["subtopic"]
---

El cliente recibe un _CommerceToken_ después de registrar su tarjeta, la cual puede ser utilizada para futuras transacciones. A continuación, se encuentran los pasos para comprar como un usuario registrado en el sitio web.

{{% alert title="Atención" color="warning"%}}
La administración de **Clientes** no está actualizada a la versión V3 de la API. Por lo tanto, las URLs de las operaciones siguen funcionando solo en la versión V1 de la API.
{{% /alert %}}

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
| `DocumentTypeId` | `string` | Sí | Tipo de documento del cliente. Encuentre para la versión **Legacy**, los posibles valores en la tabla de Tipos de Documento de acuerdo con el [país](/es/docs/payment-methods.html). |
| `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Owner` | `string` | No | Determina si el usuario es anónimo o si el comercio, o nosotros, lo registró.<br>Los posibles valores son:<ul style="margin-bottom: initial;"><li>_Our_</li><li>_Commerce_. Este es el valor por defecto.</li><li>_Anonymous_</li></ul>|
| `PhoneNumber` | `string` | Sí | Número de teléfono de contacto del cliente. |
| `BillingAddress` | `object` | Sí | Este parámetro es la dirección de facturación del cliente. |
| `BillingAddress`→`AddressID` | `integer` | Sí | Identificador de la dirección. |
| `BillingAddress`→`AddressType` | `string` | Sí | Tipo de dirección. |
| `BillingAddress`→`Country` | `string` | Sí | País de la dirección. |
| `BillingAddress`→`State` | `string` | Sí | Estado de la dirección. |
| `BillingAddress`→`City` | `string` | Sí | Ciudad de la dirección. |
| `BillingAddress`→`AddressDetail` | `string` | Sí |Este parámetro corresponde a la información adicional de la dirección, como calle, número, etc. |

#### Ejemplo del Request {#request-example}

{{< highlight json >}}
{{< Payins/V3/Customers/create_customer_request >}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters}
El objeto de respuesta retorna la información del cliente recién creado o el error que se haya podido producir. En el parámetro `Response.CustomerId` se encuentra el identificador de cliente generado por la API para poder consultarlo o actualizarlo.

Utilice los siguientes parámetros para realizar operaciones adicionales sobre los clientes:

<!--* `CaptureURL`: URL de captura de datos de la tarjeta. Abra esta URL en un iframe para iniciar la captura de datos sensibles. Para más información, consulte [Invocando el formulario de inscripción de tarjeta](#invoking-the-card-enrollment).-->
* `UniqueID`: Identificador único temporal utilizado para registrar métodos de pago externos. Cada vez que se solicita la información del Cliente, se obtiene un nuevo identificador. Para más información, consulte [Invocando el formulario de inscripción de tarjeta](#invoking-the-card-enrollment).
* `URL`: URL en la que se puede consultar la información de un cliente. Para más información, consulte [Obtener un cliente](#get-a-customer).

#### Ejemplo del Response {#response-example}

{{< highlight json >}}
{{< Payins/V3/Customers/get_customer_notoken >}}
{{< /highlight >}}

### Operaciones sobre los clientes {#customer-operations}
Una vez haya creado un usuario, puede realizar operaciones para obtener o actualizar su información.

#### Obtener un cliente {#get-a-customer}
Se puede obtener la información del cliente usando su ID o su dirección de correo electrónico.

Para esto, debe invocar un request **GET** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/customer`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/customer`

<div id="shortTable"></div>

| | Endpoint |
|---|---|---|
| Obtener por el _Identificador del cliente_ | `/{{customer-id}}` |
| Obtener por el _correo electrónico del cliente_ | `/GetCustomerByEmail?email={{EmailAddress}}` |

En la respuesta, se obtiene una lista con el mismo objeto retornado en la [creación del cliente](#response-example).

#### Actualizar un cliente {#update-a-customer}
Para actualizar la información de un cliente, debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/customer/{{{{customer-id}}}}/update`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/customer/{{customer-id}}/update`

Donde `{{customer-id}}` es el id generado cuando se creó el usuario. En el cuerpo del request los [parámetros](#request-parameters) que quiera actualizar.

En la respuesta, se obtiene el mismo objeto retornado en la [creación del cliente](#response-example).

## Capturar la información de la tarjeta {#capture-the-card-data}
El siguiente paso es obtener el token de la tarjeta del cliente. Para esto, puede invocar el formulario de inscripción de tarjeta o utilizar la [Tokenización Directa]({{< ref "Direct-Tokenization.md" >}}) si su comercio cumple con la normativa PCI.

{{% alert title="Info" color="info"%}}
Si utiliza el identificador del Medio alternativo, no requiere realizar este paso y debe incluir el **PaymentMethod**.
{{% /alert %}}

### Invocando el formulario de inscripción de tarjeta {#invoking-the-card-enrollment}
{{% alert title="Info" color="info"%}}
Si utiliza la versión Legacy del formulario de captura de tarjetas, verifique los pasos a seguir desde [aquí]({{< ref "Legacy-Registered-users.md" >}})
{{% /alert %}}
Para invocar el formulario de captura para un customer creado previamente, se deben seguir los siguientes pasos: 

1. Obtener el valor **uniqueId** del customer, para ello, se debe ejecutar la operación [Get Customer](#get-a-customer).
2. Invocar el formulario de captura de tarjetas, enviando en el campo `uniqueId` dentro del objeto `metadata` en el `customer`, como es indicado en la sección [Información de clientes](../../../../es/docs/forms.html##información-del-cliente)


## Crear una Compra Básica {#using-direct-tokenization}
Debe enviar el token recién obtenido desde el navegador o la aplicación móvil al servidor de aplicaciones para crear la transacción de compra.

Desde el servidor, invoque el método [Crear una Compra]({{< ref Purchase_V3.md >}}#request-parameters), incluyendo el objeto `Purchase` con el token y los datos de la transacción adicionales.
En caso de operar con cliente previamente creado y con tarjeta guardada a través del [formulario de captura de tarjetas](#invoking-the-card-enrollment) o [tokenización directa](#capture-the-card-data), debe invocar la función [Get Customer](#get-a-customer) y obtener el **CommerceToken** de la tarjeta selecciona, detallado dentro del objeto **PaymentProfile**, para luego, enviar la compra con el valor obtenido.

| Formato CommerceToken | |
|---|---|---|
| Formato | ` "Token": "CT__{{string}}"` |
| Ejemplo | ` "Token": "CT__wZcNQkcZtnYWeHIgR2vgWUUliS3lR18E4jiYpVJ8QQQ_",` |

### Ejemplo del Response de Cliente con Tarjeta Guardada {#get-csutomer-ct}
{{< highlight json >}}
{{< Payins/V3/Customers/get_customer_CTtoken >}}
{{< /highlight >}}

### Ejemplo del Request {#request-example}

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/purchase_CT >}}
{{< /highlight >}}
<br>

## Compras recurrentes en un clic {#recurring-purchases-in-one-click}
Después de que los clientes se registren correctamente, algunas tarjetas permiten ciertas transacciones sin necesidad de un Código de Verificación (CVV), lo que permite una experiencia de usuario más ágil (pagos en un solo clic). <br> En estos casos, las compras se pueden enviar directamente sin solicitar más información al cliente, como se explica en el punto anterior, [Compra básica](#create-a-basic-purchase).

Debe solicitar el Código de Verificación cada vez que realice transacciones en las que la tarjeta no permita esta función, ya que no podemos almacenarlo en nuestros servidores.
<br>
Para invocar el Código de Verificación, deberá seguir los pasos descriptor en ésta [sección](../../../../es/docs/forms.html#formulario-cvv).