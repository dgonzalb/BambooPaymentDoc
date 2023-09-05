---
title: "Mexico"
linkTitle: "Mexico"
date: 2023-05-08T07:28:16-05:00
description: >
  With a population of 126 million and 50% of internet penetration, the eCommerce in _**Mexico**_ has exploded in recent years. This trend is expected to continue in the coming years, with an increase in the adoption of financial technologies and the improvement of electronic payment infrastructure in the country.
weight: 70
tags: ["parenttopic"]
---

This section shows the available payment methods, currencies, and related information to consider when processing in _Mexico_.

## Payment methods

| |Payment MediaId | Payment Media | Purchase | Pre-authorization | Full refund | Partial Refund | Type | Flow |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/OpenPay_PhysicalNetwork.png" style="" /> | 30 | Paynet | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/BankTransfer.png" style="" /> | 32 | SPEI | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Bank Transfer | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Oxxo_PhysicalNetwork.png" style="" /> | 35 | Oxxo | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="" /> | 111 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit & Debit Card | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="" /> | 111 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit & Debit Card| Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" style="" /> | 111 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Carnet_CreditCard.png" style="" /> | 111 | Carnet | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | Redirect |

## Currencies

| Code | Description  | Mode                     |
|------|--------------|--------------------------|
| USD  | US Dollar    | CrossBorder              |
| MXN  | Mexican Peso | Domestic and CrossBorder |

## Amount limits

|  | Cards | Cash | Bank transfer |
|---|:---:|:---:|:---:|
| **Minimum** | MXN 1 | MXN 1 | MXN 0,01 |
| **Maximum** | MXN 10.000 | MXN 29.999,99 | - |

{{% alert title="Nota" color="info"%}}
The maximum amount for Cash payment depends on the cash payment office.
* For _7Eleven_, and _Farmacias del Ahorro_ is MXN 5.000,00.
* For _Farmacias Benavides_, _Walmart Express_, _Circle K_, and _OXXO_ is MXN 10.000,00.

{{% /alert %}}