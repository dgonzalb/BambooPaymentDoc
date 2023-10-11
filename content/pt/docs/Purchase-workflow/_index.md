---
title: "API de compras"
date: 2023-03-02T08:28:16-05:00
Description: >
  Es posible generar una compra utilizando nuestra API. El _tipo de cliente_ y el _tipo de flujo_ dirigen el flujo de trabajo de la compra.
weight: 40
---

## Tipo de cliente {#customer-type}
Sin importar el tipo de flujo, puede tener clientes anónimos o registrados. Los clientes anónimos no están registrados en el sitio web y hacen una compra por única vez. Los clientes registrados son compradores registrados en el sitio web, de tal manera que pueden ser identificados y tener funcionalidades adicionales como recurrencias.

## Tipo de flujo {#flow-type}
Se puede utilizar dos tipos diferentes de flujos para autorizar una compra:

* API
* Redirect

{{% alert title="Nota" color="info"%}}
El tipo de flujo depende de cada medio de pago. Se especifica en la [tabla de medios de pago por país](/es/docs/getting-started/payment-methods.html) en la columna _**FLOW**_.
{{% /alert %}}

### Flujo API {#api-flow}
Al invocar la API para iniciar una compra, la respuesta de la invocación proporcionará directamente un estado, que podrá ser final o parcial.

![PrintScreen](/assets/APIFlow_es.png)

Para las compras utilizando API, puede usar cualquiera de la siguientes opciones:

* [Creación de la compra]({{< ref "Purchase-Operations.md" >}}), que puede ser local o CrossBorder.
* [Compra Directa]({{< ref "Direct-Purchase.md" >}})
* [Preview de la compra]({{< ref "Purchase-Preview.md" >}})

### Flujo Redirect {#redirect-flow}
Al invocar la API para iniciar una compra, se obtendrá un _CommerceAction_. Este _CommerceAction_ indica que el comercio necesita realizar los pasos necesarios para avanzar en el proceso de compra. En este caso, la API retorna una URL asociada al _CommerceAction_ para redirigir al cliente para continuar con el pago.

![PrintScreen](/assets/RedirectionFlow_es.png)

Para la Compra Redirect, consulte [flujo de pagos por Redirect]({{< ref "Redirect-Purchase.md" >}}).