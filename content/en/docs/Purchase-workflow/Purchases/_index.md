---
title: "Purchase operations"
linkTitle: "Purchase operations"
date: 2023-03-02T11:40:29-05:00
Description: >
  Learn how to create a purchase using the API flow by providing its basic information. Furthermore, explore the various operations available for existing purchases.
weight: 20
tags: ["parenttopic"]
---

Depending on the contract you have signed with _Bamboo Payment_ ([Gateway](/en/docs/getting-started/concepts.html#gateway-model) or [Payfac](concepts.html#payfac-model) model) and the countries where you process, you can create Local or CrossBorder purchases.

* A _Local purchase_ refers to those in which the currency of the payer and the currency of your store are equal. When your store and the buyer are in Uruguay, the currency for the purchase and the amount you receive will be in **UYU**.
* A _CrossBorder purchase_ refers to all purchases in which the currency of the payer is different from the currency that you have configured in your store. For example, if your store is in Uruguay, and the buyer is in Colombia, the purchase will be in **COP**, but you receive the amount in **UYU**.

Refer to the following topics to learn the operations you can perform using the Purchase API.