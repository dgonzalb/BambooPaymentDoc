---
title: "Medios alternativos de pago"
linkTitle: "Medios alternativos de pago"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con **PagoEfectivo**.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for Medios alternativos de pago will remain _Pending_ until the customer completes the payment.
{{% /alert %}}

## PagoEfectivo Perú
**PagoEfectivo** provides a network of physical payment centers where your customers can pay their purchases in cash or using their bank app. Your customer can pay giving the debt identifier (CIP) in a physical payment office or using their bank app. 

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**26**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/peru.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. The phone number format must be `<characteristic>\|<number>`. Ejemplo: `+51\|971516229`. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, el API asignará un valor por defecto.<br>The expiration date must be at least 10 minutes and less than six months from the current date (in UTC GMT -5). |

#### Ejemplo del Request {#request-example}
```json
{
    "PaymentMediaId": "26",
    "Amount": 1000,
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "PEN",
    "TargetCountryISO": "PE",
    "Capture": true,
    "Customer": {
        "Email": "rguerrero@mail.com",
        "FirstName": "Rodrigo",
        "LastName": "Guerrero",
        "PhoneNumber": "+51|971516229",
        "DocNumber": "46701208",
        "DocumentTypeId": 6
    },
    "Description": "Prueba Peru efectivo"
}
```

### Parámetros del Response {#response-parameters}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Código de pago generado por **PagoEfectivo**. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Date when the CIP will expire.<br>Format _ISO 8601_. |
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL of the HTML document of the CIP. |

![PrintScreen](/assets/PagoEfectivoPE.png)

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1134346,
        "Created": "2023-09-01T20:08:12.328",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1153224,
            "Created": "2023-09-01T20:08:12.327",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "100 Solicitud exitosa.",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Pago Efectivo Get Token",
                    "Created": "2023-09-01T20:08:13.940",
                    "Status": "Get Token OK",
                    "ResponseCode": "100",
                    "ResponseMessage": "Solicitud exitosa.",
                    "Error": "",
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                },
                {
                    "Step": "Pago Efectivo Generate CIP",
                    "Created": "2023-09-01T20:08:14.267",
                    "Status": "PhysicalNetwork Pending",
                    "ResponseCode": "100",
                    "ResponseMessage": "Solicitud exitosa.",
                    "Error": "",
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{'code':'100','message':'Solicitud exitosa.','cip':'1344682','operationNumber':null}"
                }
            ]
        },
        "Capture": true,
        "Amount": 1000,
        "OriginalAmount": 1000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "PEN",
        "Description": "Prueba Peru efectivo",
        "Customer": {
            "CustomerId": 251048,
            "Created": "2023-09-01T20:08:11.420",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "rguerrero@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 255802,
                    "PaymentMediaId": 26,
                    "Created": "2023-09-01T20:08:11.527",
                    "LastUpdate": "2023-09-01T20:08:11.910",
                    "Brand": "PagoEfectivoPeru",
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
                    "DocumentNumber": "46701208",
                    "DocumentTypeId": 6,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/251048",
            "FirstName": "Rodrigo",
            "LastName": "Guerrero",
            "DocNumber": "46701208",
            "DocumentTypeId": 6,
            "PhoneNumber": "+51|971516229",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1134346",
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
            "AcquirerID": 35,
            "Name": "PagoEfectivo Perú",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255802,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "PaymentCode": "1344682",
            "PaymentExpirationDate": "2023-09-02T15:08:13-05:00",
            "PaymentUrl": "https://pre1a.payment.pagoefectivo.pe/9814A6D7-2EE8-47BC-84B9-505DE4E7492E.html"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "PE",
            "TargetCurrencyISO": "PEN",
            "TargetAmount": 10
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