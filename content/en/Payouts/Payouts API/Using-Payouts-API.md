---
title: "Payout Request"
linkTitle: "Payout Request"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  The Payouts API allows you to request multiple payments using the balance available in your account.
weight: 30
---

To learn more about Payouts, refer to this [article](../overview.html).

## Payout request
This method allows you to request one or more Payouts using the funds settled in your account.

### Request URL
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://payout-api.bamboopayment.com/api/payout`
* **stage**: `https://payout-api.stage.bamboopayment.com/api/payout`

### Request parameters
The following table shows the mandatory and optional parameters to create a Payout for all the countries.

| Field | Type | Mandatory? | Description |
|---|---|:-:|---|---|
| `country` | `string(2)` | Yes | ISO code of the country in the format `ISO 3166-2`.<br>[List of countries available for Payouts](../overview.html#coverage). |
| `amount` | `integer` | Yes | Amount of the Payout, the format has two digits for decimals.<br>Example _100_ => _$ 1,00_. |
| `currency` | `string(3)` | Yes | ISO code of the origin currency. This currency must meet the one configured in your account.<br>[Find the currencies list here](../payouts-api/variables.html#currencies). |
| `reason` | `string` | No | Description of the Payout. |
| `destinationCurrency` | `string(3)` | Yes | ISO code of the currency in which the beneficiary will receive the payout. This parameter is not required for **USD2L**_ and _**L2L**_ models, and the system will default to the currency of the destination country.<br>This currency must meet the [model]({{< ref  Payout-Concepts.md >}}#payout-models) of your account.<br>For example:<br><ul style="margin-bottom: initial;"><li>For _**USD2L**_, the `currency` parameter must be _USD_, and the `destinationCurrency` is optional.</li><li>For _**USD2USD**_, both `currency` and `destinationCurrency` must be _USD_.</li><li>For _**L2L**_, `currency` and `destinationCurrency` must be the chosen country's currency.</li></ul><br>[Find the currencies list here](../payouts-api/variables.html#currencies). |
| `reference` | `string` | Yes | Unique identifier of the Payout defined by you.<br>_It must be unique_. |
| `type` | `integer` | Yes | Payout type. Set any of the following values:<br><ul style="margin-bottom: initial;"><li>`1` for Cash</li><li>`2` for Bank Transfer</li><li>`3` for Wallet</li><li>`4` for Instant Bank Transfer in Brazil</li></ul>|
| `InstantPaymentData` → `PixDocument` | `string` | Yes<sup>1</sup> | The CPF/CNPJ number of the Payee configured as the PIX key.<br>_The number of digits for **CPF** must be 11, and **CNPJ** must be 14._ |
| `InstantPaymentData` → `PixEmail` | `string` | Yes<sup>1</sup> | The email address of the Payee configured as the PIX key.<br>_This parameter must be a valid email address._ |
| `InstantPaymentData` → `PixPhone` |`string` | Yes<sup>1</sup> | Phone number of the Payee configured as the PIX key.<br>_The phone number must start with `+55`._ |
| `InstantPaymentData` → `PixRandom` | `string` | Yes<sup>1</sup> | The random key the Payee generated as the PIX key. |
| `notification_Url` | `string` | No | Webhook to notify the result of the Payout. For more information about the configuration of this webhook, refer to this [article]({{< ref Payout-Webhook.md >}}). |
| `payee` → `FirstName` | `string` | Yes<sup>3</sup> | First Name of the Payee. | 
| `payee` → `lastName `| `string` | Yes<sup>3</sup> | Last Name of the Payee. | 
| `payee` → `companyName `| `string` | Yes<sup>3</sup> | Name of the company. |
| `payee` → `email` | `string` | No | Email address of the Payee. |  
| `payee` → `phone` | `string` | No | Phone number of the Payee. | 
| `payee` → `address` | `string` | No | Address of the Payee. | 
| `payee` → `document` → `type` | `string` | Yes | Document type of the Payee.<br>[Find the document list here](../payouts-api/variables.html#document-types). |  
| `payee` → `document` → `number` | `string` | Yes | Document number of the Payee. | 
| `payee` → `bankaccount` → `number` | `string` | Yes<sup>2</sup> | Bank account number of the Payee.<br>Take into account the following considerations:<br><ul style="margin-bottom: initial;"><li>For Argentina, set the CBU/CVU.</li><li>For Mexico, set the CLABE number.</li></ul> |
| `payee` → `bankaccount` → `type` | `integer` | Yes<sup>2</sup> |  Account type of the Payee. Set `1` for Checking and `2` for Savings. |
| `payee` → `bankaccount` → `codebank` | `string` |  Yes<sup>2</sup> | Bank code of the Payee.<br>You can get the list of banks for a given country using the [_**Get Bank list**_ method](#get-bank-list). Alternatively, [find the bank list here](../payouts-api/variables.html#bank-codes). |  

<sup>1</sup> _Applies only to Brazil using Instant Bank Transfer. Otherwise, the object_ `payee.InstantPaymentData` _and its parameters must not be present in the request._<br>
<sup>2</sup> _When using Bank transfer, these parameters are mandatory for_ ***ALL*** _countries. For Instant Bank Transfer in Brazil, the object_ `payee.bankaccount` _and its parameters must not be present in the request._<br>
<sup>3</sup> _The fields `firstName` and `lastName` for an individual and `companyName` for a company are mandatory. If a payout is sent to a company, only the `companyName` field has to be completed, and if a payout is sent to an individual, only the `firstName` and `lastName` fields have to be completed._


### Request example
Refer to the corresponding tab according to the payee's country.


{{< tabs tabTotal="7" tabID="countries" tabName1="Argentina" tabName2="Brazil" tabName3="Chile" tabName4="Colombia" tabName5="Mexico" tabName6="Peru" tabName7="Uruguay" >}}
{{< tab tabNum="1" >}}
<br>

**Argentina: USD to ARS**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/AR/request_AR_USDtoARS >}}
{{< /highlight >}}
<br>

**Argentina: ARS to ARS**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/AR/request_AR_ARStoARS >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

As mentioned before, the object `payee.bankaccount` must not be present in the request. Therefore, when using _Instant Bank Transfer_ you need to send the request as follows:

**Brazil: USD to BRL**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/BR/request_BR_USDtoBRL >}}
{{< /highlight >}}
<br>

**Brazil: BRL to BRL**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/BR/request_BR_BRLtoBRL >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="3" >}}
<br>

**Chile: USD to CLP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CL/request_CL_USDtoCLP >}}
{{< /highlight >}}
<br>

**Chile: CLP to CLP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CL/request_CL_CLPtoCLP >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="4" >}}
<br>

**Colombia: USD to COP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CO/request_CO_USDtoCOP >}}
{{< /highlight >}}
<br>

**Colombia: COP to COP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CO/request_CO_COPtoCOP >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="5" >}}
<br>

**Mexico: USD to MXN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/MX/request_MX_USDtoMXN >}}
{{< /highlight >}}
<br>

**Mexico: MXN to MXN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/MX/request_MX_MXNtoMXN >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="6" >}}
<br>

**Peru: USD to PEN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_USDtoPEN >}}
{{< /highlight >}}
<br>

**Peru: PEN to PEN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_PENtoPEN >}}
{{< /highlight >}}
<br>

**Peru: USD to USD**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_USDtoUSD >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="7" >}}
<br>

**Uruguay: USD to UYU**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_USDtoUYU >}}
{{< /highlight >}}
<br>

**Uruguay: UYU to UYU**
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_UYUtoUYU >}}
{{< /highlight >}}
<br>

**Uruguay: USD to USD**
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_USDtoUSD >}}
{{< /highlight >}}

{{< /tab >}}

{{< /tabs >}}

{{% alert title="Info" color="info"%}}
For corporate payouts, use `companyName` instead of `firstName` and `lastName`.
Example `"companyName":"Google LLC"`
{{% /alert %}}

### Responses
* `Ok`: HttpCode `200`.<br>
Message received correctly, at this point the Payout starts to be processed.

**Response body**
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_http200 >}}
{{< /highlight >}}
<br>
Where:

| Field | Description |
|---|---|
| `payoutId` | Internal identifier of the Payout. |
| `status` | Internal code of the current status of the Payout. |
| `statusDescription` | Current status of the Payout. Refer to [this article]({{< ref "Payout-Status.md" >}}) to learn more about Payout status. |
| `reference` | Unique identifier of the Payout you defined when you requested the Payout. |
| `errors` | Errors that may appear. Find the possible errors [here]({{< ref "Payout-Error-Codes.md">}}). |

* `BadRequest`: HttpCode `HttpCode 400`.<br>
The validation of the message failed, and the Payout **is not created**.

**Response body**
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_http400 >}}
{{< /highlight >}}
<br>

* `Unauthorized`: HttpCode `401`.<br>
Authorization error.

* `Conflict` - `Declined`: HttpCode `HttpCode 409`.<br>
The validation of the message was successful, but the Payout is **Declined** due to business rules.

**Response body**
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_http409 >}}
{{< /highlight >}}

## Obtaining a Payout
This method allows you to retrieve the information of a Payout. You can retrieve the Payouts using the generated identifier (ID) or the reference you provided when requesting the Payout.

#### Request URL
You must invoke a **GET** request to the following URLs according to your needs.

* **Production**: `https://payout-api.bamboopayment.com/api/payout`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/payout`

To get the payout, include the following endpoints according to your needs.

* **Using Payout ID**: `{{URL}}/api/payout/{{PayoutID}}`
* **Using Payout Reference**: `{{URL}}/api/payout/reference/{{PayoutReference}}`

### Response parameters

| Parameter | Format | Description |
|---|:-:|---|
| `payoutId` | `long` | Internal identification of the Payout. (Max. 19 characters) |
| `reference` | `string` | Unique identifier of the Payout you defined when you requested the Payout. |
| `isoCountry` | `string` | ISO code of the country in format `ISO 3166-2`. |
| `created` | `date` | Date and time when the Payout was requested. |
| `lastUpdate` | `date` | Date and time of the last update of the Payout. |
| `status` | `integer` | Internal code of the current status of the Payout. |
| `statusDescription` | `string` | Current status of the Payout. Refer to [this article]({{< ref "Payout-Status.md" >}}) to learn more about Payout status. |
| `errorCode` | `string` | Internal code of the error for the declined Payout. Find the possible errors [here]({{< ref "Payout-Error-Codes.md">}}). |
| `errorDescription` | `string` | Error description for declined Payouts. |
| `amount` | `object` | Value and currency requested in the Payout. |
| `localAmount` | `object` | Value and currency requested in the Payout in local currency. |
| `exchangeRate` | `numeric` | Conversion value used in the Payout. |
| `payee` | `object` | Information of the recipient or beneficiary of the Payout.  |


### Response example
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_getPayout >}}
{{< /highlight >}}

{{% alert title="Info" color="info"%}}
In payout for company, you will receive the field `companyName` instead of `firstName` and `lastName`.
{{% /alert %}}