---
title: "Paraguay"
linkTitle: "Paraguay"
date: 2023-05-08T07:28:16-05:00
description: >
  In _**Paraguay**_, the electronic payments market is in constant development and growth, driven by the population's expansion of internet access and the adoption of financial technologies. There are still challenges regarding financial inclusion and the massive adoption of these payment methods; hence, the market is expected to grow in the following years.
weight: 80
tags: ["parenttopic"]
---

{{% alert title="Note" color="info"%}}
We only offer support for merchants in Paraguay through the **Gateway** model, and we send the invoice to them from Uruguay.
{{% /alert %}}

Esta sección muestra los medios de pago disponibles, monedas e información relacionada que se debe tener en cuenta cuando procese en _Paraguay_.

## Medios de pago {#payment-methods}

| | Payment MediaId | Medio de pago | Compra | Preautorización | Reembolso total | Reembolso parcial | Tipo | Flujo |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 1 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | 2 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito y débito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" style="min-width: 40px;" /> | 3 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito y débito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 6 | Visa Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta Débito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Bancard_CreditCard.png" style="min-width: 40px;" /> | 21 | Bancard Check | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Credifielco_CreditCard.png" style="min-width: 40px;" /> | 22 | Credifielco | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/InfoNet_DebitCard.png" style="min-width: 40px;" /> | 23 | Infonet | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta Débito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/PagoExpress_PhysicalNetwork.png" style="min-width: 40px;" /> | 27 | PagoExpress | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo | API |

## Monedas {#currencies}

| Código | Descripción        | Modo        |
|------|--------------------|-------------|
| USD  | Dólar estadounidense          | CrossBorder |
| PYG  | Paraguayan Guaraní | Domestic    |

## Tipos de documentos {#document-types}
La siguiente tabla describe los tipos de documentos válidos para Paraguay:

| Código | Nombre del documento                    | Abreviación |
|:----:|----------------------------------|--------------|
| 1    | Registro Único del Contribuyente | RUC          |
| 2    | Cédula de Identidad              | CIC          |
| 3    | Documento Extranjero             | DEX          |
| 23   | Referencia genérica              | GEN          |