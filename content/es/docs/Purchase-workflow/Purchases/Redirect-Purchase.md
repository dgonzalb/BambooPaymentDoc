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
| 1 | The Merchant requests the `OneTimeToken` for redirect flow payment | `/token/GetRedirectToken` |
| 2 | The Merchant sends the [purchase request]({{< ref "Purchase-Operations" >}}#create-a-purchase) as with any other means of payment | `/purchase` |
| 3 | Bamboo returns Purchase, with status _Pending for Redirection_, and a CommerceAction object containing an external service URL. `ActionReason = REDIRECTION_NEEDED_EXTERNAL_SERVICE` | `/purchase response` |
| 4 | The merchant must redirect the customer to the external service URL provided in the `CommerceAction` object. | `Commerce Site/Client browser` |
| 5 | Bamboo automatically redirects customers to an external payment processor to complete payment. | `Bamboo Site/Customer browser` |
| 6 | The customer follows the steps shown by the acquirer's site to complete the payment. | `External Payment Site/Client` |
| 7 | Bamboo receives the response is received and processes and updates the transaction status. Then, Bamboo redirects back to the merchant's response page (According to transaction status). | `/paymentCallback` |
| 8 | Bamboo receives an async push notification from acquire and notify back to the merchant's notification webhook (the purchase status is updated). |` /webhook (Merchant)` |

## URLS del response {#response-urls}
COmo resultado de la transacción, esta puede estar en cualquiera de los siguiente estados.

| Estado | Descripción |
|---|---|
| Approved | Purchase approved. No verification is needed. |
| Rejected | Purchase rejected. |
| Canceled | The customer or an automatic process has canceled the purchase. |
| Pending | The purchase is pending to be paid in a Cash Payment network, or to be confirmed by the payment method processor. |

Por lo tanto, se definen las siguientes URL que se enviarán en la compra cuando se cree el mismo host-to-host antes de la redirección:

* `Url_Approved` → se notifica a esta URL cuando el estado de la compra es `Approved` 
* `Url_Rejected` → se notifica a esta URL cuando el estado de la compra es `Rejected` 
* `Url_Canceled` → se notifica a esta URL cuando el estado de la compra es `Canceled` 
* `Url_Pending`  → se notifica a esta URL cuando el estado de la compra es `Pending` 
* `Url_Notify`   → uRL del Webhook de notificación. Se notifica a esta URL el estado de la compra una vez que el procesador del medio de pago notifica a Bamboo. La notificación a esta URL es un POST REST con payload en JSON y no una redirección. Puede ser tambiñen estática y configurada por el equipo de soporte.

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