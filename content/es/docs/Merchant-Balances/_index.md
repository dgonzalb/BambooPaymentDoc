---
title: "API for Account Balances"
date: 2023-05-08T07:28:16-05:00
Description: >
  The API for Account Balances allows merchants to check their account balances without using Bamboo's merchant console.
weight: 60
notopicssection: true
---

## Endpoint
Point your request to any of the following URLs according to your needs.

* STAGE: `https://api.stage.bamboopayment.com/v1/api/merchant/account/balance`
* PROD: `https://api.bamboopayment.com/v1/api/merchant/account/balance`

## Authorization
In the header, the `Authorization` parameter must be configured by concatenating the word `Basic`, a space and the _**Private Key**_ of the merchant.

## Response example

{{% alert title="Info" color="info"%}}
You don't need to configure a request to invoke this API.
{{% /alert %}}


```json
{
    "Response": {
        "Date": "2023-06-02T20:59:59-03:00",
        "CurrencyCode": "UYU",
        "FinalAccountingBalance": 13670.0000,
        "FinalAvailableBalance": 13670.0000,
        "FinalFeeBalance": 0.0,
        "FinalProcessingBalance": 0.0
    },
    "Errors": null
}
```
<br>
Where:

| Parameter | Description |
|---|---|
| `Response` → `Date` | Date and time when you send the request. |
| `Response` → `CurrencyCode` | ISO code of the currency configured for the merchant. |
| `Response` → `FinalAccountingBalance` | Total balance. |
| `Response` → `FinalAvailableBalance` | Total balance available for withdraw. |
| `Response` → `FinalFeeBalance` | Balance available for fees. |
| `Response` → `FinalProcessingBalance` | Balance in processing. This balance will be available when the processing finishes successfully; otherwise, it is canceled. |
| `Errors` | Errors that may appear during the execution of the API method. |