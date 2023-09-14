---
title: "Chile"
linkTitle: "Chile"
date: 2023-05-08T07:28:16-05:00
description: >
  _**Chile**_ has a highly globalized domestic market with several Free Trade Agreements, including the _United States_ and _China_. Purchasing power is one of the highest in the region, and the increased adoption of local credit and debit cards enables eCommerce merchants to gain traction quickly.
weight: 40
tags: ["parenttopic"]
---

This section shows the available payment methods, currencies, and related information to consider when processing in _Chile_.

## Payment methods

| | Payment MediaId | Payment Method | Purchase | Pre-authorization | Full refund | Partial Refund | Type | Flow |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Visa_CreditCard.png"  style="min-width: 40px;" /> | 1 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png"  style="min-width: 40px;" /> | 2 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png"  style="min-width: 40px;" /> | 3 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Khipu_BankTransfer.png"  style="min-width: 40px;" />| 106 | Khipu | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Bank Transfer | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Multicaja_PhysicalNetwork.png"  style="min-width: 40px;" />| 107 | Klap Efectivo | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Visa_CreditCard.png"  style="min-width: 40px;" /> | 112 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Debit Card | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png"  style="min-width: 40px;" /> | 112 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Debit Card | Redirect |

## Currencies

| Code | Description  | Mode                     |
|------|--------------|--------------------------|
| USD  | US Dollar    | CrossBorder              |
| CLP  | Chilean peso | Domestic and CrossBorder |

## Amount limits

|  | Cards | Cash | Bank transfer |
|---|:---:|:---:|:---:|
| **Minimum** | CLP 50 | CLP 50 | CLP 50 |
| **Maximum** | CLP 99.999.999 | CLP 99.999.999 | CLP 50.000 |

## Document types
The following table describes the valid document types for Chile:

| Code | Document name        | Abbreviation |
|:----:|----------------------|--------------|
| 20   | Rol Único Tributario | DNI          |
| 21   | Cédula de Identidad  | CI           |