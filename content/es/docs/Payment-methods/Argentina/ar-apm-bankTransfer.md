---
title: "Transferencias bancarias"
linkTitle: "Transferencias bancarias"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con Medios alternativos de pago.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago ya sea en su billetera o en una sucursal física de pago.
{{% /alert %}}


## Transferencias 3.0
Con **Transferencias 3.0**, puede mostrar un código QR code generado por Bamboo que lo puede leer su cliente utilizando su wallet.

## Parámetros del Request {#request-parameters}
### Básicos {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los parámetros de la compra básica y los idiomas de la respuesta.

### Obligatorios y condicionales {#request-parameters}

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Encuentre el valor en la tabla de [Medios de pago](/es/docs/payment-methods/argentina.html#payment-methods).  |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. **Si no envía este campo, la API asignará un valor por defecto.** |

#### Ejemplo del Request {#request-example-1}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Argentina/requestPurchase_tf30>}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters-1}
El siguiente ejemplo muestra la respuesta al request.
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Argentina/responsePurchase_tf30>}}
{{< /highlight >}}

<br>

En el campo `MetadataOut` dentro del objeto `Response`, el código QR se devuelve como una imagen _base64_ (Parámetro `Base64Qr`); añada esta imagen dentro de una etiqueta HTML de imagen. Por ejemplo:

{{< highlight html >}}
{{< Payins/V3/PaymentMethods/Argentina/responsePurchase_tf30_qr >}}
{{< /highlight >}}

<br>

Resultado:

<img src="/assets/QRTransferencias30.png" width="40%" alt="PrintScreen"/>

## Transferencias Bancarias Offline {#offline-bank-transfers}
Con **Transferencias bancarias offline**, puede permitir que su cliente pague mediante transferencias bancarias utilizando cualquier cuenta bancaria y monedero con _CVU_ (Clave Virtual Uniforme) o _CBU_ (Clave Bancaria Uniforme). Para completar el pago, su cliente debe transferir el importe de la compra a los datos de la cuenta que figuran en la respuesta.

## Parámetros del Request {#request-parameters}
### Básicos {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

### Obligatorios y condicionales {#request-parameters}
| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Encuentre el valor en la tabla de [Medios de pago](/es/docs/payment-methods/argentina.html#payment-methods).  |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/argentina.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | Sí | Número de documento del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. **Si no envía este campo, la API asignará un valor por defecto.** |

#### Ejemplo del Request {#request-example-2}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Argentina/requestPurchase_infinia >}}
{{< /highlight >}}


### Parámetros del Response {#response-parameters-2}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `Action` con `Reason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `URL` con la URL del cupón. En esta URL, el pagador debe iniciar sesión en su aplicación de home banking y completar el pago. Consulte la sección [Experiencia de pago](#payment-experience) para ver el flujo de pago. 

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-1}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Argentina/responsePurchase_infinia >}}
{{< /highlight >}}

### Experiencia de pago {#payment-experience}
Como se ha mencionado, debe redirigir a su cliente a la URL devuelta en la respuesta (parámetro `Action.URL`).

El primer paso que debe realizar su cliente es proporcionar su número **DNI/CUIT**.

<img src="/assets/InfiniaAR/InfiniaAR_01.png" alt="PrintScreen" style="width: 50%; height:auto;"><br>

A continuación, mostramos a su cliente el cupón con la información bancaria a la que debe crear la transferencia.

<img src="/assets/InfiniaAR/InfiniaAR_02.png" alt="PrintScreen" style="width: 70%; height:auto;"><br>

{{% alert title="Info" color="info"%}}
Puede personalizar este cupón para que muestre su logotipo en la parte superior. Para incluirlo, póngase en contacto con el servicio de soporte de Bamboo.
{{% /alert %}}

Una vez que su cliente complete la transferencia, podrá utilizar el botón de confirmación situado en la parte inferior de esta pantalla.

<img src="/assets/InfiniaAR/InfiniaAR_03.png" alt="PrintScreen" style="width: 50%; height:auto;">