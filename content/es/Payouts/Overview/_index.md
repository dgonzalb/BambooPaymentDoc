---
title: "Bamboo Payouts"
date: 2023-03-28T08:28:16-05:00
type: docs
Description: >
  Bamboo Payouts es una solución confiable, escalable y automatizada que opera a través de Latinoamérica, ofreciendo a los comercios un procesamiento de alto nivel que cumple con sus necesidades.
weight: 10
---

## ¿Por qué utilizar Bamboo Payouts? {#why-use-bamboo-payouts}
La dispersión de fondos en Latinoamérica es compleja. Involucra tener conexiones con bancos en cada país y además, múltiples consideraciones legales.

El modelo actual ha sido una restricción para los negocios que no tienen operaciones locales y que quieren pagar a terceros en otros países.

Bamboo Payouts ofrece un sistema de pagos que permite transferencias masivas a terceros, utilizando el API o la consola, con actualizaciones de estados de transacciones y notificaciones a través de correo electrónico tanto para usted como para su tercero.

## ¿Cómo funciona Bamboo Payouts? {#how-do-bamboo-payouts-work}
A través de Bamboo Payouts, se puede dispersar los fondos acreditados en su cuenta a cuentas locales de beneficiarios. La siguiente imágen explica el proceso.

![Concepts](/assets/Payouts/Payouts1_es.png)

Puede configurar la tasa del Payout para que sea asumida por usted o por el beneficiario. Para más información sobre precios y activación de los servicios, [póngase en contacto con nuestros expertos locales](https://bamboopaymentsystems.com/#contact-form-principal).

## Beneficios {#benefits}
* ***Disponibilidad*** - Ofrecemos transferencias bancarias y otras transferencias alternativas, como Nequi en Colombia.
* ***Tecnología*** - Conéctese rápida y fácilmente usando nuestra API para todos los países.
* ***Fiabilidad*** - Expertos de la industria crearon nuestra solución.
* ***Cobertura*** - ¡Nuestro servicio está en 7 países y contando!
* ***Transparencia*** - Obtendrá una consola fácil de navegar con saldos disponibles en tiempo real.
* ***Flexibilidad*** - Usted o su beneficiario pueden asumir la tasa del Payout.

## Modelos de Payouts {#payout-models}
Bamboo Payouts ofrece tres modelos que suponen una combinación de moneda de origen y destino.

* **USD to Local (USD2L)**: el payout se solicita en dólares estadounidenses y el beneficiario recibe los fondos en moneda local.
* **Local to Local (L2L)**: el payout se solicita en moneda local y el beneficiario recibe los fondos en moneda local. En este modelo, el país de origen y del destinatario deben ser el mismo.
* **USD to USD (USD2USD)**: el payout se solicita en dólares estadounidenses y el beneficiario recibe los fondos en dólares estadounidenses. Actualmente, este modelo sólo está disponible en Perú.

## Cobertura {#coverage}

| País | Código ISO | Transferencia Local Bancaria | Transferencia instantánea | Billetera | USD2L | L2L | USD2USD |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Argentina  | `AR` | <img src="/assets/check_mark_64.png" width="15px"/> |  |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |
| Brasil | `BR` | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |
| Chile  | `CL` | <img src="/assets/check_mark_64.png" width="15px"/> |  |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |
| Colombia  | `CO` | <img src="/assets/check_mark_64.png" width="15px"/> |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |
| México  | `MX` | <img src="/assets/check_mark_64.png" width="15px"/> |  |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |
| Perú  | `PE` | <img src="/assets/check_mark_64.png" width="15px"/> |  |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |
| Uruguay  | `UY` | <img src="/assets/check_mark_64.png" width="15px"/> |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |

## Horarios de corte {#cut-off-schedule}
Tenga en cuenta el siguiente calendario para recibir el pago el mismo día; de lo contrario, procesaremos el pago el siguiente día hábil.

<div id="shortTable"></div>

| País | Hora máxima<sup>*</sup> | Zona horaria |
|---|---|---|
| Argentina | 10:00 am. | **GMT-3** |
| Brasil | 10:00 am. | **GMT-3** |
| Chile  | Real time. | |
| Colombia |  Real time. | |
| México  | 10:00 am. | **GMT-6** |
| Perú | 09:00 am. | **GMT-5** |
| Uruguay | 10:00 am. | **GMT-3** |

<sup>*</sup> _Hora indicada en hora local de Uruguay_.

{{% alert title="Importante" color="info"%}}
Cuando los Payouts ocurren en **T+0**, el beneficiario recibe el pago el mismo día. Sin embargo, la consola mostrará el estado como _**Pagado**_ al día siguiente. Esto se aplica a todos los países excepto Brasil y México, donde la consola mostrará el estado como _**Pagado**_ el mismo día.
{{% /alert %}}

## Consideraciones {#considerations}
Cuando utilice Payouts, tenga en cuenta los requisitos específicos del país de cada beneficiario para evitar rechazos de pagos.

### Argentina

* El CBU/CVU **no puede** exceder 22 caracteres.<br>Ejemplo: `0123456789012345678901`.

### Brasil {#brasil}

* La cuenta bancaria **no puede** exceder 15 caracteres.

| Nombre del banco | Código del banco | Formato | Ejemplo |
|---|---|---|---|
| Banco do Brasil | `001` | `DDDDDDDDD-X` o `DDDDDDDDDX` donde `D` es un dígito y `X` es un dígito (número)  o una letra `X`. <br>El número de dígitos puede cambiar pero no puede exceder diez. | `1234567890`<br>`123456789-0`<br>`123456789-X`<br>`123456789X` |
| Santander | `033` | `DDDDDDDD`, `DDDDDDDDD`, `DDDDDDDD-D`, donde `D` es un dígito.<br>El número de dígitos debe ser 8 o 9. | `12345678`<br>`12345678-9` |
| Banrisul | `041` | `DDDDDDDDD-D` o `DDDDDDDDDD` donde `D` es un dígito.<br>El número de dígitos debe ser 10. | `1234567890`<br>`123456789-0` |
| Caixa | `104` | `DDDDDDDDD-D` o `DDDDDDDDDDDDDD-D` donde `D` es un dígito.<br>El número de dígitos debe ser between 1 y 15. | `1234567890`<br>`123456789-0`<br>`12345678901234-5` |
| Bradesco | `237` | `DDDDDDD-D` o `DDDDDDDD` donde `D` es un dígito.<br>El número de dígitos puede cambiar pero no puede exceder ocho. | `12345678`<br>`1234567-8` |
| Mercado Pago | `323` | `DDDDDDDDDD-D` o `DDDDDDDDDDD` donde `D` es un dígito.<br>El número de dígitos puede cambiar pero no puede exceder 11. | `12345678910`<br>`1234567891-0` |
| Itaú | `341` | `DDDDD-D` o `DDDDDD` donde `D` es un dígito.<br>El número de dígitos puede cambiar pero no puede exceder 6. | `123456`<br>`12345-6` |
| Documento de Transferencias Bancarias Instantáneas (Llave Pix) | - | `DDDDDDDDDDD` donde `D` es un dígito.<br>El número de dígitos para **CPF** debe ser 11 y para **CNPJ** debe ser 14. | **CPF**<br>`12345678912`<br>`123.456.789-01`<br>**CNPJ**<br>`12345678901234`<br>`12.345.678/9012-34` |

* La sucursal bancaria **no puede** exceder 4 dígitos. Excepto para Banco do Brasil.

| Nombre del banco | Código del banco | Formato | Excepciones | Ejemplo |
|---|---|---|---|---|
| Banco do Brasil | `001` | `DDDD-X ` o `DDDDX` donde `D` es un dígito y `X` es un dígito (número)  o una letra `X`. <br>El número de dígitos puede cambiar pero no puede exceder cinco dígitos. | No puede tener cuatros ceros y un dígito. | `1234-1`<br>`1234-X`<br>`12341`<br>`1234X` |
| Santander | `033` | `DDDD` donde `D` es un dígito. | No puede ser `033` | `1234` |
| Banrisul | `041` | `DDDD` donde `D` es un dígito. | - | `1234` |
| Banco Inter | `077` | `DDDD` donde `D` es un dígito. | No puede ser `077` | `1234` |
| Caixa | `104` | `DDDD` donde `D` es un dígito. | No puede ser `001` / `013` / `023` / `104` | `1234` |
| Banco Original | `212` | `DDDD` donde `D` es un dígito. | No puede ser `212` | `1234` |
| Bradesco | `237` | `DDDD` donde `D` es un dígito. | No puede ser `237` | `1234` |
| Banco Nu Pagamento | `260` | `DDDD` donde `D` es un dígito. | No puede ser `260` | `1234` |
| PagSeguro | `290` | `DDDD` donde `D` es un dígito. | No puede ser `290` | `1234` |
| Itau | `341` | `DDDD` donde `D` es un dígito. | No puede ser `341` | `1234` |
| Otros | - | `DDDD` donde `D` es un dígito. | - | `1234` |

### Chile

* La cuenta bancaria **no puede** exceder 16 caracteres. Formato: `DDDDDDDDDDDDDDDD` donde `D` es un dígito.
Ejemplo: `1234567890123456`.

### Colombia

* La cuenta bancaria **no puede** exceder 17 caracteres. Formato: `DDDDDDDDDDDDDDDDD` donde `D` es un dígito.
Ejemplo: `12345678901234567`.

### México {#Mexico}

* El número CLABE **no puede** exceder 18 caracteres y se valida utilizando un algoritmo de verificación.
Ejemplo: `21790064060296600`.

### Perú {#peru}

* La cuenta bancaria **no puede** exceder 20 caracteres. Formato: `DDDDDDDDDDDDDDDDDDDD` donde `D` es un dígito.
Ejemplo: `12345678901234567890`.

### Uruguay

| Nombre del banco | Formato | Longitud | Detalles | Ejemplo |
|---|---|---|---|---|
| BROU | `YYYYYYYYYWWWWW` | 14 | <ul style="margin-bottom: initial;"><li>`Y` -> Número de cuenta.</li><li>`W` -> subcuenta.</li></ul> | `12345678901234` |
| BHU | `XXXYYZZZZV` | 10 | <ul style="margin-bottom: initial;"><li>`X` -> La sucursal bancaria inicia con 0.</li><li>`Y` -> Número de producto.</li><li>`Z` -> Número de cuenta con 0 a la izquierda.</li><li>`V` -> Dígito de verificación.</li></ul> | `0123401234` |
| Citibank | `XXXXXXXXXX` | 10 | Con 0 a la izquierda<br>El número de cuenta empieza con 0, 1 o 5. | `0123456789` |
| Itau | `XXXXXXX` | 7 | Con 0 a la izquierda. | `0123456` |
| Scotiabank | `CCCCCCCCII` | 10 | <ul style="margin-bottom: initial;"><li>`C` -> Número de cliente con 0 a la izquierda.</li><li>`I` -> ID de la cuenta.</li></ul> | `0123456789` |
| Santander | `XXXXXXXXXXXX` | 12 | El número de cuenta con 0 a la izquierda. | `012345678901` |
| Nación | `XXXXXXXXXXXX` | 12 | El número de cuenta con 0 a la izquierda. | `012345678901` |
| BBVA | `XXXXXXXXX` | 9 | Número de cuenta sin ceros a la izquierda y solo dígitos. | `123456789` |
| HSBC | `XXXXXXXXXX` | 10 | Con 0 a la izquierda. | `0123456789` |
| Heritage | `XXXXXXXYY` | 9 | <ul style="margin-bottom: initial;"><li>`X` -> Número de cuenta con 0 a la izquierda.</li><li>`Y` -> Subnúmero de cuenta.</li></ul> | `012345678` |