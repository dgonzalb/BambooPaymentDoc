---
title: "Embedded Checkout Form"
linkTitle: "Embedded Checkout Form"
date: 2023-03-02T11:40:29-05:00
Description: >
  Corresponds to a payment form embedded on its page, simplifying and securing the capture of sensitive data for the processing of online payments.
weight: 70
tags: ["subtopic"]
---

The difference between this form, and [Checkout Form]({{< ref Checkout-Form.md >}}) mentioned before is that you must invoke this form inside a custom page.

Integrating this form into your site or _app_ provides users with a simplified and responsive payment experience suitable for web and mobile applications.

## Import of the JavaScript Library 
Find the functionalities of the Embedded Checkout form in a JavaScript library, which must be imported into the client’s website directly from a public URL of our platform.

```javascript
 <script src="{api_environment}/v1/Scripts/PWCheckoutNoModal.js?key={PublicAccountKey}" type="text/javascript"></script>
```

{{% alert title="Note" color="info"%}}
You must import the library through the public URL provided by Bamboo Payment. It must not be downloaded and used locally from a merchant’s server or from a URL of a third party not authorized by Bamboo Payment.

This is important for security reasons and to keep updated with the latest modifications and corrections.
{{% /alert %}}

Next, like the following example, you must define an iframe inside a custom commerce web on which the capture form renders.

Create a `div` to insert the iframe:

```html
<div id="iframeDiv" style="height: 410px; width: 300px; margin: auto;"></div>
```
<br>

Create the iframe by JavaScript:

```javascript
var main_iframe = document.createElement("iframe");
var iframeDiv = $("#iframeDiv");
main_iframe.id = "custom_iframe";

// Append iframe to div
iframeDiv.append(main_iframe);
```
<br>

Or create the iframe directly on `HTML`:

```html
<iframe id="custom_iframe" style="height: 410px; width: 300px;"></iframe>
```
<br>

Next, you must set the `IframeId` for the method `SetProperties`, like the following example:

```javascript
 PWCheckout.SetProperties(
  {
      "iframeId": "custom_iframe",
  }
);
```
<br>

Finally, you must invoke `LoadIframe()` method, which get and renders the capture form in the custom iframe generated:

```javascript
    PWCheckout.LoadIframe();
```
<br>

<!--In the last section of this document, we bring you an example of an HTML page with a sample of Embedded capture form invoke.-->