---
title: "Notification Webhook"
linkTitle: "Notification Webhook"
date: 2023-09-12T11:19:09-05:00
type: docs
Description: >
  You can implement a service to receive and process notifications related to the Payout final status from the Bamboo Payment systems.
weight: 40
---

The Payout API only sends notifications for the final statuses (**Paid**, **Declined**, and **Rejected**). For payout states, check our [status article]({{< ref Payout-Status.md >}}).

| STATUS    | Code | DESCRIPTION |
|-----------|------|-------------|
| `Paid`      | `1`    | The payout has been paid. This is a final status indicating the successful completion of the payment.  |
| `Declined`  | `8`    | The payout was declined due to structural validation or Compliance rules. |
| `Rejected`  | `4`    | The payout was rejected. Possible reasons for rejection include bank account issues, monthly limits exceeded, etc. |

The merchant must publish an HTTP/REST service to send the notifications generated.

## WebHook Service specifications
The WebHook service is a REST Service that must process a request with the following characteristics:

<div id="shortTable"></div>

|        |          | 
|:-------|:---------|
|**URL:** | *\<Determined by the merchant\>* |
|**API Type:** | Public |
|**Method:** | POST |
|**Response:** | HTTP Code |

### Notification parameters

| Parameter | Format | Description |
|---|:-:|---|
| `payoutId` | `integer` | Internal identification of the Payout. |
| `reference` | `string` | Unique identifier of the Payout you defined when you requested the Payout. |
| `isoCountry` | `string` | ISO code of the country in the format `ISO 3166-2`. |
| `created` | `date` | Date and time when the Payout was requested. |
| `lastUpdate` | `date` | Date and time of the last update of the Payout. |
| `status` | `integer` | Internal code of the current status of the Payout. |
| `statusDescription` | `string` | Final status of the Payout. Refer to [this article]({{< ref "Payout-Status.md" >}}) to learn more about Payout status. |
| `errorCode` | `string` | Internal code of the error for the declined Payout. Find the possible errors [here]({{< ref "Payout-Error-Codes.md">}}). |
| `errorDescription` | `string` | Error description for declined Payouts. |
| `amount` | `object` | Value and currency requested in the Payout. |
| `localAmount` | `object` | Value and currency requested in the Payout in local currency. |
| `exchangeRate` | `numeric` | Conversion value used in the Payout. |
| `payee` | `object` | Information of the recipient or beneficiary of the Payout. |


### Notification example
```json
{
  "payoutId": 18009,
  "reference": "PAB-3268",
  "isoCountry": "BR",
  "created": "2023-08-30T12:02:39.1987743+00:00",
  "lastUpdate": "2023-08-30T12:06:26.9119828+00:00",
  "status": 1,
  "statusDescription": "Paid",
  "errorCode": null,
  "errorDescription": null,
  "amount": {
    "value": 10,
    "isoCurrency": "USD"
  },
  "localAmount": {
    "value": 47.31,
    "isoCurrency": "BRL"
  },
  "exchangeRate": 4.851803,
  "payee": {
    "firstName": "Tiago",
    "lastName": "Costa",
    "email": "tcosta@mail.com",
    "phone": "92799322",
    "address": "55489-272, Travessa Eduardo, 90 Esteves do Norte - CE",
    "document": {
      "number": "54562271779",
      "type": "CPF"
    }
  }
}
```
{{% alert title="Info" color="info"%}}
In payout notifications for company, you will receive the field `companyName` instead of `firstName` and `lastName`.
{{% /alert %}}