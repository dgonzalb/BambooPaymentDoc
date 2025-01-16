---
title: "Crear Link de Pago"
linkTitle: "Crear Link de Pago"
date: 2024-08-02T08:43:44-05:00
Description: >
  Crea enlaces de pago y códigos QR dinámicamente a través de la API. Genera URLs de pago personalizables para transacciones con opciones de branding y configuraciones flexibles.
weight: 10
tags: ["subtopic"]
---

Crea una nueva solicitud de pago que genera una URL de pago y, opcionalmente, un código QR.

### URL de solicitud
Debes realizar una solicitud **POST** a las siguientes URLs según tus necesidades:

* **Producción**: `https://h2h.bamboopayment.com/api/v1/payments`
* **Stage**: `https://h2h.stage.bamboopayment.com/api/v1/payments`

<br />

> Recuerda incluir la **Clave Privada del Comerciante** en los encabezados de la solicitud. <br /> Para más detalles, consulta nuestra [Guía de Autenticación]({{< ref "Authentication.md" >}}).

### Parámetros de la solicitud

| Parámetro | Tipo | ¿Requerido? | Descripción |
|-----------|------|:-----------:|-------------|
| `amount` | `integer` | Sí | Monto del pago en la unidad más pequeña de la moneda (por ejemplo, 123450 representa 1,234.50) |
| `currencyCode` | `string` | Sí | Código de moneda en formato ISO 4217 alfa-3 (por ejemplo, `UYU`, `USD`) |
| `paymentType` | `string` | Sí | Tipo de pago. Debe ser "QR" para habilitar la generación de códigos QR o "CheckoutPro" solo para enlaces de pago. Cuando se configura como "QR", el objeto `qrImageOptions` es opcional. Para cualquier otro tipo de pago, `qrImageOptions` debe ser nulo. |
| `orderNumber` | `string` | No | Identificador del pedido del comerciante. |
| `installments` | `integer[]` | No | Lista de cuotas. Si no se proporciona, toma el valor predeterminado para cada método de pago configurado en el Portal del Comerciante. Si no está configurado, toma `1`. |
| `validForMinutes` | `integer` | No | Tiempo de validez del enlace de pago, después del cual no podrá procesarse. **Predeterminado:** `15` minutos. Solo puede reducirse, no aumentarse. |
| `notificationUrl` | `string` | No | URL para notificar el estado del pago. Puede configurarse un valor predeterminado en el Portal del Comerciante. |
| `metadataIn` | `object` | No | Datos adicionales específicos para cada país y adquirente. |

#### Objeto MetadataIn

| Parámetro | Tipo | ¿Requerido? | Descripción |
|-----------|------|:-----------:|-------------|
| `metadataIn` → `invoiceNumber` | `string` | No | Número de factura asociado a la venta. |
| `metadataIn` → `isFinalConsumer` | `string` | No | Indica si la venta es a un consumidor final. Valores: `true`, `false`. |
| `metadataIn` → `taxableAmount` | `string` | No | Monto sujeto a IVA. |

#### Objeto QRImageOptions

| Parámetro                         | Tipo       | ¿Requerido? | Descripción                                                                                           |
|-----------------------------------|------------|-------------|-------------------------------------------------------------------------------------------------------|
| `qrImageOptions` → `contentType`               | `string`   | No          | Define cómo se estructurará el contenido del código QR: <br> • `encodedJson`: Codifica los datos del pago como JSON Base64. Esto evita que los escáneres QR abran automáticamente URLs.<br> • `url`: Inserta la RedirectUrl directamente en el código QR para un escaneo fácil y redirección inmediata.<br> **Predeterminado:** `encodedJson`. |
| `qrImageOptions` → `encodedJsonPrefix`         | `string`   | No          | Antepone la información del pago codificada en Base64 con este prefijo. Útil para esquemas de URL personalizados en aplicaciones móviles. |
| `qrImageOptions` → `errorCorrectionLevel`      | `string`   | No          | Establece la capacidad de corrección de errores del código QR:<br> • `low`: 7% de tolerancia al error<br> • `medium`: 15% de tolerancia al error<br> • `quartile`: 25% de tolerancia al error<br> • `high`: 30% de tolerancia al error<br> **Predeterminado:** `quartile`. |
| `qrImageOptions` → `imageFormat`              | `string`   | No          | Especifica el formato de los píxeles de la imagen:<br> • `rgb24`: Color RGB de 8 bits (3 canales)<br> • `argb32`: Color ARGB de 8 bits con canal alfa (4 canales)<br> **Predeterminado:** `rgb24`. |
| `qrImageOptions` → `imagePixelFormat`          | `string`   | No          | Especifica el formato de la imagen: PNG, BMP, GIF, JPEG, PBM, TGA, TIFF, WEBP.<br> **Predeterminado:** `png`. |
| `qrImageOptions` → `scale`                     | `integer`  | No          | Ancho y alto, en píxeles, de cada módulo del código QR.<br> **Predeterminado:** `10`.                                          |
| `qrImageOptions` → `border`                    | `integer`  | No          | Número de módulos de borde añadidos a cada lado de la imagen del código QR.<br> **Predeterminado:** `2`.                 |
| `qrImageOptions` → `foregroundColor`           | `string`   | No          | Color del código QR. Acepta nombres de colores o valores hexadecimales.<br> **Predeterminado:** "black".                           |
| `qrImageOptions` → `backgroundColor`           | `string`   | No          | Color de fondo. Acepta nombres de colores o valores hexadecimales.<br> **Predeterminado:** "white".                        |
| `qrImageOptions` → `borderColor`               | `string`   | No          | Color del borde. Acepta nombres de colores o valores hexadecimales.<br> **Predeterminado:** Igual que `backgroundColor`.           |
| `qrImageOptions` → `embeddedImageName`         | `string`   | No          | Nombre de una imagen pre-cargada en el Portal del Comerciante para mostrar en el centro del código QR.               |
| `qrImageOptions` → `embeddedImageRelativeWidth`| `float`    | No          | Tamaño de la imagen incrustada en relación al ancho del código QR. Ejemplo: 0.25 significa que la imagen ocupará el 25% del ancho del código QR. Si no se especifica, la imagen conserva su tamaño original.     |

> **Importante**: Este objeto es opcional cuando `paymentType` es "QR" y debe ser nulo para cualquier otro tipo de pago.

### Ejemplo del Request

{{< highlight json >}}
{{< Payins/PaymentLink/Create_Payment_Link >}}
{{< /highlight >}} 


### Ejemplo del Response 
{{< highlight json >}}
{{< Payins/PaymentLink/Response_Payment_Link >}}
{{< /highlight >}} 
