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

### URL del Request {#request-url}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/rollback`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/rollback`

## Reembolsar una compra {#refund-a-purchase}
La operación de _**refund**_ está disponible para compras con estado _Approved_. Los reembolsos pueden ser totales o parciales.

### URL del Request {#request-url-1}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/refund`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/refund`

## Parámetros del Request {#request-parameters}
No es necesario enviar el cuerpo del request para anular o reembolsar una compra. Si no envía el request, la compra será anulada o reembolsada con su monto original. 

El monto a anular o reembolsar puede variar respecto al que se envió en la compra inicial, pero este no puede ser superior al original.

### Ejemplo del Request {#request-example}
Para realizar la devolución o reembolso de una compra con un monto inferior al original, es necesario incluir el nuevo monto en el request. Por ejemplo:

```json
{
  "Amount": 50
}
```

## Parámetros del Response {#response-parameters}
Cuando realice la anulación o el reembolso de una compra, obtendrá el mismo objeto `Response` [retornado]({{< ref "purchase-operations.md" >}}#response-parameters).
<!--
## Refund a purchase
The _**refunds**_ operations is only available for purchases with state _Approved_. Refunds can be total or partial

### Considerations
_To be defined_

### URL del Request {#request-url-1}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v2/api/purchase/{{PurchaseId}}/refund`
* **Stage**: `https://api.stage.bamboopayment.com/v2/api/purchase/{{PurchaseId}}/refund`

### Parámetros del Request {#request-parameters}
Consider the following parameters when invoking a refund request.

| Parameter | Tipo | Mandatory | Descripción |
|---|---|---|---|---|
| `Amount` | `number` | No | Amount to be refunded (Partial refund). If this parameter is not send, the refund will be for the amount of the purchase (Total refund).<br>If you require to include decimals in the amount, concatenate the decimal places without de decimal point. Example `12,25` > `1225`.<br>This value **cannot** be higher than the original amount of the purchase. |
| `MetadataIn`  → `Description` | string | No | Optional description for the refund. |

#### Ejemplo del Request {#request-example} 

```json
{
  "Amount":"25000",
  "MetadataIn": {
    "Description": "Refund description"
  },
}
```

### Parámetros del Response {#response-parameters}

| Parámetro | Tipo | Descripción |
|---|---|---|
| `Response` → `PurchaseRefundId` | `number` | Internal identifier of the refund. |
| `Response` → `Created` | `date` | Date and time when the refund was created.<br>Formato de la fecha _**ISO-8601**_. |
| `Response` → `Amount` | `number` | Refund amount as sent in the request. |
| `Response` → `Currency` | `string` | Currency of the refund, according to ISO-4217 (alphanumeric codes). |
| `Response` → `StatusId` | `number` | Identifier of the refund status. |
| `Response` → `Status` | `string` | Descripción of the refund status. |
| `Response` → `AuthorizationCode` | `string` | Response code returned by the acquirer of the transaction. |
| `Response` → `Code` | `string` | Error code returned by the acquirer of the transaction if the refund is rejected. |
| `Response` → `Description` | `string` | Error description returned by the acquirer of the transaction if the refund is rejected. |
| `Response` → `MetadataOut` | `object` | Additional information returned by the acquirer. |
| `Errors` → `ErrorCode` | `string` | Error code returned. |
| `Errors` → `Created` | `string` | Date and time when the error was generated. |
| `Errors` → `Message` | `string` | Descriptive text of the error. |
| `Errors` → `Detail` | `string` | Error detail. |

#### Ejemplo del Response {#response-example}

```json
{
  "Response": {
    "PurchaseRefundId": 194441,
    "Created": "2023-07-04T16:26:33.850",
    "Amount": 50000,
    "Currency": "UYU",
    "StatusId": 111,
    "Status": "Approved",
    "AuthorizationCode": "876961",
    "Code": "",
    "Description": "",
    "MetadataOut": {}
  },
  "Errors": []
}
```
-->