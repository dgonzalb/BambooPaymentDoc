---
title: "Panel Comercio"
linkTitle: "Panel Comercio"
date: 2024-08-10T11:40:29-05:00
type: docs
Description: >
  Panel Comercio
weight: 10

---
# Panel de Bamboo Payments

El Panel de Bamboo Payments es una plataforma web diseñada para la gestión diaria de operaciones de pago. A través de esta interfaz, los comercios pueden monitorear sus transacciones en tiempo real, administrar reembolsos y generar links de pago para sus clientes. 

## Idiomas disponibles: Inglés, Español y Portugués.
# Inicio de Sesión

<img src="/assets/MerchantPanel/1-Login.png" width="100%" alt="PrintScreen"/>

[![PrintScreen](/assets/MerchantPanel/1-Login.png)](/assets/MerchantPanel/1-Login.png)

<img src="/assets/MerchantPanel/1-Login.png" width="100%" alt="PrintScreen"
     style="cursor: zoom-in; transition: transform 0.2s;"
     onclick="this.style.transform = this.style.transform === 'scale(2)' ? 'scale(1)' : 'scale(2)'"/>

<a href="/assets/MerchantPanel/1-Login.png" target="_blank">
    <img src="/assets/MerchantPanel/1-Login.png" width="100%" alt="PrintScreen"/>
</a>

La pantalla de inicio de sesión es el punto de entrada al sistema.

## Accediendo al Panel

Para acceder al Panel, siga estos pasos:

1. Ingrese su dirección de correo electrónico en el campo "Email"
2. Introduzca su contraseña en el campo "Password"
3. Haga clic en el botón verde "Sign In" para iniciar sesión

## Recuperación de Contraseña

Si ha olvidado su contraseña:

1. Haga clic en el enlace "Forgot Password?" ubicado en la parte inferior del formulario
2. Ingrese su correo electrónico
2. Siga las instrucciones enviadas a su correo electrónico para restablecer su contraseña


# Migración desde panel Siempre Pago

Aquellos comercios que estén utilizando el panel Siempre Pago deberan tener en cuenta el siguiente proceso de activación al nuevo panel
## Proceso de Activación

1. Bamboo activará los comercios para que puedan acceder al nuevo panel
2. Cada usuario del comercio recibe automáticamente un correo con:
   - Link de acceso al nuevo Dashboard
   - Contraseña provisoria (válida por 1 año)

## Primer Acceso

1. Accede usando el link recibido
2. Ingresa con su email habitual y la contraseña provisoria (expira en un año desde la activación)
3. El sistema te pedirá cambiar la contraseña provisoria por una nueva

# Reporte de Payins

La sección **Reporte de Payins** permite al usuario visualizar un listado detallado de todas las transacciones realizadas a través de Bamboo Payments. Esta vista proporciona información relevante sobre cada transacción, como el cliente, el estado, el importe, el medio de pago y otros detalles útiles para la gestión y análisis.


<img src="/assets/MerchantPanel/2-ReportePayins.png" width="120%" alt="PrintScreen"/>

<a href="/assets/MerchantPanel/2-ReportePayins.png" target="_blank">
    <img src="/assets/MerchantPanel/2-ReportePayins.png" width="100%" alt="PrintScreen"/>
</a>


## Funcionalidades Principales

### 1. Listado de Transacciones
Cada fila en la tabla representa una transacción individual y muestra:
| Dato | Descripción | Observaciones |
|------|-------------|---------------|
| ID de compra | Identificador único de la transacción | Enlace clicable para más detalles |
| Tipo | Tipo de transacción | - |
| Cliente | Nombre del cliente asociado a la transacción | - |
| Estado | Estado actual de la transacción | Aprobado, Rechazado, Cancelado, etc. |
| Importe | Monto de la transacción | Incluye moneda utilizada |
| Medio de pago | Método utilizado para realizar el pago | Mastercard, VISA, OCA, etc. |
| Fecha | Fecha y hora en que se registró la transacción | - |
| Orden | Número o referencia asociada a la orden | - |


### 2. Descargar Reporte
Opción para descargar un archivo con el reporte completo de las transacciones mostradas, adaptado al rango de fechas y filtros aplicados.

### 3. Filtrado Avanzado
El usuario puede personalizar los resultados mostrados utilizando el módulo de filtros, accesible mediante el botón **Filtros**.

| Tipo de dato | Filtro | Descripción |
|--------------|--------|-------------|
| General | Cuenta | Selección de cuentas del comercio |
| General | Estado | Filtrar por estados de las transacciones |
| General | Orden | Filtrar por tipo de orden |
| General | ID de Transacción | Buscar por identificadores específicos |
| General | Tipo | Filtrar por tipo de transacción |
| Detalle de compra | Medio de pago | Seleccionar métodos específicos |
| Detalle de compra | Moneda | Seleccionar tipos de moneda |
| Detalle de compra | Importe | Filtrar por valor monetario |
| Cliente | Cliente | Buscar por nombre del cliente |
| Cliente | Email | Buscar por correo electrónico |
| Cliente | Documento | Buscar por documento de identidad |



---

## Navegación
Desde esta vista, el usuario puede hacer clic en el **ID de Transacción** para acceder a los detalles específicos de cada transacción.


# Detalle de Transacción

Al seleccionar una transacción desde el listado de Payins, se accede a una vista detallada que presenta la información organizada en cuatro secciones principales:

| Tipo de Dato | Dato | Descripción |
|--------------|------|-------------|
| Detalle de la Compra | ID de compra | Identificador único de la transacción |
| Detalle de la Compra | Estado | Estado actual de la operación (Aprobado, Rechazado, etc.) |
| Detalle de la Compra | Código de autorización | Código provisto por el procesador de pagos |
| Detalle de la Compra | Número de factura | Identificador del comprobante fiscal |
| Detalle de la Compra | Consumidor final | Indica si el comprador es consumidor final |
| Detalle de la Compra | Número de orden | Referencia interna del comercio |
| Detalle de la Compra | Descripción | Detalle de la compra |
| Detalle de la Compra | Información adicional | Campo para notas extras |
| Datos del Cliente | Nombre | Nombre del comprador |
| Datos del Cliente | Documento | Número de identificación |
| Datos del Cliente | Email | Correo electrónico |
| Datos del Cliente | Número de teléfono | Teléfono de contacto |
| Datos del Cliente | País | País del comprador |
| Datos del Cliente | Ciudad | Ciudad del comprador |
| Medio de Pago | Monto local | Importe de la transacción |
| Medio de Pago | Monto reembolsado | Total devuelto al cliente |
| Medio de Pago | Monto gravado | Importe sujeto a impuestos |
| Medio de Pago | Medio de pago | Proveedor del método de pago |
| Medio de Pago | Tipo de medio de pago | Categoría (ej: Tarjeta de Crédito) |
| Medio de Pago | Número de tarjeta | Últimos dígitos de la tarjeta |
| Medio de Pago | Titular | Nombre del titular de la tarjeta |
| Medio de Pago | Banco emisor | Entidad financiera emisora |
| Medio de Pago | Cuotas | Cantidad de cuotas seleccionadas |
| Medio de Pago | Fecha | Fecha y hora de la transacción |
| Adquirente | Código de resolución | Código de respuesta del adquirente |
| Adquirente | Descripción | Detalle de la respuesta |
| Adquirente | Número de orden | Identificador asignado por el adquirente |


<img src="/assets/MerchantPanel/3-DetallePayins.png" width="100%" alt="PrintScreen"/>

# Reembolsos

La pantalla de reembolsos permite gestionar la devolución parcial o total del dinero de una transacción al cliente. Se accede desde el detalle de una transacción a través del botón "Reembolso".

## Solicitar un Reembolso

<img src="/assets/MerchantPanel/4-Reembolsos.png" width="100%" alt="PrintScreen"/>

### Tipo y Monto a Reembolsar

1. **Tipo de reembolso**
  - Selecciona entre reembolso parcial o total desde el menú desplegable
  - Para reembolso total, se devolverá el monto completo de la transacción original
  - Para reembolso parcial, deberá especificar el monto a devolver

2. **Monto a reembolsar**
  - Ingresa el monto específico a reembolsar (sólo para reembolsos parciales)
  - La moneda se mostrará en la misma denominación que la transacción original (ej: UYU)


## Listado de Reembolsos


<img src="/assets/MerchantPanel/5-Reembolsos con Historial.png" width="100%" alt="PrintScreen"/>

La sección inferior muestra un historial de todos los reembolsos asociados a la transacción actual:

- **Monto**: Cantidad reembolsada y moneda
- **Fecha de creación**: Fecha y hora en que se solicitó el reembolso
- **ID único**: Identificador único del reembolso, si aplica.
- **Estado**: Estado actual del reembolso (Ej: aprobado, rechazado, cancelado, etc.).


# Logs

La sección de logs proporciona un registro detallado de todos los estados por los que ha pasado una transacción, permitiendo hacer seguimiento del flujo completo de la misma.


<img src="/assets/MerchantPanel/6-Logs.png" width="100%" alt="PrintScreen"/>

## Información del Log

El registro muestra los siguientes datos para cada evento:

| Dato | Descripción |
|------|-------------|
| Estado | Tipo de evento registrado (Created, Authorization OK, Authorization Fail, etc.) |
| Fecha | Fecha y hora exacta del evento |
| ID de log | Identificador único del registro |
| ID de la transacción | Identificador de la transacción asociada |
| Código de autorización | Código proporcionado cuando la autorización es exitosa |
| Código de error | Código de error en caso de falla |


# Links de Pago

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

# Menú Contextual
## Opciones
- **Copiar**: Copia el Link de Pago seleccionado al portapapeles
- **Cancelar**: Cancela el Link de Pago


<img src="/assets/MerchantPanel/7-Reporte Link de pago.png" width="100%" alt="PrintScreen"/>

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


<img src="/assets/MerchantPanel/8-Link de Pago Creacion 1.png" width="100%" alt="PrintScreen"/>

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


<img src="/assets/MerchantPanel/9-Link de Pago Creacion 2.png" width="100%" alt="PrintScreen"/>

# Links Recurrentes

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

# Menú Contextual
## Opciones
- **Copiar**: Copia el Link Recurrente seleccionado al portapapeles
- **Cambiar a Activo/Inactivo**: Cambia el estado del Link Recurrente
- **Eliminar**: Elimina el Link Recurrente


<img src="/assets/MerchantPanel/10-Reporte Link Recurrente.png" width="100%" alt="PrintScreen"/>

### Opciones de filtrado disponibles:

El listado puede filtrarse por:
- **Rango de fechas**: Período de creación
- **Nombre**: Nombre del producto
- **Detalles del link**:
 - Moneda
 - Precio
 - Estado
 - Referencia



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

<img src="/assets/MerchantPanel/11-Link Recurrente Creacion 1.png" width="100%" alt="PrintScreen"/>

### Paso 2: Producto

Información adicional del producto:

| Dato | Descripción | Mandatorio | Restricciones |
|------|-------------|------------|---------------|
| Descripción | Detalle del producto o servicio | No | - |
| Imágenes | Opción para subir imágenes del producto | No | Formatos: jpg, jpeg, png<br>Tamaño máximo: 10 MB por archivo |

<img src="/assets/MerchantPanel/12-Link Recurrente Creacion 2.png" width="100%" alt="PrintScreen"/>

# Planes de Cuotas

La sección de Planes de Cuotas permite configurar las opciones de pago en cuotas que estarán disponibles para los clientes de un comercio, según el medio de pago y la moneda.

## Listado de Planes

Muestra una vista general de todas las configuraciones de cuotas existentes:

- **Medio de pago** (Visa, Mastercard, etc)
- **Moneda**: Dólar estadounidense, Peso uruguayo, etc.
- **Cuotas**: cantidad de cuotas disponibles para esa moneda y ese medio de pago

<img src="/assets/MerchantPanel/13-Cuotas.png" width="100%" alt="PrintScreen"/>

## Configuración de Planes

Para crear o modificar un plan de cuotas, necesitarás especificar:

- **Cuenta**
- **Moneda**
- **Medio de pago**
- **Cuotas**

<img src="/assets/MerchantPanel/14-Crear planes de cuotas.png" width="100%" alt="PrintScreen"/>