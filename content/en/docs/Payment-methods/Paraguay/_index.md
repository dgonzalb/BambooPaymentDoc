---
title: "Paraguay"
linkTitle: "Paraguay"
date: 2023-05-08T07:28:16-05:00
description: >
  In _**Paraguay**_, the electronic payments market is constantly developing and growing, driven by the population’s expansion of internet access and the adoption of financial technologies. There are still challenges regarding financial inclusion and the massive adoption of these payment methods; hence, the market is expected to grow in the following years.
weight: 80
tags: ["parenttopic"]
---

{{% alert title="Note" color="info"%}}
We only offer support for merchants in Paraguay through the **Gateway** model, and we send the invoice to them from Uruguay.
{{% /alert %}}

This section shows the available payment methods, currencies, and related information to consider when processing in _Paraguay_.

## Payment methods

| | Payment MediaId | Payment Method | Purchase | Pre-authorization | Full refund | Partial Refund | Type | Flow |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 1 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | 2 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit & Debit card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" style="min-width: 40px;" /> | 3 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit & Debit card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 6 | Visa Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Debit card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Bancard_CreditCard.png" style="min-width: 40px;" /> | 21 | Bancard Check | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Credifielco_CreditCard.png" style="min-width: 40px;" /> | 22 | Credifielco | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Credit card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/InfoNet_DebitCard.png" style="min-width: 40px;" /> | 23 | Infonet | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Debit card | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/PagoExpress_PhysicalNetwork.png" style="min-width: 40px;" /> | 27 | Pago Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash | API |

## Currencies

| Code | Description        |
|------|--------------------|
| USD  | US Dollar          |
| PYG  | Paraguayan Guaraní |

## Document types
The following table describes the valid document types for Paraguay:

| Code (V3 API) | Code (Previous API) |Document name                    | Abbreviation |
|:-------------:|:-------------------:|--------------------------------|--------------|
| RUC.PY        | 1                   |Registro Único del Contribuyente | RUC          |
| CIC.PY       | 2                    |Cédula de Identidad              | CIC          |
| DEX.PY       | 3                    |Documento Extranjero             | DEX          |
| GEN.PY       | 23                   |Referencia genérica              | GEN          |