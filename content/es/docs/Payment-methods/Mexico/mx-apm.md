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
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

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
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

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
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

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
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

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

Para utilizar **SPEI**, los clientes deben tener acceso a la banca en línea o a una aplicación de banca móvil ofrecida por su banco y luego iniciar una transferencia proporcionando el número CLABE (Clave Bancaria Estandarizada) retornado en el response.

### Parámetros del Request {#request-parameters-2}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**73**_. |
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
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto.<br>El tiempo máximo permitido es de **30** días (**43200** minutos). |

#### Ejemplo del Request {#request-example-2}
```json
{
    "PaymentMediaId": 73,
    "Order": "ORD1012",
    "Amount": 77000,
    "Currency": "USD",
    "Description": "Test Order",
    "MetaDataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "TargetCountryISO": "MX",
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
| `Response` → `MetadataOut` → `Clabe` | `string`  | Corresponde al número _CLABE_ de la cuenta a la que se enviarán los fondos. Este número es dinámico y único por transacción. |
| `Response` → `MetadataOut` → `Expiration` | `date` | Fecha y hora de expiración del pago. |

{{% alert title="Nota" color="info"%}}
El número _CLABE_ en el Response pertenece a _Bamboo Payment Systems_, su cliente debe configurar una transferencia electrónica a este número desde su aplicación bancaria.
{{% /alert %}}

#### Ejemplo del Response {#response-example-2}

```json
{
    "Response": {
        "PurchaseId": 148817,
        "Created": "2023-10-31T12:23:00.494",
        "TrxToken": null,
        "Order": "ORD1012",
        "Transaction": {
            "TransactionID": 159700,
            "Created": "2023-10-31T12:23:00.493",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-10-31T12:23:29.923",
                    "Status": null,
                    "ResponseCode": "",
                    "ResponseMessage": "",
                    "Error": null,
                    "AuthorizationCode": "",
                    "UniqueID": null,
                    "AcquirerResponseDetail": ""
                }
            ]
        },
        "Capture": true,
        "Amount": 1104886,
        "OriginalAmount": 1104886,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": "Test Order",
        "Customer": {
            "CustomerId": 70505,
            "Created": "2023-10-31T12:22:51.353",
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
                    "PaymentProfileId": 72313,
                    "PaymentMediaId": 73,
                    "Created": "2023-10-31T12:22:52.153",
                    "LastUpdate": "2023-10-31T12:22:53.173",
                    "Brand": "STP",
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
            "URL": "https://devapi.siemprepago.com/v1/api/Customer/70505",
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
        "URL": "https://devapi.siemprepago.com/v1/api/Purchase/148817",
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
            "AcquirerID": 105,
            "Name": "STP",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 72313,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "Clabe": "646180366600000240",
            "Expiration": "11/03/2023 13:43:00"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 770.0
        },
        "Redirection": null,
        "AntifraudData": {
            "AntifraudFingerprintId": null,
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "TargetCountryISO": null,
        "PurchaseType": 1,
        "IsFirstRecurrentPurchase": false
    },
    "Errors": []
}
```

### Experiencia de pago para los clientes {#payment-experience-for-customers}
Su cliente debe completar el pago creando una transferencia bancaria al número CLABE retornado en la respuesta. Su cliente debe seguir los siguientes pasos para realizar la transferencia en su app bancaria.

1. **Ingresar a la Plataforma bancaria**<br>
Su cliente debe iniciar sesión en su plataforma de banca en línea para iniciar la transferencia única.

2. **Seleccionar la opción de transferencia**<br>
Su cliente debe navegar hasta la opción para realizar una transferencia o pago. Las plataformas bancarias suelen denominar esta opción como _**Transferencias**_ o un término similar.

3. **Ingresar los datos del destinatario**<br>
Se debe informar el número de CLABE en la respuesta, y su cliente debe proporcionarlo en los datos del destinatario. Recuerde que su cliente debe ingresar información precisa para evitar cualquier problema con la transferencia.

4. **Especificar monto de la transferencia**<br>
Su cliente debe introducir el monto de la compra. Algunas plataformas pueden pedir el tipo de divisa si su cliente tiene cuentas con varias divisas.

{{% alert title="¡Importante!" color="danger"%}}
La transferencia debe coincidir con el monto de la compra. De lo contrario, Bamboo rechazará la transacción.
{{% /alert %}}

5. **Revisar y confirmar**<br>
Recuérdele a su cliente que revise cuidadosamente toda la información introducida para garantizar su exactitud. Su cliente debe comprobar el número de CLABE y el monto de la transferencia. Además, confirmar que tenga fondos suficientes en su cuenta.

6. **Autorizar la transferencia**<br>
Si es necesario, el sistema puede pedirle a su cliente que autorice la transferencia utilizando una medida de seguridad como contraseña, NIP o autenticación de dos factores.

7. **Confirmación de la Transferencia**<br>
Su cliente recibirá un mensaje de confirmación una vez que la transferencia haya sido aprobada y procesada. Esta confirmación puede incluir un número de referencia de la transacción que pueden utilizar con fines de seguimiento.

Es importante tener en cuenta que los pasos y opciones específicos pueden variar ligeramente según el banco y la plataforma de banca electrónica que utilice su cliente. Consulte siempre las instrucciones del banco del cliente y siga sus protocolos de seguridad para garantizar una transferencia segura y satisfactoria.
