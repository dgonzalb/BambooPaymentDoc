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

| Code  | Description | Possible solution |
|---|---|---|
| `TK001` | The card number entered is incorrect. | Ask your customer to check the card number and retry the transaction. |
| `TK002` | The CVV number entered is incorrect. | Ask your customer to check the validation code and retry the transaction. |
| `TK003` | The card expiration date is incorrect. | Ask your customer to check the expiration date and retry the transaction. |
| `TK004` | An invalid session ID was sent in a token request. | [Regenerate the token](/en/docs/purchase-workflow/customer-types.html) and retry the transaction. |
| `TK005` | An email with incorrect format was entered. | Ask your customer to check the email address and retry the transaction. |
| `TK006` | The token (One-Time type) has already been used or is expired. | [Regenerate the token (OTT)]({{< ref anonymous-users.md >}}#capture-the-card-data) and retry the transaction. |
| `TK007` | Error with the information of the payment method. | The `PaymentMediaId` is not correct. Check the payment method's value in the respective [country's list](/en/docs/payment-methods.html). |
| `TK008` | Issuer bank does not match the expected. | Validate the issuer bank of your customer's card |
| `TK009` | Token activation code is invalid. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) to enable the payment method. |
| `TK010` | Commerce Token is invalid. | [Regenerate the token (CT)]({{< ref Registered-users.md >}}) and retry the transaction. |
| `TK011` | The specified customer is not valid. | Your customer used to create the token was not found or is invalid. |
| `TK012` | Error while activating token. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) to enable the payment method. |
| `TK013` | Error in registration process. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) to enable the payment method. |
| `TK014` | Payment method disabled. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) to enable the payment method. |
| `TK015` | The payment method is not available for the Commerce | Verify that you have enabled the payment method selected. |
| `TK016` | An error occurred in the process of registering the payment method. | Contact [Bamboo support](mailto:support@bamboopayment.com) to enable the payment method. |
| `TK017` | Invalid document. | The document provided is not valid according to the country rules. |
| `TK018` | Invalid document type | The document type sent is not valid or does not belong to the country. |
| `TK019` | Invalid payment type | The payment type selected is not valid or does not belong to the country. |
| `TK020` | The authentication token sent is invalid.| Verify authentication token.|
| `TK021` | Authentication token is missing| Check if authentication token was sent.|
| `TK022` | The token data is not provided or is invalid| Contact [Bamboo support](mailto:support@bamboopayment.com) for more information.|
| `TK023` | The authentication has already been processed.| Check if authentication token has already been used.|
| `TK024` | The authentication does not need 3ds.| Check if authentication token has already been used, or if it is required. |
| `TK999` | Unknown error. | Contact [Bamboo support](mailto:support@bamboopayment.com) for more information. |


### Transactions service errors
Transaction errors always starts with `TR`.

<div id="cutMessage"></div>

| Code  | Description | Possible solution |
|---|---|---|
| `TR001` | Communication error with the acquiring service. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR002` | The transaction associated with the purchase is in a state that does not allow the execution of the current operation. This error occurs, for example, when you want to perform a _Commit_ operation on a Purchase that is already authorized or rejected. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR003` | Problems with the merchant account at the Acquirer. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR004` | Error sending transaction to the Acquirer via Proxy. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR005` | Acquirer’s internal error. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR006` | Duplicate order number at the Acquirer. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR007` | Payment data errors (card number, verification code, or expiration date). | Ask your customer to verify the card information and retry the transaction. |
| `TR008` | The amount you intend to confirm is higher than previously authorized. | The [commit operation]({{< ref card_operations.md>}}#confirm-a-purchase) was requested for a higher amount than authorized. Send an equal or lower value than the original authorization. |
| `TR009` | Unknown Acquirer error. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR010` | Invalid customer’s document number in the acquirer. | Your customer must check the document type and number provided and retry the transaction. Otherwise, they must contact their card issuer bank. |
| `TR011` | Blocked or lost card. | Your customer must check the card used or contact the card issuer bank to unblock it before retry the transaction. |
| `TR012` | Credit limit exceeded. | Your customer must try to make the purchase using a different card, raise the card limit, or free up available funds. |
| `TR013` | Acquirer or issuer denied the transaction. | The acquirer or the card issuer bank has rejected the transaction.<br>This rejection may have multiple causes depending on the acquisition contracted and configured by you.<br>Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR014` | The Acquirer denied the transaction for possible fraud. | The Acquirer has rejected the transaction based on their anti-fraud system.<br>The Anti-fraud rules of the Acquirer are associated with the merchant's business type (line, category, products) and the contract signed for the online shopping terminal requested.<br>You (as commerce) must contact the acquirer to determine whether it's required to make an adjustment of the anti-fraud rules. |
| `TR015` | The Acquirer suggests the manual review of the transaction. For example, on suspicion of fraud. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR016` | Error in the parameters reported to the acquirer. | Some of the data the customer provides when making the purchase is incorrect or incomplete.<br>Your customer must verify if they provided the address (along with city and country), name and last name, and document.<br>Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) if you cannot verify. |
| `TR017` | Invalid transaction type. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR018` | The Acquirer denied the card registration. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR019` | The acquirer or processor rejected the transaction. | The acquirer or the card issuer bank has rejected the transaction.<br>This rejection may have multiple causes depending on the acquisition contracted and configured by you.<br>Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR020` | The issuer denied the transaction; however, the issuer can verbally provide authorization. | The bank has rejected the online purchase. Your customer must contact the card issuer bank to authorize the purchase.<br>Related error `TR023` |
| `TR021` | The expired date or expired card does not match. | The acquirer indicates that the card is expired or the expiration date provided by the customer is incorrect.<br>Your customer must validate this information in the card before retrying the purchase. |
| `TR022` | The issuer indicates that CVV is invalid. | The Acquirer indicates that the card's validation code (CVV) is incorrect.<br>Your customer must validate this information on the card before retrying the purchase. |
| `TR023` | The card is inactive, or you are not authorized to do this transaction. | The card used by the customer is not enabled to perform online purchases.<br>Your customer must contact the card issuer bank and enable the online purchases.<br>If the card is authorized for online purchases, verify its authorization for usage within the geographical region of the shop. |
| `TR024` | The frequency of use or the maximum amount has been exceeded. | The customer's card has surpassed the allowable usage count or exceeded the specified amount limit within a certain period.<br>The customer should contact their card issuer bank to determine the appropriate waiting period before attempting the purchase again. |
| `TR025` | Address data cannot validate or is incorrect. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR026` | Insufficient Funds. | Your customer must try to make the purchase using a different card, raise the card limit, or free up available funds. |
| `TR027` | The acquirer denied the transaction and must request authorization. | The bank has rejected the online purchase. Your customer must contact the card issuer bank to authorize the purchase.<br>Related error `TR023` |
| `TR028` | The acquirer denied the transaction because the amount the customer paid did not match the purchase amount.<br>In this case, the bank returns the amount paid to the customer. | Your customer must retry the payment with the same value of the purchase amount. |
| `TR030` | Retry limit exceeded | The customer must use another card to make the purchase. The card used has exceeded the allowed number of purchases for the month, week, or day. |
| `TR031` | Account closed | The bank has detected that the account associated with the card has been closed. The customer must contact the card-issuing bank to reactivate the account or use another card. |
| `TR032` | Declined - contact your card-issuing bank | The bank has rejected the online purchase. The customer must contact the card-issuing bank. |
| `TR033` | Installments not allowed for international cards | The customer must use a non-international card to make the purchase in installments. |
| `TR035` | Missing bank information | Refund via Payout couldn't be processed, as customer didn't complete bank data. |
| `TR036` | Bank data not valid  | Refund via Payout couldn't be processed, as bank data is not valid or beneficiary doesn't match with bank details. |
| `TR039` | The provided amount is invalid. Verify that the amount is a valid and positive number. In case of refunds, ensure it does not exceed the original transaction amount. |
| `TR040` | The customer’s email has an incorrect format. Ask the customer to verify and correct their email address before retrying the transaction. |
| `TR041` | The 3DS authentication token is invalid. Generate a new 3DS authentication token and retry the transaction. |
| `TR042` | The 3DS authentication has already been processed. No need to retry. Authentication is already complete. |
| `TR043` | 3DS authentication does not apply to this transaction. Proceed without 3DS authentication. |
| `TR044` | The requested 3DS authentication was not found. Start a new 3DS authentication process. |
| `TR045` | The provided service type is invalid. Use one of the valid service type values. Currently, only `cybersource` is supported. |
| `TR075` | 3DSecure response indicates that it must require customer validation. | Acquirer response indicating that customer validation (**Verified by Visa** or HighProtection being _Santander_) is required. |
| `TR076` | Payer authentication fails. | The acquirer indicates that the additional verification (or two-step verification) has failed (HighProtection for _Santander_ or **Verified By Visa** for other banks).<br>Your customer must contact the card issuer bank or the bank's home banking to check whether the service is enabled.<br>If it is enabled, verify what configuration it has (verification by email, SMS, token, etc) and then retry the purchase. |
| `TR100` | The acquirer rejects for many reasons. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR101` | The acquirer cannot process the refund. Contact the acquirer. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR301` | Rejected by anti-fraud system. | Bamboo's Anti-fraud system.<br>Validate with [Bamboo support](mailto:merchantsupport@bamboopayment.com) what rule was affected before your customer retries the purchase. |
| `TR302` | Invalid parameters for anti-fraud system. | Bamboo's Anti-fraud system.<br>Validate with [Bamboo support](mailto:merchantsupport@bamboopayment.com) what rule was affected before your customer retries the purchase. |
| `TR996` | An internal error occurred while processing the request. | Try again later. If the error persists, contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR997` | An error occurred while executing the current process. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |
| `TR999` | Undetermined error when executing the transaction. | Contact [Bamboo support](mailto:merchantsupport@bamboopayment.com) for more information. |


### Purchase service errors
Purchase errors always starts with `PR`.

| Code | Description |
|---|---|
| `PR001` | The informed token is invalid, expired or does not correspond to the commerce. |
| `PR002` | The order number is invalid. |
| `PR003` | The provided amount is invalid. Ensure it is not null or empty, and in the case of refunds, ensure it does not exceed the original purchase amount. |
| `PR004` | Invalid Currency parameter for the Purchase. |
| `PR005` | The invoice number is invalid (it must be numeric). |
| `PR006` | Invalid Purchase Id for the Purchase. |
| `PR007` | Invalid `TransactionID` for the Purchase. |
| `PR008` | The requested purchase cannot be found. |
| `PR009` | The current purchase state does not allow the requested operation. |
| `PR010` | The `TaxableAmount` field is required. |
| `PR011` | The `Invoice` filed is required. |
| `PR012` | Capture of the card verification code is required. |
| `PR013` | The selected installments for the purchase are invalid for the card. |
| `PR014` | Invalid parameter length description. |
| `PR015` | `UserAgent` parameter is empty. |
| `PR016` | `CustomerIP` parameter is empty. |
| `PR017` | The field `TaxableAmount` cannot be greater than the purchase total amount. |
| `PR018` | To filter by dates, you must enter value for `From` and `To` parameters. |
| `PR019` | The search period exceeds the maximum number of days. |
| `PR020` | Invalid registered document. |
| `PR021` | Partial refunds are not allowed for the payment method used. |
| `PR034` | The value of the `TargetCountryISO` field sent in the purchase is invalid.|

### Customers service errors
Customer always starts with `CS`.

| Code  | Description |
|---|---|
| `CS001`|Invalid e-mail address. |
| `CS002`|Invalid address type. |
| `CS003`|Invalid customer identifier. |
| `CS004`|An error occurred in the token creation. |
| `CS005`|E-mail already registered. |
| `CS006`|The parameter `AdditionalData` was not sent correctly, it must be `key:value` separated by semicolon. |
| `CS007`|Invalid customer document number. |
| `CS008`|Invalid customer document type. |
| `CS009`|There was already a `CommerceToken` for the card. |
| `CS010`|Invalid Payment Profile. |
| `CS011`|Invalid Payment Profile Identifier. |


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