---
title: "Webhooks"
linkTitle: "Webhooks"
date: 2023-08-02T08:41:05-05:00
description: >
  You can implement a service to receive and process notifications sent from the Bamboo Payment systems.
weight: 60
---

This service is necessary in some of the transaction flows where the process cannot be completed synchronously, so the final status of the transaction will be informed asynchronously once it has been obtained.

The merchant must publish an HTTP/REST service to which the notifications generated will be sent.

## WebHook Service specifications
The WebHook service is a REST Service that must process a request with the following characteristics:

<div id="shortTable"></div>

|        |          | 
|:-------|:---------|
|**URL:** | *\<Determined by the merchant\>* |
|**API Type:** | Public |
|**Method:** | POST |
|**Authentication:** | Signature in the header. |
|**Response:** | HTTP Code |

## Technical requirements
The implementation of this service depends on the platform and language chosen by the merchant.

The only technical requirements are:

- It must accept messages in JSON format (application/json)
- You need to implement a validation method of the signature in the webhook.
- It must respond only an HTTP code, where:
    * if code `200` (OK) is answered, Bamboo Payment will assume the notification processing was successful.
    * If any code other than `200` is answered, Bamboo Payment will assume that the processing was unsuccessful, so the notification will be retried.

## Signature validation
To mitigate the risk of fraudulent transactions, it is crucial for merchants to validate the digital signature. By verifying the authenticity and integrity of the received data, businesses can effectively safeguard against potential fraud attempts and ensure secure and reliable transactions.

The merchant can validate the digital signature of the commerce as follows.
The received signature in the webhook must match the signature generated with the hash.

#### Pseudocode

```javascript
//private key
var key = merchantSecretKey;
//Concatenate Webhook information
//utcNow is obtained from the header field "dateSent"
var receivedData = PurchaseId + Amount + Currency + utcNow;

//Digital signature creation to compare with received signature in webhook
var hexHash = CryptoJS.HmacSHA256(receivedData, key);
var signature = hexHash.toString(CryptoJS.enc.Hex);

//Digital Signatures compare
if(signature === receivedSignature)
    console.log("signature is valid");
else
    console.log("signature is not valid");
 ```

#### HmacSha256 Code Example

```javascript
async function calculateHMAC(key, data) {
	const encoder = new TextEncoder();
	const keyBuffer = encoder.encode(key);
	const dataBuffer = encoder.encode(data);
	const cryptoKey = await crypto.subtle.importKey(
		'raw',
		keyBuffer,
		{ name: 'HMAC', hash: 'SHA-256' },
		false,
		['sign']
);
	const hashBuffer = await crypto.subtle.sign('HMAC', cryptoKey, dataBuffer);
	const hashArray = Array.from(new Uint8Array(hashBuffer));
	const hashHex = hashArray.map(byte => byte.toString(16).padStart(2, '0')).join('');
	return hashHex;
}
```

## Retry management for errors.
The webhook uses a configuration with five retries for failures spaced out over time.

* The first retry is attempted after 15 minutes.
* The second retry is attempted after 30 minutes.
* The third retry is attempted after one hour.
* The fourth retry is attempted after three hours.
* The fifth retry is attempted after six hours.

For further retries, please get in touch with our support team.

## Webhook types
Our webhook service allows you to choose from two types of webhooks, each designed to cater to specific needs. The following sections provide detailed information about each class, empowering you to choose wisely.

{{% alert title="Info" color="info"%}}
Contact us to enable the webhook type that best suits your requirements.
{{% /alert %}}

### Purchase Webhook
The Purchase Webhook is the most basic type of our service. Through it, we can notify the final status (_Approved_ or _Rejected_) of the purchases with basic information related to them.

#### Notification parameters

| Parameter | Type | Description |
|---|---|---|
| `PurchaseId` | `integer` | Purchase identifier. |
| `UniqueId` | `string` | [Unique Identifier]({{< ref "Concepts.md">}}#UniqueID) defined for the Purchase. |
| `Order` | `string` | Order number generated by the merchant. |
| `Amount` | `number` | Amount of the purchase. |
| `Installments` | `integer` | This parameter refers to the number of payments that a credit card purchase is divided into. |
| `Currency` | `string` | Currency of the purchase, according to ISO-4217. |
| `MetadataOut` | `object` | Additional fields returned by each payment method or acquirer. |
| `Transaction` → `TransactionStatusId` | `integer` | Internal identifier of the transaction status. |
| `Transaction` → `Status` | `string` | Current status of the transaction. |
| `Transaction` → `Description` | `string` | Description of the outcome of the transaction. |
| `Transaction` → `ApprovalCode` | `string` | Approval code returned by the payment method. |

#### Notification example

```json
{
  "PurchaseId": 184098,
  "UniqueId": null,
  "Order": "3733689",
  "Amount": 10000,
  "Installments": 1,
  "Currency": "COP",
  "MetadataOut": {},
  "Transaction": {
    "TransactionStatusId": 3,
    "Status": "Approved",
    "Description": null,
    "ApprovalCode": "Ok"
  }
}
```

### Transaction Webhook
The transaction webhook is a more advanced type of webhook that can not only notify you about purchases but also keep you informed about the final status of any transaction. For instance, if you're using asynchronous refunds, we can let you know whether the refund was approved or rejected.

#### Notification parameters

| Parameter | Type | Description |
|---|---|---|
| `TransactionId` | `integer` | Transaction identifier. |
| `TransactionType` | `string` | Transaction type of the notification. Possible values:<ul style="margin-bottom: initial;"><li>Purchase</li><li>Refund</li></ul> |
| `TransactionStatusId` | `integer` | Internal identifier of the transaction status. |
| `Status` | `string` | Current status of the transaction. |
| `ErrorCode` | `string` | Possible Error code generated in the transaction. |
| `Amount` | `number` | Amount of the transaction. |
| `Installments` | `integer` | This parameter refers to the number of payments that a credit card purchase is divided into. |
| `UniqueId` | `string` | [Unique Identifier]({{< ref "Concepts.md">}}#UniqueID) defined for the Purchase. |
| `Description` | `string` | Description of the outcome of the transaction. |
| `UrlNotify` | `string` | URL of the Webhook. |
| `TargetCountryIso` | `string` | This parameter indicates the country where the transaction was processed in `ISO-3166-1` format. |
| `Created` | `date` | Date and time when the transaction was created.<br>Date format _**ISO-8601**_. |
| `Customer` | `object` | Provides the data of the person who performed the transaction. |
| `PaymentMedia` | `object` | Information on the payment method used in the Purchase. |

#### Notification example



{{< tabs tabTotal="2" tabName1="Purchase" tabName2="Refund APM" >}}
{{< tab tabNum="1" >}}
<br>

```json
{
  "TransactionId": 379245,
  "TransactionType": "Purchase",
  "TransactionStatusId": 4,
  "Status": "Rejected",
  "ErrorCode": "TR301",
  "Amount": 5000,
  "Currency": "UYU",
  "Installments": "1",
  "UniqueId": "",
  "Order": "1",
  "Description": "Description",
  "UrlNotify": "https://dummystore.com/checkout/notifications",
  "TargetCountryIso": "UY",
  "Created": "2024-02-07T18:10:45.667",
  "MetadataOut": { },
  "Customer": {
    "CustomerId": 321559,
    "Email": "score-100@antifraud.bampoopayment.com",
    "DocumentTypeId": 1,
    "DocNumber": "52960268",
    "LastName": "Cardenas Contreras",
    "FirstName": "Rocio"
  },
  "PaymentMedia": {
    "PaymentMediaId": 2,
    "Brand": "MasterCard",
    "PaymentMediaType": "CreditCard",
    "IssuerBank": "ADMINISTRADORA DE TARJETAS DE CREDITO, (A.T.C.), S.A.",
    "Bin": "558900",
    "Last4": "0001",
    "Owner": "JOHN DOE"
  }
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

```json
{
    "TransactionId": 148906700189999616,
    "TransactionType": "Refund",
    "TransactionStatusId": 1,
    "Status": "Approved",
    "Description": "Automation Test",
    "ApprovalCode": "10",
    "AdditionalData": null,
    "ErrorCode": null,
    "Created": "2025-02-14T21:42:03.88",
    "UrlNotify": null,
    "TargetCountryIso": "CO",
    "Customer": {
        "CustomerId": 148905131889422016,
        "Email": "ltorres@bamboopayment.com",
        "DocumentTypeId": 11,
        "DocNumber": "1234567890",
        "LastName": "Torres",
        "FirstName": "Lisseth"
    },
    "PaymentMedia": {
        "PaymentMediaId": 538,
        "Brand": "PseAvanza",
        "PaymentMediaType": "BankTransfer",
        "IssuerBank": null,
        "Bin": null,
        "Last4": null,
        "Owner": null
    },
    "UniqueId": "",
    "Order": "Automation-999",
    "Amount": -2058800,
    "Installments": 1,
    "Currency": "COP",
    "MetadataOut": {
        "RefundBankAccountNumber": "132132********2132",
        "RefundBankId": "1063",
        "RefundBankName": "BANCO FINANDINA S.A.",
        "RefundBankAccountType": "Saving"
    }
}
```

{{< /tab >}}
{{< /tabs >}}