---
title: "Alternative Payment Methods"
linkTitle: "Alternative Payment Methods"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with PSE, Cash and Nequi.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for Alternative Payment methods will remain _Pending_ until the customer completes payment either in their banking app (using PSE), Nequi or at a physical payment office.
{{% /alert %}}

## PSE
PSE (Pagos Seguros en Línea) is a widely used online payment system in Colombia. It enables secure electronic transactions by allowing users to make payments directly from their bank accounts.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**538**_. |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | Yes | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/colombia.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | Yes | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | Yes | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | Yes | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | Yes | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | Yes | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `AddressType` | `string` | Yes | Type of address. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `Redirection` → `Url_Approved` | `string` | No | Callback URL when the purchase status is `Approved`. |
| `Redirection` → `Url_Rejected` | `string` | No | Callback URL when the purchase status is `Rejected`. |
| `Redirection` → `Url_Canceled` | `string` | No | Callback URL when the purchase status is `Canceled`. |
| `Redirection` → `Url_Pending` | `string` | No | Callback URL when the purchase status is `Pending`. |
| `Redirection` → `Url_Notify` | `string` | No | Webhook notification URL. The Purchase status is notified to this URL once the payment method processor notifies Bamboo. The notification to this URL is a REST POST with JSON payload instead of redirection. It can also be static and configured by Support Team. |

#### Request example
```json
{
    "PaymentMediaId": 538,
    "Order": "QA245",
    "Capture": "true",
    "Amount": 1000,
    "Installments": 1,
    "Currency": "USD",
    "CrossBorderData": {
        "TargetCountryISO": "CO"
    },
    "Description": "Compra de prueba",
    "Customer": {
        "BillingAddress": {
            "AddressType": 1,
            "Country": "COL",
            "State": "Antioquia",
            "City": "Medellin",
            "AddressDetail": "Cra 45 # 76B Sur - 57"
        },
        "FirstName": "Miguel",
        "LastName": "Moreno",
        "DocNumber": "52960268",
        "DocumentTypeId": 11,
        "PhoneNumber": "24022330",
        "Email": "mmoreno@mail.com"
    },
    "Redirection": {
        "Url_Approved": "https://dummystore.com/checkout/response",
        "Url_Rejected": "https://dummystore.com/checkout/response",
        "Url_Canceled": "https://dummystore.com/checkout/response",
        "Url_Pending": "https://dummystore.com/checkout/response"
    }
}
```

### Response parameters
We return the `Purchase` with the status _Pending for Redirection_ and a `CommerceAction` object with `ActionReason` as `REDIRECTION_NEEDED_EXTERNAL_SERVICE` and the `ActionURL` parameter with the external service URL. You must redirect the customer to this URL to finish the payment following the PSE flow. In this flow, your payer selects their bank, choose whether they are a Natural or Legal person and their document type.

![PrintScreen](/assets/PSE.png)

According to the result of the transaction, the payer will be directed to the URL defined in the `Redirection` object. For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example 
```json
{
    "Response": {
        "PurchaseId": 1266731,
        "Created": "2024-01-30T12:58:38.498",
        "TrxToken": null,
        "Order": "QA245",
        "Transaction": {
            "TransactionID": 1287664,
            "Created": "2024-01-30T12:58:38.498",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2024-01-30T15:58:38.498",
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
        "Amount": 3140600,
        "OriginalAmount": 3140600,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "COP",
        "Description": "Compra de prueba",
        "Customer": {
            "CustomerId": 269124,
            "Created": "2024-01-30T12:58:38.197",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "mmoreno@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 0,
                "AddressType": 1,
                "Country": "COL",
                "State": "Antioquia",
                "AddressDetail": "Cra 45 # 76B Sur - 57",
                "PostalCode": null,
                "City": "Medellin"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 274300,
                    "PaymentMediaId": 538,
                    "Created": "2024-01-30T15:58:38.310",
                    "LastUpdate": "2024-01-30T15:58:38.363",
                    "Brand": "PseAvanza",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/269124",
            "FirstName": "Miguel",
            "LastName": "Moreno",
            "DocNumber": "52960268",
            "DocumentTypeId": 11,
            "PhoneNumber": "24022330",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1266731",
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
            "AcquirerID": 149,
            "Name": "Pse Avanza Redirect",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_cc155768-74d9-4efd-8e55-42411b4dd3cf",
            "ActionBody": null,
            "ActionSessionId": "CA_cc155768-74d9-4efd-8e55-42411b4dd3cf"
        },
        "PurchasePaymentProfileId": 274300,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CO",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 10
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

## Cash
The Cash payment method allows your customers to generate a coupon and complete the payment in a physical payment office.

### Cash acquirers
You can offer your customer the possibility to pay using cash in the following networks:

<div id="shortTable"></div>

| | Payment MediaId| Description |
|-----|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Apostar_PhysicalNetwork.png" width="52" /> | 36 | Apostar |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Bancolombia_PhysicalNetwork.png" width="52" /> | 37 | Bancolombia |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Efecty_PhysicalNetwork.png" width="52" /> | 38 | Efecty |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Gana_PhysicalNetwork.png" alt="Diners" width="52" /> | 39 | Gana |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Puntored_PhysicalNetwork.png" width="52" /> | 40 | Puntored |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Superpagos_PhysicalNetwork.png" width="52" /> | 42 | Superpagos |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Sured_PhysicalNetwork.png" width="52" /> | 43 | SuRed |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Susuerte_PhysicalNetwork.png" width="52" /> | 44 | SuSuerte |

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | Send the `PaymentMediaId` according to the selected Cash acquirer in this [table](#cash-acquirers). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/colombia.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | Yes | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

{{% alert title="Considerations" color="info"%}}
* Colombian Pesos don't support decimal amounts, so all received values will be rounded.
* The `amount` value needs to include two zeros as decimal places. Example `COP 5.000` > `500000`.
{{% /alert %}}

#### Request example
```json
{
    "PaymentMediaId": 38,
    "Currency": "COP",
    "TargetCountryIso" : "CO",
    "MetadataIn" : {
        "PaymentExpirationInMinutes": "7200"
    },
    "Customer": {
        "BillingAddress": {
          "AddressType": 1,
          "Country": "COL",
          "State": "Antioquia",
          "City": "Medellin",
          "AddressDetail": "Cra 45 # 76B Sur - 57"
        },
        "FirstName" : "Miguel",
        "LastName": "Moreno",
        "DocNumber" : "52960268",
        "DocumentTypeId": 11,
        "PhoneNumber" : "24022330",
        "Email": "mmoreno@mail.com"
    },
    "Amount": 100000,
   
    "Capture":true,
    "Description":"This is a Cash test"
}
```

### Response parameters
In the response, you will find the following parameters:

| Property | Type | Description |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL of the coupon to be presented by your customer in the physical network. |
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Payment reference returned by the acquirer to identify the order generated. |
| `Response` → `MetadataOut` → `PaymentExpirationDate` | `date` | Date when the payment will expire.<br>Format _DD/MM/YYYY_. |
| `Response` → `MetadataOut` → `AgreementCode` | `string`  | Agreement number between the acquirer and the physical network. |

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example 
```json
{
    "Response": {
        "PurchaseId": 1131277,
        "Created": "2023-08-17T21:15:42.794",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1149206,
            "Created": "2023-08-17T21:15:42.794",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "Status": null,
                    "ResponseCode": "0000",
                    "ResponseMessage": "OK",
                    "Error": null,
                    "AuthorizationCode": "6273036",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{\"Operacion\":\"CREADA\",\"OrdenID\":\"1131277\",\"PVOrdenID\":\"1364048\",\"Referencia\":\"6273036\"}"
                }
            ]
        },
        "Capture": true,
        "Amount": 100000,
        "OriginalAmount": 100000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "COP",
        "Description": "This is a Cash test",
        "Customer": {
            "CustomerId": 248888,
            "Created": "2023-08-17T21:15:42.007",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "mmoreno@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 372870,
                "AddressType": 2,
                "Country": "COL",
                "State": "Antioquia",
                "AddressDetail": "Cra 45 # 76B Sur - 57",
                "PostalCode": null,
                "City": "Medellin"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 253555,
                    "PaymentMediaId": 38,
                    "Created": "2023-08-17T21:15:42.200",
                    "LastUpdate": "2023-08-17T21:15:42.530",
                    "Brand": "Efecty",
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
                    "DocumentNumber": "52960268",
                    "DocumentTypeId": 2,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/248888",
            "FirstName": "Miguel",
            "LastName": "Moreno",
            "DocNumber": "52960268",
            "DocumentTypeId": 11,
            "PhoneNumber": "24022330",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1131277",
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
            "AcquirerID": 88,
            "Name": "PayvalidaCashPFCO",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 253555,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "7200"
        },
        "MetadataOut": {
            "PaymentUrl": "https://s3.amazonaws.com/gateway.stage.bamboopayment.com/purchase-coupons/1131277_691e4de3-6eda-43ce-a01d-a6ea539d70fe_20231117.html",
            "PaymentCode": "6273036",
            "PaymentExpirationDate": "22/08/2023",
            "AgreementCode": "110342"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CO",
            "TargetCurrencyISO": "COP",
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
        "TargetCountryISO": null
    },
    "Errors": []
}
```

## Nequi QR
Allows your customer to pay by scanning a QR code using their Nequi application. Bamboo's Payment API generates the QR code in the response to the payment request.

#### Payment Flow {#qr-code}
<img src="/assets/NequiQREN.png" width="100%" alt="Nequi QR Payment Flow"/>

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**67**_. |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/colombia.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

#### Request example
```json
{
    "PaymentMediaId": 67,
    "Order": "15e04d37-89b7-46de-8cfa-02e4f5607b4f-331331213321",
    "Amount": 1000,
    "Description":"This is a nequi test transaction",
    "TargetCountryISO": "CO",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "COP",
    "Capture": true,
    "Customer": {
        "FirstName": "Rosa",
        "LastName": "Peralta",
        "PhoneNumber": "3188060418",
        "Email": "admin@dev.com",
        "DocNumber": 12345672,
        "DocumentTypeId": 12,
        "BillingAddress": {
            "AddressType": 1,
            "Country": "COL",
            "State": "Bogota",
            "City": "Bogota",
            "AddressDetail": "Address 123"
        }
    }
}
```

### Response parameters
The following example shows the response to the request.

```json
{
    "Response": {
        "PurchaseId": 1131320,
        "Created": "2023-08-18T12:41:08.102",
        "TrxToken": null,
        "Order": "15e04d37-89b7-46de-8cfa-02e4f5607b4f-331331213321",
        "Transaction": {
            "TransactionID": 1149264,
            "Created": "2023-08-18T12:41:08.102",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "Status": null,
                    "ResponseCode": "0",
                    "ResponseMessage": "SUCCESS",
                    "Error": null,
                    "AuthorizationCode": "",
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 1000,
        "OriginalAmount": 1000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "COP",
        "Description": "This is a nequi test transaction",
        "Customer": {
            "CustomerId": 248933,
            "Created": "2023-08-18T12:41:07.150",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "admin@dev.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 372893,
                "AddressType": 2,
                "Country": "COL",
                "State": "Bogota",
                "AddressDetail": "Address 123",
                "PostalCode": null,
                "City": "Bogota"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 253600,
                    "PaymentMediaId": 67,
                    "Created": "2023-08-18T12:41:07.287",
                    "LastUpdate": "2023-08-18T12:41:07.773",
                    "Brand": "NequiQr",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/248933",
            "FirstName": "Rosa",
            "LastName": "Peralta",
            "DocNumber": "12345672",
            "DocumentTypeId": 12,
            "PhoneNumber": "3188060418",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1131320",
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
            "AcquirerID": 75,
            "Name": "Nequi Qr",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 253600,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "CodeQr": "bancadigital-C001-10011-1131320",
            "Base64Qr": "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAAFKCAIAAAD0S4FSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGIElEQVR4nO3dQW4jORAAQRuY/3+596rDgliD5hY7J+JuSS0rwUuB9ed5ni+g6M8XECVvyJI3ZMkbsuQNWfKGLHlDlrwhS96QJW/IkjdkyRuy5A1Z8oYseUOWvCFL3pAlb8iSN2Rt5f39/f3Vsr55bud5d+60W7/vuc+8NvVEO6/8RjvfhtMbsuQNWfKGLHlDlrwhS96QJW/IkjdkyRuyDuZ95+7RqcmztalZq6kn2pm02/nMvd/kmtMbsuQNWfKGLHlDlrwhS96QJW/IkjdkyRuyxvK+8w6wHefm4davPHVv2fqVp+bSdvR+k05vyJI3ZMkbsuQNWfKGLHlDlrwhS96QJW/IkvevmZpMmpoPOzfTxm+RN2TJG7LkDVnyhix5Q5a8IUvekCVvyJI3ZMn7B85tvVy7896yc8+78758kjdkyRuy5A1Z8oYseUOWvCFL3pAlb8iSN2SN5d2bPbpzpu1Od37m56n9Jp3ekCVvyJI3ZMkbsuQNWfKGLHlDlrwhS96QdTDvc7dt3encjWhTfztlaqtpj9MbsuQNWfKGLHlDlrwhS96QJW/IkjdkyRuytvJ+nr9rV+O55z03pzU10zb123jsD/3g9IYseUOWvCFL3pAlb8iSN2TJG7LkDVnyhix3rf3A1PTYnbNlb9xqeudnPvf/dXpDlrwhS96QJW/IkjdkyRuy5A1Z8oYseUPWVt53zqXZIPnp3HbRtak73s497xt/G05vyJI3ZMkbsuQNWfKGLHlDlrwhS96QJW/IeuWG0J35oam/XX9Xb5y0u3Nv6bk5vLU7N5M6vSFL3pAlb8iSN2TJG7LkDVnyhix5Q5a8IeuVG0LfuBPzjRNvU69850zbG7epOr0hS96QJW/IkjdkyRuy5A1Z8oYseUOWvCHr4IbQN86HrZ2beTr3vG+84+3c72qtd0+b0xuy5A1Z8oYseUOWvCFL3pAlb8iSN2TJG7LG7lqb2qg4NZl051bTqTm8O6cS185N+J0rxekNWfKGLHlDlrwhS96QJW/IkjdkyRuy5A1ZW3mbAPvvpnZT7jj3/33jK5/7H7lrDfgxeUOWvCFL3pAlb8iSN2TJG7LkDVnyhqyDeU9tcnyjO3ePntsuuvO+5175jTtA15zekCVvyJI3ZMkbsuQNWfKGLHlDlrwhS96QNZb3nVsvd5zbIHnnPW1TmzrXpr6rc9OBO5zekCVvyJI3ZMkbsuQNWfKGLHlDlrwhS96QtZX31KTO+n2nJsDunIiaeuWp73nqPzj1mdec3pAlb8iSN2TJG7LkDVnyhix5Q5a8IUvekDW2IfTOibepTY5T83BvfN4p52baznF6Q5a8IUvekCVvyJI3ZMkbsuQNWfKGLHlD1ljed25jnJqXunOWbupTTT3v2tSuVXetAf9C3pAlb8iSN2TJG7LkDVnyhix5Q5a8IWss76mbq6b2eN65P/TO+bA33rW25q414JfJG7LkDVnyhix5Q5a8IUvekCVvyJI3ZG3l3dtNubYzebYz0zblzunAqTvP3sjpDVnyhix5Q5a8IUvekCVvyJI3ZMkbsuQNWVt596Z8pu48Wzu31fTcHN7O++6YmpabumlvzekNWfKGLHlDlrwhS96QJW/IkjdkyRuy5A1ZB/O2ffLTnXfLndt62fuepyb8dji9IUvekCVvyJI3ZMkbsuQNWfKGLHlDlrwhayzvqZvJ/jZTt5qtvXGb6p1zaWtOb8iSN2TJG7LkDVnyhix5Q5a8IUvekCVvyJL3FXbu8ZqapprapnrnVOKdn0rekCVvyJI3ZMkbsuQNWfKGLHlDlrwhS96QJe//yc5c2s4rnzM1D/f9wt2j5/77a/KGLHlDlrwhS96QJW/IkjdkyRuy5A1Z8oassbyf3B5Pd5791vvuzHj1bnHb4fSGLHlDlrwhS96QJW/IkjdkyRuy5A1Z8oasg3lP3Yl1zrmppqk5rbU7J+3OvfIbn3fN6Q1Z8oYseUOWvCFL3pAlb8iSN2TJG7LkDVlbeffupjrnzjktPj3uWgPeQt6QJW/IkjdkyRuy5A1Z8oYseUOWvCFL3pAlb8iSN2TJG7LkDVnyhix5Q5a8IUvekCVvyPoHCAZLDsfj59kAAAAASUVORK5CYII="
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CO",
            "TargetCurrencyISO": "COP",
            "TargetAmount": 10
        },
        "Redirection": null,
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {
            "AntifraudFingerprintId": null,
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "PurchaseType": 1,
        "TargetCountryISO": null
    },
    "Errors": []
} 
```
<br>

In the field `MetadataOut` inside the purchase `Response` object, the QR code is returned as a _base64_ image (Parameter `Base64Qr`); add this image inside an image HTML tag. For example:

```html
<img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAUoAAAFKCAIAAAD0S4FSAAAACXBIWXMAAA7EAAAOxAGVKw4bAAAGIElEQVR4nO3dQW4jORAAQRuY/3+596rDgliD5hY7J+JuSS0rwUuB9ed5ni+g6M8XECVvyJI3ZMkbsuQNWfKGLHlDlrwhS96QJW/IkjdkyRuy5A1Z8oYseUOWvCFL3pAlb8iSN2Rt5f39/f3Vsr55bud5d+60W7/vuc+8NvVEO6/8RjvfhtMbsuQNWfKGLHlDlrwhS96QJW/IkjdkyRuyDuZ95+7RqcmztalZq6kn2pm02/nMvd/kmtMbsuQNWfKGLHlDlrwhS96QJW/IkjdkyRuyxvK+8w6wHefm4davPHVv2fqVp+bSdvR+k05vyJI3ZMkbsuQNWfKGLHlDlrwhS96QJW/IkvevmZpMmpoPOzfTxm+RN2TJG7LkDVnyhix5Q5a8IUvekCVvyJI3ZMn7B85tvVy7896yc8+78758kjdkyRuy5A1Z8oYseUOWvCFL3pAlb8iSN2SN5d2bPbpzpu1Od37m56n9Jp3ekCVvyJI3ZMkbsuQNWfKGLHlDlrwhS96QdTDvc7dt3encjWhTfztlaqtpj9MbsuQNWfKGLHlDlrwhS96QJW/IkjdkyRuytvJ+nr9rV+O55z03pzU10zb123jsD/3g9IYseUOWvCFL3pAlb8iSN2TJG7LkDVnyhix3rf3A1PTYnbNlb9xqeudnPvf/dXpDlrwhS96QJW/IkjdkyRuy5A1Z8oYseUPWVt53zqXZIPnp3HbRtak73s497xt/G05vyJI3ZMkbsuQNWfKGLHlDlrwhS96QJW/IeuWG0J35oam/XX9Xb5y0u3Nv6bk5vLU7N5M6vSFL3pAlb8iSN2TJG7LkDVnyhix5Q5a8IeuVG0LfuBPzjRNvU69850zbG7epOr0hS96QJW/IkjdkyRuy5A1Z8oYseUOWvCHr4IbQN86HrZ2beTr3vG+84+3c72qtd0+b0xuy5A1Z8oYseUOWvCFL3pAlb8iSN2TJG7LG7lqb2qg4NZl051bTqTm8O6cS185N+J0rxekNWfKGLHlDlrwhS96QJW/IkjdkyRuy5A1ZW3mbAPvvpnZT7jj3/33jK5/7H7lrDfgxeUOWvCFL3pAlb8iSN2TJG7LkDVnyhqyDeU9tcnyjO3ePntsuuvO+5175jTtA15zekCVvyJI3ZMkbsuQNWfKGLHlDlrwhS96QNZb3nVsvd5zbIHnnPW1TmzrXpr6rc9OBO5zekCVvyJI3ZMkbsuQNWfKGLHlDlrwhS96QtZX31KTO+n2nJsDunIiaeuWp73nqPzj1mdec3pAlb8iSN2TJG7LkDVnyhix5Q5a8IUvekDW2IfTOibepTY5T83BvfN4p52baznF6Q5a8IUvekCVvyJI3ZMkbsuQNWfKGLHlD1ljed25jnJqXunOWbupTTT3v2tSuVXetAf9C3pAlb8iSN2TJG7LkDVnyhix5Q5a8IWss76mbq6b2eN65P/TO+bA33rW25q414JfJG7LkDVnyhix5Q5a8IUvekCVvyJI3ZG3l3dtNubYzebYz0zblzunAqTvP3sjpDVnyhix5Q5a8IUvekCVvyJI3ZMkbsuQNWVt596Z8pu48Wzu31fTcHN7O++6YmpabumlvzekNWfKGLHlDlrwhS96QJW/IkjdkyRuy5A1ZB/O2ffLTnXfLndt62fuepyb8dji9IUvekCVvyJI3ZMkbsuQNWfKGLHlDlrwhayzvqZvJ/jZTt5qtvXGb6p1zaWtOb8iSN2TJG7LkDVnyhix5Q5a8IUvekCVvyJL3FXbu8ZqapprapnrnVOKdn0rekCVvyJI3ZMkbsuQNWfKGLHlDlrwhS96QJe//yc5c2s4rnzM1D/f9wt2j5/77a/KGLHlDlrwhS96QJW/IkjdkyRuy5A1Z8oassbyf3B5Pd5791vvuzHj1bnHb4fSGLHlDlrwhS96QJW/IkjdkyRuy5A1Z8oasg3lP3Yl1zrmppqk5rbU7J+3OvfIbn3fN6Q1Z8oYseUOWvCFL3pAlb8iSN2TJG7LkDVlbeffupjrnzjktPj3uWgPeQt6QJW/IkjdkyRuy5A1Z8oYseUOWvCFL3pAlb8iSN2TJG7LkDVnyhix5Q5a8IUvekCVvyPoHCAZLDsfj59kAAAAASUVORK5CYII=" id="qr-code-display" style="max-width: 400px;">
```

<br>

Result:

<img src="/assets/QRNequi.png" width="40%" alt="PrintScreen"/>


## Nequi Push
Using this payment method, your customer will receive a notification to open their _Nequi_ app to accept or reject the payment.

#### Payment Flow {#push-notification}
<img src="/assets/NequiPushEN.png" width="100%" alt="Nequi Payment Flow"/>

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**68**_. |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/colombia.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. The format number must be 10 digits long and must not have prefixes. Example: _3188255555_. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

#### Request example
```json
{
    "PaymentMediaId": 68,
    "Order": "15e04d37-89b7-46de-8cfa-02e4f5607b4f-331331213321",
    "Amount": 1000,
    "Description":"This is a nequi test transaction",
    "TargetCountryISO": "CO",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "COP",
    "Capture": true,
    "Customer": {
        "FirstName": "Rosa",
        "LastName": "Peralta",
        "PhoneNumber": "3188060418",
        "Email": "admin@dev.com",
        "DocNumber": 12345672,
        "DocumentTypeId": 12,
        "BillingAddress": {
            "AddressType": 1,
            "Country": "COL",
            "State": "Bogota",
            "City": "Bogota",
            "AddressDetail": "Address 123"
        }
    }
}
```

### Response parameters
_Nequi_ generates the payment order and sends a push notification to the payer; then, the payer needs to log in Nequi app to accept or reject the payment.

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase_v3.md >}}#response-parameters) of the Purchase creation.

#### Response example

```json
{
    "Response": {
        "PurchaseId": 1131361,
        "Created": "2023-08-18T15:05:25.048",
        "TrxToken": null,
        "Order": "15e04d37-89b7-46de-8cfa-02e4f5607b4f-331331213321",
        "Transaction": {
            "TransactionID": 1149323,
            "Created": "2023-08-18T15:05:25.048",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "Status": null,
                    "ResponseCode": "0",
                    "ResponseMessage": "SUCCESS",
                    "Error": null,
                    "AuthorizationCode": "",
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 1000,
        "OriginalAmount": 1000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "COP",
        "Description": "This is a nequi test transaction",
        "Customer": {
            "CustomerId": 248964,
            "Created": "2023-08-18T15:05:24.333",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "admin@dev.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 372921,
                "AddressType": 2,
                "Country": "COL",
                "State": "Bogota",
                "AddressDetail": "Address 123",
                "PostalCode": null,
                "City": "Bogota"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 253630,
                    "PaymentMediaId": 68,
                    "Created": "2023-08-18T15:05:24.473",
                    "LastUpdate": "2023-08-18T15:05:24.770",
                    "Brand": "NequiPush",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/248964",
            "FirstName": "Rosa",
            "LastName": "Peralta",
            "DocNumber": "12345672",
            "DocumentTypeId": 12,
            "PhoneNumber": "3188060418",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1131361",
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
            "AcquirerID": 76,
            "Name": "Nequi Push",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 253630,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "CO",
            "TargetCurrencyISO": "COP",
            "TargetAmount": 10
        },
        "Redirection": null,
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {
            "AntifraudFingerprintId": null,
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "PurchaseType": 1,
        "TargetCountryISO": null
    },
    "Errors": []
}
```