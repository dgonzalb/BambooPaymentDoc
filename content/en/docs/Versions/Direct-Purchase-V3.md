---
title: "Direct Purchase for PCI Merchants V3"
linkTitle: "Direct Purchase for PCI Merchants V3"
date: 2024-08-22T10:30:29-05:00
Description: >
  This functionality allows the PCI merchants to make an authorization sending card data information in one step without the needed of an extra call for card tokenization unlike the [basic purchase]({{< ref "Purchase-Operations.md" >}}).
weight: 20
tags: ["subtopic"]
---

## Request URL
You must invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://secure-api.bamboopayment.com/v3/api/purchase`
* **Stage**: `https://secure-api.stage.bamboopayment.com/v3/api/purchase`


##### CardData Object

| Parameter | Type | Mandatory? | Description |
|---|---|:---:|---|
| `CardHolderName` | `string` | Yes | The name of the cardholder as it appears on the card. |
| `Pan` | `string` | Yes | The Primary Account Number (PAN) of the card. |
| `CVV` | `string` | Yes | The Card Verification Value (CVV) or Card Security Code. |
| `Expiration` | `string` | Yes | The expiration date of the card in the format "MM/YY". |
| `Email` | `string` | Yes | The email associated with the cardholder. |
| `Document` | `string` | No | The identification document number of the cardholder. |



{{% alert title="Info" color="info"%}}

**Note:** The CardData object should only be used for transactions with non-tokenized cards. Ensure that sensitive card data is handled securely and in compliance with PCI DSS standards.

{{% /alert %}}


## Request example 
```json
{
    "CardData": {
        "CardHolderName": "João Silva",
        "Pan": "4507990000004905",
        "CVV": "123",
        "Expiration": "08/30",
        "Email": "joao.silva@example.com",
        "Document": "12345678901"
    },
    "UniqueID": "paymentID3022",
    "Capture": true,
    "TargetCountryISO": "BR",
    "Currency": "BRL",
    "Amount": 25000,
    "Installments": 2,
    "Order": "CH2023-001",
    "Description": "Compra de teste",
    "Customer": {
        "FirstName": "João",
        "LastName": "Silva",
        "ReferenceCode": "JS-001",
        "PhoneNumber": "11987654321",
        "DocNumber": "12345678901",
        "DocumentTypeId": 4,
        "Email": "joao.silva@example.com",
        "ShippingAddress": {
            "Country": "BR",
            "City": "São Paulo",
            "State": "SP",
            "PostalCode": "01310-200",
            "AddressDetail": "Avenida Paulista 1000"
        }
    }
}
```

<br>

The fields **CardData**, **PaymentMethodId**, **NetworkToken** and **TrxToken** are not required; Nevertheless, one of them must be send depending of which flow to use.

* **CardData**: Must be used for transactions using non-tokenized cards.

* **PaymentMediaId**: Identifier of alternative payment method (Bank Transfer, cash or any flow needing a redirection of the client). This identifier can be found in the [Payment Methods by Country](/en/docs/payment-methods.html) section.

* **TrxToken**: The merchant can generate a token and use it to generate transactions if necessary.

* **NetworkToken**: A secure token that replaces actual card details in the transaction process. These tokens are stored in vaults maintained by card networks. Currently, we support Network Tokens from Visa and Mastercard. **PaymentMethodId** is mandatory when sending a Network Token.

## Response Example
The response structure for Direct Purchase operations performed by PCI-compliant merchants is identical to the standard Purchase response. This ensures consistency across different transaction types and simplifies integration processes.

For a detailed breakdown of all possible fields in the response, including descriptions and data types, please refer to the [Basic Operations](/en/docs/versions/purchase-operations-v3.html#response-parameters) section. All fields, statuses, and error codes described in the standard Purchase response apply equally to Direct Purchase transactions.


```json
{
    "TransactionId": "79632697147789184",
    "Result": "COMPLETED",
    "Status": "Approved",
    "ErrorCode": null,
    "ErrorDescription": null,
    "Created": "2024-08-07T17:51:54.620",
    "AuthorizationDate": "2024-08-07T17:51:56.879",
    "AuthorizationCode": "839936",
    "Amount": 25000,
    "Currency": "BRL",
    "Installments": 2,
    "TaxableAmount": null,
    "Tip": null,
    "Url": "https://api.stage.bamboopayment.com/Purchase/79632697147789184",
    "MetadataOut": null,
    "Action": null,
    "PaymentMethod": {
        "Brand": "Visa",
        "CardOwner": "João Silva",
        "Bin": "450799",
        "IssuerBank": "Banco do Brasil",
        "Type": "CreditCard",
        "Expiration": "203008",
        "Last4": "4905",
        "DocumentNumber": "12345678901",
        "DocumentTypeId": 4
    }
}
```