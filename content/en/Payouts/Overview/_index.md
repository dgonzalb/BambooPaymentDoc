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

* **USD to Local (USD2L)**: the payout is requested in US Dollars and the payee receives the funds in local currency.
* **Local to Local (L2L)**: the payout is requested in local currency and the payee receives the funds in local currency. In this model, the country of origin and recipient must be the same.
* **USD to USD (USD2USD)**: the payout is requested in US Dollars and the payee receives the funds in US Dollars. Currently, this model is only available in Peru.

## Coverage

| Country | ISO Code | Local Bank Transfer | Instant Transfer | Wallet | USD2L | L2L | USD2USD |
|---|:-:|:-:|:-:|:-:|:-:|:-:|:-:|
| Argentina  | `AR` | <img src="/assets/check_mark_64.png" width="15px"/> |  |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |
| Brazil | `BR` | | <img src="/assets/check_mark_64.png" width="15px"/> |   | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |
| Chile  | `CL` | <img src="/assets/check_mark_64.png" width="15px"/> |  |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |
| Colombia  | `CO` | <img src="/assets/check_mark_64.png" width="15px"/> |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |
| Mexico  | `MX` | <img src="/assets/check_mark_64.png" width="15px"/> |  |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |
| Peru  | `PE` | <img src="/assets/check_mark_64.png" width="15px"/> |  |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |
| Uruguay  | `UY` | <img src="/assets/check_mark_64.png" width="15px"/> |  |  | <img src="/assets/check_mark_64.png" width="15px"/> | <img src="/assets/check_mark_64.png" width="15px"/> |  |

## Cut-off Schedule
Please consider the following schedule to receive the Payout on the same day; otherwise, we will process the Payout on the next business day.

<div id="shortTable"></div>

<table>
<thead>
  <tr>
    <th style="text-align: center;">Country</th>
    <th style="text-align: center;">Maximum time<sup>*</sup></th>
    <th style="text-align: center;">Time zone</th>
  </tr>
</thead>
<tbody>
  <tr>
    <td style="border-right: 1px solid #dae0eb;">Uruguay</td>
    <td rowspan="2" style="text-align: center;vertical-align: middle;">10:00 am.</td>
    <td rowspan="2" style="text-align: center;vertical-align: middle;">GMT-3</td>
  </tr>
  <tr>
    <td style="border-right: 1px solid #dae0eb;">Peru</td>
    <td style="text-align: center;">09:00 am.</td>
    <td style="text-align: center;">GMT-5</td>
  </tr>
  <tr>
    <td style="border-right: 1px solid #dae0eb;">Argentina</td>
    <td colspan="2" rowspan="4" style="text-align: center;vertical-align: middle;border-radius: 0 0 10px 0;border-right: 1px solid #dae0eb;border-bottom: 1px solid #dae0eb;">24/7 Real time.</td>
  </tr>
    <tr>
    <td>Brazil</td>
  </tr>
  <tr>
    <td>Chile</td>
  </tr>
  <tr>
    <td>Colombia</td>
  </tr>
  <tr>
    <td style="border-radius: 0 0 0 10px;">Mexico</td>
  </tr>
</tbody>
</table>

<sup>*</sup> _Time displayed in local time in Uruguay_.

{{% alert title="Important" color="info"%}}
* When payouts occur on **T+0**, the payee receives the payment on the same day. However, the console will display the status as _**Paid**_ the following day.
* In Mexico, payouts are processed in real-time, but final confirmation and notifications occur 5 minutes later.
{{% /alert %}}

## Considerations
When using the Payouts feature, consider the specific requirements for each payee's country to avoid payment rejections.

### Argentina

* The CBU/CVU **cannot** exceed 22 characters.<br>Example: `0123456789012345678901`.

### Brazil

* The Pix Key must follow the following specifications:

  - When the Pix Key is the document, the number of digits for **CPF** must be 11, and **CNPJ** must be 14. Example:<br>**CPF**: `123.456.789-01` → `12345678901`<br>**CNPJ**: `12.345.678/9012-34` → `12345678901234`.
  - When the Pix Key is the email, it must be a valid email address.
  - When the Pix Key is the phone, the phone number must start with `+55`. Example: `+5521982485500`.
  - When the Pix Key is a random number, the key must be a randomly generated UUID. Example: `123e4567-e89b-12d3-a456-426655440000`.

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