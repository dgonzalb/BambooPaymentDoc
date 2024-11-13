---
title: "Transferencias bancarias"
linkTitle: "Transferencias bancarias"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con Medios alternativos de pago.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago ya sea en su billetera o en una sucursal física de pago.
{{% /alert %}}


## Transferencias 3.0
Con **Transferencias 3.0**, puede mostrar un código QR code generado por Bamboo que lo puede leer su cliente utilizando su wallet.

### Parámetros del Request {#request-parameters-1} 
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**72**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/argentina.html#document-types) para ver los posibles valores. |
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
    "PaymentMediaId":"72",
    "Order":"QA908",
    "Capture":"true",
    "Amount": 55734,
    "TargetCountryISO": "AR",
    "Currency":"ARS",
    "Customer": {
        "Email": "eluna@mail.com",
        "BillingAddress": {
          "AddressType": 1,
          "Country": "AR",
          "State": "C",
          "City": "BsAs",
          "AddressDetail": "Joaquin Requena 1580",
          "PostalCode": "C1054AAU"
        },
        "FirstName" : "Erik",
        "LastName": "Luna",
        "DocNumber" : "12345672",
        "DocumentTypeId": 17,
        "PhoneNumber" : "24022330"
    },
    "Description" : "Test purchase"
}
```

### Parámetros del Response {#response-parameters-1}
El siguiente ejemplo muestra la respuesta al request.

```json
{
    "Response": {
        "PurchaseId": 1167185,
        "Created": "2023-09-04T20:08:58.295",
        "TrxToken": null,
        "Order": "QA908",
        "Transaction": {
            "TransactionID": 1186082,
            "Created": "2023-09-04T20:08:58.295",
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
        "Amount": 55734,
        "OriginalAmount": 55734,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "ARS",
        "Description": "Test purchase",
        "Customer": {
            "CustomerId": 251238,
            "Created": "2023-09-04T20:08:57.450",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "eluna@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 374730,
                "AddressType": 2,
                "Country": "AR",
                "State": "C",
                "AddressDetail": "Joaquin Requena 1580",
                "PostalCode": "C1054AAU",
                "City": "BsAs"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 256000,
                    "PaymentMediaId": 72,
                    "Created": "2023-09-04T20:08:57.550",
                    "LastUpdate": "2023-09-04T20:08:57.893",
                    "Brand": "Transferencias30",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/251238",
            "FirstName": "Erik",
            "LastName": "Luna",
            "DocNumber": "12345672",
            "DocumentTypeId": 17,
            "PhoneNumber": "24022330",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1167185",
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
            "AcquirerID": 83,
            "Name": "Transferencias 3.0",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 256000,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": {
            "CodeQr": "630414D2",
            "Base64Qr": "data:image/png;base64,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"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "AR",
            "TargetCurrencyISO": "ARS",
            "TargetAmount": 557.34
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
<br>

En el campo `MetadataOut` dentro del objeto `Response`, el código QR se devuelve como una imagen _base64_ (Parámetro `Base64Qr`); añada esta imagen dentro de una etiqueta HTML de imagen. Por ejemplo:

```html
<img src="data:image/png;base64,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" id="qr-code-display" style="max-width: 400px;">
```

<br>

Resultado:

<img src="/assets/QRTransferencias30.png" width="40%" alt="PrintScreen"/>

## Transferencias Bancarias Offline {#offline-bank-transfers}
Con **Transferencias bancarias offline**, puede permitir que su cliente pague mediante transferencias bancarias utilizando cualquier cuenta bancaria y monedero con _CVU_ (Clave Virtual Uniforme) o _CBU_ (Clave Bancaria Uniforme). Para completar el pago, su cliente debe transferir el importe de la compra a los datos de la cuenta que figuran en la respuesta.

### Parámetros del Request {#request-parameters-2}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**532**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/argentina.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example-2}
```json
{
    "PaymentMediaId": 532,
    "Order": "QA541",
    "Capture": "true",
    "Amount": 100000,
    "Installments": 1,
    "Currency": "USD",
    "CrossBorderData": {
        "TargetCountryISO": "AR"
    },
    "Description": "Compra de prueba",
    "Customer": {
        "Email": "eluna@mail.com",
        "BillingAddress": {
            "AddressType": 1,
            "Country": "AR",
            "State": "C",
            "City": "BsAs",
            "AddressDetail": "Joaquin Requena 1580",
            "PostalCode": "C1054AAU"
        },
        "FirstName": "Erik",
        "LastName": "Luna",
        "DocNumber": "12345672",
        "DocumentTypeId": 17,
        "PhoneNumber": "24022330"
    },
    "MetaDataIn": {
        "PaymentExpirationInMinutes": 60
    },
    "Redirection": {
        "Url_Approved": "https://dummystore.com/checkout/response",
        "Url_Rejected": "https://dummystore.com/checkout/response",
        "Url_Canceled": "https://dummystore.com/checkout/response",
        "Url_Pending": "https://dummystore.com/checkout/response"
    }
}
```

### Parámetros del Response {#response-parameters-2}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `CommerceAction` con `ActionReason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `ActionURL` con la URL del cupón. En esta URL, el pagador debe iniciar sesión en su aplicación de home banking y completar el pago. Consulte la sección [Experiencia de pago](#payment-experience) para ver el flujo de pago. 

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-1}

```json
{
    "Response": {
        "PurchaseId": 1260547,
        "Created": "2023-12-13T13:12:28.025",
        "TrxToken": null,
        "Order": "QA623",
        "Transaction": {
            "TransactionID": 1280439,
            "Created": "2023-12-13T13:12:28.025",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-12-13T16:12:28.025",
                    "Status": "Pending for Redirection",
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
        "Amount": 84860000,
        "OriginalAmount": 84860000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "ARS",
        "Description": "Compra de prueba",
        "Customer": {
            "CustomerId": 263479,
            "Created": "2023-12-13T13:12:27.663",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "eluna@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 0,
                "AddressType": 1,
                "Country": "AR",
                "State": "C",
                "AddressDetail": "Joaquin Requena 1580",
                "PostalCode": "C1054AAU",
                "City": "BsAs"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 268514,
                    "PaymentMediaId": 532,
                    "Created": "2023-12-13T16:12:27.810",
                    "LastUpdate": "2023-12-13T16:12:27.863",
                    "Brand": "Infinia",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/263479",
            "FirstName": "Erik",
            "LastName": "Luna",
            "DocNumber": "12345672",
            "DocumentTypeId": 17,
            "PhoneNumber": "24022330",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1260547",
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
            "AcquirerID": 147,
            "Name": "Infinia Redirect AR",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_25001335-2c28-46b8-82f7-29d59963e663",
            "ActionBody": null,
            "ActionSessionId": "CA_25001335-2c28-46b8-82f7-29d59963e663"
        },
        "PurchasePaymentProfileId": 268514,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {},
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "AR",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 1000
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

### Experiencia de pago {#payment-experience}
Como se ha mencionado, debe redirigir a su cliente a la URL devuelta en la respuesta (parámetro `CommerceAction.ActionURL`).

El primer paso que debe realizar su cliente es proporcionar su número **DNI/CUIT**.

<img src="/assets/InfiniaAR/InfiniaAR_01.png" alt="PrintScreen" style="width: 50%; height:auto;"><br>

A continuación, mostramos a su cliente el cupón con la información bancaria a la que debe crear la transferencia.

<img src="/assets/InfiniaAR/InfiniaAR_02.png" alt="PrintScreen" style="width: 70%; height:auto;"><br>

{{% alert title="Info" color="info"%}}
Puede personalizar este cupón para que muestre su logotipo en la parte superior. Para incluirlo, póngase en contacto con el servicio de soporte de Bamboo.
{{% /alert %}}

Una vez que su cliente complete la transferencia, podrá utilizar el botón de confirmación situado en la parte inferior de esta pantalla.

<img src="/assets/InfiniaAR/InfiniaAR_03.png" alt="PrintScreen" style="width: 50%; height:auto;">