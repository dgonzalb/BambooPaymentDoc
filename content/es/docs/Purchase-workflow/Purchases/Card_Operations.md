---
title: "Compras Autorizadas: Captura y Cancelación"
linkTitle: "Captura y Cancel"
date: 2024-08-22T11:40:29-05:00
Description: >
    Gestione los pagos con tarjetas crédito y débito a través de las API de captura y cancelación de compras autorizadas.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Versiones anteriores de la API" color="info"%}}
La documentación de la API versión V1 está disponible en la sección de [Legacy]({{< ref purchase-operations.md >}}#confirm-a-purchase)
{{% /alert %}}

## Capturar una compra {#capture-a-purchase}
Este método le permite confirmar una compra autorizada. El proceso de captura le da la flexibilidad de confirmar y finalizar una transacción preautorizada, permitiéndole ajustar el valor si es necesario.

{{% alert title="Nota" color="info"%}}
No todos los métodos de pago admiten la función de preautorización. Está disponible para los siguientes países:

<div style="text-align: center;">

<a href="/es/docs/payment-methods/brazil.html"><img src="/assets/Flags/FlagBR.png" width="30" /></a>
<a href="/es/docs/payment-methods/chile.html"><img src="/assets/Flags/FlagCL.png" width="30" /></a>
<a href="/es/docs/payment-methods/colombia.html"><img src="/assets/Flags/FlagCO.png" width="30" /></a>
<a href="/es/docs/payment-methods/uruguay.html"><img src="/assets/Flags/FlagUY.png" width="30" /></a>

</div>

{{% /alert %}}

### URL de la solicitud {#request-url}
Debe realizar una petición **POST** a las siguientes URLs según sus necesidades:

* **Producción**: `https://api.bamboopayment.com/v3/api/purchase/{{TransactionId}}/capture`
* **Pruebas**: `https://api.stage.bamboopayment.com/v3/api/purchase/{{TransactionId}}/capture`

### Parámetros de la solicitud {#request-parameters}
El body en la solicitud es opcional para confirmar una compra. Si no envía ninguna solicitud, el método confirmará la compra preautorizada por su valor original.

El valor de la compra puede variar respecto al enviado en el proceso de compra inicial, pero el nuevo valor no puede ser mayor que el valor original.

#### Ejemplo de solicitud (Captura Parcial) {#request-example-partial-capture}
Debe incluir el nuevo valor en la solicitud para confirmar una compra con un valor menor al original. Por ejemplo:

{{< highlight json >}}
{{< Payins/V3/CardOperations/partialCapture_request >}}
{{< /highlight >}} 

#### Ejemplo de respuesta (Captura Parcial) {#response-example-partial-capture}
Obtendrá el mismo objeto `Response` que para el [objeto de compra]({{< ref "Purchase_V3.md" >}}#response).

**Resultado:** `COMPLETED` - **Estado:** `PREAUTHORIZED`

{{< highlight json >}}
{{< Payins/V3/CardOperations/partialCapture_response >}}
{{< /highlight >}} 


## Cancelar una compra {#cancelling-a-purchase}
La anulación es el acto de cancelar una transacción preautorizada antes de que se finalice o liquide. Cuando se anula una transacción, es como si la compra nunca hubiera ocurrido y se libera el cupo del límite autorizado. Las anulaciones generalmente ocurren antes de que el pago se procese completamente, por lo que no se cobra al medio de pago del cliente por la transacción anulada.

{{% alert title="Versiones anteriores de la API" color="info"%}}
La documentación de la API versión V1 está disponible en la sección de [Legacy]({{< ref refunds-and-voids.md >}}#rollback-a-purchase)
{{% /alert %}}

La operación de _**cancelación**_ solo está disponible para compras previamente [autorizadas]({{< ref "Card_Operations.md" >}}#capturar-una-compra) con estado _PreAuthorized_. Si está interesado en reembolsar una compra que ya ha sido capturada, consulte la sección de [reembolsos]({{< ref "Refunds.md" >}}) para obtener instrucciones detalladas.

{{% alert title="Nota" color="info"%}}
La función de preautorización puede no estar soportada por todos los métodos de pago y está disponible para los siguientes países:

<div style="text-align: center;">

<a href="/es/docs/payment-methods/brazil.html"><img src="/assets/Flags/FlagBR.png" width="30" /></a>
<a href="/es/docs/payment-methods/chile.html"><img src="/assets/Flags/FlagCL.png" width="30" /></a>
<a href="/es/docs/payment-methods/colombia.html"><img src="/assets/Flags/FlagCO.png" width="30" /></a>
<a href="/es/docs/payment-methods/uruguay.html"><img src="/assets/Flags/FlagUY.png" width="30" /></a>

</div>

{{% /alert %}}

### URL de la solicitud {#request-url-1}
Debe realizar una petición **POST** a las siguientes URLs según sus necesidades:

* **Producción**: `https://api.bamboopayment.com/v3/api/purchase/{{TransactionId}}/cancel`
* **Pruebas**: `https://api.stage.bamboopayment.com/v3/api/purchase/{{TransactionId}}/cancel`

### Parámetros de la solicitud {#request-parameters-1}
No se requiere el body en la solicitud para cancelar una compra. Si no envía ninguna solicitud, la compra se anulará con su valor original.

El valor a anular puede variar respecto al que se envió en el proceso de Compra inicial, pero el nuevo valor no puede ser mayor que el valor original.

{{% alert title="Nota" color="info"%}}
La disponibilidad de la **funcionalidad de cancelación parcial puede variar según el país**. Para obtener información detallada sobre esta función en su región específica, consulte con su Account Manager.
{{% /alert %}}

#### Ejemplo de solicitud (Cancelación Parcial) {#request-example-partial-cancellation}
Para realizar la cancelación de la compra con un valor menor al original, debe incluir el nuevo valor en la solicitud. Por ejemplo:

{{< highlight json >}}
{{< Payins/V3/CardOperations/partialCancellation_request >}}
{{< /highlight >}} 

### Parámetros de respuesta {#response-parameters}
Cuando realiza la cancelación, obtendrá el mismo objeto `Response` que para el [objeto de compra]({{< ref "Purchase_V3.md" >}}#response).

**Resultado:** `COMPLETED` - **Estado:** `CANCELLED`

{{< highlight json >}}
{{< Payins/V3/CardOperations/partialCancellation_response >}}
{{< /highlight >}}