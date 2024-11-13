---
title: "Get de la Compra"
linkTitle: "Get de la Compra"
date: 2024-08-02T08:46:32-05:00
Description: >
   El Get de la Compra permite a los comercios resolver incosistencias en las transacciones y recuperar la información detallada de una compra específica.
weight: 20
tags: ["subtopic"]
---

## URL de la solicitud {#request-url}
Se requiere hacer una petición **GET** a las siguientes URLs según sus necesidades:

* **Producción**: `https://api.bamboopayment.com/v3/api/Purchase/{{TransactionId}}`
* **Pruebas**: `https://api.stage.bamboopayment.com/v3/api/Purchase/{{TransactionId}}`

Donde `{{TransactionId}}` es el identificador de la transacción que desea consultar.

{{% alert title="Uso de la API de Reportes" color="info"%}}
Para análisis de transacciones en masa y generación de informes, consulte nuestra [API de Reporte de Transacciones]({{< ref "Transactions-report.md" >}}), optimizada para manejar grandes volúmenes de datos y generar informes detallados.
{{% /alert %}}

## Parámetros de respuesta {#response-parameters}
La estructura de respuesta para esta operación es idéntica a la [respuesta estándar de compra]({{< ref "Purchase_V3.md" >}}#response). Esto garantiza consistencia entre diferentes tipos de transacciones y simplifica los procesos de integración.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `TransactionId` | `string` | Identificador único de la transacción. Un número de 19 dígitos enviado como cadena por compatibilidad. |
| `Result` | `string` | Resultado de la transacción. `COMPLETED` o `ACTION_REQUIRED`. Consulte el objeto "Action" para obtener instrucciones. |
| `Status` | `string` | Estado actual de la transacción (por ejemplo, Aprobada, Rechazada). |
| `ErrorCode` | `string` | Código de error si la transacción fue rechazada. |
| `ErrorDescription` | `string` | Descripción detallada del error si la transacción fue rechazada. |
| `Created` | `string` | Marca de tiempo de cuándo se creó la transacción, en formato **ISO 8601**. |
| `AuthorizationDate` | `string` | Marca de tiempo de cuándo se autorizó la transacción, en formato **ISO 8601**. |
| `AuthorizationCode` | `string` | Código único proporcionado por el emisor para confirmar la autorización de la transacción. |
| `Amount` | `integer` | Monto total de la transacción. |
| `Currency` | `string` | Código de la moneda utilizada para la transacción. Puede diferir de la moneda de la solicitud según los acuerdos comerciales. |
| `Installments` | `integer` | Número de cuotas de pago para la transacción. |
| `TaxableAmount` | `integer` | Monto sujeto a impuestos. |
| `Tip` | `integer` | Monto de la propina. |
| `Url` | `string` | Enlace para acceder a detalles adicionales de la transacción. |
| `MetadataOut` | `object` | Metadatos adicionales devueltos con la respuesta de la transacción. |
| `Action` | `object` | Detalles de las acciones requeridas cuando el Resultado es "ACTION_REQUIRED". |
| `PaymentMethod` | `object` | Información del medio de pago utilizado |

## Ejemplo de respuesta {#response-example}

{{< highlight json >}}
{{< Payins/V3/GetPurchase/requestGetPurchase >}}
{{< /highlight >}} 

{{% alert title="Nota" color="info"%}}
Todos los campos, estados y códigos de error descritos en la [respuesta de compra]({{< ref "Purchase_V3.md" >}}#response) se aplican igualmente al GET de la compra.
{{% /alert %}}