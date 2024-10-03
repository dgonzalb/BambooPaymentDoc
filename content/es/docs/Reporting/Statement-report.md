---
title: "API de Movimientos Financieros"
linkTitle: "API de Movimientos Financieros"
date: 2024-10-02T08:40:29-03:00
Description: >
  La API de Movimientos proporciona un reporte detallado de datos financieros. Permite obtener una visión general de los movimientos monetarios en la cuenta Bamboo en un periodo específico. Incluye créditos (fondos entrantes), débitos (pagos salientes o tarifas) y costos.
weight: 20
---

## URL para el Request
Para acceder a la API de Reportes de Transacciones, debe realizar una solicitud **GET** a las siguientes URLs según el ambiente:

* **Producción**: `https://api.bamboopayment.com/v2/api/Reporting/billing-movements`
* **Stage**: `https://api.stage.bamboopayment.com/v2/api/Reporting/billing-movements`


## Authorization
En el encabezado de la solicitud, el parámetro `Authorization` debe configurarse concatenando la palabra `Basic`, un espacio y la **Private Key** del merchant.

## Parámetros de la solicitud (Request)
| Propiedad | Tipo | Obligatorio | Descripción |
|-----------|------|-------------|-------------|
| `merchantAccount` | `Integer` | Sí | El identificador único de la cuenta del merchant. |
| `from` | `String` | Sí | Fecha de inicio para la consulta de transacciones (formato: YYYY-MM-DD) |
| `to` | `String` | Sí | Fecha de fin para la consulta de transacciones (formato: YYYY-MM-DD) |
| `page` | `Integer` | No | Número de página para paginación |
| `pageSize` | `Integer` | No | Número de registros por página |
| `columns` | `Array` | No | Array de columnas específicas a incluir en la respuesta (un array vacío devuelve todas las columnas) |

### Ejemplo de la solicitud (Request)
```json
{
    "merchantAccount": 1,
    "from":"2021-01-01",
    "to":"2021-01-31",
    "page":1,
    "pageSize":10,
    "columns": []
}
```

## Parámetros de la Respuesta (Response)

{{% alert title="Note" color="info"%}}
Al consultar datos recientes, tenga en cuenta que la información más actualizada disponible podría ser del día anterior (D-1). Esto implica que los datos más recientes disponibles a través de la API podrían ser del día anterior a la fecha actual. Tenga esto en cuenta al consultar transacciones recientes.
{{% /alert %}}


| Propiedad | Tipo | Descripción |
|-----------|------|-------------|
| `success` | `Boolean` | Indica si la solicitud fue exitosa |
| `message` | `String` | Proporciona información adicional sobre la respuesta |
| `data` | `Array` | Array de objetos por cada movimiento de cuenta |
| `data` → `transactionid` | `String` | ID de transacción asociado con este movimiento financiero |
| `data` → `movementid` | `Integer` | Identificador del movimiento financiero |
| `data` → `created` | `String` | Fecha y hora en que se creó el movimiento financiero |
| `data` → `type` | `String` | Tipo de transacción (Ejemplo: `Refund`, `Purchase`, `Payout"` , `Fee`, `FX`, `Withdrawal`, `Debit adjustment`, `Credit adjustment`.) |
| `data` → `country` | `String` | Código del país donde ocurrió la transacción `formato ISO 3166-1 alpha-2` |
| `data` → `currency` | `String` | Código de moneda utilizado en la transacción |
| `data` → `sign` | `String` | Indica si el monto es un crédito o un débito |
| `data` → `amount` | `Integer` | Valor de la transacción |
| `data` → `availabledate` | `String` | Fecha en que los fondos estarán disponibles |
| `data` → `referenceid` | `String` | ID de referencia |
| `data` → `endusernotes` | `String` | Notas asociadas con la transacción |
| `data` → `exchangerate` | `Number` | Tasa de cambio utilizada (si aplica) |
| `data` → `status` | `String` | Estado actual de la transacción |
| `data` → `merchant_account_id` | `Integer` | ID de la cuenta |
| `data` → `merchant_account_name` | `String` | Nombre de la cuenta |
| `data` → `merchant_id` | `Integer` | ID del comercio |
| `data` → `merchant_name` | `String` | Nombre del comercio |
| `data` → `payment_method` | `String` | Medio de pago utilizado |
| `data` → `payment_media_brand` | `String` | Marca del método de pago (si aplica) |
| `data` → `last_status_date` | `String` | Fecha de la última actualización de estado |
| `total` | `Integer` | Número total de registros que coinciden con la consulta |
| `page` | `Integer` | Número de página actual |
| `pageSize` | `Integer` | Número de registros por página |
| `errors` | `Array` | Array de mensajes de error si ocurrieron durante el procesamiento de la solicitud |

### Response example
```json
{
  "success": true,
  "message": null,
  "data": [
    {
      "transactionid": "17041776",
      "movementid": 13211952,
      "created": "2024-08-12T13:44:18.397",
      "type": "Refund",
      "country": "PE",
      "currency": "USD",
      "sign": "Debit",
      "amount": -1,
      "availabledate": "2024-09-01T19:44:16.093",
      "referenceid": "REF123456",
      "endusernotes": "Customer requested refund",
      "exchangerate": 3.73,
      "status": "Confirmed",
      "merchant_account_id": 2081,
      "merchant_account_name": "ACME Online Store",
      "merchant_id": 35,
      "merchant_name": "Global Retail Group",
      "payment_method": "BankTransfer",
      "payment_media_brand": null,
      "last_status_date": "2024-08-12T14:00:00.000"
    }
  ],
  "total": 1,
  "page": 1,
  "pageSize": 10,
  "errors": null
}
```