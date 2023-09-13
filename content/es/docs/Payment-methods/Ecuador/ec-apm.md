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

## PagoEfectivo Ecuador
**PagoEfectivo** provides a network of physical payment centers where your customers can pay their purchases in cash or using their bank app. Your customer can pay giving the debt identifier (CIP) in a physical payment office or using their bank app. 

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**29**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/ecuador.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. The phone number format must be `<characteristic>\|<number>`. Ejemplo: `+593\|971516229`. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, el API asignará un valor por defecto.<br>The expiration date must be at least 10 minutes and less than six months from the current date (in UTC GMT -5). |

#### Ejemplo del Request {#request-example}
```json
{
    "PaymentMediaId": "29",
    "Amount": 1000,
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "USD",
    "TargetCountryISO": "EC",
    "Capture": true,
    "Customer": {
        "Email": "lvargas@mail.com",
        "FirstName": "Luis",
        "LastName": "Vargas",
        "PhoneNumber": "+593|971516229",
        "DocNumber": "12345672",
        "DocumentTypeId": 10
    },
    "Description": "Prueba Ecuador Cash"
}
```

### Parámetros del Response {#response-parameters}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Código de pago generado por **PagoEfectivo**. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Date when the CIP will expire.<br>Format _ISO 8601_. |
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL of the HTML document of the CIP. |

![PrintScreen](/assets/PagoEfectivoEC.png)

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 6820007,
        "Created": "2023-06-16T13:30:33.527",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 10597785,
            "Created": "2023-06-16T13:30:33.527",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Pago Efectivo Ecuador Get Token",
                    "Created": "2023-06-16T13:30:33.760",
                    "Status": "Get Token OK",
                    "ResponseCode": "100",
                    "ResponseMessage": "Solicitud exitosa.",
                    "Error": "",
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                },
                {
                    "Step": "Pago Efectivo Ecuador Generate CIP",
                    "Created": "2023-06-16T13:30:33.840",
                    "Status": "PhysicalNetwork Pending",
                    "ResponseCode": "100",
                    "ResponseMessage": "Solicitud exitosa.",
                    "Error": "",
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{'code':'100','message':'Solicitud exitosa.','cip':'166358610','operationNumber':null}"
                }
            ]
        },
        "Capture": true,
        "Amount": 1000,
        "OriginalAmount": 1000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "USD",
        "Description": "Prueba Ecuador Cash",
        "Customer": {
            "CustomerId": 2989883,
            "Created": "2023-06-16T13:30:32.383",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "lvargas@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 2980262,
                    "PaymentMediaId": 29,
                    "Created": "2023-06-16T13:30:32.400",
                    "LastUpdate": "2023-06-16T13:30:32.727",
                    "Brand": "PagoEfectivoEcuador",
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
                    "DocumentNumber": "12345672",
                    "DocumentTypeId": 10,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.siemprepago.com/v1/api/Customer/2989883",
            "FirstName": "Luis",
            "LastName": "Vargas",
            "DocNumber": "12345672",
            "DocumentTypeId": 10,
            "PhoneNumber": "+593|971516229",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.siemprepago.com/v1/api/Purchase/6820007",
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
            "AcquirerID": 67,
            "Name": "Pago Efectivo Ecuador",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 2980262,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "PaymentCode": "166358610",
            "PaymentExpirationDate": "2023-06-17T08:30:33-05:00",
            "PaymentUrl": "https://payment.pagoefectivo.pe/A222B8A6-740A-4E75-8431-CA3B3E873180.html"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "EC",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 10.0
        },
        "Redirection": null,
        "AntifraudData": null,
        "PaymentMediaId": null,
        "TargetCountryISO": null,
        "PurchaseType": 1,
        "IsFirstRecurrentPurchase": false
    },
    "Errors": []
}
```