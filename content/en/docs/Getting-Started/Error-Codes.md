---
title: "Error Codes"
linkTitle: "Error Codes"
date: 2023-03-02T11:40:29-05:00
Description: >
  This article provides the information about the error codes and provides information about the possible actions you can take.
weight: 45
---
<script src="/js/searchcodes.js"></script>

<input type="text" id="searchBox" placeholder="Search by code or description..." onkeyup="findTables()" >
<button onclick="document.getElementById('searchBox').value = '';findTables()" class="">Clear</button>

## HTTP Codes
| Code | Description  | Usage  |
|---|---|---|
| `200` | Ok  | La solicitud fue procesada correctamente. |
| `400` | Bad Request | La solicitud está mal formada o falta algún parámetro obligatorio. |
| `401` | Unauthorized | Fallo de autenticación. |
| `403` | Forbidden | No tiene permisos para realizar la operación solicitada. |
| `404` | Not Found | El recurso solicitado no fue encontrado. |
| `405` | Method not Allowed | Request por método incorrecto (ej. GET en lugar de POST). |
| `408` | Request Timeout | No se pudo completar el pedido en el tiempo máximo configurado. |
| `500` | Internal Server Error | Ocurrió un error en el servicio. |
| `503` | Service Unavailable | El servicio está en mantenimiento o experimentando problemas de acceso. |


## Error Codes

### Tokenization service errors
Tokenization errors always starts with `TK`.

| Code | Message | Description | Possible solution  |
|---|---|---|---|
| `TK001` | INVALID_CARD_PAN | The card number entered is incorrect. |  |
| `TK002` | INVALID_CVV | The CVV number entered is incorrect. |  |
| `TK003` | INVLALID_EXPIRATION_DATE | The card expiration date is incorrect. |  |
| `TK004` | INVALID_SESSION_IDENTIFIER | An invalid session ID was sent in a token request. |  |
| `TK005` | INVALID_EMAIL | An email with incorrect format was entered. |  |
| `TK006` | EXPIRED_TOKEN | The token (One-Time type) has already been used or is expired. |  |
| `TK007` | INVALID_PAYMENT_MEDIA | Means of payment does not match what was expected. |  |
| `TK008` | ISSUER_BANK_NOT_MATCH | Issuer bank does not match the expected. |  |
| `TK009` | INVALID_ACTIVATION_CODE | Token activation code is invalid. |  |
| `TK010` | INVALID_COMMERCE_TOKEN | Commerce Token is invalid. |  |
| `TK011` | CUSTOMER_NOT_FOUND | The specified customer is not valid. |  |
| `TK012` | TOKEN_ACTIVATION_ERROR | Error while activating token. |  |
| `TK013` | TOKEN_REGISTRY_VOID_ERROR | Error in registration process. |  |
| `TK014` | TOKEN_PAYMENT_MEDIA_DISABLED | Means of payment disabled. |  |
| `TK015` | TOKEN_PAYMENT_MEDIA_UNAVAILABLE | Means of payment not available for the Commerce |  |
| `TK016` | PAYMENT_MEDIA_REGISTRY_FAILS | An error occurred in the process of registering the means of payment. |  |
| `TK017` | INVALID_DOCUMENT_NUMBER | Invalid document |  |
| `TK018` | INVALID_DOCUMENT_TYPE | Invalid document type |  |
| `TK999` | UNKNOWN_ERROR | Unknown error. |  |

### Purchase service errors
Purchase errors always starts with `PR`.

| Code | Message | Description | Possible solution  |
|---|---|---|---|
| `PR001` | INVALID_TOKEN | The informed token is invalid, expired or does not correspond to the commerce. |  |
| `PR002` | INVALID_ORDER | The order number is invalid. |  |
| `PR003` | INVALID_AMOUNT | The reported amount is invalid. |  |
| `PR004` | INVALID_CURRENCY | The reported currency is invalid. |  |
| `PR005` | INVALID_INVOICE | The invoice number is invalid (it must be numeric). |  |
| `PR006` | INVALID_PURCHASE_IDENTIFIER | The Purchase identifier is invalid. |  |
| `PR007` | INVALID_TRANSACTION_IDENTIFIER | Invalid TransactionID |  |
| `PR008` | PURCHASE_NOT_FOUND | The requested purchase cannot be found. |  |
| `PR009` | INVALID_PURCHASE_STATE | The current purchase state does not allow the requested operation. |  |
| `PR010` | TAXABLE_AMOUNT_REQUIRED | The TaxableAmount field is required. |  |
| `PR011` | INVOICE_REQUIRED | The Invoice filed is required. |  |
| `PR012` | INVALID_CAPTURED_CVV_REQUIRED | Capture of the card verification code is required. |  |
| `PR013` | INVALID_INSTALLMENTS | Selected installments for the purchase are invalid for the card entered. |  |
| `PR014` | INVALID_DESCRIPTION_LENGTH | Invalid parameter length description. |  |
| `PR015` | INVALID_CUSTOMER_USER_AGENT_EMPTY | UserAgent parameter is empty. |  |
| `PR016` | INVALID_CUSTOMER_IP_EMPTY | CustomerIP parameter is empty. |  |
| `PR017` | TAXABLE_AMOUNT_GREATER_THAN_AMOUNT | The field TaxableAmount cannot be greater than the purchase total amount. |  |
| `PR018` | `PR_DATE_NEEDED | To filter by dates, you must enter valus for From and To parameters. |  |
| `PR019` | EXCEED_DATE_RANGE | The search period cannot exceed the following number of days. |  |
| `PR020` | INVALID_DOCUMENT_NUMBER | Invalid registered document |  |
| `PR021` | NOT_ALLOW_PARTIAL_REFUND | Partial refunds are not allowed for the payment method used. |  |