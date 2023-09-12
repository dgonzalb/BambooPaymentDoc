---
title: "Tarjetas crédito y débito"
linkTitle: "Tarjetas crédito y débito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito o débito.
weight: 10
tags: ["subtopic"]
---

## Consideraciones {#considerations}
* **Para VISA Débito**: No es necesario estar en el programa _Verified by Visa_.<br>Al operar fuera de una wallet, debe solicitar la _Fecha de vencimiento_ y el _CVV_. Sirve como pago único por ser una tarjeta de débito. Permite cancelaciones totales y reembolsos (Totales y Parciales). No se permite operaciones en Dos Pasos (Preautorización).
* **Compras sin CVV**: Permite tokenización y recurrencia.<br>En el caso de la tokenización, la API genera un cargo por un mínimo de **ARS 3**, que se reembolsa para validar los datos del titular de la tarjeta. Con este token, es posible realizar compras sin CVV.

## Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | Token que identifica la carjeta del cliente.<br>Para más información sobre cómo crear el toke, consulte [Clientes](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/argentina.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No<sup>*</sup> | Estado del cliente.<br><sup>*</sup>_Este parámetro es requerido para calcular el impuesto de **II.BB**. Consulte [provincias](/es/docs/payment-methods/argentina.html#argentina-provinces) para saber sus valores posibles_. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |

{{% alert title="Info" color="info"%}}

Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Ejemplo del Request {#request-example}
```json
{
    "TrxToken":"OT__OjB6eMmXSzT9VZMK3yB-x_DO5YHx5QtP4jiYpVJ8SzQ_",
    "Capture":"true",
    "Amount":200000,
    "Currency":"ARS",
    "TargetCountryISO" : "AR",
    "Installments":1,
    "Order":"ORD12345",
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
    "Description" : "Compra de prueba"
}
```

## Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase-operations.md>}}#response-parameters) de la creación de la compra.

### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1167186,
        "Created": "2023-09-04T20:12:54.822",
        "TrxToken": null,
        "Order": "ORD12345",
        "Transaction": {
            "TransactionID": 1186083,
            "Created": "2023-09-04T20:12:54.822",
            "AuthorizationDate": "",
            "TransactionStatusId": 1,
            "Status": "Approved",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "Status": null,
                    "ResponseCode": "approved",
                    "ResponseMessage": "approved",
                    "Error": null,
                    "AuthorizationCode": "171259",
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 200000,
        "OriginalAmount": 200000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "ARS",
        "Description": "Compra de prueba",
        "Customer": {
            "CustomerId": 251239,
            "Created": "2023-09-04T20:11:50.973",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "eluna@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 374731,
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
                    "PaymentProfileId": 256001,
                    "PaymentMediaId": 1,
                    "Created": "2023-09-04T20:11:50.973",
                    "LastUpdate": null,
                    "Brand": "VISA",
                    "CardOwner": "Erik Luna",
                    "Bin": "450799",
                    "IssuerBank": "Santander",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": "202910",
                    "Last4": "4905",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/251239",
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
        "URL": "https://api.stage.bamboopayment.com/Purchase/1167186",
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
            "AcquirerID": 25,
            "Name": "DECIDIR",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 256001,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "AR",
            "TargetCurrencyISO": "ARS",
            "TargetAmount": 2000
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

## Tarjetas de prueba {#testing-cards}
Utilice las siguientes tarjetas para simular los diferentes estadis de ka compra.

### Para compras aprobadas {#for-approved-purchases}

| Marca | PAN | CVV | Fecha de Expiración | Detalles |
|---|---|---|---|---|
| Mastercard | `5299910010000015` | `123` | `08/30` | Sin límite de monto. |
| Visa (crédito o débito) | `4507990000004905` | `123` | `08/30` | Sin límite de monto. |
| Amex | `373953192351004` | `1234` | `08/30` | Montos: $1 o $10 |

### Para compras rechazadas {#for-rejected-purchases}

| PAN | CVV | Fecha de Expiración | Tipo de documento | Documento |
|---|---|---|---|---|
| `4304968001555104` | `617` | `12/18` | `4` - DNI | `38499826` |