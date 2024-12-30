---
title: "Create Payment Link"
linkTitle: "Create Payment Link"
date: 2024-08-02T08:43:44-05:00
Description: >
  Create payment links and QR codes dynamically via API. Generate customizable payment URLs for transactions with options for branding and flexible configurations.
weight: 10
tags: ["subtopic"]
---

Creates a new payment request that generates a payment URL and optionally a QR code.

### Request URL
You must invoke a **POST** request to the following URLs according to your needs:

* **Production**: `https://h2h.bamboopayment.com/api/v1/payments`
* **Stage**: `https://h2h.stage.bamboopayment.com/api/v1/payments`

<br />

> Remember to include your **Merchant's Private Key** in the request headers. <br /> For more details, check our [Authentication Guide]({{< ref "Authentication.md" >}}).


### Request Parameters

| Parameter | Type | Required? | Description |
|-----------|------|:---------:|-------------|
| `amount` | `integer` | Yes | Payment amount in the smallest currency unit (e.g., 123450 represents 1,234.50) |
| `currencyCode` | `string` | Yes | Currency code in ISO 4217 alpha-3 format (e.g., `UYU`, `USD`) |
| `paymentType` | `string` | Yes | Type of payment. Must be "QR" to enable QR code generation. When set to "QR", the `qrImageOptions` object becomes optional. For any other payment type, `qrImageOptions` must be null |
| `orderNumber` | `string` | No | Merchant's order identifier |
| `installments` | `integer[]` | No | List of installments. If not provided, takes default for each payment method configured in Merchant Portal. If not configured in Merchant Dashboard, takes `1` |
| `validForMinutes` | `integer` | No | Payment link validity time, after which it cannot be processed. **Default:** `15` minutes. Can only be reduced, not increased |
| `notificationUrl` | `string` | No | URL to notify the payment status. A default can be configured in Merchant Dashboard. |
| `metadataIn` | `object` | No | Additional data specific to each country and acquirer |

#### MetadataIn Object

| Parameter | Type | Required? | Description |
|-----------|------|:---------:|-------------|
| `metadataIn` → `invoiceNumber` | `string` | No | Invoice number associated with the sale |
| `metadataIn` → `isFinalConsumer` | `string` | No | Indicates if the sale is to a final consumer. Values: `true`, `false` |
| `metadataIn` → `taxableAmount` | `string` | No | VAT taxable amount |

#### QRImageOptions Object

| Parameter | Type | Required? | Description |
|-----------|------|:---------:|-------------|
| `qrImageOptions` → `contentType` | `string` | No | Defines how the QR code content will be structured: <br> • `encodedJson`: Encodes payment data as Base64 JSON. This prevents QR scanners from automatically opening URLs.<br> • `url`: Embeds the RedirectUrl directly in the QR code for easy scanning and immediate redirection.<br> **Default:** `encodedJson` |
| `qrImageOptions` → `encodedJsonPrefix` | `string` | No | When using `contentType = encodedJson`, adds this prefix to the encoded data. Useful for custom URL schemes in mobile apps. |
| `qrImageOptions` → `errorCorrectionLevel` | `string` | No | Sets the QR code's error correction capability:<br>• `low`: 7% error tolerance<br>• `medium`: 15% error tolerance<br>• `quartile`: 25% error tolerance<br>• `high`: 30% error tolerance<br> **Default:** `quartile` |
| `qrImageOptions` → `imageFormat` | `string` | No | Sets the image's pixel format:<br>• `rgb24`: 8-bit RGB color (3 channels)<br>• `argb32`: 8-bit ARGB color with alpha channel (4 channels)<br> **Default:** `rgb24` |
| `qrImageOptions` → `imagePixelFormat` | `string` | No | Output image format. Supported formats: PNG, BMP, GIF, JPEG, PBM, TGA, TIFF, WEBP.<br> **Default:** `png` |
| `qrImageOptions` → `scale` | `integer` | No | Size in pixels of each QR code module.<br> **Default:** `10` |
| `qrImageOptions` → `border` | `integer` | No | Width of the quiet zone (border) around the QR code, in modules.<br> **Default:** `2` |
| `qrImageOptions` → `foregroundColor` | `string` | No | QR code color. Accept color names or hex values.<br> **Default:** "black" |
| `qrImageOptions` → `backgroundColor` | `string` | No | Background color. Accept color names or hex values <br> **Default:** "white" |
| `qrImageOptions` → `borderColor` | `string` | No | Border color. Accept color names or hex values <br> **Default:** Same as backgroundColor |
| `qrImageOptions` → `embeddedImageName` | `string` | No | Name of a pre-loaded image in Merchant Portal to display in the center of the QR code |
| `qrImageOptions` → `embeddedImageRelativeWidth` | `float` | No | Size of the embedded image relative to QR code width (0-1). Example: 0.25 means 25% of QR width. If not specified, image keeps its original size |
| `qrImageOptions` → `encodedJsonPrefix` | `string` | No | For QR codes with ContentType = `EncodedJson`, prepends the Base64 encoded payment information with this prefix |
| `qrImageOptions` → `errorCorrectionLevel` | `string` | No | QR error correction level. Values: "low", "medium", "quartile", "high". **Default:** "quartile" |
| `qrImageOptions` → `foregroundColor` | `string` | No | QR code foreground color in hex format |
| `qrImageOptions` → `embeddedImageName` | `string` | No | Name of pre-loaded image to place at QR center |
| `qrImageOptions` → `embeddedImageRelativeWidth` | `number` | No | Desired width of embedded image relative to QR code width (0-1) |


> **Important**: This object is optional when `paymentType` is "QR" and must be null for any other payment type.


### Request Example

{{< highlight json >}}
{{< Payins/PaymentLink/Create_Payment_Link >}}
{{< /highlight >}} 


### Response 
{{< highlight json >}}
{{< Payins/PaymentLink/Response_Payment_Link >}}
{{< /highlight >}} 
