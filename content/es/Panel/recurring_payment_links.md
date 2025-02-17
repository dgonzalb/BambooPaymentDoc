---
title: "Links de Pagos Recurrentes"
linkTitle: "Links de Pagos Recurrentes"
date: 2025-02-17
type: docs
Description: >
weight: 65
---

Los Links Recurrentes permiten a los comercios generar URLs de pago que pueden ser utilizadas múltiples veces para cobros repetitivos o servicios recurrentes, o bien para que distintos usuarios compren el mismo producto.

## Listado de Links Recurrentes

La vista principal muestra una tabla con todos los links recurrentes y su información:

| Dato | Descripción | Estado |
|------|-------------|--------|
| Nombre | Identificador descriptivo del producto o servicio | - |
| Referencia | Código de referencia interno | - |
| Monto | Importe y moneda del pago | - |
| Estado | Estado actual del link | Activo, Inactivo |
| Creación | Fecha de generación del link | - |
| Expiración | Fecha de vencimiento (si aplica) o "No expira" | - |


El listado cuenta además con un **menú contextual** que permite copiar el link recurrente al portapapeles, cambiar el estado, o eliminarlo.

<a href="/assets/MerchantPanel/10-Reporte Link Recurrente.png" target="_blank">
    <img src="/assets/MerchantPanel/10-Reporte Link Recurrente.png" width="100%" alt="PrintScreen"/>
</a>

### Opciones de filtrado disponibles:

| Filtro | Descripción |
|------|-------------|
|Rango de fechas | Período de creación|
|Nombre          | Nombre del producto|
|Detalles del link | Moneda <br> Precio <br> Estado <br> Referencia|




## Creación de Links Recurrentes

El proceso de creación se realiza en dos pasos:

### Paso 1: Datos del Link

| Dato | Descripción | Mandatorio |
|------|-------------|------------|
| Cuenta | Selección de la cuenta donde se procesarán los pagos | Sí |
| Nombre | Identificador del producto o servicio | Sí |
| Estado | Estado inicial del link (activo/inactivo) | Sí |
| Moneda | Moneda en la que se realizarán los cobros | Sí |
| Precio | Monto a cobrar | Sí |
| Referencia | Identificador interno opcional | No |
| Vencimiento | Período de validez del link | Sí |


<a href="/assets/MerchantPanel/11-Link Recurrente Creacion 1.png" target="_blank">
    <img src="/assets/MerchantPanel/11-Link Recurrente Creacion 1.png" width="100%" alt="PrintScreen"/>
</a>

### Paso 2: Producto

Información adicional del producto:

| Dato | Descripción | Mandatorio | Restricciones |
|------|-------------|------------|---------------|
| Descripción | Detalle del producto o servicio | No | - |
| Imágenes | Opción para subir imágenes del producto | No | Formatos: jpg, jpeg, png<br>Tamaño máximo: 10 MB por archivo |


<a href="/assets/MerchantPanel/12-Link Recurrente Creacion 2.png" target="_blank">
    <img src="/assets/MerchantPanel/12-Link Recurrente Creacion 2.png" width="100%" alt="PrintScreen"/>
</a>
