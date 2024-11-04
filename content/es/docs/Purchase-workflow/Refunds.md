---
title: "Reembolsos"
linkTitle: "Reembolsos"
date: 2024-08-02T08:46:32-05:00
Description: >
  Los reembolsos permiten devolver una compra confirmada, ya sea de forma parcial o total.
weight: 40
---

## ¿Cómo reembolsar una compra? {#refund-a-purchase}
Este endpoint permite procesar un reembolso para una compra previamente aprobada. Es posible devolver el valor total o una parte de la transacción original. La operación de _**reembolso**_ solo está disponible para compras con estado _APPROVED_.

### URL de la solicitud {#request-url}
Se requiere hacer una petición **POST** a las siguientes URLs según sus necesidades:

* **Producción**: `https://api.bamboopayment.com/v3/api/purchase/{{TransactionId}}/refund`
* **Pruebas**: `https://api.stage.bamboopayment.com/v3/api/purchase/{{TransactionId}}/refund`

{{% alert title="Versiones anteriores" color="info"%}}
En caso de requerir información sobre la V2 de Refunds, consulte nuestra [sección Legacy]({{< ref Refunds-and-voids.md >}})
{{% /alert %}}

| Parámetro | Tipo | Obligatorio | Descripción |
|---|---|---|---|
| `Amount` | `integer` (64 bits) | No | Valor a reembolsar (Reembolso parcial). Si no se envía este parámetro, el reembolso será por el valor total de la compra.<br>Para incluir decimales, se concatenan sin el punto. Ejemplo: `12,25` -> `1225`.<br>Este valor **no puede** ser mayor que el valor original de la compra. |
| `MetadataIn` | `object` | No | Metadatos adicionales para la transacción de reembolso. |
| `MetadataIn` → `Description` | `string` | No | Descripción opcional del reembolso. |

#### Ejemplo de solicitud 

{{< highlight json >}}
{{< Payins/V3/Refunds/refund_request >}}
{{< /highlight >}} 

### Parámetros de respuesta

| Parámetro | Tipo | Descripción |
|-----------|------|-------------|
| `TransactionId` | `string` | Identificador único de la transacción de reembolso. |
| `Result` | `string` | Resultado de la operación de reembolso (ej. `COMPLETED`). |
| `Status` | `string` | Estado del reembolso (ej. `APPROVED`, `PENDING`). |
| `ErrorCode` | `string` | Código de error si el reembolso falló (nulo si fue exitoso). |
| `ErrorDescription` | `string` | Descripción del error si el reembolso falló (nulo si fue exitoso). |
| `Created` | `string` | Fecha y hora de inicio del reembolso. |
| `AuthorizationDate` | `string` | Fecha y hora de autorización del reembolso. |
| `AuthorizationCode` | `string` | Código de autorización de la transacción de reembolso. |
| `Amount` | `integer` | Valor reembolsado. |
| `Currency` | `string` | Moneda del reembolso. |
| `MetadataOut` | `object` | Metadatos adicionales devueltos con la respuesta del reembolso. |

#### Ejemplo de respuesta

**Resultado:** `COMPLETED` - **Estado:** `APPROVED`

{{< highlight json >}}
{{< Payins/V3/Refunds/refundApproved_response >}}
{{< /highlight >}} 

<br>

* **Estado Pendiente:** Un reembolso puede quedar en estado pendiente según el método de pago y el adquirente. Esto significa que, aunque se ha iniciado la solicitud, es posible que no se procese de inmediato.

**Resultado:** `COMPLETED` - **Estado:** `PENDING`

{{< highlight json >}}
{{< Payins/V3/Refunds/refundPending_response >}}
{{< /highlight >}} 

<br>

* **Notificación del Resultado Final:** El resultado final del reembolso se notificará a través de un [webhook]({{< ref "Notification-Webhooks.md" >}}). Esto garantiza que reciba actualizaciones en tiempo real sobre el estado de su solicitud, incluso si inicialmente aparece como pendiente.

{{% alert title="Importante" color="info"%}}
La disponibilidad y los tiempos de procesamiento de los reembolsos pueden variar según el medio de pago y el país. Para obtener información más detallada, consulte la sección [medios de pago por país]({{< ref "../Payment-methods/_index.md" >}})
{{% /alert %}}