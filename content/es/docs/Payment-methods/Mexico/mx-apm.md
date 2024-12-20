---
title: "Pagos en Efectivo"
linkTitle: "Pagos en Efectivo"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos en sucursales físicas de pago.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios de pago Efectivo, permanecerá en _Pending_ hasta que el cliente complete el pago en una oficina física de pago.
{{% /alert %}}

## OXXOPay
**OXXO**, la cadena de tiendas de autoservicio más grande de México, ofrece un servicio para que sus clientes paguen sus compras. Sus clientes deben entregar el cupón en la tienda y pueden pagar utilizando efectivo o tarjetas.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Consulta el identificador en la tabla de [Medios de pago](/es/docs/payment-methods/mexico.html#payment-methods).|
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Yes | Número de teléfono del cliente. Incluyendo el indicativo para México `+52` |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | Yes | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/request_oxxopay >}}
{{< /highlight >}}
<!--```json
{
	"PaymentMediaId": 90,
	"Amount": 100,
	"CrossBorderData": {
		"TargetCountryISO": "MX"
	},
	"Currency": "USD",
	"Customer": {
		"Email": "lucia@test.com",
		"FirstName": "Lucia",
		"LastName": "Perez",
		"PhoneNumber": "+525532100000",
		"BillingAddress": {
			"AddressType": 1,
			"Country": "Mexico",
			"State": "Ciudad de Mexico",
			"City": "Coyoacan",
			"AddressDetail": "Av Universidad 3000"
		}
	}
}
```-->

### Parámetros del Response {#response-parameters}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL del cupón de pago. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Referencia de pago. |
| `Response` → `MetadataOut` → `PaymentBarcodeUrl` | `string` | URL de la imagen del código de barras del pago. |

Puede redirigir a su cliente a la URL mostrada en el parámetro `Response.MetadataOut.PaymentUrl`, donde podrá imprimir el cupón y completar el pago en una tienda **OXXO**.

<img src="/assets/OXXOPayVoucher.png" width="60%" alt="PrintScreen"/>

#### Ejemplo del Response {#response-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/response_oxxopay >}}
{{< /highlight >}}
<!--```json
{
    "Response": {
        "PurchaseId": 1399000,
        "Created": "2024-09-19T13:51:56.383",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1420486,
            "Created": "2024-09-19T13:51:56.383",
            "AuthorizationDate": "2024-09-19T13:51:57.701",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2024-09-19T13:51:57.711",
                    "Status": null,
                    "ResponseCode": null,
                    "ResponseMessage": null,
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 1974,
        "OriginalAmount": 1974,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": null,
        "Customer": {
            "CustomerId": 371863,
            "Created": "2024-09-19T13:51:55.943",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "lucia@test.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 521364,
                "AddressType": 2,
                "Country": "Mexico",
                "State": "Ciudad de Mexico",
                "AddressDetail": "Av Universidad 3000",
                "PostalCode": null,
                "City": "Coyoacan"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 387572,
                    "PaymentMediaId": 90,
                    "Created": "2024-09-19T13:51:56.063",
                    "LastUpdate": "2024-09-19T13:51:56.270",
                    "Brand": "OxxoPay",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "PhysicalNetwork",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": null,
                    "Last4": "",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/371863",
            "FirstName": "Lucia",
            "LastName": "Perez",
            "DocNumber": null,
            "DocumentTypeId": 2,
            "PhoneNumber": "+525532100000",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1399000",
        "DataUY": {
            "IsFinalConsumer": false,
            "Invoice": null,
            "TaxableAmount": 0
        },
        "DataDO": {
            "Invoice": null,
            "Tax": 0
        },
        "Acquirer": {
            "AcquirerID": 165,
            "Name": "OxxoPay",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 387572,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": {
            "PaymentUrl": "https://s3.amazonaws.com/gateway.stage.bamboopayment.com/purchase-coupons/1399000_77f1b5ed-329a-4872-984d-d6490e2307ee_00010101.html",
            "PaymentCode": "4300000013990006",
            "PaymentBarcodeUrl": "https://gateway.stage.bamboopayment.com/integrations/oxxo/barcodes/NDMwMDAwMDAxMzk5MDAwNg==.jpeg"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 1
        },
        "Redirection": null,
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {
            "AntifraudFingerprintId": null,
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "PurchaseType": 1,
        "HasCvv": null,
        "TargetCountryISO": null
    },
    "Errors": []
}
```--->

## Efectivo Paynet {#paynet-cash}
**Paynet** le permite a sus clientes generar un cupón y realizar el pago en una tienda física.

### Redes de pago en efectivo {#cash-acquirers}
Puede ofrecer a su cliente la posibilidad de pagar en efectivo en las siguientes redes:

* Farmacias Benavides
* 7Eleven
* Walmart
* Farmacias de Ahorro
* Sam´s
* Walmart Express
* Bodega Aurrera
* Circle K

### Parámetros del Request {#request-parameters-1}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Consulta el identificador en la tabla de [Medios de pago](/es/docs/payment-methods/mexico.html#payment-methods).|
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example-1}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/request_paynet >}}
{{< /highlight >}}
<!--```json
{
    "PaymentMediaId": 30,
    "Order": "test1005",
    "Amount": 1030,
    "TargetCountryISO": "MX",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "MXN",
    "Capture": true,
    "Customer": {
        "FirstName": "John",
        "LastName": "Diaz",
        "Email": "jdiaz@mail.com"
    }
}
```-->

### Parámetros del Response {#response-parameters-1}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Referencia de pago generado por **Paynet**. |
| `Response` → `MetadataOut` → `PaymentBarcodeUrl` | `string` | URL de la imagen del código de barras del pago. |
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL del cupón de pago en formato PDF. |

Puede redirigir a su cliente a la URL mostrada en el parámetro `Response.MetadataOut.PaymentUrl` para descargar el cupón y realizar el pago en una sucursal física de pago.

<img src="/assets/PaynetVoucher.png" width="60%" alt="PrintScreen"/>

#### Ejemplo del Response {#response-example-1}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/response_paynet >}}
{{< /highlight >}}
<!--
```json
{
    "Response": {
        "PurchaseId": 1134220,
        "Created": "2023-09-01T17:14:37.189",
        "TrxToken": null,
        "Order": "test1005",
        "Transaction": {
            "TransactionID": 1153112,
            "Created": "2023-09-01T17:14:37.189",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "Status": null,
                    "ResponseCode": "Ok",
                    "ResponseMessage": "trfe2e9jxdyzjvkqb1t1",
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 1030,
        "OriginalAmount": 1030,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": null,
        "Customer": {
            "CustomerId": 250947,
            "Created": "2023-09-01T17:14:36.427",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "jdiaz@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 255698,
                    "PaymentMediaId": 30,
                    "Created": "2023-09-01T17:14:36.547",
                    "LastUpdate": "2023-09-01T17:14:36.920",
                    "Brand": "OpenPayPayNet",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "PhysicalNetwork",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": null,
                    "Last4": "",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/250947",
            "FirstName": "John",
            "LastName": "Diaz",
            "DocNumber": null,
            "DocumentTypeId": 2,
            "PhoneNumber": null,
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1134220",
        "DataUY": {
            "IsFinalConsumer": false,
            "Invoice": null,
            "TaxableAmount": 0
        },
        "DataDO": {
            "Invoice": null,
            "Tax": 0
        },
        "Acquirer": {
            "AcquirerID": 62,
            "Name": "OpenPay PayNet",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255698,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "PaymentCode": "9988780335829741",
            "PaymentBarcodeUrl": "https://sandbox-api.openpay.mx/barcode/9988780335829741?width=1&height=45&text=false",
            "PaymentUrl": "https://sandbox-dashboard.openpay.mx/paynet-pdf/m46uqwpxz7otrhsinbx1/9988780335829741"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "MXN",
            "TargetAmount": 10.3
        },
        "Redirection": null,
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {
            "AntifraudFingerprintId": null,
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "PurchaseType": 1,
        "HasCvv": null,
        "TargetCountryISO": null
    },
    "Errors": []
}
```-->