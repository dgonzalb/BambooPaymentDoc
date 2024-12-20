---
title: "Boleto"
linkTitle: "Boleto"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda a integrar su solución para procesar pagos con **Boleto Bancario**.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para Medios Alternativos de Pago permanecerá en _Pending_ hasta que el cliente complete el pago.
{{% /alert %}}

## Boleto Bancario
_Boleto Bancário_ es un medio de pago popular en Brasil que permite pagar facturas y compras en línea sin necesidad de una tarjeta de crédito: Genera un código de barras único que puede ser imprimido o accedido a través de una plataforma digital y puede ser pagado en cualquier banco u oficina de pago autorizada.

### Parámetros del Request {#request-parameters-1}
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
| `Customer` → `Address` → `State` | `string` | Sí | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | Sí | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | Sí | Código postal del cliente. El código postal debe tener ocho dígitos; por ejemplo, `29018660`. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto. |
| `MetadataIn.` → `AddressStreet` | `string` | Sí | Calle de la dirección del cliente. |
| `MetadataIn` → `AddressNumber` | `string` | Sí | Número, piso o apartamento de la dirección del cliente. |
| `MetadataIn` → `AddressDistrict` | `string` | Sí | Distrito de la dirección del cliente. 


#### Ejemplo del Request {#request-example-1}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Brasil/request_boleto >}}
{{< /highlight >}}
<!--```json
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
```--->

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
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Brasil/response_boleto >}}
{{< /highlight >}}

<!--```json
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
```-->