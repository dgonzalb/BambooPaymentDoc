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

## Medios de pago {#payment-methods}

| | Payment MediaId | Medio de pago | Compra | Preautorización | Reembolso total | Reembolso parcial | Tipo | Flujo |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Visa_CreditCard.png"  style="" /> | 1 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png"  style="" /> | 2 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png"  style="" /> | 3 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Khipu_BankTransfer.png"  style="" />| 106 | Khipu | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Bank Transfer | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Multicaja_PhysicalNetwork.png"  style="" />| 107 | Klap Efectivo | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Visa_CreditCard.png"  style="" /> | 112 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta Débito | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png"  style="" /> | 112 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta Débito | Redirect |

## Monedas {#currencies}

| Código | Description  | Mode                     |
|------|--------------|--------------------------|
| USD  | Dólar estadounidense    | CrossBorder              |
| CLP  | Chilean peso | Doméstico y CrossBorder |

## Límites de montos {#amount-limits}

|  | Tarjetas | Efectivo | Bank transfer |
|---|:---:|:---:|:---:|
| **Mínimo**  | CLP 50 | CLP 50 | CLP 50 |
| **Máximo** | CLP 99.999.999 | CLP 99.999.999 | CLP 50.000 |

## Tipos de documentos {#document-types}
La siguiente tabla describe los tipos de documentos válidos para Argentina:

| Código | Nombre del documento        | Abreviación |
|:----:|----------------------|--------------|
| 20   | Rol Único Tributario | DNI          |
| 21   | Cédula de Identidad  | CI           |