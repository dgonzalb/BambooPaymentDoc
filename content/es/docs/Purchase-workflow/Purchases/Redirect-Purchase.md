---
title: "Compra Redirect"
linkTitle: "Compra Redirect"
date: 2023-03-02T11:40:29-05:00
Description: >
  La _Compra Redirect_ corresponde al flujo utilizado por los comercios donde el cliente debe ser redirigido a una página externa para completar el pago.
weight: 20
tags: ["subtopic"]
---

## Diagrama de flujo {#flow-diagram}
![PrintScreen](/assets/RedirectPurchaseFlow_es.png)

### Descripción del flujo {#flow-description}

| N° | Descripción | /EndPoint o Actor |
|---|---|---|
| 1 | El comercio envía el [request de la compra]({{< ref "Purchase-Operations" >}}#create-a-purchase) con el `PaymentMediaId` del medio de pago correspondiente.  | `/purchase` |
| 2 | Bamboo retorna la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `CommerceAction` con una URL externa. `ActionReason = REDIRECTION_NEEDED_EXTERNAL_SERVICE` | `/purchase response` |
| 3 | El comercio debe redirigir al cliente a la URL externa que se encuentra en el objeto `CommerceAction`. | `Commerce Site/Client browser` |
| 4 | Bamboo redirige automáticamente al cliente al procesador de pagos externo para completar el pago. | `Bamboo Site/Customer browser` |
| 5 | El cliente sigue los pasos mostrados en el sitio web del adquirente para finalizar el pago. | `External Payment Site/Client` |
| 6 | Bamboo recibe la respuesta, luego procesa y actualiza el estado de la transacción (según el estado recibido). | `/paymentCallback` |
| 7 | Bamboo recibe una notificación asíncrona de parte del adquirente y notifica al webhook del comercio (se actualiza el estado de la compra). |` /webhook (Merchant)` |

## URLS del response {#response-urls}
Como resultado de la transacción, esta puede estar en cualquiera de los siguientes estados.

| Estado | Descripción |
|---|---|
| Approved | Compra aprobada. No se requiere verificación. |
| Rejected | Compra rechazada. |
| Canceled | La compra fue cancelada por el cliente o un proceso automático. |
| Pending | La compra se encuentra pendiente para ser pagada en una red de pago en efectivo o debe ser confirmada por el procesador del medio de pago. |

Por lo tanto, se definen las siguientes URL que se enviarán en la compra cuando se cree el mismo host-to-host antes de la redirección:

* `Url_Approved` → se notifica a esta URL cuando el estado de la compra es `Approved` 
* `Url_Rejected` → se notifica a esta URL cuando el estado de la compra es `Rejected` 
* `Url_Canceled` → se notifica a esta URL cuando el estado de la compra es `Canceled` 
* `Url_Pending`  → se notifica a esta URL cuando el estado de la compra es `Pending` 
* `Url_Notify`   → URL del Webhook de notificación. Se notifica a esta URL el estado de la compra una vez que el procesador del medio de pago notifica a Bamboo. La notificación a esta URL es un POST REST con payload en JSON y no una redirección. Puede ser estática y configurada por el equipo de soporte.

### Ejemplo de compra con flujo Redirect {#redirect-flow-purchase-example}

```json
{
    "TrxToken":"OT__Kg1JdcN4Fz6g7RUCF_xdtbR5n0FVX4IctD__P3BSApY_",
    "Capture":"true",
    "Amount":10000000,
    "Installments":1,
    "Currency": "CLP",,
    "TargetCountryISO": "CL",
    "PaymentMediaId":106,
    "Redirection" : {
      "Url_Approved": "https://dummystore.com/checkout/approved",
      "Url_Rejected": "https://dummystore.com/checkout/rejected",
      "Url_Canceled": "https://dummystore.com/checkout/canceled",
      "Url_Pending": "https://dummystore.com/checkout/pending",
      "Url_Notify": "https://dummystore.com/checkout/notifications"
    }
}
```
<br>

Los campos **PaymentMediaId** y **TrxToken**  son opcionales, pero es obligatorio enviar uno dependiendo del flujo que quiere utilizar.

* **PaymentMediaId**: Identificador de medio de pago alternativo (transferencia, efectivo y procesamiento que requiere redirección del cliente). Puede obtener este identificador consultando la sección [Medios de pago por país](/es/docs/payment-methods.html).
* **TrxToken**: Puede generar el token y transaccionar enviándolo en este campo.

### Contenido de la respuesta de Redirect {#redirect-response-content}
El contenido de la respuesta tiene los parámetros `PurchaseID` y `Status`, así como el campo `FORM` (input data).

```html
<form method="post" action="https://dummystore.com/checkout/approved">
  <input type="hidden" id="PurchaseId" name="PurchaseId" value="198742" />
  <input type="hidden" id="Status" name="Status" value="approved" />
</form>
```

{{% alert title="Nota" color="info"%}}
No existe un sistema de validación, por lo que no recomendamos tomar la respuesta como definitiva. En su lugar, tome el `PurchaseId` y realice un request **GET** (server to server) a `/v1/api//api/Purchase/{ID}` para obtener el objeto de compra Purchase y su estado final.
{{% /alert %}}