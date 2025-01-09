---
title: "Uruguay"
linkTitle: "Uruguay"
date: 2023-05-08T07:28:16-05:00
description: >
  _**Uruguay**_ ha desarrollado una industria de comercio electrónico que ha ido ganando favorabilidad en los clientes de forma progresiva. Su favorable entorno regulatorio, el aumento del uso de teléfonos inteligentes y el aumento de la penetración de Internet han contribuido al boom del comercio electrónico en Uruguay.
weight: 100
tags: ["parenttopic"]
---

Esta sección muestra  los medios de pago disponibles, monedas y la información relacionada que debe considerar cuando procese en _Uruguay_.

## Medios de pago {#payment-methods}

### Modelo Gateway {#gateway-model}

|  | PaymentMethod PaymentMediaID | Nombre | Compra | Autorización | Reembolso total | Reembolso parcial | Tipo |
|------|----------------------------|---------|---------|--------------|-----------------|-------------------|------|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | `VSC` - `1` | VISA | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | `MCC` - `2` | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" style="min-width: 40px;" /> | `AMC` - `3` | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Oca_CreditCard.png" style="min-width: 40px;" /> | `OCC` - `4` | OCA | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Abitab_PhysicalNetwork.png" style="min-width: 40px;" /> | `ABT` - `5` | Abitab | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | `VSD` - `6` | Visa Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta Débito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | `VSP` - `7` | Visa Prepago | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito prepago |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/CreditosDirectos_CreditCard.png" style="min-width: 40px;" /> | `CDC` - `9` | Créditos Directos | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/RedPagos_PhysicalNetwork.png" style="min-width: 40px;" /> | `RDP` - `10` | RedPagos | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Passcard_CreditCard.png" style="min-width: 40px;" /> | `PSC` - `11` | PassCard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/12_diners.png" style="min-width: 40px;" /> | `DNC` - `12` | Diners Club | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | `MCD` - `13` | MasterCard Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta Débito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | `MCP` - `14` | MasterCard Prepago | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Lider_CreditCard.png" style="min-width: 40px;" /> | `LDC` - `15` | Líder | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/ClubDelEste_CreditCard.png" style="min-width: 40px;" /> | `CEC` - `16` | Club del Este | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Cabal_CreditCard.png" style="min-width: 40px;" /> | `CBC` - `17` | Cabal | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Anda_CreditCard.png" style="min-width: 40px;" /> | `ANC` - `20` | Anda | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Anda_CreditCard.png" style="min-width: 40px;" /> | `AND` - `92` | Anda | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de débito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Cabal_CreditCard.png" style="min-width: 40px;" /> | `CBD` - `94` | Cabal | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de débito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/ClubDelEste_CreditCard.png" style="min-width: 40px;" /> | `CED` - `95` | Club del Este | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de débito |

<!--
| | Payment MediaId | Medio de pago | Compra | Preautorización | Reembolso total | Reembolso parcial | Tipo | Flujo |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 1 | VISA | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | 2 | Mastercard |  <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" style="min-width: 40px;" /> | 3 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Oca_CreditCard.png" style="min-width: 40px;" /> | 4 | OCA | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Abitab_PhysicalNetwork.png" style="min-width: 40px;" /> | 5 | Abitab | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 6 | Visa Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta Débito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 7 | Visa Prepago | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito prepago | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/CreditosDirectos_CreditCard.png" style="min-width: 40px;" />| 9 | Créditos Directos | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/RedPagos_PhysicalNetwork.png" style="min-width: 40px;" /> | 10 | RedPagos |  <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Passcard_CreditCard.png" style="min-width: 40px;" /> | 11 | PassCard |  <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/12_diners.png" alt="Diners" style="min-width: 40px;" /> | 12 | Diners Club | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png"  style="min-width: 40px;" /> | 13 | MasterCard <br>Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta Débito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png"  style="min-width: 40px;" /> | 14 | MasterCard <br>Prepago | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Lider_CreditCard.png" style="min-width: 40px;" /> |  15 | Líder | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/ClubDelEste_CreditCard.png" style="min-width: 40px;" />  | 16 | Club del Este   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Cabal_CreditCard.png" style="min-width: 40px;" /> |  17 | Cabal | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Anda_CreditCard.png" style="min-width: 40px;" /> | 20 | Anda | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Anda_CreditCard.png" style="min-width: 40px;" /> | 92 | Anda | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de débito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Cabal_CreditCard.png" style="min-width: 40px;" /> |  94 | Cabal | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de débito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/ClubDelEste_CreditCard.png" style="min-width: 40px;" />  | 95 | Club del Este   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de débito | API |-->



### Modelo PayFac {#payfac-model}
|  | PaymentMethod PaymentMediaID | Nombre | Compra | Autorización | Reembolso total | Reembolso parcial | Tipo |
|------|----------------------------|---------|---------|--------------|-----------------|-------------------|------|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | `VSC` - `1` | VISA | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | `MCC` - `2` | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | `VSD` - `6` | Visa Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta Débito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | `VSP` - `7` | Visa Prepago | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito prepago |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/RedPagos_PhysicalNetwork.png" style="min-width: 40px;" /> | `RDP` - `10` | RedPagos | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | `MCP` - `14` | MasterCard Prepago | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Infinia_BankTransfer.png" alt="BankTransfer" style="min-width: 40px;" /> | `BTU` - `532` | Transferencias Bancarias | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Transferencia Bancaria |


<!--| | Payment MediaId | Medio de pago | Compra | Preautorización | Reembolso total | Reembolso parcial | Tipo | Flujo |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 1 | VISA | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | 2 | Mastercard |  <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 6 | Visa Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta Débito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 7 | Visa Prepago | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito prepago | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/RedPagos_PhysicalNetwork.png" style="min-width: 40px;" /> | 10 | RedPagos |  <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png"  style="min-width: 40px;" /> | 14 | MasterCard <br>Prepago | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Infinia_BankTransfer.png" alt="BankTransfer" style="min-width: 40px;" />| 532 | Transferencias Bancarias | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Transferencia Bancaria | Redirect |-->

## Monedas {#currencies}

| Código | Descripción          |
|--------|----------------------|
| USD    | Dólar estadounidense | 
| UYU    | Peso uruguayo        |

## Límites de montos {#amount-limits}

|  | Efectivo | Transferencia Bancaria |
|---|:---:|:---:|
| **Mínimo**  | UYU 1 | UYU 1 |
| **Máximo** | UYU 9.999.999.999| UYU 22.000,00<hr>USD 500,00 |

## Tipos de documentos {#document-types}
La siguiente tabla describe los tipos de documentos válidos para Uruguay:

| Código (V3 API) | Código (versión anterior API) | Nombre del documento | Abreviación |
|:-------------:|:-------------------:|----------------------|-------------|
| RUT.UY        | 1                   | RUT                  | RUT         |
| CI.UY         | 2                   | Cédula de Identidad  | CI          |
| EXT.UY        | 3                   | Extranjero            | EXT         |

## Tabla de bancos emisores {#issuer-banks-table}
La siguiente tabla muestra el listado de bancos emisores configurados.

<div id="shortTable"></div>

| IssuerBankId | Banco Emisor |
|---------|----------|
| 1 | Santander |
| 2 | BBVA |
| 3 | Itaú |
| 4 | HSBC |
| 5 | Scotiabank |
| 6 | OCA |
| 7 | VISA |
| 8 | MasterCard |
| 9 | BROU |
| 10 | Prex |
| 11 | Pronto |
| 12 | Midinero |