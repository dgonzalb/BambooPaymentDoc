---
title: "Medios alternativos de pago"
linkTitle: "Medios alternativos de pago"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con Bank transfer and Cash methods.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
* El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago ya sea en la app de _Khipu_ o en una oficina física de pago.
* Chile no soporta montos decimales, por lo que todos los valores de monto recibidos serán redondeados.
{{% /alert %}}

## Khipu
**Khipu** permite a los clientes pagar utilizando transferencias desde sus cuentas bancarias utilizando la app de _Khipu_. El pagador puede pagar usando cuentas bancarias o la app de **Khipu** donde la experiencia de pago es mejor.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**106**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/chile.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `Redirection` → `Url_Approved` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | URL del Webhook de notificación. Se notifica a esta URL el estado de la compra una vez que el procesador del medio de pago notifica a Bamboo. La notificación a esta URL es un POST REST con payload en JSON y no una redirección. Puede ser también estática y configurada por el equipo de soporte. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

{{% alert title="Info" color="info"%}}

El objeto `Redirection` y sus parámetros no son requeridos; sin embargo, debe configurarlos para redireccionar a su cliente luego de que la transacción termine en cualquier estado.

{{% /alert %}}

#### Ejemplo del Request {#request-example}
```json
{
    "PaymentMediaId": 106,
    "Amount": 100000,
    "Currency": "CLP",
    "TargetCountryISO": "CL",
    "Customer": {
        "Email": "john@mail.com",
        "FirstName": "John"
    },
    "Redirection": {
        "Url_Approved": "https://dummystore.com/checkout/approved",
        "Url_Rejected": "https://dummystore.com/checkout/rejected",
        "Url_Canceled": "https://dummystore.com/checkout/canceled",
        "Url_Pending": "https://dummystore.com/checkout/pending",
        "Url_Notify": "https://webhook.site/9e2dff8b-cec6-4540-bd2d-feafce58a9ed"
    },
    "Description": "this is a test cash purchase"
}
```

### Parámetros del Response {#response-parameters}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `CommerceAction` con `ActionReason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `ActionURL` con la URL del servicio externo. Usted debe redireccionar al cliente a esta URL para completar el pago en la app de _**Khipu**_.

{{% alert title="Info" color="info"%}}
Si se solicitan RUT y contraseña durante las pruebas, utilice un RUT válido (por ejemplo **11.111.111-1**) y contraseña **123**.
{{% /alert %}}

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase-operations.md>}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1133795,
        "Created": "2023-08-31T18:16:22.993",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1152709,
            "Created": "2023-08-31T18:16:22.993",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-08-31T21:16:22.993",
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
        "Amount": 100000,
        "OriginalAmount": 100000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "CLP",
        "Description": "this is a test cash purchase",
        "Customer": {
            "CustomerId": 250646,
            "Created": "2023-08-31T18:16:22.210",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "john@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 255394,
                    "PaymentMediaId": 106,
                    "Created": "2023-08-31T21:16:22.367",
                    "LastUpdate": "2023-08-31T21:16:22.777",
                    "Brand": "Khipu",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/250646",
            "FirstName": "John",
            "LastName": null,
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
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133795",
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
            "AcquirerID": 47,
            "Name": "Khipu Redirect",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_f1696826-3607-47ef-adba-94291876758b",
            "ActionBody": null,
            "ActionSessionId": "CA_f1696826-3607-47ef-adba-94291876758b"
        },
        "PurchasePaymentProfileId": 255394,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CL",
            "TargetCurrencyISO": "CLP",
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

## Klap Efectivo
Con **Klap efectivo**, sus clientes pueden generar un cupón y completar el pago en una oficina de pago física.

### Parámetros del Request {#request-parameters-1}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**107**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/Chile.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `Redirection` → `Url_Approved` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | URL del Webhook de notificación. Se notifica a esta URL el estado de la compra una vez que el procesador del medio de pago notifica a Bamboo. La notificación a esta URL es un POST REST con payload en JSON y no una redirección. Puede ser también estática y configurada por el equipo de soporte. |

#### Ejemplo del Request {#request-example-1}
```json
{
    "PaymentMediaId": 107,
    "Amount":500000,
    "Currency":"CLP",
    "TargetCountryISO" : "CL",
    "Customer": {
        "Email": "john@mail.com"
    },
    "Redirection": {
        "Url_Approved": "https://dummystore.com/checkout/approved",
        "Url_Rejected": "https://dummystore.com/checkout/rejected",
        "Url_Canceled": "https://dummystore.com/checkout/canceled",
        "Url_Pending": "https://dummystore.com/checkout/pending",
        "Url_Notify": "https://webhook.site/9e2dff8b-cec6-4540-bd2d-feafce58a9ed"
    },
    "Description":"this is a test cash purchase"
}
```

### Parámetros del Response {#response-parameters-1}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `CommerceAction` con `ActionReason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `ActionURL` con la URL del servicio externo. Se debe redirigir al cliente a esta URL para permitirle generar el cupón y completar el pago en una oficina de _**Klap**_.

![PrintScreen](/assets/Klap.png)

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase-operations.md>}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-1}

```json
{
    "Response": {
        "PurchaseId": 1133799,
        "Created": "2023-08-31T18:29:17.380",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1152713,
            "Created": "2023-08-31T18:29:17.380",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-08-31T21:29:17.380",
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
        "Amount": 500000,
        "OriginalAmount": 500000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "CLP",
        "Description": "this is a test cash purchase",
        "Customer": {
            "CustomerId": 88230,
            "Created": "2022-12-08T08:30:35.933",
            "CommerceCustomerId": null,
            "Owner": "Commerce",
            "Email": "John@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 88894,
                "AddressType": 2,
                "Country": "COL",
                "State": "Antioquia",
                "AddressDetail": "Carrera 80 #30 - 20",
                "PostalCode": null,
                "City": "Medellin"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 95561,
                    "PaymentMediaId": 107,
                    "Created": "2023-02-16T18:22:37.597",
                    "LastUpdate": "2023-08-31T21:29:16.617",
                    "Brand": "Multicaja",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "PhysicalNetwork",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": null,
                    "Last4": "",
                    "Enabled": false,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                },
                {
                    "PaymentProfileId": 101557,
                    "PaymentMediaId": 2,
                    "Created": "2023-05-24T21:35:14.387",
                    "LastUpdate": "2023-05-24T21:40:30.700",
                    "Brand": "MasterCard",
                    "CardOwner": "John Doe",
                    "Bin": "529991",
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "CreditCard",
                    "IdCommerceToken": 40604,
                    "Token": "CT__uYBBUihIydvI--7Pyl8U665OfY_kbX2GGUsAV93Sj0k_",
                    "Expiration": "203008",
                    "Last4": "0015",
                    "Enabled": true,
                    "DocumentNumber": "74857601",
                    "DocumentTypeId": 2,
                    "ExternalValue": "0224d9a155f229d17a966c8f331978dd06df92dcc305fddb9535befe8d7bf999",
                    "AffinityGroup": null
                },
                {
                    "PaymentProfileId": 252287,
                    "PaymentMediaId": 1,
                    "Created": "2023-07-31T18:23:43.257",
                    "LastUpdate": "2023-07-31T18:23:43.257",
                    "Brand": "VISA",
                    "CardOwner": "Jhon Doe",
                    "Bin": "405188",
                    "IssuerBank": "Visa",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
                    "Type": "CreditCard",
                    "IdCommerceToken": 41630,
                    "Token": "CT__01dPtulDMY-yaNLK0D4isQhI2h7Angq5R5aAyNExBiM_",
                    "Expiration": "202912",
                    "Last4": "6623",
                    "Enabled": true,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": "https://api.stage.bamboopayment.com/v1/Capture/",
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/88230",
            "FirstName": "John",
            "LastName": "Doe",
            "DocNumber": "139899768",
            "DocumentTypeId": 4,
            "PhoneNumber": "12345672",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133799",
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
            "AcquirerID": 49,
            "Name": "Multicaja Redirect",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_c3939722-8c71-437d-a368-3b0349335233",
            "ActionBody": null,
            "ActionSessionId": "CA_c3939722-8c71-437d-a368-3b0349335233"
        },
        "PurchasePaymentProfileId": 95561,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CL",
            "TargetCurrencyISO": "CLP",
            "TargetAmount": 5000
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