---
title: "API de saldos"
date: 2023-05-08T07:28:16-05:00
Description: >
  La API para saldos permite a los comercios comprobar los saldos de su cuenta sin utilizar la consola de Bamboo
weight: 60
notopicssection: true
---

## URL del Request {#request-url}
Debe invocar un request **GET** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/merchant/account/balance`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/merchant/account/balance`

## Autorización {#authorization}
En el header se debe configurar el parámetro `Authorization` concatenando la palabra `Basic`, un espacio y la _**Llave Privada**_ del comercio.

## Ejemplo del Response {#response-example}

{{% alert title="Info" color="info"%}}
No es necesario configurar un request para invocar la API.
{{% /alert %}}


```json
{
    "Response": {
        "Date": "2023-06-02T20:59:59-03:00",
        "CurrencyCode": "UYU",
        "FinalAccountingBalance": 13670.0000,
        "FinalAvailableBalance": 13670.0000,
        "FinalFeeBalance": 0.0,
        "FinalProcessingBalance": 0.0
    },
    "Errors": null
}
```
<br>
Donde:

| Parámetro | Descripción |
|---|---|
| `Response` → `Date` | Fecha y hora en que se envió la solicitud. |
| `Response` → `CurrencyCode` | Código ISO de la moneda configurada para el comercio. |
| `Response` → `FinalAccountingBalance` | Saldo total. |
| `Response` → `FinalAvailableBalance` | Saldo total disponible para retirar. |
| `Response` → `FinalFeeBalance` | Saldo disponible para fees. |
| `Response` → `FinalProcessingBalance` | Saldo en procesamiento. Este saldo estará disponible cuando el procesamiento finalice con éxito; en caso contrario, se cancelará. |
| `Errors` | Errores que pueden aparecer durante la ejecución del método API. |