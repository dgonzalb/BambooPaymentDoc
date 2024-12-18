---
title: "Pagos en Efectivo"
linkTitle: "Pagos en Efectivo"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprende a integrar pagos en efectivo para Colombia.
weight: 30
tags: ["subtopic"]
---

Este método permite a tus clientes generar un comprobante y pagar en puntos de pago físicos autorizados.

## Puntos de pago disponibles {#cash-acquirers}
Puedes ofrecer a tus clientes la posibilidad de pagar en efectivo en las siguientes redes:

<div id="shortTable"></div>

| Logo | PaymentMethod | Descripción |
|:-----:|:-----:|:-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Apostar_PhysicalNetwork.png" width="52" /> | `APC` | Apostar |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Bancolombia_PhysicalNetwork.png" width="52" /> | `BCC` | Bancolombia |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Efecty_PhysicalNetwork.png" width="52" /> | `EFC` | Efecty |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Gana_PhysicalNetwork.png" width="52" /> | `GNC` | Gana |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Puntored_PhysicalNetwork.png" width="52" /> | `PNC` | Puntored |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Superpagos_PhysicalNetwork.png" width="52" /> | `SPC` | Superpagos |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Sured_PhysicalNetwork.png" width="52" /> | `SRC` | SuRed |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Susuerte_PhysicalNetwork.png" width="52" /> | `SSC` | SuSuerte |

### Parámetros de la petición {#request-parameters-1}
Para procesar pagos en efectivo, necesitas incluir campos específicos en tu solicitud. Para información sobre autenticación, idiomas de respuesta y parámetros básicos como monto y moneda, consulta el artículo sobre [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters).

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Consulta el identificador en la tabla de [Medios de pago](/es/docs/payment-methods/colombia.html#payment-methods). |
| `TargetCountryISO` | `string` | Sí | País donde se procesará el pago. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombres del cliente. |
| `Customer` → `LastName` | `string` | No | Apellidos del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulta los valores disponibles en la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types). |
| `Customer` → `DocumentNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País. |
| `Customer` → `Address` → `State` | `string` | No | Departamento. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Dirección completa. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Tiempo de expiración del pago en minutos. Si no lo especificas, se aplicará un valor predeterminado. |

{{% alert title="Importante" color="info"%}}
* Los montos en Pesos Colombianos no admiten decimales, todos los valores se redondean automáticamente.
* El campo `amount` debe incluir dos ceros como decimales. Por ejemplo, para COP 5.000 debes enviar 500000.
{{% /alert %}}

> > _El estado de la compra para Medios de Pago Alternativos como Cash, permanecerá en **Pending** hasta que el cliente complete el pago en el punto físico._

#### Ejemplo de petición {#request-example-1}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_cash>}}
{{< /highlight >}}

### Parámetros de respuesta {#response-parameters-1}
Recibirás los siguientes parámetros en la respuesta:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `Action` → `URL` | `string` | URL del comprobante que el cliente debe presentar en el punto de pago. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Código de referencia que identifica la orden de pago. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha de vencimiento del pago.<br>Formato _DD/MM/AAAA_. |
| `Response` → `MetadataOut` → `AgreementCode` | `string`  | Número de convenio entre el punto de pago y el adquirente. |

Para más detalles sobre los parámetros de respuesta, consulta la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) en la documentación de Compras.

#### Ejemplo de respuesta {#response-example-1} 
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_cash>}}
{{< /highlight >}}