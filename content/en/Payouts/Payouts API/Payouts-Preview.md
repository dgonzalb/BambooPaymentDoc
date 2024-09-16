---
title: "Payout Preview"
linkTitle: "Payout Preview"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
    The Payouts API allows you to request multiple payments using the balance available in your account.
weight: 20
---

## Payout Preview
The Payout preview method allows you to show the final value received by the payee and the expected date when the payee will receive the money.

![PrintScreen](/assets/Payouts/Payouts12_en.png)

{{% alert title="Warning" color="warning"%}}
The Preview is for informational purposes only, and it does not freeze the exchange rate, which is frozen when you [request the Payout](using-payouts-api.html).
{{% /alert %}}

### Request URL {#request-url-3}
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://payout-api.bamboopayment.com/api/payout/preview`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/payout/preview`

### Request parameters {#request-parameters-1}
The following table shows the mandatory and optional parameters for the Payout preview.

| Field | Type | Mandatory? | Description |
|---|---|:-:|---|---|
| `amount` | `number` | Yes | Amount of the Payout, the format has two digits for decimals.<br>Example _100_ => _$ 1,00_. |
| `destinationCountryIsoCode` | `string(2)` | Yes | ISO code of the country in the format `ISO 3166-2`.<br>[List of countries available for Payouts](../overview.html#coverage). |
| `destinationCurrencyIsoCode` | `string(3)` | Yes <sup>*</sup> | ISO code of the destination currency.<br>[Find the currencies list here](../payouts-api/variables.html#currencies) |
| `originalCurrencyIsoCode` | `string(3)` | Yes | ISO code of the origin currency.<br>[Find the currencies list here](../payouts-api/variables.html#currencies) |

<sup>*</sup> _If the parameter is not provided, the system will default to the currency of the destination country (parameter `destinationCountryIsoCode`)._

### Request example {#request-example-1}
{{< highlight json >}}
{{< Payouts/Api/PayoutsPreview/request >}}
{{< /highlight >}}

### Response parameters {#response-parameters-2}

| Parameter | Format | Description |
|---|:-:|---|
| `amountInOrignalCurrency` | `number` | Value requested in the Payout preview. |
| `fee` | `number` | Amount charged by Bamboo to process the Payout. You or the payee can assume the fee according to your contract. |
| `amountToBeSentInOrignalCurrency` | `number` | The amount to be sent to the Payee, which is calculated as the difference between `amountInOrignalCurrency` and `fee`. |
| `exchangeRate` | `number` | Conversion value between the origin and target currencies. This parameter includes up to `5` decimal places. |
| `amountToBeSentInLocalCurrency` | `number` | The amount received by the payee, which is calculated by multiplying `amountToBeSentInOriginalCurrency` by `exchangeRate`.|
| `errors` | `object` | Errors that may appear. The error codes for this method start with `6`.<br>Find the possible errors [here]({{< ref "Payout-Error-Codes.md">}}). |
| `errors` → `ErrorCode` | `string` | Internal code of the error. Find the possible errors [here]({{< ref "Payout-Error-Codes.md">}}). |
| `errors` → `PropertyName` | `string` | Property that triggered the error. |
| `errors` → `Message` | `string` | Error description. |
| `validUntil` | `datetime` | Indicates the time until the exchange rate will be fixed, after the indicated time the exchange rate can be changed.<br> The time shown is UTC-0.  |
| `expectedPaymentDate` | `datetime` | Indicates the estimated date of payment. |

#### Response example {#response-example-2}

{{< highlight json >}}
{{< Payouts/Api/PayoutsPreview/response >}}
{{< /highlight >}}