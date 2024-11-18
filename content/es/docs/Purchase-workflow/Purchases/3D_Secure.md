---
title: "3DS pass-through"
linkTitle: "3DS Pass-through"
date: 2024-08-02T08:43:44-05:00
Description: >
  Bamboo soporta 3D Secure (3DS) como un pass-through con los adquirentes en Latinoamérica enviando le resultado de la autenticación del titular de la tarjeta al completar el pago.
weight: 60
tags: ["subtopic"]
---

3D Secure (3DS) es un protocolo de autenticación diseñado para aumentar la seguridad de las compras con tarjeta. En el flujo de 3DS Pass-through de Bamboo, la autenticación se maneja a través de un proveedor de autenticación externo, conocido como MPI Externo. Este método permite a los comercios utilizar los datos de autenticación de terceros y enviarlos directamente al adquirente. Es una solución ideal para comercios que prefieren y requieren un control total del proceso de autenticación.

## Objeto ThreeDS {#threeds-object}
### Campos de la Solicitud {#request-fields}

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:-------------:|-------------|
| `ThreeDSAuthMethod` | `string` | No | Método de autenticación 3D Secure utilizado: `"EXTERNAL"` o `"DISABLED"`. |
| `ThreeDS` | `object` | Sí | Información de 3D Secure cuando `ThreeDSAuthMethod="EXTERNAL"`. |
| `ThreeDS` → `Eci` | `string` | Sí | Código ECI de 3D Secure. |
| `ThreeDS` → `Xid` | `string` | Sí | Identificador de transacción 3D Secure. |
| `ThreeDS` → `Cavv` | `string` | Sí | Valor de Verificación de Autenticación del Titular de la Tarjeta (CAVV) en 3D Secure. |
| `ThreeDS` → `Version` | `string` | Sí | Versión del protocolo 3D Secure. |
| `ThreeDS` → `TransactionId` | `string` | Sí | ID de transacción en 3D Secure. |

### Ejemplo de Solicitud utilizando la [Compra Directa]({{< ref "purchase_v3.html" >}}#direct-purchase-for-pci-compliant-merchants){#request-example-using-the-purchase-for-pci-compliant-merchants}

{{< highlight json >}}
{{< Payins/V3/3DSecure/3ds_request >}}
{{< /highlight >}}


