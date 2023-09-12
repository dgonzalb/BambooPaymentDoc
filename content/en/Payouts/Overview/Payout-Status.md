---
title: "Payout status"
linkTitle: "Payout status"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  From when you request a payout to when your payee receives the money, the Payout follows a set of statuses. In this section, we give a brief explanation of these statuses.
weight: 20
---

The following diagram represents the status of a payout:

![](/assets/Payouts/Payouts2_en.png)

* **Received**: This is the initial status after the Once you request a payout, we validate the Payout structure (for Payouts requested through API) and create it in our system. For more information about the design, refer to [Payouts API](../payouts-api.html). 

Furthermore, we validate that your account has enough balance before moving to the following state; otherwise, the request will be declined.

* **Validated**: This status indicates that the Payout has a valid structure and your account has enough funds to cover the Payout amount and the fee (in case you assume it). We define whether the Payout needs a manual review under two criteria during this status. First, the limit of payments received by the payee, and second, the [sanction screening](../overview/payout-concepts.html#sanction-screening) process.

* **Held**: This status indicates that the payout is under a manual review from our side due to the validations performed in the previous step. The ETC of this status is XX business days.

* **Pending**: This status indicates that the payout and the payee have met all the validations required, and it is about to be sent to the _Banking Connections_.

* **Processing**: The _Banking Connection_ has received the payout; the time before moving to ***Paid*** status depends on the country and selected payment method. [Click here to learn more](../overview.html#considerations).

* **Paid**: The _Banking Connection_ has processed the Payout and is approved. In this status, we update your [balance]({{< ref "Payout-Balances.md" >}}) with the transaction values.

* **Rejected**: The _Banking Connection_ has processed the Payout and is not approved. In this status, we update your [balance]({{< ref "Payout-Balances.md" >}}) with the transaction values.

* **Declined**: The payout was rejected due to structure validation or internal reasons.

 