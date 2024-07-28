---
title: "Tarjetas crédito y débito"
linkTitle: "Tarjetas crédito y débito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito o débito.
weight: 10
tags: ["subtopic"]
---

Puede crear la compra utilizando el flujo [API](#card-payments-using-api-flow) o [Redirect](#card-payments-using-redirection-flow).

## Pagos con tarjeta mediante flujo API {#card-payments-using-api-flow}
Utilizando este flujo, puede ofrecer la posibilidad de recibir pagos con tarjetas sin la intervención del pagador.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | Token que identifica la tarjeta del cliente.<br>Para más información sobre cómo crear el token, consulte [Clientes](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Installments` | `integer` | No | Este parámetro se refiere al número de pagos en que se divide una compra con tarjeta de crédito. Puede seleccionar `1`, `3`, `6`, `9` y `12` cuotas.<br>El valor por defecto es `1`. |
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
| `AntifraudData` → `AntifraudFingerprintId` | `string` | Sí | Session Id (`AntifraudFingerprintId`) que se obtiene por medio de la función JavaScript [getSessionAntifraud]({{< ref Antifraud.md>}}#getsessionantifraud). |
| `CustomerIP` | `string` | Sí | IP correspondiente al cliente conectado al sitio web del comercio. |

{{% alert title="Info" color="info"%}}

Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).

{{% /alert %}}

#### Ejemplo del Request {#request-example}
```json
{
    "TrxToken": "OT__WYNtlJ5DPsSaxvloz6E4cbF7mUfOFNAa4jiYpVJ8SzQ_",
    "Capture": true,
    "Order": "20201229",
    "Amount": "10000",
    "CustomerIP": "127.0.0.1",
    "Currency": "USD",
    "TargetCountryISO": "MX",
    "Installments": 1,
    "Customer": {
        "FirstName": "John",
        "LastName": "Doe",
        "Email": "john@mail.com"
    },
    "AntifraudData": {
        "AntifraudFingerprintId": "26109388-1911-4a6c-84dc-212784f3f9d7"
    }
}
```

### Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase-operations.md>}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 148353,
        "Created": "2023-10-12T13:41:51.503",
        "TrxToken": null,
        "Order": "20201229",
        "Transaction": {
            "TransactionID": 159259,
            "Created": "2023-10-12T13:41:51.503",
            "AuthorizationDate": "",
            "TransactionStatusId": 1,
            "Status": "Approved",
            "ErrorCode": null,
            "Description": "",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-10-12T13:42:02.499",
                    "Status": null,
                    "ResponseCode": "0",
                    "ResponseMessage": "Authorization ",
                    "Error": null,
                    "AuthorizationCode": "801585",
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 142430,
        "OriginalAmount": 142430,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": null,
        "Customer": {
            "CustomerId": 70124,
            "Created": "2023-10-12T13:41:41.857",
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
                    "PaymentProfileId": 71943,
                    "PaymentMediaId": 1,
                    "Created": "2023-10-12T13:41:41.857",
                    "LastUpdate": null,
                    "Brand": "VISA",
                    "CardOwner": "Rodrigo Gutierrez",
                    "Bin": null,
                    "IssuerBank": "Visa",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": "202512",
                    "Last4": "4242",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://devapi.siemprepago.com/v1/api/Customer/70124",
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
        "URL": "https://devapi.siemprepago.com/v1/api/Purchase/148353",
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
            "AcquirerID": 144,
            "Name": "OpenPayCardApi",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 71943,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 100.0
        },
        "Redirection": null,
        "AntifraudData": {
            "AntifraudFingerprintId": "26109388-1911-4a6c-84dc-212784f3f9d7",
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