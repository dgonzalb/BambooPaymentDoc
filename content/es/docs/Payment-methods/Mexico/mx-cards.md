---
title: "Tarjetas crédito y débito"
linkTitle: "Tarjetas crédito y débito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito o débito.
weight: 10
tags: ["subtopic"]
---

Cuanto utilice tarjetas, el pagador debe ser redireccionado a la página de captura de tarjeta para finalizar el pago.

El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago. Haga clic [aquí]({{< ref Redirect-Purchase.md >}}) para aprender más acerca de compras por redirect.

## Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**111**_. |
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
| `Redirection` → `Url_Approved` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | URL del Webhook de notificación. Se notifica a esta URL el estado de la compra una vez que el procesador del medio de pago notifica a Bamboo. La notificación a esta URL es un POST REST con payload en JSON y no una redirección. Puede ser también estática y configurada por el equipo de soporte. |
| `AntifraudData` → `AntifraudFingerprintId` | `string` | Sí | Session Id (`AntifraudFingerprintId`) que se obtiene por medio de la función JavaScript [getSessionAntifraud]({{< ref Antifraud.md>}}#getsessionantifraud). |
| `CustomerIP` | `string` | Sí | IP correspondiente al cliente conectado al sitio web del comercio. |

{{% alert title="Info" color="info"%}}

* El objeto `Redirection` y sus parámetros no son requeridos; sin embargo, debe configurarlos para redireccionar a su cliente luego de que la transacción termine en cualquier estado.

{{% /alert %}}

### Ejemplo del Request {#request-example}
```json
{
    "PaymentMediaId": 111,
    "Amount": 10000,
    "TargetCountryISO": "MX",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "MXN",
    "Capture": true,
    "Customer": {
        "FirstName": "John",
        "LastName": "Doe",
        "Email": "john@mail.com"
    },
    "Redirection": {
        "Url_Approved": "https://dummystore.com/checkout/approved",
        "Url_Rejected": "https://dummystore.com/checkout/rejected",
        "Url_Canceled": "https://dummystore.com/checkout/canceled",
        "Url_Pending": "https://dummystore.com/checkout/pending"
    },
    "AntifraudData": {
        "AntifraudFingerprintId": "8110f7f0-5fbe-43ae-813c-1392b5346ec2"
    },
    "CustomerIP": "127.0.0.1"
}
```

## Parámetros del Response {#response-parameters}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `CommerceAction` con `ActionReason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `ActionURL` con la URL del servicio externo. Usted debe redireccionar al cliente a esta URL para completar el pago en la página de captura de la tarjeta.

![PrintScreen](/assets/OpenPayCards.png)

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase-operations.md>}}#response-parameters) de la creación de la compra.

### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1134176,
        "Created": "2023-09-01T13:38:00.996",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1153076,
            "Created": "2023-09-01T13:38:00.996",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-09-01T16:38:00.996",
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
        "Amount": 10000,
        "OriginalAmount": 10000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": null,
        "Customer": {
            "CustomerId": 250915,
            "Created": "2023-09-01T13:38:00.293",
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
                    "PaymentProfileId": 255666,
                    "PaymentMediaId": 111,
                    "Created": "2023-09-01T16:38:00.410",
                    "LastUpdate": "2023-09-01T16:38:00.817",
                    "Brand": "OpenPayCard",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "CreditCard",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/250915",
            "FirstName": "John",
            "LastName": "Doe",
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
        "CustomerIP": "127.0.0.1",
        "URL": "https://api.stage.bamboopayment.com/Purchase/1134176",
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
            "AcquirerID": 64,
            "Name": "OpenPay Card",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_7bfa238a-b1a0-4feb-8fe8-37165dc6f276",
            "ActionBody": null,
            "ActionSessionId": "CA_7bfa238a-b1a0-4feb-8fe8-37165dc6f276"
        },
        "PurchasePaymentProfileId": 255666,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "MXN",
            "TargetAmount": 100
        },
        "Redirection": null,
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {
            "AntifraudFingerprintId": "8110f7f0-5fbe-43ae-813c-1392b5346ec2",
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

## Tarjetas de prueba {#testing-cards}
Utilice las siguientes tarjetas para simular los diferentes estados de la compra.

| Marca | PAN | CVV | Fecha de Expiración |
|---|---|---|---|
| Visa | `4111111111111111` | `123` | `10/29` |
| Visa | `4242424242424242` | `123` | `10/29` |
| MasterCard | `5555555555554444` | `123` | `10/29` |
| MasterCard | `5105105105105100` | `123` | `10/29` |
| Amex | `345678000000007` | `1234` | `10/29` |
| Amex | `341111111111111` | `1234` | `10/29` |
| Amex | `343434343434343` | `1234` | `10/29` |
| Carnet | `5062541600005232` | `123` | `10/29` |
| Carnet | `5064050100000063` | `123` | `10/29` |
| Carnet | `5064510000300020` | `123` | `10/29` |