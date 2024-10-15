---
title: "Alternative Payment Methods"
linkTitle: "Alternative Payment Methods"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with Bank transfer and Cash methods.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
* The purchase status for Alternative Payment methods will remain _Pending_ until the customer completes payment either in their _Khipu_ app or at a physical payment office.
* Chile does not support decimal amounts, so all received amount values will be rounded.
{{% /alert %}}

## Khipu
**Khipu** allows payers to pay using transfers from their bank accounts using the _Khipu_ app. The payer can pay using bank accounts or through the **Khipu** app where the payment experience is better.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase_v3.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**106**_. |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/chile.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `Redirection` → `Url_Approved` | `string` | No | Callback URL when the purchase status is `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Callback URL when the purchase status is `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Callback URL when the purchase status is `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Callback URL when the purchase status is `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | Webhook notification URL. The Purchase status is notified to this URL once the payment method processor notifies Bamboo. The notification to this URL is a REST POST with JSON payload instead of redirection. It can also be static and configured by Support Team. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

{{% alert title="Info" color="info"%}}

The `Redirection` object and its parameter are not required; nevertheless, you must configure it to redirect your customer after the transaction finishes in any status.

{{% /alert %}}

#### Request example
```json
{
    "PaymentMediaId": 106,
    "Amount": 100000,
    "Currency": "CLP",
    "TargetCountryISO": "CL",
    "Customer": {
        "Email": "john@mail.com",
        "FirstName": "John"
    },
    "Redirection": {
        "Url_Approved": "https://dummystore.com/checkout/approved",
        "Url_Rejected": "https://dummystore.com/checkout/rejected",
        "Url_Canceled": "https://dummystore.com/checkout/canceled",
        "Url_Pending": "https://dummystore.com/checkout/pending",
        "Url_Notify": "https://webhook.site/9e2dff8b-cec6-4540-bd2d-feafce58a9ed"
    },
    "Description": "this is a test cash purchase"
}
```

### Response parameters
We return the `Purchase` with the status _Pending for Redirection_ and a `CommerceAction` object with `ActionReason` as `REDIRECTION_NEEDED_EXTERNAL_SERVICE` and the `ActionURL` parameter with the external service URL. You must redirect the customer to this URL to finish the payment on the _**Khipu**_ app.

{{% alert title="Info" color="info"%}}
If the RUT and password are requested during testing, please use a valid RUT (for example **11.111.111-1**) and password **123**.
{{% /alert %}}

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example

```json
{
    "Response": {
        "PurchaseId": 1133795,
        "Created": "2023-08-31T18:16:22.993",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1152709,
            "Created": "2023-08-31T18:16:22.993",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-08-31T21:16:22.993",
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
        "Amount": 100000,
        "OriginalAmount": 100000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "CLP",
        "Description": "this is a test cash purchase",
        "Customer": {
            "CustomerId": 250646,
            "Created": "2023-08-31T18:16:22.210",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "john@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 255394,
                    "PaymentMediaId": 106,
                    "Created": "2023-08-31T21:16:22.367",
                    "LastUpdate": "2023-08-31T21:16:22.777",
                    "Brand": "Khipu",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "BankTransfer",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": null,
                    "Last4": "",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/250646",
            "FirstName": "John",
            "LastName": null,
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
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133795",
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
            "AcquirerID": 47,
            "Name": "Khipu Redirect",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_f1696826-3607-47ef-adba-94291876758b",
            "ActionBody": null,
            "ActionSessionId": "CA_f1696826-3607-47ef-adba-94291876758b"
        },
        "PurchasePaymentProfileId": 255394,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CL",
            "TargetCurrencyISO": "CLP",
            "TargetAmount": 1000
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

## Klap Efectivo
With **Klap efectivo**, your customers can generate a coupon and complete the payment in a physical payment office.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**107**_. |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/Chile.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `Redirection` → `Url_Approved` | `string` | No | Callback URL when the purchase status is `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Callback URL when the purchase status is `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Callback URL when the purchase status is `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Callback URL when the purchase status is `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | Webhook notification URL. The Purchase status is notified to this URL once the payment method processor notifies Bamboo. The notification to this URL is a REST POST with JSON payload instead of redirection. It can also be static and configured by Support Team. |

#### Request example
```json
{
    "PaymentMediaId": 107,
    "Amount":500000,
    "Currency":"CLP",
    "TargetCountryISO" : "CL",
    "Customer": {
        "Email": "john@mail.com"
    },
    "Redirection": {
        "Url_Approved": "https://dummystore.com/checkout/approved",
        "Url_Rejected": "https://dummystore.com/checkout/rejected",
        "Url_Canceled": "https://dummystore.com/checkout/canceled",
        "Url_Pending": "https://dummystore.com/checkout/pending",
        "Url_Notify": "https://webhook.site/9e2dff8b-cec6-4540-bd2d-feafce58a9ed"
    },
    "Description":"this is a test cash purchase"
}
```

### Response parameters
We return the `Purchase` with the status _Pending for Redirection_ and a `CommerceAction` object with `ActionReason` as `REDIRECTION_NEEDED_EXTERNAL_SERVICE` and the `ActionURL` parameter with the external service URL. You must redirect the customer to this URL to let the customer generate the coupon and complete the payment in a _**Klap**_ office.

![PrintScreen](/assets/Klap.png)

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example

```json
{
    "Response": {
        "PurchaseId": 1133799,
        "Created": "2023-08-31T18:29:17.380",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1152713,
            "Created": "2023-08-31T18:29:17.380",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-08-31T21:29:17.380",
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
        "Amount": 500000,
        "OriginalAmount": 500000,
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
                    "PaymentProfileId": 95561,
                    "PaymentMediaId": 107,
                    "Created": "2023-02-16T18:22:37.597",
                    "LastUpdate": "2023-08-31T21:29:16.617",
                    "Brand": "Multicaja",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "PhysicalNetwork",
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
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133799",
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
            "AcquirerID": 49,
            "Name": "Multicaja Redirect",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_c3939722-8c71-437d-a368-3b0349335233",
            "ActionBody": null,
            "ActionSessionId": "CA_c3939722-8c71-437d-a368-3b0349335233"
        },
        "PurchasePaymentProfileId": 95561,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CL",
            "TargetCurrencyISO": "CLP",
            "TargetAmount": 5000
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