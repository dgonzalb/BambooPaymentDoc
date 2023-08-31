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
| `TrxToken` | `numeric` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/docs/purchase-workflow/customer-types.html). |
| `CrossBorderData` → `TargetCountryISO` | `string` | No<sup>*</sup> | Indicate the destination currency.<br><sup>*</sup>_This field is required for CrossBorder purchases_. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | Yes | Customer's document type.<br>Refer to the [Document types table](/docs/payment-methods/brazil.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | Yes | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | Yes | Customer's State.<br>Refer to [states of residence](/docs/payment-methods/brazil.html#customers-state-of-residence) to know its possible values. |
| `Customer` → `BillingAddress` → `City` | `string` | Yes | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | Yes | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | Yes | Customer's Postal Code. Do not include hyphens. |

{{% alert title="Info" color="info"%}}

Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Request example
```json
{
    "TrxToken": "OT__xQytfkLJWa099yCweV_bB2710dGJ_JMB4jiYpVJ8SzQ_",
    "Amount": 5000,
    "Order": "2572023",
    "Currency": "BRL",
    "Capture": true,
    "Installments": 0,
    "CrossBorderData" : {
        "TargetCountryISO" : "BR"
    },
    "Customer": {
        "Email": "breno@mail.com.br",
        "FirstName": "Breno",
        "LastName": "Barbieri",
        "DocNumber": "10058494715",
        "DocumentTypeId": 24,
        "PhoneNumber": "27998764488",
        "BillingAddress": {
            "AddressDetail": "Avenida Anisio Fernandes Coelho, 661 ",
            "PostalCode": "29060670",
            "City": "Vitoria",
            "State": "ES",
            "Country": "Brasil"
        }
    },
    "Description": "Kommo order #2572023"
}
```

## Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

### Response example

```json
{
    "Response": {
        "PurchaseId": 1133663,
        "Created": "2023-08-31T15:42:31.105",
        "TrxToken": null,
        "Order": "2572023",
        "Transaction": {
            "TransactionID": 1152559,
            "Created": "2023-08-31T15:42:31.107",
            "AuthorizationDate": "2023-08-31T15:42:34.420",
            "TransactionStatusId": 1,
            "Status": "Approved",
            "ErrorCode": null,
            "Description": "200 PC",
            "ApprovalCode": "12345",
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-08-31T15:42:32.250",
                    "Status": "Antifraud Approved",
                    "ResponseCode": null,
                    "ResponseMessage": null,
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                },
                {
                    "Step": "Generic step for microservices",
                    "Created": "2023-08-31T15:42:34.380",
                    "Status": "Authorization OK",
                    "ResponseCode": "200",
                    "ResponseMessage": "PC",
                    "Error": null,
                    "AuthorizationCode": "12345",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{\"order\":\"1133663\",\"order_status\":\"PC\",\"authorization_code\":\"12345\",\"error_code\":null}"
                }
            ]
        },
        "Capture": true,
        "Amount": 5000,
        "OriginalAmount": 5000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "BRL",
        "Description": "Kommo order #2572023",
        "Customer": {
            "CustomerId": 250580,
            "Created": "2023-08-31T15:42:21.197",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "breno@mail.com.br",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 374311,
                "AddressType": 2,
                "Country": "Brasil",
                "State": "ES",
                "AddressDetail": "Avenida Anisio Fernandes Coelho, 661 ",
                "PostalCode": "29060670",
                "City": "Vitoria"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 255321,
                    "PaymentMediaId": 1,
                    "Created": "2023-08-31T15:42:21.197",
                    "LastUpdate": null,
                    "Brand": "VISA",
                    "CardOwner": "Bruno Rugeiro",
                    "Bin": "498412",
                    "IssuerBank": "Visa",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": "202912",
                    "Last4": "1234",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/250580",
            "FirstName": "Breno",
            "LastName": "Barbieri",
            "DocNumber": "10058494715",
            "DocumentTypeId": 24,
            "PhoneNumber": "27998764488",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133663",
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
            "AcquirerID": 70,
            "Name": "PagBrasil",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255321,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "BR",
            "TargetCurrencyISO": "BRL",
            "TargetAmount": 50
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

| Brand | PAN | CVV | Expiration Date |
|---|---|---|---|
| Mastercard | `5555666677778884` |  `123` | `12/29` |
| Visa | `4984123412341234` |  `123` | `12/29` |
| Diners | `30111122223331` |  `123` | `12/29` |
| Amex | `376411112222331` |  `1234` | `12/29` |
| Hipercard | `6062111122223339` |  `123` | `12/29` |
| Elo | `6362970000457013` |  `123` | `12/29` |