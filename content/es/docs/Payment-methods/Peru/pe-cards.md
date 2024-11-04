---
title: "Tarjetas crédito y débito"
linkTitle: "Tarjetas crédito y débito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito o débito.
weight: 10
tags: ["subtopic"]
---

## Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | Token que identifica la tarjeta del cliente.<br>Para más información sobre cómo crear el token, consulte [Clientes](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/peru.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Departamento del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |

{{% alert title="Info" color="info"%}}
Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Peru/requestPurchase>}}
{{< /highlight >}}

## Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

### Ejemplo del Response {#response-example}

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved currency="USD">}}
{{< /highlight >}}


## Tarjetas de prueba {#testing-cards}
Utilice las siguientes tarjetas para simular los diferentes estados de la compra.

| Marca | PAN | CVV | Fecha de Expiración |
|---|---|---|---|
| Visa | `4474118355632240` | `111` | `03/28` |
| Visa | `4000000000000004` | `111` | `03/28` |
| Mastercard | `5474118355630001` | `111` | `03/28` |
<!--| Amex | `347000000000001` | `1111` | `03/28` |
| Amex | `347411835563001` | `1111` | `03/28` |-->