---
title: "Tokenización Directa"
linkTitle: "Tokenización Directa"
date: 2023-07-17T07:28:16-05:00
description: >
  Si su comercio **cumple con la normativa PCI**, esta funcionalidad le permite crear los tokens para las tarjetas utilizadas en su Web vía API, de tal forma que no necesite invocar el [Formulario de Checkout]({{< ref "Checkout-Form.md" >}}). 
weight: 30
tags: ["subtopic"]
---

{{% alert title="Nota" color="info"%}}
Contacte a su representante de ventas para activar esta funcionalidad.
{{% /alert %}}

## URL del Request {#request-url}
Independiente del token que quiera crear, debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://directtoken.bamboopayment.com/api/Token?commerceKey={{Merchant Private Key}}`
* **Stage**: `https://directtoken.stage.bamboopayment.com/api/Token?commerceKey={{Merchant Private Key}}`

Donde `{{Merchant Private Key}}` es su identificador de comercio.

## Configurar el idioma de los códigos de respuesta {#setting-the-language-of-the-response-codes}
Puede recibir la descripción del error basándose en las funciones de localización. Para ello, debe enviar el encabezado `lang` en su integración, utilizando cualquiera de los siguientes idiomas en formato **ISO 639-1**.

<div id="shortTable"></div>

| Código | Idioma |
|:-:|---|
| `en` | Inglés.<br>_Este es el idioma por defecto. Si no envía este encabezado o envía un idioma diferente a los soportados, recibirá los errores en este idioma._ |
| `es` | Español. |
| `pt` | Portugués. |

## Parámetros del Request {#request-parameters}

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|---|---|---|---|
| `Email` | `string` | Sí | Dirección de correo electrónico del titular de la tarjeta. |
| `Pan` | `string` | Sí | Número de tarjeta. |
| `CVV` | `string` | Sí | Código de seguridad de la tarjeta. |
| `Expiration` | `string` | Sí | Fecha de caducidad impresa en la tarjeta. |
| `Titular` | `string` | Sí | Nombre del titular de la tarjeta. | 
| `CrossBorderData` → `TargetCountryISO` | `string` | No | Indica el país del titular de la tarjeta. Este parámetro es para la tokenización _CrossBorder_.<br>Puede encontrar la lista de países disponibles [aquí](/es/docs/payment-methods.html#countries-table-iso-3166-1). |
| `CustomerId` | `string` | No | Identificador del cliente. Si se envía, la API genera un pago dentro del cliente con un _Commerce Token_ (CT) para su uso futuro.<br>Consulte [crear un cliente]({{< ref Registered-users.md >}}#create-a-customer) para más información. | 

### Crear un One Time Token (OTT) {#OTT}
Este token permite almacenar los datos de la tarjeta para un único uso y es válido durante 10 minutos.

#### Ejemplo del Request {#request-example}
```json
{
    "Email": "rserrano@mail.com",
    "Pan": "5275412766556942",
    "CVV": "172",
    "Expiration": "07/26",
    "Titular": "Rodrigo Serrano",
    "CrossBorderData": {
        "TargetCountryISO": "AR"
    }
}
```

### Crear un Commerce Token (CT) {#CT}
Este token permite almacenar los datos de la tarjeta, que pueden procesarse en cualquier cuenta.

#### Ejemplo del Request {#request-example-1}
```json
{
    "Email": "rserrano@mail.com",
    "Pan": "5275412766556942",
    "CVV": "172",
    "Expiration": "07/26",
    "Titular": "Rodrigo Serrano",
    "CrossBorderData": {
        "TargetCountryISO": "AR"
    },
    "CustomerId":251179
}
```

## Parámetros del Response {#response-parameters}
Independientemente del token que cree, recibirá los siguientes parámetros en la respuesta.

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `TokenId` | `string` | Representa el medio de pago registrado sin exponer sus datos sensibles.<br>Utilice estos datos para realizar transacciones de pago a través de la tarjeta registrada. |
| `IdCommerceToken` | `int` | Id del token creado. Para OT, el id es `0` ya que lo almacenamos durante 10 minutos como máximo. |
| `Created`| `date` | Fecha y hora de creación del token de la tarjeta.  |
| `Type` | `string` | Tipo de token creado. Puede ser `OneTime` para OT o `Commerce` para CT. |
| `Brand` | `string` | Nombre asociado a la marca de la tarjeta de pago, por ejemplo, `VISA`. | 
| `Owner` | `string` | Nombre del titular de la tarjeta. | 
| `Last4` | `string` | Los cuatro últimos dígitos de la tarjeta. | 
| `Bin` | `string` | Los seis primeros dígitos del número de la tarjeta. Este número identifica al banco emisor. | 
| `CardExpMonth` | `int` | Mes de la fecha de caducidad. |
| `CardExpYear` | `int` | Año de la fecha de caducidad. |
| `IssuerBank` | `string` | Nombre del banco emisor. |
| `CardType` | `string` | Tipo de tarjeta. |
| `PaymentMediaId` | `int` | Identificador del medio de pago. |
| `AffinityGroup` | `string` | Programa de afinidad de la tarjeta. |
| `Error` | `object` | Error que puede lanzar el sistema durante el proceso de tokenización. |

### Ejemplo del Response {#response-example}

**Para One Time Token**

```json
{
    "TokenId": "OT__OnZr7uB0WcBIxTZDYgelObTuqbROpSxJ4jiYpVJ8SzQ_",
    "IdCommerceToken": 0,
    "Created": "2023-09-04T12:29:56.0351102",
    "Type": "OneTime",
    "Brand": "MasterCard",
    "Owner": "Rodrigo Serrano",
    "Last4": "0015",
    "Bin": null,
    "CardExpMonth": 8,
    "CardExpYear": 30,
    "Error": null,
    "IssuerBank": null,
    "CommerceAction": null,
    "CardType": "CreditCard",
    "Installments": null,
    "PaymentMediaId": 2,
    "AffinityGroup": null,
    "CardId": null
}
```
<br>

**Para Commerce Token**

```json
{
    "TokenId": "CT__i10IcFjy3amyaNLK0D4isUI5PXmTO5ytnM5Xdz7VMRE_",
    "IdCommerceToken": 42909,
    "Created": "2023-09-04T12:29:10.4160761",
    "Type": "Commerce",
    "Brand": "MasterCard",
    "Owner": null,
    "Last4": "0015",
    "Bin": "529991",
    "CardExpMonth": 8,
    "CardExpYear": 30,
    "Error": null,
    "IssuerBank": null,
    "CommerceAction": null,
    "CardType": null,
    "Installments": null,
    "PaymentMediaId": 2,
    "AffinityGroup": null,
    "CardId": null
}
```
