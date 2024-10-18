---
title: "Crear una compra"
linkTitle: "Crear una compra"
date: 2024-08-22T11:40:29-05:00
Description: >
  Aprenda a crear una compra utilizando nuestra API. Este proceso es apto tanto para comercios con certificación PCI como para aquellos que no la tienen.
weight: 10
tags: ["subtopic"]
---

## Configuración de la autenticación {#configuring-the-authentication}
Todos los métodos de la API de Compras requieren los siguientes encabezados de autenticación:

| Llave | Valor | Comentarios |
|---|---|---|
| `Content-Type` | `application/json` | Indica que la solicitud se enviará en formato JSON. |
| `Authorization` | `Basic {{Clave Privada del Comercio}}` | Incluya la palabra `Basic` seguida de su `{{Clave Privada del Comercio}}` (y el identificador como comercio).<br>Ejemplo: `Basic RVkeLr-86_iTzSMLvDtuyQ-1zqIcsmFG-oSzncn_uFv-nj7bhB3rtZg__` |

### Configurar el idioma de los códigos de respuesta {#setting-the-language-of-the-response-codes}
Es posible recibir la descripción de errores en un idioma preferido. Para esto, envíe el encabezado `lang`, utilizando uno de los siguientes códigos en formato **ISO 639-1**:

<div id="shortTable"></div>

| Code | Language |
|:-:|---|
| `en` | English.<br>_Si no envía este encabezado o especifica un idioma no existente, recibirá los errores en inglés por defecto._ |
| `es` | Español. |
| `pt` | Portugués. |

## Crear una compra {#create-a-purchase}
Esta sección explica detalladamente cómo generar una Compra para comercios sin certificación PCI DSS, permitiendo procesar pagos sin manejar directamente datos sensibles de tarjetas.

Una vez que haya [tokenizado una tarjeta]({{< ref "customer-types.md" >}}), es posible generar una compra usando este endpoint.

Para medios de pago alternativos, como pagos en efectivo o transferencias bancarias, es necesario enviar el ID del medio de pago correspondiente para iniciar la transacción.

{{% alert title="Versiones anteriores de la API" color="info"%}}
La documentación de la API versión V1 y V2 está disponible en la sección de [Legacy]({{< ref purchase-operations.md >}})
{{% /alert %}}

### URL de la solicitud {#request-url}
Es necesario realizar una petición **POST** a las siguientes URLs según sus necesidades:

* **Producción**: `https://api.bamboopayment.com/v3/api/purchase`
* **Pruebas**: `https://api.stage.bamboopayment.com/v3/api/purchase`

### Parámetros de la solicitud {#request-parameters}

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:------------:|-------------|
| `TrxToken` | `string` | No<sup>1</sup> | Token de la tarjeta, generado previamente mediante el flujo de tokenización. Se usa para medios de pago - Tarjetas. |
| `NetworkToken` | `object` | No<sup>1</sup> | Información del token de red utilizado en la transacción. Más detalles en la sección Tokenización de Red. |
| `PaymentMethodId` | `integer` | No<sup>1</sup> | Identificador del medio de pago. Se usa solo para medios de pago alternativos (transferencia, efectivo, etc.) |
| `UniqueID` | `string` | No | Identificador único de la compra del lado del comercio. <br>Este valor es opcional y permite identificar una compra de forma única, evitando transacciones duplicadas. Para más información, consulte [Conceptos]({{< ref "Concepts.md">}}#UniqueID). |
| `Capture` | `boolean` | No | Define si la compra debe realizarse en uno o dos pasos.<sup>2</sup><br><ul style="margin-bottom: initial;"><li>Si es `false`, solo se procesa la autorización, y la compra queda pre-autorizada hasta la confirmación final mediante las llamadas de [captura y cancelación]({{< ref "Card_Operations.md" >}}).</li><li>Si es `true`, la transacción se autoriza y captura.</li></ul><br>Es posible que no todos los [medios de pago y países](/en/docs/payment-methods.html) admitan la función de pre-autorización. |
| `TargetCountryISO` | `string` | Sí | Este parámetro indica el país donde se procesará el pago.<br>Envíe el país usando el formato `ISO-3166-1`. |
| `Currency` | `string` | Sí | Moneda de la compra, según ISO-4217. Encuentre los valores posibles en la tabla de Monedas de [cada país](/en/docs/payment-methods.html). |
| `Amount` | `integer` (64 bits) | Sí | Monto de la compra. Es un valor mayor a cero.<br>Si debe incluir decimales en el monto, concatene los lugares decimales sin el punto decimal. Ejemplo `12,25` → `1225`. |
| `Tip` | `integer` (64 bits) | No | Valor de la propina en la transacción. Valor con dos decimales, sin puntos ni comas. |
| `TaxableAmount` | `integer` (64 bits) | No | Valor de los impuestos de la transacción. Valor con dos decimales, sin puntos ni comas. |
| `Installments` | `integer` | No | Número de cuotas. |
| `Order` | `string` | Sí | Número de orden generado por el comercio. |
| `InvoiceNumber` | `string` | No | Número de factura asociado a la transacción. |
| `Description` | `string` | No <sup>4</sup> | Descripción opcional de la compra. |
| `AdditionalData` | `string` | No | Información adicional que pueda ser relevante para la transacción. |
| `MetadataIn` | `object` | No | Datos adicionales de la transacción en formato clave-valor. |
| `Customer` | `object` | Sí <sup>3</sup> | El objeto `Customer` proporciona los datos de la persona que realiza la compra. |

#### Objeto Customer {#customer-object}

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:------------:|-------------|
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `ReferenceCode` | `string` | No | Código de referencia del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento. (Formato `DOCUMENTO`.`PAÍS`)  |
| `Customer` → `Email` | `string` | No | Dirección de correo electrónico del cliente. |
| `Address` | `object` | No | Dirección de envío del cliente. |

#### Objeto Address {#address-object}

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:------------:|-------------|
| `Address` → `Country` | `string` | No | País de la dirección del cliente. |
| `Address` → `City` | `string` | No | Ciudad de la dirección del cliente. |
| `Address` → `State` | `string` | No | Estado o región de la dirección del cliente. |
| `Address` → `PostalCode` | `string` | No | Código postal de la dirección del cliente. |
| `Address` → `AddressDetail` | `string` | No | Detalles adicionales de la dirección del cliente. |

{{% alert title="Notas" color="info"%}}
* <sup>1</sup> Los parámetros `PaymentMethodId` y `TrxToken` no son obligatorios. Sin embargo, es obligatorio enviar uno de ellos, dependiendo del flujo que desee utilizar.
* <sup>2</sup> Es posible que no todos los medios de pago admitan la función de pre-autorización. Revise la sección de [Países y medios de pago](/en/docs/payment-methods.html) para verificar la disponibilidad.
* <sup>3</sup> Este objeto no es obligatorio si crea la compra utilizando [_CommerceToken_]({{< ref Registered-users.md >}}).
* <sup>4</sup> Al utilizar [tarjetas en Brasil]({{< ref br-cards.md>}}), la descripción es obligatoria y debe usar un formato fijo, como se explica en los [parámetros de solicitud]({{< ref br-cards.md>}}#request-parameters).
* Tenga en cuenta que para el correcto funcionamiento del sistema Anti-fraude, le sugerimos enviar los datos adicionales descritos en la sección de [Anti-fraude]({{< ref "Antifraud.md" >}}).
* Para obtener información detallada sobre los objetos [3D Secure - 3DS]({{< ref "3D_Secure.md" >}}) y [Network Token]({{< ref "Network_Tokens.md" >}}), consulte sus secciones correspondientes en esta documentación. **PaymentMethodId** es obligatorio cuando se envía un Network Token.
{{% /alert %}}

### Ejemplo de solicitud {#request-example}

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/requestPurchase >}}
{{< /highlight >}}

## Compra para Comercios con Certificación PCI {#direct-purchase-for-pci-compliant-merchants}
Para los comercios que tienen la certificación PCI-DSS, Bamboo ofrece una mayor flexibilidad a través del método de Compra Directa. Esta opción permite a los comercios con certificación PCI manejar los datos de las tarjetas directamente.

{{% alert title="Versiones anteriores de la API" color="info"%}}
La documentación de la API versión V1 y V2 está disponible en la sección de [Legacy]({{< ref direct-purchase.md >}})
{{% /alert %}}

### URL de la solicitud {#request-url-1}
Debe realizar una petición **POST** a las siguientes URLs según sus necesidades:

* **Producción**: `https://secure-api.bamboopayment.com/v3/api/purchase`
* **Pruebas**: `https://secure-api.stage.bamboopayment.com/v3/api/purchase`

### Parámetros de la solicitud {#request-parameters-1}

#### Objeto CardData {#carddata-object}

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|---|---|:---:|---|
| `CardHolderName` | `string` | Sí | El nombre del titular tal como aparece en la tarjeta. |
| `Pan` | `string` | Sí | El número de tarjeta (PAN). |
| `CVV` | `string` | Sí | El código de verificación (CVV) o código de seguridad de la tarjeta. |
| `Expiration` | `string` | Sí | La fecha de vencimiento de la tarjeta en el formato "MM/AA". |
| `Email` | `string` | Sí | Correo electrónico asociado al titular de la tarjeta. |
| `Document` | `string` | No | El número de documento de identidad del titular de la tarjeta. |

{{% alert title="Información" color="info"%}}

**Nota:** El objeto CardData solo debe utilizarse para transacciones con tarjetas no tokenizadas. Los datos sensibles de las tarjetas se deben manejar de forma segura y en cumplimiento con los estándares PCI DSS.
{{% /alert %}}

### Ejemplo de solicitud {#request-example-1}

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/requestPurchase_DirectPurchase >}}
{{< /highlight >}} 

<br>

Los campos **CardData**, **PaymentMethodId**, **NetworkToken** y **TrxToken** no son obligatorios; sin embargo, se debe enviar uno de ellos dependiendo del flujo que desee utilizar.

## Respuesta del Request. {#response}
La respuesta para las operaciones de compra directa realizadas por comercios con certificación PCI es idéntica a la respuesta de la compra estándar. Esto asegura la consistencia entre los diferentes tipos de transacciones y simplifica los procesos de integración.

Todos los campos, estados y códigos de error descritos en la respuesta de Compra estándar se aplican por igual a las transacciones de Compra Directa.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `TransactionId` | `string` | Identificador único de la transacción. Un número de 19 dígitos. |
| `Result` | `string` | Resultado de la transacción. `COMPLETED` o `ACTION_REQUIRED`. Para más detalles, consulte el objeto "Action". |
| `Status` | `string` | Estado actual de la transacción (por ejemplo, APPROVED, REJECTED). |
| `ErrorCode` | `string` | Código de error, si la transacción fue rechazada. |
| `ErrorDescription` | `string` | Descripción detallada del error si la transacción fue rechazada. |
| `Created` | `string` | Fecha / Hora en la que se creó la transacción, en formato **ISO 8601**. |
| `AuthorizationDate` | `string` | Fecha / Hora en la que se autorizó la transacción, en formato **ISO 8601**. |
| `AuthorizationCode` | `string` | Código único proporcionado por el adquirente / emisor para confirmar la autorización de la transacción. |
| `Amount` | `integer` | Valor total de la transacción. |
| `Currency` | `string` | Moneda utilizada para la transacción. Puede diferir de la moneda de la solicitud según el pricing configurado. |
| `Installments` | `integer` | Número de cuotas. |
| `TaxableAmount` | `integer` | Valor de los impuestos. |
| `Tip` | `integer` | Valor de la propina. |
| `Url` | `string` | URL con los detalles adicionales de la transacción. |
| `MetadataOut` | `object` | Metadatos adicionales de la respuesta de la transacción. |
| `Action` | `object` | Detalles de las acciones requeridas cuando el Resultado es "ACTION_REQUIRED". |
| `PaymentMethod` | `object` | Medio de pago utilizado para la transacción. |

#### Objeto Action {#action-object}

El objeto Action contiene información sobre los pasos adicionales requeridos para completar una transacción. Normalmente se envía en la respuesta cuando el resultado de la transacción es **"ACTION_REQUIRED"**, indicando que se necesita una acción adicional del usuario o del comercio para finalizar el pago.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `SessionId` | `string` | ID de sesión relacionado con la acción. Valor informativo. |
| `Reason` | `string` | Razón de la acción solicitada. Valores posibles:<br>• `VERIFICATION_CODE_NEEDED:` Transacción pendiente de CVV, se requiere redirección a la "URL" para mostrar el formulario de ingreso del CVV.<br>• `REDIRECTION_NEEDED_EXTERNAL_SERVICE`: Se requiere una redirección a la "URL" para completar los detalles de la transacción. |
| `URL` | `string` | URL de redirección para completar la acción requerida. |

#### Objeto PaymentMethod {#paymentmethod-object}

El objeto PaymentMethod contiene información detallada sobre el medio de pago utilizado en la transacción. Esto incluye detalles de la tarjeta (para transacciones con tarjeta) u otra información relevante del medio de pago.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `Brand` | `string` | Franquicia de la tarjeta utilizada (por ejemplo, MasterCard, Visa). |
| `CardOwner` | `string` | Nombre del titular de la tarjeta. |
| `Bin` | `string` | Primeros 6 dígitos del número de la tarjeta. |
| `IssuerBank` | `string` | Banco emisor de la tarjeta. |
| `Type` | `string` | Tipo de medio de pago (por ejemplo, CreditCard, DebitCard). |
| `Expiration` | `string` | Fecha de vencimiento de la tarjeta en formato aaaaMM. |
| `Last4` | `string` | Últimos 4 dígitos del número de la tarjeta. |

### Ejemplos de respuesta {#response-examples}

{{< tabs tabTotal="2" tabID="responses" tabName1="HTTP 200" tabName2="HTTP 400/409" >}}
{{< tab tabNum="1" >}}
<br>

**Resultado:** `COMPLETED` - **Estado:** `APPROVED`

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved >}}
{{< /highlight >}} 
<br>

**Resultado:** `COMPLETED` - **Estado:** `REJECTED`

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_rejected >}}
{{< /highlight >}} 

<br>

**Resultado:** `ACTION_REQUIRED` - **Estado:** `PENDING`

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_pending >}}
{{< /highlight >}} 

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http400_409 >}}
{{< /highlight >}} 

{{< /tab >}}

{{< /tabs >}}