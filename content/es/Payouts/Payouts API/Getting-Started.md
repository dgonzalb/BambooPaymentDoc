---
title: "Autenticación y Lista de Bancos"
linkTitle: "Autenticación y Lista de Bancos"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  El API de Payouts permite solicitar múltiples pagos utilizando el saldo disponible en su cuenta.
weight: 10
---

Para saber más sobre Payouts, consulte este [artículo](../overview.html).

## Configurar la autenticación {#configuring-the-authentication}
Todos los métodos utilizados en la API de Compras requieren los siguientes encabezados de autenticación.

| Llave | Valor | Comentarios |
|---|---|---|
| `Content-Type` | `application/json` | Con este encabezado, el request se transmite en formato _JSON_. |
| `Authorization` | `Basic {{Merchant Private Key}}` | Envíe el `{{Merchant Private Key}}` (su identificador de comercio) y la palabra `Basic`.<br>Ejemplo: `Basic RVkeLr-86_iTzSMLvDtuyQ-1zqIcsmFG-oSzncn_uFv-nj7bhB3rtZg__` |
| `DigitalSignature` | `{{DigitalSignature}}` | Firma para validar la transacción utilizando el algoritmo _HmacSHA256_. Este encabezado es obligatorio únicamente para la creación del Payout. |

### Firmar el mensaje {#signing-the-message}
Construya el hash utilizando los parámetros `country`, `amount`, `currency`, `reference` y `type` del Request. Bamboo le envía `secret-key` y `MerchantPrivateKey` cuando firma el contrato de onboarding.

#### Código de ejemplo de firma {#signature-sample-code}
```javascript
var json = JSON.parse(request.data);
let signdata = {Country:json.country, Amount: json.amount,Currency:json.currency, Reference:json.reference, Type: json.type};
var data = JSON.stringify(signdata);
var hexHash = CryptoJS.HmacSHA256(data, secret-key);
var hash = hexHash.toString(CryptoJS.enc.Hex);
```

## Métodos de la API {#api-methods}
La API de Payouts ofrece cuatro métodos que puede utilizar cuando solicite Payouts.

* [Obtener listado de bancos](#get-bank-list)
* [Preview del Payout](#payout-preview)
* [Solicitud del Payout](#payout-request)
* [Obtener un Payout](#obtaining-a-payout)

### Obtener listado de bancos {#get-bank-list}
Este método le permite obtener el listado de bancos disponibles en un país.

#### URL del Request {#request-url}
Debe invocar un request **GET** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://payout-api.bamboopayment.com/api/bank/country/{{Country}}`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/bank/country/{{Country}}`

Donde `{{Country}}` representa el código ISO del país que desea consultar, utilizando el formato ISO 3166-2. [Listado de países disponibles de Payouts](../overview.html#coverage).

#### Parámetros del Response {#response-parameters}

| Parámetro | Formato | Tamaño | Descripción |
|---|:-:|:-:|---|
| `id` | `integer` | - | Identificación interna del banco. |
| `countryIsoCode` | `string` | 2 | País al que pertenece el banco. |
| `bankCode` | `string` | 4 | Código interno del banco utilizado en el parámetro `payee.bankaccount.codebank` cuando solicite el Payout. |
| `bankName` | `string` | - | Nombre del banco. |

#### Ejemplo del Response {#response-example}
```json
[
  {
    "id": 1,
    "countryIsoCode": "CO",
    "bankCode": "1002",
    "bankName": "BANCO POPULAR"
  },
  {
    "id": 3,
    "countryIsoCode": "CO",
    "bankCode": "1007",
    "bankName": "BANCOLOMBIA"
  },
  {
    "id": 4,
    "countryIsoCode": "CO",
    "bankCode": "1009",
    "bankName": "CITIBANK"
  },
  {
    ...
  }
]
```