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
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago ya sea en su aplicación bancaria o en una oficina física de pago.
{{% /alert %}}

## Efectivo {#cash}
El método de pago en efectivo permite a sus clientes generar un cupón y completar el pago en una oficina de pago física.

## Redes de pago en efectivo {#cash-acquirers}

<div id="shortTable"></div>

| | Payment MediaId | Acquirer |
|-----|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Abitab_PhysicalNetwork.png"  width="52" /> | 5 | Abitab |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/RedPagos_PhysicalNetwork.png"  width="52" /> | 10 | RedPagos |

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | Envíe el `PaymentMediaId` de acuerdo con la red de pago en efectivo en esta [tabla](#cash-acquirers). |
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
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

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
    }
}
```

### Parámetros del Response {#response-parameters}
En el parámetro `MetadataOut.PaymentBarcodeUrl` de la respuesta, se retorna el cupon en formato _PDF_ que el cliente debe presentar en la agencia para pagar la deuda generada.

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

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
<!--
## Transferencias bancarias Online {#bank-transfers}
El flujo de este medio de pago es _**Redirect**_, por lo que el cliente debe ser redireccionado a otra página donde completará el pago. En la [sección Parámetros del Response](#response-parameters-1) puede encontrar el parámetro de la URL de redirección. Para más infomración, consulte [Compra Redirect]({{< ref Redirect-Purchase.md >}}).

### Bancos soportados {#supported-banks}
Puede ofrecer a sus clientes la posibilidad de pagar mediante transferencia bancaria si la cuenta del cliente está en los siguientes bancos:

<div id="shortTable"></div>

| | Payment MediaId | Bank |
|-----|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/E-Brou_BankTransfer.png" width="52" style="" /> | 101 | E-Brou |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Santander_BankTransfer.png" width="52" style="" /> | 102 | Santander |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Scotiabank_BankTransfer.png" width="52" style="" /> | 104 | Scotiabank |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Itau_BankTransfer.png" width="52" style="" /> | 105 | Itau |

### Parámetros del Request {#request-parameters-1}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | Envíe el `PaymentMediaId` de acuerdo con el banco del cliente en la [tabla de bancos soportados](#supported-banks). |
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
| `MetaDataIn` → `sourceReference` | `string` | No | Este campo se utiliza para configurar una referencia bancaria para el cliente. |
| `MetaDataIn` → `destinationReference` | `string` | No | Este campo se utiliza para configurar una referencia bancaria para el comercio. La API aplica un valor predeterminado si no proporciona esta información. |
| `MetaDataIn` → `externalReference` | `string` | No | Este campo se utiliza para configurar una referencia externa del sistema que invoca la API. |

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

### Parámetros del Response {#response-parameters-1}
Como necesita redirigir a su cliente a una página externa para completar el pago, puede encontrar la URL de redirección en el parámetro `MetadataOut.ActionURL`.

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-1}
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
```-->

## Transferencias Bancarias {#bank-transfers}
**Transferencias Bancarias** permiten que tus clientes realicen pagos utilizando transferencias bancarias. Los clientes deben transferir el monto de la compra a los detalles de la cuenta especificados en la respuesta utilizando su banco de preferencia. Aceptamos pagos de todos los bancos.


### Parámetros del Request {#request-parameters-2}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**532**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Description` | `string` | Sí | Descripción de la compra. Para este medio de pago es obligatorio. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/uruguay.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example-2}
```json
{
	"PaymentMediaId": 532,
	"Order": "QA83",
	"Amount": 100,
	"Description" : "Test Purchase",
    "Currency": "UYU",
    "TargetCountryISO": "UY",
    "Customer": {
        "Email": "john@mail.com",
        "FirstName": "John",
        "LastName": "Smith",
        "DocNumber": "12345672",
        "DocumentTypeId": 2,
        "PhoneNumber": "24022330",
        "BillingAddress": {
            "AddressType": 1,
            "Country": "Uruguay",
            "State": "Montevideo",
            "City": "Montevideo",
            "AddressDetail": "Av. Sarmiento 22",
            "PostalCode": "150000"
        }
    },
	"MetaDataIn": {
        "PaymentExpirationInMinutes": 60
    },
    "Redirection": {
        "Url_Approved": "https://dummystore.com/checkout/response",
        "Url_Rejected": "https://dummystore.com/checkout/response",
        "Url_Canceled": "https://dummystore.com/checkout/response",
        "Url_Pending": "https://dummystore.com/checkout/response"
    }
}
```

### Parámetros del Response {#response-parameters-2}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `CommerceAction` con `ActionReason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `ActionURL` con la URL del cupón. En esta URL, el pagador debe iniciar sesión en su aplicación de home banking y completar el pago. Consulte la sección [Experiencia de pago](#payment-experience) para ver el flujo de pago. 

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-2}

```json
{
    "Response": {
        "PurchaseId": 1260840,
        "Created": "2023-12-14T11:01:12.829",
        "TrxToken": null,
        "Order": "QA83",
        "Transaction": {
            "TransactionID": 1280797,
            "Created": "2023-12-14T11:01:12.829",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-12-14T14:01:12.829",
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
        "Amount": 3188058,
        "OriginalAmount": 3188058,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "UYU",
        "Description": "Compra de prueba",
        "Customer": {
            "CustomerId": 263761,
            "Created": "2023-12-14T11:01:12.473",
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
                    "PaymentProfileId": 268802,
                    "PaymentMediaId": 532,
                    "Created": "2023-12-14T14:01:12.597",
                    "LastUpdate": "2023-12-14T14:01:12.670",
                    "Brand": "Infinia",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/263761",
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
        "URL": "https://api.stage.bamboopayment.com/Purchase/1260840",
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
            "AcquirerID": 91,
            "Name": "Infinia Redirect",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_0cf91fa5-953c-43e9-8fb1-8ebb030d6748",
            "ActionBody": null,
            "ActionSessionId": "CA_0cf91fa5-953c-43e9-8fb1-8ebb030d6748"
        },
        "PurchasePaymentProfileId": 268802,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "60"
        },
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "UY",
            "TargetCurrencyISO": "USD",
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

### Experiencia de pago {#payment-experience}
Como se ha mencionado, debe redirigir a su cliente a la URL devuelta en la respuesta (parámetro `CommerceAction.ActionURL`).

A continuación, mostramos a su cliente el cupón con la información bancaria a la que debe crear la transferencia.

<img src="/assets/InfiniaAR/InfiniaAR_05.png" alt="PrintScreen" style="width: 70%; height:auto;"><br>

{{% alert title="Info" color="info"%}}
Puede personalizar este cupón para que muestre su logotipo en la parte superior. Para incluirlo, póngase en contacto con el servicio de soporte de Bamboo.
{{% /alert %}}

Una vez que su cliente complete la transferencia, podrá utilizar el botón de confirmación situado en la parte inferior de esta pantalla.

<img src="/assets/InfiniaAR/InfiniaAR_06.png" alt="PrintScreen" style="width: 50%; height:auto;">