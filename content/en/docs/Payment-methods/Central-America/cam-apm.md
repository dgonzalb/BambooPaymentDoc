---
title: "Cash"
linkTitle: "Cash"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with Cash.
weight: 20
tags: ["subtopic"]
---

## PuntoXpress
_PuntoXpress_ is a cash collection network with regional coverage in Central America. When the customers of e-commerce platforms make purchases on the e-commerce websites, the e-commerce platform requests us to generate a debt. Subsequently, the customer goes to a PuntoXpress collection point, checks the debt associated with a reference, makes the payment, notifies us, and we notify the merchant.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**28**_. |
| `CrossBorderData` → `TargetCountryISO` | `string` | No<sup>*</sup> | Indicate the destination currency.<br><sup>*</sup>_This field is required for CrossBorder purchases_. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/docs/payment-methods/central-america.html#document-types) to see the possible values. |
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
    "PaymentMediaId": 28,
    "Amount": 10000,
    "Currency": "CRC",
    "Capture": true,
    "Customer": {
        "Email": "john@bamboopayment.com",
        "FirstName": "John",
        "LastName": "Doe",
        "PhoneNumber": "12345672",
        "DocNumber": "139899768",
        "DocumentTypeId": 30
    },
    "CrossBorderData": {
        "TargetCountryISO": "CR"
    },
    "Description": "Prueba PuntoXpress"
}
```

### Response parameters
In the response, you find the parameter `MetadataOut.PaymentCode` with the reference number of the generated debt that the customer must present in a `PuntoXpress` agency to pay the debt. Furthermore, the parameter `MetadataOut.PaymentExpirationDate` displays the validity date in ISO 8601 format (_YYYY-MM-DDTHH:MM:SS_).

#### Response example

```json
{
    "Response": {
        "PurchaseId": 1133713,
        "Created": "2023-08-31T17:46:23.014",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1152618,
            "Created": "2023-08-31T17:46:23.013",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "0 Transaction registered in PagosWeb",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "CashPaymentGetPWData",
                    "Created": "2023-08-31T17:46:23.220",
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
                    "Created": "2023-08-31T17:46:23.907",
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
        "Amount": 10000,
        "OriginalAmount": 10000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "CRC",
        "Description": "Prueba PuntoXpress",
        "Customer": {
            "CustomerId": 88230,
            "Created": "2022-12-08T11:30:35.933",
            "CommerceCustomerId": null,
            "Owner": "Commerce",
            "Email": "John@bamboopayment.com",
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
            "DocumentTypeId": 30,
            "PhoneNumber": "12345672",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1133713",
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
            "AcquirerID": 57,
            "Name": "Punto Xpress CostaRica",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255349,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": {
            "PaymentCode": "1133713",
            "PaymentMerchantId": "772",
            "PaymentExpirationDate": "2023-09-01T14:46:23-03:00"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CR",
            "TargetCurrencyISO": "CRC",
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