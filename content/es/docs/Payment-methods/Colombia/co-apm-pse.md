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
Existen dos flujos posibles para realizar pagos:

1. **Primer flujo:**  
   Se proporciona una URL al usuario, quien al acceder puede seleccionar su banco de preferencia para completar el pago. Posteriormente, será redirigido automáticamente al sitio web del banco seleccionado.

2. **Segundo flujo:**  
   Inicialmente, se utiliza la operación [obtener lista de bancos](/es/docs/payment-methods/colombia/co-apm-pse.html#request-parameters-get-bank-list) para obtener la lista de bancos disponibles. Esta lista puede ser desplegada en el proceso de checkout del comercio. Durante el procesamiento de la compra, se envían los datos necesarios para redirigir al usuario directamente al banco elegido, utilizando los campos adicionales en la solicitud.

### Parámetros del Request - flujo URL selección de banco {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Encuentre el valor en la tabla de [Medios de pago](/es/docs/payment-methods/colombia.html#payment-methods). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | Sí | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `Redirection` → `Url_Approved` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | URL del Webhook de notificación. Se notifica a esta URL el estado de la compra una vez que el procesador del medio de pago notifica a Bamboo. La notificación a esta URL es un POST REST con payload en JSON y no una redirección. Puede ser también estática y configurada por el equipo de soporte. |

### Parámetros adicionales - flujo URL directo al banco {#request-parameters-get-bank-list}
| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `MetaDataIn` → `financialInstitutionCode` | `string` | No | Código del banco donde se realizará la transacción.<br> Este código debe ser obtenido previamente desde el [endpoint de lista de bancos](/es/docs/payment-methods/colombia/co-apm-pse.html#get-bank-list)|
| `MetaDataIn` → `personType` | `string` | No | Representa el tipo de persona que realiza la transacción. <br>Valores posibles: <br>`1` → Persona Natural (individuos).<br> `2` → Persona Jurídica (empresas). |
| `MetaDataIn` → `identificationType` | `string` | No | Tipo de identificación del usuario que realiza la transacción.  <br>Valores posibles: <br>`RegistroCivilDeNacimiento`<br>`TarjetaDeIdentidad`<br>`CedulaDeCiudadania`<br>`TarjetaDeExtranjeria`<br>`CedulaDeExtranjeria`<br>`Pasaporte`	<br>`DocumentoDeIdentificacionExtranjero`<br>`NIT`|

> _El estado de la compra para Medios de Pago Alternativos permanecerá en **Pending** hasta que el cliente complete el pago_

#### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_pse >}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `Action` con `Reason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `URL` con la URL del servicio externo. Debe redirigir al cliente a esta URL para finalizar el pago siguiendo el flujo PSE. En este flujo, su pagador selecciona su banco, elige si es una persona física o jurídica y su tipo de documento.
<br> Si se envía el banco específico, obtenido y seleccionado desde la operación [obtener lista de bancos](/es/docs/payment-methods/colombia/co-apm-pse.html#request-parameters-get-bank-list), la redirección llevará directamente al sitio web del banco elegido.

![PrintScreen](/assets/PSE.png)

Según el resultado de la transacción, el pagador será dirigido a la URL definida en el objeto `Redirection`. Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/responsePurchase_pse >}}
{{< /highlight >}}

### Endpoint de obtención de lista de bancos {#get-bank-list}

* **Producción**: `https://pse.prod.bamboopayment.com/api/Bank/GetBanks`
* **Stage**: `https://pse.stage.bamboopayment.com/api/Bank/GetBanks`

#### Ejemplo del Response {#get-bank-list-response}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/response_bankList_pse >}}
{{< /highlight >}}

#### Ejemplo del Request para banco específico {#request-example-bank}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Colombia/requestPurchase_pse_bank >}}
{{< /highlight >}}


{{% alert title="Important Notes" color="info"%}}
**Reembolsos**: Bamboo te permite realizar reembolsos a través de una transferencia bancaria para pagos procesados con PSE, para más información consulta la sección de Reembolsos de Medios de Pago Alternativos.
{{% /alert %}}