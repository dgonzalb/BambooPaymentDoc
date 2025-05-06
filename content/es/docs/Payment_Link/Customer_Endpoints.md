---
title: "Operaciones sobre Cliente"
linkTitle: "Operaciones sobre Clientes"
date: 2025-05-06T12:00:00-05:00
description: >
  Interacciones con la API para gestionar clientes (crear link de registro, obtener y eliminar datos).
weight: 20
tags: ["subtopic"]
---

## Crear Link de Registro de Tarjeta

Permite generar un enlace para que un cliente registre su tarjeta.

### URL de solicitud

- **Producción**: `https://h2h.bamboopayment.com/api/v1/customers/account-link`
- **Stage**: `https://h2h.stage.bamboopayment.com/api/v1/customers/account-link`

### Método: `POST`

### Headers

<br />

> Recuerda incluir la **Clave Privada del Comerciante** en los encabezados de la solicitud. <br /> Para más detalles, consulta nuestra [Guía de Autenticación]({{< ref "Authentication.md" >}}).

### Body

| Parámetro         | Tipo     | ¿Requerido? | Descripción                                             |
|-------------------|----------|-------------|---------------------------------------------------------|
| `customer`        | objeto   | Sí          | Información del cliente a registrar                     |
| `accountLinkType` | string   | Sí          | Debe ser `"qr"` para código QR                          |
| `validForMinutes` | integer  | No          | Tiempo de validez del link (default: 15 minutos)        |

### Ejemplo de Request

```json
{
  "customer": {
    "identifier": "juan.perez@gmail.com",
    "email": "juan.perez@gmail.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "documentTypeId": 2,
    "documentNumber": "11211234",
    "phoneNumber": "27101234",
    "billingAddress": {
      "detail": "Rambla 1234",
      "country": "Uruguay",
      "state": "Montevideo",
      "city": "Montevideo",
      "postalCode": "11300"
    }
  },
  "accountLinkType": "qr"
}
```

### Ejemplo de Response

```json
{
  "customerId": "7c35b44a-844e-40f1-84bd-004404f6bd98",
  "redirectUrl": "https://checkout.stage.bamboopayment.com/#?customerId=7c35b44a-844e-40f1-84bd-004404f6bd98",
  "validForMinutes": 15,
  "isSuccess": true
}
```

---

## Obtener Datos de Cliente

Consulta los datos de un cliente previamente registrado.

### URL de solicitud

- `GET /customers/{CustomerIdentifier}`

### Headers

<br />

> Recuerda incluir la **Clave Privada del Comerciante** en los encabezados de la solicitud. <br /> Para más detalles, consulta nuestra [Guía de Autenticación]({{< ref "Authentication.md" >}}).

### Ejemplo de Request

```
GET https://h2h.stage.bamboopayment.com/api/v1/customers/juan.perez%40gmail.com
```

### Ejemplo de Response

```json
{
  "customer": {
    "identifier": "juan.perez@gmail.com",
    "email": "juan.perez@gmail.com",
    "firstName": "Juan",
    "lastName": "Pérez",
    "documentTypeId": 2,
    "documentNumber": "11211234",
    "phoneNumber": "27101234",
    "billingAddress": {
      "detail": "Rambla 1234",
      "country": "Uruguay",
      "state": "Montevideo",
      "city": "Montevideo",
      "postalCode": "11300"
    }
  },
  "isSuccess": true
}
```

---

## Eliminar Datos de Cliente

Elimina toda la información asociada a un cliente.

### URL de solicitud

- `DELETE /customers/{CustomerIdentifier}`

### Headers

<br />

> Recuerda incluir la **Clave Privada del Comerciante** en los encabezados de la solicitud. <br /> Para más detalles, consulta nuestra [Guía de Autenticación]({{< ref "Authentication.md" >}}).

### Ejemplo de Request

```
DELETE https://h2h.stage.bamboopayment.com/api/v1/customers/juan.perez%40gmail.com
```

### Ejemplo de Response

```json
{
  "isSuccess": true
}
```
