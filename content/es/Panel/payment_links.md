---
title: "Links de Pago"
linkTitle: "Links de Pago"
date: 2025-02-17
type: docs
Description: >
weight: 50
---

Los Links de Pago permiten a los comercios generar URLs únicas para que sus clientes realicen pagos de forma segura. Cada link es de un solo uso y expira una vez utilizado o alcanzado su tiempo límite.

## Listado de Links de Pago

La vista principal muestra una tabla con todos los links generados y su información relevante:

| Dato | Descripción |
|------|-------------|
| Link ID | Identificador único del link de pago |
| Referencia | Código de referencia asignado por el comercio |
| Estado | Estado actual del link |
| Importe | Monto y moneda del pago |
| Creación | Fecha y hora de generación del link |
| Expiración | Fecha y hora en que el link dejará de ser válido |

El listado cuenta además con un **menú contextual** que permite copiar el link de pago al portapapeles, o cancelarlo.

<a href="/assets/MerchantPanel/7-Reporte Link de pago.png" target="_blank">
    <img src="/assets/MerchantPanel/7-Reporte Link de pago.png" width="100%" alt="PrintScreen"/>
</a>


### Opciones de filtrado disponibles:

El listado puede filtrarse por:

| Tipo de Dato | Filtro | Descripción |
|--------------|------|-------------|
| General | Fecha | Período específico de creación |
| General | ID del link | Identificador único del link |
| General | Cuenta | Filtrar por cuenta específica |
| Cliente | Documento | Número de documento del cliente |
| Cliente | Email | Correo electrónico del cliente |
| Cliente | Nombre del cliente | Nombre completo del cliente |
| Detalles del link | Estado | Estado del link de pago |
| Detalles del link | Referencia | Código de referencia |


## Creación de Links de Pago

El proceso de creación se realiza en dos pasos:

### Paso 1: Datos del Link


| Dato | Descripción | Mandatorio |
|------|-------------|------------|
| Cuenta | Selección de la cuenta donde se procesará el pago | Sí |
| País | País donde se realizará la transacción | Sí |
| Moneda | Divisa en la que se realizará el cobro | Sí |
| Monto | Cantidad a cobrar | Sí |
| Referencia | Identificador interno para el comercio | No |
| Descripción | Detalle o concepto del pago | No |
| Expiración | Tiempo de validez del link | Sí |


<a href="/assets/MerchantPanel/8-Link de Pago Creacion 1.png" target="_blank">
    <img src="/assets/MerchantPanel/8-Link de Pago Creacion 1.png" width="100%" alt="PrintScreen"/>
</a>

### Paso 2: Datos del Cliente

| Dato | Descripción | Mandatorio |
|------|-------------|------------|
| Nombre y Apellido | Identificación del cliente | No |
| Email | Correo electrónico de contacto | No |
| Número de teléfono | Teléfono de contacto | No |
| Tipo y Número de documento | Documento del cliente | No |
| País y Ciudad | Ubicación del cliente | No |
| Estado | Estado o provincia | No |
| Dirección | Dirección física del cliente | No |

<a href="/assets/MerchantPanel/9-Link de Pago Creacion 2.png" target="_blank">
    <img src="/assets/MerchantPanel/9-Link de Pago Creacion 2.png" width="100%" alt="PrintScreen"/>
</a>
