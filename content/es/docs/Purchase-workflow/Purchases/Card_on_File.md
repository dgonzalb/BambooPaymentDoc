---
title: "Card on File"
linkTitle: "Card on File"
date: 2024-08-02T08:43:44-05:00
Description: >
  Utilice la función de Card On File (CoF, por sus siglas en inglés) para procesar pagos recurrentes, suscripciones y transacciones con un solo clic. Esto ayuda a los comerciantes a cumplir con las regulaciones de Visa y Mastercard y mejora las tasas de aprobación.
weight: 60
tags: ["subtopic"]
---

**Card On File (CoF)** es una funcionalidad que permite a los comerciantes procesar transacciones utilizando la información de la tarjeta del cliente para compras posteriores. Esta capacidad facilita varios tipos de transacciones dependiendo de quién inicie la transacción, ya sea el cliente o el comerciante.

## Resumen {#cof-overview}

Las redes de tarjetas requieren que los comerciantes incluyan identificadores específicos al utilizar credenciales de tarjetas almacenadas en la solicitud de pago. La funcionalidad de COF ayuda a establecer confianza, confirmando que los clientes han autorizado el almacenamiento de sus datos de tarjeta y los pagos posteriores.

Las transacciones de Card On File se pueden clasificar en tres tipos:

<img src="/assets/CoF/CoFTypeES.png" width="100%" alt="Tipos de CoF"/>


{{% alert title="Nota" color="info"%}}
Consulte con su referente de cuenta sobre la disponibilidad de la funcionalidad de Card On File según el país.
{{% /alert %}}

## Objeto **CardOnFile**
### Campos de Solicitud

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:-------------:|-------------|
| `CardOnFile` | `object` | No | Contiene información sobre la transacción de Card On File. |
| `CardOnFile` → `TransactionType` | `string` | Sí | Especifica el tipo de transacción de Card On File. Valores posibles: `"CIT"`, `"FIT"`, `"MIT"`. |
| `CardOnFile` → `NetworkTransactionId` | `string` | No | Identificador para el seguimiento de la transacción, puede ser una transacción de red o un acuerdo de suscripción. |


<br />

> **Nota:** El objeto `CardOnFile` es opcional. Las transacciones se procesarán normalmente si este objeto no se incluye en la solicitud. Sin embargo, incluirlo ayuda a mejorar las tasas de aprobación al identificar correctamente el tipo de transacción y cumplir con los requisitos de las redes de tarjetas.

### Tipos de Transacción

| | CIT | FIT | MIT |
|---|---|---|---|
| **Iniciador** | Cliente | Cliente | Comerciante |
| **Casos de Uso** | • Pagos con un solo clic<br>• Compras en portales de clientes<br>• Renovaciones manuales de suscripciones | • Inicio de una suscripción<br>• Configuración de donaciones recurrentes<br> | • Renovaciones de suscripciones<br>• Cuotas recurrentes de membresía<br>• Pagos programados en cuotas |
| **Autenticación** | Se recomienda autenticación. Puede [proporcionar los resultados de 3DS]({{< ref "3D_Secure.md" >}}) en la solicitud | Se recomienda autenticación. Puede [proporcionar los resultados de 3DS]({{< ref "3D_Secure.md" >}}) en la solicitud | No se necesita autenticación adicional después de FIT. Los datos de autenticación previos pueden ser referenciados usando NetworkTransactionId |
| **TransactionID de Autenticación** | Opcional | Opcional, pero se debe almacenar el `TransactionId` de la respuesta de 3DS | Opcional <br>(`TransactionId` del FIT original) |

#### Ejemplo de Solicitud para CIT (Transacción Iniciada por el Cliente) {#example-cit}

{{< highlight json >}}
{{< Payins/V3/Card_on_File/CIT >}}
{{< /highlight >}} 

#### Ejemplo de Solicitud para FIT (Primera Transacción Inicial) {#example-fit}

{{< highlight json >}}
{{< Payins/V3/Card_on_File/FIT >}}
{{< /highlight >}} 

#### Ejemplo de Solicitud para MIT (Transacción Iniciada por el Merchant/Comercio) {#example-mit}

{{< highlight json >}}
{{< Payins/V3/Card_on_File/MIT >}}
{{< /highlight >}} 

<br /> 

> La respuesta sigue el formato estándar de respuesta. Consulte [Crear una Compra]({{< ref "purchase_v3.md#response" >}}) para más detalles.