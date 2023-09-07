---
title: "Operaciones"
linkTitle: "Operaciones"
date: 2023-03-02T11:40:29-05:00
Description: >
  Cree una compra utlizando el utilizando el flujo API proporcionando su información básica. Además, explore las distintas operaciones disponibles para las compras existentes.
weight: 10
tags: ["subtopic"]
---

## Configurar la autenticación {#configuring-the-authentication}
Todos los métodos utilizados en la API de Compras requieren los siguientes encabezados de autenticación.

| Llave | Valor | Comentarios |
|---|---|---|
| `Content-Type` | `application/json` | Con este encabezado, el request se transmite en formato _JSON_. |
| `Authorization` | `Basic {{Merchant Private Key}}` | Envíe el `{{Merchant Private Key}}` (su identificador de comercio) y la palabra `Basic`.<br>Ejemplo: `Basic RVkeLr-86_iTzSMLvDtuyQ-1zqIcsmFG-oSzncn_uFv-nj7bhB3rtZg__` |

## Configurar el idioma de los códigos de respuesta {#setting-the-language-of-the-response-codes}
Puede recibir la descripción del error basándose en las funciones de localización. Para ello, debe enviar el encabezado `lang` en su integración, utilizando cualquiera de los siguientes idiomas en formato **ISO 639-1**.

<div id="shortTable"></div>

| Código | Idioma |
|:-:|---|
| `en` | Inglés.<br>_Este es el idioma por defecto. Si no envía este encabezado o envía un idioma diferente a los soportados, recibirá los errores en este idioma._ |
| `es` | Español. |
| `pt` | Portugués. |

## Métodos del API de Compras {#purchase-api-methods}
Las siguientes operaciones expuestas por el _**API de Compras**_ le permite realizar varias acciones sobre las compras. Usted cuenta con los siguientes métodos.

* [Crear una compra](#create-a-purchase)
* [Confirmar una compra](#confirm-a-purchase)
* [Obtener compras](#get-purchases)

### Crear una compra {#create-a-purchase}
Cree una compra básica en Bamboo Payment.

#### URL de Request {#request-url}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/purchase`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/purchase`

#### Parámetros del Request {#request-parameters}

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|---|---|:-:|---|
| `PaymentMediaId` | `integer` | No <sup>1</sup> | Corresponde al ID del medio de pago que quiere utilizar. Este parámetro es solo para Métodos Alternativos de Pagos (transferencia, efectivo y procesamiento que requieren redirección del cliente). |
| `TrxToken` | `string` | No <sup>1</sup> | Este parámetro se refiere al token utilizado para identificar la tarjeta del cliente. |
| `Order` | `string` | Sí | Número de orden generado por el comercio. |
| `Amount` | `number` | Sí | Monto de la compra. Este valor debe ser mayor a cero.<br>Si debe incluir decimales, concate los dígitos decimales sin el punto decimal. Ejemplo `12,25` > `1225`. |
| `Currency` | `string` | Sí | Moneda de la compra de acuerdo con el formato ISO-4217. Encuentre los posibles valores en la tabla de Monedas de [cada país](/es/docs/payment-methods.html). |
| `Installments` | `integer` | No | Este parámetro hace referencia al número de pagos en el que se divide una compra con tarjeta de crédito. |
| `Capture` | `boolean` | No | Define si la compra debe ser realizada en uno o dos pasos.<sup>2</sup><br><ul style="margin-bottom: initial;"><li>Si es `false`, solo se procesa la autorización y la copra queda preautorizada hasta que se realice la confirmación final a través de los métodos confirmar o anular.</li><li>Si es `true`, la transacción es autorizada y capturada (confirmada).</li></ul><br>No todos los [medios de pago y países](/es/docs/payment-methods.html) soportan la funcioanlidad de preautorización. |
| `TargetCountryISO` | `string` | Sí | Este parámetro indica el país donde se procesa la compra.<br>Envíe el país usando el formato `ISO-3166-1`. |
| `MetadataIn` | `object` | No | Corresponde a los campos adicionales requeridos por cada medio de pago o adquirente. |
| `Customer` | `object` | Yes <sup>3</sup> | El objeto `Customer` contiene la infomración de la persona que realiza la compra. |
| `Customer` → `CommerceCustomerId` | `string` | No | Identificador del cliente.<br>El comercio genera y utiliza este valor internamente para identificar al cliente dentro de la plataforma de Bamboo Payment. |
| `Customer` → `Email` | `string` | Sí | Dirección de correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono de contacto del cliente. |
| `Customer` → `Enabled` | `boolean` | No | Indica si el usuario está activo apra operar. El valor predeterminado es `true`. |
| `Customer` → `BillingAddress` | `object` | No | Este parámetro es la dirección de facturación del cliente. |
| `Customer` → `BillingAddress`→`AddressID` | `integer` | No | Identificador de la dirección. |
| `Customer` → `BillingAddress`→`AddressType` | `string` | No | Tipo de dirección. |
| `Customer` → `BillingAddress`→`Country` | `string` | No | País de la dirección. |
| `Customer` → `BillingAddress`→`State` | `string` | No | Estado de la dirección. |
| `Customer` → `BillingAddress`→`City` | `string` | No | Ciudad de la dirección. |
| `Customer` → `BillingAddress`→`AddressDetail` | `string` | No | Este parámetro corresponde a la información adicional de la dirección, como calle, número, etc. |
| `Customer` → `BillingAddress`→`PostalCode` | `string` | No | Código postal de la dirección. |
| `Customer` → `ShippingAddress` | `object` | No | Dirección de envío del cliente. Esta direccion es la que el cliente indica para recibir el producto adquirido. Este objeto tiene los mismos parámetros que el objeto `Customer.BillingAddress`. |
| `Customer` → `AdditionalData` | `string` | No | List of type `key:value` to store extra information. |
| `Customer` → `CaptureURL` | `string` | No | Card data capture URL.<br>This parameter contains the URL that should be loaded in an iframe to initiate the secure data capture process.<br>This only applies to Customers of type _Commerce_. |
| `Customer` → `DocumentTypeId` | `string` | No | Tipo de documento del cliente. Encuentre los posibles valores en la tabla de Tipos de documento de [cada país](/es/docs/payment-methods.html). |
| `Customer` → `DocNumber` | `string` | No | Número de documento del cliente. |
| `Tip` | `number` | No | Propina adicional de la compra si es necesaria. |
| `Description` | `string` | No | Descripción de la compra. |
| `UniqueID` | `string` | No | Identificador único de la compra.<br>Este valor es opcional y le permite identificar una compra de forma única y evitar duplicación de transacciones en caso de errores de comunicación. Para más información, consulte [Conceptos]({{< ref "Concepts.md">}}#UniqueID). |
| `AdditionalData` | `string` | No | Puede agregar información adicional a la transacción (Por ejemplo una lista de datosa `Clave:Valor`).<br>Esta información se retorna cada vez que consulte la compra. |
| `CustomerUserAgent` | `string` | No | User Agent del cliente que utiliza el servicio; para dispositivos de escritorio, debe ser el `UserAgent` informado por el navegador, y para móviles, la información sobre el dispositivo, S.O. utilizado y nombre de la App. |


{{% alert title="Notas" color="info"%}}
* <sup>1</sup> Los parámetros `PaymentMediaId` y `TrxToken` no son obligatorios. Sin embargo, es obligatorio enviar de uno de ellos dependiendo del flujo que desee utilizar.
* <sup>2</sup> No todos los medios de pago soportan la funcionalidad de preautorización. Revise la sección de [Países y medios de pago](/es/docs/payment-methods.html) para verificar la disponibilidad.
* <sup>3</sup> No se requerre este objeto cuando cree una compra utilizando [_CommerceToken_]({{< ref Registered-users.md >}}).
* Tenga encuenta que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref "Antifraud.md" >}}).
{{% /alert %}}

##### Ejemplo del Request {#request-example}

```json
{
  "TrxToken":"OT__zq4aTY4T9TzSldeBKry-Wbx75QNbuT894jiYpVJ8SzQ_",
  "Order": "099927564",
  "Capture": true,
  "Amount": "10000",
  "Currency": "UYU",
  "TargetCountryISO": "UY",
  "Installments": 1,
  "Customer": {
    "Email": "john@mail.com",
    "FirstName": "John",
    "LastName": "Smith",
    "DocNumber": "12345672",
    "DocumentTypeId": 2,
    "PhoneNumber": "24022330",
    "BillingAddress": {
      "AddressType": 1,
      "Country": "Uruguay",
      "State": "Montevideo",
      "City": "MONTEVIDEO",
      "AddressDetail": "Av. Sarmiento 2260",
      "PostalCode": "150000"
    }
  },
  "DataUY": {
    "IsFinalConsumer": "true",
    "Invoice": "1000",
    "TaxableAmount": 0
  }
}
```

### Confirmar una compra {#confirm-a-purchase}
Este método le permite confirmar una compra preautorizada.

{{% alert title="Nota" color="info"%}}
No todos los medios de pago soportan la funcionalidad de preautorización y está disponible en los siguientes países

<div style="text-align: center;">

<a href="/es/docs/payment-methods/brazil.html"><img src="/assets/Flags/FlagBR.png" width="30" /></a>
<a href="/es/docs/payment-methods/chile.html"><img src="/assets/Flags/FlagCL.png" width="30" /></a>
<a href="/es/docs/payment-methods/colombia.html"><img src="/assets/Flags/FlagCO.png" width="30" /></a>
<a href="/es/docs/payment-methods/uruguay.html"><img src="/assets/Flags/FlagUY.png" width="30" /></a>

</div>

{{% /alert %}}

#### URL de Request {#request-url-1}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/commit`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/purchase/{{PurchaseID}}/commit`

#### Parámetros del Request {#request-parameters-1}
El cuerpo del request es opcional para confirmar una compra. Si no envía el request, el método confirma la compra preautorizada por su monto original.

El monto de la compra puede variar respecto al enviado en el proceso de compra inicial, pero el nuevo monto no puede ser superior al original.

##### Ejemplo del Request {#request-example-1}
Debe incluir el nuevo monto en la solicitud para confirmar una compra con un monto inferior al original. Por ejemplo:

```json
{
  "Amount": 50
}
``` 

### Obtener compras {#get-purchases}
Este método le permite obtener la información se una o más compras según el criterio de búsqueda enviado en el cuerpo del mismo.

#### URL de Request {#request-url-2}
Debe invocar un request **GET** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://api.bamboopayment.com/v1/api/purchase`
* **Stage**: `https://api.stage.bamboopayment.com/v1/api/purchase`

Para obtener una compra específica, incluya `/{{PurchaseID}}` en la URL. Ejemplo: `https://api.bamboopayment.com/v1/api/purchase/481561`.

#### Parámetros del Request {#request-parameters-2}
Los siguientes parámetros son necesarios cuando desea obtener una lista de compras. Agregue el _PurchaseID_ a la URL del request cuando quiera quiera obtener una compra específica.

{{% alert title="Nota" color="info"%}}
Todos los parámetros son opcionales. Si no envía ningún parámetro, se mostrarán todas las compras de hoy.
{{% /alert %}}

| Parámetro | Tipo | Descripción |
|---|---|---|---|
| `Authorized` | `boolean` | Si el valor es `true`, retorna solo las comrpas que se hayan completado satisfactoriamente. |
| `From` | `date` | Fecha de inicio del filtro.<br>Formato: `yyyyMMdd`. |
| `OrderNumber` | `string` | Número de orden del comercio. |
| `PaymentMediaId` | `integer` | Identificador del medio de pago usado en la compra. |
| `To` | `date` | Fecha de fin del filtro.<br>Formato: `yyyyMMdd`. |


## Parámetros del Response {#response-parameters}
Obtendrá el mismo objeto `Response` independientemente del método que invoque. Sólo cuando consulte compras y el resultado tenga múltiples resultados el `Response` retornado será un array.

La siguiente tabla describe los parámetros del objeto `Response` relevantes para la compra, sus posibles siguientes pasos en el flujo y los errores que se pueden haber generado.

| Parámetro | Tipo | Descripción |
|---|---|---|
| `Response` | `object` | Parámetros retornados como resultado del procesamiento de una compra. |
| `Response` → `PurchaseId` | `integer` | Identificador de la compra. |
| `Response` → `Created` | `date` | Fecha y hora en la que se creó la compra.<br>Formato de la fecha _**ISO-8601**_. | 
| `Response` → `Transaction` | `object` | Este objeto está asociado con la compra y contiene la infomración del request enviado y el response obtenido desde el medio de pago correspondiente. |
| `Response` → `Transaction` → `TransactionID` | `integer` | Identificador de la transacción. |
| `Response` → `Transaction` → `Created` | `date` | Fecha y hora en la que se creó la transacción.<br>Formato de la fecha _**ISO-8601**_. | 
| `Response` → `Transaction` → `TransactionStatusId` | `integer` | Identificador interno del estado de la transacción. |
| `Response` → `Transaction` → `Status` | `string` | Estado actual de la transacción. |
| `Response` → `Transaction` → `ErrorCode` | `string` | Código de error (si aplica) retornado por em medio de pago. |
| `Response` → `Transaction` → `Description` | `string` | Descripción del resultado de la transacción. |
| `Response` → `Transaction` → `ApprovalCode` | `string` | Código de aprobación retornado por el medio de pago. |
| `Response` → `RefundList` | `object` | Este objeto contiene información sobre los reembolsos de la compra (parciales o totales). |
| `Response` → `RefundList` → `PurchaseRefundId` | `integer` | Identificador asociado con el reembolso. |
| `Response` → `RefundList` → `Created` | `date` | Fecha y hora en la que se creó el reembolso. |
| `Response` → `RefundList` → `UniqueID` | `string` | Identificador único de la transacción.<br>Este valor permite identificar un reembolso en la lista de todos los posibles reembolso realizadas. |
| `Response` → `RefundList` → `Amount` | `integer` | Monto total del reembolso. |
| `Response` → `RefundList` → `Currency` | `string` | Moneda de la compra de acuerdo al formato ISO-4217 (códigos alfanuméricos). |
| `Response` → `RefundList` → `Status` | `string` | Estado actual del reembolso. |
| `Response` → `CommerceAction` | `object` | Este objeto infomra al comercio o al cliente la acción que debe llevar a cabo para completar el proceso de compra actual. |
| `Response` → `MetadataOut` | `object` | Campos adicionales retornados por cada medio de pago o adquirente para realizar los siguientes pasos.<br>Por ejemplo, este objeto puede contener la URL a la que debe redirigir al cliente o la imagen QR que el cliente debe escanear. |
| `Response` → `CrossBorderDataResponse` | `object` | Este objeto contiene información sobre los montos procesados en la moneda local del país seleccionado. |
| `Response` → `CrossBorderDataResponse` → `TargetCountryISO` | `string` | Mismo país enviado en la solicitud. |
| `Response` → `CrossBorderDataResponse` → `TargetCurrencyISO` | `string` | Moneda local determinada para el país seleccionado. |
| `Response` → `CrossBorderDataResponse` → `TargetAmount` | `number` | Monto de compra convertido a la moneda local. |
| `Errors` | `list` | Lista de errores que el sistema puede lanzar durante el proceso de compra. |
| `Errors` → `ErrorCode` | `string` | Error code returned. |
| `Errors` → `Created` | `string` |  Fecha y hora en la que se generó el error. |
| `Errors` → `Message` | `string` | Texto descriptivo del error. |
| `Errors` → `Detail` | `string` | Detalle del error. |

### Ejemplo del Response {#response-example}

```json
{
    "Response": {
        "PurchaseId": 481561,
        "Created": "2023-08-01T20:53:28.309",
        "TrxToken": null,
        "Order": "099927564",
        "Transaction": {
            "TransactionID": 499285,
            "Created": "2023-08-01T20:53:28.310",
            "AuthorizationDate": "2023-08-01T20:53:28.737",
            "TransactionStatusId": 1,
            "Status": "Approved",
            "ErrorCode": null,
            "Description": "",
            "ApprovalCode": "831000",
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-08-01T20:53:28.650",
                    "Status": "Authorization OK - Step 1",
                    "ResponseCode": "200",
                    "ResponseMessage": "OK",
                    "Error": "",
                    "AuthorizationCode": null,
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{\"card\":{\"type\":\"C\",\"issuer\":\"424242\",\"isLocal\":true},\"allowedInstallments\":[1,2,3],\"currency\":858,\"authorizationAmount\":100.0,\"discountAmount\":0.0,\"discountPoints\":0,\"lawLimitApplied\":false,\"code\":0,\"message\":\"ok\"}"
                },
                {
                    "Step": "Generic External",
                    "Created": "2023-08-01T20:53:28.730",
                    "Status": "Authorization OK",
                    "ResponseCode": "100",
                    "ResponseMessage": "ACCEPT",
                    "Error": "",
                    "AuthorizationCode": "831000",
                    "UniqueID": null,
                    "AcquirerResponseDetail": "{\"Decision\":\"ACCEPT\",\"ReasonCode\":\"100\",\"RequestID\":\"386631747\",\"PaymentNetworkTransactionID\":\"016153570198200\",\"CvCode\":null,\"MerchantReferenceCode\":\"20201229\",\"AuthorizationCode\":\"831000\"}"
                }
            ]
        },
        "Capture": true,
        "Amount": 10000,
        "OriginalAmount": 10000,
        "TaxableAmount": 0,
        "Tip": 0,
        "Installments": 1,
        "Currency": "UYU",
        "Description": null,
        "Customer": {
            "CustomerId": 247720,
            "Created": "2023-08-01T20:53:16.073",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "john@mail.com",
            "Enabled": true,
            "ShippingAddress": {
                "AddressId": 0,
                "AddressType": 1,
                "Country": "Uruguay",
                "State": "Montevideo",
                "AddressDetail": "Av. Sarmiento 2260",
                "PostalCode": "150000",
                "City": "Montevideo"
            },
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 252393,
                    "PaymentMediaId": 1,
                    "Created": "2023-08-01T20:53:16.073",
                    "LastUpdate": null,
                    "Brand": "VISA",
                    "CardOwner": "John Smith",
                    "Bin": null,
                    "IssuerBank": "Visa",
                    "Installments": "1;2;3;4;5;6;7;8;9;10;11;12",
                    "Type": "CreditCard",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": "202605",
                    "Last4": "0001",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://testapi.siemprepago.com/v1/api/Customer/247720",
            "FirstName": "John",
            "LastName": "Smith",
            "DocNumber": "12345672",
            "DocumentTypeId": 2,
            "PhoneNumber": "24022330",
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://testapi.siemprepago.com/v1/api/Purchase/481561",
        "DataUY": {
            "IsFinalConsumer": "true",
            "Invoice": "1000",
            "TaxableAmount": 0
        },
        "DataDO": null,
        "Acquirer": {
            "AcquirerID": 77,
            "Name": "VisaNetUYv2",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 252393,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": null,
        "MetadataOut": null,
        "CrossBorderData": null,
        "CrossBorderDataResponse": null,
        "Redirection": null,
        "AntifraudData": {
            "AntifraudFingerprintId": null,
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "TargetCountryISO": null,
        "PurchaseType": 1,
        "IsFirstRecurrentPurchase": false
    },
    "Errors": []
}
```