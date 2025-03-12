---
title: "Token de Uso Único"
linkTitle: "Token de Uso Único"
date: 2023-07-17T07:28:16-05:00
description: >
  Un usuario anónimo no está registrado en el sitio web y hace una compra por única vez. En este caso, siempre debe pedir los datos de la tarjeta para poder completar la transacción..
weight: 10
tags: ["subtopic"]
---

A continuación, describimos los pasos de cómo crear una compra con un usuario anónimo.

## Capturar la información de la tarjeta {#capture-the-card-data}
El primer paso es obtener el token de la tarjeta del cliente. Para esto, puede invocar el [Formulario de Checkout](../../../../es/docs/forms.html) en el último paso del carrito de compras. Recuerde que tiene que obtener el _**Formulario de Checkout**_ a través de la librería JavaScript de Bamboo Payment. De forma alternativa, peude utilizar la [Tokenización Directa]({{< ref "Direct-Tokenization.md" >}}) si su comercio cumple la con normativa PCI.

Este formulario se muestra dentro de un iframe en su página y solicita los datos de la tarjeta.

{{% alert title="Info" color="info"%}}
Si utiliza el identificador del Medio alternativo, no requiere realizar este paso y debe incluir el  **PaymentMediaId**.
{{% /alert %}}

### Invocando el formulario de Checkout Form {#invoking-the-checkout-form}
La librería JavaScript **PWCheckout** tiene las propiedades para personalizar su apariencia de acuerdo a los requerimientos del comercio. Una vez invoque el formulario de Checkout y el cliente ingrese los datos, puede obtener el _token_ asociado con la tarjeta. 

### Utilizando la Tokenización Directa {#using-direct-tokenization}
Debido a que el usuario no está registrado en su comercio, debe invocar el método para [crear el token para usuarios no registrados]({{< ref "Direct-Tokenization.md" >}}#OTT).

{{% alert title="Info" color="info"%}}
El token generado utilizando cualquiera de los métodos mencionados previamente corresponde a un _**One Time Token**_ (OTT) válido por una única vez y duración de 10 minutos.
{{% /alert %}}

## Crear una Compra Básica {#using-direct-tokenization}
Debe enviar el token recién obtenido desde el navegador o la aplicación móvil al servidor de aplicaciones para crear la transacción de compra.

Desde el servidor, invoque el método [Crear una Compra]({{< ref "Purchase-Operations.md" >}}#create-a-purchase), incluyendo el objeto `Purchase` con el token y los datos de la transacción adicionales.

```json
{
  "TrxToken": "OT_01_kYv0qTHckRiZ4wjCz5NguZRuwFLSIrQc4jiYpVJ8SzQ_",
  "Order": "17030613595101621fb",
  "Amount": 123456,
  "Currency": "USD",
  "Capture": true,
  "TargetCountryISO":"CL",
  "PaymentMediaId":106
}
```
<br>

Los campos **PaymentMediaId** y **TrxToken**  son opcionales, pero es obligatorio enviar uno dependiendo del flujo que quiere utilizar.

* **PaymentMediaId**: Identificador de medio de pago alternativo (transferencia, efectivo y procesamiento que requiere redirección del cliente). Puede obtener este identificador consultando la sección [Medios de pago por país](/es/docs/payment-methods.html).

* **TrxToken**: Puede generar el token y transaccionar enviándolo en este campo.

## Diagrama de secuencia del flujo de pago {#payment-workflow-sequence-diagram}
El siguiente diagrama de secuencia lista los pasos en el proceso de pago.

![PrintScreen](/assets/AnonymousUserFlow_es.png)

En el flujo anterior, se hacen las siguientes llamadas:

* **10** - `HTTP/POST` (server to server): `{EnvironmentAPI}/v1/api/purchase`
* **12** - `HTTP/GET `(server to server): `{EnvironmentAPI}/v1/api/customer/{{customer-id}}`