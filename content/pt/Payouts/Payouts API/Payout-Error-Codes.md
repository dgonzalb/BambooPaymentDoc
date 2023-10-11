---
title: "Códigos de error del API"
linkTitle: "Códigos de error"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  Este artículo muestra información sobre los códigos de error que puede encontrar al utilizar la integración de Payouts.
weight: 40
---

| Código de error | Categoría | Descripción |
|---|---|---|
| `200` | Códigos del Response | Éxito. |
| `400` | Códigos del Response | Request incorrecto. |
| `401` | Códigos del Response | No autorizado. |
| `409` | Códigos del Response | Conflicto. |
| `601` | Purchase Preview | País destino no válido. |
| `602` | Purchase Preview | Moneda de origen no válida. |
| `699` | Purchase Preview | Error genérico del Preview de Payouts. |
| `812` | Validación del API | Declinado por validación del documento. |
| `813` | Validación del API | Declinado por validación de la cuenta. |
| `814` | Validación del API | Declinado por validación del país. |
| `815` | Validación del API | Declinado por cumplimiento. |
| `816` | Validación del API | ID de referencia ya utilizado.<br>Este error no se muestra en la [Consola de Payouts](../payouts-merchant-console.html) pero se devuelve a través de la API. |. |
| `901` | Rechazos | La cuenta bancaria está cerrada. |
| `902` | Rechazos | Cuenta bancaria no válida. |
| `903` | Rechazos | Tipo de cuenta bancaria no válida. |
| `904` | Rechazos | Sucursal bancaria no válida. |
| `905` | Rechazos | Límite mensual del usuario excedido. |
| `906` | Rechazos | Rechazado por solicitud del comercio. |
| `907` | Rechazos | La cuenta bancaria no puede recibir transferencias. |
| `908` | Rechazos | Documento del beneficiario no válido. |
| `909` | Rechazos | El nombre del beneficiario no coincide con los datos bancarios. |
| `910` | Rechazos | Llave PIX no válida. |
| `911` | Rechazos | Se ha solicitado un cambio de estado no válido. |
| `912` | Rechazos | Saldo insuficiente. |
| `999` | Rechazos | Error. |