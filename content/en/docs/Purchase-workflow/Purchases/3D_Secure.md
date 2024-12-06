---
title: "3DS pass-through"
linkTitle: "3DS Pass-through"
date: 2024-08-02T08:43:44-05:00
Description: >
  Bamboo supports 3D Secure (3DS) as a pass-through with acquirers in Latin America by sending the cardholder authentication result when completing the payment.
weight: 60
tags: ["subtopic"]
---

3D Secure (3DS) is an authentication protocol designed to enhance the security of online transactions by verifying the cardholder before completing the payment. In Bamboo’s 3DS Pass-through flow, authentication is handled via an external authentication provider, known as an External MPI. This method allows merchants to use third-party authentication data to securely complete transactions without performing the authentication directly within Bamboo’s platform. It’s an ideal solution for merchants who prefer or require external control over the authentication process.

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

### Request Example using the [Direct Purchase]({{< ref "purchase_v3.html" >}}#direct-purchase-for-pci-compliant-merchants){#request-example-using-the-purchase-for-pci-compliant-merchants}

{{< highlight json >}}
{{< Payins/V3/3DSecure/3ds_request >}}
{{< /highlight >}}
