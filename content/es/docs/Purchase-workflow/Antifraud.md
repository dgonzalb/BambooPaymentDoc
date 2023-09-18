---
title: "Sistema de información de antifraude"
linkTitle: "Antifraude"
date: 2023-08-02T08:43:44-05:00
Description: >
  Todas las compras recibidas a través del flujo API o Redirect de comercios en el modelo de [Facilitador de Pagos]({{< ref "Concepts.md">}}#payfac-model) son analizadas por el sistema antifraude.
weight: 40
---

## Parámetros a enviar al realizar una compra {#parameters-to-send-when-making-a-purchase}
A continuación se listan los parámetros requeridos y sugeridos (opcionales) que deben ser enviados al momento de generar una compra en función del flujo de autorización.

### Flujo de autorización por API {#authorization-flow-by-api}

**Parámetros Obligatorios:**

* `{“Customer”:{FirstName:””,”LastName”:””,”Email”:””}}`<br>Nombre, apellido y correo electrónico correspondientes al cliente conectado al sitio web del comercio.
* `{"AntifraudData":{"AntifraudFingerprintId":""}}`<br>SessionId (`AntifraudFingerprintId`) que se obtiene por medio de la función JavaScript [getSessionAntifraud](#getsessionantifraud).
* `"CustomerIP":""`<br>IP correspondiente al cliente conectado al sitio web del comercio.

**Parámetros sugeridos:**

* `{“Customer”:{“ShippingAddress”:{}}}`<br>Dirección de envío proporcionada por el cliente. Si envía este parámetro, todas sus propiedades son obligatorias.
* `{“Customer”:{DocumentTypeId:””,”DocNumber”:””}}`<br>Documento del cliente.
* `{"AntifraudData":{“AntifraudMetadataIn”:{“key1”:”data1”,”key2”:”data2”}}}`<br>`AntifraudMetadataIn` que es un diccionario de datos a definir, para ajustar el sistema antifraude a las necesidades particulares de cada comercio.

### Flujo de autorización por Redirección {#authorization-flow-by-redirection}
Para el caso del flujo de autorización por redirección, los parámetros requeridos y sug

**Parámetros Obligatorios:**

Todos los de la columna A y al menos uno de la columna B

| Columna A - Obligatorios | Columna B - Al menos un dato es obligatorio |
|---------|----------|
| `AntifraudData` → `AntifraudFingerprintId` | `Email` |
| `CustomerIp` | `FirstName` - `LastName`<br>`DocumentTypeId` - `DocNumber` |

**Parámetros sugeridos:**

* `{“Customer”:{“Phone”: “”, “ShippingAddress”:{}}}`<br>Teléfono y dirección de envío proporcionada por el cliente.
* `{"AntifraudData":{“AntifraudMetadataIn”:{“key1”:”data1”,”key2”:”data2”}}}`<br>`AntifraudMetadataIn`, diccionario de datos a definir, para ajustar el sistema antifraude a las necesidades particulares de cada comercio.

* `{“Customer”:{“Phone”: “”, “ShippingAddress”:{}}}`<br>Phone, and Shipping address provided by the customer.
* `{"AntifraudData":{“AntifraudMetadataIn”:{“key1”:”data1”,”key2”:”data2”}}}`<br>`AntifraudMetadataIn`  que es un diccionario de datos a definir, para ajustar el sistema antifraude a las necesidades particulares de cada comercio.

## Device Fingerprint

### Importación de la Librería JavaScript {#javascript-library-import}
La invocación al servicio de fingerprint se encuentra en una librería JavaScript, que debe ser importada en la página web del cliente directamente desde una URL pública de nuestra plataforma.

El fragmento de JavaScript registra las interacciones del usuario con su sitio web y recopila información del dispositivo.

En la llamada a dicha librería se debe incluir (como parámetro) la llave pública de la cuenta de comercio (PublicAccountKey), la cual será utilizada para las llamadas hacia la API REST desde esta librería.

```html
<script src="{API_Environment}/v1/Scripts/Antifraud.js?key={PublicAccountKey}" type="text/javascript"></script> 
```

{{% alert title="Nota" color="warning"%}}
Usted debe importar la librería a través de la URL pública dispuesta por Bamboo Payment. No debe ser descargada y usada localmente desde un servidor propio del comercio o desde una URL de un tercero no autorizado por Bamboo Payment.

Esto es importante por motivos de seguridad y para mantenerse siempre actualizados con las últimas modificaciones y correcciones realizadas sobre la misma.
{{% /alert %}}

## Métodos {#methods}

### getSessionAntifraud
Este método retorna el `SessionId` del fingerprint (string). El `SessionId` es el dato que se debe enviar en la invocación de la API al momento de la compra en el parámetro `AntifraudFingerprintId`.

![PrintScreen](/assets/getSessionAntifraudFlow_es.png)