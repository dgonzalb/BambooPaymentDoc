---
title: "Notification Webhook"
linkTitle: "Notification Webhook"
date: 2023-09-12T11:19:09-05:00
type: docs
Description: >
  You can implement a service to receive and process notifications related to the Payout final status from the Bamboo Payment systems.
weight: 40
---

The Payout API only sends notifications for the following statuses (**Held**, **Paid**, **Declined**, and **Rejected**). For payout states, check our [status article]({{< ref Payout-Status.md >}}).

| STATUS    | Code | DESCRIPTION |
|-----------|------|-------------|
| `Held`    | `7`      | The payout is under review from our Compliance Team |
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
| `description` | `string` | The description/reason entered in the request. |

### Notification example
{{< highlight json >}}
{{< Payouts/Api/PayoutsWebhook/notification >}}
{{< /highlight >}}

<br />

**Status:** `Held`
{{< highlight json >}}
{{< Payouts/Api/PayoutsWebhook/notification_held >}}
{{< /highlight >}}



{{% alert title="Info" color="info"%}}
In payout notifications for company, you will receive the field `companyName` instead of `firstName` and `lastName`.
{{% /alert %}}