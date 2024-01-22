---
title: "API Error codes"
linkTitle: "Error Codes"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  This article provides information about the error codes you may find when using the Payouts integration.
weight: 40
---

| Error code | Category | Description |
|---|---|---|
| `000` | Response codes | Invalid Code. |
| `200` | Response codes | Success. |
| `400` | Response codes | Bad Request. |
| `401` | Response codes | Unauthorized. |
| `409` | Response codes | Conflict. |
| `601` | Purchase Preview | Invalid Destination Country. |
| `602` | Purchase Preview | Invalid Origin currency. |
| `699` | Purchase Preview | Generic error for Purchase Preview. |
| `701` | Transactional errors | Insufficient balance. |
| `702` | Transactional errors | Declined by compliance. |
| `703` | Transactional errors | General Error Balance. |
| `704` | Transactional errors | Minimum payout amount is invalid. |
| `812` | API Validation | Declined by validation for document. |
| `813` | API Validation | Declined by validation for account. |
| `814` | API Validation | Declined by validation for country. |
| `816` | API Validation | Reference ID already used.<br>This error is not be displayed in the [Payouts console](../payouts-merchant-console.html) but it is returned via API. |
| `817` | API Validation | Destination currency Unsupported. |
| `901` | Rejections | Bank account is closed. |
| `902` | Rejections | Invalid bank account. |
| `903` | Rejections | Invalid bank account type. |
| `904` | Rejections | Invalid bank branch. |
| `905` | Rejections | Monthly limit exceeded for user. |
| `906` | Rejections | Rejected by merchant's request. |
| `907` | Rejections | The bank account is unable to receive transfers. |
| `908` | Rejections | Invalid beneficiary document. |
| `909` | Rejections | Beneficiary name doesn't match bank details. |
| `910` | Rejections | PIX key invalid. |
| `911` | Rejections | Invalid state change requested. |
| `912` | Rejections | Insufficient Balance. |
| `913` | Rejections | Invalid process date. |
| `914` | Rejections | Insufficient Balance in integration. |
| `915` | Rejections | General error in integration. |
| `916` | Rejections | Bank reject. |
| `999` | Rejections | Error. |