---
title: "Webhook"
linkTitle: "Webhook"
date: 2023-08-02T08:41:05-05:00
description: >
  Usted puede implementar un servicio para recibir y procesar notificaciones enviadas desde los sistemas de Bamboo Payment.
weight: 50
---

Este servicio es necesario en algunos flujos de transacción donde el proceso no puede completarse de forma sincrónica, por lo que el estado final de la transacción se informará de forma asíncrona una vez que se haya obtenido.

El comercio debe publicar un servicio HTTP/REST al cual se enviarán las notificaciones generadas.

## Especificaciones del servicio WebHook {#webhook-service-specifications}
El servicio WebHook es un servicio REST que debe procesar una solicitud con las siguientes características:

<div id="shortTable"></div>

|        |          | 
|:-------|:---------|
|**URL:** | *\<Determinado por el comercio>* |
|**API Type:** | Pública |
|**Method:** | POST |
|**Authentication:** | Firma en el encabezado. |
|**Response:** | Código HTTP. |

## Requerimientos técnicos {#technical-requirements}
La implementación de este servicio depende de la plataforma y el lenguaje elegido por el comercio.

Los únicos requisitos técnicos son:

- Debe aceptar mensajes en formato JSON (application/json).
- Debe implementar un método de validación de la firma en el webhook.
- Debe responder solo con un código HTTP, donde:
  * Si se responde con el código `200` (OK), Bamboo Payment asumirá que el procesamiento de la notificación fue exitoso.
  * Si se responde con cualquier otro código distinto a `200`, Bamboo Payment asumirá que el procesamiento fue fallido y se volverá a intentar la notificación.


## Validación de la firma {#signature-validation}
Para mitigar el riesgo de transacciones fraudulentas, es crucial que los comercios validen la firma digital. Al verificar la autenticidad e integridad de los datos recibidos, las empresas pueden protegerse eficazmente contra posibles intentos de fraude y garantizar transacciones seguras y confiables.

El comercio puede validar la firma digital del comercio de la siguiente forma. La firma recibida en el webhook debe coincidir con la firma generada con el hash.

#### Pseudocódigo {#pseudocode}

```javascript
//private key
var key = merchantSecretKey;
//Concatenate Webhook information
//utcNow is obtained from the header field "dateSent"
var receivedData = PurchaseId + Amount + Currency + utcNow;

//Digital signature creation to compare with received signature in webhook
var hexHash = CryptoJS.HmacSHA256(receivedData, key);
var signature = hexHash.toString(CryptoJS.enc.Hex);

//Digital Signatures compare
if(signature === receivedSignature)
    console.log("signature is valid");
else
    console.log("signature is not valid");
 ```

#### Ejemplo de código HmacSha256 {#hmacsha256-code-example}

```javascript
async function calculateHMAC(key, data) {
	const encoder = new TextEncoder();
	const keyBuffer = encoder.encode(key);
	const dataBuffer = encoder.encode(data);
	const cryptoKey = await crypto.subtle.importKey(
		'raw',
		keyBuffer,
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
);
	const hashBuffer = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
	return hashHex;
}
```

## Manejo de reintentos ante errores {#retry-management-for-errors}
El webhook utiliza una configuración de cinco reintentos para fallos espaciados en el tiempo.

* El primer reintento se realiza después de 15 minutos.
* El segundo reintento se realiza después de 30 minutos.
* El tercer reintento se realiza después de una hora.
* El cuarto reintento se realiza después de tres horas.
* El quinto reintento se realiza después de seis horas.

Para reintentos adicionales, póngase en contacto con nuestro equipo de asistencia.

## Tipos de webhooks {#webhook-types}
Nuestro servicio de webhooks le permite elegir entre dos tipos de webhooks, cada uno diseñado para atender necesidades específicas. En las secciones siguientes se ofrece información detallada sobre cada clase, lo que le permitirá elegir acertadamente.

{{% alert title="Info" color="info"%}}
Póngase en contacto con nosotros para activar el tipo de webhook que mejor se adapte a sus necesidades.
{{% /alert %}}

### Webhook de Compras {#purchase-webhook}
El Webhook de Compras es el tipo más básico de nuestro servicio. A través de él, podemos notificar el estado final (_Aprobado_ o _Rechazado_) de las compras con información básica relacionada con las mismas.

#### Parámetros de la notificación {#notification-parameters}

| Parámetro | Tipo | Descripción |
|---|---|---|
| `PurchaseId` | `integer` | Identificador de la compra. |
| `UniqueId` | `string` | [Identificador único]({{< ref "Concepts.md">}}#UniqueID) definido para la compra. |
| `Order` | `string` | Número de orden generado por el comercio. |
| `Amount` | `number` | Monto de la compra. |
| `Installments` | `integer` | Este parámetro se refiere al número de pagos en que se divide una compra con tarjeta de crédito. |
| `Currency` | `string` | Moneda de la compra, según el estándar ISO-4217. |
| `MetadataOut` | `object` | Campos adicionales devueltos por cada método de pago o entidad adquirente. |
| `Transaction` → `TransactionStatusId` | `integer` | Identificador interno del estado de la transacción. |
| `Transaction` → `Status` | `string` | Estado actual de la transacción. |
| `Transaction` → `Description` | `string` | Descripción del resultado de la transacción. |
| `Transaction` → `ApprovalCode` | `string` | Código de aprobación devuelto por el método de pago. |

#### Ejemplo de notificación {#notification-example}

```json
{
  "PurchaseId": 184098,
  "UniqueId": null,
  "Order": "3733689",
  "Amount": 10000,
  "Installments": 1,
  "Currency": "COP",
  "MetadataOut": {},
  "Transaction": {
    "TransactionStatusId": 3,
    "Status": "Approved",
    "Description": null,
    "ApprovalCode": "Ok"
  }
}
```

### Webhook de Transacciones {#transaction-webhook}
El webhook de transacciones es un tipo de webhook más avanzado que no sólo puede notificarle las compras, sino también mantenerle informado sobre el estado final de cualquier transacción. Por ejemplo, si utiliza reembolsos asíncronos, podemos informarle si el reembolso ha sido aprobado o rechazado.

#### Parámetros de la notificación {#notification-parameters-1}

| Parámetro | Tipo | Descripción |
|---|---|---|
| `TransactionId` | `integer` | Identificador de la transacción. |
| `TransactionType` | `string` | Tipo de transacción de la notificación. Valores posibles:<ul style="margin-bottom: initial;"><li>Purchase</li><li>Refund</li></ul> |
| `TransactionStatusId` | `integer` | Identificador interno del estado de la transacción. |
| `Status` | `string` | Estado actual de la transacción. |
| `ErrorCode` | `string` | Posible código de error generado en la transacción. |
| `Amount` | `number` | Monto de la transacción. |
| `Currency` | `string` | Moneda de la compra, según el estándar ISO-4217. |
| `Installments` | `integer` | Este parámetro se refiere al número de pagos en que se divide una compra con tarjeta de crédito. |
| `UniqueId` | `string` | [Identificador único]({{< ref "Concepts.md">}}#UniqueID) definido para la compra. |
| `Description` | `string` | Descripción del resultado de la transacción. |
| `UrlNotify` | `string` | URL del Webhook. |
| `TargetCountryIso` | `string` | Este parámetro indica el país donde se procesó la transacción en formato `ISO-3166-1`. |
| `Created` | `date` | Fecha y hora de creación de la transacción.<br>Formato de fecha _**ISO-8601**_. |
| `Customer` | `object` | Proporciona los datos de la persona que realizó la transacción.  |
| `PaymentMedia` | `object` | Información sobre el medio de pago utilizado en la Compra. |

#### Ejemplo de notificación {#notification-example-1}

```json
{
  "TransactionId": 379245,
  "TransactionType": "Purchase",
  "TransactionStatusId": 4,
  "Status": "Rejected",
  "ErrorCode": "TR301",
  "Amount": 5000,
  "Currency": "UYU",
  "Installments": "1",
  "UniqueId": "",
  "Order": "1",
  "Description": "Description",
  "UrlNotify": "https://dummystore.com/checkout/notifications",
  "TargetCountryIso": "UY",
  "Created": "2024-02-07T18:10:45.667",
  "MetadataOut": { },
  "Customer": {
    "CustomerId": 321559,
    "Email": "score-100@antifraud.bampoopayment.com",
    "DocumentTypeId": 1,
    "DocNumber": "52960268",
    "LastName": "Cardenas Contreras",
    "FirstName": "Rocio"
  },
  "PaymentMedia": {
    "PaymentMediaId": 2,
    "Brand": "MasterCard",
    "PaymentMediaType": "CreditCard",
    "IssuerBank": "ADMINISTRADORA DE TARJETAS DE CREDITO, (A.T.C.), S.A.",
    "Bin": "558900",
    "Last4": "0001",
    "Owner": "JOHN DOE"
  }
}
```