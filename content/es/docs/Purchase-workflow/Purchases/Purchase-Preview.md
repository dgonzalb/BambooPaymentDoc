---
title: "Preview de la compra"
linkTitle: "Preview de la compra"
date: 2023-03-02T11:40:29-05:00
Description: >
  Esta funcionalidad le permite a los comercios mostrar los valores que pueden afectar el monto final de una transacción de compra.
weight: 50
tags: ["subtopic"]
---

Cuando un comercio realiza una compra, los montos de ésta pueden ser modificados por varios motivos:

* Conversión de moneda (USD a Moneda local del país destino)
* tasas que debe pagar el cliente
* Impuestos
* etc.

Por ejemplo, en Argentina existen distintos impuestos que afectan el monto final y, como consecuencia, el comercio no puede mostrarle al cliente el monto real que le estará cobrando hasta no finalizar la compra.

Como solución, creamos un que le permite al comercio realizar una vista previa del monto que se le cobrará al cliente para que pueda informar previo a la ejecución de la compra.

En el siguiente ejemplo, se muestra la forma en que se sugiere que los comercios muestran el preview en Argentina.

![PrintScreen](/assets/PurchasePreview_es_1.png)

## Request
Para hacer uso del preview de la compra, se debe apuntar al siguiente endpoint:

`GET https://api.stage.bamboopayment.com/v1/api/purchase/preview`

En el encabezado, se debe configurar el parámetro `Authorization` concatenando la palabra `Basic`, un espacio y la ***Private Key*** del comercio.

### Ejemplo del Response {#response-example}

{{< highlight json >}}
{{< Payins/V3/CardOperations/purchasePreview_request >}}
{{< /highlight >}} 

<br>
Donde:

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|---|---|---|---|
| `baseAmount` | `integer` | Sí | Monto a pagar antes de impuestos. |
| `currency` | `string` | Sí | Moneda del monto definido en `baseAmount`. |
| `countryIso` | `string` | Sí | País en formato ISO 3166-2. |
| `paymentMediaId` | `string` | No | Identificador del medio de pago. Este identificador lo puede obtener consultando la sección [Medios de Pago](/es/docs/payment-methods.html) por país en la documentación. |
| `customer` | `object` | No<sup>*</sup> | Información del pagado.<br><sup>*</sup>_Requerido para Argentina_. |
| `customer.documentTypeId` | `string` | No | Tipo de documento del pagador. |
| `customer.docNumber` | `string` | No | Número de documento del pagador. |
| `customer.state` | `string` | No<sup>*</sup> | Estado o Provincia del pagador.<br><sup>*</sup>_Para Argentina, este campo es obligatorio y debe incluir su valor correspondiente utilizando la tabla mostrada en [esta sección](/es/docs/payment-methods/argentina.html#argentina-provinces)_. |
| `customer.postalCode` | `string` | No | Código Postal del pagador. |

## Response
A continuación, mostramos un ejemplo de la respuesta a la petición mostrada previamente

### Ejemplo del Response {#response-example}
{{< highlight json >}}
{{< Payins/V3/CardOperations/purchasePreview_response >}}
{{< /highlight >}} 

<br>

Los parámetros en el response son los siguientes:

| Parámetro | Tipo | Descripción |
|---|:---:|---|
| `Success` | `boolean` | Determina si el resultado de la operación fue exitoso. |
| `Data.Date` | `date` | Fecha en la que se ejecutó el proceso. |
| `Data.Currency` | `string` | Código ISO de la moneda del merchant. Es decir, la moneda destino en la conversión. |
| `Data.ExchangeRate.value` | `number` | Monto de al que equivale la moneda origen en la moneda destino. |
| `Data.ExchangeRate.FromCurrencyIsoCode` | `string` | Código ISO de la moneda origen. |
| `Data.ExchangeRate.ToCurrencyIsoCode` | `string` | Código ISO de la moneda destino. |
| `Data.ExchangeRate.TypeCode` | `string` |  |
| `Data.ExchangeRate.Date` | `date` | Fecha de la última actualización de la tasa de conversión. |
| `Data.TotalAmount` | `number` | Monto total final de la compra en moneda local luego de aplicar los valores que la afecten (Impuestos, conversiones, etc.). |
| `Data.TaxDetails` | `object` | Contiene el detalle de los impuestos que aplican a la transacción. |
| `Data.AmountDetails` | `object` | Contiene el detalle de los subtotales de la transacción. |

### Objeto _TaxDetails_ {#object-_taxdetails_}
A continuación, explicamos los subparámetros del objeto `TaxDetails`.

| Parámetro | Tipo | Descripción |
|---|:---:|---|
| `TaxCode` | `string` | Código del impuesto definido por Bamboo Payment. |
| `TaxName` | `string` | Nombre del impuesto que se aplica. |
| `TaxAmount` | `number` |  Valor total del impuesto. |
| `TaxPercentage` | `number` | Porcentaje que corresponde al impuesto. |
| `ResponsibleType` | `string` | Indica si el responsable del impuesto es el comercio (Merchant) o el pagador (Buyer). |

{{% alert title="Nota" color="info"%}}
En el ejemplo del request, se especifican dos impuestos para Argentina: **VAT** correspondiente al IVA de Servicios DIgital e **II.BB** correspondiente al impuesto de Ingresos Brutos.
{{% /alert %}}

### Objeto _AmountDetails_ {#object-_amountdetails_}
A continuación, explicamos los subparámetros del objeto `AmountDetails`.

| Parámetro | Tipo | Descripción |
|---|:---:|---|
| `CurrencyCode` | `string` | Código ISO de la moneda del monto. |
| `AmountCategoryCode` | `string` | Categoría del monto. |
| `Amount` | `number` |  Valor del monto. |
| `Sign` | `string` | Indica si el monto es un movimiento débito o crédito. |
| `ResponsibleType` | `string` | Indica si el responsable del impuesto es el comercio (Merchant) o el pagador (Buyer). |