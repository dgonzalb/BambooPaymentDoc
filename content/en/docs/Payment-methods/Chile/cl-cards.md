---
title: "Credit and Debit cards"
linkTitle: "Credit and Debit cards"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process credit or debit card payments.
weight: 10
tags: ["subtopic"]
---

You can create the purchase using [API](#card-payments-using-api-flow) or [Redirection](#card-payments-using-redirection-flow) flow.

## Considerations 
* Debit cards using the API flow is available for full capture (Purchase operation).
* The CVV is mandatory for debit cards.
* The maximum time to confirm a transaction is seven calendar days.
* Chile does not support decimal amounts, so all received amount values will be rounded.

## Card payments using API flow
Using this flow, you can offer the possibility to receive payments using cards without the intervention of the payer.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/docs/payment-methods/chile.html#document-types) to see the possible values. |
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

#### Request example
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

### Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

#### Response example

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

## Card payments using Redirection flow
Using this flow, the payer must be redirected to the _**webpay**_ page to complete the payment according to the selected payment method (debit, credit or prepaid card).

The status for purchases with cards using redirection will remain _Pending_ until the customer completes the payment. Click [here]({{< ref Redirect-Purchase.md >}}) to learn more about redirect purchases.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**112**_.<br>_Redirection payment is only available for Visa and MasterCard cards_ |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/docs/payment-methods/chile.html#document-types) to see the possible values. |
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
| `AntifraudData` → `AntifraudFingerprintId` | `string` | No | Session Id (`AntifraudFingerprintId`) which is obtained by the javascript function [getSessionAntifraud](#getsessionantifraud). |
| `CustomerIP` | `string` | No | IP of to the customer connected to the commerce website. |

{{% alert title="Info" color="info"%}}

* The `Redirection` object and its parameter are not required; nevertheless, you must configure it to redirect your customer after the transaction finishes in any status.

{{% /alert %}}

#### Request example
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

### Response parameters
We return the `Purchase` with the status _Pending for Redirection_ and a `CommerceAction` object with `ActionReason` as `REDIRECTION_NEEDED_EXTERNAL_SERVICE` and the `ActionURL` parameter with the external service URL. You must redirect the customer to this URL to finish the payment on the _**webpay**_ page.

![PrintScreen](/assets/WebPay.png)

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

#### Response example

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

## Testing cards
Use the following cards to simulate the different status of the purchase. These cards apply for both API and redirection flow.

### For approved purchases

| Brand | PAN | CVV | Expiration Date | Type |
|---|---|---|---|---|
| Amex | `370000000002032` | `1234` | `10/29` | Credit |
| Visa | `4051885600446623` | `123` | `10/29` | Credit |
| Visa | `4051886000056590` | `123` | `10/29` | Prepaid |
| Redcompra | `4051884239937763` | `123` | `10/29` | Debit |
| Redcompra | `4511346660037060` | `123` | `10/29` | Debit |

{{% alert title="Info note" color="info"%}}
If the RUT and password are requested, please use a valid RUT (for example **11.111.111-1**) and password **123**.
{{% /alert %}}

### For rejected purchases

| Brand | PAN | CVV | Expiration Date | Type |
|---|---|---|---|---|
| MasterCard | `5186059559590568` | `123` | `10/29` | Credit |
| Redcompra | `5186008541233829` | `123` | `10/29` | Debit |
| MasterCard | `5186174110629480` | `123` | `10/29` | Prepaid |