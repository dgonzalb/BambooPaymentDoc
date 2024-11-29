---
title: "REPORTS API"
date: 2023-03-02T11:40:29-05:00
type: docs
Description: >
  The Bamboo Payouts Report API provides detailed information about transactional data. It allows access to information on payouts made for a specific time period, selecting data columns for custom reports, and obtaining payout details, including instruction currency, country, end-user data, payment method, and more.
weight: 70
---

## URL for the Request {#request-url}
To access the Bamboo Payouts Report API, make a **GET** request to the following URLs depending on the environment:

* **Production**: `https://payout-api.prod.bamboopayment.com/api/Payout/getreport`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/Payout/getreport`
 
## Authorization {#authorization}
In the request header, the `Authorization` parameter must be configured by concatenating the word `Basic`, a space, and the **Private Key** of the merchant.

## Request Parameters {#request-parameters}
| Property           | Type      | Description                                                                                       |
|--------------------|-----------|---------------------------------------------------------------------------------------------------|
| `merchantAccount`  | `Integer` | Merchant account ID in Bamboo's production environment. Contact support@bamboopayment.com for details. |
| `from`             | `String`  | Start date for the transaction query (format: YYYY-MM-DD).                                       |
| `to`               | `String`  | End date for the transaction query (format: YYYY-MM-DD).                                         |
| `page`             | `Integer` | Page number for pagination. The value must be greater than 0.                                    |
| `pageSize`         | `Integer` | Number of records per page. The value must be greater than 0.                                    |

{{% alert title="Important" color="info"%}}
Parameters should be added to the request URL of the endpoint, followed by a `?` to indicate the beginning of the parameters.
<br> Each parameter must be separated by `&`.
{{% /alert %}}

### Request Format and Example {#format-and-example-of-the-request-request}
* **Format**: `{endpoint}?merchantAccount#&from=YYYY-MM-DD&To=YYYY-MM-DD&Page=#&PageSize=#`

* **Example**: `https://payout-api.prod.bamboopayment.com/api/Payout/getreport?merchantAccount=1234&from=2024-01-01&To=2024-01-31&Page=1&PageSize=10`

## Response Parameters {#response-parameters}

{{% alert title="Note" color="info"%}}
When querying recent data, note that the most up-to-date information available might be from the previous day (D-1). This means that the latest data available via the API could be from the day before the current date. Keep this in mind when querying recent payouts.
{{% /alert %}}

| Property                             | Type          | Description                                                                                                          |
|-------------------------------------|---------------|----------------------------------------------------------------------------------------------------------------------|
| `data`                              | `array`       | List of objects representing payout details.                                                                        |
| `data` → `payoutId`                 | `integer`     | Unique identifier for the payout.                                                                                   |
| `data` → `created`                  | `datetime`    | Date and time the payout was created in ISO 8601 format.                                                            |
| `data` → `lastUpdate`               | `datetime`    | Date and time the payout was last updated in ISO 8601 format.                                                       |
| `data` → `status`                   | `string`      | Status of the payout. Example: `Rejected`.                                                                          |
| `data` → `merchantId`               | `integer`     | Unique identifier for the associated merchant.                                                                      |
| `data` → `merchantName`             | `string`      | Name of the associated merchant.                                                                                    |
| `data` → `merchantAccountId`        | `integer`     | Unique identifier for the merchant account.                                                                         |
| `data` → `merchantAccountName`      | `string`      | Name of the merchant account.                                                                                       |
| `data` → `inputCurrency`            | `string(3)`   | ISO code of the input currency. Example: `USD`.                                                                     |
| `data` → `inputAmount`              | `decimal`     | Amount of the payout in the input currency.                                                                         |
| `data` → `exchangeRate`             | `decimal`     | Exchange rate applied to the payout.                                                                                |
| `data` → `currency`                 | `string(3)`   | ISO code of the output currency. Example: `PEN`.                                                                    |
| `data` → `amount`                   | `decimal`     | Amount of the payout in the output currency.                                                                        |
| `data` → `merchantReference`        | `string`      | Unique reference provided by the client to identify the payout.                                                     |
| `data` → `customerFirstName`        | `string`      | First name of the beneficiary.                                                                                      |
| `data` → `customerLastName`         | `string`      | Last name of the beneficiary.                                                                                       |
| `data` → `customerDocumentType`     | `string`      | Type of the beneficiary's document. Example: `CC`.                                                                  |
| `data` → `customerDocumentNumber`   | `string`      | Beneficiary's document number.                                                                                      |
| `data` → `customerEmail`            | `string`      | Beneficiary's email address. Example: `Santa.Wiegand@gmail.com`.                                                    |
| `data` → `customerPhone`            | `string`      | Beneficiary's phone number. Example: `850.622.3790 x003`.                                                           |
| `data` → `customerAddress`          | `string`      | Beneficiary's address.                                                                                              |
| `data` → `bankCode`                 | `string`      | Bank code associated with the payout. Example: `885`.                                                               |
| `data` → `bankName`                 | `string`      | Name of the bank associated with the payout.                                                                        |
| `data` → `bankType`                 | `string`      | Type of bank account. Example: `2` for savings account.                                                             |
| `data` → `bankBranch`               | `string`      | Associated bank branch.                                                                                             |
| `data` → `bankNumber`               | `string`      | Bank account number.                                                                                                |
| `data` → `bankCountry`              | `string(2)`   | ISO code of the bank's country. Example: `US`.                                                                      |
| `data` → `errorCode`                | `string`      | Error code in case of failure. Example: `902`.                                                                      |
| `data` → `errorDescription`         | `string`      | Description of the error in case of failure. Example: `Invalid bank account`.                                       |
| `data` → `paymentMethodType`        | `string`      | Type of payment method. Example: `BankTransfer`.                                                                    |
| `data` → `paymentMethod`            | `string`      | Payment method used. Example: `Payout`.                                                                             |
| `data` → `pixRandom`                | `string`      | Random key for PIX payment.                                                                                         |
| `data` → `pixPhone`                 | `string`      | Phone number for PIX payment.                                                                                       |
| `data` → `pixDocument`              | `string`      | Document associated with PIX payment.                                                                               |
| `data` → `pixEmail`                 | `string`      | Email associated with PIX payment.                                                                                  |
| `total`                             | `integer`     | Total number of records in the response.                                                                            |
| `page`                              | `integer`     | Current page in the paginated results.                                                                              |
| `pageSize`                          | `integer`     | Size of the current page in the paginated results.                                                                  |
| `errors`                            | `object`      | Details of errors, if any.                                                                                          |

### Response Example {#response-example}

{{< highlight json >}}
{{< Payouts/Reporting/reportingPayouts_response >}}
{{< /highlight >}}