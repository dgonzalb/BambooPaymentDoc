---
title: "API Link de Pago"
date: 2024-12-27T09:28:16-05:00
Description: >
    Descubre cómo integrar la API de Payment Link para crear URLs de pago dinámicas y códigos QR. Ofrece diversas opciones de pago a tus clientes en Uruguay con sencillas llamadas a la API.
weight: 80
---

## Descripción general
La API de Link de Pago permite a los comerciantes crear enlaces de pago y códigos QR para sus transacciones de manera dinámica. Cuando se inicia una solicitud de pago, la API proporciona una URL de pago y, si se desea, una imagen de código QR que puede mostrarse a los clientes. Los clientes pueden completar su pago utilizando el enlace de pago o el código QR.

> **Nota**: _Esta API está actualmente disponible solo para el **modelo Gateway**. Para disponibilidad en otros países, por favor contacte a su ejecutivo de cuenta._

### Flujo básico
1. El comerciante crea una solicitud de pago con el monto, la moneda y parámetros opcionales.
2. La API devuelve una URL de pago y una imagen de código QR opcional.
3. El comerciante presenta las opciones de pago al cliente.
4. El cliente completa el pago utilizando el enlace de pago o el código QR.

