---
title: "Validar Tarjeta"
linkTitle: "Validar Tarjeta"
date: 2024-12-06T08:43:44-05:00
Description: >
  El endpoint de Validación de Tarjeta permite a los comercios verificar la validez de las tarjetas a través de distintos adquirentes en Latinoamérica, ya sea mediante operaciones Zero Auth o simulando compras de monto mínimo con reembolso automático.
weight: 10
tags: ["subtopic"]
---

## URL del Endpoint
Para usar este servicio, envíe una petición **POST** a alguna de las siguientes URLs según el ambiente correspondiente:

* **Producción**: `https://secure-api.bamboopayment.com/v3/api/card/validate`
* **Pruebas**: `https://secure-api.stage.bamboopayment.com/v3/api/card/validate`

<br />

> Recuerda incluir la **Clave Privada** del comercio en los encabezados de la petición. <br /> Para más detalles, consulta nuestra [Guía de Autenticación]({{< ref "Authentication.md" >}}).


## Parámetros de la Solicitud {#request-parameters}
La petición se compone de dos objetos principales: `CardData` que contiene la información de la tarjeta y `Customer` con los datos del tarjetahabiente.

### Objeto CardData

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|:---:|---|
| `CardHolderName` | `string` | Sí | Nombre completo como aparece en la tarjeta |
| `Pan` | `string` | Sí | Número de tarjeta sin espacios ni separadores |
| `CVV` | `string` | Sí | Código de seguridad de la tarjeta (3-4 dígitos) |
| `Expiration` | `string` | Sí | Fecha de vencimiento en formato MM/AA |
| `Email` | `string` | Sí | Correo electrónico del tarjetahabiente |
| `Document` | `string` | No* | Número de documento del tarjetahabiente (*Requerido para algunos países) |
| `TargetCountryISO` | `string` | Sí | Código ISO de dos letras del país donde se procesará la tarjeta. Envía el país usando el formato `ISO-3166-1` |

### Objeto Customer

{{% alert title="Requisitos por País" color="warning"%}}
Para Argentina y Brasil, los campos de Customer y Address son obligatorios. Estos mercados exigen información completa del cliente para la validación de tarjetas.
{{% /alert %}}

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|:---:|---|
| `FirstName` | `string` | No¹ | Nombre del cliente |
| `LastName` | `string` | No¹ | Apellido del cliente |
| `Email` | `string` | No¹ | Correo electrónico del cliente |
| `DocumentNumber` | `string` | No¹ | Número de identificación. Usa CPF para Brasil o DNI para Argentina |
| `DocumentType` | `string` | No¹ | Tipo de documento. Usa "CPF.BR" para Brasil o "DNI.AR" para Argentina |
| `Address` | `object` | No¹ | Información de dirección del cliente |

¹ Obligatorio para Argentina y Brasil.

#### Objeto Address

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|:---:|---|
| `Country` | `string` | No¹ | Código ISO de dos letras del país (BR o AR) |
| `State` | `string` | No¹ | Código de estado o provincia (ej: "SP" para São Paulo, "BA" para Buenos Aires) |
| `City` | `string` | No¹ | Nombre de la ciudad |
| `PostalCode` | `string` | No¹ | Código postal |
| `AddressDetail` | `string` | No¹ | Dirección completa con número |

¹ Obligatorio para Argentina y Brasil.

### Ejemplo de la Solicitud

{{< highlight json >}}
{{< Payins/V3/CardValidation/CardValidation >}}
{{< /highlight >}} 

## Parámetros de la Respuesta {#response-parameters}
La respuesta incluye información sobre el resultado de la validación y detalles del método de pago.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `Status` | `string` | Resultado de la validación. Los valores posibles son `APPROVED` o `REJECTED` |
| `ErrorCode` | `string` | Código de error si la validación fue rechazada. `null` si fue aprobada |
| `ErrorDescription` | `string` | Descripción detallada del error si la validación fue rechazada. `null` si fue aprobada |
| `PaymentMethod` | `object` | Información sobre la tarjeta validada |

### Objeto PaymentMethod

| Parámetro | Tipo | Descripción |
|---|---|---|
| `Brand` | `string` | Marca de la tarjeta (ej: "MasterCard", "Visa") |
| `IssuerBank` | `string` | Nombre del banco emisor |
| `Type` | `string` | Tipo de tarjeta (ej: "CreditCard", "DebitCard") |

## Ejemplo de Respuesta {#response-example}

{{< highlight json >}}
{{< Payins/V3/CardValidation/CardValidationResponse >}}
{{< /highlight >}} 

## Posibles status {#status-values}
La validación puede devolver los siguientes valores de estado:

| Status | Descripción |
|---|---|
| `APPROVED` | Tarjeta validada exitosamente |
| `REJECTED` | La validación de la tarjeta falló. Consulta `ErrorCode` y `ErrorDescription` para más detalles |

Cuando el status es `REJECTED`, los campos `ErrorCode` y `ErrorDescription` proporcionarán información específica sobre el motivo del rechazo. Para más información sobre los códigos de error, consulta nuestra [Guía de Errores]({{< ref "Error-Codes.md" >}}).

{{% alert title="Importante" color="warning"%}}
Es posible que se reserve temporalmente un monto pequeño en la tarjeta que será reembolsado automáticamente. Este monto varía según el adquirente pero típicamente es menor a $1 USD.
{{% /alert %}}