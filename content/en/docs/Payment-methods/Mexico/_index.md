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

|  | PaymentMethod PaymentMediaID | Name | Purchase | Authorization | Full Refund | Partial Refund | Type |
|------|----------------------------|---------|---------|--------------|-----------------|-------------------|------|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" alt="visa" style="min-width: 40px;" /> | `VSC` - `1` | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit & Debit Card |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" alt="mastercard" style="min-width: 40px;" /> | `MCC` - `2` | MasterCard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit & Debit Card |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" alt="amex" style="min-width: 40px;" /> | `AMC` - `3` | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit Card |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/OpenPay_PhysicalNetwork.png" alt="paynet" style="min-width: 40px;" /> | `PYN` - `30` | Paynet | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Oxxo_PhysicalNetwork.png" alt="oxxo" style="min-width: 40px;" /> | `OXP` - `90` | OXXOPay | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash |
| <img src="/assets/SPEI.png" alt="spei" style="min-width: 40px;" /> | `73` - `73` | SPEI | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Bank Transfer |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" alt="visa" style="min-width: 40px;" /> | `OPC` - `111` | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit & Debit Card |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" alt="mastercard" style="min-width: 40px;" /> | `OPC` - `111` | MasterCard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit & Debit Card |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" alt="amex" style="min-width: 40px;" /> | `OPC` - `111` | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Carnet_CreditCard.png" alt="carnet" style="min-width: 40px;" /> | `CNC` - `113` | Carnet Crédito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit Card |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Carnet_CreditCard.png" alt="carnet" style="min-width: 40px;" /> | `CND` - `114` | Carnet Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Debit Card |


<!--| | Payment MediaId | Payment Method | Purchase | Pre-authorization | Full refund | Partial Refund | Type | Flow |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 1 | VISA | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit & Debit Card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | 2 | MasterCard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit & Debit Card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" style="min-width: 40px;" /> | 3 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/OpenPay_PhysicalNetwork.png" style="min-width: 40px;" /> | 30 | Paynet | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Oxxo_PhysicalNetwork.png" style="min-width: 40px;" /> | 90 | OXXOPay | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash | API |
| <img src="/assets/SPEI.png" style="min-width: 40px;" /> | 73 | SPEI | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Bank Transfer | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 111 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit & Debit Card | Redirect |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | 111 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit & Debit Card| Redirect |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" style="min-width: 40px;" /> | 111 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | Redirect |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Carnet_CreditCard.png" style="min-width: 40px;" /> | 111 | Carnet | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | Redirect |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Carnet_CreditCard.png" style="min-width: 40px;" /> | 113 | Carnet Crédito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Carnet_CreditCard.png" style="min-width: 40px;" /> | 114 | Carnet Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Debit Card | API |-->

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

{{% alert title="Note" color="info"%}}
The maximum amount for Cash payment depends on the cash payment office.
* For _7Eleven_, and _Farmacias del Ahorro_ is MXN 5.000,00.
* For _Farmacias Benavides_, _Walmart Express_, _Circle K_, and _OXXO_ is MXN 10.000,00.

{{% /alert %}}