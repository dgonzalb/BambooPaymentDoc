---
title: "API de Transacciones"
linkTitle: "API de Transacciones"
date: 2023-03-02T11:40:29-05:00
Description: >
  La API de Reporte de Transacciones de Bamboo da información detallada de datos transaccionales. Permite acceder a información de transacciones para un periodo de tiempo específico, seleccionar columnas de datos para informes personalizados y obtener detalles de las transacciones, incluyendo información del comprador, métodos de pago y estados de las transacciones.
weight: 10
---

## URL para el Request
Para acceder a la API de Reportes de Transacciones, debe realizar una solicitud **GET** a las siguientes URLs según el ambiente:

* **Producción**: `https://api.bamboopayment.com/v1/transaction/get-payin-transaction`
* **Stage**: `https://api.stage.bamboopayment.com/v1/transaction/get-payin-transaction`

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

### Response example
```json
{
  "Response": {
    "Data": [
      {
        "TransactionId": 15660802,
        "Type": "Purchase",
        "Created": "2024-08-01T21:34:34.1308881",
        "Status": "Approved",
        "Amount": 4279,
        "Currency": "BRL",
        "Country": "BR",
        "Transaction_source": "DirectPurchase",
        "Tenant": "Bamboo.BR",
        "Merchant_account": "Loja Virtual BR",
        "Payment_method_type": "PrePaid",
        "Payment_method": "VISA",
        "Card_bin": "426717",
        "Card_last4": "5636",
        "Order": "f4bb4b41-2476-41ce-ac7a-ad3e6e50d77e",
        "Unique_id": "f922b26e-76af-476d-aada-502a46e3c365",
        "Authorization_code": "202597",
        "Installments": 1,
        "Issuer": "VISA",
        "Customer_name": "Maria Silva",
        "Customer_document_type": "24",
        "Customer_document_number": "12345678900",
        "Customer_email": "maria.silva@mail.com"
      },
      {
        "TransactionId": 15919451,
        "Type": "Refund",
        "Created": "2024-08-04T14:22:43.4766824",
        "Status": "Rejected",
        "Error_code": "TR019",
        "Amount": 8560,
        "Currency": "BRL",
        "Country": "BR",
        "Transaction_source": "DirectPurchase",
        "Tenant": "Bamboo.BR",
        "Merchant_account": "Loja Online BR",
        "Payment_method_type": "PrePaid",
        "Payment_method": "MasterCard",
        "Card_bin": "569130",
        "Card_last4": "8461",
        "Order": "9cdc4d58-3aa9-4f2c-b204-8c2c96ab6bd7",
        "Unique_id": "b5caf213-d76e-4d15-b691-6b0fccb16e86",
        "Authorization_code": "526661",
        "Installments": 1,
        "Issuer": "MasterCard",
        "Customer_name": "João Santos",
        "Customer_document_type": "24",
        "Customer_document_number": "98765432100",
        "Customer_email": "joao.santos@mail.com"
      }
    ],
    "Page": 2,
    "PageSize": 2,
    "Total": 4
  },
  "Errors": []
}
```