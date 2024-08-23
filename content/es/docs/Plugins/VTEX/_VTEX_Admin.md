---
title: "Panel de Control"
linkTitle: "Panel de Control"
date: 2023-05-08T07:28:16-05:00
description: >
  Esta guía describe los procesos administrativos para gestionar pedidos y transacciones en una tienda VTEX integrada con Bamboo.
weight: 30
tags: ["subtopic"]
---

## Gestión de Pedidos

### Visualización de Pedidos

1. Accede al menú de administración de VTEX
2. Selecciona 'Pedidos' > 'Todos los Pedidos'
3. Verás una lista de todos los pedidos recibidos en tu tienda

![PrintScreen](/assets/VTEX/bamboo-vtex-020.png)

### Detalles del Pedido

1. Haz clic en un pedido específico para ver el detalle
2. Los detalles del pedido incluyen toda la información del pago procesado a través de Bamboo
3. Haz clic en 'Ver Detalles' para ver la transacción asociada

![PrintScreen](/assets/VTEX/bamboo-vtex-021.png)

## Gestión de Transacciones

### Visualización de Transacciones

1. Desde el menú de administración de VTEX, selecciona 'Pedidos' > 'Transacciones'
2. Muestra todas las transacciones recibidas en tu tienda

![PrintScreen](/assets/VTEX/bamboo-vtex-022.png)

### Detalle de la Transacción

1. Haz clic en una transacción específica para ver sus detalles
2. Puedes ver la trazabilidad completa de los estados de pago procesados por Bamboo
3. En la esquina superior derecha, puedes acceder al pedido

![PrintScreen](/assets/VTEX/bamboo-vtex-023.png)

![PrintScreen](/assets/VTEX/bamboo-vtex-024.png)

## Operaciones Adicionales

### Captura
Si la opción **'Autorización y captura'** está activa, deberás cobrar los pagos de forma manual. Para esto solo debes facturar el pedido en VTEX. Esto implica comenzar la preparación del pedido y luego facturarlo.

1. Inicia la preparación del pedido

![PrintScreen](/assets/VTEX/bamboo-vtex-026.png)

2. Factura el pedido

![PrintScreen](/assets/VTEX/bamboo-vtex-027.png)


### Reembolsos

{{% alert title="Información" color="info"%}}
Los reembolsos se pueden realizar en transacciones cuando el estado del pedido es **'Facturado'** en VTEX.
{{% /alert %}}

1. Si estado del pedido es 'Facturado', haz clic en el botón **'Devolver ítems'**

![PrintScreen](/assets/VTEX/bamboo-vtex-028.png)

2. Puedes procesar reembolsos totales o parciales
3. Los detalles de la devolución serán visibles en la transacción asociada

![PrintScreen](/assets/VTEX/bamboo-vtex-029.png)

### Cancelaciones

{{% alert title="Información" color="info"%}}
Puedes cancelar transacciones para pedidos en estado 'Listo para Preparación'.
{{% /alert %}}

1. Localiza el pedido que deseas cancelar
2. Haz clic en el botón 'Cancelar' en la página del pedido

![PrintScreen](/assets/VTEX/bamboo-vtex-030.png)

**Nota:** La cancelación solo es posible para pedidos en estado 'Listo para Preparación', no en etapas posteriores

![PrintScreen](/assets/VTEX/bamboo-vtex-031.png)

4. Los detalles de la cancelación serán visibles en la transacción asociada

![PrintScreen](/assets/VTEX/bamboo-vtex-032.png)

## Notas Importantes

- Asegúrate de que los pedidos estén en el estado correcto antes de intentar **reembolsos** o **cancelaciones**.
- Siempre verifica la transacción asociada para obtener la información de pago más actualizada