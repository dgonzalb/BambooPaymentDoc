---
title: "Console"
linkTitle: "Console"
date: 2024-08-10T11:40:29-05:00
type: docs
Description: >
  Merchant Console
weight: 10

---
# Panel de Bamboo Payments

El Panel de Bamboo Payments es una plataforma web diseñada para la gestión de operaciones de pago. A través de esta interfaz, los comercios pueden monitorear sus transacciones en tiempo real, administrar reembolsos y generar links de pago para sus clientes. 

## Idiomas disponibles: Inglés, Español y Portugués.
# Pantalla de Inicio de Sesión

El Panel de Bamboo Payments permite a los comercios gestionar y monitorizar sus operaciones de pago. La pantalla de inicio de sesión es el punto de entrada al sistema.

## Accediendo al Panel

Para acceder al Panel, siga estos pasos:

1. Ingrese su dirección de correo electrónico registrada en el campo "Email"
2. Introduzca su contraseña en el campo "Password"
3. Haga clic en el botón verde "Sign In" para iniciar sesión

## Recuperación de Contraseña

Si ha olvidado su contraseña:

1. Haga clic en el enlace "Forgot Password?" ubicado en la parte inferior del formulario
2. Siga las instrucciones enviadas a su correo electrónico para restablecer su contraseña

## Requisitos de Seguridad

- Utilice una dirección de correo electrónico válida y registrada
- Asegúrese de que su contraseña cumple con los requisitos mínimos de seguridad
- La sesión se cerrará automáticamente después de un período de inactividad

# Reporte de Payins

La sección **Reporte de Payins** permite al usuario visualizar un listado detallado de todas las transacciones entrantes realizadas a través de Bamboo Payments. Esta vista proporciona información relevante sobre cada transacción, como el cliente, el estado, el importe, el medio de pago y otros detalles útiles para la gestión y análisis.

---

## Funcionalidades Principales

### 1. Listado de Transacciones
Cada fila en la tabla representa una transacción individual y muestra:

- **ID de compra**: Identificador único de la transacción (enlace clicable para más detalles).
- **Cliente**: Nombre del cliente asociado a la transacción.
- **Estado**: Estado actual de la transacción (Ej: aprobado, rechazado, cancelado, etc.).
- **Importe**: Monto de la transacción, acompañado de la moneda utilizada.
- **Medio de pago**: Método utilizado para realizar el pago (Mastercard, VISA, OCA, etc.).
- **Fecha**: Fecha y hora en que se registró la transacción.
- **Orden**: Número o referencia asociada a la orden.

### 2. Descargar Reporte
Opción para descargar un archivo con el reporte completo de las transacciones mostradas, adaptado al rango de fechas y filtros aplicados.

### 3. Filtrado Avanzado
El usuario puede personalizar los resultados mostrados utilizando el módulo de filtros, accesible mediante el botón **Filtros**.

#### Opciones de filtrado disponibles:
- **Cuenta**: Selección de cuentas específicas.
- **Estado**: Filtrar por estados de las transacciones 
- **ID de compra**: Buscar por identificadores específicos.
- **Medio de pago**: Seleccionar métodos específicos (ej.: tarjetas, transferencias).
- **Importe y moneda**: Filtrar por importe o monedas específicas.
- **Cliente**: Buscar por nombre, email o documento del cliente.
- **Fecha**: Establecer un rango de fechas específico para las transacciones.

---

## Navegación
Desde esta vista, el usuario puede hacer clic en el **ID de compra** para acceder a los detalles específicos de cada transacción.



# Reembolsos

La pantalla de reembolsos permite gestionar la devolución parcial o total del dinero de una transacción al cliente. Se accede desde el detalle de una transacción a través del botón "Reembolso".

## Solicitar un Reembolso

### Tipo y Monto a Reembolsar

1. **Tipo de reembolso**
  - Selecciona entre reembolso parcial o total desde el menú desplegable
  - Para reembolso total, se devolverá el monto completo de la transacción original
  - Para reembolso parcial, deberá especificar el monto a devolver

2. **Monto a reembolsar**
  - Ingresa el monto específico a reembolsar (sólo para reembolsos parciales)
  - La moneda se mostrará en la misma denominación que la transacción original (ej: UYU)

3. **Acciones disponibles**
  - **Cancelar**: Retorna al detalle de la transacción sin efectuar cambios
  - **Realizar reembolso**: Procesa la solicitud de reembolso con los parámetros especificados

## Listado de Reembolsos

La sección inferior muestra un historial de todos los reembolsos asociados a la transacción actual:

- **Monto**: Cantidad reembolsada y moneda
- **Fecha de creación**: Fecha y hora en que se solicitó el reembolso
- **ID único**: Identificador único del reembolso
- **Estado**: Estado actual del reembolso (Ej: aprobado, rechazado, cancelado, etc.).


# Logs

La sección de logs proporciona un registro detallado de todos los estados por los que ha pasado una transacción, permitiendo hacer seguimiento del flujo completo de la misma.

## Información del Log

El registro muestra los siguientes datos para cada evento:

- **Estado**: Tipo de evento registrado (Created, Authorization OK, Authorization Fail, etc.)
- **Fecha**: Fecha y hora exacta del evento
- **ID de log**: Identificador único del registro
- **ID de la transacción**: Identificador de la transacción asociada
- **Código de autorización**: Código proporcionado cuando la autorización es exitosa
- **Código de error**: Código de error en caso de falla


# Links de Pago

Los Links de Pago permiten a los comercios generar URLs únicas para que sus clientes realicen pagos de forma segura. Cada link es de un solo uso y expira una vez utilizado o alcanzado su tiempo límite.

## Listado de Links de Pago

La vista principal muestra una tabla con todos los links generados y su información relevante:

- **Link ID**: Identificador único del link de pago
- **Referencia**: Código de referencia asignado por el comercio
- **Estado**: Estado actual del link
 - Pendiente: Link activo esperando ser utilizado
 - Expirado: Link que superó su fecha de expiración
 - Procesando: Link en proceso de pago
 - Cancelado por el comercio: Link cancelado manualmente
- **Importe**: Monto y moneda del pago
- **Creación**: Fecha y hora de generación del link
- **Expiración**: Fecha y hora en que el link dejará de ser válido

### Opciones de filtrado disponibles:

El listado puede filtrarse por:

- **Fecha**: Período específico de creación
- **ID del link**: Identificador único del link
- **Cuenta**: Filtrar por cuenta específica
- **Cliente**:
 - Documento
 - Email
 - Nombre del cliente
- **Detalles del link**:
 - Estado
 - Referencia


## Creación de Links de Pago

El proceso de creación se realiza en dos pasos:

### Paso 1: Datos del Link

Campos requeridos (*):
- **Cuenta**: Selección de la cuenta donde se procesará el pago
- **País**: País donde se realizará la transacción
- **Moneda**: Divisa en la que se realizará el cobro
- **Monto**: Cantidad a cobrar
- **Referencia**: Identificador interno para el comercio
- **Descripción**: Detalle o concepto del pago
- **Expiración**: Tiempo de validez del link

### Paso 2: Datos del Cliente

Información del pagador:
- **Nombre y Apellido**: Identificación del cliente
- **Email**: Correo electrónico de contacto
- **Número de teléfono**: Teléfono de contacto
- **Tipo y Número de documento**: Documentación identificativa
- **País y Ciudad**: Ubicación del cliente
- **Estado**: Estado o provincia
- **Dirección**: Dirección física del cliente
Todos estos campos son opcionales.



# Links Recurrentes

Los Links Recurrentes permiten a los comercios generar URLs de pago que pueden ser utilizadas múltiples veces para cobros repetitivos o servicios recurrentes, o bien para que distintos usuarios compren el mismo producto.

## Listado de Links Recurrentes

La vista principal muestra una tabla con todos los links recurrentes y su información:

- **Nombre**: Identificador descriptivo del producto o servicio
- **Referencia**: Código de referencia interno
- **Monto**: Importe y moneda del pago
- **Estado**: Estado actual del link
 - Activo: Link disponible para uso
 - Inactivo: Link temporalmente deshabilitado
- **Creación**: Fecha de generación del link
- **Expiración**: Fecha de vencimiento (si aplica) o "No expira"


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

Campos requeridos (*):
- **Cuenta**: Selección de la cuenta donde se procesarán los pagos
- **Nombre**: Identificador del producto o servicio
- **Estado**: Estado inicial del link (activo/inactivo)
- **Moneda**: Divisa en la que se realizarán los cobros
- **Precio**: Monto a cobrar
- **Referencia**: Identificador interno opcional
- **Vencimiento**: Período de validez del link

### Paso 2: Producto

Información adicional del producto:
- **Descripción**: Detalle del producto o servicio
- **Imágenes**: Opción para subir imágenes del producto
 - Formatos permitidos: jpg, jpeg, png
 - Tamaño máximo: 10 MB por archivo
 - Arrastre los archivos o use el botón de importación

# Planes de Cuotas

La sección de Planes de Cuotas permite configurar las opciones de pago en cuotas que estarán disponibles para los clientes de un comercio, según el medio de pago y la moneda.

## Listado de Planes

Muestra una vista general de todas las configuraciones de cuotas existentes:

- **Medio de pago** (Visa, Mastercard, etc)
- **Moneda**: Dólar estadounidense, Peso uruguayo, etc.
- **Cuotas**: cantidad de cuotas disponibles para esa moneda y ese medio de pago

## Configuración de Planes

Para crear o modificar un plan de cuotas, necesitarás especificar:

- **Cuenta**
- **Moneda**
- **Medio de pago**
- **Cuotas**

## Acciones Disponibles

- **Configurar cuotas**: Crear nuevos planes
- **Agregar nuevo plan**: Añadir configuración adicional
- **Eliminar**: Remover un plan existente
- **Guardar cambios/configuración**: Actualizar modificaciones