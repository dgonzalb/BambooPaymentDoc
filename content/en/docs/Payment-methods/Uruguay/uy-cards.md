---
title: "Credit and Debit cards"
linkTitle: "Credit and Debit cards"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process credit or debit card payments.
weight: 10
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The Request and Response shown in this article apply to both the [Gateway]({{< ref Concepts.md >}}#gateway-model) and [Payfac]({{< ref Concepts.md >}}#payfac-model) models. For the Gateway model, take into account the recommendations shown in [this section](#considerations).
{{% /alert %}}

## Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Request parameters]({{< ref purchase-operations.md >}}#request-parameters) section for details on basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | The token that identifies the customer’s card.<br>For more information about how to create the token, refer to [Customers](/en/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocumentTypeId` | `numeric` | No | Customer's document type.<br>Refer to the [Document types table](/en/docs/payment-methods/uruguay.html#document-types) to see the possible values. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | Yes | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | Yes | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | Yes | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | Yes | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code.<br>Postal code is mandatory for the United States and Canada. |
| `Customer` → `ShippingAddress` → `Country` | `string` | No | Country of the Shipping Address. |
| `Customer` → `ShippingAddress` → `State` | `string` | No | State of the Shipping Address. | 
| `Customer` → `ShippingAddress` → `City` | `string` | No | City of the Shipping Address. |
| `Customer` → `ShippingAddress` → `AddressDetail` | `string` | No | Address Detail of the Shipping Address. | 
| `Customer` → `ShippingAddress` → `PostalCode` | `string` | No | Postal Code of the Shipping Address. |
| `CustomerIP` | `string` | No | IP of the customer that uses the service. |
| `DataUY` | `object` | No | Specific data for _Uruguay_.<br>In Uruguay, two laws promote electronic payment methods by refunding VAT points. Law **19,210** (Financial inclusion law) and **17,934** for gastronomic and related services govern these benefits, and the data presented in this object is necessary for correct usage.<br>This parameter is required for the Gateway model. |
| `DataUY` → `IsFinalConsumer` | `boolean` | No | Indicates if the sale is performed to a final consumer.<br>This parameter is required for the Gateway model. |
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
  "Capture": true,
  "Order": "20201229",
  "Amount": "10000",
  "Currency": "USD",
  "TargetCountryISO": "UY",
  "Installments": 1,
  "Customer": {
    "BillingAddress": {
      "Country": "Uruguay",
      "City": "Montevideo",
      "State": "Montevideo",
      "PostalCode": "150000",
      "AddressDetail": "Calle falsa 4567/Depto/Provincia"
    },
    "Email": "rserrano@mail.com",
    "DocNumber": "47666489",
    "DocumentTypeId": 2,
    "PhoneNumber": "0930000111",
    "FirstName": "Rodrigo",
    "LastName": "Serrano"
  }
}
```

## Response parameters
For more information on the response parameters, please refer to the [Response parameters section]({{< ref purchase-operations.md>}}#response-parameters) of the Purchase creation.

### Response example
```json
{
  "Response": {
    "PurchaseId": 1248284,
    "Created": "2023-09-29T15:34:10.012",
    "TrxToken": null,
    "Order": "20201229",
    "Transaction": {
      "TransactionID": 1267112,
      "Created": "2023-09-29T15:34:10.012",
      "AuthorizationDate": "",
      "TransactionStatusId": 1,
      "Status": "Approved",
      "ErrorCode": "0",
      "Description": "",
      "ApprovalCode": null,
      "Steps": [
        {
          "Step": "Generic External",
          "Created": "",
          "Status": null,
          "ResponseCode": "00",
          "ResponseMessage": "Authorization - Function performed error-free",
          "Error": "0",
          "AuthorizationCode": "586316",
          "UniqueID": null,
          "AcquirerResponseDetail": "{\"TransactionResult\":\"APPROVED\",\"ProcessorResponseCode\":\"00\",\"ProcessorResponseMessage\":\"Function performed error-free\",\"ApprovalCode\":\"Y:586316:4637904926:PPXX:5863160734\",\"OrderId\":\"A-79d7a01b-5b36-4326-b872-82c29f196ec0\",\"IpgTransactionId\":\"84637904926\",\"ProcessorApprovalCode\":\"586316\",\"ProcessorReceiptNumber\":\"0734\",\"ProcessorBatchNumber\":\"001\",\"ProcessorReferenceNumber\":\"586316586316\",\"ProcessorTraceNumber\":\"586316\"}"
        }
      ]
    },
    "Capture": true,
    "Amount": 10000,
    "OriginalAmount": 10000,
    "TaxableAmount": 0,
    "Tip": 0,
    "Installments": 1,
    "Currency": "USD",
    "Description": null,
    "Customer": {
      "CustomerId": 254952,
      "Created": "2023-09-29T15:34:05.713",
      "CommerceCustomerId": null,
      "Owner": "Anonymous",
      "Email": "rserrano@mail.com",
      "Enabled": true,
      "ShippingAddress": null,
      "BillingAddress": {
        "AddressId": 377785,
        "AddressType": 2,
        "Country": "Uruguay",
        "City": "Montevideo",
        "State": "Montevideo",
        "PostalCode": "150000",
        "AddressDetail": "Calle falsa 4567/Depto/Provincia"
      },
      "Plans": null,
      "AdditionalData": null,
      "PaymentProfiles": [
        {
          "PaymentProfileId": 259793,
          "PaymentMediaId": 2,
          "Created": "2023-09-29T15:34:05.713",
          "LastUpdate": null,
          "Brand": "MasterCard",
          "CardOwner": "Rodrigo Serrano",
          "Bin": null,
          "IssuerBank": null,
          "Installments": null,
          "Type": "CreditCard",
          "IdCommerceToken": 0,
          "Token": null,
          "Expiration": "202912",
          "Last4": "0008",
          "Enabled": null,
          "DocumentNumber": null,
          "DocumentTypeId": null,
          "ExternalValue": null,
          "AffinityGroup": null
        }
      ],
      "CaptureURL": null,
      "UniqueID": null,
      "URL": "https://api.stage.bamboopayment.com/Customer/254952",
      "FirstName": "Rodrigo",
      "LastName": "Serrano",
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
    "CustomerIP": null,
    "URL": "https://api.stage.bamboopayment.com/Purchase/1248284",
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
      "AcquirerID": 73,
      "Name": "FiservIPG",
      "CommerceNumber": null
    },
    "CommerceAction": null,
    "PurchasePaymentProfileId": 259793,
    "LoyaltyPlan": null,
    "DeviceFingerprintId": null,
    "MetadataIn": null,
    "MetadataOut": null,
    "CrossBorderData": null,
    "CrossBorderDataResponse": null,
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
<!--
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
-->

## Testing cards
When generating valid card data for testing, you must first establish which acquirer you want to test and what type of test you want to perform.

### Determination of BIN
When setting up an acquirer, the card's BIN (Bank Identification Number) is also created.  This BIN should align with one of the BINs associated with the brands processed by the acquirer. For instance, if you are conducting an integration test with MasterCard, the BIN of the generated card should adhere to the following format: `^ 5 \ [1-5] \ [0-9]*`

This format means it must start with the number **5**; the second number must be between 1 and 5, then any other number is accepted. For example, the BIN to test can be `510000`. The valid Bines in the system and their related acquirer are listed below.

| BIN (format) | Brand | Notes |
|--------------|-------|-------|
| `^4\[0-9]*` | VISA | Any card that starts with `4`. |
| `^5\[1-5]\[0-9]*`| MasterCard | Any card that starts with `51` through `5`. |
| `^589892\|^542991`| OCA | Any card that starts with `589892` or `542991`. |
<!--| `^601933\|^608700` | Creditel | Any card that starts with `601933` or `608700`. |
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
| `^507860` | Aura | Any card that starts with `507860`. |-->

### Configured Behaviors for the Payfac model
The behavior of the response will depend on the amount sent. Use the following cards to simulate the different purchase statuses.

| Brand | PAN | CVV | Expiration Date |
|---|---|---|---|
| Mastercard | `5165850000000008` | `123` | `12/29` | 
| Visa | `4704550000000005` | `123` | `12/29` |

<div id="shortTable"></div>

| Behavior | Amount |
|---|---|
| Result: Rejected <br> Error: The card can't operate with installments. | **UYU** 1045,00  |
| Result: Rejected <br> Error: Expired card. | **UYU** 1046,00  |
| Result: Rejected <br> Error: Insufficient funds. | **UYU** 1051,00  |
| Result: OK <br> Approved | <ul style="margin-bottom: initial;"><li>Less than or equal to **UYU** 1000,00</li><li>Greater than **UYU** 1061,00</li></ul> |

### Configured Behaviors for the Gateway model
The behavior of the response will depend on the termination of the card. Generate the card using the corresponding [bin of the brand](#determination-of-bin), and send the following last four digits according to the expected result.

<div id="shortTable"></div>

| Termination | Behavior  |
|:-----------:|-----------|
| `0001` | Result: OK <br> Approved. |
| `0002` | Result: Rejected <br> Error: TR007 <br> Error with some data of the payment method (card number, verification code or expiration date). |
| `0013` | Result: Rejected <br> Error: TR012 <br> Credit limit exceeded. |

<!--{{< tabs tabTotal="7" tabID="acquirers" tabName1="OCA" tabName2="VISA" tabName3="Creditel" tabName4="Anda" tabName5="Créditos Directos" tabName6="Mastercard" tabName7="AMEX (UY)" >}}
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

{{< /tabs >}}-->

## Special features for the Gateway model {#considerations}
* You can make purchases in installments as long as the Issuing Bank has it enabled.
* You can make purchases with Debit Cards as long as the Issuing Bank has it enabled
* **Visanet** requires the inclusion of the CVV in the customer’s first purchase or the customer’s registration.<br>Once you make the registration and obtain the _Commerce Token_, it is not necessary to request the CVV in future transactions.
* **Fiserv** requires you to send the CVV, even if you have the _Commerce Token_. You need to execute [Verification Code Request Flow]({{< ref Registered-users.md >}}#verification-code-request-flow).<br>This modality is enabled by default. If you wish to deactivate it, you must negotiate with **Fiserv** and notify us.
* **Creditel** and **PassCard** require that the purchase message include the cardholder's document and type of document (fields `Customer.DocumentTypeId` and `Customer.DocNumber`).
* **PassCard** requires you to send the CVV, even if you have the _Commerce Token_. Therefore, you need to execute [Verification Code Request Flow]({{< ref Registered-users.md >}}#verification-code-request-flow).
* When using **OCAOneClick2** (OCA Multi-Acquiring), you need to include the IP address of the person making the purchase. To do this, you must send the `CustomerIP` parameter in the request.

### Purchases using MasterCard through OCA
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
  * For Purchases with CVV, generating a `DeviceFingerPrint` is unnecessary since when the customer enters the CVV, the system sends the value generated when displaying the CVV request page. Then, the system generates a Purchase in the _Pending_ state, and you need to redirect the customer to the URL returned in the `actionUrl` parameter where they enter the CVV.