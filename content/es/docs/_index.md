---
title: "Payins"
linkTitle: "Guía de Integración de Payins"
date: 2023-03-02
description: >
  Bamboo Payment ofrece a los comercios la posibilidad aceptar pagos soportando todos los medios de pago disponibles en cada país.
menu:
  main:
    name: Payins
    weight: 10     
---

* Tarjetas débito/crédito locales e internacionales
* Transferencias bancarias
* Pagos en efectivo
* E-wallets (Billeteras electrónicas)

<img src="https://bamboopaymentsystems.com/wp-content/themes/Bamboo_Theme/images/pci-logo.png" alt="Bamboo PCI certified by GMsectec" style="width: 20%; height:auto;">


## Paises disponibles {#available-countries}
Maximice la cobertura de mercado con soluciones de pago locales en **MM** países de América Latina.

Las compaías globales están aprovechando el crecimiento exponencial del comercio electrónico en América Latin conectándose a métodos de pago locales a través de una única API de Bamboo.

 {{< Countries/countriesMap_es >}}

 <script>
  window.onload = function() {
    var phtml = document.getElementById('available-countries').nextSibling.nextSibling.innerHTML.replace('MM', document.getElementsByClassName('map-point').length);
    document.getElementById('available-countries').nextSibling.nextSibling.innerHTML = phtml;
  }
</script>