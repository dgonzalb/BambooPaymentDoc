---
title: "3D Secure"
date: 2025-10-20T08:28:16-05:00
Description: >
  Integrate 3D Secure authentication in Bamboo using external or Bamboo-managed flows. Compare integration options and learn how to include 3DS data in your purchase requests.
weight: 40
tags: ["parenttopic"]
---

## What is 3D Secure?

3D Secure _(often abbreviated “3DS”)_ is a **security protocol** for online card payments intended to add an additional **layer of protection** in card-not-present (CNP) transactions. It’s designed to help confirm that the person making the purchase is the legitimate cardholder, reducing the risk of fraud.

When 3DS is active, the card issuer _(or another identity authority)_ evaluates the transaction during checkout. If the issuer deems it necessary, the customer may be prompted to provide extra verification. _For example, via a one-time password (OTP), biometric check, or other challenge, before the transaction proceeds._


### Why use 3D Secure?

Implementing 3DS offers several advantages:

> 🛡️ **Fraud mitigation**  
> Introduces a verification checkpoint that helps filter out unauthorized or suspicious transactions before funds move.

> ⚖️ **Liability shift (when applicable)**  
> When a transaction passes 3-D Secure authentication, the liability for specific types of chargebacks may shift from the merchant to the issuer, depending on scheme rules.

> ⚙️ **Regulatory compliance**  
> In regions with strong customer authentication requirements, such as PSD2, 3-D Secure is often mandatory or strongly recommended to ensure compliance.

> 😊 **Better user experience (with 3DS2)**  
> The newer version, 3DS2, supports frictionless authentication and native mobile flows, minimizing checkout disruptions.

> 🔍 **Risk-based authentication**  
> 3DS2 introduces risk-based decisioning, allowing frictionless approval for low-risk transactions and step-up challenges for higher-risk scenarios.
***

<br />

### 3D Secure 2 (3DS2)

3DS2 is the evolved version of the original protocol and introduces improvements in security, flexibility, and usability.

|  | Description |
|----------|-------------|
| **Frictionless flow** | Many legitimate transactions can be authenticated behind the scenes (without a visible user challenge) by leveraging rich contextual data such as device, behavior, and transaction details. |
| **Mobile-native support** | 3DS2 is designed for mobile environments, enabling smoother authentication experiences within native apps and mobile web. |
| **Modern authentication** | Beyond traditional one-time passwords (OTPs), issuers can support biometric validation, push notifications, or other advanced methods. |
| **Rich data sharing** | Merchants can provide contextual information, including device details, shipping data, and transaction history to help issuers make more accurate risk assessments. |
| **Versioning and fallback** | 3DS2 supports multiple protocol versions (2.0, 2.1, 2.2) with built-in fallback mechanisms to ensure compatibility across issuers and networks. |


>Because of these features, 3DS2 strikes a better balance between security and user experience.

****

### How the 3D Secure Process Works

The 3D Secure (3DS) process relies on several components that work together to verify the cardholder’s identity and enhance transaction security.

<Image align="center" border={false} width="550px" src="https://files.readme.io/fc0888a8597dce6064a37968a9b109418c4741ea36bf91cbc36370ce7264b33f-image.png" />

<br />

#### 1. 3DS Server

_The process starts with the 3DS Server, which manages the authentication request on behalf of the merchant.
It gathers relevant information about the transaction and the cardholder and securely prepares the data needed to initiate the 3DS process._

#### 2. Directory Server (DS)

_The Directory Server routes the authentication request to the correct Access Control Server (ACS).
It ensures the request reaches the issuer’s domain securely._

#### 3. Access Control Server (ACS)

_The ACS is the issuer’s authentication domain. It evaluates the transaction’s risk and decides whether to approve it silently or issue a challenge for further verification._

#### 4. Challenge & Verification

_If a challenge is triggered, the cardholder is prompted to verify their identity — e.g., with an OTP, biometric check, or push notification. If successful, the transaction continues. Otherwise, it is declined._

#### 5. Finalization

_Once the ACS returns a decision (either frictionless approval or post-challenge confirmation) the result is relayed back. The transaction is either completed or rejected accordingly._

***

<br />

## Integration Options

Bamboo supports two methods for integrating 3D Secure authentication. External authentication is currently available; Bamboo-managed flows will be available soon.

|  | Description |
|---------|-------------|
| 🛡️ **[External Authentication]({{< ref 3ds_passthrough.md >}})** | Include authentication data from a third-party provider in the purchase request so external 3DS verification is recognized within Bamboo’s processing flow. |
| 🔐 **Bamboo Authentication** | Handle the full 3DS flow via Bamboo. Redirection to the issuer’s challenge page is triggered automatically when needed via the Direct API. |

<br />