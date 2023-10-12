---
title: "Payins"
linkTitle: "Guia de Integração de Payins"
date: 2023-03-02
description: >
  Bamboo Payment oferece aos comerciantes a possibilidade de aceitar pagamentos, suportando todos os meios de pagamento disponíveis em cada país.
menu:
  main:
    name: Payins
    weight: 10     
---

* Cartões de débito/crédito locais e internacionais
* Transferências bancárias
* Pagamentos em dinheiro
* E-wallets (Carteiras eletrônicas)

<img src="https://bamboopaymentsystems.com/wp-content/themes/Bamboo_Theme/images/pci-logo.png" alt="Bamboo PCI certified by GMsectec" style="width: 20%; height:auto;">


## Países disponibles {#available-countries}
Maximize a cobertura de mercado com soluções de pagamento locais em MM países da América Latina.

Empresas globais estão aproveitando o crescimento exponencial do comércio eletrônico na América Latina, conectando-se a meios de pagamento locais por meio de uma única API da Bamboo.

 {{< Countries/countriesMap_pt >}}

 <script>
  window.onload = function() {
    var phtml = document.getElementById('available-countries').nextSibling.nextSibling.innerHTML.replace('MM', document.getElementsByClassName('map-point').length);
    document.getElementById('available-countries').nextSibling.nextSibling.innerHTML = phtml;
  }
</script>