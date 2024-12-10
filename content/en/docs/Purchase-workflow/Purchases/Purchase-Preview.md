---
title: "Purchase Preview"
linkTitle: "Purchase Preview"
date: 2023-03-02T11:40:29-05:00
Description: >
  This functionality allows merchants to show the values that may affect the final amount of a purchase transaction.
weight: 50
tags: ["subtopic"]
---

When a buyer performs a purchase, the amount of it can be modified for several reasons:

* Currency conversion (USD to local currency of the destination country)
* Commissions to be paid by the customer
* Taxes
* etc.

For example, in Argentina there are different taxes that affect the final amount and, as a consequence, the merchant cannot show the real amount that will be charged until the purchase is completed.

As a solution, we created a tool that allows the merchant to preview the amount that the customer will be charged so that they can inform it prior to executing the purchase.

The following example shows the way suggested to the merchants to display the preview in Argentina.

![PrintScreen](/assets/PurchasePreview_en_1.png)

## Request
To use the purchase preview, you must point to the following endpoint:

`GET https://api.stage.bamboopayment.com/v1/api/purchase/preview`

<br />

> Remember to include your **merchant's Private Key** in the request headers. <br /> For more details, check our [Authentication Guide]({{< ref "Authentication.md" >}}).

### Example of the request

{{< highlight json >}}
{{< Payins/V3/CardOperations/purchasePreview_request >}}
{{< /highlight >}} 

<br>
Where:

| Parameter | Type | Mandatory? | Description |
|---|---|---|---|
| `baseAmount` | `integer` | Yes | Amount to be paid before taxes. |
| `currency` | `string` | Yes | Currency of the amount defined in `baseAmount`. |
| `countryIso` | `string` | Yes | Country in ISO 3166-2 format. |
| `paymentMediaId` | `string` | No | Payment Method identifier. This identifier can be obtained by consulting the [Payment Methods](/en/docs/payment-methods.html) by country section in the documentation. |
| `customer` | `Object` | No<sup>*</sup> | Payer Information.<br><sup>*</sup>_Required for Argentina_. |
| `customer.documentTypeId` | `string` | No | Payer Document Type. |
| `customer.docNumber` | `string` | No | Payer document number. |
| `customer.state` | `string` | No<sup>*</sup> | Payer state.<br><sup>*</sup>_For Argentina, this field is mandatory and you must include the corresponding value using the table displayed in [this section](/en/docs/payment-methods/argentina.html#argentina-provinces)_. |
| `customer.postalCode` | `string` | No | Payer Zip Code. |

## Response
Next, we show an example of the response to the request shown previously.

### Example response
{{< highlight json >}}
{{< Payins/V3/CardOperations/purchasePreview_response >}}
{{< /highlight >}} 


<br>

The parameters in the response are the following:

| Parameter | Type | Description |
|---|:---:|---|
| `Success` | `boolean` | Determines if the result of the operation was successful. |
| `Data.Date` | `date` | Date the process was executed. |
| `Data.Currency` | `string` | ISO code of the merchant's currency. That is, the destination currency in the conversion. |
| `Data.ExchangeRate.value` | `number` | Amount that the origin currency is equivalent to in the destination currency. |
| `Data.ExchangeRate.FromCurrencyIsoCode` | `string` | ISO code of the origin currency. |
| `Data.ExchangeRate.ToCurrencyIsoCode` | `string` | ISO code of the destination currency. |
| `Data.ExchangeRate.TypeCode` | `string` | Not used. |
| `Data.ExchangeRate.Date` | `date` | Date of the last update of the conversion rate. |
| `Data.TotalAmount` | `number` | Total final amount of the purchase in local currency after applying the values that affect it (taxes, conversions, etc.). |
| `Data.TaxDetails` | `object` | Contains the detail of the taxes that apply to the transaction. |
| `Data.AmountDetails` | `object` | Contains the detail of the transaction subtotals. |

### Object _TaxDetails_
Next, we explain the sub-parameters of the `TaxDetails` object.

| Parameter | Type | Description |
|---|:---:|---|
| `TaxCode` | `string` | Tax code defined by Bamboo Payment. |
| `TaxName` | `string` | Name of the tax that is applied. |
| `TaxAmount` | `number` | Total value of the tax. |
| `TaxPercentage` | `number` | Percentage corresponding to the tax. |
| `ResponsibleType` | `string` | Indicates whether the party responsible for the tax is the merchant (Merchant) or the payer (Buyer). |

{{% alert title="Note" color="info"%}}
In the example of the request, two taxes are specified for Argentina: **VAT** corresponding to the VAT of Digital Services and **II.BB** corresponding to the Gross Income tax.
{{% /alert %}}

### Object _AmountDetails_
Next, we explain the sub-parameters of the `AmountDetails` object.

| Parameter | Type | Description |
|---|:---:|---|
| `CurrencyCode` | `string` | ISO code of the currency of the amount. |
| `AmountCategoryCode` | `string` | Amount category. |
| `Amount` | `number` | Value of the amount. |
| `Sign` | `string` | Indicates if the amount is a debit or credit movement. |
| `ResponsibleType` | `string` | Indicates whether the party responsible for the tax is the merchant (Merchant) or the payer (Buyer). |