---
title: "Authentication"
linkTitle: "Authentication"
date: 2023-08-02T08:43:44-05:00
Description: >
  Learn how to set up authentication for the Bamboo API. Step-by-step guide for implementing authentication headers, handling private keys, and configuring API response languages.
weight: 10
---

## Configuring the authentication
All methods used in Purchase API require the following authentication headers.

| Key | Value | Comments |
|---|---|---|
| `Content-Type` | `application/json` | With this header, the request will be transmitted in _JSON_ format. |
| `Authorization` | `Basic {{Merchant Private Key}}` | Send the `{{Merchant Private Key}}` (your merchant identifier) and the word `Basic`.<br>Example: `Basic RVkeLr-86_iTzSMLvDtuyQ-1zqIcsmFG-oSzncn_uFv-nj7bhB3rtZg__` |

#### Setting the language of the response codes
You can receive the error description by relying on localization features. To do this, you need to send the `lang` header in your integration, using any of the following languages in **ISO 639-1** format.

<div id="shortTable"></div>

| Code | Language |
|:-:|---|
| `en` | English.<br>_This is the default language. If you don't send this header or set a non-existent language, you will receive errors in this language._ |
| `es` | Spanish. |
| `pt` | Portuguese. |