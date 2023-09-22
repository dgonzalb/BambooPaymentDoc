---
title: "Planes de Fidelización"
linkTitle: "Planes de Fidelización"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos utilizando Planes de Fidelización como _SoySantander_ u _OCA Metros_.
weight: 20
tags: ["subtopic"]
--- 

## SoySantander
_SoySantander_ permite a los clientes utilizar puntos para pagar el monto parcial o total de una compra. Utilizando nuestra API, puede crear comprar y consultar el número de puntos de un cliente.

### Solicitud de Token {#token-request}
El primer paso es obtener un token válido para realizar la transacción. Si la compra es mixta, obtenga el token como se explica en [Clientes](/es/docs/purchase-workflow/customer-types.html). En caso contrario, invoque el método `GetLoyaltyToken` de la librería `PWCheckout`.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `loyaltyPlanId` | `numeric` | Sí | Identificador del Plan de fidelización. |
| `LoyaltyPlanUserIdentification` | `string` | Sí | Identificador del usuario en el Plan de fidelización. _Santander_ genera y notifica este valor utilizando un algoritmo. |
| `email` | `string` | Sí | Dirección de correo electrónico del cliente. |

Ejemplo:
<br>

```html
<script type=”text/javascript”>
    PWCheckout.GetLoyaltyToken(1, "ExampleLoyaltyPlanUserId", "email@bank.com");
</script>
```

### Compras con puntos _SoySantander_ {#purchases-with-_soysantander_-points}
Una vez tenga el token asociado con el Plan de fidelización [Cree una compra]({{< ref uy-cards.md >}}) usándolo. Además, incluya el objeto `LoyaltyPlan` con el número de puntos a redimir y el identificador del usuario en el Plan de fidelización.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | Token generado como se explicó en [solicitud del token](#token-request). |
| `Order` | `string` | Sí | Número de orden de la compra. |
| `Amount` | `number` | No | Monto de la compra. Envíe este parámetro para compras mixtas (puntos + una tarjeta). En caso contrario, omita este campo.<br>Si necesita incluir decimales en el monto, concatene los dígitos decimales sin el punto decimal. Ejemplo `12,25` > `1225`. |
| `Currency` | `string` | No | Moneda de la compra en formato ISO-4217. Encuentre los posibles valores en la tabla [Monedas](/es/docs/payment-methods/uruguay.html#currencies).<br>Envíe este parámetro para compras mixtas (puntos + una tarjeta). En caso contrario, omita este campo. |
| `Capture` | `boolean` | Sí | Envíe `true` en este parámetro ya que el plan las compras por plan de fidelización no soportan preautorización. |
| `LoyaltyPlan` → `LoyaltyPlanId` | `numeric` | Sí | Identificador del Plan de fidelización. |
| `LoyaltyPlan` → `Amount` | `numeric` | Sí | Total de puntos a redimir. |
| `LoyaltyPlan` → `LoyaltyPlanUserIdentification` | `string` | Sí | Identificador del usuario en el Plan de fidelización. _Santander_ genera y notifica este valor utilizando un algoritmo. |

{{% alert title="Info" color="info"%}}
El resultado de una compra mixta depende del procesamiento de puntos y tarjetas. Si la entidad adquirente rechaza cualquiera de estos procesos, se rechazará toda la compra.
{{% /alert %}}

#### Ejemplo del Request {#request-example} 
```json
{
    "TrxToken":"OT_02_kYv0qTHckRiZ4wjCz5NguZRuwFLSIrQc4jiYpVJ8SzQ_", 
    "Order":"17030613595101621fb",
    "Capture":true,
    "LoyaltyPlan": {
           "LoyaltyPlanId":1,
           "Amount":100,
           "LoyaltyPlanUserIdentification": "eyd1c2VyaWQnOid0ZXN0QGRvbWFpbi5jb20nfQ==",
     }
}
```

#### Ejemplo del Request para compras mixtas {#request-example-for-mixed-purchases}

```json
{
    "TrxToken":"OT_01_kYv0qTHckRiZ4wjCz5NguZRuwFLSIrQc4jiYpVJ8SzQ_", 
    "Order":"17030613595101621fb",
    "Amount": 123400, 
    "Currency":"UYU", 
    "Capture":true,
    "LoyaltyPlan": {
           "LoyaltyPlanId":1,
           "Amount":120,
           "LoyaltyPlanUserIdentification": "eyd1c2VyaWQnOid0ZXN0QGRvbWFpbi5jb20nfQ==",
     }
}
```

### Consulting the number of points
Para obtener el número de puntos disponibles de un usuario, cree un request `POST` a la siguientes URL:

* **Producción**: `https://api.bamboopayment.com/v1/api/LoyaltyPlan/{{LoyaltyPlan-ID}}/Balance`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/LoyaltyPlan/{{LoyaltyPlan-ID}}/Balance`

Donde `{{LoyaltyPlan-ID}}` es el identificador del plan de fidelización que desea consultar. Además, recuerde utilizar la autenticación mostrada en [operaciones de compra]({{< ref Purchase-Operations.md >}}).

#### Parámetros del Request {#request-parameters}
Incluya los siguientes parámetros en el request.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `LoyaltyPlanId` | `numeric` | Sí | Identificador del Plan de fidelización. |
| `LoyaltyPlanUserIdentification` | `string` | Sí | Identificador del usuario en el Plan de fidelización. _Santander_ genera y notifica este valor utilizando un algoritmo. |
| `TrxToken` | `string` | Sí | Token generado como se explicó en [solicitud del token](#token-request). |

#### Ejemplo del Request {#request-example-1} 

```json
{
  "LoyaltyPlanId": 1,
  "LoyaltyPlanUserIdentification": "eyJDbGllbnRUb2tlbiI6Ik9UX19yR1NFV0VUeV9yNDhBbS10bjdIdUIzWlFIVTd4MkJXbzRqaVlwVko4U3pRXyIsIlR5cGUiOiXXXXXXXXXX",
  "TrxToken": "OT__ue2pwtim4aywkM6SWFI3g8YdDsuhfC2i4jiYpVJ8SzQ_"
}
```

#### Ejemplo del Response {#response-example}
El parámetro `Balance` en el response tiene los puntos disponibles del usuario.

```json
{
  "LoyaltyPlanBalance": {
    "ResponseCode": 0,
    "LoyaltyPlanId": 1,
    "Name": "Soy Santander",
    "LoyaltyPlanUserIdentification": "eyJDbGllbnRUb2tlbiI6Ik9UX19yR1NFV0VUeV9yNDhBbS10bjdIdUIzWlFIVTd4MkJXbzRqaVlwVko4U3pRXyIsIlR5cGUiOiXXXXXXXXXX",
    "Balance": 6954.0
  },
  "Errors": []
}
```

## OCA Metros
OCA Metros es el plan de fidelización que ofrece OCA que permite a los clientes realizar compras utilizando puntos y una tarjeta.

### Consideraciones {#considetrations}
Cuando utilice OCA Metros, tenga en cuenta lo siguiente.

* Los reembolsos con OCA Metros deben ser totales.
* No hay preautorizaciones con OCA Metros.
* Envíe los Puntos como números sin decimales.
* Sólo puede utilizar OCA Metros para tarjetas MasterCard emitidas por OCA.

### Compras con _OCA Metros_ {#purchases-with-_oca-metros_}
Para crear una compra con Metros, incluya el parámetro `OCAMetros` con el número de OCA Metros que desea redimir en la estructura `MetadataIn` del objeto `Purchase`. Para más información sobre la creación de la compra, consulte [tarjetas crédito y débito]({{< ref uy-cards.md >}}).

El siguiente ejemplo muestra cómo utilizar el parámetro y cómo obtener el resultado:

```json
{
	"TrxToken":"OT__Hj3J8kzK1CFSv4SyMqSyUkc1WfJpjJf84jiYpVJ8SzQ_",
	"Capture": true,
	"MetadataIn" : {
        "OCAMetros": "12"
    },
	"Order": "20201229",
	"Amount":"1000",
	"CustomerIP": "127.0.0.1",
	"Currency":"USD",
	"Installments": 1
}
```


