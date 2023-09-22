---
title: "Reembolsos y anulaciones"
linkTitle: "Reembolsos y anulaciones"
date: 2023-08-02T08:46:32-05:00
Description: >
  Las operaciones de reembolso y anulación están relacionadas al proceso de reversar una compra ya confirmada o a cancelar una compra preautorizada.
weight: 30
---

Antes de empezar, revisemos algunos conceptos.

* **Anulación**: Una anulación es el acto de cancelar una transacción preautorizada (rollback) antes de que finalice o se liquide. Cuando se anula una transacción, es como si la compra nunca se hubiera producido, y no se transfiere dinero. Las anulaciones suelen producirse antes de que el pago se haya procesado por completo, por lo que no se cobra al método de pago por la transacción anulada.

* **Reembolso**: Un reembolso, por otro lado, es una transacción que se produce cuando un cliente devuelve un artículo comprado o cancela un servicio, y el comercio reembolsa al cliente el monto pagado. El monto reembolsado suele devolverse al medio de pago original utilizado por el cliente. A diferencia de las anulaciones, el reembolso se produce después de que se haya liquidado la transacción.

## Configurar el idioma de los códigos de respuesta {#setting-the-language-of-the-response-codes}
Puede recibir la descripción del error basándose en las funciones de localización. Para ello, debe enviar el encabezado `lang` en su integración, utilizando cualquiera de los siguientes idiomas en formato **ISO 639-1**.

<div id="shortTable"></div>

| Código | Idioma |
|:-:|---|
| `en` | Inglés.<br>_Este es el idioma por defecto. Si no envía este encabezado o envía un idioma diferente a los soportados, recibirá los errores en este idioma._ |
| `es` | Español. |
| `pt` | Portugués. |

## Anular una compra {#rollback-a-purchase}
La operación de _**rollback**_ está disponible para compras previamente [autorizadas]({{< ref "purchase-operations.md" >}}#confirm-a-purchase) con estado _PreAuthorized_.

{{% alert title="Nota" color="info"%}}
La funcionalidad de preautorización puede no estar soportada por todos lo medios de pago y está disponible en los siguientes países.

<div style="text-align: center;">

<a href="/es/docs/payment-methods/brazil.html"><img src="/assets/Flags/FlagBR.png" width="30" /></a>
<a href="/es/docs/payment-methods/chile.html"><img src="/assets/Flags/FlagCL.png" width="30" /></a>
<a href="/es/docs/payment-methods/colombia.html"><img src="/assets/Flags/FlagCO.png" width="30" /></a>
<a href="/es/docs/payment-methods/uruguay.html"><img src="/assets/Flags/FlagUY.png" width="30" /></a>

</div>

{{% /alert %}}

<!--
### Considerations {#considerations}
_To be defined_
-->

### URL del Request {#request-url}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/rollback`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/rollback`

<!--
## Reembolsar una compra {#refund-a-purchase}
La operación de _**refund**_ está disponible para compras con estado _Approved_. Los reembolsos pueden ser totales o parciales.

### URL del Request {#request-url-1}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/refund`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/refund`
-->

### Parámetros del Request {#request-parameters}
No es necesario enviar el cuerpo del request para anular una compra. Si no envía el request, la compra será anulada con su monto original. 

El monto a anular puede variar respecto al que se envió en la compra inicial, pero este no puede ser superior al original.

#### Ejemplo del Request {#request-example}
Para realizar la devolución de una compra con un monto inferior al original, es necesario incluir el nuevo monto en el request. Por ejemplo:

```json
{
  "Amount": 50
}
```

### Parámetros del Response {#response-parameters}
Cuando realice la anulación o el reembolso de una compra, obtendrá el mismo objeto `Response` [retornado]({{< ref "purchase-operations.md" >}}#response-parameters).

## Reembolsar una compra {#refund-a-purchase}
La operación de _**reembolso**_ está disponible únicamente para compras con estado _Aprobado_. Los reembolsos pueden ser totales o parciales.

<!--
### Consideraciones  {#considerations-1}
_To be defined_
-->

### URL del Request {#request-url-1}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Production**: `https://api.bamboopayment.com/v2/api/purchase/{{PurchaseId}}/refund`
* **Stage**: `https://api.stage.bamboopayment.com/v2/api/purchase/{{PurchaseId}}/refund`

### Parámetros del Request {#request-parameters}
Considere los siguientes parámetros cuando invoque un request de reembolso.

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|---|---|---|---|---|
| `Amount` | `number` | No | Monto a se reembolsado (reembolso parcial). Si no envía este parámetro el reembolso se hará por el monto de la compra (reembolso total).<br>Si requiere incluir decimales en el monto, concatene los dígitos decimales sin el punto decimal. Ejemplo: `12,25` > `1225`.<br>Este valor **no puede** ser mayor que el valor original del monto de la compra. |
| `MetadataIn`  → `Description` | `string` | No | Descripción opcional del reembolso. |

#### Ejemplo del Request {#request-example-1}

```json
{
  "Amount":"2500",
  "MetadataIn": {
    "Description": "Refund description"
  }
}
```

### Parámetros del Response {#response-parameters-1}

| Parámetro | Tipo | Descripción |
|---|---|---|
| `Response` → `PurchaseRefundId` | `number` | Identificador interno del reembolso. |
| `Response` → `Created` | `date` | Fecha y hora de la creación del reembolso.<br>Formato de fecha: _**ISO-8601**_. |
| `Response` → `Amount` | `number` | Monto del reembolso tal como se envió en el request. |
| `Response` → `Currency` | `string` | Moneda del reembolso de acuerdo al formato ISO-4217 (códigos alfanuméricos). |
| `Response` → `StatusId` | `number` | Identificador del estado del reembolso. |
| `Response` → `Status` | `string` | Descripción del estado del reembolso. |
| `Response` → `AuthorizationCode` | `string` | Código de reembolso retornado por el adquirente de la transacción. |
| `Response` → `Code` | `string` | Código de error retornado por el adquirente de la transacción. |
| `Response` → `Description` | `string` | Descripción retornada por el adquirente de la transacción. |
| `Response` → `MetadataOut` | `object` | Información adicional retornada por el adquirente de la transacción. |
| `Errors` → `ErrorCode` | `string` | Código de error retornado por Bamboo. |
| `Errors` → `Created` | `string` | Fecha y hora de la generación del error. |
| `Errors` → `Message` | `string` | Texto descriptivo del error. |
| `Errors` → `Detail` | `string` | Detalle del error. |

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseRefundId": 1246459,
        "Created": "2023-09-22T13:46:47.089",
        "Amount": 100.00,
        "Currency": "CLP",
        "StatusId": 10,
        "Status": "Refund_OK",
        "AuthorizationCode": null,
        "Code": "0",
        "Description": "REVERSED",
        "MetadataOut": null
    },
    "Errors": []
}
```
