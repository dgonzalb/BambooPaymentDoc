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

## Card payments using API flow
Using this flow, you can offer the possibility to receive payments using cards without the intervention of the payer.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/en/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Installments` | `integer` | No | This parameter refers to the number of payments that a credit card purchase is divided into. You can select `1`, `3`, `6`, `9`, and `12` installments.<br>Default value is `1`. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/mexico.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `AntifraudData` → `AntifraudFingerprintId` | `string` | Yes | Session Id (`AntifraudFingerprintId`) which is obtained by the javascript function [getSessionAntifraud]({{< ref Antifraud.md>}}#getsessionantifraud). |
| `CustomerIP` | `string` | No | IP of to the customer connected to the commerce website. |

{{% alert title="Info" color="info"%}}

Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

#### Request example
```json
{
    "TrxToken": "OT__WYNtlJ5DPsSaxvloz6E4cbF7mUfOFNAa4jiYpVJ8SzQ_",
    "Capture": true,
    "Order": "20201229",
    "Amount": "10000",
    "CustomerIP": "127.0.0.1",
    "Currency": "USD",
    "TargetCountryISO": "MX",
    "Installments": 1,
    "Customer": {
        "FirstName": "John",
        "LastName": "Doe",
        "Email": "john@mail.com"
    },
    "AntifraudData": {
        "AntifraudFingerprintId": "26109388-1911-4a6c-84dc-212784f3f9d7"
    }
}
```

### Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

#### Response example

```json
{
    "Response": {
        "PurchaseId": 148353,
        "Created": "2023-10-12T13:41:51.503",
        "TrxToken": null,
        "Order": "20201229",
        "Transaction": {
            "TransactionID": 159259,
            "Created": "2023-10-12T13:41:51.503",
            "AuthorizationDate": "",
            "TransactionStatusId": 1,
            "Status": "Approved",
            "ErrorCode": null,
            "Description": "",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-10-12T13:42:02.499",
                    "Status": null,
                    "ResponseCode": "0",
                    "ResponseMessage": "Authorization ",
                    "Error": null,
                    "AuthorizationCode": "801585",
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 142430,
        "OriginalAmount": 142430,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": null,
        "Customer": {
            "CustomerId": 70124,
            "Created": "2023-10-12T13:41:41.857",
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
                    "PaymentProfileId": 71943,
                    "PaymentMediaId": 1,
                    "Created": "2023-10-12T13:41:41.857",
                    "LastUpdate": null,
                    "Brand": "VISA",
                    "CardOwner": "Rodrigo Gutierrez",
                    "Bin": null,
                    "IssuerBank": "Visa",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": "202512",
                    "Last4": "4242",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://devapi.siemprepago.com/v1/api/Customer/70124",
            "FirstName": "John",
            "LastName": "Doe",
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
        "CustomerIP": "127.0.0.1",
        "URL": "https://devapi.siemprepago.com/v1/api/Purchase/148353",
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
            "AcquirerID": 144,
            "Name": "OpenPayCardApi",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 71943,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 100.0
        },
        "Redirection": null,
        "AntifraudData": {
            "AntifraudFingerprintId": "26109388-1911-4a6c-84dc-212784f3f9d7",
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "TargetCountryISO": null,
        "PurchaseType": 1,
        "IsFirstRecurrentPurchase": false
    },
    "Errors": []
}
```

## Testing cards
Use the following cards to simulate the different status of the purchase. These cards apply for both API and redirection flow.

| Brand | PAN | CVV | Expiration Date |
|---|---|---|---|
| Visa | `4111111111111111` | `123` | `10/29` |
| Visa | `4242424242424242` | `123` | `10/29` |
| MasterCard | `5555555555554444` | `123` | `10/29` |
| MasterCard | `5105105105105100` | `123` | `10/29` |
| Amex | `345678000000007` | `1234` | `10/29` |
| Amex | `341111111111111` | `1234` | `10/29` |
| Amex | `343434343434343` | `1234` | `10/29` |
| Carnet | `5062541600005232` | `123` | `10/29` |
| Carnet | `5064050100000063` | `123` | `10/29` |
| Carnet | `5064510000300020` | `123` | `10/29` |