---
title: "API de Transacciones"
linkTitle: "API de Transacciones"
date: 2023-03-02T11:40:29-05:00
Description: >
  La API de Reporte de Transacciones de Bamboo da información detallada de datos transaccionales. Permite acceder a información de transacciones para un periodo de tiempo específico, seleccionar columnas de datos para informes personalizados y obtener detalles de las transacciones, incluyendo información del comprador, métodos de pago y estados de las transacciones.
weight: 10
---

## URL para el Request {#request-url}
Para acceder a la API de Reportes de Transacciones, debe realizar una solicitud **GET** a las siguientes URLs según el ambiente:

* **Producción**: `https://api.bamboopayment.com/v2/api/Reporting/payin-transactions`
* **Stage**: `https://api.stage.bamboopayment.com/v2/api/Reporting/payin-transactions`
 
<br />

> Recuerda incluir la **Clave Privada** del comercio en los encabezados de la petición. <br /> Para más detalles, consulta nuestra [Guía de Autenticación]({{< ref "Authentication.md" >}}).

## Parámetros de la solicitud (Request) {#request-parameters}
| Propiedad | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `from` | `String` | Sí | Fecha de inicio para la consulta de transacciones (formato: YYYY-MM-DD) |
| `to` | `String` | Sí | Fecha de fin para la consulta de transacciones (formato: YYYY-MM-DD) |
| `page` | `Integer` | No | Número de página para paginación |
| `pageSize` | `Integer` | No | Número de registros por página |

{{% alert title="Importante" color="info"%}}
Los parámetros van en el request añadidos en la URL del endpoint, seguido de un `?` indicando el comienzo de los parámetros.
{{% /alert %}}


### Formato y ejemplo de la solicitud (Request) {#format-and-example-of-the-request-request}
* **Formato**: `{endpoint}?From=YYYY-MM-DD&To=YYYY-MM-DD&Page=#&PageSize=#`

* **Ejemplo**: `https://api.bamboopayment.com/v2/api/Reporting/payin-transactions?From=2024-01-01&To=2024-01-31&Page=1&PageSize=10`

## Parámetros de la Respuesta (Response) {#response-parameters}

{{% alert title="Note" color="info"%}}
Al consultar datos recientes, tenga en cuenta que la información más actualizada disponible podría ser del día anterior (D-1). Esto implica que los datos más recientes disponibles a través de la API podrían ser del día anterior a la fecha actual. Tenga esto en cuenta al consultar transacciones recientes.
{{% /alert %}}


| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `Data` | `Array` | Array de objetos de transacción que contienen los siguientes campos: |
| `Data` → `TransactionId` | `Integer` | Identificador único de la transacción |
| `Data` → `Type` | `String` | Tipo de transacción (ej. "Purchase", "Refund") |
| `Data` → `Created` | `Date-time` | Fecha y hora en que se creó la transacción |
| `Data` → `Status` | `String` | Estado de la transacción (ej. "Approved", "Rejected") |
| `Data` → `Error_code` | `String` | Código de error (si es aplicable) |
| `Data` → `Amount` | `Decimal` | Monto de la transacción |
| `Data` → `Currency` | `String` | Moneda de la transacción |
| `Data` → `Country` | `String` | País de la transacción |
| `Data` → `Transaction_source` | `String` | Fuente de la transacción |
| `Data` → `Tenant` | `String` | Nombre del tenant |
| `Data` → `Merchant_account` | `String` | Nombre de la cuenta del merchant |
| `Data` → `Payment_method_type` | `String` | Tipo de método de pago utilizado |
| `Data` → `Payment_method` | `String` | Medio de pago específico utilizado |
| `Data` → `Card_bin` | `String` | Número de Identificación Bancaria (BIN) en caso de que sea una tarjeta de crédito (6 dígitos). |
| `Data` → `Card_last4` | `String` | Últimos 4 dígitos de la tarjeta |
| `Data` → `Order` | `String` | Identificador de la orden |
| `Data` → `Unique_id` | `String` | Identificador único de la transacción |
| `Data` → `Authorization_code` | `String` | Código de autorización de la transacción en el adquirente |
| `Data` → `Installments` | `Integer` | Número de cuotas (si es aplicable) |
| `Data` → `Issuer` | `String` | Nombre del banco emisor |
| `Data` → `Customer_name` | `String` | Nombre completo del cliente |
| `Data` → `Customer_document_type` | `String` | Tipo de documento de identificación |
| `Data` → `Customer_document_number` | `String` | Número de documento de identificación |
| `Data` → `Customer_email` | `String` | Dirección de correo electrónico del cliente |
| `Page` | `Integer` | Número de página |
| `PageSize` | `Integer` | Número de registros por página |
| `Total` | `Integer` | Número total de registros que coinciden con la consulta |
| `Errors` | `Array` | Array de mensajes de error si ocurrieron durante el procesamiento de la solicitud |
<!--
| `success` | `Boolean` | Indica si la solicitud fue exitosa |
| `message` | `String` | Proporciona información adicional sobre la respuesta |
-->
### Ejemplo del Response {#response-example}

{{< highlight json >}}
{{< Payins/Reporting/transaction_api >}}
{{< /highlight >}} 