---
title: "Express Payouts"
linkTitle: "Express Payouts"
date: 2023-06-30T08:16:09-05:00
type: docs
Description: >
 With _**Express Payouts**_, you can effortlessly generate mass Payouts by simply uploading an Excel file containing your payout requests without API integration. This streamlined process allows you to send multiple payments with ease and accuracy efficiently.
weight: 20
---

To access the _**Express Payouts**_ feature, open your Merchant console and expand ***Payout***, then ***Express Payouts***.

![PrintScreen](/assets/Payouts/Payouts13_en.png)

## Benefits
* Instant Setup without API integration.
* Speedy and Flexible using batch upload.
* Centralize your Payouts with minimum effort.

## How to use Express Payouts?
_**Express Payouts**_ has an easy-to-follow step sequence that allows you to create one or more payouts simultaneously. Once you complete a step, the sequence activates the next to avoid errors.

Next, we describe each step and provide you with instructions.

### 1. Download the template {#step1}
The first step is downloading the _Express Payouts template_. This Excel file has all the information related to a payout and provides examples of how to fill it.

Click the _**Download template**_ button to get the Excel file.

![PrintScreen](/assets/Payouts/Payouts14_en.png)

Once you have the Excel file, you can fill it with the information of the Payouts. Each row represents a new Payout request and has the following columns.

![PrintScreen](/assets/Payouts/Payouts15_en.png)

| Field | Required? | Description |
|-------|:---------:|-------------|
| **Country** | Yes | Country code in `ISO 3166-2` format. [List of available countries](../overview.html#coverage). |
| **Amount** | Yes | Amount with two decimals. Example: `100` = $1.00. |
| **Currency** | Yes | Origin currency ISO code. [Currency list](../payouts-api/variables.html#currencies). |
| **destinationCurrency** | Yes | Destination currency according to account model (USD2L, USD2USD, L2L). |
| **Reason** | No | Payout description. |
| **Reference** | Yes | Unique ID (cannot be duplicated in history). |
| **Type** | Yes | [Transfer type]({{< ref Variables.md >}}#transfer-types-for-payouts). |
| **Payee.FirstName** | Yes<sup>2</sup> | Beneficiary first name. |
| **Payee.LastName** | Yes<sup>2</sup> | Beneficiary last name. |
| **Payee.CompanyName** | Yes<sup>2</sup> | Company name (if applicable). |
| **Payee.Email** | No | Beneficiary email. |
| **Payee.Phone** | No | Beneficiary phone number. |
| **Payee.Birthday** | No | Date of birth (YYYY-MM-DD). |
| **Payee.Nationality** | No | Nationality (2-digit ISO code). |
| **Payee.Address** | Yes<sup>4</sup> | Beneficiary address. |
| **Payee.City** | Yes<sup>4</sup> | City of residence. |
| **Payee.ZipCode** | No | Postal code. |
| **Payee.Document.Type** | Yes | [Document type]({{< ref Variables.md >}}#document-types). |
| **Payee.Document.Number** | Yes | Document number. |
| **Payee.BankAccount.Number** | Yes<sup>1</sup> | CBU/CVU (AR), CLABE (MX), etc. |
| **Payee.BankAccount.Swift** | Yes<sup>3</sup> | SWIFT code (international). |
| **Payee.BankAccount.Type** | Yes<sup>1</sup> | `1`=Checking, `2`=Savings. |
| **Payee.BankAccount.CodeBank** | Yes<sup>1</sup> | Bank code. |
| **Payee.BankAccount.Branch** | No | Branch code (required for BR in transfers). |
| **Remitter.FirstName** | Yes<sup>3</sup> | Remitter first name. |
| **Remitter.LastName** | Yes<sup>3</sup> | Remitter last name. |
| **Remitter.CompanyName** | Yes<sup>3</sup> | Remitter company name. |
| **Remitter.Birthday** | No | Remitter date of birth. |
| **Remitter.Country** | No | Remitter country of residence. |
| **Remitter.Address** | Yes<sup>3</sup> | Remitter address. |
| **Remitter.ZipCode** | No | Remitter postal code. |
| **Remitter.City** | No | Remitter city. |
| **Notification_Url** | No | Webhook for notifications. |

<sup>1</sup> _Required for Bank Transfers in **ALL** countries. For Instant Bank Transfers in Brazil, the fields `Payee.BankAccount.Type`, `Payee.BankAccount.CodeBank` and `Payee.BankAccount.Branch` must not be included in the request._
<br>
<sup>2</sup> _Fields `firstName` and `lastName` are mandatory for individuals and `companyName` for legal entities (companies). For company payouts only `companyName` is required, while for individual payouts only `firstName` and `lastName` are required._
<br>
<sup>3</sup> _These fields are required **only** for bank transfers to the following countries: Bosnia and Herzegovina, Bulgaria, Costa Rica, Dominican Republic, Egypt, Guatemala, Israel, Nicaragua, Norway, Paraguay, and Turkey._
<br>
<sup>4</sup> _These fields are required **only** for bank transfers to Egypt._

{{% alert title="Important about Express Payouts" color="warning"%}}
* Do **NOT** modify the downloaded file by adding new columns, sheets or changing the column names.
* The feature supports a maximum of **100** records per file. If you need to include more, repeat the procedure for the remaining payouts.
* If you already have the template downloaded, it is not required to download it again.
* You can save the file using any name of your choice.
* When using PIX, you need to configure the PIX key of the payee as explained in the [Additional fields for PIX](#additional-columns-for-pix) section.
{{% /alert %}}

#### Additional columns for PIX
When configuring PIX as the transfer payout type (column **Type** set as `4`), you must include an additional column depending on the payee's PIX key. You can configure any of the following columns, setting them next to the **Notification_Url**, namely the **U** column in the Excel file:

* `PixDocument`: add this column to configure the CPF/CNPJ number of the payee. The number of digits for **CPF** must be 11, and **CNPJ** must be 14.
* `PixEmail`: add this column to configure the email address of the payee.
* `PixPhone`: add this column to configure the phone number of the payee. The number must start with `+55`, and the cell must be configured with text format to allow the use of the plus sign. 
* `PixRandom`: add this column to configure the random key the payee generates.

You must add one column per different key in your payouts. For example, if you have five payees, one uses an email address, one uses the phone number, two use the CPF/CNPJ number, and one uses the random key, you need to include the columns as follows:

![PrintScreen](/assets/Payouts/Payouts23_en.png)

Do not include a column if it doesn't have a value.

### 2. Select the account {#step2}
The second step involves choosing the account that will debit the Payout amounts. Ensure that the selected account has a sufficient balance to process all payouts.

Open the _**Select the account**_ dropdown list and select the account you want to use.

![PrintScreen](/assets/Payouts/Payouts16_en.png)

### 3. Upload the template {#step3}
Once you select the account in [step 2](#step2), the process activates this step. Click the _**Upload template**_ button to upload the file created in [step 1](#step1).

![PrintScreen](/assets/Payouts/Payouts17_en.png)

### 4. Upload results {#step4}
If all the Payouts are correct and there were no errors in the file, the system prompts you with the number of Payouts created.

![PrintScreen](/assets/Payouts/Payouts18_en.png)

Otherwise, the _**Express Payouts**_  feature informs the number of successful and failed Payouts. You can consult the error of the failed Payouts in the Excel file we generate using the available link.

![PrintScreen](/assets/Payouts/Payouts19_en.png)

Refer to the last column in the file to know the Payout error.

![PrintScreen](/assets/Payouts/Payouts20_en.png)

After fixing the error, save the file and upload it using the option in [step 3](#step3).

Regardless if the Payout was successful or not, you can consult it in the [Payouts Report]({{< ref Reports.md>}}). Successful Payouts have _Pending_ status and failed Payouts have _Declined_ status.