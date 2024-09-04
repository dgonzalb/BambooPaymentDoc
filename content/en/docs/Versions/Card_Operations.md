---
title: "Pre-authorized Purchases: Capture and Cancel"
linkTitle: "Capture and Cancel"
date: 2024-08-22T11:40:29-05:00
Description: >
   Optimize your payment workflows by using capture and void operations for pre-authorized credit and debit card transactions. The capture function allows you to finalize purchases with adjustable amounts, while the void function lets you cancel unnecessary authorizations.
weight: 20
tags: ["subtopic"]
---

## Capture a purchase
This method allows you to confirm a pre-authorized purchase. The capture process allows you to confirm and finalize a pre-authorized transaction, giving you the flexibility to adjust the amount if needed. 

{{% alert title="Note" color="info"%}}
All payment methods may not support the pre-authorization feature, and it’s available for the following countries.

<div style="text-align: center;">

<a href="/en/docs/payment-methods/brazil.html"><img src="/assets/Flags/FlagBR.png" width="30" /></a>
<a href="/en/docs/payment-methods/chile.html"><img src="/assets/Flags/FlagCL.png" width="30" /></a>
<a href="/en/docs/payment-methods/colombia.html"><img src="/assets/Flags/FlagCO.png" width="30" /></a>
<a href="/en/docs/payment-methods/uruguay.html"><img src="/assets/Flags/FlagUY.png" width="30" /></a>

</div>

{{% /alert %}}

### Request URL
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v3/api/purchase/{{PurchaseID}}/capture`
* **Stage**: `https://api.stage.bamboopayment.com/v3/api/purchase/{{PurchaseID}}/capture`

### Request parameters
The request body is optional to confirm a purchase. If you don’t send any request, the method commits the pre-authorized purchase by its original amount.

The purchase amount may vary concerning the one sent in the initial purchase process, but the new amount cannot be higher than the original amount.

#### Request example (Partial Capture)
You must include the new amount in the request to confirm a purchase with a lower amount than the original. For example:

```json
{
  "Amount": 50
}
``` 

#### Response example (Partial Capture)
You will get the same `Response` object for the [purchase object]({{< ref "Purchase_V3.md" >}}#response).

**Result:**`COMPLETED` - **Status:** `PREAUTHORIZED`

```json
{
    "TransactionId": "79632697147789184",
    "Result": "COMPLETED",
    "Status": "PREAUTHORIZED",
    "ErrorCode": null,
    "ErrorDescription": null,
    "Created": "2024-08-07T17:51:54.620",
    "AuthorizationDate": "2024-08-07T17:51:56.879",
    "AuthorizationCode": "839936",
    "Amount": 5000,
    "Currency": "BRL",
    "Installments": 2,
    "TaxableAmount": null,
    "Tip": null,
    "Url": "https://api.stage.bamboopayment.com/Purchase/79632697147789184",
    "MetadataOut": null,
    "Action": null,
    "PaymentMethod": {
        "Brand": "Visa",
        "CardOwner": "João Silva",
        "Bin": "450799",
        "IssuerBank": "Banco do Brasil",
        "Type": "CreditCard",
        "Expiration": "203008",
        "Last4": "4905",
        "DocumentNumber": "12345678901",
        "DocumentTypeId": 4
    }
}
```


## Cancelling a purchase 
A void (or cancel) is the act of canceling a pre-authorized transaction before it is finalized or settled. When a transaction is voided, it is as if the purchase never occurred, and no money is transferred. Voids usually occur before the payment is fully processed, so the customer's payment method is not charged for the voided transaction.

The _**cancel**_ operation is only available for purchases previously [authorized]({{< ref "purchase-operations.md" >}}#confirm-a-purchase) with state _PreAuthorized_. If you’re interested in refunding a purchase that has already been captured, please refer to the [refunds]({{< ref "Refunds-and-voids.md" >}}) section for detailed instructions. 

{{% alert title="Note" color="info"%}}
Pre-authorization feature may not be supported by all payment methods and it's available for the following countries.

<div style="text-align: center;">

<a href="/en/docs/payment-methods/brazil.html"><img src="/assets/Flags/FlagBR.png" width="30" /></a>
<a href="/en/docs/payment-methods/chile.html"><img src="/assets/Flags/FlagCL.png" width="30" /></a>
<a href="/en/docs/payment-methods/colombia.html"><img src="/assets/Flags/FlagCO.png" width="30" /></a>
<a href="/en/docs/payment-methods/uruguay.html"><img src="/assets/Flags/FlagUY.png" width="30" /></a>

</div>

{{% /alert %}}

### Request URL
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v3/api/purchase/{{PurchaseID}}/cancel`
* **Stage**: `https://api.stage.bamboopayment.com/v3/api/purchase/{{PurchaseID}}/cancel`

### Request parameters
Request body is not required to cancel a purchase. If you don't send any request the purchase will be voided with its original amount. 

The amount to be void may vary with respect to the one that was sent in the initial Purchase process, but the new amount cannot be higher than the original amount.

{{% alert title="Note" color="info"%}}
The availability of **partial cancellation functionality may vary depending on the country**. For detailed information about this feature in your specific region, please consult with your Account Manager.
{{% /alert %}}

#### Request example (Partial Cancellation)
To perform the cancel of the purchase  with a lower amount than the original, you need to include the new amount in the request. For example:

```json
{
  "Amount": 50
}
```

### Response parameters
When you perform the cancel, you will get the same `Response` object for the [purchase object]({{< ref "Purchase_V3.md" >}}#response).

**Result:**`COMPLETED` - **Status:** `CANCELLED`

```json
{
    "TransactionId": "79632697147789184",
    "Result": "COMPLETED",
    "Status": "CANCELLED",
    "ErrorCode": null,
    "ErrorDescription": null,
    "Created": "2024-08-07T17:51:54.620",
    "AuthorizationDate": "2024-08-07T17:51:56.879",
    "AuthorizationCode": "839936",
    "Amount": 5000,
    "Currency": "BRL",
    "Installments": 2,
    "TaxableAmount": null,
    "Tip": null,
    "Url": "https://api.stage.bamboopayment.com/Purchase/79632697147789184",
    "MetadataOut": null,
    "Action": null,
    "PaymentMethod": {
        "Brand": "Visa",
        "CardOwner": "João Silva",
        "Bin": "450799",
        "IssuerBank": "Banco do Brasil",
        "Type": "CreditCard",
        "Expiration": "203008",
        "Last4": "4905",
        "DocumentNumber": "12345678901",
        "DocumentTypeId": 4
    }
}
```

