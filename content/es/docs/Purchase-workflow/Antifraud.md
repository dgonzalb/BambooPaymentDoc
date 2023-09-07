---
title: "Anti-fraud system information"
linkTitle: "Anti-fraud"
date: 2023-08-02T08:43:44-05:00
Description: >
  All the purchases received through API or Redirection flow for merchants in the [Payments Facilitator]({{< ref "Concepts.md">}}#payfac-model) model, are evaluated by the anti-fraud system.
weight: 40
---



## Parameters to send when making a purchase
Below, you can find the required and suggested (optional) parameters to be sent when generating a purchase according to the authorization flow.

### Authorization flow by API

**Mandatory parameters:**

* `{“Customer”:{FirstName:””,”LastName”:””,”Email”:””}}`<br>Name, last name and email corresponding to the customer of the commerce website.
* `{"AntifraudData":{"AntifraudFingerprintId":""}}`<br>Session Id (`AntifraudFingerprintId`) which is obtained by the javascript function [getSessionAntifraud](#getsessionantifraud).
* `"CustomerIP":""`<br>IP of to the customer connected to the commerce website

**Suggested parameters:**

* `{“Customer”:{“ShippingAddress”:{}}}`<br>Shipping address provided by the customer. If you send this parameter, all its properties are mandatory.
* `{“Customer”:{DocumentTypeId:””,”DocNumber”:””}}`<br>Document of the customer.
* `{"AntifraudData":{“AntifraudMetadataIn”:{“key1”:”data1”,”key2”:”data2”}}}`<br>`AntifraudMetadataIn` is a data dictionary to be defined, to adjust the anti-fraud system to the particular needs of each business.

### Authorization flow by Redirection

In the case of the redirection authorization flow, the required and suggested parameters are governed by the following table:

**Mandatory parameters:**

All the parameters in Column A and at least one in Column B.


| Column A - Mandatory | Column B - At least one is mandatory |
|---------|----------|
| `AntifraudData` → `AntifraudFingerprintId` | `Email` |
| `CustomerIp` | `FirstName` - `LastName`<br>`DocumentTypeId` - `DocNumber` |

**Suggested parameters:**

* `{“Customer”:{“Phone”: “”, “ShippingAddress”:{}}}`<br>Phone, and Shipping address provided by the customer.
* `{"AntifraudData":{“AntifraudMetadataIn”:{“key1”:”data1”,”key2”:”data2”}}}`<br>`AntifraudMetadataIn` is a data dictionary to be defined, to adjust the anti-fraud system to the particular needs of each business.

## Device Fingerprint

### JavaScript Library Import
The invocation of the fingerprint service is found in a JavaScript library, which must be imported into the client's web page directly from a public URL on our platform.

The JavaScript snippet records user interactions with your website and collects device information. <br>

In the call to said library, the public key of the trading account (PublicAccountKey) must be included (as a parameter), which will be used for calls to the REST API from this library.

```json
<script src="{API_Environment}/v1/Scripts/Antifraud.js?key={PublicAccountKey}" type="text/javascript"></script> 
```

{{% alert title="Nota" color="warning"%}}
You must import the library through the public URL provided by Bamboo Payment. It should not be downloaded and used locally from a merchant's own server or from a URL of a third party not authorized by Bamboo Payment.

This is important for security reasons and to always keep up-to-date with the latest modifications and corrections made to it.
{{% /alert %}}

## Methods

### getSessionAntifraud
This method returns the `SessionId` of the fingerprint (string). The `SessionId` is the data that must be passed in the API invocation at the time of purchase in the `AntifraudFingerprintId` parameter

![PrintScreen](/assets/getSessionAntifraudFlow_en.png)