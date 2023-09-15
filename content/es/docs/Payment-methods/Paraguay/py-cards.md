---
title: "Tarjetas crédito y débito"
linkTitle: "Tarjetas crédito y débito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito o débito.
weight: 10
tags: ["subtopic"]
---

{{% alert title="Note" color="info"%}}
Solo ofrecemos soporte para comercios en Paraguay a través del modelo **Gateway**, y les enviamos la factura desde Uruguay.
{{% /alert %}}

## Parámetros del Request {#request-parameters}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros básicos de compra, como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | Token que identifica la tarjeta del cliente.<br>Para más información sobre cómo crear el token, consulte [Clientes](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/paraguay.html#document-types) para ver los posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | País del cliente. |
| `Customer` → `BillingAddress` → `State` | `string` | No<sup>*</sup> | Estado del cliente. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Código postal del cliente. |

{{% alert title="Info" color="info"%}}

Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Ejemplo del Request {#request-example}
```json
{
    "TrxToken": "OT__uX3BQMEP8JOKV7hxgjA3zheLk7u11xlN4jiYpVJ8SzQ_",
    "Order": "11111789",
    "Amount": 39500000,
    "Installments": 1,
    "Customer": {
        "Email": "raidel@mail.com",
        "FirstName": "raidel",
        "LastName": "lia",
        "PhoneNumber": "093673093",
        "DocNumber": "12345672",
        "DocumentTypeId": 3,
        "BillingAddress": {
            "Country": "Paraguay",
            "State": "Asuncion",
            "City": "Asuncion",
            "AddressDetail": "General Santos c teniente bruga 465"
        }
    },
    "Currency": "PYG",
    "TargetCountryISO": "PY",
    "Capture": "true"
}
```

## Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase-operations.md>}}#response-parameters) de la creación de la compra.

### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 1244898,
        "Created": "2023-09-13T20:53:41.848",
        "TrxToken": null,
        "Order": "11111789",
        "Transaction": {
            "TransactionID": 1263762,
            "Created": "2023-09-13T20:53:41.847",
            "AuthorizationDate": "2023-09-13T20:53:45.607",
            "TransactionStatusId": 1,
            "Status": "Approved",
            "ErrorCode": null,
            "Description": "00 null",
            "ApprovalCode": "ABC123",
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-09-13T20:53:45.430",
                    "Status": "Antifraud Approved",
                    "ResponseCode": null,
                    "ResponseMessage": null,
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                },
                {
                    "Step": "Bancard Authorization",
                    "Created": "2023-09-13T20:53:45.590",
                    "Status": "Authorization OK",
                    "ResponseCode": "00",
                    "ResponseMessage": "null",
                    "Error": "",
                    "AuthorizationCode": "ABC123",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{'status':'success','response':'S','response_details':'Procesado Satisfactoriamente','authorization_number':'ABC123','ticket_number':'123457','response_code':'00','extended_response_description':'null','card_source':'L','customer_ip':'0:0:0:0:0:0:0:1','card_country':'PARAGUAY','version':'0.3','risk_index':'0','response_description':'null'}"
                }
            ]
        },
        "Capture": true,
        "Amount": 39500000,
        "OriginalAmount": 39500000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "PYG",
        "Description": null,
        "Customer": {
            "CustomerId": 252635,
            "Created": "2023-09-13T20:53:27.617",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "raidel@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 375677,
                "AddressType": 2,
                "Country": "Paraguay",
                "State": "Asuncion",
                "AddressDetail": "General Santos c teniente bruga 465",
                "PostalCode": null,
                "City": "Asuncion"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 257426,
                    "PaymentMediaId": 1,
                    "Created": "2023-09-13T20:53:27.617",
                    "LastUpdate": null,
                    "Brand": "VISA",
                    "CardOwner": "Bancard adriana onetimetoken",
                    "Bin": "423243",
                    "IssuerBank": "BBVA(Paraguay)",
                    "Installments": "1",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": "202709",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/252635",
            "FirstName": "raidel",
            "LastName": "lia",
            "DocNumber": "12345672",
            "DocumentTypeId": 3,
            "PhoneNumber": "093673093",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1244898",
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
            "AcquirerID": 24,
            "Name": "Bancard",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 257426,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "PY",
            "TargetCurrencyISO": "PYG",
            "TargetAmount": 395000
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

## Risk index information (local credit cards)
The acquirer processes the transactions and establishes a _**risk index**_ associated with transactions with **local credit cards**. This information must be processed by the merchant to ensure that the transaction is legitimate and to be able to process the order or cancel it if necessary.

The acquirer reports the risk index as an error code in the response (within the Transaction object); even though the status is `Approved`, you must validate the `ErrorCode` field, which may have one of the following values:

* **RSK01**: The acquirer marked the transaction with a low risk of fraud. You can process it normally.
* **RSK02**: The acquirer marked the transaction with a medium risk of fraud. You decide the actions to take in this case.
* **RSK03**: The acquirer marked the transaction with a high risk of fraud. We suggest to verify the data, including direct contact with the end customer.

You are responsible for processing and managing the risk responses, and the gateway will only report the index established by the acquirer.