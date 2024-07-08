---
title: "Alternative Payment Methods"
linkTitle: "Alternative Payment Methods"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments in physical payment branches or using Bank transfers.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
The purchase status for Alternative Payment methods will remain _Pending_ until the customer completes the payment at a physical payment office, online banking, or mobile banking app.
{{% /alert %}}


## OXXOPay
**OXXO**, the largest chain of convenience stores in Mexico, offers a service that allows customers to pay for their purchases. Customers need to provide a payment reference at the store and can make payments using cash or cards. Once payment is made, you will receive instant confirmation of the purchase.

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**90**_. |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | Yes | Customer's last name. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | Yes | Customer's phone number. Including the Indicative for Mexico `+52` |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | Yes | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |


#### Request example
```json
{
	"PaymentMediaId": 90,
	"Amount": 100,
	"CrossBorderData": {
		"TargetCountryISO": "MX"
	},
	"Currency": "USD",
	"Customer": {
		"Email": "lucia@test.com",
		"FirstName": "Lucia",
		"LastName": "Perez",
		"PhoneNumber": "+525532100000",
		"BillingAddress": {
			"AddressType": 1,
			"Country": "Mexico",
			"State": "Ciudad de Mexico",
			"City": "Coyoacan",
			"AddressDetail": "Av Universidad 3000"
		}
	}
}
```

### Response parameters
In the response, you will find the following parameters:

| Property | Type | Description |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL of the payment coupon. |

You can redirect your customer to the URL displayed in the parameter `Response.MetadataOut.PaymentUrl`, where they can use the voucher and complete the payment in an **OXXO** store.

<img src="/assets/OXXOPayVoucher.png" width="60%" alt="PrintScreen"/>

#### Response example

```json
{
    "Response": {
        "PurchaseId": 1134219,
        "Created": "2023-09-01T16:56:08.496",
        "TrxToken": null,
        "Order": null,
        "Transaction": {
            "TransactionID": 1153111,
            "Created": "2023-09-01T16:56:08.497",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "200 https://s3.amazonaws.com/gateway.stage.bamboopayment.com/purchase-coupons/1134219_7f597f55-1d3a-42ba-9bbb-883262cd6c03_20230902.html",
            "ApprovalCode": "Author",
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-09-01T16:56:09.437",
                    "Status": "PhysicalNetwork Pending",
                    "ResponseCode": "200",
                    "ResponseMessage": "",
                    "Error": null,
                    "AuthorizationCode": "Author",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "https://s3.amazonaws.com/gateway.stage.bamboopayment.com/purchase-coupons/1134219_7f597f55-1d3a-42ba-9bbb-883262cd6c03_20230902.html"
                }
            ]
        },
        "Capture": true,
        "Amount": 5000,
        "OriginalAmount": 5000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": null,
        "Customer": {
            "CustomerId": 250946,
            "Created": "2023-09-01T16:56:07.713",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "lucia@test.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 255697,
                    "PaymentMediaId": 90,
                    "Created": "2023-09-01T16:56:07.863",
                    "LastUpdate": "2023-09-01T16:56:08.220",
                    "Brand": "OxxoPay",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "PhysicalNetwork",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": null,
                    "Last4": "",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/250946",
            "FirstName": "Lucia",
            "LastName": "Perez",
            "DocNumber": null,
            "DocumentTypeId": 2,
            "PhoneNumber": null,
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1134219",
        "DataUY": {
            "IsFinalConsumer": false,
            "Invoice": null,
            "TaxableAmount": 0
        },
        "DataDO": {
            "Invoice": null,
            "Tax": 0
        },
        "Acquirer": {
            "AcquirerID": 166,
            "Name": "OxxoPay",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255697,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "PaymentUrl": "https://s3.amazonaws.com/gateway.stage.bamboopayment.com/purchase-coupons/1134219_7f597f55-1d3a-42ba-9bbb-883262cd6c03_20230902.html"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "MXN",
            "TargetAmount": 50
        },
        "Redirection": null,
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {
            "AntifraudFingerprintId": null,
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "PurchaseType": 1,
        "HasCvv": null,
        "TargetCountryISO": null
    },
    "Errors": []
}
```

## Paynet Cash
**Paynet** allows your customers to generate a coupon and complete the payment in a physical payment office.

### Cash acquirers
You can offer your customer the possibility to pay using cash in the following networks:

* Farmacias Benavides
* 7Eleven
* Walmart
* Farmacias de Ahorro
* Sam´s
* Walmart Express
* Bodega Aurrera
* Circle K

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**30**_. |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information. |

#### Request example
```json
{
    "PaymentMediaId": 30,
    "Order": "test1005",
    "Amount": 1030,
    "TargetCountryISO": "MX",
    "MetadataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "Currency": "MXN",
    "Capture": true,
    "Customer": {
        "FirstName": "John",
        "LastName": "Diaz",
        "Email": "jdiaz@mail.com"
    }
}
```

### Response parameters
In the response, you will find the following parameters:

| Property | Type | Description |
|---|:-:|---|
| `Response` → `MetadataOut` → `PaymentCode` | `string`  | Payment number generated by **Paynet**. |
| `Response` → `MetadataOut` → `PaymentBarcodeUrl` | `string` | URL of the payment barcode image. |
| `Response` → `MetadataOut` → `PaymentUrl` | `string` | URL of the payment coupon in PDF format. |

You can redirect your customer to the URL displayed in the parameter `Response.MetadataOut.PaymentUrl` to download the voucher and complete the payment in an physical payment branch.

<img src="/assets/PaynetVoucher.png" width="60%" alt="PrintScreen"/>

#### Response example

```json
{
    "Response": {
        "PurchaseId": 1134220,
        "Created": "2023-09-01T17:14:37.189",
        "TrxToken": null,
        "Order": "test1005",
        "Transaction": {
            "TransactionID": 1153112,
            "Created": "2023-09-01T17:14:37.189",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": " ",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "",
                    "Status": null,
                    "ResponseCode": "Ok",
                    "ResponseMessage": "trfe2e9jxdyzjvkqb1t1",
                    "Error": null,
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": null
                }
            ]
        },
        "Capture": true,
        "Amount": 1030,
        "OriginalAmount": 1030,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": null,
        "Customer": {
            "CustomerId": 250947,
            "Created": "2023-09-01T17:14:36.427",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "jdiaz@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 255698,
                    "PaymentMediaId": 30,
                    "Created": "2023-09-01T17:14:36.547",
                    "LastUpdate": "2023-09-01T17:14:36.920",
                    "Brand": "OpenPayPayNet",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "PhysicalNetwork",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": null,
                    "Last4": "",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://api.stage.bamboopayment.com/Customer/250947",
            "FirstName": "John",
            "LastName": "Diaz",
            "DocNumber": null,
            "DocumentTypeId": 2,
            "PhoneNumber": null,
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://api.stage.bamboopayment.com/Purchase/1134220",
        "DataUY": {
            "IsFinalConsumer": false,
            "Invoice": null,
            "TaxableAmount": 0
        },
        "DataDO": {
            "Invoice": null,
            "Tax": 0
        },
        "Acquirer": {
            "AcquirerID": 62,
            "Name": "OpenPay PayNet",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 255698,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "PaymentCode": "9988780335829741",
            "PaymentBarcodeUrl": "https://sandbox-api.openpay.mx/barcode/9988780335829741?width=1&height=45&text=false",
            "PaymentUrl": "https://sandbox-dashboard.openpay.mx/paynet-pdf/m46uqwpxz7otrhsinbx1/9988780335829741"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "MXN",
            "TargetAmount": 10.3
        },
        "Redirection": null,
        "IsFirstRecurrentPurchase": false,
        "AntifraudData": {
            "AntifraudFingerprintId": null,
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "PurchaseType": 1,
        "HasCvv": null,
        "TargetCountryISO": null
    },
    "Errors": []
}
```

## Bank Transfer (SPEI)
**SPEI** (Sistema de Pagos Electrónicos Interbancarios) is an electronic payment system in Mexico that allows your customers to transfer funds between banks instantly. 

To use **SPEI**, customers must have access to online banking or a mobile banking app offered by their bank and then initiate a transfer by providing the CLABE (Clave Bancaria Estandarizada) number returned in the response. 

### Request parameters
You need to include specific fields for this payment method to work correctly. Check the [Purchase operation]({{< ref purchase-operations.md >}}#request-parameters) article for details on authentication, languages of the response, and basic purchase parameters such as amount and currency.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `PaymentMediaId` | `numeric` | Yes | The `PaymentMediaId` for this payment method is _**73**_. |
| `TargetCountryISO` | `string` | Yes | Indicate the destination country. |
| `Customer` → `Email` | `string` | Yes | Customer's email. |
| `Customer` → `FirstName` | `string` | Yes | Customer's first name. |
| `Customer` → `LastName` | `string` | No | Customer's last name. |
| `Customer` → `DocNumber` | `string` | No | Customer's Document Number. |
| `Customer` → `PhoneNumber` | `string` | No | Customer's phone number. |
| `Customer` → `BillingAddress` → `Country` | `string` | No | Customer's Country. |
| `Customer` → `BillingAddress` → `State` | `string` | No | Customer's State. |
| `Customer` → `BillingAddress` → `City` | `string` | No | Customer's City. |
| `Customer` → `BillingAddress` → `AddressDetail` | `string` | No | Customer's Address Detail. |
| `Customer` → `BillingAddress` → `PostalCode` | `string` | No | Customer's Postal Code. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure the expiration time for the payment using this field, specifying the duration in minutes. The API applies a default value if you don't provide this information.<br>The maximum time allowed is **30** days (**43200** minutes). |

#### Request example
```json
{
    "PaymentMediaId": 73,
    "Order": "ORD1012",
    "Amount": 180,
    "Currency": "USD",
    "Description": "Test Order",
    "MetaDataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "TargetCountryISO": "MX",
    "Customer": {
        "FirstName": "John",
        "LastName": "Diaz",
        "Email": "jdiaz@mail.com"
    }
}
```

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

```json
{
    "Response": {
        "PurchaseId": 148817,
        "Created": "2023-10-31T12:23:00.494",
        "TrxToken": null,
        "Order": "ORD1012",
        "Transaction": {
            "TransactionID": 159700,
            "Created": "2023-10-31T12:23:00.493",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-10-31T12:23:29.923",
                    "Status": null,
                    "ResponseCode": "",
                    "ResponseMessage": "",
                    "Error": null,
                    "AuthorizationCode": "",
                    "UniqueID": null,
                    "AcquirerResponseDetail": ""
                }
            ]
        },
        "Capture": true,
        "Amount": 3000,
        "OriginalAmount": 3000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": "Test Order",
        "Customer": {
            "CustomerId": 70505,
            "Created": "2023-10-31T12:22:51.353",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "jdiaz@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 72313,
                    "PaymentMediaId": 73,
                    "Created": "2023-10-31T12:22:52.153",
                    "LastUpdate": "2023-10-31T12:22:53.173",
                    "Brand": "STP",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "BankTransfer",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": null,
                    "Last4": "",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://devapi.siemprepago.com/v1/api/Customer/70505",
            "FirstName": "John",
            "LastName": "Diaz",
            "DocNumber": null,
            "DocumentTypeId": null,
            "PhoneNumber": null,
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://devapi.siemprepago.com/v1/api/Purchase/148817",
        "DataUY": {
            "IsFinalConsumer": false,
            "Invoice": null,
            "TaxableAmount": null
        },
        "DataDO": {
            "Invoice": null,
            "Tax": null
        },
        "Acquirer": {
            "AcquirerID": 105,
            "Name": "STP",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 72313,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "Clabe": "646180366600000240",
            "Expiration": "11/03/2023 13:43:00",
            "Amount": "30",
            "BankBeneficiaryName": "Bamboo Payment Mexico SRL DE CV",
            "BankName": "STP",
            "BankConcept": "11285028",
            "BankReference": "11285028",
            "PaymentCouponUrl": "https://s3.amazonaws.com/gateway.prod.bamboopayment.com/purchase-coupons/11285028_0d941f46-1788-413b-b80b-ae269333e1c0_20240613.html"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 1.8
        },
        "Redirection": null,
        "AntifraudData": {
            "AntifraudFingerprintId": null,
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "TargetCountryISO": null,
        "PurchaseType": 1,
        "IsFirstRecurrentPurchase": false
    },
    "Errors": []
}
```

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