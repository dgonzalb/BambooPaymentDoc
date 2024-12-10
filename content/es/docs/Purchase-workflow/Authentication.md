---
title: "Autenticación"
linkTitle: "Autenticación"
date: 2023-08-02T08:43:44-05:00
Description: >
  Configura la autenticación de la integración con Bamboo. Tutorial de configuración de API keys, headers de autenticación y personalización de respuestas por idioma.
weight: 10
---

## Configuración de la autenticación {#configuring-the-authentication}
Todos los métodos de la API de Compras requieren los siguientes encabezados de autenticación:

| Llave | Valor | Comentarios |
|---|---|---|
| `Content-Type` | `application/json` | Indica que la solicitud se enviará en formato JSON. |
| `Authorization` | `Basic {{Clave Privada del Comercio}}` | Incluya la palabra `Basic` seguida de su `{{Clave Privada del Comercio}}` (y el identificador como comercio).<br>Ejemplo: `Basic RVkeLr-86_iTzSMLvDtuyQ-1zqIcsmFG-oSzncn_uFv-nj7bhB3rtZg__` |

### Configurar el idioma de los códigos de respuesta {#setting-the-language-of-the-response-codes}
Es posible recibir la descripción de errores en un idioma preferido. Para esto, envíe el encabezado `lang`, utilizando uno de los siguientes códigos en formato **ISO 639-1**:

<div id="shortTable"></div>

| Code | Language |
|:-:|---|
| `en` | English.<br>_Si no envía este encabezado o especifica un idioma no existente, recibirá los errores en inglés por defecto._ |
| `es` | Español. |
| `pt` | Portugués. |