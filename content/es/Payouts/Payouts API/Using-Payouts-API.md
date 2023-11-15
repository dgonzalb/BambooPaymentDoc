---
title: "Utilizar el API de Payouts"
linkTitle: "Utilizar el API de Payouts"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  El API de Payouts permite solicitar múltiples pagos utilizando el saldo disponible en su cuenta.
weight: 10
---

Para saber más sobre Payouts, consulte este [artículo](../overview.html).

## Configurar la autenticación {#configuring-the-authentication}
Todos los métodos utilizados en la API de Compras requieren los siguientes encabezados de autenticación.

| Llave | Valor | Comentarios |
|---|---|---|
| `Content-Type` | `application/json` | Con este encabezado, el request se transmite en formato _JSON_. |
| `Authorization` | `Basic {{Merchant Private Key}}` | Envíe el `{{Merchant Private Key}}` (su identificador de comercio) y la palabra `Basic`.<br>Ejemplo: `Basic RVkeLr-86_iTzSMLvDtuyQ-1zqIcsmFG-oSzncn_uFv-nj7bhB3rtZg__` |
| `DigitalSignature` | `{{DigitalSignature}}` | Firma para validar la transacción utilizando el algoritmo _HmacSHA256_. Este encabezado es obligatorio únicamente para la creación del Payout. |

### Firmar el mensaje {#signing-the-message}
Construya el hash utilizando los parámetros `country`, `amount`, `currency`, `reference` y `type` del Request. Bamboo le envía `secret-key` y `MerchantPrivateKey` cuando firma el contrato de onboarding.

#### Código de ejemplo de firma {#signature-sample-code}
```javascript
var json = JSON.parse(request.data);
let signdata = {Country:json.country, Amount: json.amount,Currency:json.currency, Reference:json.reference, Type: json.type};
var data = JSON.stringify(signdata);
var hexHash = CryptoJS.HmacSHA256(data, secret-key);
var hash = hexHash.toString(CryptoJS.enc.Hex);
```

## Métodos de la API {#api-methods}
La API de Payouts ofrece tres métodos que puede utilizar cuando solicite Payouts.

* [Obtener listado de bancos](#get-bank-list)
* [Preview del Payout](#payout-preview)
* [Solicitud del Payout](#payout-request)
* [Obtener un Payout](#obtaining-a-payout)

### Obtener listado de bancos {#get-bank-list}
Este método le permite obtener el listado de bancos disponibles en un país.

#### URL del Request {#request-url}
Debe invocar un request **GET** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://payout-api.bamboopayment.com/api/Bank/country/{{Country}}`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/Bank/country/{{Country}}`

Donde `{{Country}}` representa el código ISO del país que desea consultar, utilizando el formato ISO 3166-2. [Listado de países disponibles de Payouts](../overview.html#coverage).

#### Parámetros del Response {#response-parameters}

| Parámetro | Formato | Tamaño | Descripción |
|---|:-:|:-:|---|
| `id` | `integer` | - | Identificación interna del banco. |
| `countryIsoCode` | `string` | 2 | País al que pertenece el banco. |
| `bankCode` | `string` | 4 | Código interno del banco utilizado en el parámetro `payee.bankaccount.codebank` cuando solicite el Payout. |
| `bankName` | `string` | - | Nombre del banco. |

#### Ejemplo del Response {#response-example}
```json
[
  {
    "id": 1,
    "countryIsoCode": "CO",
    "bankCode": "1002",
    "bankName": "BANCO POPULAR"
  },
  {
    "id": 3,
    "countryIsoCode": "CO",
    "bankCode": "1007",
    "bankName": "BANCOLOMBIA"
  },
  {
    "id": 4,
    "countryIsoCode": "CO",
    "bankCode": "1009",
    "bankName": "CITIBANK"
  },
  {
    ...
  }
]
```

### Preview del Payout {#payout-preview}
El método de Preview del Payout le permite mostrar el valor final recibido por el beneficiario y la fecha prevista en la que recibirá el dinero.

![PrintScreen](/assets/Payouts/Payouts12_es.png)

{{% alert title="Advertencia" color="warning"%}}
El Preview del Payout es meramente informativo y no congela el tipo de cambio, el cual se congela al [solicitar el Payout](#payout-request).
{{% /alert %}}

#### URL del Request {#request-url-3}
Debe invocar un request **GET** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://payout-api.bamboopayment.com/api/payout/preview`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/payout/preview`

#### Parámetros del Request {#request-parameters-1}
La siguiente tabla muestra los parámetros obligatorios y opcionales para el Preview del Payout.

| Campo | Tipo | ¿Obligatorio? | Descripción |
|---|---|:-:|---|---|
| `amount` | `number` | Sí | Monto del Payout, el formato tiene dos dígitos decimales.<br>Ejemplo _100_ => _USD 1,00_. |
| `destinationCountryIsoCode` | `string(2)` | Sí | Código ISO del país en formato `ISO 3166-2`.<br>[Listado de países disponibles de Payouts](../overview.html#coverage). |
| `originalCurrencyIsoCode` | `string(3)` | Sí | Código ISO de la moneda.<br>_Solo está disponible **USD**_. |

#### Ejemplo del Request {#request-example-1}
```json
{
  "amount": 125000,
  "destinationCountryIsoCode": "CO",
  "originalCurrencyIsoCode": "USD"
}
```
#### Parámetros del Response {#response-parameters-2}

| Parámetro | Formato | Descripción |
|---|:-:|---|
| `amountInOrignalCurrency` | `number` | Valor solicitado en el Preview del Payout. |
| `fee` | `number` | Monto cobrado por Bamboo para porcesar el Payout. Usted o el beneficiario pueden asumir la tasa de acuerdo con su contrato. |
| `amountToBeSentInOrignalCurrency` | `number` | Monto a ser enviado al Beneficiario, el cual se calcula como la diferencia entre `amountInOrignalCurrency` y `fee`. |
| `exchangeRate` | `number` | Valor de conversión entre la moneda origen y destino. Este valor incluye hasta `5` dígitos decimales. |
| `amountToBeSentInLocalCurrency` | `number` | Monto que va a recbir el Beneficiario, el cual se calcula multiplicando `amountToBeSentInOriginalCurrency` por `exchangeRate`. |
| `errors` | `object` | Errores que pueden aparecer. Los códigos de error para este método empiezan por `6`.<br>Encuentre los posibles errores [aquí]({{< ref "Payout-Error-Codes.md">}}). |
| `errors` → `ErrorCode` | `string` | Código interno del error. Encuentra los posibles errores [aquí]({{< ref "Payout-Error-Codes.md">}}). |
| `errors` → `PropertyName` | `string` | Propiedad que provocó el error. |
| `errors` → `Message` | `string` | Descripción del error. |

#### Ejemplo del Response {#response-example-2}
```json
{
    "amountInOrignalCurrency": 1250,
    "fee": 37.5000,
    "amountToBeSentInOrignalCurrency": 1212.5000,
    "exchangeRate": 3941.510000,
    "amountToBeSentInLocalCurrency": 4779080.88,
    "expectedPaymentDate": "2023-09-26T15:59:03Z",
    "error": null
}
```

### Solicitud del Payout {#payout-request}
Este método le permite solicitar uno o más Payouts utilizando los fondos depositados en su cuenta.

#### URL del Request {#request-url-1}
Debe invocar un request **POST** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://payout-api.bamboopayment.com/api/payout`
* **stage**: `https://payout-api.stage.bamboopayment.com/api/payout`

#### Parámetros del Request {#request-parameters}
La siguiente tabla muestra los parámetros obligatorios y opcionales para crear Payouts para todos los países.

| Campo | Tipo | ¿Obligatorio? | Descripción |
|---|---|:-:|---|---|
| `country` | `string(2)` | Sí | Código ISO del país en formato `ISO 3166-2`.<br>[Listado de países disponibles de Payouts](../overview.html#coverage). |
| `amount` | `integer` | Sí | Monto del Payout, el formato tiene dos dígitos decimales.<br>Ejemplo _100_ => _USD 1,00_. |
| `currency` | `string(3)` | Sí | Código ISO de la moneda.<br>_Solo está disponible **USD**_. |
| `reason` | `string` | No | Descripción del Payout. |
| `reference` | `string` | Sí | Identificador único del Payout definido por usted.<br>_Asegúrese de que sea único_. |
| `type` | `integer` | Sí | Tipo de Payout. Asigne cualquiera de los siguientes valores:<br><ul style="margin-bottom: initial;"><li>`1` para Efectivo</li><li>`2` para Transferencia Bancaria</li><li>`3` para Wallet</li><li>`4` para Transferencias Bancarias Instantáneas en Brasil</li></ul>|
| `notification_Url` | `string` | No | Webhook para notificar el resultado del Payout. Para más información sobre la configuración de este webhook, consulte este [artículo]({{< ref Payout-Webhook.md >}}). |
| `payee` → `FirstName` | `string` | Sí | Nombre del Beneficiario. | 
| `payee` → `lastName `| `string` | Sí | Apellido del Beneficiario. | 
| `payee` → `email` | `string` | No | Dirección de correo electrónico del Beneficiario. |  
| `payee` → `phone` | `string` | No | Número de teléfono del Beneficiario. | 
| `payee` → `address` | `string` | No | Dirección del Beneficiario. | 
| `payee` → `document` → `type` | `string` | Sí | Tipo de documento del Beneficiario.<br>[Encuentre la lista de documentos aquí](../payouts-api/variables.html#document-types). |  
| `payee` → `document` → `number` | `string` | Sí | Número de documento del Beneficiario. | 
| `payee` → `bankaccount` → `number` | `string` | Sí<sup>*</sup> | Número de cuenta del Beneficiario.<br>Tenga en cuenta las siguientes consideraciones:<br><ul style="margin-bottom: initial;"><li>Para Argentina, configure the CBU/CVU.</li><li>Para México, configure el número CLABE.</li></ul> |
| `payee` → `bankaccount` → `type` | `integer` | Sí<sup>*</sup> | Tipo de cuenta del Beneficiario. Asigne `1` para Cuenta corriente y `2` para Cuenta de ahorros. |
| `payee` → `bankaccount` → `codebank` | `string` |  Sí<sup>*</sup> | Código del banco del Beneficiario.<br>Puede obtener la lista de bancos de un país determinado utilizando el [método _**Obtener listado de bancos**_](#get-bank-list). También, [puede encontrar el listado de bancos](../payouts-api/variables.html#bank-codes).<br>No incluya ceros a la izquierda en el código del banco. |  
| `payee` → `bankaccount` → `branch` | `string` | No | Código de la sucursal del banco del Beneficiario. Este campo solo aplica para Brasil y es obligatorio cuando utilice transferencia bancaria como tipo de Payout. | 


<sup>*</sup> _Cuando utilice Transferencias Bancarias, estos parámetros son obligatorios para_ ***TODOS*** _los países. Para Transferencias Bancarias Instantáneas en Brasil, el objeto_ `payee.bankaccount` _y sus parámetros no deben estar presentes en el request._


#### Ejemplo del Request {#request-example}
Consulte la pestaña correspondiente de acuerdo con el país del beneficiario.


{{< tabs tabTotal="7" tabID="countries" tabName1="Argentina" tabName2="Brasil" tabName3="Chile" tabName4="Colombia" tabName5="México" tabName6="Perú" tabName7="Uruguay" >}}
{{< tab tabNum="1" >}}
<br>

```json
{
  "country": "AR",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Sara",
    "lastName": "Jáquez",
    "email": "sarasouez@mail.com",
    "phone": "099999999",
    "address": "Francisco  51 Gral. Ximena, AR-H 0376",
    "document": {
      "type": "CUIL",
      "number": "12345678901"
    },
    "bankAccount": {
      "number": "0071234567890123456789",
      "type": 1,
      "codeBank": "7"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Como se mencionó anteriormente, el objeto `payee.bankaccount` no debe estar presente en el request. Por lo tanto, al utilizar _Transferencias Bancarias Instantáneas_ es necesario enviarlo de la siguiente manera:


```json
{
  "country": "BR",
  "amount": 100,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 4,
  "payee": {
    "firstName": "Tiago",
    "lastName": "Costa",
    "email": "tcosta@mail.com",
    "phone": "92799322",
    "address": "55489-272, Travessa Eduardo, 90 Esteves do Norte - CE",
    "document": {
      "type": "CPF",
      "number": "54562271779"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

Cuando utilice _Transferencias Bancarias_, debe enviar el request así:

```json
{
  "country": "BR",
  "amount": 100,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Tiago",
    "lastName": "Costa",
    "email": "tcosta@mail.com",
    "phone": "92799322",
    "address": "55489-272, Travessa Eduardo, 90 Esteves do Norte - CE",
    "document": {
      "type": "CPF",
      "number": "54562271779"
    },
    "bankAccount": {
      "number": "12345678901234-5",
      "type": 1,
      "codeBank": "104",
      "branch": "1234"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}


{{< tab tabNum="3" >}}
<br>

```json
{
  "country": "CL",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Mercedes",
    "lastName": "Garrido",
    "email": "merceddo@mail.com",
    "phone": "099999999",
    "address": "Camino Franco, 13, Atico 4º, 93631, L Garay",
    "document": {
      "type": "CI",
      "number": "26068762K"
    },
    "bankAccount": {
      "number": "1234567890123450",
      "type": 1,
      "codeBank": "1"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< tab tabNum="4" >}}
<br>

```json
{
  "country": "CO",
  "amount": 100,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Diego",
    "lastName": "Silva",
    "email": "dsilva@mail.com",
    "phone": "099999999",
    "address": "Cra 23 # 123-45 Apto 601",
    "document": {
      "type": "CC",
      "number": "11111111"
    },
    "bankAccount": {
      "number": "2288",
      "type": 1,
      "codeBank": "1007"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
{{< /tab >}}

{{< tab tabNum="5" >}}
<br>

```json
{
  "country": "MX",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Rubén",
    "lastName": "Torres",
    "email": "rubentres@mail.com",
    "phone": "01 55 5601 7965",
    "address": "Coyoacan 2000",
    "document": {
      "type": "CURP",
      "number": "OEAF771012HMCRGR09"
    },
    "bankAccount": {
      "number": "123456789012345678",
      "type": 1,
      "codeBank": "2"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< tab tabNum="6" >}}
<br>

```json
{
  "country": "PE",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Ornela",
    "lastName": "Olivera",
    "email": "ornelera@mail.com",
    "phone": "099999999",
    "address": "Cl. Jesús Bueno # 64 Dpto. 229",
    "document": {
      "type": "DNI",
      "number": "12345678"
    },
    "bankAccount": {
      "number": "11487349",
      "type": 1,
      "codeBank": "2"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< tab tabNum="7" >}}
<br>

```json
{
  "country": "UY",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Daniel",
    "lastName": "Lorenzo",
    "email": "danielzo@mail.com",
    "phone": "999999999",
    "address": "12900 Montevideo",
    "document": {
      "type": "CI",
      "number": "38067788"
    },
    "bankAccount": {
      "number": "12345678912345",
      "type": 2,
      "codeBank": "999",
      "branch": "1"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```

{{< /tab >}}

{{< /tabs >}}

#### Responses
* `Ok`: HttpCode `200`.<br>
Mensaje recibido correctamente, en este punto, el Payout empieza a ser procesado.

**Response body**
```json
{
    "payoutId": 145,
    "status": 5,
    "statusDescription": "Received",
    "reference": "PayOut34",
    "errors": [],
    "statusCode": 200
}
```
<br>
Donde:

| Campo | Descripción |
|---|---|
| `payoutId` | Identificador interno del Payout. |
| `status` | Código interno del estado actual del Payout. |
| `statusDescription` | Estado actual del Payout. Consulte [este artículo]({{< ref "Payout-Status.md" >}}) para aprender más acerca de los estados de los Payouts. |
| `reference` | Identificador único del Payout definido por usted cuando solicitó el Payout. |
| `errors` | Errores que pueden aparecer. Encuentre los posibles errores [aquí]({{< ref "Payout-Error-Codes.md">}}). |
| `statusCode` | Código HTTP del response. |

* `Unauthorized`: HttpCode `401`.<br>
Error de autorización.

**Response body**
```json
{
    "statusCode": 401
}
```
<br>

* `BadRequest`: HttpCode `HttpCode 400`.<br>
Falló la validación del mensaje y el Payout queda en estado **Declinado**.

**Response body**
```json
{
    "errors": [
        {
            "ErrorCode": "ExactLengthValidator",
            "PropertyName": "Country",
            "Message": "'Country' must be 2 characters in length. You entered 1 caracteres."
        }
    ],
    "statusCode": 400
}
```
<br>

* `Conflict` - `Declined`: HttpCode `HttpCode 409`.<br>
La validación del mensaje fue exitosa pero, el Payout queda en estado **Declinado** debido a reglas de negocio.

**Response body**
```json
{
    "payoutId": 1,
    "status": 8,
    "statusDescription": "Declined",
    "reference": "PayOut567",
    "errors": [
        {
            "ErrorCode": "B101",
            "PropertyName": "BankAccount",
            "Message": "BankAccount invalid"
        }
    ],
    "statusCode": 409
}
```

### Obtener un Payout {#obtaining-a-payout}
Este método le permite traer la información de un Payout utilizando el identificador (ID) generado o la referencia que asignó cuando solicitó el Payout.

#### URL del Request {#request-url-2}
Debe invocar un request **GET** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://payout-api.bamboopayment.com/api/payout`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/payout`

Para obtener el Payout, incluya los siguientes endpoints de acuerdo con sus necesidades.

* **A través del ID del Payout**: `{{URL}}/api/Payout/{{PayoutID}}`
* **A través del ID de la referencia del Payout**: `{{URL}}/api/Payout/reference/{{PayoutReference}}`

#### Parámetros del Response {#response-parameters-1}

| Parámetro | Formato | Descripción |
|---|:-:|---|
| `payoutId` | `integer` | Identificador interno del Payout. |
| `reference` | `string` | Identificador único del Payout definido por usted cuando solicitó el Payout. |
| `isoCountry` | `string` | Código ISO del país en formato `ISO 3166-2`. |
| `created` | `date` | Fecha y hora de la solicitud del Payout. |
| `lastUpdate` | `date` | Fecha y hora de la última actualización del Payout. |
| `status` | `integer` | Código interno del estado actual del Payout. |
| `statusDescription` | `string` | Estado actual del Payout. Consulte [este artículo]({{< ref "Payout-Status.md" >}}) para aprender más acerca de los estados de los Payouts. |
| `errorCode` | `string` | Código interno del error del Payout declinado. Encuentre los posibles errores [aquí]({{< ref "Payout-Error-Codes.md">}}). |
| `errorDescription` | `string` | Descripción del error del Payout declinado. |
| `amount` | `object` | Valor y moneda solicitado en el Payout. |
| `localAmount` | `object` | Valor y moneda solicitado en el Payout en moneda local. |
| `exchangeRate` | `numeric` | Valor de conversión utilizado en el Payout. |
| `payee` | `object` | Información del beneficiario del Payout.  |


#### Ejemplo del Response {#response-example-1}
```json
{
    "payoutId": 1100,
    "reference": "QA-545",
    "isoCountry": "CO",
    "created": "2023-06-02T15:15:34.475614Z",
    "lastUpdate": "2023-06-02T15:20:18.1507484Z",
    "status": 1,
    "statusDescription": "Paid",
    "errorCode": null,
    "errorDescription": null,
    "amount": {
        "value": 10.0,
        "isoCurrency": "USD"
    },
    "localAmount": {
        "value": 42843.0,
        "isoCurrency": "COP"
    },
    "exchangeRate": 4394.23,
    "payee": {
        "firstName": "Paul",
        "lastName": "Doe",
        "email": "pauld@test.com",
        "phone": "099999999",
        "address": "address",
        "document": {
            "number": "11111111",
            "type": "CC"
        }
    }
}
```