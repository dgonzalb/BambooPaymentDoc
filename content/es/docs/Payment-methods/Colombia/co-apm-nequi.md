---
title: "Nequi"
linkTitle: "Nequi"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con Nequi.
weight: 40
tags: ["subtopic"]
---

## Nequi QR
Le permite a tus clientes pagar escaneando un código QR utilizando su aplicación de Nequi. La API de Bamboo genera el código QR en la respuesta del request.

> _El estado de la compra para Medios de Pago Alternativos permanecerá en **Pending** hasta que el cliente complete el pago._

#### Flujo de Pago {#qr-code}
<img src="/assets/NequiQRES.png" width="100%" alt="Nequi QR Payment Flow"/>


### Parámetros del Request {#request-parameters-2}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Encuentre el valor en la tabla de [Medios de pago](/es/docs/payment-methods/colombia.html#payment-methods). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No <sup>*</sup>| Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | No <sup>*</sup>| Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Departamento del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |

{{% alert title="Important Notes" color="info"%}}
<sup>*</sup> Si se desea operar con reembolsos, los parámetros `DocumentType` y `DocumentNumber` son requeridos. Si no se envían en la solicitud de compra, se deben enviar en la solictud de reembolso.
* El tiempo de expiración es controlado por Nequi, con un valor fijo de 45 minutos por defecto.
{{% /alert %}}


#### Ejemplo del Request {#request-example-2}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_nequiQr>}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters-2}
El siguiente ejemplo muestra la respuesta al request.
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_nequiQr>}}
{{< /highlight >}}

<br>

En el campo `MetadataOut` dentro del objeto `Response`, el código QR se devuelve como una imagen _base64_ (Parámetro `Base64Qr`); añada esta imagen dentro de una etiqueta HTML de imagen. Por ejemplo:
{{< highlight html >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_nequiQr_qr>}}
{{< /highlight >}}

<br>

Resultado:

<img src="/assets/QRNequi.png" width="40%" alt="PrintScreen"/>


## Nequi Push
Al utilizar este método de pago, su cliente recibirá una notificación para que abra su aplicación _Nequi_ y acepte o rechace el pago.

> _El estado de la compra para Medios de Pago Alternativos permanecerá en **Pending** hasta que el cliente complete el pago._

#### Payment Flow {#push-notification}
<img src="/assets/NequiPushES.png" width="100%" alt="Nequi Flujo de Pago"/>


### Parámetros del Request {#request-parameters-3}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Encuentre el valor en la tabla de [Medios de pago](/es/docs/payment-methods/colombia.html#payment-methods). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. El número debe tener 10 dígitos y no debe tener prefijos. Ejemplo: _3188255555_. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Departamento del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |

{{% alert title="Important Notes" color="info"%}}
<sup>*</sup> Si se desea operar con reembolsos, los parámetros `DocumentType` y `DocumentNumber` son requeridos. Si no se envían en la solicitud de compra, se deben enviar en la solictud de reembolso.
* El tiempo de expiración es controlado por Nequi, con un valor fijo de 45 minutos por defecto.
{{% /alert %}}


#### Ejemplo del Request {#request-example-3}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_nequiPush>}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters-3}
_Nequi_ genera la orden de pago y envía una notificación push al pagador; luego, el pagador necesita ingresar a la aplicación de Nequi para aceptar o rechazar el pago.

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-2}

{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_nequiPush>}}
{{< /highlight >}}