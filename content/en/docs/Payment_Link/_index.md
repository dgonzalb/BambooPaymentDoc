---
title: "Payment Link API"
date: 2024-12-27T09:28:16-05:00
Description: >
    Discover how to integrate the Payment Link API to create dynamic payment URLs and QR codes. Provide various payment options for your customers in Uruguay with simple API calls.
weight: 80
---

## Overview
The Payment Link API allows merchants to create payment links and QR codes for their transactions dynamically. When you initiate a payment request, the API provides a payment URL and, if desired, a QR code image that can be shown to customers. Customers can complete their payment using the payment link or the QR code.

> **Note**: _This API is currently available only for Gateway Model. For availability in other countries, please contact your account executive._

### Basic Flow
1. Merchant creates a payment request with amount, currency, and optional parameters
2. API returns a payment URL and optional QR code image
3. Merchant presents the payment options to the customer
4. Customer completes payment using either the URL or QR code

