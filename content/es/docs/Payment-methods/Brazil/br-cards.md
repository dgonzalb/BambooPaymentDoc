---
title: "Tarjetas crédito"
linkTitle: "Tarjetas crédito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito.
weight: 10
tags: ["subtopic"]
---

## Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | Token que identifica la tarjeta del cliente.<br>Para más información sobre cómo crear el token, consulte [Clientes](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Description` | `string` | Sí | Como requisito del adquirente, envíe la descripción de la compra utilizando el siguiente formato. `NombreComerio+IdOrden+ [merchantUrl]`.<br>Ejemplo: `TestCommerce #order2572023, [testcommerce.com.br]`. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/brazil.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | Sí | Estado del cliente.<br>Consulte [estados de residencia](/es/docs/payment-methods/brazil.html#customers-state-of-residence) to know its posibles valores. |
| `Customer` → `Address` → `City` | `string` | Sí | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | Sí | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | Sí | Código postal del cliente. No utilice guiones. |

{{% alert title="Info" color="info"%}}

Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Brasil/requestPurchase>}}
{{< /highlight >}}

## Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

### Ejemplo del Response {#response-example}

{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved currency="BRL">}}
{{< /highlight >}}


## Tarjetas de prueba {#testing-cards}
Utilice las siguientes tarjetas para simular los diferentes estados de la compra.

| Marca | PAN | CVV | Fecha de Expiración |
|---|---|---|---|
| Mastercard | `5555666677778884` |  `123` | `12/29` |
| Visa | `4984123412341234` |  `123` | `12/29` |
<!--| Diners | `30111122223331` |  `123` | `12/29` |
| Amex | `376411112222331` |  `1234` | `12/29` |
| Hipercard | `6062111122223339` |  `123` | `12/29` |
| Elo | `6362970000457013` |  `123` | `12/29` |-->

{{% alert title="Info" color="info"%}}

Para asegurar pruebas exitosas, por favor use los siguientes datos específicos: docNumber: “13394559358” y docType: “24” (CPF). No utilizar estos datos puede resultar en transacciones fallidas.
{{% /alert %}}