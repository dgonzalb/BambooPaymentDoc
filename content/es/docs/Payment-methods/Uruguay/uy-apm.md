---
title: "Medios alternativos de pago"
linkTitle: "Medios alternativos de pago"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con cash and Bank transfers.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago either in their bank app or at a physical payment office.
{{% /alert %}}

## Cash
The Cash payment method allows your customers to generate a coupon and complete the payment in a physical payment office.

### Cash acquirers

<div id="shortTable"></div>

| | Payment MediaId | Acquirer |
|-----|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Abitab_PhysicalNetwork.png"  width="52" /> | 5 | Abitab |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/RedPagos_PhysicalNetwork.png"  width="52" /> | 10 | RedPagos<br>_If you are in Gateway model._ |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/RedPagos_PhysicalNetwork.png"  width="52" /> | 65 | RedPagos Payfac<br>_If you are in PayFac model._ |

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | Send the `PaymentMediaId` according to the selected Cash acquirer in this [table](#cash-acquirers). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/uruguay.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, el API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example}
```json
{
    "PaymentMediaId": 10,
    "Order": "ORD1",
    "Amount": 2000,
    "Description":"Test transaction",
    "TargetCountryISO": "UY",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "UYU",
    "Capture": true,
    "Customer": {
        "Email": "testuser@mail.com",
        "BillingAddress": {
          "AddressType": 1,
          "Country": "Uruguay",
          "State": "Montevideo",
          "City": "Montevideo",
          "AddressDetail": "La Paz 1020"
        },
        "FirstName" : "Mark",
        "LastName": "Doe",
        "DocNumber" : "12345672",
        "DocumentTypeId": 2,
        "PhoneNumber" : "099111222"
    },
}
```

### Parámetros del Response {#response-parameters}
The response returns the coupon in _PDF_ format that the client must present in the agency in order to pay the generated debt, in the `MetadataOut.PaymentBarcodeUrl` parameter:

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase-operations.md>}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example} 
```json
{
    "Response": {
        "PurchaseId": 1131112,
        "Created": "2023-08-16T20:39:35.973",
        "Order": "ORD1",
        "Transaction": {
            "TransactionID": 1149013,
            "Created": "2023-08-16T20:39:35.973",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "Description": " ",
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "ResponseCode": "0",
                    "ResponseMessage": "Transaction registered in PagosWeb",
                    "AcquirerResponseDetail": "{\"TransactionIdFromPW\":\"190511\",\"PaymentBarcodeUrl\":\"Https://gateway.stage.bamboopayment.com/purchase-coupons/PW_190511_20230817.pdf\"}"
                }
            ]
        },
        "Capture": true,
        "Amount": 2000,
        "OriginalAmount": 2000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "UYU",
        "Description": "Transaccion de prueba redpagos",
        "Customer": {
            "CustomerId": 248794,
            "Created": "2023-08-16T20:39:35.000",
            "Owner": "Anonymous",
            "Email": "fsum@mail.com",
            "Enabled": true,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 253461,
                    "PaymentMediaId": 10,
                    "Created": "2023-08-16T20:39:35.110",
                    "LastUpdate": "2023-08-16T20:39:35.613",
                    "Brand": "RedPagos",
                    "Type": "PhysicalNetwork",
                    "IdCommerceToken": 0,
                    "Last4": "",
                    "DocumentNumber": "12345672",
                    "DocumentTypeId": 2
                }
            ],
            "URL": "https://api.stage.bamboopayment.com/Customer/248794",
            "FirstName": "Rose",
            "LastName": "Astrid",
            "DocNumber": "12345672",
            "DocumentTypeId": 2,
            "PhoneNumber": "099111222"
        },
        "URL": "https://api.stage.bamboopayment.com/Purchase/1131112",
        "DataUY": {
            "IsFinalConsumer": false,
            "TaxableAmount": 0
        },
        "DataDO": {
            "Tax": 0
        },
        "Acquirer": {
            "AcquirerID": 71,
            "Name": "RedPagosPayFac"
        },
        "PurchasePaymentProfileId": 253461,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "TransactionIdFromPW": "190511",
            "PaymentBarcodeUrl": "Https://gateway.stage.bamboopayment.com/purchase-coupons/PW_190511_20230817.pdf"
        },
        "CrossBorderDataResponse": {
            "TargetCountryISO": "UY",
            "TargetCurrencyISO": "UYU",
            "TargetAmount": 20
        },
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {},
        "PurchaseType": 1
    },
    "Errors": []
}
```

## Bank transfers
The flow of this payment method is _**Redirect**_, so the customer is required to be directed to another page where they will complete the payment. In the [Parámetros del Response {#response-parameters} sections](#response-parameters-1) you can find the parameter of the redirection URL. For more information refer to [Redirect purchase]({{< ref Redirect-Purchase.md >}}).

### Supported banks
You can offer to your customers the possibility to pay using bank transfers if the customer's account is in the following banks:

<div id="shortTable"></div>

| | Payment MediaId | Bank |
|-----|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.stage.bamboopayment.com/payment-method-logos/E-Brou_BankTransfer.png" alt="CASH" width="52" style="" /> | 101 | E-Brou |
| <img src="https://s3.amazonaws.com/gateway.stage.bamboopayment.com/payment-method-logos/Santander_BankTransfer.png" alt="CASH" width="52" style="" /> | 102 | Santander |
| <img src="https://s3.amazonaws.com/gateway.stage.bamboopayment.com/payment-method-logos/Scotiabank_BankTransfer.png" alt="Diners" width="52" style="" /> | 104 | Scotiabank |
| <img src="https://s3.amazonaws.com/gateway.stage.bamboopayment.com/payment-method-logos/Itau_BankTransfer.png" alt="CASH" width="52" style="" /> | 105 | Itau |

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | Send the `PaymentMediaId` according to the Customer's bank in the [Supported Banks table](#supported-banks). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/uruguay.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `sourceReference` | `string` | No | This field is used to configure a Bank reference for the customer. |
| `MetaDataIn` → `destinationReference` | `string` | No | This field is used to configure a bank reference for the merchant. The API applies a default value if you don't provide this information. |
| `MetaDataIn` → `externalReference` | `string` | No | This field is used to configure a external reference of the system who invokes the API. |

#### Ejemplo del Request {#request-example}
```json
{
    "PaymentMediaId": 105,
    "Order":"QA464",
    "Capture":"true",
    "Amount":35,
    "Installments":1,
    "Currency":"USD",
    "TargetCountryISO" : "UY",
    "Description" : "Test Purchase",
    "Customer": {
        "Email": "testuser@mail.com",
        "BillingAddress": {
          "AddressType": 1,
          "Country": "Uruguay",
          "State": "Montevideo",
          "City": "Montevideo",
          "AddressDetail": "La Paz 1020"
        },
        "FirstName" : "Mark",
        "LastName": "Doe",
        "DocNumber" : "12345672",
        "DocumentTypeId": 2,
        "PhoneNumber" : "099111222"
    },
    "MetaDataIn" : {
        "externalReference" : "External reference test",
        "sourceReference": "Source reference test",
        "destinationReference" : "Destination reference test"
    }
}
```

### Parámetros del Response {#response-parameters}
As you need to redirect your customer to an external page to complete the payment, you can find the redirection URL in the `MetadataOut.ActionURL` parameter.

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase-operations.md>}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example}
```json
{
    "Response": {
        "PurchaseId": 141588,
        "Created": "2023-05-26T16:56:23.456",
        "TrxToken": null,
        "Order": "QA464",
        "Transaction": {
            "TransactionID": 152261,
            "Created": "2023-05-26T16:56:23.456",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-05-26T19:56:23.456",
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
        "Amount": 1383,
        "OriginalAmount": 1383,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "UYU",
        "Description": "Test Purchase",
        "Customer": {
            "CustomerId": 62928,
            "Created": "2023-05-26T16:56:22.857",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "testuser@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 0,
                "AddressType": 1,
                "Country": "Uruguay",
                "State": "Montevideo",
                "AddressDetail": "La Paz 1020",
                "PostalCode": null,
                "City": "Montevideo"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 64785,
                    "PaymentMediaId": 105,
                    "Created": "2023-05-26T19:56:22.880",
                    "LastUpdate": "2023-05-26T19:56:22.927",
                    "Brand": "Itau",
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
            "URL": "https://devapi.siemprepago.com/v1/api/Customer/62928",
            "FirstName": "Mark",
            "LastName": "Doe",
            "DocNumber": "12345672",
            "DocumentTypeId": 2,
            "PhoneNumber": "099111222",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://devapi.siemprepago.com/v1/api/Purchase/141588",
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
            "AcquirerID": 102,
            "Name": "Infinia Redirect",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.dev.bamboopayment.com/CA_04079e7b-8b27-45bb-8881-c940566fc9e6",
            "ActionBody": null,
            "ActionSessionId": "CA_04079e7b-8b27-45bb-8881-c940566fc9e6"
        },
        "PurchasePaymentProfileId": 64785,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "externalReference": "External reference test",
            "sourceReference": "Source reference test",
            "destinationReference": "Destination reference test"
        },
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "UY",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 0.35
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