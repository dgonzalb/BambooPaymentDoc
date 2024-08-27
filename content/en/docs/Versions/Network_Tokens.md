---
title: "Network Tokens"
linkTitle: "Network Tokens"
date: 2023-08-02T08:43:44-05:00
Description: >
  Discover how Bamboo supports Network Tokens with pass-through capabilities to enhance digital payment security and reduce fraud by replacing sensitive card data with secure tokens.
weight: 40
tags: ["subtopic"]
---

Network Tokens replace sensitive card details during transaction processing, significantly enhancing security across the payment ecosystem. By substituting actual card numbers with secure tokens, this method reduces the risk of exposing financial information and minimizes the potential for fraud.


## Request Fields

| Parameter | Type | Mandatory? | Description |
|-----------|------|:----------:|-------------|
| `Token` | `string` | Yes | Card network token. |
| `Cryptogram` | `string` | Yes | The unique cryptogram generated by the issuer for the network token used in the transaction. |
| `Expiration_Month` | `integer` | Yes | Two-Digits number representing the network token expiration month. |
| `Expiration_Year` | `integer` | Yes | Two-Digits number representing the network token expiration year.  |
| `CardHolderName` | `string` | Yes | Cardholder's name. |

### Request Example
Below is an example of a payment using a network token:
```json
{
    "PaymentMethodId": 1,
    "TargetCountryISO": "UY",
    "Currency": "UYU",
    "Amount": 10000,
    "NetworkToken": {
        "Token": "5165850000000008",
        "Cryptogram": "ABCD1234EFGH5678IJKL91011MNOPQR",
        "Expiration_Month": 5,
        "Expiration_Year": 35,
        "CardHolderName": "Martín Rodríguez"
    }
```