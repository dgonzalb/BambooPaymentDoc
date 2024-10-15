---
title: "Tarjetas crédito y débito"
linkTitle: "Tarjetas crédito y débito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito o débito.
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
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/colombia.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No<sup>*</sup> | Departamento del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `TaxAmount` | `numeric` | No | Valor del IVA del monto total. Este parámetro es requerido para compras domésticas.<br>Cuando deba incluir decimales en este monto, concatene los dígitos decimales sin el punto. Ejemplo `12,25` > `1225`. |

{{% alert title="Info" color="info"%}}
Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Ejemplo del Request {#request-example}
```json
{
  "TrxToken": "OT__J2GWEll4hwZ9nIr_1oNtxkRtCs5QbbsO4jiYpVJ8SzQ_",
  "Capture": true,
  "Order": "20201229",
  "Amount": "3000",
  "CustomerIP": "127.0.0.1",
  "Currency": "COP",
  "TargetCountryISO": "CO",
  "Installments": 1,
  "Customer": {
    "BillingAddress": {
      "AddressType": 1,
      "Country": "COL",
      "State": "Bogota",
      "City": "Bogota",
      "AddressDetail": "Cra 4 # 76B - 57"
    },
    "DocNumber": "47666489",
    "DocumentTypeId": 2,
    "PhoneNumber": "0930000111",
    "FirstName": "Andres",
    "LastName": "Gomez"
  },
  "MetadataIn": {
    "TaxAmount": "47892"
  }
}
```

## Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

### Ejemplo del Response {#response-example}

```json
{
  "Response": {
    "PurchaseId": 180985,
    "Created": "2023-04-11T18:06:10.812",
    "TrxToken": null,
    "Order": "20201229",
    "Transaction": {
      "TransactionID": 196077,
      "Created": "2023-04-11T18:06:10.812",
      "AuthorizationDate": "",
      "TransactionStatusId": 1,
      "Status": "Approved",
      "ErrorCode": null,
      "Description": " ",
      "ApprovalCode": null,
      "Steps": [
        {
          "Step": "Generic External",
          "Created": "",
          "Status": null,
          "ResponseCode": "APPROVED",
          "ResponseMessage": "Authorization Approved",
          "Error": null,
          "AuthorizationCode": "APPROVED",
          "UniqueID": null,
          "AcquirerResponseDetail": "Authorization Approved"
        }
      ]
    },
    "Capture": true,
    "Amount": 3000,
    "OriginalAmount": 3000,
    "TaxableAmount": 0,
    "Tip": 0,
    "Installments": 1,
    "Currency": "COP",
    "Description": null,
    "Customer": {
      "CustomerId": 94997,
      "Created": "2023-04-11T13:02:57.350",
      "CommerceCustomerId": null,
      "Owner": "Anonymous",
      "Email": "test@dev.com",
      "Enabled": true,
      "ShippingAddress": null,
      "BillingAddress": {
        "AddressType": 1,
        "Country": "COL",
        "State": "Bogota",
        "City": "Bogota",
        "AddressDetail": "Cra 4 # 76B - 57"
      },
      "Plans": null,
      "AdditionalData": null,
      "PaymentProfiles": [
        {
          "PaymentProfileId": 99342,
          "PaymentMediaId": 1,
          "Created": "2023-04-11T13:02:57.350",
          "LastUpdate": "2023-04-11T18:06:07.977",
          "Brand": "VISA",
          "CardOwner": "Andres Gomez",
          "Bin": null,
          "IssuerBank": "Visa",
          "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
          "Type": "CreditCard",
          "IdCommerceToken": 0,
          "Token": null,
          "Expiration": "202306",
          "Last4": "0001",
          "Enabled": null,
          "DocumentNumber": null,
          "DocumentTypeId": null,
          "ExternalValue": null,
          "AffinityGroup": null
        }
      ],
      "CaptureURL": null,
      "UniqueID": null,
      "URL": "https://testapi.siemprepago.com/v1/api/Customer/94997",
      "FirstName": "Andres",
      "LastName": "Gomez",
      "DocNumber": "47666489",
      "DocumentTypeId": 2,
      "PhoneNumber": "0930000111",
      "ExternalValue": null
    },
    "RefundList": null,
    "PlanID": null,
    "UniqueID": null,
    "AdditionalData": null,
    "CustomerUserAgent": null,
    "CustomerIP": "127.0.0.1",
    "URL": "https://testapi.siemprepago.com/v1/api/Purchase/180985",
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
      "AcquirerID": 87,
      "Name": "Movii",
      "CommerceNumber": null
    },
    "CommerceAction": null,
    "PurchasePaymentProfileId": 99342,
    "LoyaltyPlan": null,
    "DeviceFingerprintId": null,
    "MetadataIn": null,
    "MetadataOut": null,
    "CrossBorderData": null,
    "CrossBorderDataResponse": {
      "TargetCountryISO": "CO",
      "TargetCurrencyISO": "COP",
      "TargetAmount": 1
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

## Tarjetas de prueba {#testing-cards}
Utilice las siguientes tarjetas para simular los diferentes estados de la compra.

| Marca | PAN | CVV | Fecha de Expiración |
|---|---|---|---|
| Mastercard | `5303710409428783` | `355` | `05/26` |
| Visa | `4513076106055348` | `159` | `06/26` |
| Diners | `36032429319768` | `9052` | `12/26 `|
| ***Fondos insuficientes*** |  |  |  |
| Mastercard | `5529030604551745` | `124` | `11/26` |