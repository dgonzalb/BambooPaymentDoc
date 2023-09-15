---
title: "Medios alternativos de pago"
linkTitle: "Medios alternativos de pago"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con Cash using _Pago Express_.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Note" color="info"%}}
Solo ofrecemos soporte para comercios en Paraguay a través del modelo **Gateway**, y les enviamos la factura desde Uruguay.
{{% /alert %}}

## Pago Express
_Pago Express_ is a popular method for paying bills and services in _**Paraguay**_, offering convenience and accessibility throughout the country. The customer needs to provide the payment code in a physical branch of _Pago Express_ and complete the payment. Then, _Pago Express_ notifies us, and we report to the merchant.

## Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**27**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/paraguay.html#document-types) para ver los posibles valores. |
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
    "PaymentMediaId": 27,
    "Order": "12345678",
    "Amount": 10000,
    "TargetCountryISO": "PY",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "43800"
    },
    "Currency": "USD",
    "Capture": true,
    "Customer": {
        "FirstName": "Jaime",
        "LastName": "Benitez",
        "PhoneNumber": "090000001",
        "Email": "jbenitez@mail.com",
        "DocNumber": "1223334444",
        "DocumentTypeId": 2
    }
}
```

### Parámetros del Response {#response-parameters}
En la respuesta, se encuentra el parámetro `MetadataOut.PaymentCode` con el número de referencia de la deuda generada que el cliente debe presentar en una agencia de _Pago Express_ para pagar la deuda. Además, el parámetro `MetadataOut.PaymentExpirationDate` muestra la fecha de expiración en formato ISO 8601 (_AAAA-MM-DDTHH:MM:SS_).

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1244788,
        "Created": "2023-09-13T20:14:54.926",
        "TrxToken": null,
        "Order": "12345678",
        "Transaction": {
            "TransactionID": 1263666,
            "Created": "2023-09-13T20:14:54.927",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "0 Transaction registered in PagosWeb",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-09-13T20:14:55.753",
                    "Status": "Antifraud Approved",
                    "ResponseCode": null,
                    "ResponseMessage": null,
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                },
                {
                    "Step": "CashPaymentGetPWData",
                    "Created": "2023-09-13T20:14:55.923",
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
                    "Created": "2023-09-13T20:14:56.657",
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
        "Amount": 58233308,
        "OriginalAmount": 58233308,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "PYG",
        "Description": null,
        "Customer": {
            "CustomerId": 252569,
            "Created": "2023-09-13T20:14:54.270",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "jbenitez@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 257359,
                    "PaymentMediaId": 27,
                    "Created": "2023-09-13T20:14:54.463",
                    "LastUpdate": "2023-09-13T20:14:54.630",
                    "Brand": "PagoExpress",
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
                    "DocumentNumber": "1223334444",
                    "DocumentTypeId": 2,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/252569",
            "FirstName": "Jaime",
            "LastName": "Benitez",
            "DocNumber": "1223334444",
            "DocumentTypeId": 2,
            "PhoneNumber": "090000001",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1244788",
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
            "AcquirerID": 53,
            "Name": "Pago Express Paraguay",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 257359,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "43800"
        },
        "MetadataOut": {
            "PaymentCode": "1244788",
            "PaymentMerchantId": "772",
            "PaymentExpirationDate": "2023-10-14T03:14:54-03:00"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "PY",
            "TargetCurrencyISO": "USD",
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