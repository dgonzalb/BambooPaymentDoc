---
title: "Compras"
linkTitle: "Compras"
date: 2023-03-02T11:40:29-05:00
Description: >
  Aprenda a crear una compra utilizando el flujo API proporcionando su información básica. Además, explore las distintas operaciones disponibles para las compras existentes.
weight: 20
tags: ["parenttopic"]
---

Dependiendo del contrato que haya firmado con _Bamboo Payment_ (modelo [Gateway](concepts.html#gateway-model) o [Payfac](concepts.html#payfac-model)) y de los países en los que procese, puede crear compras Locales o CrossBorder.

* Una _Compra Local_ se refiere a aquellas en las que la moneda del pagador y la moneda de su tienda son iguales. Cuando su tienda y el comprador están en Uruguay, la moneda de la compra y el importe que recibe es en **UYU**.
* Una _Compra CrossBorder_ se refiere a todas las compras en las que la moneda del pagador es diferente a la moneda que tiene configurada en su tienda. Por ejemplo, si su tienda está en Uruguay y el comprador está en Colombia, la compra será en **COP**, pero recibirá el importe en **UYU**.

Consulte los siguientes temas para conocer las operaciones que puede realizar con la API de compras.