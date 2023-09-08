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

The implementation of this service depends on the platform and language chosen by the merchant.

The only technical requirements are:

- It must accept messages in JSON format (application/json)
- You need to implement a validation method of the signature in the webhook.
- It must respond only an HTTP code, where:
    * if code `200` (OK) is answered, BambooPayment will assume the notification processing was successful.
    * If any code other than `200` is answered, BambooPayment will assume that the processing was unsuccessful, so the notification will be retried.


## Signature validation
To mitigate the risk of fraudulent transactions, it is crucial for merchants to validate the digital signature. By verifying the authenticity and integrity of the received data, businesses can effectively safeguard against potential fraud attempts and ensure secure and reliable transactions.

The merchant can validate the digital signature of the commerce as follows.
The received signature in the webhook must match the signature generated with the hash.

#### Pseudocode

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

#### HmacSha256 Code Example

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

## Retry management for errors.
The webhook uses a configuration with five retries for failures spaced out over time.

* The first retry is attempted after 15 minutes.
* The second retry is attempted after 30 minutes.
* The third retry is attempted after one hour.
* The fourth retry is attempted after three hours.
* The fifth retry is attempted after six hours.

For further retries, please get in touch with our support team.

{{% alert title="Info note" color="info"%}}
|        |          | 
|:-------|:---------|
|**URL:** | *\<Determinado por el comercio>* |
|**API Type:** | Pública |
|**Method:** | POST |
|**Authentication:** | Firma en el encabezado. |
|**Response:** | Código HTTP. |
{{% /alert %}}