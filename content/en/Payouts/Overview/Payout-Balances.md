---
title: "Payout balances"
linkTitle: "Payout balances"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  The balance is the amount of money you have to process Payout transactions. We have three types of Balances in Bamboo Payout and you can see them in two models.
weight: 30
---

The balances available are updated according to the movements performed in your account such as funds deposit or disbursement.

## Balance types
You can see the following balances in the Payouts console:

* **Total Balance**: corresponds to the total amount of money you have in your account.
* **Processing Balance**: corresponds to the amount requested to be disbursed in all your payout. The fee amount of the payouts may be included depending on who will assume the fee (you or your payee) and the [model]({{< ref "#balance-models" >}}) selected. When all the Payouts have reached a terminal  (Paid or rejected), the value displayed here is 0.
* **Available Balance**: correspond to the amount of money yo have to process more Payouts and ir is the difference between the ***Total Balance*** and the ***Processing Balance***.

{{% alert title="Info" color="info"%}}
If the fee is assumed by the payee, this will not be reflected in any balance type.
{{% /alert %}}

## Balance models
Bamboo payouts offers you the possibility to see the three balance types in two models:

* **Simplified Model**: a single balance for Payouts.<br>
In this case, both the payout amount and the fee charged are deducted from your global balance.

![](/assets/Payouts/Payouts3_en.png)


* **Detailed Model**: one balance for Payouts and one for fees.<br>
In this case, you have two balances, one to deduct the net amounts from the Payout and another to exclusively deduct the fees charged.

![](/assets/Payouts/Payouts4_en.png)

## Examples
To let you understand the concepts of type and model behind the Payout balances, lets make an example.

Let's assume that you have the following information:

| | |
|---|---|
| Payout amount requested | 10 USD |
| Fee | 2 USD |
| Initial balance | 20 USD |
| Initial balance for fee | 5 USD |

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

_If the payout is rejected, the process fee is not refunded._

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

_If the payout is rejected, the process fee is not refunded._

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