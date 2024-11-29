---
title: "API DE REPORTES"
date: 2023-03-02T11:40:29-05:00
type: docs
Description: >
  La API de Reporte de Payouts de Bamboo da información detallada de datos transaccionales. Permite acceder a información de payouts realizados para un periodo de tiempo específico, seleccionar columnas de datos para informes personalizados y obtener detalles de los payouts, incluyendo información sobre la moneda de instrucción, país, datos del usuario final, método de pago, entre otros.
weight: 70
---

## URL para el Request {#request-url}
Para acceder a la API de Reportes de Payouts, debe realizar una solicitud **GET** a las siguientes URLs según el ambiente:

* **Producción**: `https://payout-api.prod.bamboopayment.com/api/Payout/getreport`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/Payout/getreport`
 
## Authorization {#authorization}
En el encabezado de la solicitud, el parámetro `Authorization` debe configurarse concatenando la palabra `Basic`, un espacio y la **Private Key** del merchant.

## Parámetros de la solicitud (Request) {#request-parameters}
| Propiedad | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `merchantAccount` | `Integer` | Sí | ID de la cuenta del merchant en el entorno de producción de Bamboo. Solicitar información a support@bamboopayment.com |
| `from` | `String` | Sí | Fecha de inicio para la consulta de transacciones (formato: YYYY-MM-DD) |
| `to` | `String` | Sí | Fecha de fin para la consulta de transacciones (formato: YYYY-MM-DD) |
| `page` | `Integer` | Sí | Número de página para paginación. El valor debe ser mayor a 0.|
| `pageSize` | `Integer` | No | Número de registros por página. El valor debe ser mayor a 0. |

{{% alert title="Importante" color="info"%}}
Los parámetros van en el request añadidos en la URL del endpoint, seguido de un `?` indicando el comienzo de los parámetros.
<br> Cada parámetro debe estar separado por `&`.
{{% /alert %}}


### Formato y ejemplo de la solicitud (Request) {#format-and-example-of-the-request-request}
* **Formato**: `{endpoint}?merchantAccount#&from=YYYY-MM-DD&To=YYYY-MM-DD&Page=#&PageSize=#`

* **Ejemplo**: `https://payout-api.prod.bamboopayment.com/api/Payout/getreport?merchantAccount=1234&from=2024-01-01&To=2024-01-31&Page=1&PageSize=10`

## Parámetros de la Respuesta (Response) {#response-parameters}

{{% alert title="Note" color="info"%}}
Al consultar datos recientes, tenga en cuenta que la información más actualizada disponible podría ser del día anterior (D-1). Esto implica que los datos más recientes disponibles a través de la API podrían ser del día anterior a la fecha actual. Tenga esto en cuenta al consultar los payouts recientes.
{{% /alert %}}


| Propiedad                               | Tipo          | Descripción                                                                                                          |
|-------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------|
| `data`                              | `array`       | Lista de objetos que representan detalles del Payout.                                                               |
| `data` → `payoutId`                 | `integer`     | Identificador único del Payout.                                                                                     |
| `data` → `created`                  | `datetime`    | Fecha y hora de creación del Payout en formato ISO 8601.                                                            |
| `data` → `lastUpdate`               | `datetime`    | Fecha y hora de la última actualización del Payout en formato ISO 8601.                                             |
| `data` → `status`                   | `string`      | Estado del Payout. Ejemplo: `Rejected`.                                                                             |
| `data` → `merchantId`               | `integer`     | Identificador único del comercio asociado.                                                                          |
| `data` → `merchantName`             | `string`      | Nombre del comercio asociado.                                                                                       |
| `data` → `merchantAccountId`        | `integer`     | Identificador único de la cuenta del comercio.                                                                      |
| `data` → `merchantAccountName`      | `string`      | Nombre de la cuenta del comercio.                                                                                   |
| `data` → `inputCurrency`            | `string(3)`   | Código ISO de la moneda de entrada. Ejemplo: `USD`.                                                                 |
| `data` → `inputAmount`              | `decimal`     | Monto del Payout en la moneda de entrada.                                                                           |
| `data` → `exchangeRate`             | `decimal`     | Tasa de cambio aplicada al Payout.                                                                                  |
| `data` → `currency`                 | `string(3)`   | Código ISO de la moneda de salida. Ejemplo: `PEN`.                                                                  |
| `data` → `amount`                   | `decimal`     | Monto del Payout en la moneda de salida.                                                                            |
| `data` → `merchantReference`        | `string`      | Referencia única proporcionada por el cliente para identificar el Payout.                                           |
| `data` → `customerFirstName`        | `string`      | Nombre del beneficiario.                                                                                            |
| `data` → `customerLastName`         | `string`      | Apellido del beneficiario.                                                                                          |
| `data` → `customerDocumentType`     | `string`      | Tipo de documento del beneficiario. Ejemplo: `CC`.                                                                  |
| `data` → `customerDocumentNumber`   | `string`      | Número del documento del beneficiario.                                                                              |
| `data` → `customerEmail`            | `string`      | Correo electrónico del beneficiario. Ejemplo: `Santa.Wiegand@gmail.com`.                                            |
| `data` → `customerPhone`            | `string`      | Teléfono del beneficiario. Ejemplo: `850.622.3790 x003`.                                                            |
| `data` → `customerAddress`          | `string`      | Dirección del beneficiario.                                                                                         |
| `data` → `bankCode`                 | `string`      | Código del banco asociado al Payout. Ejemplo: `885`.                                                                |
| `data` → `bankName`                 | `string`      | Nombre del banco asociado al Payout.                                                                                |
| `data` → `bankType`                 | `string`      | Tipo de cuenta bancaria. Ejemplo: `2` para cuenta de ahorros.                                                       |
| `data` → `bankBranch`               | `string`      | Sucursal bancaria asociada.                                                                                         |
| `data` → `bankNumber`               | `string`      | Número de cuenta bancaria.                                                                                          |
| `data` → `bankCountry`              | `string(2)`   | Código ISO del país del banco. Ejemplo: `US`.                                                                       |
| `data` → `errorCode`                | `string`      | Código del error en caso de fallo. Ejemplo: `902`.                                                                  |
| `data` → `errorDescription`         | `string`      | Descripción del error en caso de fallo. Ejemplo: `Invalid bank account`.                                             |
| `data` → `paymentMethodType`        | `string`      | Tipo de método de pago. Ejemplo: `BankTransfer`.                                                                    |
| `data` → `paymentMethod`            | `string`      | Método de pago utilizado. Ejemplo: `Payout`.                                                                        |
| `data` → `pixRandom`                | `string`      | Clave aleatoria para el pago mediante PIX.                                                                          |
| `data` → `pixPhone`                 | `string`      | Número de teléfono para el pago mediante PIX.                                                                       |
| `data` → `pixDocument`              | `string`      | Documento asociado al pago mediante PIX.                                                                            |
| `data` → `pixEmail`                 | `string`      | Correo electrónico asociado al pago mediante PIX.                                                                   |
| `total`                             | `integer`     | Número total de registros en la respuesta.                                                                          |
| `page`                              | `integer`     | Página actual en los resultados paginados.                                                                          |
| `pageSize`                          | `integer`     | Tamaño de la página actual en los resultados paginados.                                                             |
| `errors`                            | `object`      | Detalles de errores si los hubiera.                                                                                 |


### Ejemplo del Response {#response-example}
{{< highlight json >}}
{{< Payouts/Reporting/reportingPayouts_response >}}
{{< /highlight >}}
