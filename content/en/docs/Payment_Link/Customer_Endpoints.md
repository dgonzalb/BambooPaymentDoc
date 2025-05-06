---
title: "Customer Operations"
linkTitle: "Customer Operations"
date: 2025-05-06T12:00:00-05:00
description: >
  API interactions to manage customers (create registration link, retrieve and delete data).
weight: 20
tags: ["subtopic"]
---

## Create Card Registration Link

Generates a link for a customer to register their card.

### Request URL

- **Production**: `https://h2h.bamboopayment.com/api/v1/customers/account-link`
- **Stage**: `https://h2h.stage.bamboopayment.com/api/v1/customers/account-link`

### Method: `POST`

### Headers

<br />

> Remember to include the **Merchant Private Key** in the request headers. <br /> For more details, refer to our [Authentication Guide]({{< ref "Authentication.md" >}}).

### Body

| Parameter         | Type     | Required? | Description                                          |
|-------------------|----------|-----------|------------------------------------------------------|
| `customer`        | object   | Yes       | Customer information to be registered                |
| `accountLinkType` | string   | Yes       | Must be `"qr"` to indicate a QR registration link    |
| `validForMinutes` | integer  | No        | Validity time for the link (default: 15 minutes)     |

### Example Request

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

### Example Response

```json
{
  "customerId": "7c35b44a-844e-40f1-84bd-004404f6bd98",
  "redirectUrl": "https://checkout.stage.bamboopayment.com/#?customerId=7c35b44a-844e-40f1-84bd-004404f6bd98",
  "validForMinutes": 15,
  "isSuccess": true
}
```

---

## Retrieve Customer Data

Fetches the data of a previously registered customer.

### Request URL

- `GET /customers/{CustomerIdentifier}`

### Headers

<br />

> Remember to include the **Merchant Private Key** in the request headers. <br /> For more details, refer to our [Authentication Guide]({{< ref "Authentication.md" >}}).

### Example Request

```
GET https://h2h.stage.bamboopayment.com/api/v1/customers/juan.perez%40gmail.com
```

### Example Response

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

## Delete Customer Data

Deletes all information associated with a customer.

### Request URL

- `DELETE /customers/{CustomerIdentifier}`

### Headers

<br />

> Remember to include the **Merchant Private Key** in the request headers. <br /> For more details, refer to our [Authentication Guide]({{< ref "Authentication.md" >}}).

### Example Request

```
DELETE https://h2h.stage.bamboopayment.com/api/v1/customers/juan.perez%40gmail.com
```

### Example Response

```json
{
  "isSuccess": true
}
```
