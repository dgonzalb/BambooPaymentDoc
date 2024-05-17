---
title: "Alternative Payment Methods"
linkTitle: "Alternative Payment Methods"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with cash and Bank transfers.
weight: 30
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for Alternative Payment methods will remain _Pending_ until the customer completes payment either in their bank app or at a physical payment office.
{{% /alert %}}

## Cash
The Cash payment method allows your customers to generate a coupon and complete the payment in a physical payment office.

### Cash acquirers

<div id="shortTable"></div>

| | Payment MediaId | Acquirer |
|-----|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Abitab_PhysicalNetwork.png"  width="52" /> | 5 | Abitab |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/RedPagos_PhysicalNetwork.png"  width="52" /> | 10 | RedPagos |

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | Send the `PaymentMediaId` according to the selected Cash acquirer in this [table](#cash-acquirers). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | Yes | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/uruguay.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | Yes | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

#### Request example
```json
{
    "PaymentMediaId": 10,
    "Order": "ORD1",
    "Amount": 2000,
    "Description":"Test transaction",
    "TargetCountryISO": "UY",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "UYU",
    "Capture": true,
    "Customer": {
        "Email": "testuser@mail.com",
        "BillingAddress": {
          "AddressType": 1,
          "Country": "Uruguay",
          "State": "Montevideo",
          "City": "Montevideo",
          "AddressDetail": "La Paz 1020"
        },
        "FirstName" : "Mark",
        "LastName": "Doe",
        "DocNumber" : "12345672",
        "DocumentTypeId": 2,
        "PhoneNumber" : "099111222"
    }
}
```

### Response parameters
In the `MetadataOut.PaymentBarcodeUrl` parameter, the response returns the coupon in _PDF_ format that the client must present in the agency to pay the generated debt.

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

#### Response example 
```json
{
    "Response": {
        "PurchaseId": 1131112,
        "Created": "2023-08-16T20:39:35.973",
        "Order": "ORD1",
        "Transaction": {
            "TransactionID": 1149013,
            "Created": "2023-08-16T20:39:35.973",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "Description": " ",
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "ResponseCode": "0",
                    "ResponseMessage": "Transaction registered in PagosWeb",
                    "AcquirerResponseDetail": "{\"TransactionIdFromPW\":\"190511\",\"PaymentBarcodeUrl\":\"Https://gateway.stage.bamboopayment.com/purchase-coupons/PW_190511_20230817.pdf\"}"
                }
            ]
        },
        "Capture": true,
        "Amount": 2000,
        "OriginalAmount": 2000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "UYU",
        "Description": "Transaccion de prueba redpagos",
        "Customer": {
            "CustomerId": 248794,
            "Created": "2023-08-16T20:39:35.000",
            "Owner": "Anonymous",
            "Email": "fsum@mail.com",
            "Enabled": true,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 253461,
                    "PaymentMediaId": 10,
                    "Created": "2023-08-16T20:39:35.110",
                    "LastUpdate": "2023-08-16T20:39:35.613",
                    "Brand": "RedPagos",
                    "Type": "PhysicalNetwork",
                    "IdCommerceToken": 0,
                    "Last4": "",
                    "DocumentNumber": "12345672",
                    "DocumentTypeId": 2
                }
            ],
            "URL": "https://api.stage.bamboopayment.com/Customer/248794",
            "FirstName": "Rose",
            "LastName": "Astrid",
            "DocNumber": "12345672",
            "DocumentTypeId": 2,
            "PhoneNumber": "099111222"
        },
        "URL": "https://api.stage.bamboopayment.com/Purchase/1131112",
        "DataUY": {
            "IsFinalConsumer": false,
            "TaxableAmount": 0
        },
        "DataDO": {
            "Tax": 0
        },
        "Acquirer": {
            "AcquirerID": 71,
            "Name": "RedPagosPayFac"
        },
        "PurchasePaymentProfileId": 253461,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "TransactionIdFromPW": "190511",
            "PaymentBarcodeUrl": "Https://gateway.stage.bamboopayment.com/purchase-coupons/PW_190511_20230817.pdf"
        },
        "CrossBorderDataResponse": {
            "TargetCountryISO": "UY",
            "TargetCurrencyISO": "UYU",
            "TargetAmount": 20
        },
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {},
        "PurchaseType": 1
    },
    "Errors": []
}
```

<!--## Online Bank transfers {#bank-transfers}
The flow of this payment method is _**Redirect**_, so the customer is required to be directed to another page where they will complete the payment. In the [Response parameters sections](#response-parameters-1) you can find the parameter of the redirection URL. For more information refer to [Redirect purchase]({{< ref Redirect-Purchase.md >}}).

### Supported banks
You can offer to your customers the possibility to pay using bank transfers if the customer's account is in the following banks:

<div id="shortTable"></div>

| | Payment MediaId | Bank |
|-----|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/E-Brou_BankTransfer.png" width="52" style="" /> | 101 | E-Brou |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Santander_BankTransfer.png" width="52" style="" /> | 102 | Santander |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Scotiabank_BankTransfer.png" width="52" style="" /> | 104 | Scotiabank |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Itau_BankTransfer.png" width="52" style="" /> | 105 | Itau |

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | Send the `PaymentMediaId` according to the Customer's bank in the [Supported Banks table](#supported-banks). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/uruguay.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `sourceReference` | `string` | No | This field is used to configure a Bank reference for the customer. |
| `MetaDataIn` → `destinationReference` | `string` | No | This field is used to configure a bank reference for the merchant. The API applies a default value if you don't provide this information. |
| `MetaDataIn` → `externalReference` | `string` | No | This field is used to configure a external reference of the system who invokes the API. |

#### Request example
```json
{
    "PaymentMediaId": 105,
    "Order":"QA464",
    "Capture":"true",
    "Amount":35,
    "Installments":1,
    "Currency":"USD",
    "TargetCountryISO" : "UY",
    "Description" : "Test Purchase",
    "Customer": {
        "Email": "testuser@mail.com",
        "BillingAddress": {
          "AddressType": 1,
          "Country": "Uruguay",
          "State": "Montevideo",
          "City": "Montevideo",
          "AddressDetail": "La Paz 1020"
        },
        "FirstName" : "Mark",
        "LastName": "Doe",
        "DocNumber" : "12345672",
        "DocumentTypeId": 2,
        "PhoneNumber" : "099111222"
    },
    "MetaDataIn" : {
        "externalReference" : "External reference test",
        "sourceReference": "Source reference test",
        "destinationReference" : "Destination reference test"
    }
}
```

### Response parameters
As you need to redirect your customer to an external page to complete the payment, you can find the redirection URL in the `MetadataOut.ActionURL` parameter.

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

#### Response example
```json
{
    "Response": {
        "PurchaseId": 141588,
        "Created": "2023-05-26T16:56:23.456",
        "TrxToken": null,
        "Order": "QA464",
        "Transaction": {
            "TransactionID": 152261,
            "Created": "2023-05-26T16:56:23.456",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-05-26T19:56:23.456",
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
        "Amount": 1383,
        "OriginalAmount": 1383,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "UYU",
        "Description": "Test Purchase",
        "Customer": {
            "CustomerId": 62928,
            "Created": "2023-05-26T16:56:22.857",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "testuser@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 0,
                "AddressType": 1,
                "Country": "Uruguay",
                "State": "Montevideo",
                "AddressDetail": "La Paz 1020",
                "PostalCode": null,
                "City": "Montevideo"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 64785,
                    "PaymentMediaId": 105,
                    "Created": "2023-05-26T19:56:22.880",
                    "LastUpdate": "2023-05-26T19:56:22.927",
                    "Brand": "Itau",
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
            "URL": "https://devapi.siemprepago.com/v1/api/Customer/62928",
            "FirstName": "Mark",
            "LastName": "Doe",
            "DocNumber": "12345672",
            "DocumentTypeId": 2,
            "PhoneNumber": "099111222",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://devapi.siemprepago.com/v1/api/Purchase/141588",
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
            "AcquirerID": 102,
            "Name": "Infinia Redirect",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.dev.bamboopayment.com/CA_04079e7b-8b27-45bb-8881-c940566fc9e6",
            "ActionBody": null,
            "ActionSessionId": "CA_04079e7b-8b27-45bb-8881-c940566fc9e6"
        },
        "PurchasePaymentProfileId": 64785,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "externalReference": "External reference test",
            "sourceReference": "Source reference test",
            "destinationReference": "Destination reference test"
        },
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "UY",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 0.35
        },
        "Redirection": null,
        "AntifraudData": null,
        "PaymentMediaId": null,
        "TargetCountryISO": null,
        "PurchaseType": 1,
        "IsFirstRecurrentPurchase": false
    },
    "Errors": []
}
``` -->

## Bank Transfers {#bank-transfers}
With **Bank Transfers** allow your customers to make payments using bank transfers. Customers will need to transfer the purchase amount to the specified account details provided in the response using their home banking system. We accept payments from all banks.


### Request parameters 
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**532**_. |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | No | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/uruguay.html#document-types) to see the possible values. |
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
    "PaymentMediaId": 532,
    "Order": "QA83",
    "Capture": "true",
    "Amount": 100000,
    "Installments": 1,
    "Currency": "USD",
    "CrossBorderData": {
        "TargetCountryISO": "UY"
    },
    "Description": "Compra de prueba",
    "Customer": {
        "Email": "testuser@mail.com",
        "BillingAddress": {
            "AddressType": 1,
            "Country": "Uruguay",
            "State": "Montevideo",
            "City": "Montevideo",
            "AddressDetail": "La Paz 1020"
        },
        "FirstName": "Mark",
        "LastName": "Doe",
        "DocNumber": "12345672",
        "DocumentTypeId": 2,
        "PhoneNumber": "099111222"
    },
    "MetaDataIn": {
        "PaymentExpirationInMinutes": 60
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
We return the `Purchase` with the status _Pending for Redirection_ and a `CommerceAction` object with `ActionReason` as `REDIRECTION_NEEDED_EXTERNAL_SERVICE` and the `ActionURL` parameter with the URL of the coupon. In this URL, the payer must log in to their home banking app and complete the payment. Refer to the [Payment Experience](#payment-experience) section to see the payment flow.

For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

#### Response example

```json
{
    "Response": {
        "PurchaseId": 1260840,
        "Created": "2023-12-14T11:01:12.829",
        "TrxToken": null,
        "Order": "QA83",
        "Transaction": {
            "TransactionID": 1280797,
            "Created": "2023-12-14T11:01:12.829",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-12-14T14:01:12.829",
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
        "Amount": 3188058,
        "OriginalAmount": 3188058,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "UYU",
        "Description": "Compra de prueba",
        "Customer": {
            "CustomerId": 263761,
            "Created": "2023-12-14T11:01:12.473",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "testuser@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": {
                "AddressId": 0,
                "AddressType": 1,
                "Country": "Uruguay",
                "State": "Montevideo",
                "AddressDetail": "La Paz 1020",
                "PostalCode": null,
                "City": "Montevideo"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 268802,
                    "PaymentMediaId": 532,
                    "Created": "2023-12-14T14:01:12.597",
                    "LastUpdate": "2023-12-14T14:01:12.670",
                    "Brand": "Infinia",
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
            "URL": "https://api.stage.bamboopayment.com/Customer/263761",
            "FirstName": "Mark",
            "LastName": "Doe",
            "DocNumber": "12345672",
            "DocumentTypeId": 2,
            "PhoneNumber": "099111222",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1260840",
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
            "AcquirerID": 91,
            "Name": "Infinia Redirect",
            "CommerceNumber": null
        },
        "CommerceAction": {
            "ActionType": 1,
            "ActionReason": "REDIRECTION_NEEDED_EXTERNAL_SERVICE",
            "ActionURL": "https://redirect.stage.bamboopayment.com/CA_0cf91fa5-953c-43e9-8fb1-8ebb030d6748",
            "ActionBody": null,
            "ActionSessionId": "CA_0cf91fa5-953c-43e9-8fb1-8ebb030d6748"
        },
        "PurchasePaymentProfileId": 268802,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "60"
        },
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "UY",
            "TargetCurrencyISO": "USD",
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

### Payment experience
As mentioned, you must redirect your customer to the URL returned in the response (parameter `CommerceAction.ActionURL`).

Then, we show your customer the coupon with the bank information to where they need to create the transfer.

<img src="/assets/InfiniaAR/InfiniaAR_05.png" alt="PrintScreen" style="width: 70%; height:auto;"><br>

{{% alert title="Info" color="info"%}}
You can customize this coupon to display your logo at the top. Contact Bamboo support to include it.
{{% /alert %}}

Once your customer completes the transfer, they can use the confirmation button at the bottom of this screen.

<img src="/assets/InfiniaAR/InfiniaAR_06.png" alt="PrintScreen" style="width: 50%; height:auto;">