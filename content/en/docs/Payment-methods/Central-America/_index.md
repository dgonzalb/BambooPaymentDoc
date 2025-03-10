---
title: "Central America"
linkTitle: "Central America"
date: 2023-05-08T07:28:16-05:00
description: >
  Receive payments in _**Costa Rica**_, _**El Salvador**_, and _**Nicaragua**_ using _PuntoXpress_, Central America's most extensive cash collection network with regional coverage.
weight: 30
tags: ["parenttopic"]
---

This section shows the available payment methods, currencies, and related information to consider when processing in _Costa Rica_, _El Salvador_, and _Nicaragua_.

## Payment methods
|  | PaymentMethod PaymentMediaID | Name | Purchase | Authorization | Full Refund | Partial Refund | Type |
|------|----------------------------|---------|---------|--------------|-----------------|-------------------|------|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/PuntoXpress_PhysicalNetwork.png" alt="puntoxpress" style="min-width: 40px;" /> | `PNX` - `28` | PuntoXpress | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash |

<!--| | Payment MediaId | Payment Method | Purchase | Pre-authorization | Full refund | Partial Refund | Type | Flow |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/PuntoXpress_PhysicalNetwork.png" alt="puntoxpress" style="" /> | 28 | PuntoXpress | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Cash | API | -->

## Currencies

| Code | Description        | Mode                                  |
|------|--------------------|---------------------------------------|
| USD  | US Dollar          | Domestic<sup>*</sup> and CrossBorder  |
| CRC  | Costa Rican colón  | Domestic and CrossBorder              |
| NIO  | Nicaraguan córdoba | Domestic and CrossBorder              |

<sup>*</sup>_**USD** for domestic purchases is only available for El Salvador._

## Document types
The following table describes the valid document types for Central America.

| Code (V3 API) | Code (Previous API) | Document name                                      | Abbreviation | Country     |
|:-------------:|:-------------------:|----------------------------------------------------|--------------|-------------|
|  CI.CR        | 30                  | Cédula de identidad                                | CI           | Costa Rica  |
|  DIMEX.CR     | 31                  | Documento de Identidad Migratoria para Extranjeros | DIMEX        | Costa Rica  |
|  PA.CR        | 32                  | Pasaporte                                          | PA           | Costa Rica  |
|  CI.NI        | 33                  | Cédula de identidad                                | CI           | Nicaragua   |
|  PA.NI        | 34                  | Pasaporte                                          | PA           | Nicaragua   |
|  RUC.NI       | 35                  | Registro Único de Contribuyente                    | RUC          | Nicaragua   |
|  DUI.SV       | 42                  | Documento único de identidad                       | DUI          | El Salvador |
|  PA.SV        | 43                  | Pasaporte                                          | PA           | El Salvador |
|  NIT.SV       | 44                  | Número de identificación tributaria                | NIT          | El Salvador |
|  NRC.SV       | 45                  | Número de Registro de Contribuyente                | NRC          | El Salvador |
