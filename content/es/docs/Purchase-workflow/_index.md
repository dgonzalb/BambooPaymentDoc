---
title: "Purchase API"
date: 2023-03-02T08:28:16-05:00
Description: >
  You can create a purchase using our API. _Customer Type_ and _Flow Type_ drive the purchase workflow.
weight: 40
---

## Customer Type
You can have either Anonymous or Registered customers regardless of the flow type. Anonymous customers are not registered on the site and make a one-time purchase. The registered customers are shoppers registered on the website, so they can be identified and have extra functionalities such as recurrences.

## Flow type
You can use two different workflows to authorize a purchase:

* API
* Redirect

{{% alert title="Nota" color="info"%}}
Flow type depends on each payment method. It’s specified in the [payment methods table by country](/docs/getting-started/payment-methods.html) in the column _**FLOW**_.
{{% /alert %}}

### API flow
Upon invoking the API to initiate a purchase, the invocation response will directly provide a status, which could be either final or partial.

![PrintScreen](/assets/APIFlow_en.png)

For purchases using API, you can use any of the following options:

* [Purchase creation]({{< ref "Purchase-Operations.md" >}}), which can be local or CrossBorder.
* [Direct purchase]({{< ref "Direct-Purchase.md" >}})
* [Purchase preview]({{< ref "Purchase-Preview.md" >}})

### Redirect flow
When you invoke the API to initiate a purchase, you obtain a _CommerceAction_. This _CommerceAction_ signals that the Merchant needs to take necessary steps to advance the payment process. In such instances, the API returns a URL linked to the _CommerceAction_ to direct the customer to this URL for further payment continuation.

![PrintScreen](/assets/RedirectionFlow_en.png)

For Redirect purchases, refer to [Redirect flow payments]({{< ref "Redirect-Purchase.md" >}}).