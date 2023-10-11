---
title: "Códigos de error y descripciones"
linkTitle: "Códigos de error"
date: 2023-03-02T11:40:29-05:00
Description: >
  Este artículo brinda información sobre códigos de error y las posibles acciones que puede tomar.
weight: 45
---
<script src="/js/searchcodes.js"></script>

<input type="text" id="searchBox" placeholder="Buscar por código o descripción..." onkeyup="findTables()" >
<button onclick="document.getElementById('searchBox').value = '';findTables()" class="">Limpiar</button>

## Códigos HTTP {#http-codes}
| Código | Descripción | Uso |
|---|---|---|
| `200` | Ok | El request se ha procesado correctamente. |
| `400` | Bad Request | El request está malformado o falta algún parámetro requerido. |
| `401` | Unauthorized | Fallo de autenticación. |
| `403` | Forbidden | No tiene permiso para realizar la operación solicitada. |
| `404` | Not Found | No se ha encontrado el recurso solicitado. |
| `405` | Method not Allowed |  Método de request incorrecto (por ejemplo, GET en lugar de POST). |
| `408` | Request Timeout | El request no ha podido completarse en el tiempo máximo configurado.|
| `500` | Internal Server Error | Se ha producido un error en el servicio. |
| `503` | Service Unavailable | El servicio está en mantenimiento o tiene problemas de acceso. |

## Multilenguaje para errores {#multilanguage-for-errors}
Puede recibir la descripción del error basándose en las funciones de localización. Para ello, debe enviar el encabezado `lang` en su integración, utilizando cualquiera de los siguientes idiomas en formato **ISO 639-1**.

<div id="shortTable"></div>

| Código | Idioma |
|:-:|---|
| `en` | Inglés.<br>_Este es el idioma por defecto. Si no envía este encabezado o envía un idioma diferente a los soportados, recibirá los errores en este idioma._ |
| `es` | Español. |
| `pt` | Portugués. |

## Códigos de Error {#error-codes}

{{% alert title="Info" color="info"%}}
El código de error para errores desconocidos o indeterminados es `ERR999`. En este caso, contacte a [Soporte de Bamboo](mailto:soportecomercios@bamboopayment.com) para obtener más información.
{{% /alert %}}

### Errores del servicio Tokenization {#tokenization-service-errors}
Los errores del servicio Tokenization empiezan por `TK`.

<div id="cutMessage"></div>

| Código | Mensaje | Descripción | Posible solución |
|---|---|---|---|
| `TK001` | INVALID_CARD_PAN | El número de tarjeta introducido es incorrecto. | Pida a su cliente que compruebe el número de tarjeta y vuelva a intentar la transacción. |
| `TK002` | INVALID_CVV | El número CVV introducido es incorrecto. | Pida a su cliente que compruebe el código de validación y vuelva a intentar la transacción. |
| `TK003` | INVALID_EXPIRATION_DATE | La fecha de expiración de la tarjeta es incorrecta. | Pida a su cliente que compruebe la fecha de expiración y vuelva a intentar la transacción. |
| `TK004` | INVALID_SESSION_IDENTIFIER | Se ha enviado un identificador de sesión no válido en una solicitud de token. | [Regenere el token](/es/es/docs/purchase-workflow/customer-types.html) y vuelva a intentar la transacción. |
| `TK005` | INVALID_EMAIL | Se ha introducido un correo electrónico con formato incorrecto. | Pida a su cliente que compruebe la dirección de correo electrónico y vuelva a intentar la transacción.|
| `TK006` | EXPIRED_TOKEN | El token (de tipo One-Time) ya se ha utilizado o ha caducado. | [Regenere el token (OTT)]({{< ref anonymous-users.md >}}#capture-the-card-data) y vuelva a intentar la transacción. |
| `TK007` | INVALID_PAYMENT_MEDIA | Error con la información del medio de pago. | El `PaymentMediaId` no es correcto. Compruebe el valor del medio de pago en la [lista de países](/es/es/docs/payment-methods.html) correspondiente. |
| `TK008` | ISSUER_BANK_NOT_MATCH |  El banco emisor no coincide con el esperado. | Valide el banco emisor de la tarjeta de su cliente. |
| `TK009` | INVALID_ACTIVATION_CODE | El código de activación del token no es válido.| Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para activar el medio de pago. |
| `TK010` | INVALID_COMMERCE_TOKEN | El token de comercio no es válido. | [Regenere el token (CT)]({{< ref Registered-users.md >}}) y vuelva a intentar la transacción. |
| `TK011` | CUSTOMER_NOT_FOUND | El cliente especificado no es válido. | El cliente utilizado para crear el token no se ha encontrado o no es válido. |
| `TK012` | TOKEN_ACTIVATION_ERROR | Error al activar el código.  | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para activar el medio de pago. |
| `TK013` | TOKEN_REGISTRY_VOID_ERROR | Error en el proceso de registro. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para activar el medio de pago. |
| `TK014` | TOKEN_PAYMENT_MEDIA_DISABLED | Medio de pago deshabilitado. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para activar el medio de pago. |
| `TK015` | TOKEN_PAYMENT_MEDIA_UNAVAILABLE | El medio de pago no está disponible para el comercio. | Compruebe que haya habilitado el medio de pago seleccionado. |
| `TK016` | PAYMENT_MEDIA_REGISTRY_FAILS | Se ha producido un error en el proceso de registro del medio de pago | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para activar el medio de pago. |
| `TK017` | INVALID_DOCUMENT_NUMBER | Documento no válido. | El documento proporcionado no es válido según las normas del país. |
| `TK018` | INVALID_DOCUMENT_TYPE | Tipo de documento no válido | El tipo de documento enviado no es válido o no pertenece al país. |
| `TK999` | UNKNOWN_ERROR | Error desconocido. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información . |

### Errores del servicio Transactions {#transactions-service-errors}
Los errores del servicio Transactions empiezan por `TR`.

<div id="cutMessage"></div>

| Código | Mensaje | Descripción | Posible solución |
|---|---|---|---|
| `TR001` | COMMUNICATION_ERROR | Error de comunicación con el servicio de adquisición. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR002` | INVALID_TRANSACTION_STATE | La transacción asociada a la compra se encuentra en un estado que no permite la ejecución de la operación actual. Este error se produce, por ejemplo, cuando se quiere realizar una operación _Commit_ sobre una Compra que ya está autorizada o rechazada. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR003` | ACQUIRER_ACCOUNT_PROBLEM | Problemas con la cuenta de comercio en el Adquirente. | Contacte con [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR004` | ACQUIRER_PROXY_ERROR | Error al enviar la transacción a la entidad adquirente a través del proxy. | Contacte con [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR005` | ACQUIRER_PROBLEM | Error interno del Adquirente. | Contacte con [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR006` | ACQUIRER_DUPLICATED_ORDER | Número de orden duplicado en la Adquirente. | Contacte con [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR007` | INVALID_PAYMENT_MEDIA | Errores en los datos de pago (número de tarjeta, código de verificación o fecha de expiración). | Pida a su cliente que verifique la información de la tarjeta y vuelva a intentar la transacción. |
| `TR008` | COMMIT_AMOUNT_GREATER_THAN_AUTHORIZED | El importe que pretende confirmar es superior al autorizado previamente. | La [operación de confirmación]({{< ref purchase-operations.md>}}#confirm-a-purchase) se solicitó por un monto superior al autorizado. Envíe un valor igual o inferior al de la autorización original. |
| `TR009` | ACQUIRER_UNKNOWN_ERROR | Error de Adquirente Desconocido. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR010` | ACQUIRER_INVALID_DOCUMENT | Número de documento del cliente no válido en la entidad adquirente. | El cliente debe comprobar el tipo y número de documento facilitado y volver a intentar la transacción. En caso contrario, deberá ponerse en contacto con el banco emisor de su tarjeta. |
| `TR011` | BLOCKED_OR_LOST_CARD | Tarjeta bloqueada o extraviada. | Su cliente debe comprobar la tarjeta utilizada o ponerse en contacto con el banco emisor de la tarjeta para desbloquearla antes de reintentar la transacción. |
| `TR012` | ACQUIRER_LIMIT_EXCEEDED | Se ha superado el límite de crédito. | Su cliente debe intentar realizar la compra utilizando una tarjeta diferente, aumentar el límite de la tarjeta o liberar fondos disponibles. |
| `TR013` | ACQUIRER_DENIED_TRANSACTION | La entidad adquirente o el emisor han denegado la transacción. | La entidad adquirente o el banco emisor de la tarjeta ha rechazado la transacción. Este rechazo puede tener múltiples causas dependiendo de la entidad adquirente contratada y configurada por usted. Contacta con [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR014` | ACQUIRER_POSSIBLE_FRAUD | La Entidad Adquirente ha rechazado la operación por posible fraude. | La Adquirente ha rechazado la transacción basándose en su sistema antifraude.<br>Las normas antifraude de la Adquirente están asociadas al tipo de negocio del comercio (línea, categoría, productos) y al contrato firmado para el terminal de compra online solicitado.<br>Usted (como comercio) debe ponerse en contacto con la entidad adquirente para determinar si es necesario realizar un ajuste de las normas antifraude. |
| `TR015` | ACQUIRER_REVIEW_NEEDED | El Adquirente sugiere la revisión manual de la transacción. Por ejemplo, en caso de sospecha de fraude. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR016` | ACQUIRER_INVALID_PARAMETER | Error en los parámetros comunicados a la entidad adquirente. | Algunos de los datos que proporciona el cliente al realizar la compra son incorrectos o incompletos.<br>El cliente debe verificar si ha facilitado la dirección (junto con ciudad y país), nombre y apellidos, y documento. Contacte con [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) si no puede verificarlo. |
| `TR017` | INVALID_TRANSACTION_TYPE | Tipo de transacción no válida. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR018` | REGISTRATION_DENIED | La entidad adquirente ha denegado el registro de la tarjeta. | Contacte con [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR019` | ACQUIRER_TRANSACTION_REJECTED | La entidad adquirente o el procesador han rechazado la transacción. | La entidad adquirente o el banco emisor de la tarjeta ha rechazado la transacción.<br>Este rechazo puede tener múltiples causas dependiendo de la adquirencia contratada y configurada por usted. Contacta con [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR020` | ISSUER_DECLINE_CALL | El emisor ha rechazado la transacción, sin embargo, el emisor puede autorizarla verbalmente. | El banco ha rechazado la compra online. El cliente debe ponerse en contacto con el banco emisor de la tarjeta para autorizar la compra.<br>Error relacionado `TR023` |
| `TR021` | ISSUER_EXPIRED_CARD | La fecha de expiración no coincide o tarjeta expirada. | La entidad adquirente indica que la tarjeta está caducada o que la fecha de caducidad facilitada por el cliente es incorrecta.<br>El cliente debe validar esta información en la tarjeta antes de reintentar la compra. |
| `TR022` | ISSUER_INVALID_CVV | El emisor indica que el CVV no es válido. | La entidad adquirente indica que el código de validación de la tarjeta (CVV) es incorrecto.<br>Su cliente debe validar esta información en la tarjeta antes de reintentar la compra. |
| `TR023` | ISSUER_RESTRICTED_CARD | La tarjeta está inactiva, o usted no está autorizado a realizar esta transacción. | La tarjeta utilizada por el cliente no está habilitada para realizar compras online.<br>El cliente debe ponerse en contacto con el banco emisor de la tarjeta y habilitar las compras en línea.<br>Si la tarjeta está autorizada para realizar compras en línea, verifique su autorización de uso dentro de la región geográfica de la tienda. |
| `TR024` | ACQUIRER_FRECUENCY_EXCEEDED | Se ha superado la frecuencia de uso o el importe máximo. | La tarjeta del cliente ha sobrepasado la frecuencia de uso permitida o ha superado el límite de importe especificado en un periodo determinado.<br>El cliente debe ponerse en contacto con el banco emisor de su tarjeta para determinar el periodo de espera adecuado antes de volver a intentar la compra. |
| `TR025` | ACQUIRER_INVALID_ADDRESS | Los datos de dirección no se pueden validar o son incorrectos. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR026` | INSUFFICIENT_AMOUNT | Fondos insuficientes | Tu cliente debe intentar realizar la compra utilizando una tarjeta diferente, aumentar el límite de la tarjeta o liberar fondos disponibles. |
| `TR027` | ACQUIRER_DENIED_TRANSACTION_AUTHENTICATION_REQUIRED | La entidad adquirente ha rechazado la transacción y debe solicitar autorización. | El banco ha rechazado la compra online. El cliente debe ponerse en contacto con el banco emisor de la tarjeta para autorizar la compra.<br>Error relacionado `TR023` |
| `TR075` | PAYER_AUTHENTICATION_REQUIRED | La respuesta de 3DSecure indica que debe solicitar la validación del cliente. | Respuesta de la entidad adquirente indicando que se requiere la validación del cliente (**Verified by Visa** o HighProtection siendo _Santander_). |
| `TR076` | PAYER_AUTHENTICATION_FAILED | La autenticación del pagador falla. | La entidad adquirente indica que ha fallado la verificación adicional (o verificación en dos pasos) (HighProtection para _Santander_ o **Verified By Visa** para otros bancos).<br>El cliente debe ponerse en contacto con el banco emisor de la tarjeta o con el home banking del banco para comprobar si el servicio está habilitado.<br>Si está habilitado, verifique qué configuración tiene (verificación por email, SMS, token, etc) y vuelva a intentar la compra. |
| `TR100` | ACQUIRER_OTHER_REASONS | La entidad adquirente rechaza por muchos motivos. | Contacta a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR101` | ACQUIRER_REFUND_ERROR | La entidad adquirente no puede procesar el reembolso. Póngase en contacto con la entidad adquirente. | Contacte con [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR301` | Antifraud_Reject | Rechazado por el sistema antifraude | Sistema antifraude de Bamboo.<br>Valide con [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) qué regla se vio afectada antes de que tu cliente reintente la compra. |
| `TR302` | Antifraud_Invalid_Parameter | Parámetros no válidos para el sistema antifraude de Bamboo.<br>Valide con [Soporte de Bamboo](mailto:soportecomercios@bamboopayment.com) qué regla se vio afectada antes de que tu cliente reintente la compra. |
| `TR997` | TRANSACTION_STEP_ERROR | Se ha producido un error al ejecutar el proceso actual. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información. |
| `TR999` | UNKNOWN | Error indeterminado al ejecutar la transacción. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para más información . |

### Errores del servicio Purchase {#purchase-service-errors}
Los errores del servicio Purchase empiezan por `PR`.

<div id="cutMessage"></div>

| Código | Mensaje | Descripción |
|---|---|---|
| `PR001` | INVALID_TOKEN | El token informado no es válido, ha caducado o no corresponde al comercio. |
| `PR002` | INVALID_ORDER | El número de orden no es válido. |
| `PR003` | PR_INVALID_AMOUNT | El monto a devolver no puede ser mayor al de la compra. |
| `PR004` | PR_INVALID_CURRENCY_PARAMETER | El parámetro de moneda de la compra es inválido. |
| `PR005` | INVALID_INVOICE | El número de factura no es válido (debe ser numérico). |
| `PR006` | PR_INVALID_PURCHASE_IDENTIFIER | Identificador inválido para la compra. |
| `PR007` | PR_INVALID_TRANSACTION_IDENTIFIER | Identificador de transacción inválido |
| `PR008` | PURCHASE_NOT_FOUND | No se encuentra la compra solicitada. |
| `PR009` | INVALID_PURCHASE_STATE | El estado actual de la compra no permite la operación solicitada. |
| `PR010` | TAXABLE_AMOUNT_REQUIRED | El campo `TaxableAmount` es obligatorio. |
| `PR011` | INVOICE_REQUIRED | El campo `Invoice` es obligatorio. |
| `PR012` | INVALID_CAPTURED_CVV_REQUIRED | Se requiere la captura del código de verificación de la tarjeta. |
| `PR013` | INVALID_INSTALLMENTS | Los plazos seleccionados para la compra no son válidos para la tarjeta. |
| `PR014` | INVALID_DESCRIPTION_LENGTH | Descripción de longitud de parámetro no válida. |
| `PR015` | INVALID_CUSTOMER_USER_AGENT_EMPTY | El parámetro `UserAgent` está vacío. |
| `PR016` | INVALID_CUSTOMER_IP_EMPTY | El parámetro `CustomerIP` está vacío. |
| `PR017` | TAXABLE_AMOUNT_GREATER_THAN_AMOUNT | El campo `TaxableAmount` no puede ser mayor que el importe total de la compra. |
| `PR018` | PR_DATE_NEEDED | Para filtrar por fechas, debe introducir el valor de los parámetros `From` y `To`. |
| `PR019` | EXCEED_DATE_RANGE | El periodo de búsqueda excede el número máximo de días. |
| `PR020` | INVALID_DOCUMENT_NUMBER | Documento registrado inválido.
| `PR021` | NOT_ALLOW_PARTIAL_REFUND | No se permiten devoluciones parciales para el medio de pago utilizado. |

### Errores del servicio Customers {#customers-service-errors}
Los errores del servicio Customer empiezan por `CS`.

<div id="cutMessage"></div>

| Código | Mensaje | Descripción |
|---|---|---|
| `CS001` | INVALID_EMAIL | Dirección de correo electrónico no válida. |
| `CS002` | INVALID_ADDRESS_TYPE | Tipo de dirección no válida. |
| `CS003` | INVALID_CUSTOMER_IDENTIFIER | Identificador de cliente no válido. |
| `CS004` | TOKEN_CREATION_FAILED | Se ha producido un error en la creación del token. |
| `CS005` | EMAIL_ALREADY_EXISTS | E-mail ya registrado. |
| `CS006` | INVALID_ADDITIONAL_DATA | El parámetro `AdditionalData` no fue enviado correctamente, debe ser `key:value` separado por punto y coma. |
| `CS007` | INVALID_CUSTOMER_DOCUMENT | Número de documento de cliente no válido. |
| `CS008` | INVALID_CUSTOMER_DOCUMENT_TYPE | Tipo de documento de cliente inválido. |
| `CS009` | TOKEN_ALREADY_EXISTS | Ya existía un `CommerceToken` para la tarjeta. |
| `CS010` | INVALID_PAYMENT_PROFILE | Perfil de pago no válido. |
| `CS011` | INVALID_PAYMENT_PROFILE_IDENTIFIER | Identificador de perfil de pago no válido. |

### Errores del servicio Planes de fidelización {#loyalty-plan-service-errors}
Los errores de Planes de fidelización empiezan por `LP`.

| Código | Descripción |
|---|---|
| `LP0001` | El token es requerido. |
| `LP0002` | Plan de fidelización inválido. |
| `LP0003` | Error al consultar saldo de puntos. |
| `LP0004` | El programa no existe. |
| `LP0005` | El centro de Canje no existe. |
| `LP0006` | La sucursal no existe. |
| `LP0007` | El programa no está activo. |
| `LP0008` | El centro de Canje no está habilitado. |
| `LP0009` | El centro de Canje no pertenece al programa. |
| `LP0010` | El centro de Canje no activo para el programa. |
| `LP0011` | Sucursal no pertenece al Centro de Canje. |
| `LP0012` | El usuario no existe. |
| `LP0013` | El usuario no pertenece al Programa. |
| `LP0014` | La moneda no existe. |
| `LP0015` | La cotización no existe. |
| `LP0016` | El tipo de documento no existe. |
| `LP0017` | El cliente no existe. |
| `LP0018` | El saldo no existe. |
| `LP0019` | Token no encontrado. |
| `LP0020` | Tarjeta no encontrada. |
| `LP0021` | Tarjeta vencida. |
| `LP0022` | Error de sintaxis en el Programa. |
| `LP0023` | Error de sintaxis en el Centro de Canje. |
| `LP0024` | Error de sintaxis en la Sucursal. |
| `LP0025` | Error de sintaxis en la Moneda. |
| `LP0026` | Error de sintaxis en el Importe. |
| `LP0027` | Error de sintaxis en la Identificación de usuario (`LoyaltyPlanUserIdentification`). |
| `LP0028` | Error de sintaxis en la Tarjeta enmascarada. |
| `LP0029` | Error de sintaxis en el Id de la Transacción. |
| `LP0030` | Error de sintaxis en el Id de la Transacción de la Pasarela. |
| `LP0031` | Error de sintaxis en la cantidad de puntos. |
| `LP0032` | Error de sintaxis en la cantidad de cuotas. |
| `LP0033` | Error en el token (Authorization). |
| `LP0034` | La solicitud tiene una sintaxis incorrecta, es demasiado grande o tiene un formato de mensaje no válido. |
| `LP0035` | Credenciales inválidas. |
| `LP0036` | El usuario que inició sesión no tiene permiso para ver los datos del cliente. |
| `LP0037` | No se puede encontrar el recurso solicitado. |
| `LP0038` | El plan de fidelización es requerido. |
| `LP0039` | El identificador del cliente dentro del plan de fidelización es requerido. |
| `LP0040` | Error en los datos de ingreso. |
| `LP0041` | Cliente no autorizado. |
| `LP0042` | Saldo insuficiente. |
| `LP0043` | El token ha expirado. |
| `LP0044` | El movimiento está cancelado. |
| `LP0045` | El movimiento no existe. |
| `LP0046` | No coincide cantidad de puntos enviada con puntos del movimiento. |
| `LP0047` | El movimiento ya fue devuelto. |
| `LP0048` | El movimiento es una devolución. |
| `LP0049` | La pasarela de pagos no existe. |
| `LP0050` | `CustomerId` con formato incorrecto. |
| `LP0051` | No existe el punto. |
| `LP0052` | No coincide monto enviado con monto del movimiento. |
| `LP0053` | No coincide moneda enviada con moneda del movimiento. |
| `LP0054` | El cliente no existe o está inactivo. |
| `LP0055` | Cliente está bloqueado. |
