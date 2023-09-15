---
title: "Medios alternativos de pago"
linkTitle: "Medios alternativos de pago"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos en sucursales físicas de pago o utilizando transferencias bancarias.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago en una oficina física de pago, banca en línea o aplicación de banca móvil.
{{% /alert %}}

## OXXO
**OXXO**, la cadena de tiendas de autoservicio más grande de México, ofrece un servicio para que sus clientes paguen sus compras. Sus clientes deben entregar el cupón en la tienda y pueden pagar utilizando efectivo o tarjetas.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**35**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, el API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example}
```json
{
    "PaymentMediaId": 35,
    "Amount": 5000,
    "TargetCountryISO": "MX",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "MXN",
    "Capture": true,
    "Customer": {
        "FirstName": "Lorena",
        "LastName": "Salas",
        "Email": "lsalas@mail.com"
    }
}
```

### Parámetros del Response {#response-parameters}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Número del código de barras generado por **OXXO**. |
| `Response` → `MetadataOut` → `PaymentBarcodeUrl` | `string` | URL del código de barras generado por **OXXO**. |
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL del cupón de pago. |

Puede redirigir a su cliente a la URL mostrada en el parámetro `Response.MetadataOut.PaymentUrl`, donde podrá imprimir el cupón y completar el pago en una tienda **OXXO**.

<img src="/assets/OxxoVoucher.png" width="60%" alt="PrintScreen"/>

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1134219,
        "Created": "2023-09-01T16:56:08.496",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1153111,
            "Created": "2023-09-01T16:56:08.497",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "200 https://s3.amazonaws.com/gateway.stage.bamboopayment.com/purchase-coupons/1134219_7f597f55-1d3a-42ba-9bbb-883262cd6c03_20230902.html",
            "ApprovalCode": "Author",
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-09-01T16:56:09.437",
                    "Status": "PhysicalNetwork Pending",
                    "ResponseCode": "200",
                    "ResponseMessage": "",
                    "Error": null,
                    "AuthorizationCode": "Author",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "https://s3.amazonaws.com/gateway.stage.bamboopayment.com/purchase-coupons/1134219_7f597f55-1d3a-42ba-9bbb-883262cd6c03_20230902.html"
                }
            ]
        },
        "Capture": true,
        "Amount": 5000,
        "OriginalAmount": 5000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": null,
        "Customer": {
            "CustomerId": 250946,
            "Created": "2023-09-01T16:56:07.713",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "lsalas@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 255697,
                    "PaymentMediaId": 35,
                    "Created": "2023-09-01T16:56:07.863",
                    "LastUpdate": "2023-09-01T16:56:08.220",
                    "Brand": "Oxxo",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/250946",
            "FirstName": "Lorena",
            "LastName": "Salas",
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
        "URL": "https://api.stage.bamboopayment.com/Purchase/1134219",
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
            "AcquirerID": 68,
            "Name": "Oxxo",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255697,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "PaymentUrl": "https://s3.amazonaws.com/gateway.stage.bamboopayment.com/purchase-coupons/1134219_7f597f55-1d3a-42ba-9bbb-883262cd6c03_20230902.html",
            "PaymentCode": "810000011342193202310010005000",
            "PaymentBarcodeUrl": "https://gateway.stage.bamboopayment.com/purchase-coupons/coupons-barcodes/OxxoBarcode/810000011342193202310010005000.jpeg",
            "PaymentReference": "1134219"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "MXN",
            "TargetAmount": 50
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
```

## Efectivo Paynet {#paynet-cash}
**Paynet** le permite a sus clientes generar un cupón y realizar el pago en una tienda física.

## Redes de pago en efectivo {#cash-acquirers}
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
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**30**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, el API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example-1}
```json
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
```

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
```

## Transferencia Bancaria (SPEI) {#bank-transfer-spei}
El **SPEI** (Sistema de Pagos Electrónicos Interbancarios) es un sistema de pagos electrónicos en México que permite a sus clientes transferir fondos entre bancos al instante. 

Para utilizar **SPEI**, los clientes deben tener acceso a la banca en línea o a una aplicación de banca móvil ofrecida por su banco y luego iniciar una transferencia proporcionando el número de convenio CIE, la referencia, la cantidad y el número CLABE (Clave Bancaria Estandarizada) si es necesario.

### Parámetros del Request {#request-parameters-2}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**32**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, el API asignará un valor por defecto.<br>El tiempo máximo permitido es de **30** días (**43200** minutos). |

#### Ejemplo del Request {#request-example-2}
```json
{
    "PaymentMediaId": 32,
    "Order": "ORD1001",
    "Amount": 1000000,
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
```

### Parámetros del Response {#response-parameters-2}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | Url del recibo de pago genérico. |
| `Response` → `MetadataOut` → `PaymentCode` | `string` | Número de referencia para _BBVA Bancomer_ o Concepto de pago para otros bancos. |
| `Response` → `MetadataOut` → `BankName` | `string`  | Nombre del banco destino. |
| `Response` → `MetadataOut` → `BankAccount` | `string` | Número de convenio CIE para _BBVA Bancomer_ o Referencia de pago para otros bancos. |
| `Response` → `MetadataOut` → `BankAccountLabel` | `string`  | _CLABE_ número de cuenta a la que se enviarán los fondos. |
| `Response` → `MetadataOut` → `BankReference` | `string` | Número de referencia del banco. |

Puede redirigir a su cliente a la URL mostrada en el parámetro `Response.MetadataOut.PaymentUrl` para descargar el recibo con los pasos e información para completar el pago.

<img src="/assets/SPEIVoucher.png" width="60%" alt="PrintScreen"/>


#### Ejemplo del Response {#response-example-2}

```json
{
    "Response": {
        "PurchaseId": 1134267,
        "Created": "2023-09-01T17:40:18.599",
        "TrxToken": null,
        "Order": "ORD1001",
        "Transaction": {
            "TransactionID": 1153152,
            "Created": "2023-09-01T17:40:18.599",
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
                    "ResponseMessage": "tryyscihs1lifsi5ymw5",
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 1000000,
        "OriginalAmount": 1000000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": null,
        "Customer": {
            "CustomerId": 250981,
            "Created": "2023-09-01T17:40:17.930",
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
                    "PaymentProfileId": 255734,
                    "PaymentMediaId": 32,
                    "Created": "2023-09-01T17:40:18.023",
                    "LastUpdate": "2023-09-01T17:40:18.440",
                    "Brand": "OpenPayBank",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "BankTransfer",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/250981",
            "FirstName": "John",
            "LastName": "Diaz",
            "DocNumber": null,
            "DocumentTypeId": null,
            "PhoneNumber": null,
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1134267",
        "DataUY": {
            "IsFinalConsumer": false,
            "Invoice": null,
            "TaxableAmount": null
        },
        "DataDO": {
            "Invoice": null,
            "Tax": null
        },
        "Acquirer": {
            "AcquirerID": 65,
            "Name": "OpenPay Bank",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255734,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "PaymentUrl": "https://sandbox-dashboard.openpay.mx/spei-pdf/m46uqwpxz7otrhsinbx1/tryyscihs1lifsi5ymw5",
            "PaymentCode": "25966327953597018268",
            "BankName": "BBVA Bancomer",
            "BankAccount": "1411217",
            "BankAccountLabel": "000000000000000001",
            "BankReference": "tryyscihs1lifsi5ymw5"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "MXN",
            "TargetAmount": 10000
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
```