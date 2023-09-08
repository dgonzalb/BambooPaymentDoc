---
title: "Compra Directa"
linkTitle: "Compra Directa"
date: 2023-03-02T11:40:29-05:00
Description: >
  Esta funcionalidad permite a los comercios certificados PCI realizar la autorización enviando los datos de la tarjeta en un solo paso sin la necesidad de la creación del token como en una [compra básica]({{< ref "Purchase-Operations.md" >}}).
weight: 30
tags: ["subtopic"]
---

## URL del Request {#request-url-1}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://secure-api.bamboopayment.com/v2/api/purchase`
* **Stage**: `https://secure-api.stage.bamboopayment.com/v2/api/purchase`

## Ejemplo del Request {#request-example}
```json
{
    "CardData": {
        "CardHolderName": "John Doe",
        "Pan": "4507990000004905",
        "CVV": "123",
        "Expiration": "08/30",
        "Email": "john.doe@example.com",
        "Document": "74857601"
    },
    "Capture": true,
    "Amount": 15000,
    "Currency": "USD",
    "TargetCountryISO":"AR",
    "Installments": 1,
    "Description": "Description",
    "Customer": {
        "BillingAddress": {
            "Country": "BRA",
            "City": "São Paulo",
            "State": "SP",
            "PostalCode": "04538132",
            "AddressDetail": "Brig. Faria Lima Avenue 10th Floor "
        },
        "Email": "john.dose@example.com",
        "DocNumber": "74857601",
        "PhoneNumber": "+5521987654321",
        "FirstName": "John",
        "LastName": "Doe",
        "DocumentTypeId":4
    }
}
```
<br>

Los campos **CardData**, **PaymentMediaId** y **TrxToken** no son obligatorios; sin embargo, se debe enviar uno de ellos de acuerdo con el flujo que utilice.

* **CardData**: Se debe utilizar para transacciones con tarjeta no tokenizada.

* **PaymentMediaId**: Identificador del medio de pago alternativo (transferencia, efectivo y cualquier flujo que necesite una redirección del cliente). Este identificador se puede obtener consultando la sección [Medios de pago por país](/es/docs/payment-methods.html).

* **TrxToken**: El comercio puede generar un token y enviarlo en este campo para generar transacciones si es necesario.

## Ejemplo del Response {#response-example}
```json
{
    "Response": {
        "PurchaseId": 139126,
        "Created": "2022-12-08T09:22:58.890",
        "Order": "24542341343",
        "Transaction": {
            "TransactionID": 149462,
            "Created": "2022-12-08T09:22:58.857",
            "AuthorizationDate": "2022-12-08T09:23:12.060",
            "TransactionStatusId": 1,
            "Status": "Approved",
            "ErrorCode": null,
            "Description": "100 ACCEPT",
            "ApprovalCode": "831000",
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2022-12-08T09:23:05.917",
                    "Status": "Authorization OK - Step 1",
                    "ResponseCode": "200",
                    "ResponseMessage": "OK",
                    "Error": "",
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": ""
                },
                {
                    "Step": "Generic External",
                    "Created": "2022-12-08T09:23:12.033",
                    "Status": "Authorization OK",
                    "ResponseCode": "100",
                    "ResponseMessage": "ACCEPT",
                    "Error": "",
                    "AuthorizationCode": "831000",
                    "UniqueID": null,
                    "AcquirerResponseDetail": ""
                }
            ]
        },
        "Capture": true,
        "Amount": 2700,
        "OriginalAmount": 2700,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "UYU",
        "Description": "56341245341",
        "Customer": {
            "CustomerId": 61046,
            "Created": "2022-12-05T17:24:43.720",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "b@s.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 59853,
                "AddressType": 2,
                "Country": "URY",
                "State": "RIVERA",
                "AddressDetail": "test 1 ",
                "PostalCode": "40000",
                "City": "Rivera"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "Customer/61046",
            "FirstName": "John",
            "LastName": "Doe",
            "DocNumber": "74857601",
            "DocumentTypeId": null,
            "PhoneNumber": "+59899999999"
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": "",
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.bamboopayment.com/v1/api/Purchase/139126",
        "Acquirer": {
            "AcquirerID": 90,
            "Name": "VisaNetUYv2",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 62872
    },
    "Errors": []
}
```