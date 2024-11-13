---
title: "Tarjetas crédito y débito"
linkTitle: "Tarjetas crédito y débito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito o débito.
weight: 10
tags: ["subtopic"]
---

## Consideraciones {#considerations}
* **Para VISA Débito**: No es necesario estar en el programa _Verified by Visa_.<br>Al operar fuera de una wallet, debe solicitar la _Fecha de vencimiento_ y el _CVV_. Sirve como pago único por ser una tarjeta de débito. Permite cancelaciones totales y reembolsos (Totales y Parciales). No se permite operaciones en Dos Pasos (Preautorización).
* **Compras sin CVV**: Permite tokenización y recurrencia.<br>En el caso de la tokenización, la API genera un cargo por un mínimo de **ARS 3**, que se reembolsa para validar los datos del titular de la tarjeta. Con este token, es posible realizar compras sin CVV.

## Parámetros del Request {#request-parameters}

### Básicos {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los parámetros de la compra básica y los idiomas de la respuesta.

### Obligatorios y condicionales {#request-parameters}
| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/argentina.html#document-types) para ver los posibles valores. |
| `Customer` → `Address` → `State` | `string` | No<sup>*</sup> | Estado del cliente.<br><sup>*</sup>_Este parámetro es requerido para calcular el impuesto de **II.BB**. Consulte [provincias](/es/docs/payment-methods/argentina.html#argentina-provinces) para saber sus posibles valores_. |

{{% alert title="Info" color="info"%}}
Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).
{{% /alert %}}


### Ejemplo del Request {#request-example}

{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Argentina/requestPurchase>}}
{{< /highlight >}}
<!--{{< highlight json >}}
{{< Payins/V3/CreatePurchase/requestPurchase currency="ARG" isoCountry3="AR" docType="\"DocumentType\": \"DNI.AR\"" docNumber="24022330" isoCountry2="AR" city="BsAs">}}
{{< /highlight >}}*/-->

## Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

### Ejemplo del Response {#response-example}

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved currency="ARG">}}
{{< /highlight >}}

## Tarjetas de prueba {#testing-cards}
Utilice las siguientes tarjetas para simular los diferentes estados de la compra.

### Para compras aprobadas {#for-approved-purchases}

| Marca | PAN | CVV | Fecha de Expiración | Detalles |
|---|---|---|---|---|
| Mastercard | `5299910010000015` | `123` | `08/30` | Sin límite de monto. |
| Visa (crédito o débito) | `4507990000004905` | `123` | `08/30` | Sin límite de monto. |
| Amex | `373953192351004` | `1234` | `08/30` | Montos: $1 o $10 |

### Para compras rechazadas {#for-rejected-purchases}

| PAN | CVV | Fecha de Expiración | Tipo de documento | Documento |
|---|---|---|---|---|
| `4304968001555104` | `617` | `12/18` | `4` - DNI | `38499826` |