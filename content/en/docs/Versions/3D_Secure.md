---
title: "3DS pass-through"
linkTitle: "3DS Pass-through"
date: 2024-08-02T08:43:44-05:00
Description: >
  Discover how Bamboo supports Network Tokens with pass-through capabilities to enhance digital payment security and reduce fraud by replacing sensitive card data with secure tokens.
weight: 50
tags: ["subtopic"]
---

3D Secure (3DS) is an authentication protocol designed to enhance the security of online transactions by verifying the cardholder before completing the payment. In Bamboo’s 3DS Pass-through flow, authentication is handled via an external authentication provider, known as an External MPI (Merchant Plug-In). This method allows merchants to use third-party authentication data to securely complete transactions without performing the authentication directly within Bamboo’s platform. It’s an ideal solution for merchants who prefer or require external control over the authentication process.

## ThreeDS Object
### Request Fields

| Parameter | Type | Mandatory? | Description |
|-----------|------|:----------:|-------------|
| `ThreeDSAuthMethod` | `string` | No | 3D Secure authentication method used: `"EXTERNAL"` or `"DISABLED"`. |
| `ThreeDS` | `object` | Yes | 3D Secure information when `ThreeDSAuthMethod="EXTERNAL"`. |
| `ThreeDS` → `Eci` | `string` | Yes | 3D Secure ECI code. |
| `ThreeDS` → `Xid` | `string` | Yes | 3D Secure transaction identifier. |
| `ThreeDS` → `Cavv` | `string` | Yes | Cardholder Authentication Verification Value (CAVV) in 3D Secure. |
| `ThreeDS` → `Version` | `string` | Yes | 3D Secure protocol version. |
| `ThreeDS` → `TransactionId` | `string` | Yes | Transaction ID in 3D Secure. |

### Request Example using the Purchase for PCI-Compliant Merchants
```json
{
    "CardData": {
        "CardHolderName": "John Doe",
        "Pan": "4507990000004905",
        "CVV": "123",
        "Expiration": "08/30",
        "Email": "john.doe@example.com",
        "Document": "74857601"
    },
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
        "DocumentNumber": "12345678901",
        "DocumentType": "CPF.BR",
        "Email": "joao.silva@example.com",
        "Address": {
            "Country": "BR",
            "City": "São Paulo",
            "State": "SP",
            "PostalCode": "01310-200",
            "AddressDetail": "Avenida Paulista 1000"
        }
    },
    "ThreeDSAuthMethod": "EXTERNAL",
    "ThreeDS": {
        "Eci": "05",
        "Xid": "MDAwMDAwMDAwMDAwMDAwMDAwMDE=",
        "Cavv": "kBNcxqbmcXUxhAE1yKRHAAAAAAA=",
        "Version": "2.2.0",
        "TransactionId": "97267598-FAE6-48F2-8083-C23433990FBC"
    }
}


```
