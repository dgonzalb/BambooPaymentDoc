---
title: "Formulario del Checkout"
linkTitle: "Formulario del Checkout"
date: 2023-03-02T11:40:29-05:00
Description: >
  Amplificado y con capacidad de respuesta adecuada para aplicaciones web y móviles.
weight: 10
---

## Importación de la Librería JavaScript {#import-of-the-javascript-library} 
Las funcionalidades del formulario Checkout se encuentran en una librería JavaScript, que debe ser importada a la web del cliente directamente desde una URL pública de nuestra plataforma.

La llamada a esta librería debe incluir (como parámetro) la llave pública de la cuenta de comercio (`PublicAccountKey`) que utilizará para las llamadas a la API REST desde esta biblioteca.

```html
<script src="{api_environment}/v1/Scripts/PWCheckout.js?key={PublicAccountKey}" type="text/javascript"></script>
```

{{% alert title="Nota" color="info"%}}
Se debe importar la librería a través de la URL pública entregada por Bamboo Payment. No debe descargarse y utilizarse localmente desde el servidor de un comercio o desde una URL de un tercero no autorizado por Bamboo Payment.

Esto es importante por razones de seguridad y para mantenerse actualizado con las últimas modificaciones y correcciones.
{{% /alert %}}

## Métodos {#methods}
### SetProperties
Este método establece las propiedades visuales (textos e imágenes) utilizadas en la ventana de Checkout.

Todas las propiedades son opcionales, excepto la propiedad `form_id`. Por lo tanto, la llamada al método `SetProperties` es obligatoria al menos para establecer esta propiedad, y debe ser invocada antes de la apertura del formulario del Checkout.

| Propiedad | Descripción | ¿Obligatorio? |
|-------------|:-----------|:----:|
| **name** | Nombre que aparece como _Título_ del Checkout. | No |
| **email** | Correo electrónico del cliente que se puede precargar. | No |
| **image** | URL absoluta de la imagen utilizada en el formulario del Checkout (formato fijo). Formatos de imagen aceptados: jpg, jpeg, png. | No |
| **button_label** | Texto para mostrar en el botón de pago (el valor del parámetro `amount` reemplaza el keyword `#amount#`). | No |
| **description** | Descripción del pago a realizarse. | No |
| **currency** | Moneda del pago.  | No |
| **amount** | Monto del pago (solo para informar al usuario, el monto real se informa server to server en la operación Purchase). | No |
| **lang** | Idioma de la interfaz en formato **ISO 639-1**. Si no se configura se obtiene de la configuración del browser. | No |
| **form_id** | Identificador del formulario web donde se manejan los datos de la compra actual. Este dato es requerido ya que se utilizará para informar el token generado por la aplicación a partir de la tarjeta o medio de pago ingresado por el usuario. | Sí |
| **checkout_card** | Si se envía esta propiedad, el Checkout va directamente a la captura de la tarjeta. | No |
| **empty** | Si se envía esta propiedad como `true`, se oculta la imagen y el título de la ventana del formulario. El valor por defecto es `false`. | No |
| **autoSubmit** | Propiedad que permite establecer el comportamiento de la librería `PWCheckout` cuando se recibe el token. <br>Si se envía como `true`, el formulario es enviado al servidor automáticamente luego de recibir el Token<br>Si se envía como `false` el formulario no se envía automáticamente al servidor.<br>El valor por defecto es `true`. | No |
| **close_onclick** | Esta propiedad controla si el formulario de captura de la tarjeta puede cerrarse de forma automática cuando el usuario hace clic fuera del área del formulario. <br>Si se envía como `true`, el formulario se cierra cuando hace clic fuera del mismo. <br>Si se envía como `false`, el formulario no se cierra automáticamente y es necesario hacer clic en el botón de cierre. <br>El valor por defecto es `true`. | No |
| **email_edit** | Define si el usuario puede modificar la dirección de correo electrónico.<br>El valor por defecto es `true`. | No |
| **email_hide** | Define la visibilidad del campo `email` en el formulario de captura.<br>Si no se envía la propiedad `email`, esta se ignora y se muestra el campo.<br>El valor por defecto es `false`. | No |
| **country_code** | Establece el país para el que vamos a tokenizar la tarjeta capturada. | Si |

Ejemplo:

```javascript
<script type="text/javascript">
PWCheckout.SetProperties(
{
  "name": "Mi tienda",
  "email": "cliente@gmail.com",
  "image": "http://mitienda.com/images/logocheckout.png",
  "button_label": "Pagar #monto#",
  "description": "Checkout de Mi tienda",
  "currency": "USD",
  "amount": "1843.21",
  "lang": "ES",
  "form_id": "commerce_form",
  "checkout_card": "1",
  "autoSubmit": `true`,
  "email_edit": `false`,
  "country_code" : "UY"
});
</script>
```

### SetStyle
Este método establece los colores de la ventana del Checkout. Todas las propiedades son opcionales, por lo que la llamada al método `SetStyle` es opcional. El formulario del Checkout utilizará los colores por defecto si no se llama a este método.

Invoca el método antes de abrir el formulario del Checkout para establecer esas propiedades.

| Propiedad | Descripción | Default |
| -------------|-----------|:-----: |
| **backgroundColor** | Establece el color de fondo de la ventana. | <div style="width:0.9rem;height:0.9rem;border:1px black solid;background-color:#FFFFFF"></div> `#FFFFFF` |
| **buttonColor** | Establece el color de fondo del botón de acciones en la ventana. | <div style="width:0.9rem;height:0.9rem;border:1px;background-color:#286090"></div> `#286090` |
| **buttonHoverColor** | Establece el color de fondo del botón de acciones en la ventana cuando se pasa el mouse por sobre el mismo. | <div style="width:0.9rem;height:0.9rem;border:1px;background-color:#204d74"></div> `#204d74` |
| **buttonTextColor** | Color del texto en el botón de acciones en la ventana. | <div style="width:0.9rem;height:0.9rem;border:1px black solid;background-color:#FFFFFF"></div> `#FFFFFF` |
| **buttonTextHoverColor** | Establece el color del texto en el botón de acciones en la ventana cuando se pasa el mouse por sobre el mismo.. | <div style="width:0.9rem;height:0.9rem;border:1px black solid;background-color:#FFFFFF"></div> `#FFFFFF` |
| **inputBackgroundColor** | Color de fondo de los campos de texto. | <div style="width:0.9rem;height:0.9rem;border:1px black solid;background-color:#FFFFFF"></div> `#FFFFFF` |
| **inputTextColor** | Color de texto en los campos de texto.| <div style="width:0.9rem;height:0.9rem;border:1px black solid;background-color:#555555"></div> `#555555` |
| **inputErrorColor** | Color de borde en los campos de texto cuando el mismo contiene un error. | <div style="width:0.9rem;height:0.9rem;border:1px black solid;background-color:#FF0000"></div> `#FF0000` |
| **inputAddonBackgroundColor** | Color de fondo de la iconografía de los campos de texto. |  <div style="width:0.9rem;height:0.9rem;border:1px black solid;background-color:#EEEEEE"></div> `#EEEEEE` |
| **labelColor** | Color de texto en las etiquetas y en el título de la ventana. | <div style="width:0.9rem;height:0.9rem;border:1px black solid;background-color:#337AB7"></div> `#337AB7` |

Ejemplo:

```javascript
<script type="text/javascript">
PWCheckout.SetStyle(
{
  "backgroundColor": "f2f2f2",
  "buttonColor": "555555",
  "buttonHoverColor": "777777",
  "buttonTextColor": "ffffff",
  "buttonTextHoverColor": "ffffff",
  "inputBackgroundColor": "ffffff",
  "inputTextColor": "767676",
  "inputErrorColor": "ff0000",
  "inputAddonBackgroundColor": "ffffff",
  "labelColor": "494949"
}
);
</script>
```

{{% alert title="Nota" color="info"%}}
Debe establecer los colores en formato hexadecimal RGB.
{{% /alert %}}

### SetStyleForVbV
Este método describe parámetros configurables cuando se despliega la página _Verified By Visa_. 

Todas las propiedades son opcionales, por lo que la llamada al método _SetStyleForVbV_ es opcional. Si no invoca este método, la página se mostrará en todo lo ancho de la pantalla. 

Para establecer estas propiedades, invoque el método antes de abrir el formulario del Checkout.

| Propiedad  | Descripción |
|-------------|-------------|
| **width** | Ancho del div que contiene el iframe con la página. |
| **height** | Altura del div que contiene el iframe con la página.   |
| **margin** | Configure `auto`, para que quede centrado en la pantalla. |

Ejemplo:

```html
<script type="text/javascript">
PWCheckout.SetStyle(
  {
    "width": "1600px",
    "height": "800px",
    "margin": "auto"
  }
);
</script>
```

### Bind
Utilice este método para suscribirse a los eventos que lanza la librería `PWCheckout`.

Para recibir los eventos generados por este formulario, invoque el método antes de abrir la ventana del formulario Checkout.

| Propiedad | Descripción | ¿Obligatorio? |
| ---------|-------------|:----------:|
| **eventName (string)** | Nombre del evento al que desea suscribirse (ver eventos [a continuación](#events)). | Sí |
| **callbackName (JavaScript Function)** | Función JavaScript que procesará el evento. | Sí|

{{% alert title="Nota" color="info"%}}
Debe implementar la función javascript que procesa el evento (si es necesario).
{{% /alert %}}

<br>

Ejemplo:

```html
<script type="text/javascript">
function WindowIsOpen(){
  console.log("Checkout Window is Open");
}
PWCheckout.Bind("opened", WindowIsOpen);
</script>
```

#### Eventos {#events}
La librería `PWCheckout` expone los siguientes eventos javascript a los que se puede suscribir usando el método [Bind](#bind).

| Evento | Descripción | Parámetros |
|-------------|-----------|:-----:|
| **opened** | El evento se lanza cuando se abre el formulario de captura de tarjeta. | - |
| **closed** | El evento se lanza cuando se cierra el formulario de captura de tarjeta. | `CloseInfo` |
| **tokenCreated** | El evento se lanza al recibir el Token creado para la tarjeta de pago capturada. | `TokenInfo` |
| **notificationReceived** | El evento se lanza cuando se ha completado el flujo de solicitud de código de verificación. | `NotificationInfo` |
| **onTokenCreateError** | El evento se lanza cuando se genera un error al generar un Token. | `TokenInfo` |


### Unbind
Este método elimina la suscripción a un evento realizada previamente por el método [Bind](#bind).

| Propiedad | Descripción | ¿Obligatorio? |
| ---------|-------------|:-----:|
| **eventName (string)** | Nombre del evento del que desea eliminar la suscripción. | Sí |


Ejemplo:

```html
<script type="text/javascript">
PWCheckout.Unbind("opened", WindowIsOpen);
</script>
```

## Invocación del formulario {#invoking-the-form}
La página web de invocación del formulario del checkout debe incluir un campo de entrada oculto llamado `PWToken`. La librería JavaScript establecerá el valor del campo después de obtener el Token.

Cree el campo de la siguiente manera:

```html
    <input type="hidden" name="PWToken" id="PWToken" />
```
<br>

Para iniciar el proceso de pago, debe enlazar el elemento de la página que realiza la llamada al Formulario de Captura de Tarjetas. Este elemento puede ser un botón, una imagen o cualquier elemento activo que desee vincular. 

Debe llamar al método `AddActionButton` de la librería `PWCheckout` de la siguiente manera:

```html
<script type="text/javascript">
  PWCheckout.AddActionButton("buttonId");
</script>
```
<br>

El parámetro `buttonId` hace referencia al identificador del elemento que lanza el proceso de pago.

Se pueden asociar múltiples elementos en la misma llamada, identificando cada uno por su ID y separando cada identificador con una coma.

```html
<script type="text/javascript">
  PWCheckout.AddActionButton("buttonId1", "buttonId2", "buttonId3");
</script>
```
<br>

Tras realizar este paso, el proceso de pago se invoca cuando el cliente hace clic en el elemento vinculado.

La librería JavaScript gestiona el proceso, tan pronto finaliza esta invocación, mostrando al usuario el formulario donde se solicitan los datos de la tarjeta.

Cuando el cliente ingresa los datos de su tarjeta, nuestros servidores tokenizan la información y envían el Token a la librería `PWCheckout`.

El valor del Token generado se inserta automáticamente en el campo oculto `PWToken`, y finalmente, la librería JavaScript `PWCheckout` realiza las siguientes acciones:

1. Activa el evento `tokenCreated`.
2. Enviar el formulario si la propiedad `autoSubmit` es `true`.

Debe procesar los datos del formulario del checkout, incluido el valor del campo `PWToken`, y enviar la información relevante descrita en la sección [API de compras]({{< ref Purchase-Operations.md >}}).

## Invocación del formulario con filtros de validación {#invoking-the-form-with-validation-filters}
Si necesita validar el ingreso de una determinada tarjeta, ya sea por la marca o por el banco emisor, debe proceder a la apertura personalizada del Formulario de Captura de Tarjetas. Utilice un método explícito para validar los datos.

El método a utilizar es el **OpenIframeWithPaymentMediaOptions**, que recibe los siguientes parámetros:
* **PaymentMediaId**: Identificador del medio de pago en el gateway (consulte la [tabla](/es/docs/payment-methods.html#payment-method-types) tipos de medios de pago).
* **BankId**: Identificador del banco en el gateway (consulte la [tabla](/es/docs/payment-methods/uruguay.html#issuer-banks-table) Banco Emisor).
* **PaymentMediaType**: Identificador del tipo de medio de pago (consulte la [tabla](/es/docs/payment-methods/uruguay.html#payment-methods) medios de pago).


Ejemplo de la invocación de **OpenIframeWithPaymentMediaOptions**:

```html
<script type="text/javascript">
  PWCheckout.Iframe.OpenIframeWithPaymentMediaOptions(paymentMediaId, bankId, paymentMediaType);
</script>
```