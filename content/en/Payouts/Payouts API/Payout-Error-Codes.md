---
title: "API Error codes"
linkTitle: "Error Codes"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  This article provides information about the error codes you may find when using the Payouts integration.
weight: 40
---

| Error code | Description |
|---|---|
| `200` | Success. |
| `400` | Bad Request. |
| `401` | Unauthorized. |
| `409` | Conflict. |
| `812` | Declined by validation for document. |
| `813` | Declined by validation for account. |
| `814` | Declined by validation for country. |
| `815` | Declined by Compliance. |
| `816` | Reference ID already used.<br>This error is not be displayed in the [Payouts console](/payouts/payouts-merchant-console.html) but it is returned via API. |
| `901` | Bank account is closed. |
| `902` | Invalid bank account. |
| `903` | Invalid bank account type. |
| `904` | Invalid bank branch. |
| `905` | Monthly limit exceeded for user. |
| `906` | Rejected by merchant's request. |
| `907` | The bank account is unable to receive transfers. |
| `908` | Invalid beneficiary document. |
| `909` | Beneficiary name doesn't match bank details. |
| `910` | PIX key invalid. |
| `911` | Invalid state change requested. |
| `912` | Insufficient Balance. |
| `999` | Error. |