---
title: "Pagos en Efectivo"
linkTitle: "Pagos en Efectivo"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos en efectivo usando _Pago Express_.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Nota" color="info"%}}
Solo ofrecemos soporte para comercios en Paraguay a través del modelo **Gateway**, y les enviamos la factura desde Uruguay.
{{% /alert %}}

## Pago Express
_Pago Express_ es un popular método de pago para pagar facturas y servicios en _**Paraguay**_, ofreciendo comodidad y accesibilidad en todo el país. El cliente necesita proporcionar el código de pago en una sucursal física de _Pago Express_ y completar el pago. Luego, _Pago Express_ nos notifica, y nosotros informamos al comercio.

## Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Consulta el identificador en la tabla de [Medios de pago](/es/docs/payment-methods/paraguay.html#payment-methods).|
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/paraguay.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure la validez de la deuda generada utilizando este campo, especificando la duración en minutos. La API aplica un valor por defecto si no proporciona esta información. |

#### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Paraguay/request_pagoexpress >}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters}
En la respuesta, se encuentra el parámetro `MetadataOut.PaymentCode` con el número de referencia de la deuda generada que el cliente debe presentar en una agencia de _Pago Express_ para pagar la deuda. Además, el parámetro `MetadataOut.PaymentExpirationDate` muestra la fecha de expiración en formato ISO 8601 (_AAAA-MM-DDTHH:MM:SS_).

#### Ejemplo del Response {#response-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Paraguay/response_pagoexpress >}}
{{< /highlight >}}