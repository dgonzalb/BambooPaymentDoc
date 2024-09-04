---
title: "API de Saldos"
date: 2024-08-02T07:28:16-05:00
type: docs
Description: >
  La API para saldos permite a los comercios comprobar los saldos de su cuenta sin utilizar la consola de Bamboo
weight: 40
notopicssection: true
---

Este endpoint permite consultar el saldo disponible para procesar payouts. Proporciona información detallada sobre el estado financiero de la cuenta, incluyendo el saldo disponible, el saldo total y monto de payouts en procesamiento.

## URL del Request
Debe realizar una petición **GET** a las siguientes URLs según el ambiente.

* **Producción**: `https://api.bamboopayment.com/v1/api/merchant/account/balance`
* **Pruebas**: `https://api.stage.bamboopayment.com/v1/api/merchant/account/balance`

## Autorización
En el header, debe configurar el parámetro `Authorization` concatenando la palabra `Basic`, un espacio y la _**Llave Privada**_ del comercio.

## Ejemplo del Response

{{% alert title="Información" color="info"%}}
No es necesario configurar una solicitud para invocar esta API.
{{% /alert %}}

```json
{
    "Response": {
        "Date": "2023-06-02T20:59:59-03:00",
        "CurrencyCode": "USD",
        "FinalAccountingBalance": 13670.0000,
        "FinalAvailableBalance": 13170.0000,
        "FinalFeeBalance": 0.0,
        "FinalProcessingBalance": 500.0
    },
    "Errors": null
}
```
<br>
Donde:

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `Response` | `object` | Contiene la información del saldo. |
| `Response` → `Date` | `string` | Fecha y hora en que se obtuvo la información del saldo. |
| `Response` → `CurrencyCode` | `string` | Código de la moneda. |
| `Response` → `FinalAccountingBalance` | `number` | Saldo total de la cuenta. |
| `Response` → `FinalAvailableBalance` | `number` | Saldo disponible para procesar payouts. |
| `Response` → `FinalFeeBalance` | `number` | Saldo disponible para los fees y tarifas (en caso donde el comercio las asume de forma independiente al saldo total de la cuenta). Si las tarifas se deducen automáticamente del saldo principal, este valor es cero. |
| `Response` → `FinalProcessingBalance` | `number` | Saldo final de payouts en procesamiento. |
| `Errors` | `object` | Contiene información en caso de errores. Será `null` si la solicitud fue exitosa. |