---
title: "Credit and Debit cards"
linkTitle: "Credit and Debit cards"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process credit or debit card payments.
weight: 10
tags: ["subtopic"]
---

## Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/en/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/peru.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |

{{% alert title="Info" color="info"%}}
Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Request example
```json
{
    "TrxToken": "OT__3zLMwG5_r99W0vz19Eap1y8Hg_Sf5jNq4jiYpVJ8SzQ_",
    "Capture": true,
    "Installments": 1,
    "Order": "ORD20230912001",
    "Customer": {
        "Email": "rguerrero@mail.com",
        "FirstName": "Rodrigo",
        "LastName": "Guerrero",
        "PhoneNumber": "+51|971516229",
        "DocNumber": "46701208",
        "DocumentTypeId": 6
    },
    "CustomerIP": "127.0.0.1",
    "Currency": "USD",
    "TargetCountryIso": "PE",
    "Amount": "12200"
}
```

## Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

### Response example

```json
{
    "Response": {
        "PurchaseId": 1248688,
        "Created": "2023-10-03T13:21:46.200",
        "TrxToken": null,
        "Order": "ORD20230912001",
        "Transaction": {
            "TransactionID": 1267539,
            "Created": "2023-10-03T13:21:46.200",
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
                    "ResponseCode": "000",
                    "ResponseMessage": "Aprobado y completado con exito",
                    "Error": null,
                    "AuthorizationCode": "207878",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{\"EcoreTransactionUUID\":\"9e35aeb4-a733-4c1a-92a3-6565b07de71a\",\"ActionCode\":\"000\",\"TraceNumber\":\"507878\",\"TransactionId\":\"807878\",\"AuthorizationCode\":\"207878\",\"AuthorizedAmount\":\"370.87\",\"Signature\":\"b3d8670f-ee07-4f09-8469-42ff03fd55b5\",\"RegisterFrequent\":\"False\",\"UseFrequent\":\"False\",\"Status\":\"Authorized\",\"ActionDescription\":\"Aprobado y completado con exito\"}"
                }
            ]
        },
        "Capture": true,
        "Amount": 37087,
        "OriginalAmount": 37087,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "PEN",
        "Description": null,
        "Customer": {
            "CustomerId": 255183,
            "Created": "2023-10-03T13:18:06.810",
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
                    "PaymentProfileId": 260039,
                    "PaymentMediaId": 1,
                    "Created": "2023-10-03T13:18:06.810",
                    "LastUpdate": "2023-10-03T13:21:34.380",
                    "Brand": "VISA",
                    "CardOwner": "Jack Bauer",
                    "Bin": null,
                    "IssuerBank": "Visa",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": "202803",
                    "Last4": "2240",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/255183",
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
        "CustomerIP": "127.0.0.1",
        "URL": "https://api.stage.bamboopayment.com/Purchase/1248688",
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
            "AcquirerID": 140,
            "Name": "Niubiz",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 260039,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "PE",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 122
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

| Brand | PAN | CVV | Expiration |
|---|---|---|---|
| Visa | `4474118355632240` | `111` | `03/28` |
| Visa | `4000000000000004` | `111` | `03/28` |
| Mastercard | `5474118355630001` | `111` | `03/28` |
<!--| Amex | `347000000000001` | `1111` | `03/28` |
| Amex | `347411835563001` | `1111` | `03/28` |-->