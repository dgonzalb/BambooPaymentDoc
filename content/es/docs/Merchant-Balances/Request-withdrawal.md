---
title: "Solicitar un Retiro"
linkTitle: "Solicitar un Retiro"
date: 2024-10-04T08:40:29-03:00
Description: >
  Esta API pública permite a los merchants solicitar un retiro de los fondos disponibles en las cuentas de Bamboo.
weight: 10
---

## URL del Request
Para solicitar un retiro de la cuenta Bamboo, debe realizar una solicitud **GET** a las siguientes URLs según el ambiente:

* **Producción**: `https://api.bamboopayment.com/v1/api/merchant/withdrawal`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/merchant/withdrawal`

## Authorization
En el encabezado de la solicitud, el parámetro `Authorization` debe configurarse concatenando la palabra `Basic`, un espacio y la **Private Key** del merchant.

## Parámetros de solicitud
| Campo | Tipo | Obligatorio | Descripción |
|-------|------|-------------|-------------|
| `ReferenceId` | string | Sí | Un identificador único para esta solicitud de retiro |
| `CurrencyIsoCode` | string | Sí | El código ISO de la moneda para el retiro (por ejemplo, "USD") |
| `Requester` | string | No | Identificador de la persona o sistema que solicita el retiro |
| `TextNotes` | string | No | Notas o comentarios adicionales sobre el retiro |

### Ejemplo de solicitud
```json
{
  "ReferenceId": "withdrawal-001",
  "CurrencyIsoCode": "USD",
  "Requester": "merchant-001",
  "TextNotes": "Retiro para gastos operativos"
}
```

## Respuesta

`Ok`: Código HTTP `200`.<br>
Mensaje recibido correctamente, en este punto la solicitud de retiro comienza a ser procesada.

`BadRequest`: Código HTTP `400`.<br>
La validación del mensaje falló y la solicitud de retiro no se crea.