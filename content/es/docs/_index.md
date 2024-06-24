---
title: "Payins"
linkTitle: "Guía de Integración de Payins"
date: 2023-03-02
description: >
  Bamboo Payment ofrece a los comercios la posibilidad de aceptar pagos soportando todos los medios de pago disponibles en cada país.
menu:
  main:
    name: Payins
    weight: 10     
---

* Tarjetas débito/crédito locales e internacionales
* Transferencias bancarias
* Pagos en efectivo
* E-wallets (Billeteras electrónicas)


## Países disponibles {#available-countries}
<div id="countries">Maximice la cobertura de mercado con soluciones de pago locales en <strong>MM</strong> países de Latinoamérica.</div><br>

Las compañías globales están aprovechando el crecimiento exponencial del comercio electrónico en Latinoamérica conectándose a medios de pago locales a través de una única API de Bamboo.

 {{< Countries/countriesMap_es >}}

 <script>
  window.onload = function() {
    document.getElementById('countries').innerHTML = document.getElementById('countries').innerHTML.replace('MM', document.getElementsByClassName('map-point').length);
  }
</script>