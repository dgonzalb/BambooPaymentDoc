---
title: "Códigos de error del API"
linkTitle: "Códigos de error"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  Este artículo muestra información sobre los códigos de error que puede encontrar al utilizar la integración de Payouts.
weight: 40
---

| Código de error | Descripción |
|---|---|
| `200` | Éxito. |
| `400` | Request incorrecto. |
| `401` | No autorizado. |
| `409` | Conflicto. |
| `812` | Declinado por validación de documento. |
| `813` | Declinado por validación de cuenta. |
| `814` | Declinado por validación de país. |
| `815` | Declinado por cumplimiento. |
| `816` | ID de referencia ya utilizada.<br>Este error no se muestra en la [Consola de Payouts](../payouts-merchant-console.html) pero se devuelve a través de la API. |. |
| `901` | La cuenta bancaria está cerrada. |
| `902` | Cuenta bancaria no válida. |
| `903` | Tipo de cuenta bancaria no válida. |
| `904` | Sucursal bancaria no válida. |
| `905` | Límite mensual del usuario excedido. |
| `906` | Rechazado por solicitud del comercio. |
| `907` | La cuenta bancaria no puede recibir transferencias. |
| `908` | Documento de beneficiario no válido. |
| `909` | El nombre del beneficiario no coincide con los datos bancarios. |
| `910` | Llave PIX no válida. |
| `911` | Se ha solicitado un cambio de estado no válido. |
| `912` | Saldo insuficiente. |
| `999` | Error. |