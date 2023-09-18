---
title: "Pagos en Efectivo"
linkTitle: "Pagos en Efectivo"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos en efectivo.
weight: 20
tags: ["subtopic"]
---

## PuntoXpress
_PuntoXpress_ es una red de cobro en efectivo con cobertura regional en América Central. Cuando los clientes de las plataformas de comercio electrónico realizan compras en sus sitios web, el comercio nos solicita que generemos una deuda. Posteriormente, el cliente acude a un punto de cobro de _PuntoXpress_, comprueba la deuda asociada a la referencia y realiza el pago. Luego, _PuntoXpress_ nos notifica y nosotros reportamos al comercio.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**28**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/central-america.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure la validez de la deuda generada utilizando este campo, especificando la duración en minutos. La API aplica un valor por defecto si no proporciona esta información. |

#### Ejemplo del Request {#request-example}
```json
{
    "PaymentMediaId": 28,
    "Amount": 10000,
    "Currency": "CRC",
    "TargetCountryISO": "CR",
    "Capture": true,
    "Customer": {
        "Email": "john@mail.com",
        "FirstName": "John",
        "LastName": "Doe",
        "PhoneNumber": "12345672",
        "DocNumber": "139899768",
        "DocumentTypeId": 30
    },
    "Description": "Prueba PuntoXpress"
}
```

### Parámetros del Response {#response-parameters}
En la respuesta, se encuentra el parámetro `MetadataOut.PaymentCode` con el número de referencia de la deuda generada que el cliente debe presentar en una agencia de `PuntoXpress` para pagar la deuda. Además, el parámetro `MetadataOut.PaymentExpirationDate` muestra la fecha de expiración en formato ISO 8601 (_AAAA-MM-DDTHH:MM:SS_).

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1133713,
        "Created": "2023-08-31T17:46:23.014",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1152618,
            "Created": "2023-08-31T17:46:23.013",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "0 Transaction registered in PagosWeb",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "CashPaymentGetPWData",
                    "Created": "2023-08-31T17:46:23.220",
                    "Status": "PhysicalNetwork GetData",
                    "ResponseCode": "0",
                    "ResponseMessage": null,
                    "Error": "",
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                },
                {
                    "Step": "CashPayment Authorization",
                    "Created": "2023-08-31T17:46:23.907",
                    "Status": "PhysicalNetwork Pending",
                    "ResponseCode": "0",
                    "ResponseMessage": "Transaction registered in PagosWeb",
                    "Error": "",
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 10000,
        "OriginalAmount": 10000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "CRC",
        "Description": "Prueba PuntoXpress",
        "Customer": {
            "CustomerId": 88230,
            "Created": "2022-12-08T11:30:35.933",
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
            "DocumentTypeId": 30,
            "PhoneNumber": "12345672",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133713",
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
            "AcquirerID": 57,
            "Name": "Punto Xpress CostaRica",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255349,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": {
            "PaymentCode": "1133713",
            "PaymentMerchantId": "772",
            "PaymentExpirationDate": "2023-09-01T14:46:23-03:00"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CR",
            "TargetCurrencyISO": "CRC",
            "TargetAmount": 100
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