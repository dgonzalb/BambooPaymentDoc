---
title: "Tokens de Red"
linkTitle: "Tokens de Red"
date: 2023-08-02T08:43:44-05:00
Description: >
  Bamboo soporta Tokens de Red para mejorar la seguridad de los pagos con tarjetas. Esta tecnología reemplaza la información sensible de las tarjetas por tokens seguros, reduciendo significativamente el riesgo de filtraciones de datos sensibles en el ecosistema de pagos.
weight: 60
tags: ["subtopic"]
---
Los Tokens de Red reemplazan la información sensible de las tarjetas durante el procesamiento de transacciones, lo que mejora significativamente la seguridad en todo el ecosistema de pagos. Al sustituir los números reales de las tarjetas por tokens seguros, este método reduce el riesgo de exponer información financiera y minimiza las posibilidades de fraude. En lugar de utilizar los números reales de las tarjetas, Bamboo soporta el envío de Tokens de Red al adquirente. 

## Objeto NetworkToken {#networktoken-object}

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:-------------:|-------------|
| `Token` | `string` | Sí | Token de red de la tarjeta. |
| `Cryptogram` | `string` | Sí | El criptograma único generado por el emisor para el token de red utilizado en la transacción. |
| `Expiration_Month` | `integer` | Sí | Número de dos dígitos que representa el mes de vencimiento del token de red. |
| `Expiration_Year` | `integer` | Sí | Número de dos dígitos que representa el año de vencimiento del token de red. |
| `CardHolderName` | `string` | Sí | Nombre del titular de la tarjeta. |

### Ejemplo de Solicitud {#request-example}
A continuación se muestra un ejemplo de un request usando la Direct Purchase con un token de red:

{{< highlight json >}}
{{< Payins/V3/NetworkTokens/networkToken_request >}}
{{< /highlight >}}