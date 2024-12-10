---
title: "Card Validation"
linkTitle: "Card Validation"
date: 2024-12-06T08:43:44-05:00
Description: >
  The Card Validation endpoint allows merchants to verify the validity of cards across various acquirers in Latin America, using either Zero Auth operations or simulated minimal-amount purchases followed by automatic refunds.
weight: 20
tags: ["subtopic"]
---

## Request URL
Send a **POST** request to the following URLs according to your needs:

* **Production**: `https://secure-api.bamboopayment.com/v3/api/card/validate`
* **Testing**: `https://secure-api.stage.bamboopayment.com/v3/api/card/validate`

<br />

> Remember to include your **merchant's Private Key** in the request headers. <br /> For more details, check our [Authentication Guide]({{< ref "Authentication.md" >}}).

## Request Parameters {#request-parameters}
The request consists of two main objects: `CardData` containing the card information and `Customer` with the cardholder's details.

### CardData Object

| Parameter | Type | Mandatory | Description |
|---|---|:---:|---|
| `CardHolderName` | `string` | Yes | Full name as it appears on the card |
| `Pan` | `string` | Yes | Card number without spaces or separators |
| `CVV` | `string` | Yes | Card security code (3-4 digits) |
| `Expiration` | `string` | Yes | Card expiration date in format MM/YY |
| `Email` | `string` | Yes | Cardholder's email address |
| `Document` | `string` | Yes* | Cardholder's document number (*Required for some countries) |
| `TargetCountryISO` | `string` | Yes | Two-letter ISO country code where the card will be processed. Send the country using `ISO-3166-1` format.|

### Customer Object

{{% alert title="Country-specific Requirements" color="warning"%}}
For Argentina and Brazil, Customer and Address fields are mandatory. These markets require complete customer information for card validation.
{{% /alert %}}

| Parameter | Type | Required | Description |
|---|---|:---:|---|
| `FirstName` | `string` | No¹ | Customer's first name |
| `LastName` | `string` | No¹ | Customer's last name |
| `Email` | `string` | No¹ | Customer's email address |
| `DocumentNumber` | `string` | No¹ | Customer's identification number. Use CPF for Brazil or DNI for Argentina |
| `DocumentType` | `string` | No¹ | Type of document. Use "CPF.BR" for Brazil or "DNI.AR" for Argentina |
| `Address` | `object` | No¹ | Customer's address information |

¹ It should be required for Argentina and Brazil.

#### Address Object

| Parameter | Type | Required | Description |
|---|---|:---:|---|
| `Country` | `string` | No¹ | Two-letter ISO country code (BR or AR) |
| `State` | `string` | No¹ | State or province code (e.g., "SP" for São Paulo, "BA" for Buenos Aires) |
| `City` | `string` | No¹ | City name |
| `PostalCode` | `string` | No | Postal or ZIP code |
| `AddressDetail` | `string` | Yes¹ | Street address with number |

¹ It should be required for Argentina and Brazil.

### Request example

{{< highlight json >}}
{{< Payins/V3/CardValidation/CardValidation >}}
{{< /highlight >}} 


## Response Parameters {#response-parameters}
The response includes information about the validation result and details about the payment method.

| Parameter | Type | Description |
|---|---|---|
| `Status` | `string` | Result of the validation. Possible values are `APPROVED`, `REJECTED` |
| `ErrorCode` | `string` | Error code if the validation was rejected. `null` if approved |
| `ErrorDescription` | `string` | Detailed description of the error if the validation was rejected. `null` if approved |
| `PaymentMethod` | `object` | Information about the validated card |

### PaymentMethod Object

| Parameter | Type | Description |
|---|---|---|
| `Brand` | `string` | Card brand (e.g., "MasterCard", "Visa") |
| `IssuerBank` | `string` | Name of the bank that issued the card |
| `Type` | `string` | Type of card (e.g., "CreditCard", "DebitCard") |

## Response Example {#response-example}

{{< highlight json >}}
{{< Payins/V3/CardValidation/CardValidationResponse >}}
{{< /highlight >}} 

## Status Values {#status-values}
The validation can return the following status values:

| Status | Description |
|---|---|
| `APPROVED` | Card successfully validated |
| `REJECTED` | Card validation failed. Check `ErrorCode` and `ErrorDescription` for details |

When the status is `REJECTED`, the `ErrorCode` and `ErrorDescription` fields will provide specific information about why the validation failed. For more information about error codes, check our [Error Guide]({{< ref "Error-Codes.md" >}}).

{{% alert title="Important" color="warning"%}}
An small amount may be temporarily held on the card and automatically refunded. This amount varies by acquirer but is typically less than $1 USD.
{{% /alert %}}