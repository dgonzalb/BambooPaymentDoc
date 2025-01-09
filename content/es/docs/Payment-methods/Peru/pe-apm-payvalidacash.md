---
title: "Redes de cobranza en efectivo"
linkTitle: "Redes de cobranza en efectivo"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con redes de cobranza en efectivo.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
* El estado de la compra para [Redes de cobranza en efectivo](#cash-collection-networks) permanecerá en _Pending_ hasta que el cliente complete el pago.
{{% /alert %}}


## Redes de cobranza en efectivo {#cash-collection-networks}
Utilizando este método de pago, su cliente puede dirigirse a una red de cobranza de efectivo y completar el pago utilizando el número de referencia generado.

### Redes {#networks}
Puede ofrecer a su cliente la posibilidad de pagar en efectivo en las siguientes redes:

<div id="shortTable"></div>

| | PaymentMethod | Descripción |
|-----|-----|-----|
| <img src="/assets/LogosCashPeru/bcp.png" width="52" />          | `BCP` | BCP | 
| <img src="/assets/LogosCashPeru/arequipa.png" width="52" />     | `ARC` | Caja Arequipa  | 
| <img src="/assets/LogosCashPeru/cusco.png" width="52" />        | `CSC` | Caja Cusco  | 
| <img src="/assets/LogosCashPeru/huancayo.png" width="52" />     | `HCC` | Caja Huancayo  | 
| <img src="/assets/LogosCashPeru/ica.png" width="52" />          | `ICC` | Caja Ica  | 
| <img src="/assets/LogosCashPeru/piura.png" width="52" />        | `PIC` | Caja Piura  | 
| <img src="/assets/LogosCashPeru/tacna.png" width="52" />        | `TNC` | Caja Tacna  | 
| <img src="/assets/LogosCashPeru/trujillo.png" width="52" />     | `TRC` | Caja Trujillo  | 
| <img src="/assets/LogosCashPeru/interbank.png" width="52" />    | `IBC` | Interbank  | 
| <img src="/assets/LogosCashPeru/westernunion.png" width="52" /> | `WUC` | Western Union  | 
| <img src="/assets/LogosCashPeru/bbva.png" width="52" />         | `BBV` | BBVA  | 

### Parámetros del Request {#request-parameters-1}
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
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Departamento del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example-1}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Peru/request_payvalidaCash >}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters-1}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL de la información del pago. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Referencia de pago retornada por el adquirente que identifica la orden generada. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha de expiración del pago.<br>Formato _DD/MM/AAAA_. |
| `Response` → `MetadataOut` → `AgreementCode` | `string`  | Número de convenio entre el adquirente y la red física. |

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-1}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Peru/response_payvalidaCash >}}
{{< /highlight >}}