---
title: "Medios alternativos de pago"
linkTitle: "Medios alternativos de pago"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con Efectivo.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago .
{{% /alert %}}

## PagoEfectivo Perú
**PagoEfectivo** provee una red de centros de pago físicos donde sus clientes pueden pagar las compras en efectivo o utilizando su aplicación bancaria. Su cliente puede pagar mostrando el identificador de la deuda (CIP) en una oficina o a través de su aplicación bancaria.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**26**_. |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/peru.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. El número de teléfono debe tener el formato `<característica>\|<número>`. Ejemplo: `+51\|971516229`. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto.<br>La fecha de expiración debe ser de al menos 10 minutos y menos de seis meses a partir de la fecha actual (en UTC GMT -5). |

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
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha de expiración del CIP.<br>Formato _ISO 8601_. |
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL del documento HTML del CIP. |

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

## Redes de cobranza en efectivo {#cash-collection-networks}
Utilizando este método de pago, su cliente puede dirigirse a una red de cobranza de efectivo y completar el pago utilizando el número de referencia generado.

### Redes {#networks}
Puede ofrecer a su cliente la posibilidad de pagar en efectivo en las siguientes redes:

<div id="shortTable"></div>

| | Payment MediaId | Descripción |
|-----|-----|-----|
| <img src="/assets/LogosCashPeru/bcp.png" width="52" /> | 46 | BCP | 
| <img src="/assets/LogosCashPeru/arequipa.png" width="52" /> | 47 | Caja Arequipa  | 
| <img src="/assets/LogosCashPeru/cusco.png" width="52" /> | 48 | Caja Cusco  | 
| <img src="/assets/LogosCashPeru/huancayo.png" width="52" /> | 49 | Caja Huancayo  | 
| <img src="/assets/LogosCashPeru/ica.png" width="52" /> | 50 | Caja Ica  | 
| <img src="/assets/LogosCashPeru/piura.png" width="52" /> | 51 | Caja Piura  | 
| <img src="/assets/LogosCashPeru/tacna.png" width="52" /> | 52 | Caja Tacna  | 
| <img src="/assets/LogosCashPeru/trujillo.png" width="52" /> | 53 | Caja Trujillo  | 
| <img src="/assets/LogosCashPeru/interbank.png" width="52" /> | 54 | Interbank  | 
| <img src="/assets/LogosCashPeru/westernunion.png" width="52" /> | 55 | Western Union  | 
| <img src="/assets/LogosCashPeru/bbva.png" width="52" /> | 103 | BBVA  | 

### Parámetros del Request {#request-parameters-1}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | Envíe el `PaymentMediaId` de acuerdo con la red de pago en efectivo en esta [tabla](#cash-acquirers). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/peru.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Departamento del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |

#### Ejemplo del Request {#request-example-1}
```json
{
    "PaymentMediaId": 55,
    "Currency": "USD",
    "TargetCountryISO": "PE",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "15"
    },
    "Customer": {
        "Email": "rguerrero@mail.com",
        "FirstName": "Rodrigo",
        "LastName": "Guerrero",
        "PhoneNumber": "+51|971516229",
        "DocNumber": "46701208",
        "DocumentTypeId": 6
    },
    "Amount": 100,
    "Installments": 1,
    "Capture": true,
    "Description": "Cash test"
}
```

### Parámetros del Response {#response-parameters-1}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL de la información del pago. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Referencia de pago retornada por el adquirente que identifica la orden generada. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha de expiración del pago.<br>Formato _DD/MM/AAAA_. |
| `Response` → `MetadataOut` → `AgreementCode` | `string`  | Número de convenio entre el adquirente y la red física. |

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-1}
```json
{
    "Response": {
        "PurchaseId": 148346,
        "Created": "2023-10-11T18:20:14.465",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 159251,
            "Created": "2023-10-11T18:20:14.465",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-10-11T18:20:15.227",
                    "Status": null,
                    "ResponseCode": "0000",
                    "ResponseMessage": "OK",
                    "Error": null,
                    "AuthorizationCode": "7851376",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{\"Operacion\":\"CREADA\",\"OrdenID\":\"148346\",\"PVOrdenID\":\"3468502\",\"Referencia\":\"7851376\"}"
                }
            ]
        },
        "Capture": true,
        "Amount": 306,
        "OriginalAmount": 306,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "PEN",
        "Description": "Cash test",
        "Customer": {
            "CustomerId": 70118,
            "Created": "2023-10-11T18:20:14.070",
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
                    "PaymentProfileId": 71937,
                    "PaymentMediaId": 55,
                    "Created": "2023-10-11T18:20:14.117",
                    "LastUpdate": "2023-10-11T18:20:14.203",
                    "Brand": "WesternUnion",
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
                    "DocumentTypeId": 2,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.dev.bamboopayment.com/Customer/70118",
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
        "URL": "https://api.dev.bamboopayment.com/Purchase/148346",
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
            "AcquirerID": 101,
            "Name": "PayvalidaCashPFPE",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 71937,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "15"
        },
        "MetadataOut": {
            "PaymentUrl": "https://s3.amazonaws.com/gateway.dev.bamboopayment.com/purchase-coupons/148346_ab14bee9-1870-4711-a656-9e308d37126a_20240111.html",
            "PaymentCode": "7851376",
            "PaymentExpirationDate": "11/10/2023",
            "AgreementCode": "PAYVALIDA"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "PE",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 1
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