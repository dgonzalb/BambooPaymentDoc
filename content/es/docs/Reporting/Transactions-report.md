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
| `success` | `Boolean` | Indica si la solicitud fue exitosa |
| `message` | `String` | Proporciona información adicional sobre la respuesta |
| `data` | `Array` | Array de objetos de transacción que contienen los siguientes campos: |
| `data` → `TransactionId` | `Integer` | Identificador único de la transacción |
| `data` → `Type` | `String` | Tipo de transacción (ej. "Purchase", "Refund") |
| `data` → `Created` | `Date-time` | Fecha y hora en que se creó la transacción |
| `data` → `Status` | `String` | Estado de la transacción (ej. "Approved", "Rejected") |
| `data` → `Error_code` | `String` | Código de error (si es aplicable) |
| `data` → `Amount` | `Decimal` | Monto de la transacción |
| `data` → `Currency` | `String` | Moneda de la transacción |
| `data` → `Country` | `String` | País de la transacción |
| `data` → `Transaction_source` | `String` | Fuente de la transacción |
| `data` → `Tenant` | `String` | Nombre del tenant |
| `data` → `Merchant_account` | `String` | Nombre de la cuenta del merchant |
| `data` → `Payment_method_type` | `String` | Tipo de método de pago utilizado |
| `data` → `Payment_method` | `String` | Medio de pago específico utilizado |
| `data` → `Card_bin` | `String` | Número de Identificación Bancaria (BIN) en caso de que sea una tarjeta de crédito (6 dígitos). |
| `data` → `Card_last4` | `String` | Últimos 4 dígitos de la tarjeta |
| `data` → `Order` | `String` | Identificador de la orden |
| `data` → `Unique_id` | `String` | Identificador único de la transacción |
| `data` → `Authorization_code` | `String` | Código de autorización de la transacción en el adquirente |
| `data` → `Installments` | `Integer` | Número de cuotas (si es aplicable) |
| `data` → `Issuer` | `String` | Nombre del banco emisor |
| `data` → `Customer_name` | `String` | Nombre completo del cliente |
| `data` → `Customer_document_type` | `String` | Tipo de documento de identificación |
| `data` → `Customer_document_number` | `String` | Número de documento de identificación |
| `data` → `Customer_email` | `String` | Dirección de correo electrónico del cliente |
| `total` | `Integer` | Número total de registros que coinciden con la consulta |
| `page` | `Integer` | Número de página |
| `pageSize` | `Integer` | Número de registros por página |
| `errors` | `Array` | Array de mensajes de error si ocurrieron durante el procesamiento de la solicitud |

### Ejemplo del Response {#response-example}

{{< highlight json >}}
{{< Payins/Reporting/transaction_api >}}
{{< /highlight >}} 