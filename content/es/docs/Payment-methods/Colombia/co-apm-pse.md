---
title: "PSE"
linkTitle: "PSE"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con PSE en Colombia.
weight: 20
tags: ["subtopic"]
---

## Transferencia Bancaria - PSE
PSE (Pagos Seguros en Línea) es un sistema de pago en línea muy utilizado en Colombia. Permite realizar transacciones electrónicas seguras al permitir a los usuarios efectuar pagos directamente desde sus cuentas bancarias.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethodId` | `string` | Sí | Encuentre el valor en la tabla de [Medios de pago](/es/docs/payment-methods/colombia.html#payment-methods). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | Sí | País del cliente. |
| `Customer` → `Address` → `State` | `string` | Sí | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | Sí | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | Sí | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `Redirection` → `Url_Approved` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | URL del Webhook de notificación. Se notifica a esta URL el estado de la compra una vez que el procesador del medio de pago notifica a Bamboo. La notificación a esta URL es un POST REST con payload en JSON y no una redirección. Puede ser también estática y configurada por el equipo de soporte. |

> _El estado de la compra para Medios de Pago Alternativos permanecerá en **Pending** hasta que el cliente complete el pago_

#### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_pse >}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `Action` con `Reason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `URL` con la URL del servicio externo. Debe redirigir al cliente a esta URL para finalizar el pago siguiendo el flujo PSE. En este flujo, su pagador selecciona su banco, elige si es una persona física o jurídica y su tipo de documento.

![PrintScreen](/assets/PSE.png)

Según el resultado de la transacción, el pagador será dirigido a la URL definida en el objeto `Redirection`. Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_pse >}}
{{< /highlight >}}