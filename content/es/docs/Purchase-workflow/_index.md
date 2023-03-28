---
title: "Purchase workflow"
date: 2023-03-02T08:28:16-05:00
Description: >
  In Bamboo Payments, the purchase authorization workflow is driven by two factors. _Flow Type_ and _Customer Type_.
weight: 20
---

## Flow type
There are two different workflows that can be used to authorize a purchase:

* API
* Redirect

This depends on each payment method, it's specified in the payment methods table by country in the column _**FLOW**_.

### API
Show the flow

### Redirect
Show the flow

## Customer Type
There are two types of client:

* Anonymous users
* Registered users

### Anonymous users
An anonymous user is the one who is not registered in the site and makes a one-time purchase. In this case, you always must to ask for the card data to carry out the transaction.

### Registered users
Despite of the Anonymous users, this users are registered in the website, so can be identified and their card data can be associated to make other purchases without having to enter the data again.