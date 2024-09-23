---
title: "Payins"
linkTitle: "Payins Integration Guide"
date: 2023-03-02
description: >
  Bamboo Payment lets merchants accept payments by supporting all the payment methods available in each country.
menu:
  main:
    name: Payins
    weight: 10       
---

* International and local credit/debit cards
* Bank transfers
* Cash payments
* E-wallets



## Available countries
<div id="countries">Maximize market coverage with local payment solutions in <strong>MM</strong> countries across Latin America.</div><br>

Global companies are leveraging exponential eCommerce growth in Latin America by connecting to Local Payment methods through Bamboo’s single API.

 {{< Countries/countriesMap_en >}}

 <script>
  window.onload = function() {
    document.getElementById('countries').innerHTML = document.getElementById('countries').innerHTML.replace('MM', document.getElementsByClassName('map-point').length);
  }
</script>