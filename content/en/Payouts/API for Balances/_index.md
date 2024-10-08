---
title: "API for Balances"
date: 2024-08-02T07:28:16-05:00
type: docs
Description: >
  The API for Balances allows merchants to check their account balances for payouts without using Bamboo's merchant console.
weight: 40
notopicssection: true
---

This endpoint allows you to retrieve the current available balance for processing payouts. It provides detailed information about your account's financial status, including the available balance, accounting balance, and any pending fees or processing amounts.

## Request URL
You must invoke a **GET** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v1/api/merchant/account/balance`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/merchant/account/balance`

## Authorization
In the header, the `Authorization` parameter must be configured by concatenating the word `Basic`, a space and the _**Private Key**_ of the merchant.

## Response example

{{% alert title="Info" color="info"%}}
You don't need to configure a request to invoke this API.
{{% /alert %}}


{{< highlight json >}}
{{< Payouts/ApiForBalance/response >}}
{{< /highlight >}}

<br>
Where:

| Parameter | Type | Description |
|-----------|------|-------------|
| `Response` | `object` | Contains the balance information. |
| `Response` → `Date` | `string` | The timestamp of when the balance information was retrieved. |
| `Response` → `CurrencyCode` | `string` | The currency code of the balance amounts. |
| `Response` → `FinalAccountingBalance` | `number` | The total balance of the account. |
| `Response` → `FinalAvailableBalance` | `number` | The final available balance for processing payouts. |
| `Response` → `FinalFeeBalance` | `number` | The final balance for fees (in cases where the merchant assumes them independently of the account's total balance). If fees are automatically deducted from the main balance, this value is typically zero.  |
| `Response` → `FinalProcessingBalance` | `number` | The final balance of any amounts in processing. |
| `Errors` | `object` | Contains any error information. Will be `null` if the request was successful. |