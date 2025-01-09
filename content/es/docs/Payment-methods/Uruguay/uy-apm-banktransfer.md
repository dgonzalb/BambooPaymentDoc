---
title: "Transferencias bancarias"
linkTitle: "Transferencias bancarias"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con transferencias bancarias.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para transferencias bancarias permanecerá en _Pending_ hasta que el cliente complete el pago.
{{% /alert %}}

## Transferencias Bancarias {#bank-transfers}
**Transferencias Bancarias** permiten que tus clientes realicen pagos utilizando transferencias bancarias. Los clientes deben transferir el monto de la compra a los detalles de la cuenta especificados en la respuesta utilizando su banco de preferencia. Aceptamos pagos de todos los bancos.


### Parámetros del Request {#request-parameters-2}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Consulta el identificador en la tabla de [Medios de pago](/es/docs/payment-methods/uruguay.html#payment-methods).|
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Description` | `string` | Sí | Descripción de la compra. Para este medio de pago es obligatorio. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/uruguay.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example-2}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Uruguay/request_infinia >}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters-2}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `Action` con `Reason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `URL` con la URL del cupón. En esta URL, el pagador debe iniciar sesión en su aplicación de home banking y completar el pago. Consulte la sección [Experiencia de pago](#payment-experience) para ver el flujo de pago. 

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-2}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Uruguay/response_infinia >}}
{{< /highlight >}}

### Experiencia de pago {#payment-experience}
Como se ha mencionado, debe redirigir a su cliente a la URL devuelta en la respuesta (parámetro `Action.URL`).

A continuación, mostramos a su cliente el cupón con la información bancaria a la que debe crear la transferencia.

<img src="/assets/InfiniaAR/InfiniaAR_05.png" alt="PrintScreen" style="width: 70%; height:auto;"><br>

{{% alert title="Info" color="info"%}}
Puede personalizar este cupón para que muestre su logotipo en la parte superior. Para incluirlo, póngase en contacto con el servicio de soporte de Bamboo.
{{% /alert %}}

Una vez que su cliente complete la transferencia, podrá utilizar el botón de confirmación situado en la parte inferior de esta pantalla.

<img src="/assets/InfiniaAR/InfiniaAR_06.png" alt="PrintScreen" style="width: 50%; height:auto;">