---
title: "Bamboo Payouts"
date: 2023-03-28T08:28:16-05:00
type: docs
Description: >
  Bamboo Payouts is a reliable, scalable, and automated solution that operates across LATAM, producing high-standard processing for merchants that attend to their necessities.
weight: 10
---

## Why use Bamboo Payouts?
Dispersing funds to third parties in Latin American markets is complex. It involves having connections with banks in each country and several legal considerations.

The current model has been a restriction for businesses that do not have local operations and want to pay third parties from other countries.

Bamboo Payouts offers you a payment system to allow mass transfers to third parties, using API or the dashboard, with updates on the status of transactions and notifications via e-mail to you and your third parties.

## How do Bamboo Payouts work?
Using Bamboo Payouts, you can efficiently disburse the funds settled in your account to local beneficiary accounts. The following image briefly explains the process.

![Concepts](/assets/Payouts/Payouts1_en.png)

You can configure the Payout fee to be assumed by you or the payee. For more information about pricing and activation of the services, [contact our local experts](https://bamboopaymentsystems.com/#contact-form-principal).

## Benefits
* ***Availability*** - We offer Bank Transfers and other alternative transfers, such as Nequi in Colombia.
* ***Technology*** - Connect fast and easily using our API for all countries.
* ***Reliability*** - Industry experts created our solution.
* ***Coverage*** - Our service is in 7 countries and counting!
* ***Transparency*** - You get an easy-to-navigate Merchant panel with balances available in real time!
* ***Flexibility*** - You or your payee can assume the payout fee.

## Payout models
Bamboo Payouts offers three models that means a combination of origin and destination currency.

* **USD to Local (USD2L)**: the payout is requested in local currency and the payee receives the funds in local currency.
* **Local to Local (L2L)**: the payout is requested in local currency and the payee receives the funds in US Dollars.
* **USD to USD (USD2USD)**: the payout is requested in US Dollars and the payee receives the funds in US Dollars. Currently, this model is only available in Peru.

## Coverage

| Country | ISO Code | Local Bank Transfer | Cash | Instant Transfer | Wallet | USD2L | L2L | USD2USD |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Argentina  | `AR` | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |   |   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | |
| Brazil | `BR` | <img src="/assets/check_mark_64.png" width="15px"/> |   | <img src="/assets/check_mark_64.png" width="15px"/> |   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | |
| Chile  | `CL` | <img src="/assets/check_mark_64.png" width="15px"/> |   |   |   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | |
| Colombia  | `CO` | <img src="/assets/check_mark_64.png" width="15px"/> |   |   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | |
| Mexico  | `MX` | <img src="/assets/check_mark_64.png" width="15px"/> |   |   |   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | |
| Peru  | `PE` | <img src="/assets/check_mark_64.png" width="15px"/> |   |   |   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/>  |
| Uruguay  | `UY` | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | |

## Cut-off Schedule
Please consider the following schedule to receive the Payout on the same day; otherwise, we will process the Payout on the next business day.

<div id="shortTable"></div>

| Country | Maximum time<sup>*</sup> | Time zone |
|---|---|---|
| Argentina | 10:00 am. | **GMT-3** |
| Brazil | 10:00 am. | **GMT-3** |
| Chile  | Real time. | |
| Colombia | Real time. | |
| Mexico  | 10:00 am. | **GMT-6** |
| Peru | 09:00 am. | **GMT-5** |
| Uruguay | 10:00 am. | **GMT-3** |

<sup>*</sup> _Time displayed in local time in Uruguay_.

{{% alert title="Important" color="info"%}}
When payouts occur on **T+0**, the payee receives the payment on the same day. However, the console will display the status as _**Paid**_ the following day. This applies to all countries except Brazil and Mexico, where the console will display the status as _**Paid**_ on the same day.
{{% /alert %}}

## Considerations
When using the Payouts feature, consider the specific requirements for each payee's country to avoid payment rejections.

### Argentina

* The CBU/CVU **cannot** exceed 22 characters.<br>Example: `0123456789012345678901`.

### Brazil

* The bank account **cannot** exceed 15 characters.

| Bank name | Bank code | Format | Example |
|---|---|---|---|
| Banco do Brasil | `001` | `DDDDDDDDD-X` or `DDDDDDDDDX` where `D` is a digit and `X` is a digit (number) or the letter `X`. <br>The number of digits may change, but it cannot exceed ten. | `1234567890`<br>`123456789-0`<br>`123456789-X`<br>`123456789X` |
| Santander | `033` | `DDDDDDDD`, `DDDDDDDDD`, `DDDDDDDD-D`, where `D` is a digit.<br>The number of digits must be 8 or 9. | `12345678`<br>`12345678-9` |
| Banrisul | `041` | `DDDDDDDDD-D` or `DDDDDDDDDD` where `D` is a digit.<br>The number of digits must be 10. | `1234567890`<br>`123456789-0` |
| Caixa | `104` | `DDDDDDDDD-D` or `DDDDDDDDDDDDDD-D` where `D` is a digit.<br>The number of digits must be between 1 and 15. | `1234567890`<br>`123456789-0`<br>`12345678901234-5` |
| Bradesco | `237` | `DDDDDDD-D` or `DDDDDDDD` where `D` is a digit.<br>The number of digits may change but cannot exceed eight. | `12345678`<br>`1234567-8` |
| Mercado Pago | `323` | `DDDDDDDDDD-D` or `DDDDDDDDDDD` where `D` is a digit.<br>The number of digits may change but cannot exceed 11. | `12345678910`<br>`1234567891-0` |
| Itaú | `341` | `DDDDD-D` or `DDDDDD` where `D` is a digit.<br>The number of digits may change but cannot exceed 6. | `123456`<br>`12345-6` |
| Instant Bank Transfer (Pix Key) Document | - | `DDDDDDDDDDD` where `D` is a digit.<br>The number of digits for **CPF** must be 11, and **CNPJ** must be 14. | **CPF**<br>`12345678912`<br>`123.456.789-01`<br>**CNPJ**<br>`12345678901234`<br>`12.345.678/9012-34` |

* The bank branch **cannot** exceed 4 digits. Except for Banco do Brasil.

| Bank name | Bank code | Format | Exceptions | Example |
|---|---|---|---|---|
| Banco do Brasil | `001` | `DDDD-X ` or `DDDDX` where `D` is a digit and `X` is a digit (number) or the letter `X`. <br>The number of digits may change, but cannot exceed five digits. | Can't have four zeros and a digit. | `1234-1`<br>`1234-X`<br>`12341`<br>`1234X` |
| Santander | `033` | `DDDD` where `D` is a digit. | Cannot be `033` | `1234` |
| Banrisul | `041` | `DDDD` where `D` is a digit. | - | `1234` |
| Banco Inter | `077` | `DDDD` where `D` is a digit. | Cannot be `077` | `1234` |
| Caixa | `104` | `DDDD` where `D` is a digit. | Cannot be `001` / `013` / `023` / `104` | `1234` |
| Banco Original | `212` | `DDDD` where `D` is a digit. | Cannot be `212` | `1234` |
| Bradesco | `237` | `DDDD` where `D` is a digit. | Cannot be `237` | `1234` |
| Banco Nu Pagamento | `260` | `DDDD` where `D` is a digit. | Cannot be `260` | `1234` |
| PagSeguro | `290` | `DDDD` where `D` is a digit. | Cannot be `290` | `1234` |
| Itau | `341` | `DDDD` where `D` is a digit. | Cannot be `341` | `1234` |
| Others | - | `DDDD` where `D` is a digit. | - | `1234` |

### Chile

* The bank account **cannot** exceed 16 characters. Format: `DDDDDDDDDDDDDDDD` where `D` is a digit.
Example: `1234567890123456`.

### Colombia

* The bank account **cannot** exceed 17 characters. Format: `DDDDDDDDDDDDDDDDD` where `D` is a digit.
Example: `12345678901234567`.

### Mexico

* The CLABE number **cannot** exceed 18 characters and is validated using a verification algorithm.
Example: `21790064060296600`.

### Peru

* The bank account **cannot** exceed 20 characters. Format: `DDDDDDDDDDDDDDDDDDDD` where `D` is a digit.
Example: `12345678901234567890`.

### Uruguay

| Bank name | Format | Length | Details | Example |
|---|---|---|---|---|
| BROU | `YYYYYYYYYWWWWW` | 14 | <ul style="margin-bottom: initial;"><li>`Y` -> Account number.</li><li>`W` -> sub-account.</li></ul> | `12345678901234` |
| BHU | `XXXYYZZZZV` | 10 | <ul style="margin-bottom: initial;"><li>`X` -> Bank branch starts with 0.</li><li>`Y` -> Product number.</li><li>`Z` -> Account number filled with 0 on the left.</li><li>`V` -> Verifying Digit.</li></ul> | `0123401234` |
| Citibank | `XXXXXXXXXX` | 10 | Filled with 0 on the left.<br>The account number starts with 0, 1, or 5. | `0123456789` |
| Itau | `XXXXXXX` | 7 | Filled with 0 on the left. | `0123456` |
| Scotiabank | `CCCCCCCCII` | 10 | <ul style="margin-bottom: initial;"><li>`C` -> Client number filled with 0 on the left.</li><li>`I` -> Account ID.</li></ul> | `0123456789` |
| Santander | `XXXXXXXXXXXX` | 12 | The account number filled with 0 on the left. | `012345678901` |
| Nación | `XXXXXXXXXXXX` | 12 | The account number filled with 0 on the left. | `012345678901` |
| BBVA | `XXXXXXXXX` | 9 | Account number without filling with 0 on the left only numeric digits. | `123456789` |
| HSBC | `XXXXXXXXXX` | 10 | Filled with 0 to the left. | `0123456789` |
| Heritage | `XXXXXXXYY` | 9 | <ul style="margin-bottom: initial;"><li>`X` -> Account number filled with 0 on the left.</li><li>`Y` -> Sub Account number.</li></ul> | `012345678` 