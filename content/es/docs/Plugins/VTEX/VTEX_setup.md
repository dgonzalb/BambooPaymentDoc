---
title: "Guía de Integración"
linkTitle: "Guía de Integración"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprende cómo integrar los medios de pago de Bamboo en tu e-commerce VTEX. Esta guía proporciona un paso a paso para una configuración e integración rápida y sencilla.
weight: 10
tags: ["subtopic"]
---

En esta sección, encontrarás las instrucciones para configurar la autenticación, ajustar los medios de pago y establecer condiciones para pagos en cuotas y de contado con tarjetas de crédito o débito. 

---
## Configuración General

Para configurar Bamboo como proveedor de pagos en tu tienda VTEX, sigue estos pasos:

1. Inicia sesión en el panel de administración de VTEX con tus credenciales.

![PrintScreen](/assets/VTEX/bamboo-vtex-000.png)

2. Ve a 'Configuración de la tienda' > 'Proveedores' > 'Nuevo proveedor'.

![PrintScreen](/assets/VTEX/bamboo-vtex-001.png)

3. Busca **Bamboo-Payments** en la lista de proveedores y selecciónalo.

![PrintScreen](/assets/VTEX/bamboo-vtex-002.png)

## Configuración del Plugin de Bamboo

### Autenticación

Ingresa las credenciales de Bamboo en los campos designados. Para obtener información sobre cómo generar las claves de tu tienda, consulta la <a href="https://help.vtex.com/es/tutorial/claves-de-aplicacion--2iffYzlvvz4BDMr6WGUtet#generar-claves-de-aplicacion-internas" target="_blank">documentación de Claves VTEX</a>

![PrintScreen](/assets/VTEX/bamboo-vtex-003.png)

### Opciones adicionales

1. Elige si deseas operar en modo prueba.

![PrintScreen](/assets/VTEX/bamboo-vtex-004.png)

2. Selecciona el tipo de liquidación que prefieras.

{{% alert title="Información" color="info"%}}
El modo prueba permite simular transacciones antes de ofrecerlo a tus clientes. Desactiva esta opción para procesar transacciones reales.
{{% /alert %}}

### Configuraciones de Procesamiento

Configura los siguientes ajustes:

1. **Llave Privada**: Ingresa tu Llave Privada de Bamboo.
2. **Habilitar Autorización y Captura**: Si está habilitado, deberás capturar manualmente los pagos realizados con Bamboo desde tu tienda.
3. **País de Operación**: Selecciona el país donde operará tu e-commerce.

![PrintScreen](/assets/VTEX/bamboo-vtex-005.png)

Después de completar estos campos, haz clic en el botón **'Guardar'**.

## Configuración de Medios de Pago

Para configurar los métodos de pago:

1. Ve a la sección 'Condiciones de Pago'.

![PrintScreen](/assets/VTEX/bamboo-vtex-006.png)

2. Haz clic en el ícono '+' para agregar una nueva condición.
3. Configura el método de pago que deseas ofrecer a tus clientes.

![PrintScreen](/assets/VTEX/bamboo-vtex-007.png)

### Pago en Cuotas para Tarjetas de Crédito

Para configurar el pago en cuotas para tarjetas de crédito:

1. Selecciona la marca o franquicia de tarjeta en la lista.

![PrintScreen](/assets/VTEX/bamboo-vtex-008.png)

2. Activa la condición.

![PrintScreen](/assets/VTEX/bamboo-vtex-009.png)

3. Selecciona Bamboo-Payments como proveedor.

![PrintScreen](/assets/VTEX/bamboo-vtex-010.png)

4. Ingresa un nombre para identificar la condición de pago.

![PrintScreen](/assets/VTEX/bamboo-vtex-011.png)

5. Elige la opción 'En cuotas' e ingresa los datos solicitados.
6. Configura las tasas de interés y/o intereses externos según sea necesario.
7. Guarda los cambios.

![PrintScreen](/assets/VTEX/bamboo-vtex-013.png)

### Pago de Contado para Tarjetas de Crédito y Débito

Para configurar pagos de contado o a una sola cuota:

1. Sigue el mismo proceso que para 'Pago en Cuotas'.
2. En lugar de seleccionar 'En cuotas', elige la opción 'Al contado'.

![PrintScreen](/assets/VTEX/bamboo-vtex-015.png)

3. Configura los detalles necesarios para pagos únicos.
4. Guarda los cambios.

![PrintScreen](/assets/VTEX/bamboo-vtex-016.png)

Siguiendo estos pasos, habrás configurado Bamboo como plataforma de pago en tu tienda VTEX, incluyendo medios de pago en cuotas y de contado.

{{% alert title="Información" color="info"%}}
Los cambios en las condiciones de pago pueden tardar hasta **10 minutos** en aplicarse en el checkout de tu tienda VTEX.
{{% /alert %}}


## Script Antifraude

Para garantizar el funcionamiento del módulo antifraude de Bamboo, es necesario hacer una configuración adicional para insertar el script del DeviceFingerPrint. Para configurarlo, sigue estos pasos:

{{% alert title="Nota importante" color="info"%}}
Esta configuración solo aplica para **comercios PayFac**. No es válida para la modalidad Gateway. Si tiene dudas, consulte con soporte técnico.
{{% /alert %}}


1. Ingresa al panel administrativo de VTEX.
2. Ve a 'Configuración de tienda'.

![PrintScreen](/assets/VTEX/bamboo-vtex-antifraud-001.png)

3. Navega hasta 'Storefront > Checkout'.
4. Haz clic en el ícono de configuración de la opción 'Default'.

![PrintScreen](/assets/VTEX/bamboo-vtex-antifraud-002.png)

5. Ingresa a 'Code > checkout-custom.js'.

![PrintScreen](/assets/VTEX/bamboo-vtex-antifraud-003.png)

6. Inserta el siguiente bloque de código en el archivo y guarda los cambios:

```javascript
const API_Environment = "https://api.bamboopayment.com",
    PublicAccountKey = "CT4XUYw10xDemA4UqCgU0m_I56ONV7HQ";

async function getIp() {
    return fetch("https://api.ipify.org/?format=json")
}

async function loadScript(e, t) {
    if (!window.vtex || window.vtex.deviceFingerprint) {
        console.debug(window.vtex ? `already deviceFingerprint: ${window.vtex.deviceFingerprint}` : "there is no VTEX");
        return
    }
    let n = document.createElement("script");
    n.src = e,
    n.onload = t,
    document.head.appendChild(n)
}

async function generateFingerPrint() {
    if (!window.setSessionID) {
        console.debug("SetSessionID not found");
        await new Promise(e => setTimeout(() => e(!0), 1e3));
        console.debug("Retrying...");
        return generateFingerPrint();
    }
    let e = window.getSessionAntifraud(),
        t = await getIp().then(e => e.json()).then(({ip: e}) => e),
        n = JSON.stringify({
            sessionId: e,
            ip: t
        });
    window.vtex.deviceFingerprint = n
}

window.addEventListener("DOMContentLoaded", () => {
    console.info("==== EJECUTANDO HUELLA DIGITAL ====");
    loadScript(`${API_Environment}/v1/Scripts/Antifraud.js?key=${PublicAccountKey}`, generateFingerPrint)
});
```

Este script asegura que el análisis antifraude se realice correctamente para las transacciones procesadas a través del plugin de VTEX.