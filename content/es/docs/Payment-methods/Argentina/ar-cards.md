---
title: "Tarjetas crédito y débito"
linkTitle: "Tarjetas crédito y débito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito o débito.
weight: 10
tags: ["subtopic"]
---

## Considerations 
* **For VISA Debit**: It is not required to be in the _Verified by Visa_ program.<br>When operating outside a wallet, you must request the _Expiration Date_ and _CVV_. It serves as a single payment due to being a debit card. It accepts Full Cancellations and Refunds (Total and Partial). It does not allow Two-Step operations (Pre-Authorization).
* **Purchases without CVV**: Allows tokenization and recurrence.<br>In the case of tokenization, the API generates a charge for a minimum of **ARS 3**, which is refunded to validate the cardholder data. With this token, it is possible to make purchases without CVV.

## Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indicate the destination currency. |
| `Customer` → `Email` | `string` | Sí | Customer's email. |
| `Customer` → `FirstName` | `string` | Sí | Customer's first name. |
| `Customer` → `LastName` | `string` | Sí | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/es/docs/payment-methods/argentina.html#document-types) to see the posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No<sup>*</sup> | Customer's State.<br><sup>*</sup>_This parameter is required to calculate **II.BB** Tax. Refer to [provinces](/es/docs/payment-methods/argentina.html#argentina-provinces) to know its possible values_. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |

{{% alert title="Info" color="info"%}}

Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Request example
```json
{
    "TrxToken":"OT__OjB6eMmXSzT9VZMK3yB-x_DO5YHx5QtP4jiYpVJ8SzQ_",
    "Capture":"true",
    "Amount":200000,
    "Currency":"ARS",
    "TargetCountryISO" : "AR",
    "Installments":1,
    "Order":"ORD12345",
    "Customer": {
        "Email": "eluna@mail.com",
        "BillingAddress": {
          "AddressType": 1,
          "Country": "AR",
          "State": "C",
          "City": "BsAs",
          "AddressDetail": "Joaquin Requena 1580",
          "PostalCode": "C1054AAU"
        },
        "FirstName" : "Erik",
        "LastName": "Luna",
        "DocNumber" : "12345672",
        "DocumentTypeId": 17,
        "PhoneNumber" : "24022330"
    },
    "Description" : "Compra de prueba"
}
```

## Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

### Response example

```json
{
    "Response": {
        "PurchaseId": 1167186,
        "Created": "2023-09-04T20:12:54.822",
        "TrxToken": null,
        "Order": "ORD12345",
        "Transaction": {
            "TransactionID": 1186083,
            "Created": "2023-09-04T20:12:54.822",
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
                    "ResponseCode": "approved",
                    "ResponseMessage": "approved",
                    "Error": null,
                    "AuthorizationCode": "171259",
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 200000,
        "OriginalAmount": 200000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "ARS",
        "Description": "Compra de prueba",
        "Customer": {
            "CustomerId": 251239,
            "Created": "2023-09-04T20:11:50.973",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "eluna@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 374731,
                "AddressType": 2,
                "Country": "AR",
                "State": "C",
                "AddressDetail": "Joaquin Requena 1580",
                "PostalCode": "C1054AAU",
                "City": "BsAs"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 256001,
                    "PaymentMediaId": 1,
                    "Created": "2023-09-04T20:11:50.973",
                    "LastUpdate": null,
                    "Brand": "VISA",
                    "CardOwner": "Erik Luna",
                    "Bin": "450799",
                    "IssuerBank": "Santander",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": "202910",
                    "Last4": "4905",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/251239",
            "FirstName": "Erik",
            "LastName": "Luna",
            "DocNumber": "12345672",
            "DocumentTypeId": 17,
            "PhoneNumber": "24022330",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1167186",
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
            "AcquirerID": 25,
            "Name": "DECIDIR",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 256001,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "AR",
            "TargetCurrencyISO": "ARS",
            "TargetAmount": 2000
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

## Testing cards
Use the following cards to simulate the different status of the purchase.

### For approved purchases

| Brand | PAN | CVV | Expiration Date | Details |
|---|---|---|---|---|
| Mastercard | `5299910010000015` | `123` | `08/30` | No amount limit. |
| Visa (credit or Debit) | `4507990000004905` | `123` | `08/30` | No amount limit. |
| Amex | `373953192351004` | `1234` | `08/30` | Amounts: $1 or $10 |

### For rejected purchases

| PAN | CVV | Expiration Date | Document Type | Document |
|---|---|---|---|---|
| `4304968001555104` | `617` | `12/18` | `4` - DNI | `38499826` |