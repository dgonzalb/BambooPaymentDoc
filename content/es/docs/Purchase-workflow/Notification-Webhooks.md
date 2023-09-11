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

### Ejemplo de notificación {#notification-example}

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

## Requisitos técnicos {#technical-requirements}
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