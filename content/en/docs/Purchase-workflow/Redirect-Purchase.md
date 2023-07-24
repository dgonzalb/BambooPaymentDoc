---
title: "Redirect purchases"
linkTitle: "Redirect purchases"
date: 2023-03-02T11:40:29-05:00
Description: >
  The _Redirect purchase_ is the flow used for merchants where the customer needs to be redirected to an external page to complete the payment.
weight: 30
---

## Flow diagram
![PrintScreen](/assets/RedirectPurchaseFlow_en.png)

### Flow description

| N° | Description | /EndPoint or Actor |
|---|---|---|
| 1 | The Merchant request the `OneTimeToken` for redirect flow payment | `/token/GetRedirectToken` |
| 2 | The Merchant sends the purchase request as with any other means of payment | `/purchase` |
| 3 | Bamboo returns Purchase, with status _Pending for Redirection_ along with a `CommerceAction` object that contains an external service URL. `ActionReason=REDIRECTION_NEEDED_EXTERNAL_SERVICE` | `/purchase response` |
| 4 | The merchant must redirect customer to external service URL provided in `CommerceAction` object | `Commerce Site/Client browser` |
| 5 | Bamboo takes control and performs necessary actions to redirect the customer to external payment media processor service site to complete payment | `Bamboo Site/Customer browser` |
| 6 | The customer follows the steps shown by acquirer’s site in order to complete the payment | `External Payment Site/Client` |
| 7 | The response is received by redirection, Bamboo process and update transaction status, and then redirects back to merchant’s response page (According to transaction status) | `/paymentCallback` |
| 8 | Bamboo receives async push notification from acquire and notify back to merchant’s notification webhook (the purchase status is updated) |` /webhook (Merchant)` |

## Response URLS
As the result of the transaction, it can be iun any of the following status.

| Status | Description |
|---|---|
| Approved | Purchase approved. No verification needed. |
| Rejected | Purchase rejected. |
| Canceled | The purchase customer has been cancelled by the process or and automatic process. |
| Pending | The purchase is pending to be paid in a Cash Payment network, or to be confirmed by the payment method processor. |

Therefore, the following URLs are defined to be sent in the Purchase when the same host to host is created prior to the redirection: 

* `Url_Approved` → callback url when purchase status is `Approved` 
* `Url_Rejected` → callback url when purchase status is `Rejected` 
* `Url_Canceled` → callback url when purchase status is `Canceled` 
* `Url_Pending`  → callback url when purchase status is `Pending` 
* `Url_Notify`   → webhook notification URL. The Purchase status is notified to this URL once the payment method processor notifies Bamboo. The notification to this URL is a REST POST with JSON payload, instead of redirection. It can also be static and configured by Support Team.

### Redirect Flow Purchase example

```json
{
    "TrxToken":"OT__Kg1JdcN4Fz6g7RUCF_xdtbR5n0FVX4IctD__P3BSApY_",
    "Capture":"true",
    "Amount":10000000,
    "Installments":1,
    "Currency": "CLP",,
    "TargetCountryISO": "CL",
    "PaymentMediaId":106,
    "Redirection" : {
      "Url_Approved": "https://dummystore.com/checkout/approved",
      "Url_Rejected": "https://dummystore.com/checkout/rejected",
      "Url_Canceled": "https://dummystore.com/checkout/canceled",
      "Url_Pending": "https://dummystore.com/checkout/pending",
      "Url_Notify": "https://dummystore.com/checkout/notifications"
    }
}
```
<br>

The _**PaymentMediaId**_ and _**TrxToken**_ fields are optional but it is mandatory to send one of them depending on the flow you want to use.

* _**PaymentMediaId**_: Alternative payment method identifier (transfer, cash and processing that requires customer redirection). This identifier can be obtained by consulting the [Payment methods by country section](/docs/payment-methods.html).
* _**TrxToken**_: You can pre-generate the token and proccess by sending it in this field.

### Redirect response content
The redirection callback response contains the `PurchaseID` and `Status`, as `FORM` data (input data).

```http
<form method="post" action="https://dummystore.com/checkout/approved">
  <input type="hidden" id="PurchaseId" name="PurchaseId" value="198742" />
  <input type="hidden" id="Status" name="Status" value="approved" />
</form>
```

{{% alert title="Note" color="info"%}}
There is no validation system, so it is not recommended to take the response as final. Instead, take the `PurchaseId` and perform a **GET** request (server to server) to `/v1/api//api/Purchase/{ID}` to get the full Purchase Object and its final status.
{{% /alert %}}