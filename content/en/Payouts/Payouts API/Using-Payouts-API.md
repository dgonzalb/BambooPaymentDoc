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
| `amount` | `integer` | Yes | Amount of the Payout, the format has two digits for decimals.<br>Example _100_ => _$ 1.00_. |
| `currency` | `string(3)` | Yes | ISO code of the origin currency. This currency must match the one configured in your account.<br>[Find the currencies list here](../payouts-api/variables.html#currencies). |
| `reason` | `string` | No | Description of the Payout. |
| `destinationCurrency` | `string(3)` | Yes | ISO code of the currency in which the beneficiary will receive the payout. This parameter is not required for the _**USD2L**_ model, and the system will default to the currency of the destination country.<br>This currency must comply with your account's [payout model]({{< ref Payout-Concepts.md >}}#payout-models).<br>For example:<br><ul style="margin-bottom: initial;"><li>For _**USD2L**_, the `currency` must be _USD_, and `destinationCurrency` is optional.</li><li>For _**USD2USD**_, both `currency` and `destinationCurrency` must be _USD_.</li><li>For _**L2L**_, both must match the destination country's currency.</li></ul><br>[Find the currencies list here](../payouts-api/variables.html#currencies). |
| `reference` | `string` | Yes | Unique identifier of the Payout defined by you.<br>_Ensure it is unique_. |
| `type` | `integer` | Yes | Payout type. Assign any of these values:<br><ul style="margin-bottom: initial;"><li>`1` for Cash</li><li>`2` for Bank Transfer</li><li>`3` for Wallet</li><li>`4` for Instant Bank Transfers (Brazil)</li></ul> |
| `InstantPaymentData` → `PixDocument` | `string` | Yes<sup>1</sup> | Payee's CPF/CNPJ number registered as a PIX key.<br>_Must be 11 digits for **CPF** or 14 for **CNPJ**._ |
| `InstantPaymentData` → `PixEmail` | `string` | Yes<sup>1</sup> | Payee's email address registered as a PIX key.<br>_Must be a valid email._ |
| `InstantPaymentData` → `PixPhone` | `string` | Yes<sup>1</sup> | Payee's phone number registered as a PIX key.<br>_Must start with `+55`._ |
| `InstantPaymentData` → `PixRandom` | `string` | Yes<sup>1</sup> | Randomly generated PIX key assigned to the Payee. |
| `notification_Url` | `string` | No | Webhook to notify the Payout result. Learn more [here]({{< ref Payout-Webhook.md >}}). |
| `payee` → `FirstName` | `string` | Yes<sup>3</sup> | Payee's first name. |
| `payee` → `lastName` | `string` | Yes<sup>3</sup> | Payee's last name. |
| `payee` → `companyName` | `string` | Yes<sup>3</sup> | Payee's company name (if applicable). |
| `payee` → `email` | `string` | No | Payee's email address. |
| `payee` → `phone` | `string` | No | Payee's phone number. |
| `payee` → `nationalityCode` | `string` | No | Payee's nationality (2-digit ISO country code). |
| `payee` → `BirthDay` | `DateTime` | No | Payee's date of birth (format: `YYYY-MM-DD`). |
| `payee` → `address` | `string` | No | Payee's physical address. |
| `Location` → `City` | `string` | Yes<sup>5</sup> | Payee's city of residence. |
| `Location` → `address` | `string` | Yes<sup>5</sup> | Payee's full residential address. |
| `Location` → `zipCode` | `string` | No | Payee's postal/ZIP code. |
| `payee` → `document` → `type` | `string` | Yes | Payee's document type.<br>[See document types](../payouts-api/variables.html#document-types). |
| `payee` → `document` → `number` | `string` | Yes | Payee's document number. |
| `payee` → `bankaccount` → `number` | `string` | Yes<sup>2</sup> | Payee's account number.<br>Notes:<br><ul style="margin-bottom: initial;"><li>Argentina: CBU/CVU.</li><li>Mexico: CLABE.</li><li>Peru: CCI (banks) or phone number without `+` (wallets).</li></ul> |
| `payee` → `bankaccount` → `type` | `integer` | Yes<sup>2</sup> | Account type: `1` (Checking) or `2` (Savings). |
| `payee` → `bankaccount` → `codebank` | `string` | Yes<sup>2</sup> | Payee's bank code.<br>[Get bank list](getting-started.html#get-bank-list) or [view codes](variables.html#bank-codes). |
| `payee` → `bankaccount` → `Swift` | `string` | Yes<sup>4</sup> | International routing code (SWIFT/BIC). |
| `payee` → `bankaccount` → `Branch` | `string` | No | Bank branch code (if applicable). |
| `Remitter` → `firstName` | `string` | Yes<sup>4</sup> | Remitter's first name. |
| `Remitter` → `lastName` | `string` | Yes<sup>4</sup> | Remitter's last name. |
| `Remitter` → `companyName` | `string` | Yes<sup>4</sup> | Remitter's company name (if applicable). |
| `Remitter` → `birthday` | `DateTime` | No | Remitter's date of birth (`YYYY-MM-DD`). |
| `Remitter` → `CountryIsoCode` | `string` | No | Remitter's country of residence (2-digit ISO). |
| `Remitter` → `location` → `City` | `string` | No | Remitter's city. |
| `Remitter` → `location` → `Address` | `string` | Yes<sup>4</sup> | Remitter's physical address. |
| `Remitter` → `location` → `ZipCode` | `string` | No | Remitter's postal/ZIP code. |

<sup>1</sup> _Applies only to Brazil using Instant Bank Transfer. Otherwise, the object_ `payee.InstantPaymentData` _and its parameters must not be present in the request._<br>
<sup>2</sup> _When using Bank transfer, these parameters are mandatory for_ ***ALL*** _countries. For Instant Bank Transfer in Brazil, the object_ `payee.bankaccount` _and its parameters must not be present in the request._<br>
<sup>3</sup> _The fields `firstName` and `lastName` for an individual and `companyName` for a company are mandatory. If a payout is sent to a company, only the `companyName` field has to be completed, and if a payout is sent to an individual, only the `firstName` and `lastName` fields have to be completed.<br>
***Important:*** The `firstName` and `lastName` fields do not support numbers or special characters, only letters. The `companyName` field does accept all types of alphanumeric characters._<br>
<sup>4</sup> _These fields are mandatory for bank transfers **ONLY** to the following countries:  
   **Bosnia and Herzegovina**, **Bulgaria**, **Costa Rica**, **Dominican Republic**, **Egypt**, **Guatemala**, **Israel**, **Nicaragua**, **Norway**, **Paraguay**, and **Turkey**._<br>
<sup>5</sup> _These fields are mandatory **only** for bank transfers to **Egypt**._

### Request example
Refer to the corresponding tab according to the payee's country.

<!--tabID="countries"-->
{{< tabs tabTotal="18" tabName1="Argentina" tabName2="Brazil" tabName3="Chile" tabName4="Colombia" tabName5="Mexico" tabName6="Peru" tabName7="Uruguay" tabName8="Bosnia and Herzegovina" tabName9="Bulgaria" tabName10="Costa Rica" tabName11="Dominican Republic" tabName12="Egypt" tabName13="Guatemala" tabName14="Israel" tabName15="Nicaragua" tabName16="Norway" tabName17="Paraguay" tabName18="Turkey" >}}

{{< tab tabNum="1" >}}
<br>

**Argentina: From USD to ARS:**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/AR/request_AR_USDtoARS >}}
{{< /highlight >}}
<br>

**Argentina: From ARS to ARS:**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/AR/request_AR_ARStoARS >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

As mentioned before, the `payee.bankaccount` object should not be present in the request. Therefore, when using _Instant Bank Transfers_ it must be sent as follows:

**Brazil: From USD to BRL:**
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/BR/request_BR_USDtoBRL >}}
{{< /highlight >}}

<br>

**Brazil: From BRL to BRL**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/BR/request_BR_BRLtoBRL >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="3" >}}
<br>

**Chile: From USD to CLP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CL/request_CL_USDtoCLP >}}
{{< /highlight >}}
<br>

**Chile: From CLP to CLP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CL/request_CL_CLPtoCLP >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="4" >}}
<br>

**Colombia: From USD to COP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CO/request_CO_USDtoCOP >}}
{{< /highlight >}}
<br>

**Colombia: From COP to COP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CO/request_CO_COPtoCOP >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="5" >}}
<br>

**Mexico: From USD to MXN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/MX/request_MX_USDtoMXN >}}
{{< /highlight >}}
<br>

**Mexico: From MXN to MXN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/MX/request_MX_MXNtoMXN >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="6" >}}
<br>

**Peru: From USD to PEN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_USDtoPEN >}}
{{< /highlight >}}
<br>

**Peru: From PEN to PEN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_PENtoPEN >}}
{{< /highlight >}}
<br>

**Peru: From USD to USD**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_USDtoUSD >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="7" >}}
<br>

**Uruguay: From USD to UYU**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_USDtoUYU >}}
{{< /highlight >}}
<br>

**Uruguay: From UYU to UYU**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_UYUtoUYU >}}
{{< /highlight >}}
<br>

**Uruguay: From USD to USD**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_USDtoUSD >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="8" >}}
<br>

**Bosnia and Herzegovina: From USD to BAM**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/bosnia_herzegovina >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="9" >}}
<br>

**Bulgaria: From USD to BGN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/bulgaria >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="10" >}}
<br>

**Costa Rica: From USD to CRC**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/costarica >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="11" >}}
<br>

**Dominican Republic: From USD to DOP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/republicadominicana >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="12" >}}
<br>

**Egypt: From USD to EGP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/egipto >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="13" >}}
<br>

**Guatemala: From USD to GTQ**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/guatemala >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="14" >}}
<br>

**Israel: From USD to ILS**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/israel >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="15" >}}
<br>

**Nicaragua: From USD to NIO**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/nicaragua >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="16" >}}
<br>

**Norway: From USD to NOK**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/noruega >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="17" >}}
<br>

**Paraguay: From USD to PYG**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/paraguay >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="18" >}}
<br>

**Turkey: From USD to TRY**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/turquia >}}
{{< /highlight >}}

{{< /tab >}}

{{< /tabs >}}

{{% alert title="Info" color="info"%}}
To send a payout to a legal entity, replace the `firstName` and `lastName` fields with `companyName`.
Example: `"companyName":"Google LLC"`
{{% /alert %}}

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
The validation of the message failed (data validation error), and the Payout **is not created**.

**Response body**
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_http400 >}}
{{< /highlight >}}
<br>

It also applies when a required API field is not entered.
<br>
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_http400_2 >}}
{{< /highlight >}}

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
| `description` | `string` | The description/reason entered in the request. |

### Response example
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_getPayout >}}
{{< /highlight >}}

{{% alert title="Info" color="info"%}}
In payout for company, you will receive the field `companyName` instead of `firstName` and `lastName`.
{{% /alert %}}