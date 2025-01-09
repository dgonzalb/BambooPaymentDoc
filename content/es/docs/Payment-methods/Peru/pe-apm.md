---
title: "Yape"
linkTitle: "Yape"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con Yape.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
* El estado de la compra para [_Yape_](#Yape) será aprobado o rechazado en cuanto envíe la transacción.
{{% /alert %}}

## Yape
_**Yape**_, un sistema de pago por móvil ampliamente adoptado en Perú, ofrece a los ciudadanos una forma cómoda de realizar transacciones a través del teléfono inteligente. Al vincular sin problemas sus cuentas bancarias a la aplicación _**Yape**_, los clientes pueden pagar productos y servicios sin esfuerzo.

A diferencia de otros APM en Perú, el flujo de _**Yape**_ funciona de forma similar a las transacciones con tarjeta. Sin embargo, en lugar de compartir la información de la tarjeta, sólo es necesario proporcionar el número de teléfono y el código de autorización generado por el cliente en la aplicación de _**Yape**_.

### Flujo de pago {#payment-flow}
El siguiente diagrama presenta el flujo de pago utilizado para pagar con _**Yape**_.

![PrintScreen](/assets/YapeFlow.png)

1. El cliente selecciona _**Yape**_ como medio de pago.
2. Usted debe mostrar el formulario para capturar el número de celular y el código de autorización.
3. El cliente abre la app _**Yape**_ y genera un nuevo código de autorización.
4. El cliente introduce su número de celular y el código de autorización generado previamente.
5. Bamboo procesa la transacción y devuelve un estado _aprobado_ o _rechazado_.

### Parámetros del Request {#request-parameters-2}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Consulta el identificador en la tabla de [Medios de pago](/es/docs/payment-methods/peru.html#payment-methods).|
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/peru.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. <br>Max 9 caracteres |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Departamento del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |
| `MetaDataIn` → `phoneNumber` | `numeric` | Sí | Número de celular del usuario de Yape. |
| `MetaDataIn` → `otp` | `numeric` | Sí | Código de autorización generado por el usuario de Yape. |

#### Ejemplo del Request {#request-example-2}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Peru/request_yape >}}
{{< /highlight >}}
        
### Parámetros del Response {#response-parameters-2}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-2}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Peru/response_yape >}}
{{< /highlight >}}