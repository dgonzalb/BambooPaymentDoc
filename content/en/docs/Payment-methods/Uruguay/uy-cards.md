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
You need to include specific fields for this payment method to work correctly. Check the [Request parameters]({{< ref purchase-operations.md >}}#request-parameters) section for details on basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/docs/payment-methods/uruguay.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | Yes | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | Yes | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | Yes | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | Yes | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code.<br>Postal code is mandatory for the United States abd Canada. |
| `Customer` → `ShippingAddress` → `Country` | `string` | No | Country of the Shipping Address. |
| `Customer` → `ShippingAddress` → `State` | `string` | No | State of the Shipping Address. | 
| `Customer` → `ShippingAddress` → `City` | `string` | No | City of the Shipping Address. |
| `Customer` → `ShippingAddress` → `AddressDetail` | `string` | No | Address Detail of the Shipping Address. | 
| `Customer` → `ShippingAddress` → `PostalCode` | `string` | No | Postal Code of the Shipping Address. |
| `CustomerIP` | `string` | No | IP of the customer that uses the service. |
| `DataUY` | `object` | Yes | Specific data for _Uruguay_.<br>In Uruguay, two laws promote electronic payment methods by refunding VAT points. Law **19,210** (Financial inclusion law) and **17,934** for gastronomic and related services govern these benefits, and the data presented in this object is necessary for correct usage. |
| `DataUY` → `IsFinalConsumer` | `boolean` | Yes | Indicates if the sale is performed to a final consumer. |
| `DataUY` → `Invoice` | `string` | No <sup>*</sup> | Invoice number associated with the sale. |
| `DataUY` → `TaxableAmount` | `number` | No <sup>*</sup> | Amount taxed by VAT. |

{{% alert title="Info" color="info"%}}
* <sup>*</sup> This parameter is mandatory when `DataUY.IsFinalConsumer` is `true`.
* Remember that for the Anti-fraud system's correct functioning, we suggest sending additional data described in the section [Anti-fraud]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Request example
```json
{
  "TrxToken": "OT__AJrM-jq7nqEZUiuiTpUzImdM_6Cp7rxT4jiYpVJ8SzQ_",
  "Order": "099927564",
  "Capture": true,
  "Amount": 10000,
  "Currency": "UYU",
  "TargetCountryISO": "UY",
  "Tip": 0,
  "Customer": {
    "BillingAddress": {
      "Country": "Uruguay",
      "City": "Montevideo",
      "State": "Montevideo",
      "PostalCode": "150000",
      "AddressDetail": "Calle falsa 4567/Depto/Provincia"
    },
    "ShippingAddress": {
      "Country": "Uruguay",
      "City": "Montevideo",
      "State": "Montevideo",
      "PostalCode": "150000",
      "AddressDetail": "Calle falsa 4567/Depto/Provincia"
    },
    "DocumentTypeId": 2,
    "DocNumber": "31130749",
    "PhoneNumber": "093000000",
    "FirstName": "Rodrigo",
    "LastName": "Serrano",
    "Email": "rserrano@mail.com"
  },
  "DataUY": {
    "IsFinalConsumer": "false",
    "Invoice": "1234567",
    "TaxableAmount": 900
  }
}
```

### Considerations
* You can make purchases in installments as long as the Issuing Bank has it enabled.
* You can make purchases with Debit Cards as long as the Issuing Bank has it enabled
* **Visanet** requires the inclusion of the CVV in the customer’s first purchase or the customer’s registration.<br>Once you make the registration and obtain the _Commerce Token_, it is not necessary to request the CVV in future transactions.
* **FirstData** requires you to send the CVV, even if you have the _Commerce Token_. You need to execute   [Verification Code Request Flow](#).<br>This modality is enabled by default. If you wish to deactivate it, you must negotiate with **FirstData** and notify us.
* **Creditel** and **PassCard** require that the purchase message include the cardholder's document and type of document (fields `Customer.DocumentTypeId` and `Customer.DocNumber`).
* **PassCard** requires you to send the CVV, even if you have the _Commerce Token_. Therefore, you need to execute [Verification Code Request Flow](#).
* When using **OCAOneClick2** (OCA Multi-Acquiring), you need to include the IP address of the person making the purchase. To do this, you must send the `CustomerIP` parameter in the request.

#### Purchases using MasterCards through OCA
When using **MasterCard**, sending the device FingerPrint using the `SetDeviceFingerPrint` method is recommended.

Add this function to the script used for the checkout form (`PWCheckOut`) to generate and return the value used in the purchases.

In this example, we show how to invoke and obtain the result.

```html
<script type="text/javascript">
    PWCheckout.SetDeviceFingerprint();
</script>
```
<br>

Then, include the token in the purchase creation according to the following scenarios.

* For _**OneTimeToken**_, send the device FingerPrint you generate and the **OT token**.
* For _**CommerceToken**_, there are two cases:
  * For Recurring purchases (Without CVV), send the device FingerPrint you generate and the **CT token**. You can use an existing **CT token** or generate one.
  * For Purchases with CVV, generating a `DeviceFingerPrint` is unnecessary since when the customer enters the CVV; the system sends the value generated when displaying the CVV request page. Then, the system generates a Purchase in the _Pending_ state, and you need to redirect the customer to the URL returned in the `actionUrl` parameter where they enter the CVV.

## Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

### Response example

```json
{
  "Response": {
    "PurchaseId": 1130954,
    "Created": "2023-08-15T19:42:36.873",
    "Order": "099927564",
    "Transaction": {
      "TransactionID": 1148827,
      "Created": "2023-08-15T19:42:36.873",
      "AuthorizationDate": "2023-08-15T19:42:37.443",
      "TransactionStatusId": 1,
      "Status": "Approved",
      "Description": "0 00",
      "ApprovalCode": "622810",
      "Steps": [
        {
          "Step": "FirstData Authorization with CVV",
          "Created": "2023-08-15T19:42:37.433",
          "Status": "Authorization OK",
          "ResponseCode": "0",
          "ResponseMessage": "00",
          "Error": "",
          "AuthorizationCode": "622810",
          "AcquirerResponseDetail": "{ 'PrimaryResponseCode' : '0', 'SecondaryResponseCode' : '0', 'ISO8583Code' : '00' }"
        }
      ]
    },
    "Capture": true,
    "Amount": 10000,
    "OriginalAmount": 10000,
    "TaxableAmount": 0,
    "Tip": 0,
    "Installments": 1,
    "Currency": "UYU",
    "Customer": {
      "CustomerId": 248693,
      "Created": "2023-08-15T19:42:27.413",
      "Owner": "Anonymous",
      "Email": "jmartinezq@mail.com",
      "Enabled": true,
      "ShippingAddress": {
        "AddressId": 0,
        "AddressType": 1,
        "Country": "Uruguay",
        "State": "Montevideo",
        "AddressDetail": "Calle falsa 4567/Depto/Provincia",
        "PostalCode": "150000",
        "City": "Montevideo"
      },
      "BillingAddress": {
        "AddressId": 372731,
        "AddressType": 2,
        "Country": "Uruguay",
        "State": "Montevideo",
        "AddressDetail": "Calle falsa 4567/Depto/Provincia",
        "PostalCode": "150000",
        "City": "Montevideo"
      },
      "PaymentProfiles": [
        {
          "PaymentProfileId": 253353,
          "PaymentMediaId": 2,
          "Created": "2023-08-15T19:42:27.413",
          "Brand": "MasterCard",
          "CardOwner": "Rodrigo Serrano",
          "Bin": "550799",
          "Type": "CreditCard",
          "IdCommerceToken": 0,
          "Expiration": "202605",
          "Last4": "0001"
        }
      ],
      "URL": "https://api.stage.bamboopayment.com/Customer/248693",
      "FirstName": "Rodrigo",
      "LastName": "Serrano",
      "DocNumber": "31130749",
      "DocumentTypeId": 2,
      "PhoneNumber": "093000000"
    },
    "URL": "https://api.stage.bamboopayment.com/Purchase/1130954",
    "DataUY": {
      "IsFinalConsumer": false,
      "Invoice": "1234567",
      "TaxableAmount": 900
    },
    "Acquirer": {
      "AcquirerID": 1,
      "Name": "FirstData"
    },
    "PurchasePaymentProfileId": 253353,
    "IsFirstRecurrentPurchase": false,
    "AntifraudData": {},
    "PurchaseType": 1
  },
  "Errors": []
}
```

### Response for AMEX
When using AMEX, the response includes the object `AcquirerResponseDetail` inside the `Response.Transaction.Steps` object with the following information.

| Property | Description |
|---|---|
| `ResponseCode` | Response code. |
| `ResultDescription` | Description. |
| `Indi` | Tax refund application indicator (1=apply, 2=not apply). |
| `Monto_dev` | This amount corresponds to the tax refund. |
| `SerialTraceAuditNumber` | Acquirer reference Id. |
| `RetrievalReferenceNumber` | RRN, Acquirer reference Id. |
| `PurchaseIdSended` | Identifier of the purchase sent to the acquirer. |
| `BatchId` | Identifier of the batch to which the purchase made belongs. |

Example:

```json
{
  "Response": {
    "Transaction": {
      "Steps": [
        {
          "AcquirerResponseDetail": "{ 'ResponseCode' : '00', 'ResultDescription': 'Aprobado', 'Indi' : '1', 'Monto_dev': '10', 'SerialTraceAuditNumber': '931819',  'RetrievalReferenceNumber': '564149', 'PurchaseIdSended': '4973a588-7665-4f26-b6ed-011b7f528bea', 'BatchId': '467162' }\r\n"
        }
      ]
    },
  },
  "Errors": []
}
```

## Testing cards
When generating valid card data for testing, you must first establish which acquirer you want to test and what type of test you want to perform.

### Determination of BIN
When setting up an acquirer, the card's BIN (Bank Identification Number) is also created.  This BIN should align with one of the BINs associated with the brands processed by the acquirer. For instance, if you are conducting an integration test with the FirstData acquirer (which is a local MasterCard acquirer in Uruguay), the BIN of the generated card should adhere to the following format: `^ 5 \ [1-5] \ [0-9]*`

This format means it must start with the number **5**; the second number must be between 1 and 5, then any other number is accepted. For example, the BIN to test can be `510000`. The valid Bines in the system and their related acquirer are listed below.

| BIN (format) | Brand | Notes |
|--------------|-------|-------|
| `^4\[0-9]*` | VISA | Any card that starts with `4`. |
| `^5\[1-5]\[0-9]*`| MasterCard | Any card that starts with `51` through `5`. |
| `^589892\|^542991`| OCA | Any card that starts with `589892` or `542991`. |
| `^601933\|^608700` | Creditel | Any card that starts with `601933` or `608700`. |
| `^601828` | Créditos Directos | Any card that starts with `601828` |
| `^3\[47\]\[0-9\]*` | American Express | Any card that starts with `3` followed by `4` or `7`. |
| `^628026` | Passcard | Any card that starts with `628026`. |
| `^504736` | Club del Este | Any card that starts with `504736`. |
| `^589657\|^603522\|^6042\[0-9\]\[1-9\]\*\|^604400\*\|^6043\[0-9\]\*\|^600178\|^604230` | Cabal | Any card that starts with `589657`, `603522`, `604400`, `600178`, `604230`, `6042` followed by `0` to `9` in the fifth position, and `1` to `9` in the sixth position. |
| `^637483` | Edenred | Any card that starts with `637483`. |
| `^86\[0-9\]*` | Bancard Check | Any card that starts with `86`. |
| `^280991` | Credifielco | Any card that starts with `280991`. |
| `^600692` | Infonet | Any card that starts with `600692`. |
| `^589562` | Tarjeta Naranja | Any card that starts with `589562`. |
| `^603199` | Anda | Any card that starts with `603199`. |
| `^606211` | Hipercard | Any card that starts with `606211`. |
| `^636297` | Elo | Any card that starts with `636297`. |
| `^507860` | Aura | Any card that starts with `507860`. |

### Configured Behaviors

{{< tabs tabTotal="7" tabID="acquirers" tabName1="OCA" tabName2="VISA" tabName3="Creditel" tabName4="Anda" tabName5="Créditos Directos" tabName6="Mastercard" tabName7="AMEX (UY)" >}}
{{< tab tabNum="1" >}}
<br>

<div id="shortTable"></div>

| Operation | Termination | Behavior  |
|-----------|:-----------:|-----------|
| Purchase | `0001` | Result: OK <br> Approved. |
| Purchase | `0010` | Result: OK <br> Approved. |
| Purchase | `0011` | Result: Rejected <br> Error: TR011 <br> Lost or blocked card. |
| Purchase | `0012` | Result: Rejected <br> Error: TR013 <br> Undefined error in Acquirer. Unauthorized purchase |
| Purchase | `0013` | Result: Rejected <br> Error: TR012 <br> Credit limit exceeded. |
| Purchase | `0002` | Result: Rejected <br> Error: TR007 <br> Error with some data of the payment method (card number, verification code or expiration date). |
| Purchase | `0003` | Result: Rejected <br> Error: TR010 <br> Invalid identity document. |
| Purchase | `0004` | Result: Rejected <br> Error: TR011 <br> Lost or blocked card. |
| Purchase | `0005` | Result: Rejected <br> Error: TR013 <br> Undefined error in Acquirer. Unauthorized purchase. |
| Cancellation | `0001` | Result: Cancel OK. |
| Cancellation | `0010` | Result: Rejected <br> Error: TR013 <br> Undefined error in Acquirer. Cancellation not made. |

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

<div id="shortTable"></div>

| Operation | Termination | Behavior |
|---------|:-----------:| -----------|
| Pre-authorization (Purchase) | `0001` | Result: OK <br> Approved. |
| Pre-authorization (Purchase) | `0011` | Result: OK <br> Approved. |
| Pre-authorization (Purchase) | `0012` | Result: OK <br> Approved. |
| Pre-authorization (Purchase) | `0013` | Result: OK <br> Approved. |
| Pre-authorization (Purchase) | `0014` | Result: OK <br> Approved. |
| Pre-authorization (Purchase) | `0002` | Result: Rejected <br> Error: TR007 <br> Error with some data of the payment method (card number, verification code or expiration date). |
| Pre-authorization (Purchase) | `0003` | Result: Rejected <br> Error: TR005 <br> Sender offline. |
| Pre-authorization (Purchase) | `0004` | Result: Rejected <br> Error: TR014 <br> The Acquirer denied the transaction due to possible fraud. |
| Pre-authorization (Purchase) | `0005` | Result: Rejected <br> Error: TR012 <br> Credit limit exceeded. |
| Pre-authorization (Purchase) | `0006` | Result: Rejected <br> Error: TR011 <br> Lost or blocked card. |
| Pre-Authorization Capture (Commit) | `0001` | Result: OK <br> Approved. |
| Pre-Authorization Capture (Commit) | `0011` | Result: OK <br> Approved. |
| Pre-Authorization Capture (Commit) | `0012` | Result: Rejected <br> Error: TR005 <br> Sender offline. |
| Pre-Authorization Capture (Commit) | `0013` | Result: Rejected <br> Error: TR019 <br> Transaction rejected by Acquirer/Processor. |
| Pre-Authorization Capture (Commit) | `0014` | Result: Rejected <br> Error: TR013 <br> Undefined error in Acquirer. |
| Cancellation of Pre-Authorization (Rollback) | `0001` | Result: OK <br> Canceled. |
| Cancellation of Pre-Authorization (Rollback) | `0011` | Result: Rejected <br> Error: TR005 <br> Sender offline. |
| Cancellation of Pre-Authorization (Rollback) | `0012` | result: Rejected <br> Error: TR003 <br> Problems with the merchant's account in Acquirer. |
| Pre-Authorization Cancellation (Rollback) | `0013` | Result: Rejected <br> Error: TR019 <br> Transaction rejected by Acquirer/Processor. |
| Pre-Authorization Cancellation (Rollback) | `0014` | Result: Rejected <br> Error: TR013 <br> Undefined error in Acquirer. |
| Refund | `0001` | Result: OK <br> Error: TR013 <br> Returned. |
| Refund | `0011` | Result: Rejected <br> Error: TR005 <br> Sender offline. |
| Refund | `0012` | Result: Rejected <br> Error: TR003 <br> Problems with the merchant's account in Acquirer. |
| Refund | `0013` | Result: Rejected <br> Error: TR019 <br> Transaction rejected by Acquirer/Processor. |
| Refund | `0014` | Result: Rejected <br> Error: TR013 <br> Undefined error in Acquirer. |

Example of BIN (first 6 digits) for testing specific card types:

* `468562` – Prepaid Visa Card
* `430307` – Visa Debit Card
* `463308` – Visa Debit Card

{{< /tab >}}

{{< tab tabNum="3" >}}
<br>

<div id="shortTable"></div>

| Operation | Termination | Behavior |
|-----------|:-----------:|----------|
| Buy | `0001` | Result: OK <br> Approved. |
| Buy | `0002` | Result: Rejected <br> Error: TR007 <br> Incorrect data associated with card. |
| Buy | `0003` | Result: Rejected <br> Error: TR016 <br> Error in the parameters reported to the acquirer. |
| Buy | `0004` | Result: Rejected <br> Error: TR012 <br> Credit limit exceeded. |
| Buy | `0005` | Result: Rejected <br> Error: TR997 <br> Acquirer error processing payment. |
| Cancellation | `0001` | Result: OK <br> Canceled. |
| Cancellation | `0010` | Result: Rejected <br> Error: TR001 <br> Buyer communication error. |


{{< /tab >}}

{{< tab tabNum="4" >}}
<br>

<div id="shortTable"></div>

| Operation | Termination | Behavior |
|-----------|:-----------:|----------|
| Buy | `0001` | Result: OK <br>Approved. |
| Buy | `0002` | Result: OK <br>Approved. |
| Buy | `0003` | Result: OK <br>Approved. |
| Refund | `0001` | Result: OK. |
| Refund | `0002` | Result: OK. |

{{< /tab >}}

{{< tab tabNum="5" >}}
<br>

<div id="shortTable"></div>

| Operation | Termination | Behavior |
|-----------|:-----------:|----------|
| Buy | `0001` | Result: OK <br> Approved
| Buy | `0002` | Result: Rejected <br> Error: TR007 <br> Incorrect data associated with card. |
| Buy | `0003` | Result: Rejected <br> Error: TR016 <br> Error in the parameters reported to the acquirer. |
| Buy | `0004` | Result: Rejected <br> Error: TR012 <br> Credit limit exceeded. |
| Buy | `0005` | Result: Rejected <br> Error: TR997 <br> Acquirer error processing payment. |
| Cancellation | `0001` | Result: OK <br> Canceled. |
| Cancellation | `0010` | Result: Rejected <br> Error: TR001 <br> Buyer communication error. |

{{< /tab >}}

{{< tab tabNum="6" >}}
<br>

<div id="shortTable"></div>

| Operation | Termination | Behavior |
|-----------|:-----------:|----------|
| Buy | `0001` | Result: OK <br> Approved. |
| Buy | `0002` | Result: Rejected <br> Error: TR005 <br> Issuer offline or problem related to Acquirer. |
| Buy | `0003` | Result: Rejected <br> Error: TR009 <br> Unknown Buyer Error. |
| Buy | `0004` | Result: Rejected <br> Error: TR013 <br> The Acquirer denied the transaction. |
| Buy | `0005` | Result: Rejected <br> Error: TR004 <br> Communication error when sending transaction to Acquirer. |
| Cancellation | `0001` | Result: OK <br> Canceled. |

{{< /tab >}}

{{< tab tabNum="7" >}}
<br>

<div id="shortTable"></div>

| Operation | Termination | Behavior |
|-----------|:-----------:|----------|
| Buy | `0001` to `0010` | Result: OK <br>Approved. |
| Buy | `0011` | Result: Rejected <br>Error: PR003<br>Invalid Amount. |
| Buy | `0012` | Result: Rejected <br>Error: TR007<br>Invalid Card. |
| Buy | `0013` | Result: Rejected <br>Error: TR019<br>Dennied. |

{{< /tab >}}

{{< /tabs >}}
