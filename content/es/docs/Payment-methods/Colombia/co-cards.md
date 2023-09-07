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

| Property | Type | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indicate the destination currency. |
| `Customer` → `Email` | `string` | Sí | Customer's email. |
| `Customer` → `FirstName` | `string` | Sí | Customer's first name. |
| `Customer` → `LastName` | `string` | Sí | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/es/docs/payment-methods/argentina.html#document-types) to see the posibles valores. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No<sup>*</sup> | Customer's State.<br><sup>*</sup>_This parameter is required to calculate **II.BB** Tax. Refer to [provinces](/es/docs/payment-methods/argentina.html#argentina-provinces) to know its possible values_. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `TaxAmount` | `numeric` | No | The VAT amount of the gross amount For domestic purchases, this parameter is required.<br>When you must include decimals in this amount, concatenate the decimal places without de decimal point. Example `12,25` > `1225`. |

{{% alert title="Info" color="info"%}}
Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Request example
```json
{
  "TrxToken": "OT__J2GWEll4hwZ9nIr_1oNtxkRtCs5QbbsO4jiYpVJ8SzQ_",
  "Capture": true,
  "Order": "20201229",
  "Amount": "3000",
  "CustomerIP": "127.0.0.1",
  "Currency": "COP",
  "TargetCountryISO": "CO",
  "Installments": 1,
  "Customer": {
    "BillingAddress": {
      "AddressType": 1,
      "Country": "COL",
      "State": "Bogota",
      "City": "Bogota",
      "AddressDetail": "Cra 4 # 76B - 57"
    },
    "DocNumber": "47666489",
    "DocumentTypeId": 2,
    "PhoneNumber": "0930000111",
    "FirstName": "Andres",
    "LastName": "Gomez"
  },
  "MetadataIn": {
    "TaxAmount": "47892"
  }
}
```

## Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

### Response example

```json
{
  "Response": {
    "PurchaseId": 180985,
    "Created": "2023-04-11T18:06:10.812",
    "TrxToken": null,
    "Order": "20201229",
    "Transaction": {
      "TransactionID": 196077,
      "Created": "2023-04-11T18:06:10.812",
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
          "ResponseCode": "APPROVED",
          "ResponseMessage": "Authorization Approved",
          "Error": null,
          "AuthorizationCode": "APPROVED",
          "UniqueID": null,
          "AcquirerResponseDetail": "Authorization Approved"
        }
      ]
    },
    "Capture": true,
    "Amount": 3000,
    "OriginalAmount": 3000,
    "TaxableAmount": 0,
    "Tip": 0,
    "Installments": 1,
    "Currency": "COP",
    "Description": null,
    "Customer": {
      "CustomerId": 94997,
      "Created": "2023-04-11T13:02:57.350",
      "CommerceCustomerId": null,
      "Owner": "Anonymous",
      "Email": "test@dev.com",
      "Enabled": true,
      "ShippingAddress": null,
      "BillingAddress": {
        "AddressType": 1,
        "Country": "COL",
        "State": "Bogota",
        "City": "Bogota",
        "AddressDetail": "Cra 4 # 76B - 57"
      },
      "Plans": null,
      "AdditionalData": null,
      "PaymentProfiles": [
        {
          "PaymentProfileId": 99342,
          "PaymentMediaId": 1,
          "Created": "2023-04-11T13:02:57.350",
          "LastUpdate": "2023-04-11T18:06:07.977",
          "Brand": "VISA",
          "CardOwner": "Andres Gomez",
          "Bin": null,
          "IssuerBank": "Visa",
          "Installments": "1;2;3;4;5;6;7;8;9;10;11;12;13;14;15;16;17;18;19;20;21;22;23;24",
          "Type": "CreditCard",
          "IdCommerceToken": 0,
          "Token": null,
          "Expiration": "202306",
          "Last4": "0001",
          "Enabled": null,
          "DocumentNumber": null,
          "DocumentTypeId": null,
          "ExternalValue": null,
          "AffinityGroup": null
        }
      ],
      "CaptureURL": null,
      "UniqueID": null,
      "URL": "https://testapi.siemprepago.com/v1/api/Customer/94997",
      "FirstName": "Andres",
      "LastName": "Gomez",
      "DocNumber": "47666489",
      "DocumentTypeId": 2,
      "PhoneNumber": "0930000111",
      "ExternalValue": null
    },
    "RefundList": null,
    "PlanID": null,
    "UniqueID": null,
    "AdditionalData": null,
    "CustomerUserAgent": null,
    "CustomerIP": "127.0.0.1",
    "URL": "https://testapi.siemprepago.com/v1/api/Purchase/180985",
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
      "AcquirerID": 87,
      "Name": "Movii",
      "CommerceNumber": null
    },
    "CommerceAction": null,
    "PurchasePaymentProfileId": 99342,
    "LoyaltyPlan": null,
    "DeviceFingerprintId": null,
    "MetadataIn": null,
    "MetadataOut": null,
    "CrossBorderData": null,
    "CrossBorderDataResponse": {
      "TargetCountryISO": "CO",
      "TargetCurrencyISO": "COP",
      "TargetAmount": 1
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
```

## Testing cards
Use the following cards to simulate the different status of the purchase.

| Brand | PAN | CVV | Expiration |
|---|---|---|---|
| Mastercard | `5303710409428783` | `355` | `05/26` |
| Visa | `4513076106055348` | `159` | `06/26` |
| Diners | `36032429319768` | `9052` | `12/26 `|
| ***Insufficient funds*** |  |  |  |
| Mastercard | `5529030604551745` | `124` | `11/26` |