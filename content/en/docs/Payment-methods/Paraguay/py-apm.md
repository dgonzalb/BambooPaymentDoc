---
title: "Alternative Payment Methods"
linkTitle: "Alternative Payment Methods"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with Cash using _Pago Express_.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Note" color="info"%}}
Support for Paraguay only in the **Gateway** model, and we invoice them from Uruguay.
{{% /alert %}}

## Pago Express
_Pago Express_ is a popular method for paying bills and services in _**Paraguay**_, offering convenience and accessibility throughout the country. The customer needs to provide the payment code in a physical branch of _Pago Express_ and complete the payment. Then, _Pago Express_ notifies us, and we report to the merchant.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**27**_. |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/docs/payment-methods/paraguay.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the validity of the generated debt using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

#### Request example
```json
{
    "PaymentMediaId": 27,
    "Order": "12345678",
    "Amount": 10000,
    "TargetCountryISO": "PY",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "43800"
    },
    "Currency": "USD",
    "Capture": true,
    "Customer": {
        "FirstName": "Jaime",
        "LastName": "Benitez",
        "PhoneNumber": "090000001",
        "Email": "jbenitez@mail.com",
        "DocNumber": "1223334444",
        "DocumentTypeId": 2
    }
}
```

### Response parameters
In the response, you find the parameter `MetadataOut.PaymentCode` with the reference number of the generated debt that the customer must present in a _Pago Express_ agency to pay the debt. Furthermore, the parameter `MetadataOut.PaymentExpirationDate` displays the validity date in ISO 8601 format (_YYYY-MM-DDTHH:MM:SS_).

#### Response example

```json
{
    "Response": {
        "PurchaseId": 1244788,
        "Created": "2023-09-13T20:14:54.926",
        "TrxToken": null,
        "Order": "12345678",
        "Transaction": {
            "TransactionID": 1263666,
            "Created": "2023-09-13T20:14:54.927",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "0 Transaction registered in PagosWeb",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-09-13T20:14:55.753",
                    "Status": "Antifraud Approved",
                    "ResponseCode": null,
                    "ResponseMessage": null,
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                },
                {
                    "Step": "CashPaymentGetPWData",
                    "Created": "2023-09-13T20:14:55.923",
                    "Status": "PhysicalNetwork GetData",
                    "ResponseCode": "0",
                    "ResponseMessage": null,
                    "Error": "",
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                },
                {
                    "Step": "CashPayment Authorization",
                    "Created": "2023-09-13T20:14:56.657",
                    "Status": "PhysicalNetwork Pending",
                    "ResponseCode": "0",
                    "ResponseMessage": "Transaction registered in PagosWeb",
                    "Error": "",
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 58233308,
        "OriginalAmount": 58233308,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "PYG",
        "Description": null,
        "Customer": {
            "CustomerId": 252569,
            "Created": "2023-09-13T20:14:54.270",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "jbenitez@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 257359,
                    "PaymentMediaId": 27,
                    "Created": "2023-09-13T20:14:54.463",
                    "LastUpdate": "2023-09-13T20:14:54.630",
                    "Brand": "PagoExpress",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "PhysicalNetwork",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": null,
                    "Last4": "",
                    "Enabled": null,
                    "DocumentNumber": "1223334444",
                    "DocumentTypeId": 2,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/252569",
            "FirstName": "Jaime",
            "LastName": "Benitez",
            "DocNumber": "1223334444",
            "DocumentTypeId": 2,
            "PhoneNumber": "090000001",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1244788",
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
            "AcquirerID": 53,
            "Name": "Pago Express Paraguay",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 257359,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "43800"
        },
        "MetadataOut": {
            "PaymentCode": "1244788",
            "PaymentMerchantId": "772",
            "PaymentExpirationDate": "2023-10-14T03:14:54-03:00"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "PY",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 100
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