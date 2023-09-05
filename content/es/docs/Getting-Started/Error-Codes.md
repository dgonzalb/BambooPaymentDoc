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
| `en` | Inglés.<br>_Este es el idioma por defecto. Si no envía este encabezado o envía un idioma diferente a los soportadoes, recibirá los errores en este idioma._ |
| `es` | Español. |
| `pt` | Portugués. |

## Códigos de Error {#error-codes}

{{% alert title="Info" color="info"%}}
El código de error para errores desconocidos o indeterminados es `ERR999`. En este caso, contacte a [Soporte de Bamboo](mailto:soportecomercios@bamboopayment.com) para obtener más información.
{{% /alert %}}

### Errores del servicio de tokenización {#tokenization-service-errors}
Los errores de tokenización siempre empiezan por `TK`.

<div id="cutMessage"></div>

| Código | Mensaje | Descripción | Posible solución |
|---|---|---|---|
| `TK001` | INVALID_CARD_PAN | El número de tarjeta introducido es incorrecto. | Pida a su cliente que compruebe el número de tarjeta y vuelva a intentar la transacción. |
| `TK002` | INVALID_CVV | El número CVV introducido es incorrecto. | Pida a su cliente que compruebe el código de validación y vuelva a intentar la transacción. |
| `TK003` | INVALID_EXPIRATION_DATE | La fecha de expiración de la tarjeta es incorrecta. | Pida a su cliente que compruebe la fecha de expiración y vuelva a intentar la transacción. |
| `TK004` | INVALID_SESSION_IDENTIFIER | Se ha enviado un identificador de sesión no válido en una solicitud de token. | [Regenere el token](/es/docs/purchase-workflow/customer-types.html) y vuelva a intentar la transacción. |
| `TK005` | INVALID_EMAIL | Se ha introducido un correo electrónico con formato incorrecto. | Pida a su cliente que compruebe la dirección de correo electrónico y vuelva a intentar la transacción.|
| `TK006` | EXPIRED_TOKEN | El token (de tipo One-Time) ya se ha utilizado o ha caducado. | [Regenere el token (OTT)]({{< ref anonymous-users.md >}}#capture-the-card-data) y vuelva a intentar la transacción. |
| `TK007` | INVALID_PAYMENT_MEDIA | Error con la información del método de pago. | El `PaymentMediaId` no es correcto. Compruebe el valor del método de pago en la [lista de países](/es/docs/payment-methods.html) correspondiente. |
| `TK008` | ISSUER_BANK_NOT_MATCH |  El banco emisor no coincide con el esperado. | Valide el banco emisor de la tarjeta de su cliente. |
| `TK009` | INVALID_ACTIVATION_CODE | El código de activación del token no es válido.| Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para activar el método de pago. |
| `TK010` | INVALID_COMMERCE_TOKEN | El token de comercio no es válido. | [Regenere el token (CT)]({{< ref Registered-users.md >}}) y vuelva a intentar la transacción. |
| `TK011` | CUSTOMER_NOT_FOUND | El cliente especificado no es válido. | El cliente utilizado para crear el token no se ha encontrado o no es válido. |
| `TK012` | TOKEN_ACTIVATION_ERROR | Error al activar el código.  | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para activar el método de pago. |
| `TK013` | TOKEN_REGISTRY_VOID_ERROR | Error en el proceso de registro. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para activar el método de pago. |
| `TK014` | TOKEN_PAYMENT_MEDIA_DISABLED | Método de pago deshabilitado. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para activar el método de pago. |
| `TK015` | TOKEN_PAYMENT_MEDIA_UNAVAILABLE | El método de pago no está disponible para el comercio. | Compruebe que haya habilitado el método de pago seleccionado. |
| `TK016` | PAYMENT_MEDIA_REGISTRY_FAILS | Se ha producido un error en el proceso de registro del método de pago | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para activar el método de pago. |
| `TK017` | INVALID_DOCUMENT_NUMBER | Documento no válido. | El documento proporcionado no es válido según las normas del país. |
| `TK018` | INVALID_DOCUMENT_TYPE | Tipo de documento no válido | El tipo de documento enviado no es válido o no pertenece al país. |
| `TK999` | UNKNOWN_ERROR | Error desconocido. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |

### Transactions service errors
Transaction errors always starts with `TR`.

<div id="cutMessage"></div>

| Código | Mensaje | Descripción | Posible solución |
|---|---|---|---|
| `TR001` | COMMUNICATION_ERROR | Communication error with the acquiring service. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR002` | INVALID_TRANSACTION_STATE | The transaction associated with the purchase is in a state that does not allow the execution of the current operation. This error occurs, por ejemplo, when you want to perform a _Commit_ operation on a Purchase that is already authorized or rejected. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR003` | ACQUIRER_ACCOUNT_PROBLEM | Problems with the merchant account at the Acquirer. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR004` | ACQUIRER_PROXY_ERROR | Error sending transaction to the Acquirer via Proxy. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR005` | ACQUIRER_PROBLEM | Acquirer’s internal error. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR006` | ACQUIRER_DUPLICATED_ORDER | Duplicate order number at the Acquirer. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR007` | INVALID_PAYMENT_MEDIA | Payment data errors (card number, verification code, or expiration date). | Ask your customer to verify the card information and retry the transaction. |
| `TR008` | COMMIT_AMOUNT_GREATER_THAN_AUTHORIZED | The amount you intend to confirm is higher than previously authorized. | The [commit operation]({{< ref purchase-operations.md>}}#confirm-a-purchase) was requested for a higher amount than authorized. Send an equal or lower value than the original authorization. |
| `TR009` | ACQUIRER_UNKNOWN_ERROR | Unknown Acquirer error. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR010` | ACQUIRER_INVALID_DOCUMENT | Invalid customer’s document number in the acquirer. | Your customer must check the document type and number provided and retry the transaction. Otherwise, they must contact their card issuer bank. |
| `TR011` | BLOCKED_OR_LOST_CARD | Blocked or lost card. | Your customer must check the card used or contact the card issuer bank to unblock it before retry the transaction.  |
| `TR012` | ACQUIRER_LIMIT_EXCEEDED | Credit limit exceeded. | Your customer must try to make the purchase using a different card, raise the card limit, or free up available funds. |
| `TR013` | ACQUIRER_DENIED_TRANSACTION | Acquirer or issuer denied the transaction. | The acquirer or the card issuer bank has rejected the transaction.<br>This rejection may have multiple causes depending on the acquisition contracted and configured by you.<br>Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR014` | ACQUIRER_POSSIBLE_FRAUD | The Acquirer denied the transaction for possible fraud. | The Acquirer has rejected the transaction based on their anti-fraud system.<br>The Anti-fraud rules of the Acquirer are associated with the merchant's business type (line, category, products) and the contract signed for the online shopping terminal requested.<br>You (as commerce) must contact the acquirer to determine whether it's required to make an adjustment of the anti-fraud rules. |
| `TR015` | ACQUIRER_REVIEW_NEEDED | The Acquirer suggests the manual review of the transaction. Por ejemplo, on suspicion of fraud. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR016` | ACQUIRER_INVALID_PARAMETER | Error in the parameters reported to the acquirer. |Some of the data the customer provides when making the purchase is incorrect or incomplete.<br>Your customer must verify if they provided the address (along with city and country), name and last name, and document.<br>Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) if you cannot verify. |
| `TR017` | INVALID_TRANSACTION_TYPE | Invalid transaction type. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR018` | REGISTRATION_DENIED | The Acquirer denied the card registration. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR019` | ACQUIRER_TRANSACTION_REJECTED | The acquirer or processor rejected the transaction. | The acquirer or the card issuer bank has rejected the transaction.<br>This rejection may have multiple causes depending on the acquisition contracted and configured by you.<br>Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR020` | ISSUER_DECLINE_CALL | The issuer denied the transaction; however, the issuer can verbally provide authorization. | The bank has rejected the online purchase. Your customer must contact the card issuer bank to authorize the purchase.<br>Related error `TR023` |
| `TR021` | ISSUER_EXPIRED_CARD | The expired date or expired card does not match. | The acquirer indicates that the card is expired or the expiration date provided by the customer is incorrect.<br>Your customer must validate this information in the card before retrying the purchase. |
| `TR022` | ISSUER_INVALID_CVV | The issuer indicates that CVV is invalid. | The Acquirer indicates that the card's validation code (CVV) is incorrect.<br>Your customer must validate this information on the card before retrying the purchase. |
| `TR023` | ISSUER_RESTRICTED_CARD | The card is inactive, or you are not authorized to do this transaction. | The card used by the customer is not enabled to perform online purchases.<br>Your customer must contact the card issuer bank and enable the online purchases.<br>If the card is authorized for online purchases, verify its authorization for usage within the geographical region of the shop. |
| `TR024` | ACQUIRER_FRECUENCY_EXCEEDED | The frequency of use or the maximum amount has been exceeded. | The customer's card has surpassed the allowable usage count or exceeded the specified amount limit within a certain period.<br>The customer should contact their card issuer bank to determine the appropriate waiting period before attempting the purchase again. |
| `TR025` | ACQUIRER_INVALID_ADDRESS | Address data cannot validate or is incorrect. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR026` | INSUFFICIENT_AMOUNT | Insufficient Funds | Your customer must try to make the purchase using a different card, raise the card limit, or free up available funds.  |
| `TR027` | ACQUIRER_DENIED_TRANSACTION_AUTHENTICATION_REQUIRED | The acquirer denied the transaction and must request authorization. | The bank has rejected the online purchase. Your customer must contact the card issuer bank to authorize the purchase.<br>Related error `TR023` |
| `TR075` | PAYER_AUTHENTICATION_REQUIRED | 3DSecure response indicates that it must require customer validation. | Acquirer response indicating that customer validation (**Verified by Visa** or HighProtection being _Santander_) is required. |
| `TR076` | PAYER_AUTHENTICATION_FAILED | Payer authentication fails. | The acquirer indicates that the additional verification (or two-step verification) has failed (HighProtection for _Santander_ or **Verified By Visa** for other banks).<br>Your customer must contact the card issuer bank or the bank's home banking to check whether the service is enabled.<br>If it is enabled, verify what configuration it has (verification by email, SMS, token, etc) and then retry the purchase. |
| `TR100` | ACQUIRER_OTHER_REASONS | The acquirer rejects for many reasons. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR101` | ACQUIRER_REFUND_ERROR | The acquirer cannot process the refund. Contact the acquirer. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR301` | Antifraud_Reject | Rejected by anti-fraud system | Bamboo's Anti-fraud system.<br>Validate with [Bamboo support](mailto:soportecomercios@bamboopayment.com) what rule was affected before your customer retries the purchase. |
| `TR302` | Antifraud_Invalid_Parameter | Invalid parameters for anti-fraud system | Bamboo's Anti-fraud system.<br>Validate with [Bamboo support](mailto:soportecomercios@bamboopayment.com) what rule was affected before your customer retries the purchase. |
| `TR997` | TRANSACTION_STEP_ERROR | An error occurred while executing the current process. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |
| `TR999` | UNKNOWN | Undetermined error when executing the transaction. | Contacte a [Soporte Bamboo](mailto:soportecomercios@bamboopayment.com) para mas información. |

### Purchase service errors
Purchase errors always starts with `PR`.

<div id="cutMessage"></div>

| Código | Mensaje | Descripción |
|---|---|---|
| `PR001` | INVALID_TOKEN | The informed token is invalid, expired or does not correspond to the commerce. | 
| `PR002` | INVALID_ORDER | The order number is invalid. |
| `PR003` | INVALID_AMOUNT | The reported amount is invalid. |
| `PR004` | INVALID_CURRENCY | The reported currency is invalid. |
| `PR005` | INVALID_INVOICE | The invoice number is invalid (it must be numeric). |
| `PR006` | INVALID_PURCHASE_IDENTIFIER | The Purchase identifier is invalid. |
| `PR007` | INVALID_TRANSACTION_IDENTIFIER | Invalid `TransactionID`. |
| `PR008` | PURCHASE_NOT_FOUND | The requested purchase cannot be found. |
| `PR009` | INVALID_PURCHASE_STATE | The current purchase state does not allow the requested operation. |
| `PR010` | TAXABLE_AMOUNT_REQUIRED | The `TaxableAmount` field is required. |
| `PR011` | INVOICE_REQUIRED | The `Invoice` filed is required. |
| `PR012` | INVALID_CAPTURED_CVV_REQUIRED | Capture of the card verification code is required. |
| `PR013` | INVALID_INSTALLMENTS | The selected installments for the purchase are invalid for the card. |
| `PR014` | INVALID_DESCRIPTION_LENGTH | Invalid parameter length description. |
| `PR015` | INVALID_CUSTOMER_USER_AGENT_EMPTY | `UserAgent` parameter is empty. |
| `PR016` | INVALID_CUSTOMER_IP_EMPTY | `CustomerIP` parameter is empty. |
| `PR017` | TAXABLE_AMOUNT_GREATER_THAN_AMOUNT | The field `TaxableAmount` cannot be greater than the purchase total amount. |
| `PR018` | PR_DATE_NEEDED | To filter by dates, you must enter value for `From` and `To` parameters. |
| `PR019` | EXCEED_DATE_RANGE | The search period exceeds the maximum number of days. |
| `PR020` | INVALID_DOCUMENT_NUMBER | Invalid registered document |
| `PR021` | NOT_ALLOW_PARTIAL_REFUND | Partial refunds are not allowed for the payment method used. |

### Customers service errors
Customer always starts with `CS`.

<div id="cutMessage"></div>

| Código | Mensaje | Descripción |
|---|---|---|
| `CS001` | INVALID_EMAIL | Invalid e-mail address. |
| `CS002` | INVALID_ADDRESS_TYPE | Invalid address type. |
| `CS003` | INVALID_CUSTOMER_IDENTIFIER | Invalid customer identifier. |
| `CS004` | TOKEN_CREATION_FAILED | An error occurred in the token creation. |
| `CS005` | EMAIL_ALREADY_EXISTS | E-mail already registered. |
| `CS006` | INVALID_ADDITIONAL_DATA | The parameter `AdditionalData` was not send correctly, it must be `key:value` separated by semicolon. |
| `CS007` | INVALID_CUSTOMER_DOCUMENT | Invalid customer document number. |
| `CS008` | INVALID_CUSTOMER_DOCUMENT_TYPE | Invalid customer document type. |
| `CS009` | TOKEN_ALREADY_EXISTS | There was already a `CommerceToken` for the card. |
| `CS010` | INVALID_PAYMENT_PROFILE | Invalid Payment Profile. |
| `CS011` | INVALID_PAYMENT_PROFILE_IDENTIFIER | Invalid Payment Profile Identifier. |

### Loyalty Plan service errors
Loyalty plan errors always starts with `LP`.

| Código | Descripción |
|---|---|
| `LP004` | The program does not exist. |
| `LP005` | The redemption center does not exist. |
| `LP006` | The branch does not exist. |
| `LP007` | The program is not active. |
| `LP008` | The redemption center is not enabled. |
| `LP009` | The redemption center does not belong to the program. |
| `LP010` | The redemption center is not active for the program. |
| `LP011` | The branch does not belong to the redemption center. |
| `LP012` | The user does not exist. |
| `LP013` | The user does not belong to the program. |
| `LP014` | The currency does not exist. |
| `LP015` | The quotation does not exist. |
| `LP016` | The document type does not exist. |
| `LP017` | The customer does not exist. |
| `LP018` | The balance does not exist. |
| `LP019` | Token not found. |
| `LP020` | Card not found. |
| `LP021` | Card expired. |
| `LP022` | Syntax error in the Program. |
| `LP023` | Syntax error in the Redemption Center. |
| `LP024` | Syntax error in the Branch. |
| `LP025` | Syntax error in the Currency. |
| `LP026` | Syntax error in the Import. |
| `LP027` | Syntax error in the user identification (`LoyaltyPlanUserIdentification`). |
| `LP028` | Syntax error in the masked card. |
| `LP029` | Syntax error in the Transaction Id. |
| `LP030` | Syntax error in the gateway Transaction Id. |
| `LP031` | Syntax error in the number of points. |
| `LP032` | Syntax error in the number of installments. |
| `LP033` | Syntax error in the token (Authorization). |
| `LP034` | The request has an invalid syntax. It is too big or it has an invalid format message. |
| `LP035` | Invalid credentials. |
| `LP036` | The logged user is not allowed to see the customer data. |
| `LP037` | The resource requested cannot be found. |
| `LP038` | The loyalty plan is mandatory. |
| `LP039` | The Customer Id of the loyalty plan is mandatory. |
| `LP040` | Input data error. |
| `LP041` | The customer is not authorized. |
| `LP042` | Insufficient balance. |
| `LP043` | The token has expired. |
| `LP044` | The movement is canceled. |
| `LP045` | The movement does not exist. |
| `LP046` | The number of points sent does not match the points in the movement. |
| `LP047` | The movement has already been refunded. |
| `LP048` | The movement is a refund. |
| `LP049` | The gateway does not exist. |
| `LP050` | `CustomerId` with the wrong format. |
| `LP051` | The point does not exist. |
| `LP052` | The amount sent does not match the amount in the movement. |
| `LP053` | The currency sent does not match the currency in the movement. |
| `LP054` | The customer does not exist or is not active. |
| `LP055` | Customer blocked. |