---
title: "Direct Tokenization"
linkTitle: "Direct Tokenization"
date: 2023-07-17T07:28:16-05:00
description: >
  If you're commerce is **PCI compliance**, this functionality allows you create the tokens for the cards to be used in your Web through API, so you don't require to invoke the [Checkout Form]({{< ref "Checkout-Form.md" >}}). 
weight: 30
tags: ["subtopic"]
---

## Request URL
Regardless of the token you want to create, you need to invoke a **POST** request to the following URLs according to your needs.

* **Production**: `https://secure.bamboopayment.com/api/Token?commerceKey={{Merchant Private Key}}`
* **Stage**: `https://secure-api.stage.bamboopayment.com/api/Token?commerceKey={{Merchant Private Key}}`

Where `{{Merchant Private Key}}` is your merchant identifier.

## Setting the language of the response codes
You can receive the error description by relying on localization features. To do this, you need to send the `lang` header in your integration, using any of the following languages in **ISO 639-1** format.

<div id="shortTable"></div>

| Code | Language |
|:-:|---|
| `en` | English.<br>_This is the default language. If you don't send this header or set a non-existent language, you will receive errors in this language._ |
| `es` | Spanish. |
| `pt` | Portuguese. |

## Create a One Time Token (OTT) {#OTT}
This token allows you to store the card data for unique usage and valid for 10 minutes. 

### Request parameters



## Create a Commerce Token (CT) {#CT}
This token allows you to store the card data and it can process in any account you have.

### Request parameters


## Response parameters
Regardless of the token you create, you receive the following parameters in the response.


### Response example