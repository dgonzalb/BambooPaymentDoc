---
title: "Tarjetas crédito"
linkTitle: "Tarjetas crédito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito.
weight: 10
tags: ["subtopic"]
---

## Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | Token que identifica la tarjeta del cliente.<br>Para más información sobre cómo crear el token, consulte [Clientes](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/brazil.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | Sí | Estado del cliente.<br>Consulte [estados de residencia](/es/docs/payment-methods/brazil.html#customers-state-of-residence) to know its posibles valores. |
| `Customer` → `BillingAddress` → `City` | `string` | Sí | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | Sí | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | Sí | Código postal del cliente. No utilice guiones. |

{{% alert title="Info" color="info"%}}

Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Ejemplo del Request {#request-example}
```json
{
    "TrxToken": "OT__xQytfkLJWa099yCweV_bB2710dGJ_JMB4jiYpVJ8SzQ_",
    "Amount": 5000,
    "Order": "2572023",
    "Currency": "BRL",
    "Capture": true,
    "Installments": 0,
    "TargetCountryISO" : "BR",
    "Customer": {
        "Email": "breno@mail.com.br",
        "FirstName": "Breno",
        "LastName": "Barbieri",
        "DocNumber": "10058494715",
        "DocumentTypeId": 24,
        "PhoneNumber": "27998764488",
        "BillingAddress": {
            "AddressDetail": "Avenida Anisio Fernandes Coelho, 661 ",
            "PostalCode": "29060670",
            "City": "Vitoria",
            "State": "ES",
            "Country": "Brasil"
        }
    },
    "Description": "Kommo order #2572023"
}
```

## Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1133663,
        "Created": "2023-08-31T15:42:31.105",
        "TrxToken": null,
        "Order": "2572023",
        "Transaction": {
            "TransactionID": 1152559,
            "Created": "2023-08-31T15:42:31.107",
            "AuthorizationDate": "2023-08-31T15:42:34.420",
            "TransactionStatusId": 1,
            "Status": "Approved",
            "ErrorCode": null,
            "Description": "200 PC",
            "ApprovalCode": "12345",
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-08-31T15:42:32.250",
                    "Status": "Antifraud Approved",
                    "ResponseCode": null,
                    "ResponseMessage": null,
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                },
                {
                    "Step": "Generic step for microservices",
                    "Created": "2023-08-31T15:42:34.380",
                    "Status": "Authorization OK",
                    "ResponseCode": "200",
                    "ResponseMessage": "PC",
                    "Error": null,
                    "AuthorizationCode": "12345",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{\"order\":\"1133663\",\"order_status\":\"PC\",\"authorization_code\":\"12345\",\"error_code\":null}"
                }
            ]
        },
        "Capture": true,
        "Amount": 5000,
        "OriginalAmount": 5000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "BRL",
        "Description": "Kommo order #2572023",
        "Customer": {
            "CustomerId": 250580,
            "Created": "2023-08-31T15:42:21.197",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "breno@mail.com.br",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 374311,
                "AddressType": 2,
                "Country": "Brasil",
                "State": "ES",
                "AddressDetail": "Avenida Anisio Fernandes Coelho, 661 ",
                "PostalCode": "29060670",
                "City": "Vitoria"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 255321,
                    "PaymentMediaId": 1,
                    "Created": "2023-08-31T15:42:21.197",
                    "LastUpdate": null,
                    "Brand": "VISA",
                    "CardOwner": "Bruno Rugeiro",
                    "Bin": "498412",
                    "IssuerBank": "Visa",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": "202912",
                    "Last4": "1234",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/250580",
            "FirstName": "Breno",
            "LastName": "Barbieri",
            "DocNumber": "10058494715",
            "DocumentTypeId": 24,
            "PhoneNumber": "27998764488",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133663",
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
            "AcquirerID": 70,
            "Name": "PagBrasil",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255321,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "BR",
            "TargetCurrencyISO": "BRL",
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

## Tarjetas de prueba {#testing-cards}
Utilice las siguientes tarjetas para simular los diferentes estados de la compra.

| Marca | PAN | CVV | Fecha de Expiración |
|---|---|---|---|
| Mastercard | `5555666677778884` |  `123` | `12/29` |
| Visa | `4984123412341234` |  `123` | `12/29` |
| Diners | `30111122223331` |  `123` | `12/29` |
| Amex | `376411112222331` |  `1234` | `12/29` |
| Hipercard | `6062111122223339` |  `123` | `12/29` |
| Elo | `6362970000457013` |  `123` | `12/29` |