---
title: "Webhook de notificación"
linkTitle: "Webhook de notificación"
date: 2023-09-12T11:19:09-05:00
type: docs
Description: >
  Usted puede implementar un servicio para recibir y procesar notificaciones relacionadas con los estados finales del Payout desde Bamboo Payment systems.
weight: 50
---

El API de Payouts solo envía notificaciones para los estados finales (**pagado**, **declinado** y **rechazado**). Para los estados de los Payouts, revise nuestro [artículo de estados]({{< ref Payout-Status.md >}}).

| ESTADO    | Código | DESCRIPCIÓN |
|-----------|--------|-------------|
| `Paid`    | `1`      | El payout ha sido realizado. Este es un estado final que indica la conclusión exitosa del pago. |
| `Declined` | `8`      | El payout fue declinado debido a validación estructural o reglas de Compliance. |
| `Rejected` | `4`      | El payout fue rechazado. Las posibles razones de rechazo incluyen problemas con la cuenta bancaria, límites mensuales excedidos, etc.

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
{{< highlight json >}}
{{< Payouts/Api/PayoutsWebhook/notification >}}
{{< /highlight >}}

{{% alert title="Info" color="info"%}}
En notificaciones de payout para persona jurídica, se recibirá el campo `companyName` en lugar de `firstName` y `lastName`.
{{% /alert %}}