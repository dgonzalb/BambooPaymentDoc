---
title: "Express Payouts"
linkTitle: "Express Payouts"
date: 2023-06-30T08:16:09-05:00
type: docs
Description: >
 With _**Express Payouts**_, you can effortlessly initiate mass Payouts by simply uploading an Excel file containing your payout requests. This streamlined process allows you to send multiple payments with ease and accuracy efficiently.
weight: 30
---

To access the _**Express Payouts**_ feature, open your Merchant console and expand ***Payout***, then ***Express Payouts***.

![PrintScreen](/assets/Payouts/Payouts13_en.png)

## Benefits
* Instant Setup.
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

| Field | Mandatory? | Description |
|---|:-:|---|---|
 | **Country** | Yes | ISO code of the country in the format `ISO 3166-2`.<br>[List of countries available for Payouts](../overview.html#coverage). |
 | **Amount** | Yes | Amount of the Payout, the format has two digits for decimals.<br>Example _100_ => _USD 1,00_. |
 | **Currency** | Yes | ISO code of the selected currency.<br>_Only **USD** is available_. |
 | **Reason** | No | Description of the Payout. |
 | **Reference** | Yes | Unique identifier of the Payout defined by you.<br>_This reference should not appear more than once in the file or exist in previous Payouts._. |
 | **Type** | Yes | Transfer Payout type.<br>[List of countries available for Payouts]({{< ref Variables.md >}}#transfer-types-for-payouts). |
 | **Payee.FirstName** | Yes | First Name of the Payee. | 
 | **Payee.LastName** | Yes | Last Name of the Payee. | 
 | **Payee.Email** | No | Email address of the Payee. | 
 | **Payee.Phone** | No | Phone number of the Payee. | 
 | **Payee.Address** | No | Address of the Payee. | 
 | **Payee.Document.Type** | Yes | Document type of the Payee.<br>[Find the document list here]({{< ref Variables.md >}}#document-types). | 
 | **Payee.Document.Number** | Yes | Document number of the Payee. | 
 | **Payee.BankAccount.Number** | Yes<sup>*</sup> | Bank account number of the Payee.<br>Take into account the following considerations:<br><ul style="margin-bottom: initial;"><li>For Argentina, set the CBU/CVU.</li><li>For Mexico, set the CLABE number.</li></ul> |
 | **Payee.BankAccount.Type** | Yes<sup>*</sup> | Account type of the Payee.<br>Set `1` for Checking and `2` for Savings. |
 | **Payee.BankAccount.CodeBank** | Yes<sup>*</sup> | Bank code of the Payee. | 
 | **Payee.BankAccount.Branch** | No | Branch code of the Payee's bank. This field applies only to Brazil and is mandatory when using Bank transfer as the Payout type. | 
 | **Notification_Url** | No | Webhook to notify the result of the Payout. For more information about the configuration of this webhook, refer to this [article]({{< ref Payout-Webhook.md >}}). |

<sup>*</sup> _When using Bank transfer, these parameters are mandatory for_ ***ALL*** _countries. For Instant Bank Transfer in Brazil, the columns `Payee.BankAccount.Type`, `Payee.BankAccount.CodeBank`, and `Payee.BankAccount.Branch` must not be present in the request._

{{% alert title="Important about Express Payouts" color="warning"%}}
* Do **NOT** modify the downloaded file by adding new columns, sheets or changing the column names.
* The feature supports a maximum of **100** records per file. If you need to include more, repeat the procedure for the remaining payouts.
* If you already have the template downloaded, it is not required to download it again.
* You can save the file using any name of your choice.
{{% /alert %}}

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

Regardless if the Payout was successful or not, you can consult it in the [Payouts Report]({{< ref Reports.md>}}). Successful Payouts have _Pending_ status and failed Payouts have _Rejected_ status. 
