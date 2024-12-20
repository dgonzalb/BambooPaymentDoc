---
title: "Brasil"
linkTitle: "Brasil"
date: 2023-05-08T07:28:16-05:00
description: >
  _Brasil_ es la mayor economía de Latinoamérica. La adopción de la tecnología digital se ha disparado en los últimos años, centrándose principalmente en comercio electrónico, pagos y banca en línea.
weight: 20
tags: ["parenttopic"]
---

Esta sección muestra los medios de pago disponibles, monedas e información relacionada que se debe tener en cuenta cuando procese en _Brasil_.

## Medios de pago {#payment-methods}

|  | PaymentMethod PaymentMediaID | Nombre | Compra | Autorización | Reembolso total | Reembolso parcial | Tipo |
|------|----------------------------|---------|---------|--------------|-----------------|-------------------|------|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" alt="visa" style="min-width: 40px;" /> | `VSC` - `1` | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de Crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" alt="master" style="min-width: 40px;" /> | `MCC` - `2` | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de Crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" alt="amex" style="min-width: 40px;" /> | `AMC` - `3` | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de Crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Diners_CreditCard.png" alt="diners" style="min-width: 40px;" /> | `DNC` - `12` | Diners | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de Crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/PIX_BankTransfer.png" alt="pix" style="min-width: 40px;" /> | `PIX` - `31` | PIX | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Transferencia Bancaria |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Hipercard_CreditCard.png" alt="hipercard" style="min-width: 40px;" /> | `HPC` - `62` | Hipercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de Crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Elo_CreditCard.png" alt="elo" style="min-width: 40px;" /> | `ELC` - `63` | Elo | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de Crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Aura_CreditCard.png" alt="aura" style="min-width: 40px;" /> | `AUC` - `64` | Aura | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de Crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Boleto_PhysicalNetwork.png" alt="boleto" style="min-width: 40px;" /> | `BLT` - `66` | Boleto | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo |


<!--| | Payment MediaId | Medio de pago | Compra | Preautorización | Reembolso total | Reembolso parcial | Tipo | Flujo |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" alt="visa" style="min-width: 40px;" /> | 1 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" alt="master" style="min-width: 40px;" /> | 2 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" alt="amex" style="min-width: 40px;" /> | 3 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Diners_CreditCard.png" alt="amex" style="min-width: 40px;" /> | 12 | Diners | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/PIX_BankTransfer.png" alt="pix" style="min-width: 40px;" /> | 31 | PIX | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Transferencia Bancaria | API
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Hipercard_CreditCard.png" alt="amex" style="min-width: 40px;" /> | 62 | Hipercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Elo_CreditCard.png" alt="amex" style="min-width: 40px;" /> | 63 | Elo | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Aura_CreditCard.png" alt="amex" style="min-width: 40px;" /> | 64 | Aura | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Boleto_PhysicalNetwork.png" alt="boleto" style="min-width: 40px;" /> | 66 | Boleto | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo | API |-->

## Monedas {#currencies}

| Código | Descripción          | Modo                     |
|--------|----------------------|--------------------------|
| USD    | Dólar estadounidense | CrossBorder              |
| BRL    | Real brasileño       | Doméstico y CrossBorder |

## Límites de montos {#amount-limits}

|  | Tarjetas | Boleto | PIX |
|---|:---:|:---:|:---:|
| **Mínimo**  | BRL 0,01 | BRL 0,01 | BRL 0,1 |
| **Máximo** | BRL 99.999,99 | BRL 99.999,99 | BRL 99.999,99 |

## Tipos de documentos {#document-types}
La siguiente tabla describe los tipos de documentos válidos para Brasil:

| DocumentType | DocumentType (legacy API) | Nombre del documento                   | Abreviación |
|:-------------:|:-------------------:|----------------------------------------|--------------|
| CPF.BR        | 24                  | Cadastro de Pessoas Físicas            | CPF          |
| CNPJ.BR       | 25                  | Cadastro Nacional da Pessoas Jurídicas | CNPJ         |

## Estado de residencia del cliente {#customers-state-of-residence}

<div id="shortTable"></div>

| Estado | Abreviación |
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