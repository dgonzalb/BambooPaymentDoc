---
title: "Códigos de error del API"
linkTitle: "Códigos de error"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  Este artículo muestra información sobre los códigos de error que puede encontrar al utilizar la integración de Payouts.
weight: 70
---

| Código de error | Categoría | Descripción |
|---|---|---|
| `000` | Códigos del Response | Código inválido. |
| `200` | Códigos del Response | Éxito. |
| `400` | Códigos del Response | Request incorrecto. |
| `401` | Códigos del Response | No autorizado. |
| `409` | Códigos del Response | Conflicto. |
| `601` | Preview | País destino no válido. |
| `602` | Preview | Moneda de origen no válida. |
| `603` | Preview | Monto inválido. |
| `604` | Preview | Código ISO de moneda de destino inválido. |
| `605` | Preview | La cuenta del comercio no fue encontrada. |
| `606` | Preview | La cuenta del comercio no está habilitada. |
| `607` | Preview | La cuenta del comercio tiene un modelo de negocio no válido. |
| `699` | Preview | Error genérico del Preview de Payouts. |
| `701` | Errores transaccionales | Saldo insuficiente. |
| `702` | Errores transaccionales | Rechazado por reglas de cumplimiento. |
| `703` | Errores transaccionales | Error general en el balance de cuentas. |
| `704` | Errores transaccionales | El monto mínimo del pago es inválido. |
| `705` | Errores transaccionales | Código ISO de moneda de origen inválido. |
| `706` | Errores transaccionales | La cuenta no fue encontrada. |
| `707` | Errores transaccionales | La cuenta no está habilitada. |
| `708` | Errores transaccionales | Modelo de negocio no válido. |
| `709` | Errores transaccionales | Error general al obtener información del negocio. |
| `710` | Errores transaccionales | El banco ingresado no es válido. |
| `711` | Errores transaccionales | La cuenta ingresada no es válida. |
| `712` | Errores transaccionales | Solicitud de datos expirada. |
| `713` | Errores transaccionales | Error general al realizar la solicitud de datos. |
| `812` | Validación del API | Declinado por validación del documento. |
| `813` | Validación del API | Declinado por validación de la cuenta. |
| `814` | Validación del API | Declinado por validación del país. |
| `816` | Validación del API | ID de referencia ya utilizado.<br>Este error se muestra en la [Consola de Payouts](../payouts-merchant-console.html) y también se devuelve a través del Webhook. |
| `817` | Validación del API | Moneda de destino no soportada. |
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
| `913` | Rechazos | Fecha de proceso no válida. |
| `914` | Rechazos | Saldo insuficiente en la integración. |
| `915` | Rechazos | Error general en la integración. |
| `916` | Rechazos | Rechazado por el banco. |
| `921` | Rechazos | Billetera inválida |
| `999` | Rechazos | Error general. |


<!--| `000` | Códigos del Response | Código inválido. |
| `200` | Códigos del Response | Éxito. |
| `200` | Códigos del Response | Éxito. |
| `400` | Códigos del Response | Request incorrecto. |
| `401` | Códigos del Response | No autorizado. |
| `409` | Códigos del Response | Conflicto. |
| `601` | Purchase Preview | País destino no válido. |
| `602` | Purchase Preview | Moneda de origen no válida. |
| `603` | Purchase Preview | Monto invalido. |
| `604` | Purchase Preview | Código ISO de moneda de destino inválido. |
| `699` | Purchase Preview | Error genérico del Preview de Payouts. |
| `701` | Errores transaccionales | Saldo insuficiente. |
| `702` | Errores transaccionales | Rechazado por reglas de cumplimiento. |
| `703` | Errores transaccionales | Error general en el balance de cuentas. |
| `704` | Errores transaccionales | El monto mínimo del pago es inválido. |
| `812` | Validación del API | Declinado por validación del documento. |
| `813` | Validación del API | Declinado por validación de la cuenta. |
| `814` | Validación del API | Declinado por validación del país. |
| `816` | Validación del API | ID de referencia ya utilizado.<br>Este error no se muestra en la [Consola de Payouts](../payouts-merchant-console.html) pero se devuelve a través de la API. |
| `817` | Validación del API | Moneda de destino no soportada. |
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
| `913` | Rechazos | Fecha de proceso no válida. |
| `914` | Rechazos | Saldo insuficiente en la integración. |
| `915` | Rechazos | Error general en la integración. |
| `916` | Rechazos | Rechazado por el banco. |
| `999` | Rechazos | Error general. |-->