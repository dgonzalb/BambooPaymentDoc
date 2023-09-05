---
title: "Loyalty plans"
linkTitle: "Loyalty plans"
date: 2023-05-08T07:28:16-05:00
description: >
  Learn how to integrate your solution to process payments using Loyalty plans such as _SoySantander_ or _OCA Metros_.
weight: 20
tags: ["subtopic"]
--- 

## SoySantander
_SoySantander_ allows customers to use points to pay the total or partial purchase amount. Using our API, you can create purchases and consult the number of points of a customer.

### Token request
The first step is to get a valid token to perform the transaction. If the purchase is mixed, get the token from the card as explained in [Customers](/docs/purchase-workflow/customer-types.html). Otherwise, invoke the method `GetLoyaltyToken` of the `PWCheckout.` library PWCheckout.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `loyaltyPlanId` | `numeric` | Yes | Identifier of the Loyalty plan |
| `LoyaltyPlanUserIdentification` | `string` | Yes | User identifier in the Loyalty Plan. _Santander_ generates this value using an algorithm, and they indicate it to you. |
| `email` | `string` | Yes | E-mail address of the customer. |

<br>
Example:

```html
<script type=”text/javascript”>
    PWCheckout.GetLoyaltyToken(1, "ExampleLoyaltyPlanUserId", "email@bank.com");
</script>
```

### Purchases with _SoySantander_ points
Once you have the token associated with the Loyalty Plan, [Create a Purchase]({{< ref uy-cards.md >}}) using it. Furthermore, include the `LoyaltyPlan` object with the number of points to redeem and the user identifier of the Loyalty Plan.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Yes | Token generated as explained in [Token request](#token-request). |
| `Order` | `string` | Yes | Order number of the purchase. |
| `Amount` | `number` | No | Amount of the purchase. Send this parameter for Mixed purchases (Points + a card). Otherwise, discard it.<br>If you must include decimals in the amount, concatenate the decimal places without de decimal point. Example  `12,25` > `1225`. |
| `Currency` | `string` | No | Currency of the purchase, according to ISO-4217. Find the possible values in the [Currencies](/docs/payment-methods/uruguay.html#currencies) table.<br>Send this parameter for Mixed purchases (Points + a card). Otherwise, discard it. |
| `Capture` | `boolean` | Yes | Send `true` in this parameter as the Loyalty plan purchases don't support Pre-authorization. |
| `LoyaltyPlan` → `LoyaltyPlanId` | `numeric` | Yes | Identifier of the Loyalty plan. |
| `LoyaltyPlan` → `Amount` | `numeric` | Yes | Total of points to redeem. |
| `LoyaltyPlan` → `LoyaltyPlanUserIdentification` | `string` | Yes | User identifier in the Loyalty Plan. _Santander_ generates this value using an algorithm, and they indicate it to you. |

{{% alert title="Info" color="info"%}}
The outcome of a mixed purchase depends on processing points and cards. If the acquirer rejects either of these processes, the entire purchase will also be rejected.
{{% /alert %}}

#### Request example 
```json
{
    "TrxToken":"OT_02_kYv0qTHckRiZ4wjCz5NguZRuwFLSIrQc4jiYpVJ8SzQ_", 
    "Order":"17030613595101621fb",
    "Capture":true,
    "LoyaltyPlan": {
           "LoyaltyPlanId":1,
           "Amount":100,
           "LoyaltyPlanUserIdentification": "eyd1c2VyaWQnOid0ZXN0QGRvbWFpbi5jb20nfQ==",
     }
}
```

#### Request example for mixed purchases

```json
{
    "TrxToken":"OT_01_kYv0qTHckRiZ4wjCz5NguZRuwFLSIrQc4jiYpVJ8SzQ_", 
    "Order":"17030613595101621fb",
    "Amount": 123400, 
    "Currency":"UYU", 
    "Capture":true,
    "LoyaltyPlan": {
           "LoyaltyPlanId":1,
           "Amount":120,
           "LoyaltyPlanUserIdentification": "eyd1c2VyaWQnOid0ZXN0QGRvbWFpbi5jb20nfQ==",
     }
}
```

### Consulting the number of points
To get the number of points available for a user, create a `POST` request to the following URL

* **Production**: `https://api.bamboopayment.com/v1/api/LoyaltyPlan/{{LoyaltyPlan-ID}}/Balance`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/LoyaltyPlan/{{LoyaltyPlan-ID}}/Balance`

Where `{{LoyaltyPlan-ID}}` is the identifier of the Loyalty plan you want to consult. Furthermore, recall the usage of the Authentication as explained in [Purchase operations]({{< ref Purchase-Operations.md >}}).

#### Request parameters
Include the following parameters in the request.

| Property | Type | Mandatory? | Description |
|---|:-:|:-:|---|
| `LoyaltyPlanId` | `numeric` | Yes | Identifier of the Loyalty plan. |
| `LoyaltyPlanUserIdentification` | `string` | Yes | User identifier in the Loyalty Plan. _Santander_ generates this value using an algorithm, and they indicate it to you. |
| `TrxToken` | `string` | Yes | Token generated as explained in [Token request](#token-request). |

#### Request example 
```json
{
  "LoyaltyPlanId": 1,
  "LoyaltyPlanUserIdentification": "eyJDbGllbnRUb2tlbiI6Ik9UX19yR1NFV0VUeV9yNDhBbS10bjdIdUIzWlFIVTd4MkJXbzRqaVlwVko4U3pRXyIsIlR5cGUiOiXXXXXXXXXX",
  "TrxToken": "OT__ue2pwtim4aywkM6SWFI3g8YdDsuhfC2i4jiYpVJ8SzQ_"
}
```

#### Response example
The `Balance` parameter in the response contains the points available to the user.

```json
{
  "LoyaltyPlanBalance": {
    "ResponseCode": 0,
    "LoyaltyPlanId": 1,
    "Name": "Soy Santander",
    "LoyaltyPlanUserIdentification": "eyJDbGllbnRUb2tlbiI6Ik9UX19yR1NFV0VUeV9yNDhBbS10bjdIdUIzWlFIVTd4MkJXbzRqaVlwVko4U3pRXyIsIlR5cGUiOiXXXXXXXXXX",
    "Balance": 6954.0
  },
  "Errors": []
}
```

## OCA Metros
OCA Metros is the loyalty plan OCA offers that allows customers to purchase using points and a card.

### Considerations
When using OCA Metros, consider the following.

* Refunds with OCA Metros must be total.
* There are no pre-authorizations with OCA Metros.
* Send the Points as numbers without decimals.
* You can use OCA Metros only for MasterCard cards issued by OCA.

### Purchases with _OCA Metros_
To create a purchase with Metros, include the `OCAMetros` parameter with the number of OCA Metros to redeem in the `MetadataIn` structure for the `Purchase` object. For more information about creating a Purchase, refer [Credit and Debit cards]({{< ref uy-cards.md >}}).

The following example demonstrates how to use it and obtain the result:

```json
{
	"TrxToken":"OT__Hj3J8kzK1CFSv4SyMqSyUkc1WfJpjJf84jiYpVJ8SzQ_",
	"Capture": true,
	"MetadataIn" : {
        "OCAMetros": "12"
    },
	"Order": "20201229",
	"Amount":"1000",
	"CustomerIP": "127.0.0.1",
	"Currency":"USD",
	"Installments": 1
}
```


