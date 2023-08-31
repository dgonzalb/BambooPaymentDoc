---
title: "Credit and Debit cards"
linkTitle: "Credit and Debit cards"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process credit or debit card payments.
weight: 10
tags: ["subtopic"]
---

## Considerations 
* **For VISA Debit**: It is not required to be in the _Verified by Visa_ program.<br>When operating outside a wallet, you must request the _Expiration Date_ and _CVV_. It serves as a single payment due to being a debit card. It accepts Full Cancellations and Refunds (Total and Partial). It does not allow Two-Step operations (Pre-Authorization).
* **Purchases without CVV**: Allows tokenization and recurrence.<br>In the case of tokenization, the API generates a charge for a minimum of **ARS 3**, which is refunded to validate the cardholder data. With this token, it is possible to make purchases without CVV.

## Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/docs/purchase-workflow/customer-types.html). |
| `CrossBorderData` → `TargetCountryISO` | `string` | No<sup>*</sup> | Indicate the destination currency.<br><sup>*</sup>_This field is required for CrossBorder purchases_. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/docs/payment-methods/argentina.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No<sup>*</sup> | Customer's State.<br><sup>*</sup>_This parameter is required to calculate **II.BB** Tax. Refer to [provinces](/docs/payment-methods/argentina.html#argentina-provinces) to know its possible values_. |
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
    "CrossBorderData" : {
        "TargetCountryISO" : "AR"
    },
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
        "PurchaseId": 1130926,
        "Created": "2023-08-15T15:57:35.096",
        "Order": "ORD12345",
        "Transaction": {
            "TransactionID": 1148794,
            "Created": "2023-08-15T15:57:35.096",
            "AuthorizationDate": "",
            "TransactionStatusId": 1,
            "Status": "Approved",
            "Description": " ",
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "ResponseCode": "approved",
                    "ResponseMessage": "approved",
                    "AuthorizationCode": "125748"
                }
            ]
        },
        "Capture": true,
        "Amount": 240000,
        "OriginalAmount": 240000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "ARS",
        "Description": "Compra de prueba",
        "Customer": {
            "CustomerId": 248674,
            "Created": "2023-08-15T15:56:53.730",
            "Owner": "Anonymous",
            "Email": "eluna@mail.com",
            "Enabled": true,
            "BillingAddress": {
                "AddressId": 372710,
                "AddressType": 2,
                "Country": "AR",
                "State": "C",
                "AddressDetail": "Joaquin Requena 1580",
                "PostalCode": "C1054AAU",
                "City": "BsAs"
            },
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 253333,
                    "PaymentMediaId": 2,
                    "Created": "2023-08-15T15:56:53.730",
                    "Brand": "MasterCard",
                    "CardOwner": "Erik Luna",
                    "Bin": "529991",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Expiration": "203008",
                    "Last4": "0015"
                }
            ],
            "URL": "https://api.stage.bamboopayment.com/Customer/248674",
            "FirstName": "Erik",
            "LastName": "Luna",
            "DocNumber": "12345672",
            "DocumentTypeId": 17,
            "PhoneNumber": "24022330"
        },
        "URL": "https://api.stage.bamboopayment.com/Purchase/1130926",
        "DataUY": {
            "IsFinalConsumer": false,
            "TaxableAmount": 0
        },
        "DataDO": {
            "Tax": 0
        },
        "Acquirer": {
            "AcquirerID": 25,
            "Name": "DECIDIR"
        },
        "PurchasePaymentProfileId": 253333,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "AR",
            "TargetCurrencyISO": "ARS",
            "TargetAmount": 2000
        },
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {},
        "PurchaseType": 1
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