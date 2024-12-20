---
title: "SPEI"
linkTitle: "SPEI"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments with SPEI.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for Alternative Payment methods will remain _Pending_ until the customer completes the payment at online banking, or mobile banking app.
{{% /alert %}}

## Bank Transfer (SPEI)
**SPEI** (Sistema de Pagos Electrónicos Interbancarios) is an electronic payment system in Mexico that allows your customers to transfer funds between banks instantly. 

To use **SPEI**, customers must have access to online banking or a mobile banking app offered by their bank and then initiate a transfer by providing the CLABE (Clave Bancaria Estandarizada) number returned in the response. 

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Yes | Find the value in the table [Payment Method](/en/docs/payment-methods/mexico.html#payment-methods). |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocumentNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `Address` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `Address` → `State` | `string` | No | Customer's State. |
| `Customer` → `Address` → `City` | `string` | No | Customer's City. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information.<br>The maximum time allowed is **30** days (**43200** minutes). |

#### Request example
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/request_stp >}}
{{< /highlight >}}


### Response parameters
In the response, you will find the following parameters. You can use them to create your own confirmation page or use the coupon returned in the response:

| Property | Type | Description |
|---|:-:|---|
| `Response` → `MetadataOut` → `Clabe` | `string` | Corresponds to the _CLABE_ account number to which the funds will be sent. This number is dynamic and unique per transaction. |
| `Response` → `MetadataOut` → `Expiration` | `date` | Payment expiration date and time. |
| `Response` → `MetadataOut` → `Amount` | `numeric` | Amount to be entered by the payer when they make the payment. |
| `Response` → `MetadataOut` → `BankBeneficiaryName` | `string` | Name of the _CLABE_ account owner. |
| `Response` → `MetadataOut` → `BankConcept` | `string` | ID of the _CLABE_ account owner. |
| `Response` → `MetadataOut` → `BankReference` | `string` | ID of the _CLABE_ account owner. |
| `Response` → `MetadataOut` → `PaymentCouponUrl` | `string` | URL of the payment coupon. |

{{% alert title="Note" color="info"%}}
The _CLABE_ number in the Response belongs to _Bamboo Payment Systems_, your customer must set up a wire transfer to this number from their banking application.
{{% /alert %}}

#### Response example

{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/response_stp >}}
{{< /highlight >}}

### Payment experience for customers
Your customer must complete the payment by creating a bank transfer to the CLABE number returned in the response. Your customers must follow these steps to transfer on their banking app.

1. **Access Banking Platform**<br>
Your customer must log in to their online banking platform to initiate the one-time transfer.

2. **Select Transfer Option**<br>
Your customer must navigate to the option for making a transfer or payment. Banking platforms often label this option as _**Transferencias**_ or a similar term.

3. **Enter Recipient Details**<br>
You must inform the CLABE number in the response, and your customer must provide it in the recipient details. Remember that your customer must enter accurate information to avoid any issues with the transfer.

4. **Specify Transfer Amount**<br>
Your customer must enter the amount of the purchase. Some platforms may ask for the currency type if your customer has multiple currency accounts.

{{% alert title="Important" color="danger"%}}
The transfer must match the purchase amount. Otherwise, Bamboo will reject the transaction.
{{% /alert %}}

5. **Review and Confirm**<br>
Recall your customer to review all the entered information carefully to ensure accuracy. Your customer must check the CLABE number and the transfer amount. Also, confirm that they have sufficient funds in their account.

6. **Authorize the Transfer**<br>
If required, the online banking platform may ask your customer to authorize the transfer using a security measure such as a password, PIN, or two-factor authentication.

7. **Transaction Confirmation**<br>
Your customer should receive a confirmation message once the transfer is approved and processed. This confirmation may include a transaction reference number they can use for tracking purposes.

It’s important to note that the specific steps and options may vary slightly depending on the bank and the online banking platform your customer is using. Always refer to the guidance the customer’s bank provides and follow their security protocols to ensure a secure and successful transfer.