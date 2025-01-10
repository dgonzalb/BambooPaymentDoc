---
title: "Tarjetas crédito y débito"
linkTitle: "Tarjetas crédito y débito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito o débito.
weight: 10
tags: ["subtopic"]
---

{{% alert title="Nota" color="info"%}}
Solo ofrecemos soporte para comercios en Paraguay a través del modelo **Gateway**, y les enviamos la factura desde Uruguay.
{{% /alert %}}

## Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | Token que identifica la tarjeta del cliente.<br>Para más información sobre cómo crear el token, consulte [Clientes](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/paraguay.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No<sup>*</sup> | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |

{{% alert title="Info" color="info"%}}

Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Paraguay/requestPurchase>}}
{{< /highlight >}}


## Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

### Ejemplo del Response {#response-example}

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved currency="PYG">}}
{{< /highlight >}}

## Información sobre el índice de riesgo (tarjetas de crédito locales) {#risk-index-information-local-credit-cards}
La entidad adquirente procesa las transacciones y establece un _**índice de riesgo**_ asociado a las transacciones con **tarjetas de crédito locales**. Esta información debe ser procesada por el comercio para asegurarse de que la transacción es legítima y poder procesar el pedido o cancelarlo en caso necesario.

La entidad adquirente informa del índice de riesgo como un código de error en la respuesta (dentro del objeto Transaction); aunque el estado sea `Approved`, debe validar el campo `ErrorCode`, que puede tener uno de los siguientes valores:

* **RSK01**: La entidad adquirente marcó la operación con un riesgo bajo de fraude. Puede procesarla normalmente.
* **RSK02**: La entidad adquirente ha marcado la operación con un riesgo de fraude medio. Usted decide las acciones a tomar en este caso.
* **RSK03**: La entidad adquirente ha marcado la transacción con un riesgo de fraude alto. Sugerimos verificar los datos, incluido el contacto directo con el cliente final.

El comercio es responsable de procesar y gestionar las respuestas de riesgo, y nosotros solo informaremos el índice establecido por la entidad adquirente.