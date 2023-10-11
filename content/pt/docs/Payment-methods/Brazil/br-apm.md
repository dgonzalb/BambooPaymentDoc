---
title: "Medios alternativos de pago"
linkTitle: "Medios alternativos de pago"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con Medios alternativos de pago como **PIX** y **Boleto Bancario**.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago ya sea en PIX o en una oficina de _Boleto Bancario_.
{{% /alert %}}

## PIX
_PIX_ es un medio de pago oficial brasileño lanzado por el Banco Central local. Permite la confirmación inmediata del pago y está disponible 24 horas al día, 7 días a la semana. Para completar un pago, el pagador puede utilizar cualquier Home Banking o Wallet copiando y pegando el ID de transacción o escaneando el código QR.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**31**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/brazil.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |
| `MetadataIn.` → `AddressStreet` | `string` | Sí | Calle de la dirección del cliente. |
| `MetadataIn` → `AddressNumber` | `string` | Sí | Número, piso o apartamento de la dirección del cliente. |
| `MetadataIn` → `AddressDistrict` | `string` | Sí | Distrito de la dirección del cliente. |


#### Ejemplo del Request {#request-example}
```json
{
    "PaymentMediaId": "31",
    "Capture": "true",
    "Amount": 2000,
    "Currency": "BRL",
    "TargetCountryISO": "BR",
    "Customer": {
        "Email": "john@mail.com",
        "BillingAddress": {
            "AddressDetail": "Avenida Anisio Fernandes Coelho, 661 ",
            "PostalCode": "29060670",
            "City": "Vitoria",
            "State": "ES",
            "Country": "Brasil"
        },
        "FirstName": "John",
        "LastName": "Doe",
        "DocNumber": "13394559358",
        "DocumentTypeId": 25,
        "PhoneNumber": "+59812345678"
    },
    "MetadataIn": {
        "PaymentExpirationInMinutes": "14040",
        "AddressStreet": "Avenida Anisio Fernandes Coelho",
        "AddressNumber": "661",
        "AddressDistrict": "PR"
    },
    "description": "Pagameto do Brazil"
}
```

### Parámetros del Response {#response-parameters}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string` | Código del pago generado por **PIX** |
| `Response` → `MetadataOut` → `PaymentBarCode` | `string`  | Este código es conocido en Brasil como _copia e cola_ y le permite a los pagadores copiarlo y pagarlo en su aplicación bancaria. |
| `Response` → `MetadataOut` → `PaymentBarCodeUrl` | `string` | URL de la página de pago. Usted puede redirigir al pagados a esta página para completar el pago. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha de expiración del pago.<br>Formato _DD/MM/AAAA HH:MM:SS_. |

#### Página de pago en PIX {#payment-page-in-pix}

![PrintScreen](/assets/PIX.png)

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1167187,
        "Created": "2023-08-31T15:44:31.104",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1186084,
            "Created": "2023-08-31T15:44:31.104",
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
                    "ResponseCode": "1",
                    "ResponseMessage": "Created",
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 2000,
        "OriginalAmount": 2000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "BRL",
        "Description": "Pagameto do Brazil",
        "Customer": {
            "CustomerId": 88230,
            "Created": "2022-12-08T11:30:35.933",
            "CommerceCustomerId": null,
            "Owner": "Commerce",
            "Email": "John@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 88894,
                "AddressType": 2,
                "Country": "COL",
                "State": "Antioquia",
                "AddressDetail": "Carrera 80 #30 - 20",
                "PostalCode": null,
                "City": "Medellin"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 101557,
                    "PaymentMediaId": 2,
                    "Created": "2023-05-24T21:35:14.387",
                    "LastUpdate": "2023-05-24T21:40:30.700",
                    "Brand": "MasterCard",
                    "CardOwner": "John Doe",
                    "Bin": "529991",
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "CreditCard",
                    "IdCommerceToken": 40604,
                    "Token": "CT__uYBBUihIydvI--7Pyl8U665OfY_kbX2GGUsAV93Sj0k_",
                    "Expiration": "203008",
                    "Last4": "0015",
                    "Enabled": true,
                    "DocumentNumber": "74857601",
                    "DocumentTypeId": 2,
                    "ExternalValue": "0224d9a155f229d17a966c8f331978dd06df92dcc305fddb9535befe8d7bf999",
                    "AffinityGroup": null
                },
                {
                    "PaymentProfileId": 252287,
                    "PaymentMediaId": 1,
                    "Created": "2023-07-31T18:23:43.257",
                    "LastUpdate": "2023-07-31T18:23:43.257",
                    "Brand": "VISA",
                    "CardOwner": "Jhon Doe",
                    "Bin": "405188",
                    "IssuerBank": "Visa",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
                    "Type": "CreditCard",
                    "IdCommerceToken": 41630,
                    "Token": "CT__01dPtulDMY-yaNLK0D4isQhI2h7Angq5R5aAyNExBiM_",
                    "Expiration": "202912",
                    "Last4": "6623",
                    "Enabled": true,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": "https://api.stage.bamboopayment.com/v1/Capture/",
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/88230",
            "FirstName": "John",
            "LastName": "Doe",
            "DocNumber": "13394559358",
            "DocumentTypeId": 25,
            "PhoneNumber": "+59812345678",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1167187",
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
            "AcquirerID": 63,
            "Name": "WePayOut",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 98304,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "14040",
            "AddressStreet": "Avenida Anisio Fernandes Coelho",
            "AddressNumber": "661",
            "AddressDistrict": "PR"
        },
        "MetadataOut": {
            "PaymentCode": "33ff0bc703d33d4b3029b86abec12bfed2ccc972a87c8525c7dbdcc4f6753398",
            "PaymentBarCode": "00020101226914br.gov.bcb.pix2571api-h.developer.wepayout.com/v1/p/v2/1e317df5-4d0a-43c2-ba6d-18e468392823000053039865802BR5908WePayOut6009Sao Paulo61080141000262070503***63041300",
            "PaymentBarCodeUrl": "https://pagar.sandbox.goboleto.com/?hash=33ff0bc703d33d4b3029b86abec12bfed2ccc972a87c8525c7dbdcc4f6753398",
            "PaymentExpirationDate": "09/10/2023 06:44:31"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "BR",
            "TargetCurrencyISO": "BRL",
            "TargetAmount": 20
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

## Boleto Bancario
_Boleto Bancário_ es un medio de pago popular en Brasil que permite pagar facturas y compras en línea sin necesidad de una tarjeta de crédito: Genera un código de barras único que puede ser imprimido o accedido a través de una plataforma digital y puede ser pagado en cualquier banco u oficina de pago autorizada.

### Parámetros del Request {#request-parameters-1}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**66**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/brazil.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | Sí | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | Sí | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | Sí | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |
| `MetadataIn.` → `AddressStreet` | `string` | Sí | Calle de la dirección del cliente. |
| `MetadataIn` → `AddressNumber` | `string` | Sí | Número, piso o apartamento de la dirección del cliente. |
| `MetadataIn` → `AddressDistrict` | `string` | Sí | Distrito de la dirección del cliente. 


#### Ejemplo del Request {#request-example-1}
```json
{
    "PaymentMediaId": "66",
    "Capture":"true",
    "Amount":2000,
    "Currency":"BRL",
    "TargetCountryIso" : "BR",
    "Customer": {
        "Email": "john@mail.com",
        "FirstName" : "John",
        "LastName": "Doe",
        "DocNumber" : "13394559358",
        "DocumentTypeId": 24,
        "BillingAddress": {
          "AddressType": 1,
          "Country": "Brasil",
          "State": "ES",
          "City": "Vitoria",
          "AddressDetail": "Avenida Anisio Fernandes Coelho 661",
          "PostalCode":"11100"
        },
    },
    "MetadataIn" : {
      "PaymentExpirationInMinutes" :"1440",
      "AddressStreet": "Avenida Anisio Fernandes Coelho",
      "AddressNumber": "661",
      "AddressDistrict": "ES"
    }
}
```

### Parámetros del Response {#response-parameters-1}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string` | Código de pago generado por **Boleto Bancario** |
| `Response` → `MetadataOut` → `PaymentBarCode` | `string`  | Número del código de barras generado para completar el pago. |
| `Response` → `MetadataOut` → `PaymentBarCodeUrl` | `string` | URL de la página de pago. Usted puede redirigir al pagador a esta página para descargar el boleto. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha de expiración del pago.<br>Formato _DD/MM/AAAA HH:MM:SS_. |

#### Página de pago en Boleto {#payment-page-in-boleto}

![PrintScreen](/assets/Boleto.png)

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1133697,
        "Created": "2023-08-31T16:26:30.073",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1152594,
            "Created": "2023-08-31T16:26:30.073",
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
                    "ResponseCode": "1",
                    "ResponseMessage": "Created",
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 2000,
        "OriginalAmount": 2000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "BRL",
        "Description": null,
        "Customer": {
            "CustomerId": 88230,
            "Created": "2022-12-08T11:30:35.933",
            "CommerceCustomerId": null,
            "Owner": "Commerce",
            "Email": "John@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 88894,
                "AddressType": 2,
                "Country": "COL",
                "State": "Antioquia",
                "AddressDetail": "Carrera 80 #30 - 20",
                "PostalCode": null,
                "City": "Medellin"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 101557,
                    "PaymentMediaId": 2,
                    "Created": "2023-05-24T21:35:14.387",
                    "LastUpdate": "2023-05-24T21:40:30.700",
                    "Brand": "MasterCard",
                    "CardOwner": "John Doe",
                    "Bin": "529991",
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "CreditCard",
                    "IdCommerceToken": 40604,
                    "Token": "CT__uYBBUihIydvI--7Pyl8U665OfY_kbX2GGUsAV93Sj0k_",
                    "Expiration": "203008",
                    "Last4": "0015",
                    "Enabled": true,
                    "DocumentNumber": "74857601",
                    "DocumentTypeId": 2,
                    "ExternalValue": "0224d9a155f229d17a966c8f331978dd06df92dcc305fddb9535befe8d7bf999",
                    "AffinityGroup": null
                },
                {
                    "PaymentProfileId": 252287,
                    "PaymentMediaId": 1,
                    "Created": "2023-07-31T18:23:43.257",
                    "LastUpdate": "2023-07-31T18:23:43.257",
                    "Brand": "VISA",
                    "CardOwner": "Jhon Doe",
                    "Bin": "405188",
                    "IssuerBank": "Visa",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
                    "Type": "CreditCard",
                    "IdCommerceToken": 41630,
                    "Token": "CT__01dPtulDMY-yaNLK0D4isQhI2h7Angq5R5aAyNExBiM_",
                    "Expiration": "202912",
                    "Last4": "6623",
                    "Enabled": true,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": "https://api.stage.bamboopayment.com/v1/Capture/",
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/88230",
            "FirstName": "John",
            "LastName": "Doe",
            "DocNumber": "13394559358",
            "DocumentTypeId": 24,
            "PhoneNumber": "+59812345678",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133697",
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
            "AcquirerID": 63,
            "Name": "WePayOut",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 98311,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440",
            "AddressStreet": "Avenida Anisio Fernandes Coelho",
            "AddressNumber": "661",
            "AddressDistrict": "MO"
        },
        "MetadataOut": {
            "PaymentCode": "bd88102f813cface085ea4ac63038a65cd5378228be2d5694f67b8a83af45931",
            "PaymentBarCode": "10491814900000002009632034000900041179634666",
            "PaymentBarCodeUrl": "https://pagar.sandbox.goboleto.com/?hash=bd88102f813cface085ea4ac63038a65cd5378228be2d5694f67b8a83af45931",
            "PaymentExpirationDate": "09/01/2023 00:00:00"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "BR",
            "TargetCurrencyISO": "BRL",
            "TargetAmount": 20
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