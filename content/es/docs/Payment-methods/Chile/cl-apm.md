---
title: "Transferencias bancarias"
linkTitle: "Transferencias bancarias"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con transferencias bancarias.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
* El estado de la compra para transferencias bancarias permanecerá en _Pending_ hasta que el cliente complete el pago ya sea en la app de _Khipu_.
* Chile no soporta montos decimales, por lo que todos los valores de monto recibidos serán redondeados.
{{% /alert %}}

## Khipu
**Khipu** permite a los clientes pagar utilizando transferencias desde sus cuentas bancarias utilizando la app de _Khipu_. El pagador puede pagar usando cuentas bancarias o la app de **Khipu** donde la experiencia de pago es mejor.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Consulta el identificador en la tabla de [Medios de pago](/es/docs/payment-methods/chile.html#payment-methods).|
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/chile.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `Redirection` → `Url_Approved` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | URL del Webhook de notificación. Se notifica a esta URL el estado de la compra una vez que el procesador del medio de pago notifica a Bamboo. La notificación a esta URL es un POST REST con payload en JSON y no una redirección. Puede ser también estática y configurada por el equipo de soporte. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

{{% alert title="Info" color="info"%}}

El objeto `Redirection` y sus parámetros no son requeridos; sin embargo, debe configurarlos para redireccionar a su cliente luego de que la transacción termine en cualquier estado.

{{% /alert %}}

#### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Chile/request_khipu >}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `CommerceAction` con `ActionReason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `ActionURL` con la URL del servicio externo. Usted debe redireccionar al cliente a esta URL para completar el pago en la app de _**Khipu**_.

{{% alert title="Info" color="info"%}}
Si se solicitan RUT y contraseña durante las pruebas, utilice un RUT válido (por ejemplo **11.111.111-1**) y contraseña **123**.
{{% /alert %}}

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example}

{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Chile/response_khipu >}}
{{< /highlight >}}