---
title: "Efectivo"
linkTitle: "Efectivo"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con efectivo.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago.
{{% /alert %}}

## Efectivo {#cash}
El método de pago en efectivo permite a sus clientes generar un cupón y completar el pago en una oficina de pago física.

### Redes de pago en efectivo {#cash-acquirers}
Puede ofrecer a su cliente la posibilidad de pagar en efectivo en las siguientes redes.

<div id="shortTable"></div>

| | Descripción |
|:-----:|:-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Apostar_PhysicalNetwork.png" width="52" /> | Apostar |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Bancolombia_PhysicalNetwork.png" width="52" /> |  Bancolombia |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Efecty_PhysicalNetwork.png" width="52" /> |  Efecty |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Gana_PhysicalNetwork.png" alt="Diners" width="52" /> |  Gana |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Puntored_PhysicalNetwork.png" width="52" /> |  Puntored |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Superpagos_PhysicalNetwork.png" width="52" /> |  Superpagos |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Sured_PhysicalNetwork.png" width="52" /> |  SuRed |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Susuerte_PhysicalNetwork.png" width="52" /> |  SuSuerte |

### Parámetros del Request {#request-parameters-1}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethodId` | `string` | Sí | Encuentre el valor en la tabla de [Medios de pago](/es/docs/payment-methods/colombia.html#payment-methods). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Departamento del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

{{% alert title="Consideraciones" color="info"%}}
* Los Pesos Colombianos no soportan cantidades decimales, por lo que todos los valores recibidos serán redondeados.
* El valor `amount` debe incluir dos ceros como decimales. Ejemplo `COP 5.000` > `500000`.
{{% /alert %}}

#### Ejemplo del Request {#request-example-1}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_cash>}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters-1}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `Action` → `URL` | `string` | URL del cupón que debe ser presentado en la red física. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Referencia de pago retornada por el adquirente que identifica la orden generada. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha de expiración del pago.<br>Formato _DD/MM/AAAA_. |
| `Response` → `MetadataOut` → `AgreementCode` | `string`  | Número de convenio entre el adquirente y la red física. |

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-1} 
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_cash>}}
{{< /highlight >}}