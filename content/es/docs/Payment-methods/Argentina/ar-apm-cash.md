---
title: "Efectivo / Redes de cobranza"
linkTitle: "Efectivo"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con Medios alternativos de pago.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago ya sea en su billetera o en una sucursal física de pago.
{{% /alert %}}

## Pago Fácil
**Pago Fácil** proporciona una red de centros de pago físicos donde sus clientes pueden pagar sus compras en efectivo. Sus clientes deben facilitar los datos de pago y el monto que desean pagar, y el sistema se encarga del resto.

## Parámetros del Request {#request-parameters}
### Básicos {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los parámetros de la compra básica y los idiomas de la respuesta.

### Obligatorios y condicionales {#request-parameters}

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethodId` | `string` | Sí | Encuentre el valor en la tabla de [Medios de pago](/es/docs/payment-methods/argentina.html#payment-methods).  |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `Address` → `State` | `string` | No<sup>*</sup> | Estado del cliente.<br><sup>*</sup>_Este parámetro es requerido para calcular el impuesto de **II.BB**. Consulte [provincias](/es/docs/payment-methods/argentina.html#argentina-provinces) para saber sus posibles valores_. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. **Si no envía este campo, la API asignará un valor por defecto.** |

#### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Argentina/requestPurchase_pagoFacil>}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `Action` → `URL` | `string` | URL a la que debe redirigir al cliente para obtener la información de pago. |
| `Response` → `MetadataOut` → `PaymentCode` | `string` | Referencia de pago generada por **Pago Fácil**. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha en la que caducará el pago.<br>Formato _DD/MM/AAAA_. |

Debe redirigir a su cliente a la URL mostrada en el parámetro `Response.Action.URL`, donde podrá imprimir el comprobante y completar el pago en una oficina de **Pago Fácil**.

<img src="/assets/PagoFacilVoucher.png" width="60%" alt="PrintScreen"/>

#### Ejemplo del Response {#response-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Argentina/responsePurchase_pagoFacil>}}
{{< /highlight >}}