---
title: "Payins"
linkTitle: "Payins Integration Guide"
date: 2023-03-02
description: >
  Bamboo Payments let the merchants accept payments by supporting all the payment methods available in each country.
menu:
  main:
    name: Payins
    weight: 10     
---

* International and local credit/debit cards
* Bank transfers
* Cash payments
* E-wallets

### Available countries
Maximize market coverage with local payment solutions in **MM** countries across Latin America.

Global companies are taking advantage of exponential eCommerce growth in Latin America by connecting to Local Payment methods through Bamboo’s single API.

 {{< Countries/countriesMap_en >}}

 <script>
  window.onload = function() {
    var phtml = document.getElementById('available-countries').nextSibling.nextSibling.innerHTML.replace('MM', document.getElementsByClassName('map-point').length);
    document.getElementById('available-countries').nextSibling.nextSibling.innerHTML = phtml;
  }
</script>