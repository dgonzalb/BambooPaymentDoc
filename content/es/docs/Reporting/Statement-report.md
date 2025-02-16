---
title: "API de Movimientos Financieros"
linkTitle: "API de Movimientos Financieros"
date: 2024-10-02T08:40:29-03:00
Description: >
  La API de Movimientos proporciona un reporte detallado de datos financieros. Permite obtener una visión general de los movimientos monetarios en la cuenta Bamboo en un periodo específico. Incluye créditos (fondos entrantes), débitos (pagos salientes o tarifas) y costos.
weight: 20
---

## URL para el Request {#request-url}
Para acceder a la API de Reportes de Transacciones, debe realizar una solicitud **GET** a las siguientes URLs según el ambiente:

* **Producción**: `https://api.bamboopayment.com/v2/api/Reporting/billing-movements`
* **Stage**: `https://api.stage.bamboopayment.com/v2/api/Reporting/billing-movements`

<br />

> Recuerda incluir la **Clave Privada** del comercio en los encabezados de la petición. <br /> Para más detalles, consulta nuestra [Guía de Autenticación]({{< ref "Authentication.md" >}}).

## Parámetros de la solicitud (Request) {#request-parameters}
| Propiedad | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `from` | `String` | Sí | Fecha de inicio para la consulta de movimientos (formato: YYYY-MM-DD) |
| `to` | `String` | Sí | Fecha de fin para la consulta de movimientos (formato: YYYY-MM-DD) |
| `page` | `Integer` | Sí | Número de página para paginación |
| `pageSize` | `Integer` | Sí | Número de registros por página |

{{% alert title="Importante" color="info"%}}
Los parámetros van en el request añadidos en la URL del endpoint, seguido de un `?` indicando el comienzo de los parámetros.
{{% /alert %}}


### Formato y ejemplo de la solicitud (Request) {#format-and-example-of-the-request-request}
* **Formato**: `{endpoint}?From=YYYY-MM-DD&To=YYYY-MM-DD&Page=#&PageSize=#`

* **Ejemplo**: `https://api.bamboopayment.com/v2/api/Reporting/billing-movements?From=2024-01-01&To=2024-01-31&Page=1&PageSize=10`

## Parámetros de la Respuesta (Response) {#response-parameters}

{{% alert title="Note" color="info"%}}
Al consultar datos recientes, tenga en cuenta que la información más actualizada disponible podría ser del día anterior (D-1). Esto implica que los datos más recientes disponibles a través de la API podrían ser del día anterior a la fecha actual. Tenga esto en cuenta al consultar transacciones recientes.
{{% /alert %}}


| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `Data` | `Array` | Array de objetos por cada movimiento de cuenta |
| `Data` → `transactionid` | `String` | ID de transacción asociado con este movimiento financiero |
| `Data` → `movementid` | `Integer` | Identificador del movimiento financiero |
| `Data` → `created` | `String` | Fecha y hora en que se creó el movimiento financiero |
| `Data` → `type` | `String` | Tipo de transacción (Ejemplo: `Refund`, `Purchase`, `Payout"` , `Fee`, `FX`, `Withdrawal`, `Debit adjustment`, `Credit adjustment`.) |
| `Data` → `country` | `String` | Código del país donde ocurrió la transacción `formato ISO 3166-1 alpha-2` |
| `Data` → `currency` | `String` | Código de moneda utilizado en la transacción |
| `Data` → `sign` | `String` | Indica si el monto es un crédito o un débito |
| `Data` → `amount` | `Integer` | Valor de la transacción |
| `Data` → `availabledate` | `String` | Fecha en que los fondos estarán disponibles |
| `Data` → `referenceid` | `String` | ID de referencia |
| `Data` → `endusernotes` | `String` | Notas asociadas con la transacción |
| `Data` → `exchangerate` | `Number` | Tasa de cambio utilizada (si aplica) |
| `Data` → `status` | `String` | Estado actual de la transacción |
| `Data` → `merchant_account_id` | `Integer` | ID de la cuenta |
| `Data` → `merchant_account_name` | `String` | Nombre de la cuenta |
| `Data` → `merchant_id` | `Integer` | ID del comercio |
| `Data` → `merchant_name` | `String` | Nombre del comercio |
| `Data` → `payment_method` | `String` | Medio de pago utilizado |
| `Data` → `payment_media_brand` | `String` | Marca del método de pago (si aplica) |
| `Data` → `last_status_date` | `String` | Fecha de la última actualización de estado |
| `Page` | `Integer` | Número de página actual |
| `PageSize` | `Integer` | Número de registros por página |
| `Total` | `Integer` | Número total de registros que coinciden con la consulta |
| `Errors` | `Array` | Array de mensajes de error si ocurrieron durante el procesamiento de la solicitud |

<!--
| `success` | `Boolean` | Indica si la solicitud fue exitosa |
| `message` | `String` | Proporciona información adicional sobre la respuesta |
-->

### Ejemplo del Response {#response-example}

{{< highlight json >}}
{{< Payins/Reporting/movements_api >}}
{{< /highlight >}} 