---
title: "PIX"
linkTitle: "PIX"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con **PIX**.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago.
{{% /alert %}}

## PIX
_PIX_ es un medio de pago oficial brasileño lanzado por el Banco Central local. Permite la confirmación inmediata del pago y está disponible 24 horas al día, 7 días a la semana. Para completar un pago, el pagador puede utilizar cualquier Home Banking o Wallet copiando y pegando el ID de transacción o escaneando el código QR.

### Parámetros del Request {#request-parameters}
Para procesar pagos en efectivo, necesitas incluir campos específicos en tu solicitud. Para información sobre autenticación, idiomas de respuesta y parámetros básicos como monto y moneda, consulta el artículo sobre [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters).

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Consulta el identificador en la tabla de [Medios de pago](/es/docs/payment-methods/brazil.html#payment-methods).|
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | Sí | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/brazil.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | Sí | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | Sí | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. |
| `MetadataIn.` → `AddressStreet` | `string` | No | Calle de la dirección del cliente. |
| `MetadataIn` → `AddressNumber` | `string` | No | Número, piso o apartamento de la dirección del cliente. |
| `MetadataIn` → `AddressDistrict` | `string` | No | Distrito de la dirección del cliente. |


#### Ejemplo del Request {#request-example}>
<!--```json
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
```-->
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Brasil/request_pix >}}
{{< /highlight >}}

### Parámetros del Response {#response-parameters}
En el Response, se encuentran los siguientes parámetros:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string` | Código del pago generado por **PIX**. |
| `Response` → `MetadataOut` → `PaymentBarCode` | `string`  | Este código, que corresponde en Brasil al _copia e cola_, permite a los pagadores copiarlo en su app bancaria.<br>Este parámetro es útil para generar el código QR cuando cree su propio checkout. |
| `Response` → `MetadataOut` → `PaymentBarCodeUrl` | `string` | URL de la página de pago. Esta página tiene el código QR generado en la cadena devuelta en el parámetro `PaymentBarCode`.<br>También puede redirigir al pagador a esta página para completar el pago. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Fecha de expiración del pago.<br>Formato _DD/MM/AAAA HH:MM:SS_. |

#### Página de pago en PIX {#payment-page-in-pix}

![PrintScreen](/assets/PIX.png)

#### Ejemplo del Response {#response-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Brasil/response_pix >}}
{{< /highlight >}}
<!--```json
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
```-->