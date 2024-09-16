---
title: "Preview de Payout"
linkTitle: "Preview del Payout"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  El API de Payouts permite solicitar múltiples pagos utilizando el saldo disponible en su cuenta.
weight: 30
---

### Preview del Payout {#payout-preview}
El método de Preview del Payout le permite mostrar el valor final recibido por el beneficiario y la fecha prevista en la que recibirá el dinero.

![PrintScreen](/assets/Payouts/Payouts12_es.png)

{{% alert title="Advertencia" color="warning"%}}
El Preview del Payout es meramente informativo y no congela el tipo de cambio, el cual se congela al [solicitar el Payout](using-payouts-api.html).
{{% /alert %}}

#### URL del Request {#request-url-3}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://payout-api.bamboopayment.com/api/payout/preview`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/payout/preview`

#### Parámetros del Request {#request-parameters-1}
La siguiente tabla muestra los parámetros obligatorios y opcionales para el Preview del Payout.

| Campo | Tipo | ¿Obligatorio? | Descripción |
|---|---|:-:|---|---|
| `amount` | `number` | Sí | Monto del Payout, el formato tiene dos dígitos decimales.<br>Ejemplo _100_ => _$ 1,00_. |
| `destinationCountryIsoCode` | `string(2)` | Sí | Código ISO del país en formato `ISO 3166-2`.<br>[Listado de países disponibles de Payouts](../overview.html#coverage). |
| `destinationCurrencyIsoCode` | `string(3)` | Sí <sup>*</sup> | Código ISO de la moneda de destino.<br>[Consulte aquí la lista de monedas](../payouts-api/variables.html#currencies) |
| `originalCurrencyIsoCode` | `string(3)` | Sí | Código ISO de la moneda de origen.<br>[Consulte aquí la lista de monedas](../payouts-api/variables.html#currencies) |

<sup>*</sup> _Si no se proporciona el parámetro, el sistema utilizará por defecto la moneda del país de destino (parámetro `destinationCountryIsoCode`)_

#### Ejemplo del Request {#request-example-1}

{{< highlight json >}}
{{< Payouts/Api/PayoutsPreview/request >}}
{{< /highlight >}}

#### Parámetros del Response {#response-parameters-2}

| Parámetro | Formato | Descripción |
|---|:-:|---|
| `amountInOrignalCurrency` | `number` | Valor solicitado en el Preview del Payout. |
| `fee` | `number` | Monto cobrado por Bamboo para porcesar el Payout. Usted o el beneficiario pueden asumir la tasa de acuerdo con su contrato. |
| `amountToBeSentInOrignalCurrency` | `number` | Monto a ser enviado al Beneficiario, el cual se calcula como la diferencia entre `amountInOrignalCurrency` y `fee`. |
| `exchangeRate` | `number` | Valor de conversión entre la moneda origen y destino. Este valor incluye hasta `5` dígitos decimales. |
| `amountToBeSentInLocalCurrency` | `number` | Monto que va a recbir el Beneficiario, el cual se calcula multiplicando `amountToBeSentInOriginalCurrency` por `exchangeRate`. |
| `errors` | `object` | Errores que pueden aparecer. Los códigos de error para este método empiezan por `6`.<br>Encuentre los posibles errores [aquí]({{< ref "Payout-Error-Codes.md">}}). |
| `errors` → `ErrorCode` | `string` | Código interno del error. Encuentra los posibles errores [aquí]({{< ref "Payout-Error-Codes.md">}}). |
| `errors` → `PropertyName` | `string` | Propiedad que provocó el error. |
| `errors` → `Message` | `string` | Descripción del error. |
| `validUntil` | `datetime` | Indica la hora hasta que va estar fijo el tipo de cambio, luego de la hora indicada el tipo de cambio puede modificarse.<br> El horario que muestra es UTC-0.  |
| `expectedPaymentDate` | `datetime` | Indica la fecha estimada de pago. |

#### Ejemplo del Response {#response-example-2}

{{< highlight json >}}
{{< Payouts/Api/PayoutsPreview/response >}}
{{< /highlight >}}