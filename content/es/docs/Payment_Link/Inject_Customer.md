---
title: "Inyectar Cliente"
linkTitle: "Inyectar Cliente"
date: 2024-08-02T08:43:44-05:00
Description: >
  Aprende cómo utilizar el endpoint de Inyección de Cliente en la API de Link de Pago para asociar o actualizar información del cliente para un pago específico. Esto incluye el flujo de trabajo, parámetros de solicitud y ejemplos.
weight: 20
tags: ["subtopic"]
---

Después de crear una solicitud de pago, puede ser necesario vincular información del cliente a la misma. El endpoint de Inyección de Cliente te permite agregar o actualizar los datos del cliente para un pago específico.

#### Flujo de trabajo

1. **Crear un pago**: Usa el endpoint [Crear Enlace de Pago]({{< ref Create_Payment_Link.md >}}) para iniciar la solicitud de pago.
2. **Obtener el `paymentId`**: El `paymentId` estará incluido en la [respuesta a tu solicitud de Creación de Pago.]({{< ref Create_Payment_Link.md >}}#response)
3. **Inyectar información del cliente**: Usa el endpoint correspondiente para asociar los datos del cliente con el pago.

El pago se actualizará con los detalles del cliente, asegurando que el proceso de pago siguiente tenga acceso a esta información.

---

### URL de solicitud

Debes realizar una solicitud **PATCH** a las siguientes URLs según tu entorno:

- **Producción**: `https://h2h.bamboopayment.com/api/v1/payments/{paymentId}`
- **Stage**: `https://h2h.stage.bamboopayment.com/api/v1/payments/{paymentId}`

> **Nota:** Reemplaza `{paymentId}` con el identificador del pago que deseas actualizar.

---

## Parámetros de solicitud

| Parámetro           | Tipo       | ¿Requerido? | Descripción                                              |
|---------------------|------------|-------------|----------------------------------------------------------|
| `paymentId`         | `string`   | Sí          | Identificador único del pago a actualizar.               |
| `customer`          | `object`   | Sí          | Objeto que contiene la información del cliente a inyectar.|

#### Objeto Customer

| Parámetro                | Tipo       | ¿Requerido? | Descripción                                  |
|--------------------------|------------|-------------|----------------------------------------------|
| `identifier`             | `string`   | Sí          | Identificador único del cliente (por ejemplo, correo electrónico). |
| `email`                  | `string`   | No          | Dirección de correo electrónico del cliente. |
| `firstName`              | `string`   | No          | Nombre del cliente.                          |
| `lastName`               | `string`   | No          | Apellido del cliente.                        |
| `documentTypeId`         | `integer`  | No          | Tipo de documento. Revisa la [tabla de tipos de documentos](/es/docs/payment-methods/uruguay.html#document-types) para Uruguay. |
| `documentNumber`         | `string`   | No          | Número del documento.                        |
| `phoneNumber`            | `string`   | No          | Número de teléfono del cliente.              |
| `billingAddress`         | `object`   | No          | Detalles de la dirección de facturación (ver Objeto Address).|
| `shippingAddress`        | `object`   | No          | Detalles de la dirección de envío (ver Objeto Address).|

#### Objeto Address

| Parámetro      | Tipo     | ¿Requerido? | Descripción                                    |
|----------------|----------|-------------|------------------------------------------------|
| `detail`       | `string` | No          | Dirección (calle y número).                   |
| `country`      | `string` | No          | País de la dirección.                         |
| `state`        | `string` | No          | Estado o departamento de la dirección.        |
| `city`         | `string` | No          | Ciudad de la dirección.                       |
| `postalCode`   | `string` | No          | Código postal de la dirección.                |

### Ejemplo de solicitud

{{< highlight json >}}
{{< Payins/PaymentLink/Inject_Customer_Request >}}
{{< /highlight >}}

## Respuesta

| Campo              | Tipo       | Descripción                                           |
|--------------------|------------|-------------------------------------------------------|
| `paymentId`        | `string`   | El ID del pago que fue actualizado.                  |
| `redirectUrl`      | `string`   | URL para el siguiente paso en el proceso de pago.    |
| `validForMinutes`  | `integer`  | Tiempo restante (en milisegundos) para el enlace de pago. |
| `isSuccess`        | `boolean`  | Indica si la solicitud fue exitosa.                  |
| `errors`           | `array`    | Lista de errores de validación, si los hay.          |

### Ejemplo de Response

{{< highlight json >}}
{{< Payins/PaymentLink/Inject_Customer_Response >}}
{{< /highlight >}} 