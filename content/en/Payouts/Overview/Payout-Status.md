---
title: "Payout status"
linkTitle: "Payout status"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  From the moment you request a payout to the moment when your payee recieves the money, the payout follows a set of statuses. In this section, we give a brief explanation about these statuses.
weight: 20
---

The following diagram represents the statuses of a payout:

![](/assets/Payouts/Payouts2_en.png)

* **Received**: this is the initial status after the  Once you request a payout, we validate the structure of the payout (for Payouts requested through API) and create it in our system. For more information about the structure, refer to [Payouts API](../payouts-api.html).
Furthermore, we validate that you have enough balance settled in your account before moving the next status. Otherwise, it will be declined.

* **Validated**: this status indicates that the payout has a valid srutcture and ypur account has enough funds to cover the Payout amout and the fee (in case it is assumed by you). During this status we define whether the Payout needs a manual review under two criteria. First, the limit of payments recieved by the payee and second, the [sanction screening](../overview/payout-concepts.html#sanction-screening) process.

* **Held**: this status indicates that the payout is under a manual review from our side due to the validations performed in the previous step. The ETC of this status is XX business days.

* **Pending**: this status indicates that the payout and the payee have meet all the validations required and it is about to be sent to the _Banking Connections_.

* **Processing**: the payout has been recieved by the _Banking Connection_, the time before moving to ***Paid*** status depends on the country and the payment method selected. [Click here to learn more](../overview.html#considerations).

* **Paid**: The payout has been processed by the _Banking Connection_ and it has been approved. In this status, your [balance]({{< ref "Payout-Balances.md" >}}) has been updated with the transaction values.

* **Rejected**: The payout has been processed by the _Banking Connection_ and it has been rejected. In this status, your [balance]({{< ref "Payout-Balances.md" >}}) has been updated with the transaction values.

* **Declined**: The payout has been rejected due to structure validation or internal reasons.

 