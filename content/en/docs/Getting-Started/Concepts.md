---
title: "Concepts"
linkTitle: "Concepts"
date: 2023-03-02T11:40:29-05:00
Description: >
  Understand the concepts behind any integration with Bamboo Payment.
weight: 10
---

## Acquirer
An acquirer is a payment facilitator that allows you to perform digital payments. Furthermore, the acquirer is responsible for the transactions and manages the settlement to your banking account.

## API
An API (from the acronym **A**pplication **P**rogramming **I**nterface) is a set of methods and definitions that allows you to interact with a system through some input data. In our case, we developed an API to enable you to process a transaction's information to receive the related response.

## Authentication
Authentication is the procedure to validate the identity of a merchant. All merchants integrated with our platform receive keys for each associated account, _Private Account Key_, and _Public Account Key_.

Each of these keys identifies the merchant account in our system in each transaction performed to determine whether the merchant is authorized to operate and the integration conditions (For example, what payment methods the merchant has enabled).

### Private Account Key
The Private Account Key is a unique identifier attached to each private request (server to server) where critical operations are available, such as initiating or confirming a transaction, accessing merchant transaction information, creating or deleting subscription plans, etc.

{{% alert title="Important" color="warning"%}}
You must not share the _Private Account Key_ or publicly expose it at any time to avoid compromising the security of the integration. **It is your responsibility to keep it safe**.
{{% /alert %}}

### Public Account Key
The Public Account key is a unique identifier that must be attached to each public request (made from the web interface) for query operations or data capture requests.

Furthermore, you also use this key when you invoke the `PWCheckout` JavaScript library.

## Checkout
The checkout is the form where customers select the payment method they want to use to complete the payment. According to the payment method, this form allows you to collect its information and send it to process the transaction.

## CVV
CVV stands for _**C**ard **V**erification **V**alue_. It is a three- or four-digit security code for credit or debit cards. The CVV is an additional security measure to verify that the person making an online or over-the-phone transaction has physical possession of the card.

## Environment
The Environment is the set of software and resources that allows you to process the transactions. The environment has real or test data and information depending on its type. 

Our platform has two separate environments: `Stage` and `Production`.

### Stage
This environment allows you to perform testing tasks. Here, the transactions never reach the real systems of the payment method providers. It's a safe way to try out tasks and flows.

* Base URL: `https://api.stage.bamboopayment.com`.

### Production
This environment enables you to carry out **real** transactions, which the actual system of your payment methods processes. Before you begin processing transactions in this environment, we highly recommend testing in `Stage`.

* Base URL: `https://api.bamboopayment.com`.

{{% alert title="Note" color="info"%}}
Our documentation uses `{environment_api}` to denote the URLs where the services are exposed. You should substitute this with the URL that corresponds to your operational environment.
{{% /alert %}}

## Form
A _Form_ is a web component that allows you to embed a set of fields to tokenize a card or perform a purchase using a payment method. For more information, refer to [Forms](../forms.html).

## FX Service
_Foreign Exchange_, often abbreviated as _FX_, represents the prevailing rate for converting one country's currency into another. Our platform updates this rate regularly under the regulations of the destination country.

## Merchant and accounts
A _Merchant_ is a business that hires Bamboo Payment to receive electronic payments using any of the models available.

An _Account_ is the segmentation of the merchant's business. For example:

* Processing countries
* Branches
* Business Lines
* Payment methods
* Merchant codes provided by card processors
* Business 

By default, a merchant who hires Bamboo System receives a _**Merchant Identificator**_ and an _**Account**_ that allows them to process transactions. Then, you can create as many accounts as needed to meet business requirements.

{{% alert title="Note" color="info"%}}
For settlement and billing purposes, Bamboo Payment will consider the total of the transactions made by a merchant's accounts.
{{% /alert %}}

### Crossboder merchant
A _Crossboder merchant_ is a business situated outside the processing country. For instance, a company that is legally established in the United States but conducts its operations in Uruguay, Argentina, and Brazil.

These merchants process under the [Payfac model](#payfac-model) and can process in **USD** or local currency.

### Local merchant
A _Local merchant_ is a business situated in the processing country.

These merchants can process under the [Payfac](#payfac-model) or [Gateway models](#gateway-model) using local currency.

## Gateway model
In the _Gateway model_, the acquirer or payment method pays directly to the merchant's accounts. The merchant and acquirer (or payment method) implement their settlement process in this model.

## Payfac model
Refers to a _Payment Facilitator_ model, in which the merchant is a Bamboo sub-merchant with whom they sign a commercial agreement. For settlement in this model, the acquirer or payment facilitator makes payment to Bamboo, and Bamboo pays the merchant.

## Tenant
A _Tenant_ refers to the processing channel in Bamboo, which can be Crossborder (operates in multiple countries and uses the conversion rate) or local.

## Tokenization
Regarding data security, tokenization involves substituting a sensitive element with its non-sensitive counterpart. This non-sensitive element, the token, is produced through tokenization. This token holds no inherent value and lacks significance except for the entity responsible for its creation. In the unfortunate event of a security breach leading to the theft of these numbers, they hold no utility for the unauthorized party, as they cannot be exploited for their purposes.

Since the _token_ is a reference or identifier assigned to a stored card by the system, it is unique for each pair of "merchant/token"; when a customer registers their card with two different merchants, each merchant will receive an additional _token_. This makes it impossible for a merchant to use the _tokens_ from one customer for any other purpose.

## Unique Identifier (UniqueID) {#UniqueID}
The Unique Identifier allows you to avoid duplicate transactions, such as purchase operations, when there is a failure while getting the response from Bamboo and you retry the request.

The goal of the Unique Identifier is to identify the transaction, and in case of a connection failure and the transaction is approved in our system, our API responds with the result of the previously processed purchase. It avoids the creation of a new one.

The `UniqueID` parameter is not required; nevertheless, it is strongly recommended to include it in each request. You can define any alphanumeric value as long as you don't use it in other transactions.

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