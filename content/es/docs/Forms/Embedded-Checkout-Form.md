---
title: "Formulario del Checkout embebido"
linkTitle: "Formulario del Checkout embebido"
date: 2023-03-02T11:40:29-05:00
Description: >
  Corresponde a un formulario de Checkout incrustado en su página, simplificando y asegurando la captura de datos sensibles para el procesamiento de pagos en línea.
weight: 20
---

La diferencia entre este formulario, y [el formulario de Checkout]({{< ref Checkout-Form.md >}}) mencionado anteriormente es que debes invocar este formulario dentro de una página personalizada.

La integración de este formulario en su sitio o _app_ proporciona a los usuarios una experiencia de pago simplificada y receptiva adecuada para aplicaciones web y móviles.


## Importación de la Librería JavaScript {#import-of-the-javascript-library} 
Encuentre las funcionalidades del formulario de Checkout embebido en una librería JavaScript, que debe ser importada en el sitio web del cliente directamente desde una URL pública de nuestra plataforma.

```javascript
 <script src="{api_environment}/v1/Scripts/PWCheckoutNoModal.js?key={PublicAccountKey}" type="text/javascript"></script>
```

{{% alert title="Nota" color="info"%}}
Se debe importar la librería a través de la URL pública entregada por Bamboo Payment. No debe descargarse y utilizarse localmente desde el servidor de un comercio o desde una URL de un tercero no autorizado por Bamboo Payment.

Esto es importante por razones de seguridad y para mantenerse actualizado con las últimas modificaciones y correcciones.
{{% /alert %}}

Luego, como en el siguiente ejemplo, debe definir un iframe dentro de una web del comercio personalizada sobre el que se renderiza el formulario de captura.

Cree un `div` para insertar el iframe:

```html
<div id="iframeDiv" style="height: 410px; width: 300px; margin: auto;"></div>
```
<br>

Cree el iframe por JavaScript:

```javascript
var main_iframe = document.createElement("iframe");
var iframeDiv = $("#iframeDiv");
main_iframe.id = "custom_iframe";

// Append iframe to div_
iframeDiv.append(main_iframe);
``` 
<br>

O cree el iframe directamente en `HTML`:

```html
<iframe id="custom_iframe" style="height: 410px; width: 300px;"></iframe>
```
<br>

A continuación, debe establecer el `IframeId` para el método `SetProperties`, como en el siguiente ejemplo:

```javascript
 PWCheckout.SetProperties(
  {
      "iframeId": "custom_iframe",
  }
);
```
<br>

Por último, se debe invocar el método `LoadIframe()`, que obtiene y renderiza el formulario de captura en el iframe personalizado generado:

```javascript
    PWCheckout.LoadIframe();
```
<br>

<!--In the last section of this document, we bring you an example of an HTML page with a sample of Embedded capture form invoke.-->