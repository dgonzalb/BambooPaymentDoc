---
title: "Purchase API"
date: 2023-03-02T08:28:16-05:00
Description: >
  You can create a purchase using our API. The purchase workflow is driven by two factors: _Customer Type_ and _Flow Type_.
weight: 40
---

## Customer Type
Regardless of the flow type, you can have either Anonymous o Registered customers. Anonymous customers are those who are not registered on the site and make a one-time purchase, and the registered customers are clients that are registered in the website, so can be identified and have extra functionalities such as recurrences.

## Flow type
There are two different workflows that can be used to authorize a purchase:

* API
* Redirect

{{% alert title="Note" color="info"%}}
Flow type depends on each payment method, it's specified in the [payment methods table by country](/docs/getting-started/payment-methods.html) in the column _**FLOW**_.
{{% /alert %}}

### API flow
When invoking the API to create a purchase, a final or partial status will be obtained, directly in the invocation response.

![PrintScreen](/assets/APIFlow_en.png)

For purchases using API, you can use any of the following options:

* [Purchase creation]({{< ref "Purchase-Operations.md" >}}), which can be local or CrossBorder.
* [Direct purchase]({{< ref "Direct-Purchase.md" >}})
* [Purchase preview]({{< ref "Purchase-Preview.md" >}})

### Redirect flow
When invoking the API to create a purchase, a _CommerceAction_ will be obtained, which indicates that the Merchant must take an action to proceed with the payment. In this case, a URL associated with the _CommerceAction_ is returned to which the customer must be redirected to continue with the payment.

![PrintScreen](/assets/RedirectionFlow_en.png)

For Redirect purchase, refer to [Redirect flow payments]({{< ref "Redirect-Purchase.md" >}}).