---
title: "Error Codes and descriptions"
linkTitle: "Error Codes"
date: 2023-03-02T11:40:29-05:00
Description: >
  This article provides information about the error codes and the possible actions you can take.
weight: 45
---
<script src="/js/searchcodes.js"></script>

<input type="text" id="searchBox" placeholder="Search by code or description..." onkeyup="findTables()" >
<button onclick="document.getElementById('searchBox').value = '';findTables()" class="">Clear</button>

## HTTP Codes
| Code | Description | Usage |
|---|---|---|
| `200` | Ok | The request was processed successfully. |
| `400` | Bad Request | The request is malformed or missing some required parameter. |
| `401` | Unauthorized | Authentication failure. |
| `403` | Forbidden | You don't have permission to perform the requested operation. |
| `404` | Not Found | The resource requested was not found. |
| `405` | Method not Allowed | Incorrect request method (e.g., GET instead of POST). |
| `408` | Request Timeout | The request could not be completed within the configured maximum time. |
| `500` | Internal Server Error | An error occurred in the service. |
| `503` | Service Unavailable | The service is undergoing maintenance or experiencing access issues. |

## Multilanguage for errors
You can receive the error description by relying on localization features. To do this, you need to send the `lang` header in your integration, using any of the following languages in **ISO 639-1** format.

<div id="shortTable"></div>

| Code | Language |
|:-:|---|
| `en` | English.<br>_This is the default language. If you don't send this header or set a non-existent language, you will receive errors in this language._ |
| `es` | Spanish. |
| `pt` | Portuguese. |

## Error Codes

{{% alert title="Info" color="info"%}}
The error code for unknown or undetermined errors is `ERR999`. In this case, contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information.
{{% /alert %}}

### Tokenization service errors
Tokenization errors always starts with `TK`.

<div id="cutMessage"></div>

| Code | Message | Description | Possible solution |
|---|---|---|---|
| `TK001` | INVALID_CARD_PAN | The card number entered is incorrect. | Ask your customer to check the card number and retry the transaction. |
| `TK002` | INVALID_CVV | The CVV number entered is incorrect. | Ask your customer to check the validation code and retry the transaction. |
| `TK003` | INVALID_EXPIRATION_DATE | The card expiration date is incorrect. | Ask your customer to check the expiration date and retry the transaction. |
| `TK004` | INVALID_SESSION_IDENTIFIER | An invalid session ID was sent in a token request. | [Regenerate the token](/en/docs/purchase-workflow/customer-types.html) and retry the transaction. |
| `TK005` | INVALID_EMAIL | An email with incorrect format was entered. | Ask your customer to check the email address and retry the transaction.|
| `TK006` | EXPIRED_TOKEN | The token (One-Time type) has already been used or is expired. | [Regenerate the token (OTT)]({{< ref anonymous-users.md >}}#capture-the-card-data) and retry the transaction. |
| `TK007` | INVALID_PAYMENT_MEDIA | Error with the information of the payment method. | The `PaymentMediaId` is not correct. Check the payment method's value in the respective [country's list](/en/docs/payment-methods.html). |
| `TK008` | ISSUER_BANK_NOT_MATCH | Issuer bank does not match the expected. | Validate the issuer bank of your customer's card |
| `TK009` | INVALID_ACTIVATION_CODE | Token activation code is invalid. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) to enable the payment method. |
| `TK010` | INVALID_COMMERCE_TOKEN | Commerce Token is invalid. | [Regenerate the token (CT)]({{< ref Registered-users.md >}}) and retry the transaction. |
| `TK011` | CUSTOMER_NOT_FOUND | The specified customer is not valid. | Your customer used to create the token was not found or is invalid. |
| `TK012` | TOKEN_ACTIVATION_ERROR | Error while activating token. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) to enable the payment method. |
| `TK013` | TOKEN_REGISTRY_VOID_ERROR | Error in registration process. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) to enable the payment method. |
| `TK014` | TOKEN_PAYMENT_MEDIA_DISABLED | Payment method disabled. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) to enable the payment method. |
| `TK015` | TOKEN_PAYMENT_MEDIA_UNAVAILABLE | The payment method is not available for the Commerce | Verify that you have enabled the payment method selected. |
| `TK016` | PAYMENT_MEDIA_REGISTRY_FAILS | An error occurred in the process of registering the payment method. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) to enable the payment method. |
| `TK017` | INVALID_DOCUMENT_NUMBER | Invalid document. | The document provided is not valid according to the country rules. |
| `TK018` | INVALID_DOCUMENT_TYPE | Invalid document type | The document type sent is not valid or does not belong to the country. |
| `TK999` | UNKNOWN_ERROR | Unknown error. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |

### Transactions service errors
Transaction errors always starts with `TR`.

<div id="cutMessage"></div>

| Code | Message | Description | Possible solution |
|---|---|---|---|
| `TR001` | COMMUNICATION_ERROR | Communication error with the acquiring service. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR002` | INVALID_TRANSACTION_STATE | The transaction associated with the purchase is in a state that does not allow the execution of the current operation. This error occurs, for example, when you want to perform a _Commit_ operation on a Purchase that is already authorized or rejected. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR003` | ACQUIRER_ACCOUNT_PROBLEM | Problems with the merchant account at the Acquirer. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR004` | ACQUIRER_PROXY_ERROR | Error sending transaction to the Acquirer via Proxy. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR005` | ACQUIRER_PROBLEM | Acquirer’s internal error. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR006` | ACQUIRER_DUPLICATED_ORDER | Duplicate order number at the Acquirer. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR007` | INVALID_PAYMENT_MEDIA | Payment data errors (card number, verification code, or expiration date). | Ask your customer to verify the card information and retry the transaction. |
| `TR008` | COMMIT_AMOUNT_GREATER_THAN_AUTHORIZED | The amount you intend to confirm is higher than previously authorized. | The [commit operation]({{< ref purchase-operations.md>}}#confirm-a-purchase) was requested for a higher amount than authorized. Send an equal or lower value than the original authorization. |
| `TR009` | ACQUIRER_UNKNOWN_ERROR | Unknown Acquirer error. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR010` | ACQUIRER_INVALID_DOCUMENT | Invalid customer’s document number in the acquirer. | Your customer must check the document type and number provided and retry the transaction. Otherwise, they must contact their card issuer bank. |
| `TR011` | BLOCKED_OR_LOST_CARD | Blocked or lost card. | Your customer must check the card used or contact the card issuer bank to unblock it before retry the transaction.  |
| `TR012` | ACQUIRER_LIMIT_EXCEEDED | Credit limit exceeded. | Your customer must try to make the purchase using a different card, raise the card limit, or free up available funds. |
| `TR013` | ACQUIRER_DENIED_TRANSACTION | Acquirer or issuer denied the transaction. | The acquirer or the card issuer bank has rejected the transaction.<br>This rejection may have multiple causes depending on the acquisition contracted and configured by you.<br>Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR014` | ACQUIRER_POSSIBLE_FRAUD | The Acquirer denied the transaction for possible fraud. | The Acquirer has rejected the transaction based on their anti-fraud system.<br>The Anti-fraud rules of the Acquirer are associated with the merchant's business type (line, category, products) and the contract signed for the online shopping terminal requested.<br>You (as commerce) must contact the acquirer to determine whether it's required to make an adjustment of the anti-fraud rules. |
| `TR015` | ACQUIRER_REVIEW_NEEDED | The Acquirer suggests the manual review of the transaction. For example, on suspicion of fraud. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR016` | ACQUIRER_INVALID_PARAMETER | Error in the parameters reported to the acquirer. |Some of the data the customer provides when making the purchase is incorrect or incomplete.<br>Your customer must verify if they provided the address (along with city and country), name and last name, and document.<br>Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) if you cannot verify. |
| `TR017` | INVALID_TRANSACTION_TYPE | Invalid transaction type. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR018` | REGISTRATION_DENIED | The Acquirer denied the card registration. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR019` | ACQUIRER_TRANSACTION_REJECTED | The acquirer or processor rejected the transaction. | The acquirer or the card issuer bank has rejected the transaction.<br>This rejection may have multiple causes depending on the acquisition contracted and configured by you.<br>Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR020` | ISSUER_DECLINE_CALL | The issuer denied the transaction; however, the issuer can verbally provide authorization. | The bank has rejected the online purchase. Your customer must contact the card issuer bank to authorize the purchase.<br>Related error `TR023` |
| `TR021` | ISSUER_EXPIRED_CARD | The expired date or expired card does not match. | The acquirer indicates that the card is expired or the expiration date provided by the customer is incorrect.<br>Your customer must validate this information in the card before retrying the purchase. |
| `TR022` | ISSUER_INVALID_CVV | The issuer indicates that CVV is invalid. | The Acquirer indicates that the card's validation code (CVV) is incorrect.<br>Your customer must validate this information on the card before retrying the purchase. |
| `TR023` | ISSUER_RESTRICTED_CARD | The card is inactive, or you are not authorized to do this transaction. | The card used by the customer is not enabled to perform online purchases.<br>Your customer must contact the card issuer bank and enable the online purchases.<br>If the card is authorized for online purchases, verify its authorization for usage within the geographical region of the shop. |
| `TR024` | ACQUIRER_FRECUENCY_EXCEEDED | The frequency of use or the maximum amount has been exceeded. | The customer's card has surpassed the allowable usage count or exceeded the specified amount limit within a certain period.<br>The customer should contact their card issuer bank to determine the appropriate waiting period before attempting the purchase again. |
| `TR025` | ACQUIRER_INVALID_ADDRESS | Address data cannot validate or is incorrect. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR026` | INSUFFICIENT_AMOUNT | Insufficient Funds | Your customer must try to make the purchase using a different card, raise the card limit, or free up available funds.  |
| `TR027` | ACQUIRER_DENIED_TRANSACTION_AUTHENTICATION_REQUIRED | The acquirer denied the transaction and must request authorization. | The bank has rejected the online purchase. Your customer must contact the card issuer bank to authorize the purchase.<br>Related error `TR023` |
| `TR075` | PAYER_AUTHENTICATION_REQUIRED | 3DSecure response indicates that it must require customer validation. | Acquirer response indicating that customer validation (**Verified by Visa** or HighProtection being _Santander_) is required. |
| `TR076` | PAYER_AUTHENTICATION_FAILED | Payer authentication fails. | The acquirer indicates that the additional verification (or two-step verification) has failed (HighProtection for _Santander_ or **Verified By Visa** for other banks).<br>Your customer must contact the card issuer bank or the bank's home banking to check whether the service is enabled.<br>If it is enabled, verify what configuration it has (verification by email, SMS, token, etc) and then retry the purchase. |
| `TR100` | ACQUIRER_OTHER_REASONS | The acquirer rejects for many reasons. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR101` | ACQUIRER_REFUND_ERROR | The acquirer cannot process the refund. Contact the acquirer. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR301` | Antifraud_Reject | Rejected by anti-fraud system | Bamboo's Anti-fraud system.<br>Validate with [Bamboo support](mailto:merchantsupport@bamboopayment.com) what rule was affected before your customer retries the purchase. |
| `TR302` | Antifraud_Invalid_Parameter | Invalid parameters for anti-fraud system | Bamboo's Anti-fraud system.<br>Validate with [Bamboo support](mailto:merchantsupport@bamboopayment.com) what rule was affected before your customer retries the purchase. |
| `TR996` | TR_BILLINGCORE_ERROR | An internal error occurred while processing the request. | Try again later. If the error persists, contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR997` | TRANSACTION_STEP_ERROR | An error occurred while executing the current process. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR999` | UNKNOWN | Undetermined error when executing the transaction. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |

### Purchase service errors
Purchase errors always starts with `PR`.

<div id="cutMessage"></div>

| Code | Message | Description |
|---|---|---|
| `PR001` | INVALID_TOKEN | The informed token is invalid, expired or does not correspond to the commerce. | 
| `PR002` | INVALID_ORDER | The order number is invalid. |
| `PR003` | PR_INVALID_AMOUNT | The amount to refund cannot be greater than the purchase amount.. |
| `PR004` | PR_INVALID_CURRENCY_PARAMETER | Invalid Currency parameter for the Purchase. |
| `PR005` | INVALID_INVOICE | The invoice number is invalid (it must be numeric). |
| `PR006` | PR_INVALID_PURCHASE_IDENTIFIER | Invalid Purchase Id for the Purchase. |
| `PR007` | PR_INVALID_TRANSACTION_IDENTIFIER | Invalid `TransactionID` for the Purchase. |
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

| Code | Message | Description |
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

| Code | Description |
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