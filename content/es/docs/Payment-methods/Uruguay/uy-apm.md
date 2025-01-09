---
title: "Pagos en Efectivo"
linkTitle: "Pagos en Efectivo"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con pagos en efectivo.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para pagos en Efectivo permanecerá en _Pending_ hasta que el cliente complete el pago en una oficina física.
{{% /alert %}}

## Efectivo {#cash}
El método de pago en efectivo permite a sus clientes generar un cupón y completar el pago en una oficina de pago física.

## Redes de pago en efectivo {#cash-acquirers}

<div id="shortTable"></div>

| | PaymentMethod | Acquirer |
|-----|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Abitab_PhysicalNetwork.png"  width="52" /> | `ABT` | Abitab |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/RedPagos_PhysicalNetwork.png"  width="52" /> | `RDP` | RedPagos |

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Envíe el `PaymentMethod` de acuerdo con la red de pago en efectivo en esta [tabla](#cash-acquirers). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/uruguay.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Uruguay/request_redpagos >}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters}
En el parámetro `MetadataOut.PaymentBarcodeUrl` de la respuesta, se retorna el cupon en formato _PDF_ que el cliente debe presentar en la agencia para pagar la deuda generada.

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example} 
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Uruguay/response_redpagos>}}
{{< /highlight >}}