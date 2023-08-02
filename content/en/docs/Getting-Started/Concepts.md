---
title: "Concepts"
linkTitle: "Concepts"
date: 2023-03-02T11:40:29-05:00
Description: >
  Understand the concepts behind any integration with Bamboo Payments.
weight: 10
---

## Acquirer
An acquirer is a payment facilitator that allows you to perform digital payments. Furthermore, the acquirer is the responsible of the payments and manages the settlement to your banking account.

## API
An API (from the acronym **A**pplication **P**rogramming **I**nterface) is a set of methods and definitions that allows you to interact with a system through some input data. In our case, the API is defined to allow you process the information of a transaction to receive the response related to it.

## Authentication
Authentication is the procedure to validate the identity of a merchant. All merchants integrated with our platform receive a pair of keys for each associated account _Private Account Key_ and _Public Account Key_.

Each one of these keys identifies the merchant account in our system in each transaction performed to determine whether the merchant is authorized to operate and what are the conditions of the integration (For example, what payment methods are enabled for the merchant).

### Private Account Key
The Private Account Key is a unique identifier that must be attached to each private request (server to server) where critical operations are available, such as initiating or confirming a transaction, accessing merchant transaction information, creating or deleting subscription plans, etc.

{{% alert title="Important" color="warning"%}}
The _Private Account Key_ must not be shared or publicly exposed at any time, to not compromise the security of the integration. **It is the merchant’s responsibility to keep it safe**.
{{% /alert %}}

### Public Account Key
The Public Account key is unique identifier that must be attached to each public request (made from the web interface) for query operations or for data capture request.

Furthermore, this key is also used when invoking the `PWCheckout` Javascript library.

## Checkout
The checkout is the form where your customers select the payment method they want to use to complete the payment. According to the payment method, this form allows you to collect its information and send it to process the transaction.

## CVV
CVV stands for _**C**ard **V**erification **V**alue_. It is a three- or four-digit security code of the credit or debit cards. The CVV is an additional security measure to verify that the person making an online or over-the-phone transaction has physical possession of the card.

## Environment
The Environment is the set of software and resources that allows you to process the transactions. Depending on its type, the environment has real or test data and information. Our platform has two separate environments: `Stage` and `Production`.

### Stage
This environment allows you to perform testing tasks. Here, the transactions never reach the real systems of the payment method providers. It's a safe way to try out tasks and flows.

* Base URL: `https://api.stage.bamboopayment.com`.

### Production
This environment allows you to perform **real** transactions and they are processed by the actual system of the payment methods you have. Before starting to process transactions in this environment, it's strongly recommended to test in `Stage`.

* Base URL: `https://api.bamboopayment.com`.

{{% alert title="Note" color="info"%}}
Throughout our documentation, we refer to the URLs where the services are exposed as `{environment_api}`, this must be replaced by the URL corresponding to the environment where you are working.
{{% /alert %}}

## Form
A _Form_ is a web component that allows you to embed a set of fields to tokenize a card or perform a purchase using a payment method. For more information, refer to [Forms](../forms.html).

## FX Service
_Foreign Exchange_ or _FX_ refers to the current rate to convert one country's currency to another. This value is updated according to destination country regulations.

## Merchant and accounts
A _Merchant_ is the business who hires Bamboo Payment to receive electronical payments using any of the models available.

An _Account_ is the segmentation of the merchant's business. For example:

* Processing countries
* Branches
* Business Lines
* Payment methods
* Merchant codes provided by card processors
* Business 

By default, a merchant who hires Bamboo System receives a _**Merchant Identificator**_ and an _**Account**_ that allows them to process transactions. Then, the merchants are free to create as many accounts as they need to meet business requirements.

{{% alert title="Note" color="info"%}}
For settlement and billing purposes, Bamboo Payment will consider the total of the transactions made by all the accounts of a merchant.
{{% /alert %}}

### Crossboder merchant
A _Crossboder merchant_ is a business that is not located in the processing country. For example, a business who is legally constituted in United States but it has operations in Uruguay, Argentina, and Brazil.

These merchants process under the [Payfac model](#payfac-model) and can process in **USD** or local currency.

### Local merchant
A _Local merchant_ is a business that is located in the same country where they process.

These merchants can process under the [Payfac model](#payfac-model) or [Gateway model](#gateway-model) using local currency.

## Gateway model
In the _Gateway model_, the acquirer or payment method pays directly to the accounts of the merchant. In this model, merchant and acquirer (or payment method) implements their own settlement process.

## Payfac model
Refers to a _Payment Facilitator_ model, in which the merchant is represented as a Bamboo sub-merchant with whom they sign a commercial agreement. For settlement in this model, the acquirer or payment facilitator makes payment to Bamboo and Bamboo pays the merchant.

## Tenant
A _Tenant_ refers to the processing channel in Bamboo which can be Crossborder (operates in multiple countries and uses the conversion rate) or local.  

## Tokenization
When referring to data security, tokenization is the process of changing a sensitive element with its non-sensitive equivalent. This non-sensitive element, known as the _token_, is generated through the tokenization process. The _token_ itself is meaningless and worthless, except for the entity that created it. In the event of a security incident that allows the theft of these numbers, they will be of no value to the thief as they cannot be used for their own purposes.

Since the _token_ is a reference or identifier assigned to a stored card by the system, it is unique for each pair of "merchant/token". Therefore, when a customer registers their card with two different merchants, each merchant will receive a different _token_. This makes it impossible for a merchant to use the _tokens_ from one customer for any other purpose.

## Unique Identifier (UniqueID) {#UniqueID}
The Unique Identifier allows you to avoid duplicate transactions, such as purchase operations, when there is a failure while getting the response from Bamboo, and you retry the request.

The goal of the Unique Identifier, is to identify the transaction and, in case of a connection failure and the transaction is approved in our system, our API responses the result of the previously processed purchase and avoid the creation of a new one.

The `UniqueID` parameter is not required; nevertheless, it is strongly recommended to include it in each request. You can define any alphanumeric value as long as it's not used in other transactions.

Example:

```json
{
  "TrxToken": "OT__-3aFeJUpsjDWsYl26yvnj8k0SW703Cut4jiYpVJ8SzQ_",
  "Order": "12345678",
  "Amount": "10000",
  "Installments": 1,
  "Customer": {
    ...
  },
  "UniqueID": "6908304133336033404953",
  "Currency": "UYU",
  "Capture": false
}
```