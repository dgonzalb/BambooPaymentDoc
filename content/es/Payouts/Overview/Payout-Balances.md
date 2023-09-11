---
title: "Payout balances"
linkTitle: "Payout balances"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  The balance is the amount of money you have to process Payout transactions. We have three types of Balances in Bamboo Payout, and you can see them in two models.
weight: 30
---

We update the balances available according to the movements performed in your account, such as funds deposit or disbursement.

## Balance types
You can see the following balances in the Payouts console:

* **Total Balance**: This amount corresponds to your account's total amount of money.
* **Processing Balance**: This amount corresponds to all your requested disbursements in Payouts. The payout fee amount might be included, depending on the party responsible for the fee (either you or your payee) and the chosen [model]({{< ref "#balance-models" >}}). Once all the Payouts have reached a terminal state (Paid or rejected), the value displayed here will be 0.
* **Available Balance**: correspond to the amount of money yo have to process more Payouts and ir is the difference between the ***Total Balance*** and the ***Processing Balance***.

{{% alert title="Info" color="info"%}}
If the payee assumes the fee, the Payouts feature does not add the fee to any balance type.
{{% /alert %}}

## Balance models
The Bamboo Payouts feature offers you the possibility to see the three balance types in two models:

* **Simplified Model**: a single balance for Payouts.<br>
In this case, the payout amount and the fee charged are deducted from your global balance.

![](/assets/Payouts/Payouts3_en.png)

* **Detailed Model**: one Balance for Payouts and one for fees.<br>
In this case, you have two Balances, one to remove the net amounts from the Payout and another to deduct the fees charged exclusively.

![](/assets/Payouts/Payouts4_en.png)

## Ejemplos
Let's make an example to let you understand the concepts of type and model behind the Payout balances.

Let's assume that you have the following information:

| | |
|---|---|
| Payout amount requested | 10 USD |
| Fee | 2 USD |
| Initial balance | 20 USD |
| Initial balance for the fee | 5 USD |

### Simplified Model - fee assumed by you

**Balance when the payout is requested**
|  |  |
|---|---|
| Total Balance | 20 USD |
| Processing Balance<br>_Payout amount requested + fee_ | 12 USD |
| Available Balance | 8 USD |

**Balance if the payout is paid**
| | |
|---|---|
| Total Balance | 8 USD |
| Processing Balance | - |
| Available Balance | 8 USD |

**Balance if the payout is rejected.**
| | |
|---|---|
| Total Balance | 18 USD |
| Processing Balance | - |
| Available Balance | 18 USD |

_If the payout is rejected, the processing fee is not refunded._

### Simplified Model - fee assumed by the payee
**Balance when the payout is requested**
|  |  |
|---|---|
| Total Balance | 20 USD |
| Processing Balance| 10 USD |
| Available Balance | 10 USD |

**Balance if the payout is paid**
| | |
|---|---|
| Total Balance | 10 USD |
| Processing Balance | - |
| Available Balance | 10 USD |

**Balance if the payout is rejected.**
| | |
|---|---|
| Total Balance | 20 USD |
| Processing Balance | - |
| Available Balance | 20 USD |

### Detailed Model - fee assumed by you
**Balance when the payout is requested**
| Balance for Payouts |  |
|---|---|
| Total Balance | 20 USD |
| Processing Balance| 10 USD |
| Available Balance | 10 USD |

| Balance for fee |  |
|---|---|
| Total Balance | 5 USD |
| Processing Balance | 2 USD |
| Available Balance | 3 USD |

**Balance if the payout is paid**
| Balance for Payouts |  |
|---|---|
| Total Balance | 10 USD |
| Processing Balance| - |
| Available Balance | 10 USD |

| Balance for fee |  |
|---|---|
| Total Balance | 3 USD |
| Processing Balance| - |
| Available Balance | 3 USD |

**Balance if the payout is rejected.**
| Balance for Payouts |  |
|---|---|
| Total Balance | 20 USD |
| Processing Balance| - |
| Available Balance | 20 USD |

| Balance for fee |  |
|---|---|
| Total Balance | 3 USD |
| Processing Balance| - |
| Available Balance | 3 USD |

_If the payout is rejected, the processing fee is not refunded._

### Detailed Model - fee assumed by the payee
**Balance when the payout is requested**
| Balance for Payouts |  |
|---|---|
| Total Balance | 20 USD |
| Processing Balance| 10 USD |
| Available Balance | 10 USD |

| Balance for fee |  |
|---|---|
| Total Balance | 5 USD |
| Processing Balance| - |
| Available Balance | 5 USD |

**Balance if the payout is paid**
| Balance for Payouts |  |
|---|---|
| Total Balance | 10 USD |
| Processing Balance| - |
| Available Balance | 10 USD |

| Balance for fee |  |
|---|---|
| Total Balance | 5 USD |
| Processing Balance| - |
| Available Balance | 5 USD |

**Balance if the payout is rejected.**
| Balance for Payouts |  |
|---|---|
| Total Balance | 20 USD |
| Processing Balance| - |
| Available Balance | 20 USD |

| Balance for fee |  |
|---|---|
| Total Balance | 5 USD |
| Processing Balance| - |
| Available Balance | 5 USD |