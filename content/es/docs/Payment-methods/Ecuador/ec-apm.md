---
title: "Pagos en efectivo y transferencias bancarias"
linkTitle: "Pagos en efectivo y transferencias bancarias"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos en efectivo y transferencias bancarias con **PagoEfectivo** .
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago.
{{% /alert %}}

## PagoEfectivo Ecuador
**PagoEfectivo** provee una red de centros de pago físicos donde sus clientes pueden pagar las compras en efectivo o utilizando su aplicación bancaria. Su cliente puede pagar mostrando el identificador de la deuda (CIP) en una oficina o a través de su aplicación bancaria.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Consulta el identificador en la tabla de [Medios de pago](/es/docs/payment-methods/ecuador.html#payment-methods).|
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/ecuador.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. El número de teléfono debe tener el formato `<característica>\|<número>`. Ejemplo: `+593\|971516229`. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto.<br>La fecha de expiración debe ser de al menos 10 minutos y menos de seis meses a partir de la fecha actual (en UTC GMT -5). |

#### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Ecuador/request_pagoefectivo >}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Código de pago generado por **PagoEfectivo**. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha de expiración del CIP.<br>Formato _ISO 8601_. |
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL del documento HTML del CIP. |

![PrintScreen](/assets/PagoEfectivoEC.png)

#### Ejemplo del Response {#response-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Ecuador/response_pagoefectivo >}}
{{< /highlight >}}