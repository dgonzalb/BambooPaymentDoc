---
title: "Request a Withdrawal"
linkTitle: "Request a Withdrawal"
date: 2024-10-04T08:40:29-03:00
Description: >
  This public API allows merchants to request a withdrawal of their available funds from Bamboo.
weight: 10
---

## Request URL
You must invoke a **GET** request to the following URLs according to your needs.

* **Production**: `https://api.bamboopayment.com/v1/api/merchant/withdrawal`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/merchant/withdrawal`

## Authorization
In the header, the `Authorization` parameter must be configured by concatenating the word `Basic`, a space and the _**Private Key**_ of the merchant.

## Request parameters
| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `ReferenceId` | string | Yes | A unique identifier for this withdrawal request |
| `CurrencyIsoCode` | string | Yes | The ISO code of the currency for the withdrawal (e.g., "USD") |
| `Requester` | string | No | Identifier of the person or system requesting the withdrawal |
| `TextNotes` | string | No | Additional notes or comments about the withdrawal |


### Request example
```json
{
  "ReferenceId": "withdrawal-001",
  "CurrencyIsoCode": "USD",
  "Requester": "merchant-001",
  "TextNotes": "Monthly operational expenses withdrawal"
}
```

## Response

`Ok`: HttpCode `200`.<br>
Message received correctly, at this point the Withdrawal request starts to be processed.

`BadRequest`: HttpCode HttpCode `400`.<br>
The validation of the message failed, and the Withdrawal request is not created.