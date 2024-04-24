---
title: "Webhook de notificación"
linkTitle: "Webhook de notificación"
date: 2023-09-12T11:19:09-05:00
type: docs
Description: >
  Usted puede implementar un servicio para recibir y procesar notificaciones relacionadas con los estados finales del Payout desde Bamboo Payment systems.
weight: 20
---

El API de Payouts solo envía notificaciones para los estados finales (**pagado**, **declinado** y **rechazado**). Para los estados de los Payouts, revise nuestro [artículo de estados]({{< ref Payout-Status.md >}}).

El comercio debe publicar un servicio HTTP/REST al cual se enviarán las notificaciones generadas.

## Especificaciones del servicio WebHook {#webhook-service-specifications}
El servicio WebHook es un servicio REST que debe procesar una solicitud con las siguientes características:

<div id="shortTable"></div>

|        |          | 
|:-------|:---------|
|**URL:** | *\<Determinado por el comercio>* |
|**API Type:** | Pública |
|**Method:** | POST |
|**Response:** | Código HTTP |

### Parámetros de la notificación {#notification-parameters}

| Parámetro | Formato | Description |
|---|:-:|---|
| `payoutId` | `integer` | Identificador interno del Payout. |
| `reference` | `string` | Identificador único del Payout definido por usted cuando solicitó el Payout. |
| `isoCountry` | `string` | Código ISO del país en formato `ISO 3166-2`. |
| `created` | `date` | Fecha y hora de la solicitud del Payout. |
| `lastUpdate` | `date` | Fecha y hora de la última actualización del Payout. |
| `status` | `integer` | Código interno del estado actual del Payout. |
| `statusDescription` | `string` | Estado actual del Payout. Consulte [este artículo]({{< ref "Payout-Status.md" >}}) para aprender más acerca de los estados de los Payouts. |
| `errorCode` | `string` | Código interno del error del Payout declinado. Encuentre los posibles errores [aquí]({{< ref "Payout-Error-Codes.md">}}). |
| `errorDescription` | `string` | Descripción del error del Payout declinado. |
| `amount` | `object` | Valor y moneda solicitado en el Payout. |
| `localAmount` | `object` | Valor y moneda solicitado en el Payout en moneda local. |
| `exchangeRate` | `numeric` | Valor de conversión utilizado en el Payout. |
| `payee` | `object` | Información del beneficiario del Payout.  |



### Ejemplo de la notificación {#notification-example}
```json
{
  "payoutId": 18009,
  "reference": "PAB-3268",
  "isoCountry": "BR",
  "created": "2023-08-30T12:02:39.1987743+00:00",
  "lastUpdate": "2023-08-30T12:06:26.9119828+00:00",
  "status": 1,
  "statusDescription": "Paid",
  "errorCode": null,
  "errorDescription": null,
  "amount": {
    "value": 10,
    "isoCurrency": "USD"
  },
  "localAmount": {
    "value": 47.31,
    "isoCurrency": "BRL"
  },
  "exchangeRate": 4.851803,
  "payee": {
    "firstName": "Tiago",
    "lastName": "Costa",
    "email": "tcosta@mail.com",
    "phone": "92799322",
    "address": "55489-272, Travessa Eduardo, 90 Esteves do Norte - CE",
    "document": {
      "number": "54562271779",
      "type": "CPF"
    }
  }
}
```