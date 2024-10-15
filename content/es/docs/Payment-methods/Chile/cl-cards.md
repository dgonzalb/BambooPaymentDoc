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

## Consideraciones {#considerations}
* Las tarjetas de débito que utilizan el flujo API están disponibles para la captura completa (operación de compra).
* El CVV es obligatorio para las tarjetas de débito.
* El tiempo máximo para confirmar una transacción es de siete días calendario.
* Chile no soporta montos decimales, por lo que todos los valores de monto recibidos serán redondeados.

## Pagos con tarjeta mediante flujo API {#card-payments-using-api-flow}
Utilizando este flujo, puede ofrecer la posibilidad de recibir pagos con tarjetas sin la intervención del pagador.

### Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | Token que identifica la tarjeta del cliente.<br>Para más información sobre cómo crear el token, consulte [Clientes](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/chile.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |

{{% alert title="Info" color="info"%}}

Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).

{{% /alert %}}

#### Ejemplo del Request {#request-example}
```json
{
    "TrxToken": "OT__S5iqUBO8ZQCdfjtSIrTR_0-bknqY42K14jiYpVJ8SzQ_",
    "Capture": "true",
    "Amount": 100,
    "Order": "ORD1233",
    "Currency": "CLP",
    "TargetCountryISO": "CL",
    "Installments": 1,
    "Customer": {
        "Email": "jgonzalez@mail.com",
        "FirstName": "Jaime",
        "LastName": "Gonzalez"
    },
    "Description": "Prueba transaccion API"
}
```

### Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1133755,
        "Created": "2023-08-31T20:05:27.780",
        "TrxToken": null,
        "Order": "ORD1233",
        "Transaction": {
            "TransactionID": 1152672,
            "Created": "2023-08-31T20:05:27.780",
            "AuthorizationDate": "",
            "TransactionStatusId": 1,
            "Status": "Approved",
            "ErrorCode": "",
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "Status": null,
                    "ResponseCode": "",
                    "ResponseMessage": "AUTHORIZED",
                    "Error": "",
                    "AuthorizationCode": "1213",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "AUTHORIZED"
                }
            ]
        },
        "Capture": true,
        "Amount": 100,
        "OriginalAmount": 100,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "CLP",
        "Description": "Prueba transaccion API",
        "Customer": {
            "CustomerId": 250623,
            "Created": "2023-08-31T20:04:44.033",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "jgonzalez@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 255370,
                    "PaymentMediaId": 1,
                    "Created": "2023-08-31T20:04:44.033",
                    "LastUpdate": "2023-08-31T20:04:50.143",
                    "Brand": "VISA",
                    "CardOwner": "Jhon Doe Chile",
                    "Bin": "405188",
                    "IssuerBank": "Visa",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": "202910",
                    "Last4": "6623",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/250623",
            "FirstName": "Jaime",
            "LastName": "Gonzalez",
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
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133755",
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
            "AcquirerID": 79,
            "Name": "Transbank Api",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255370,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CL",
            "TargetCurrencyISO": "CLP",
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

<!--## Pagos con tarjeta mediante flujo Redirect {#card-payments-using-redirection-flow}
Utilizando este flujo, el pagador debe ser redirigido a la página _**webpay**_ para completar el pago según el medio de pago seleccionado (tarjeta de débito, crédito o prepago).

El estado de las compras con tarjeta mediante el flujo Redirect permanecerá _Pending_ hasta que el cliente complete el pago. Haga clic [aquí]({{< ref Redirect-Purchase.md >}}) para obtener más información sobre las compras con redirect.

### Parámetros del Request {#request-parameters-1}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Sí | El `PaymentMediaId` para este medio de pago es _**112**_.<br>_Los pagos por redirección solo están disponibles para tarjetas Visa y MasterCard_ |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/chile.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `Redirection` → `Url_Approved` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Se notifica a esta URL cuando el estado de la compra es `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | URL del Webhook de notificación. Se notifica a esta URL el estado de la compra una vez que el procesador del medio de pago notifica a Bamboo. La notificación a esta URL es un POST REST con payload en JSON y no una redirección. Puede ser también estática y configurada por el equipo de soporte. |
| `AntifraudData` → `AntifraudFingerprintId` | `string` | No | Session Id (`AntifraudFingerprintId`) que se obtiene por medio de la función JavaScript [getSessionAntifraud]({{< ref Antifraud.md>}}#getsessionantifraud). |
| `CustomerIP` | `string` | No | IP correspondiente al cliente conectado al sitio web del comercio. |

{{% alert title="Info" color="info"%}}

* El objeto `Redirection` y sus parámetros no son requeridos; sin embargo, debe configurarlos para redireccionar a su cliente luego de que la transacción termine en cualquier estado.

{{% /alert %}}

#### Ejemplo del Request {#request-example-1}
```json
{
    "PaymentMediaId": 112,
    "Amount": 2000,
    "Currency": "CLP",
    "Installments": 1,
    "TargetCountryISO": "CL",
    "Customer": {
        "Email": "john@mail.com"
    },
    "Redirection": {
        "Url_Approved": "https://dummystore.com/checkout/approved",
        "Url_Rejected": "https://dummystore.com/checkout/rejected",
        "Url_Canceled": "https://dummystore.com/checkout/canceled",
        "Url_Pending": "https://dummystore.com/checkout/pending",
        "URL_Notify": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d366d528a0b5"
    },
    "AntifraudData": {
        "AntifraudFingerprintId": "8110f7f0-5fbe-43ae-813c-1392b5346ec2"
    },
    "CustomerIP": "127.0.0.1",
    "Description": "this is a test cash purchase"
}
```

### Parámetros del Response {#response-parameters-1}
Retornamos la compra (`Purchase`) con estado _Pending for Redirection_ y un objeto `CommerceAction` con `ActionReason` como `REDIRECTION_NEEDED_EXTERNAL_SERVICE` y el parámetro `ActionURL` con la URL del servicio externo. Usted debe redireccionar al cliente a esta URL para completar el pago en la página de _**webpay**_.

![PrintScreen](/assets/WebPay.png)

Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

#### Ejemplo del Response {#response-example-1}

```json
{
    "Response": {
        "PurchaseId": 1133758,
        "Created": "2023-08-31T17:23:47.272",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1152676,
            "Created": "2023-08-31T17:23:47.272",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-08-31T20:23:47.272",
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
        "Amount": 2000,
        "OriginalAmount": 2000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "CLP",
        "Description": "this is a test cash purchase",
        "Customer": {
            "CustomerId": 88230,
            "Created": "2022-12-08T08:30:35.933",
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
                    "PaymentProfileId": 99384,
                    "PaymentMediaId": 112,
                    "Created": "2023-04-11T17:58:12.240",
                    "LastUpdate": "2023-08-31T20:23:46.657",
                    "Brand": "Transbank",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": null,
                    "Last4": "",
                    "Enabled": false,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                },
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
            "DocNumber": "139899768",
            "DocumentTypeId": 4,
            "PhoneNumber": "12345672",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": "127.0.0.1",
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133758",
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
            "AcquirerID": 66,
            "Name": "Transbank",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_2bccb515-9a4e-4946-89e7-2bfffc22c439",
            "ActionBody": null,
            "ActionSessionId": "CA_2bccb515-9a4e-4946-89e7-2bfffc22c439"
        },
        "PurchasePaymentProfileId": 99384,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CL",
            "TargetCurrencyISO": "CLP",
            "TargetAmount": 20
        },
        "Redirection": null,
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {
            "AntifraudFingerprintId": "8110f7f0-5fbe-43ae-813c-1392b5346ec2",
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
-->
## Tarjetas de prueba {#testing-cards}
Utilice las siguientes tarjetas para simular los diferentes estados de la compra. Estas tarjetas aplican tanto para el flujo API como para el de Redirect.

### Para compras aprobadas {#for-approved-purchases}

| Marca | PAN | CVV | Fecha de Expiración | Tipo |
|---|---|---|---|---|
| Amex | `370000000002032` | `1234` | `10/29` | Crédito |
| Visa | `4051885600446623` | `123` | `10/29` | Crédito |
| Visa | `4051886000056590` | `123` | `10/29` | Prepago |


{{% alert title="Info note" color="info"%}}
Si se solicitan RUT y contraseña, utilice un RUT válido (por ejemplo **11.111.111-1**) y contraseña **123**.
{{% /alert %}}

### Para compras rechazadas {#for-rejected-purchases}

| Marca | PAN | CVV | Fecha de Expiración | Tipo |
|---|---|---|---|---|
| MasterCard | `5186059559590568` | `123` | `10/29` | Crédito |
| MasterCard | `5186174110629480` | `123` | `10/29` | Prepago |