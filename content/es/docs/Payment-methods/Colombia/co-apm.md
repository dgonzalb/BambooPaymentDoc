---
title: "Medios alternativos de pago"
linkTitle: "Medios alternativos de pago"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con PSE, efectivo y Nequi.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago ya sea en su apliación bancaria (PSE), Nequi o en una oficina física de pago.
{{% /alert %}}

## PSE
PSE (Pagos Seguros en Línea) es un sistema de pago en línea muy utilizado en Colombia. Permite realizar transacciones electrónicas seguras al permitir a los usuarios efectuar pagos directamente desde sus cuentas bancarias.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**538**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | Sí | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | Sí | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | Sí | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | Sí | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `AddressType` | `string` | Sí | Tipo de dirección. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `Redirection` → `Url_Approved` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | URL del Webhook de notificación. Se notifica a esta URL el estado de la compra una vez que el procesador del medio de pago notifica a Bamboo. La notificación a esta URL es un POST REST con payload en JSON y no una redirección. Puede ser también estática y configurada por el equipo de soporte. |

#### Ejemplo del Request {#request-example}
```json
{
    "PaymentMediaId": 538,
    "Order": "QA245",
    "Capture": "true",
    "Amount": 1000,
    "Installments": 1,
    "Currency": "USD",
    "CrossBorderData": {
        "TargetCountryISO": "CO"
    },
    "Description": "Compra de prueba",
    "Customer": {
        "BillingAddress": {
            "AddressType": 1,
            "Country": "COL",
            "State": "Antioquia",
            "City": "Medellin",
            "AddressDetail": "Cra 45 # 76B Sur - 57"
        },
        "FirstName": "Miguel",
        "LastName": "Moreno",
        "DocNumber": "52960268",
        "DocumentTypeId": 11,
        "PhoneNumber": "24022330",
        "Email": "mmoreno@mail.com"
    },
    "Redirection": {
        "Url_Approved": "https://dummystore.com/checkout/response",
        "Url_Rejected": "https://dummystore.com/checkout/response",
        "Url_Canceled": "https://dummystore.com/checkout/response",
        "Url_Pending": "https://dummystore.com/checkout/response"
    }
}
```

### Parámetros del Response {#response-parameters}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `CommerceAction` con `ActionReason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `ActionURL` con la URL del servicio externo. Debe redirigir al cliente a esta URL para finalizar el pago siguiendo el flujo PSE. En este flujo, su pagador selecciona su banco, elige si es una persona física o jurídica y su tipo de documento.

![PrintScreen](/assets/PSE.png)

Según el resultado de la transacción, el pagador será dirigido a la URL definida en el objeto `Redirection`. Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example}
```json
{
    "Response": {
        "PurchaseId": 1266731,
        "Created": "2024-01-30T12:58:38.498",
        "TrxToken": null,
        "Order": "QA245",
        "Transaction": {
            "TransactionID": 1287664,
            "Created": "2024-01-30T12:58:38.498",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2024-01-30T15:58:38.498",
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
        "Amount": 3140600,
        "OriginalAmount": 3140600,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "COP",
        "Description": "Compra de prueba",
        "Customer": {
            "CustomerId": 269124,
            "Created": "2024-01-30T12:58:38.197",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "mmoreno@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 0,
                "AddressType": 1,
                "Country": "COL",
                "State": "Antioquia",
                "AddressDetail": "Cra 45 # 76B Sur - 57",
                "PostalCode": null,
                "City": "Medellin"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 274300,
                    "PaymentMediaId": 538,
                    "Created": "2024-01-30T15:58:38.310",
                    "LastUpdate": "2024-01-30T15:58:38.363",
                    "Brand": "PseAvanza",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/269124",
            "FirstName": "Miguel",
            "LastName": "Moreno",
            "DocNumber": "52960268",
            "DocumentTypeId": 11,
            "PhoneNumber": "24022330",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1266731",
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
            "AcquirerID": 149,
            "Name": "Pse Avanza Redirect",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_cc155768-74d9-4efd-8e55-42411b4dd3cf",
            "ActionBody": null,
            "ActionSessionId": "CA_cc155768-74d9-4efd-8e55-42411b4dd3cf"
        },
        "PurchasePaymentProfileId": 274300,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CO",
            "TargetCurrencyISO": "USD",
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

## Efectivo {#cash}
El método de pago en efectivo permite a sus clientes generar un cupón y completar el pago en una oficina de pago física.

### Redes de pago en efectivo {#cash-acquirers}
Puede ofrecer a su cliente la posibilidad de pagar en efectivo en las siguientes redes:

<div id="shortTable"></div>

| | Payment MediaId | Descripción |
|-----|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Apostar_PhysicalNetwork.png" width="52" /> | 36 | Apostar |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Bancolombia_PhysicalNetwork.png" width="52" /> | 37 | Bancolombia |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Efecty_PhysicalNetwork.png" width="52" /> | 38 | Efecty |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Gana_PhysicalNetwork.png" alt="Diners" width="52" /> | 39 | Gana |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Puntored_PhysicalNetwork.png" width="52" /> | 40 | Puntored |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Superpagos_PhysicalNetwork.png" width="52" /> | 42 | Superpagos |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Sured_PhysicalNetwork.png" width="52" /> | 43 | SuRed |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Susuerte_PhysicalNetwork.png" width="52" /> | 44 | SuSuerte |

### Parámetros del Request {#request-parameters-1}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | Envíe el `PaymentMediaId` de acuerdo con la red de pago en efectivo en esta [tabla](#cash-acquirers). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Departamento del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

{{% alert title="Consideraciones" color="info"%}}
* Los Pesos Colombianos no soportan cantidades decimales, por lo que todos los valores recibidos serán redondeados.
* El valor `amount` debe incluir dos ceros como decimales. Ejemplo `COP 5.000` > `500000`.
{{% /alert %}}

#### Ejemplo del Request {#request-example-1}
```json
{
    "PaymentMediaId": 38,
    "Currency": "COP",
    "TargetCountryIso" : "CO",
    "MetadataIn" : {
        "PaymentExpirationInMinutes": "7200"
    },
    "Customer": {
        "BillingAddress": {
          "AddressType": 1,
          "Country": "COL",
          "State": "Antioquia",
          "City": "Medellin",
          "AddressDetail": "Cra 45 # 76B Sur - 57"
        },
        "FirstName" : "Miguel",
        "LastName": "Moreno",
        "DocNumber" : "52960268",
        "DocumentTypeId": 11,
        "PhoneNumber" : "24022330",
        "Email": "mmoreno@mail.com"
    },
    "Amount": 100000,
   
    "Capture":true,
    "Description":"This is a Cash test"
}
```

### Parámetros del Response {#response-parameters-1}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL del cupón que debe ser presentado en la red física. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Referencia de pago retornada por el adquirente que identifica la orden generada. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha de expiración del pago.<br>Formato _DD/MM/AAAA_. |
| `Response` → `MetadataOut` → `AgreementCode` | `string`  | Número de convenio entre el adquirente y la red física. |

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-1} 
```json
{
    "Response": {
        "PurchaseId": 1131277,
        "Created": "2023-08-17T21:15:42.794",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1149206,
            "Created": "2023-08-17T21:15:42.794",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "Status": null,
                    "ResponseCode": "0000",
                    "ResponseMessage": "OK",
                    "Error": null,
                    "AuthorizationCode": "6273036",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{\"Operacion\":\"CREADA\",\"OrdenID\":\"1131277\",\"PVOrdenID\":\"1364048\",\"Referencia\":\"6273036\"}"
                }
            ]
        },
        "Capture": true,
        "Amount": 100000,
        "OriginalAmount": 100000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "COP",
        "Description": "This is a Cash test",
        "Customer": {
            "CustomerId": 248888,
            "Created": "2023-08-17T21:15:42.007",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "mmoreno@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 372870,
                "AddressType": 2,
                "Country": "COL",
                "State": "Antioquia",
                "AddressDetail": "Cra 45 # 76B Sur - 57",
                "PostalCode": null,
                "City": "Medellin"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 253555,
                    "PaymentMediaId": 38,
                    "Created": "2023-08-17T21:15:42.200",
                    "LastUpdate": "2023-08-17T21:15:42.530",
                    "Brand": "Efecty",
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
                    "DocumentNumber": "52960268",
                    "DocumentTypeId": 2,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/248888",
            "FirstName": "Miguel",
            "LastName": "Moreno",
            "DocNumber": "52960268",
            "DocumentTypeId": 11,
            "PhoneNumber": "24022330",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1131277",
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
            "AcquirerID": 88,
            "Name": "PayvalidaCashPFCO",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 253555,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "7200"
        },
        "MetadataOut": {
            "PaymentUrl": "https://s3.amazonaws.com/gateway.stage.bamboopayment.com/purchase-coupons/1131277_691e4de3-6eda-43ce-a01d-a6ea539d70fe_20231117.html",
            "PaymentCode": "6273036",
            "PaymentExpirationDate": "22/08/2023",
            "AgreementCode": "110342"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CO",
            "TargetCurrencyISO": "COP",
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
        "TargetCountryISO": null
    },
    "Errors": []
}
```

## Nequi QR
Le permite a sus clientes pagar escaneando un código QR utilizando su aplicación de Nequi. La API de Bamboo Payment genera el código QR en la respuesta del request.

#### Flujo de Pago {#qr-code}
<img src="/assets/NequiQRES.png" width="100%" alt="Nequi QR Payment Flow"/>


### Parámetros del Request {#request-parameters-2}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**67**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Departamento del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example-2}
```json
{
    "PaymentMediaId": 67,
    "Order": "15e04d37-89b7-46de-8cfa-02e4f5607b4f-331331213321",
    "Amount": 1000,
    "Description":"This is a nequi test transaction",
    "TargetCountryISO": "CO",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "COP",
    "Capture": true,
    "Customer": {
        "FirstName": "Rosa",
        "LastName": "Peralta",
        "PhoneNumber": "3188060418",
        "Email": "admin@dev.com",
        "DocNumber": 12345672,
        "DocumentTypeId": 12,
        "BillingAddress": {
            "AddressType": 1,
            "Country": "COL",
            "State": "Bogota",
            "City": "Bogota",
            "AddressDetail": "Address 123"
        }
    }
}
```

### Parámetros del Response {#response-parameters-2}
El siguiente ejemplo muestra la respuesta al request.

```json
{
    "Response": {
        "PurchaseId": 1131320,
        "Created": "2023-08-18T12:41:08.102",
        "TrxToken": null,
        "Order": "15e04d37-89b7-46de-8cfa-02e4f5607b4f-331331213321",
        "Transaction": {
            "TransactionID": 1149264,
            "Created": "2023-08-18T12:41:08.102",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "Status": null,
                    "ResponseCode": "0",
                    "ResponseMessage": "SUCCESS",
                    "Error": null,
                    "AuthorizationCode": "",
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 1000,
        "OriginalAmount": 1000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "COP",
        "Description": "This is a nequi test transaction",
        "Customer": {
            "CustomerId": 248933,
            "Created": "2023-08-18T12:41:07.150",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "admin@dev.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 372893,
                "AddressType": 2,
                "Country": "COL",
                "State": "Bogota",
                "AddressDetail": "Address 123",
                "PostalCode": null,
                "City": "Bogota"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 253600,
                    "PaymentMediaId": 67,
                    "Created": "2023-08-18T12:41:07.287",
                    "LastUpdate": "2023-08-18T12:41:07.773",
                    "Brand": "NequiQr",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/248933",
            "FirstName": "Rosa",
            "LastName": "Peralta",
            "DocNumber": "12345672",
            "DocumentTypeId": 12,
            "PhoneNumber": "3188060418",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1131320",
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
            "AcquirerID": 75,
            "Name": "Nequi Qr",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 253600,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "CodeQr": "bancadigital-C001-10011-1131320",
            "Base64Qr": "data:image/png;base64,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"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CO",
            "TargetCurrencyISO": "COP",
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
        "TargetCountryISO": null
    },
    "Errors": []
} 
```
<br>

En el campo `MetadataOut` dentro del objeto `Response`, el código QR se devuelve como una imagen _base64_ (Parámetro `Base64Qr`); añada esta imagen dentro de una etiqueta HTML de imagen. Por ejemplo:

```html
<img src="data:image/png;base64,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" id="qr-code-display" style="max-width: 400px;">
```

<br>

Resultado:

<img src="/assets/QRNequi.png" width="40%" alt="PrintScreen"/>


## Nequi Push
Al utilizar este método de pago, su cliente recibirá una notificación para que abra su aplicación _Nequi_ y acepte o rechace el pago.

#### Payment Flow {#push-notification}
<img src="/assets/NequiPushES.png" width="100%" alt="Nequi Flujo de Pago"/>


### Parámetros del Request {#request-parameters-3}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**68**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. El número debe tener 10 dígitos y no debe tener prefijos. Ejemplo: _3188255555_. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Departamento del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example-3}
```json
{
    "PaymentMediaId": 68,
    "Order": "15e04d37-89b7-46de-8cfa-02e4f5607b4f-331331213321",
    "Amount": 1000,
    "Description":"This is a nequi test transaction",
    "TargetCountryISO": "CO",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "COP",
    "Capture": true,
    "Customer": {
        "FirstName": "Rosa",
        "LastName": "Peralta",
        "PhoneNumber": "3188060418",
        "Email": "admin@dev.com",
        "DocNumber": 12345672,
        "DocumentTypeId": 12,
        "BillingAddress": {
            "AddressType": 1,
            "Country": "COL",
            "State": "Bogota",
            "City": "Bogota",
            "AddressDetail": "Address 123"
        }
    }
}
```

### Parámetros del Response {#response-parameters-3}
_Nequi_ genera la orden de pago y envía una notificación push al pagador; luego, el pagador necesita ingresar a la aplicación de Nequi para aceptar o rechazar el pago.

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-2}

```json
{
    "Response": {
        "PurchaseId": 1131361,
        "Created": "2023-08-18T15:05:25.048",
        "TrxToken": null,
        "Order": "15e04d37-89b7-46de-8cfa-02e4f5607b4f-331331213321",
        "Transaction": {
            "TransactionID": 1149323,
            "Created": "2023-08-18T15:05:25.048",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "Status": null,
                    "ResponseCode": "0",
                    "ResponseMessage": "SUCCESS",
                    "Error": null,
                    "AuthorizationCode": "",
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 1000,
        "OriginalAmount": 1000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "COP",
        "Description": "This is a nequi test transaction",
        "Customer": {
            "CustomerId": 248964,
            "Created": "2023-08-18T15:05:24.333",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "admin@dev.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 372921,
                "AddressType": 2,
                "Country": "COL",
                "State": "Bogota",
                "AddressDetail": "Address 123",
                "PostalCode": null,
                "City": "Bogota"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 253630,
                    "PaymentMediaId": 68,
                    "Created": "2023-08-18T15:05:24.473",
                    "LastUpdate": "2023-08-18T15:05:24.770",
                    "Brand": "NequiPush",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/248964",
            "FirstName": "Rosa",
            "LastName": "Peralta",
            "DocNumber": "12345672",
            "DocumentTypeId": 12,
            "PhoneNumber": "3188060418",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1131361",
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
            "AcquirerID": 76,
            "Name": "Nequi Push",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 253630,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CO",
            "TargetCurrencyISO": "COP",
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
        "TargetCountryISO": null
    },
    "Errors": []
}
```