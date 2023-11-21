---
title: "México"
linkTitle: "México"
date: 2023-05-08T07:28:16-05:00
description: >
  Con una población de 126 millones y una penetración de internet del 50%, el comercio electrónico en _**México**_ se ha disparado en los últimos años. Se espera que continúe esta tendencia en los próximos años, con un aumento en la adopción de tecnologías financieras y la mejora de las infraestructuras de pagos electrónicos en el país.
weight: 70
tags: ["parenttopic"]
---

Esta sección muestra los medios de pago disponibles, monedas e información relacionada que se debe tener en cuenta cuando procese en _México_.

## Medios de pago {#payment-methods}

| | Payment MediaId | Medio de pago | Compra | Preautorización | Reembolso total | Reembolso parcial | Tipo | Flujo |
|-----|:---:|---|:---:|:---:|:---:|:---:|-----|-----|
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 1 | VISA | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito y débito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | 2 | MasterCard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito y débito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" style="min-width: 40px;" /> | 3 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Credit Card | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/OpenPay_PhysicalNetwork.png" style="min-width: 40px;" /> | 30 | Paynet | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Oxxo_PhysicalNetwork.png" style="min-width: 40px;" /> | 35 | Oxxo | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Efectivo | API |
| <img src="https://s3.amazonaws.com/gateway.dev.bamboopayment.com/payment-method-logos/Stp_BankTransfer.png" style="min-width: 40px;" /> | 73 | SPEI | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Transferencia Bancaria | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Visa_CreditCard.png" style="min-width: 40px;" /> | 111 | Visa | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito y débito | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/MasterCard_CreditCard.png" style="min-width: 40px;" /> | 111 | Mastercard | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito y débito | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/AmericanExpress_CreditCard.png" style="min-width: 40px;" /> | 111 | American Express | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Carnet_CreditCard.png" style="min-width: 40px;" /> | 111 | Carnet | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | <img src="/assets/x_mark_64.png" width="15px"/> | Tarjeta de crédito | Redirect |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Carnet_CreditCard.png" style="min-width: 40px;" /> | 113 | Carnet Crédito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta de crédito | API |
| <img src="https://s3.amazonaws.com/gateway.test.bamboopayment.com/payment-method-logos/Carnet_CreditCard.png" style="min-width: 40px;" /> | 114 | Carnet Débito | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | Tarjeta débito | API |

## Monedas {#currencies}

| Código | Descripción          | Modo                    |
|--------|----------------------|-------------------------|
| USD    | Dólar estadounidense | CrossBorder             |
| MXN    | Peso mexicano        | Doméstico y CrossBorder |

## Límites de montos {#amount-limits}

|  | Tarjetas | Efectivo | Transferencia Bancaria |
|---|:---:|:---:|:---:|
| **Mínimo**  | MXN 1 | MXN 1 | MXN 0,01 |
| **Máximo** | MXN 10.000 | MXN 29.999,99 | - |

{{% alert title="Nota" color="info"%}}
El monto máximo para pagos en efectivo depende de las oficinas de pago.
* Para _7Eleven_ y _Farmacias del Ahorro_ es MXN 5.000,00.
* Para _Farmacias Benavides_, _Walmart Express_, _Circle K_ y _OXXO_ es MXN 10.000,00.

{{% /alert %}}