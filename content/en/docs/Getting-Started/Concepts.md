---
title: "Concepts"
linkTitle: "Concepts"
date: 2023-03-02T11:40:29-05:00
Description: >
  Understand the concepts behind any integration with Bamboo Payments.
weight: 10
---

## Acquirer
An acquirer is a payment faciliator that allows you to perform digital payments. Furthermore, the acquirer is the responisble of the payments and manages the settlement to your banking account.

## API
An API (from the acronym **A**pplication **P**rogramming **I**nterface) is a set of methods and definitions that allows you to interact with a system through some input data. In our case, the API is defined to allow you process the information of a transaction to recieve the response related to it.

## Authentication
Auhtentication is the procedure to validate the identity of a merchant. All merchants integrated with our platform receive a pair of keys for each associated account _Private Account Key_ and _Public Account Key_.

Each one of these keys identifies the merchant account in our system in each transaction performed to determine wheter the merchant is authorized to operate and what are the conditions of the integration (For example, what payment methods are enabled for the merchant).

### Private Account Key
The Private Account Key is a unqiue identifier that must be attached to each private request (server to server) where critical operations are available, such as initiating or confirming a transaction, accessing merchant transaction information, creating or deleting subscription plans, etc.

{{% alert title="Important" color="warning"%}}
The _Private Account Key_ must not be shared or publicly exposed at any time, to not compromise the security of the integration. **It is the merchant’s responsibility to keep it safe**.
{{% /alert %}}

### Public Account Key
The Public Account key is unique identifier that must be attached to each public request (made from the web interface) for query operations or for data capture request.

Furthermore, this key is also used when invoking the `PWCheckout` Javascript library.

## Checkout
The checkout is the form where your customers select the payment method they want to use to complete the payment. According to the payment method, this form allwos you to collect its information and send it to process the transaction.

## Environment
The Environment is the set of software and resources that allows you to process the transactions. Depending on its type, the environment has real or test data and information. Our platform has two separate environments: `Stage` and `Production`.

### Stage
This environment allows you to perform testing tasks. Here, the transactions never reach the real systems of the payment method providers. It's a safe way to try out tasks and flows.

* Base URL: `https://api.stage.bamboopayment.com`.

### Production
This environment allows you to perform **real** transactions and they are processed by the actual system of the payment methods you have. Before starting to process transactions in this enviroment, it's strongly recommended to test in `Stage`.

* Base URL: `https://api.bamboopayment.com`.

{{% alert title="Note" color="info"%}}
Throughout our documentation, we refer to the URLs where the services are exposed as `{environment_api}`, this must be replaced by the URL corresponding to the environment where you are working.
{{% /alert %}}

## Form
A _Form_ is a web component that allows you to embed a set of fields to tokenize a card or perform a purchase using a payment method. For more information, refer to [Forms]().

## FX Service
_Foreign Exchange_ or _FX_ refers to the current rate to convert one country's currency to another. This value is updated accoriding to destination country regulations.

## Merchant and accounts
A _Merchant_ is the business who hires Bamboo Payment to recieve electronical payments using any of the models available.

An _Account_ is the segmentation of the merchant's business. For example:

* Processing countries
* Branches
* Business Lines
* Payment methods
* Merchant codes provided by card processors
* Business 

By default, a merchant who hires Bamboo System recieves a _**Merchant Identificator**_ and an _**Account**_ that allows them to process transactions. Then, the merchants are free to create as many accounts as they need to meet business requiriemnts.

{{% alert title="Note" color="info"%}}
For settlement and billing purposes, Bamboo Payment will consider the total of the transactions made by all the accounts of a merchant.
{{% /alert %}}

### Crossboder merchant
A _Crossboder merchant_ is a business that is not located in the processing country. For example, a business who is legally constituted in United Stataes but it has operations in Uruguay, Argentina, and Brazil.

These merchants process under the [Payfac model](#payfac-model) and can porcess in **USD** or local currency.

### Local merchant
A _Local merchant_ is a business that is located in the same country where they process.

These merchants can process under the [Payfac model](#payfac-model) or [Gateway model](#gateway-model) using local currency.

## Gateway model


## Payfac model


## Tenant
A _Tenant_ in Bamboo refers to ...