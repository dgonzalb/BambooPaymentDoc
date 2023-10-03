---
title: "Brazil"
linkTitle: "Brazil"
date: 2023-05-08T07:28:16-05:00
description: >
  _Brazil_ is the largest economy in Latin America. Digital technology adoption has ballooned in recent years, primarily focused on online commerce, payments, and banking.
weight: 20
tags: ["parenttopic"]
---

This section shows the available payment methods, currencies, and related information to consider when processing in _Brazil_.

## Payment methods

| | Payment MediaId | Payment Method | Purchase | Pre-authorization | Full refund | Partial Refund | Type | Flow |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" alt="visa" style="min-width: 40px;" /> | 1 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" alt="master" style="min-width: 40px;" /> | 2 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" alt="amex" style="min-width: 40px;" /> | 3 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Diners_CreditCard.png" alt="amex" style="min-width: 40px;" /> | 12 | Diners | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.stage.bamboopayment.com/payment-method-logos/PIX_BankTransfer.png" alt="pix" style="min-width: 40px;" /> | 31 | PIX | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Bank Transfer | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Hipercard_CreditCard.png" alt="amex" style="min-width: 40px;" /> | 62 | Hipercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Elo_CreditCard.png" alt="amex" style="min-width: 40px;" /> | 63 | Elo | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Aura_CreditCard.png" alt="amex" style="min-width: 40px;" /> | 64 | Aura | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Boleto_PhysicalNetwork.png" alt="boleto" style="min-width: 40px;" /> | 66 | Boleto | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash | API |

## Currencies

| Code | Description    | Mode                     |
|------|----------------|--------------------------|
| USD  | US Dollar      | CrossBorder              |
| BRL  | Brazilian Real | Domestic and CrossBorder |

## Amount limits

|  | Cards | Boleto | PIX |
|---|:---:|:---:|:---:|
| **Minimum** | BRL 0,01 | BRL 0,01 | BRL 0,1 |
| **Maximum** | BRL 99.999,99 | BRL 99.999,99 | BRL 99.999,99 |

## Document types
The following table describes the valid document types for Brazil:

| Code | Document name                          | Abbreviation |
|:----:|----------------------------------------|--------------|
| 24   | Cadastro de Pessoas Físicas            | CPF          |
| 25   | Cadastro Nacional da Pessoas Jurídicas | CNPJ         |

## Customer's state of residence

<div id="shortTable"></div>

| State | Abbreviation |
|---|:-:|
| Acre | `AC` |
| Alagoas | `AL` |
| Amapá | `AP` |
| Amazonas | `AM` |
| Bahia | `BA` |
| Ceará | `CE` |
| Distrito Federal | `DF` |
| Espírito Santo | `ES` |
| Goias | `GO` |
| Maranhão | `MA` |
| Mato Grosso | `MT` |
| Mato Grosso do Sul | `MS` |
| Minas Gerais | `MG` |
| Pará | `PA` |
| Paraíba | `PB` |
| Paraná | `PR` |
| Pernambuco | `PE` |
| Piauí | `PI` |
| Rio de Janeiro | `RJ` |
| Rio Grande do Norte | `RN` |
| Rio Grande do Sul | `RS` |
| Rondônia | `RO` |
| Roraima | `RR` |
| Santa Catarina | `SC` |
| São Paulo | `SP` |
| Sergipe | `SE` |
| Tocantins | `TO` |