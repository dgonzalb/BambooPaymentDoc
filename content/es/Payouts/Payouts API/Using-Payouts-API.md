---
title: "Crear un Payout"
linkTitle: "Crear un Payout"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  El API de Payouts permite solicitar múltiples pagos utilizando el saldo disponible en su cuenta.
weight: 40
---

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
| `amount` | `integer` | Sí | Monto del Payout, el formato tiene dos dígitos decimales.<br>Ejemplo _100_ => _$ 1,00_. |
| `currency` | `string(3)` | Sí | Código ISO de la moneda. Esta moneda debe coincidir con la configurada en su cuenta.<br>[Consulte aquí la lista de monedas](../payouts-api/variables.html#currencies). |
| `reason` | `string` | No | Descripción del Payout. |
| `destinationCurrency` | `string(3)` | Sí | Código ISO de la moneda en la que el beneficiario recibirá el pago. Este parámetro no es necesario para el modelo _**USD2L**_, y el sistema utilizará por defecto la moneda del país de destino cuando no se envíe.<br>Esta moneda debe cumplir el [modelo]({{< ref  Payout-Concepts.md >}}#payout-models) de su cuenta.<br>Por ejemplo:<br><ul style="margin-bottom: initial;"><li>Para _**USD2L**_, el parámetro `currency` debe ser _USD_, y el parámetro `destinationCurrency` es optativo.</li><li>Para _**USD2USD**_, tanto `currency` como `destinationCurrency` deben ser _USD_.</li><li>Para _**L2L**_, `currency` y `destinationCurrency` deben ser la moneda del país elegido.</li></ul><br>[Consulte aquí la lista de monedas](../payouts-api/variables.html#currencies). |
| `reference` | `string` | Sí | Identificador único del Payout definido por usted.<br>_Asegúrese de que sea único_. |
| `type` | `integer` | Sí | Tipo de Payout. Asigne cualquiera de los siguientes valores:<br><ul style="margin-bottom: initial;"><li>`1` para Efectivo</li><li>`2` para Transferencia Bancaria</li><li>`3` para Wallet</li><li>`4` para Transferencias Bancarias Instantáneas en Brasil</li></ul>|
| `InstantPaymentData` → `PixDocument` | `string` | Sí<sup>1</sup> | El número CPF/CNPJ del beneficiario configurado como clave PIX.<br>_El número de dígitos para **CPF** debe ser 11 y **CNPJ** debe ser 14._ |
| `InstantPaymentData` → `PixEmail` | `string` | Sí<sup>1</sup> | La dirección de correo electrónico del beneficiario configurado como clave PIX.<br>_Este parámetro debe ser una dirección de correo electrónico válida._ |
| `InstantPaymentData` → `PixPhone` |`string` | Sí<sup>1</sup> | El número de teléfono del beneficiario configurado como clave PIX.<br>_El número debe empezar por `+55`._ |
| `InstantPaymentData` → `PixRandom` | `string` | Sí<sup>1</sup> | La clave aleatoria que el beneficiario ha generado como clave PIX. |
| `notification_Url` | `string` | No | Webhook para notificar el resultado del Payout. Para más información sobre la configuración de este webhook, consulte este [artículo]({{< ref Payout-Webhook.md >}}). |
| `payee` → `FirstName` | `string` | Sí<sup>3</sup> | Nombre del Beneficiario. | 
| `payee` → `lastName `| `string` | Sí<sup>3</sup> | Apellido del Beneficiario. | 
| `payee` → `companyName `| `string` | Sí<sup>3</sup> | Nombre de la empresa. | 
| `payee` → `email` | `string` | No | Dirección de correo electrónico del Beneficiario. |  
| `payee` → `phone` | `string` | No | Número de teléfono del Beneficiario. | 
| `payee` → `address` | `string` | No | Dirección del Beneficiario. | 
| `payee` → `document` → `type` | `string` | Sí | Tipo de documento del Beneficiario.<br>[Encuentre la lista de documentos aquí](../payouts-api/variables.html#document-types). |  
| `payee` → `document` → `number` | `string` | Sí | Número de documento del Beneficiario. | 
| `payee` → `bankaccount` → `number` | `string` | Sí<sup>2</sup> | Número de cuenta del Beneficiario.<br>Tenga en cuenta las siguientes consideraciones:<br><ul style="margin-bottom: initial;"><li>Para Argentina, configure the CBU/CVU.</li><li>Para México, configure el número CLABE.</li></ul> |
| `payee` → `bankaccount` → `type` | `integer` | Sí<sup>2</sup> | Tipo de cuenta del Beneficiario. Asigne `1` para Cuenta corriente y `2` para Cuenta de ahorros. |
| `payee` → `bankaccount` → `codebank` | `string` |  Sí<sup>2</sup> | Código del banco del Beneficiario.<br>Puede obtener la lista de bancos de un país determinado utilizando el [método _**Obtener listado de bancos**_](#get-bank-list). También, [puede encontrar el listado de bancos](../payouts-api/variables.html#bank-codes). |


<sup>1</sup> _Sólo aplica para Brasil usando Transferencia Bancaria Instantánea. En caso contrario, el objeto_ `payee.InstantPaymentData` _y sus parámetros no deben estar presentes en el request._<br>
<sup>2</sup> _Cuando utilice Transferencias Bancarias, estos parámetros son obligatorios para_ ***TODOS*** _los países. Para Transferencias Bancarias Instantáneas en Brasil, el objeto_ `payee.bankaccount` _y sus parámetros no deben estar presentes en el request._<br>
<sup>3</sup> _Son mandatorios los campos `firstName` y `lastName` para persona física y `companyName` para persona jurídica (empresa). Si se envía un payout para empresa solo se tiene que completar el campo `companyName`, y si se envía un payout a una persona física solo se tienen que completar los campos `firstName` y `lastName`._


#### Ejemplo del Request {#request-example}
Consulte la pestaña correspondiente de acuerdo con el país del beneficiario.


{{< tabs tabTotal="7" tabID="countries" tabName1="Argentina" tabName2="Brasil" tabName3="Chile" tabName4="Colombia" tabName5="México" tabName6="Perú" tabName7="Uruguay" >}}
{{< tab tabNum="1" >}}
<br>

**Argentina: De USD a ARS:**

```json
{
  "country": "AR",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "destinationCurrency": "ARS",
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
      "number": "0000053600000000000566",
      "type": 1,
      "codeBank": "7"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**Argentina: De ARS a ARS:**

```json
{
  "country": "AR",
  "amount": 1000,
  "currency": "ARS",
  "reason": "string",
  "destinationCurrency":"ARS",
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
      "number": "0000053600000000000566",
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


**Brasil: De USD a BRL:**

```json
{
  "country": "BR",
  "amount": 100,
  "currency": "USD",
  "destinationCurrency":"BRL",
  "reason": "string",
  "reference": "PayOut34",
  "type": 4,
  "InstantPaymentData": {
    "PixEmail":"tcosta@mail.com" // También puede ser PixDocument, PixPhone o PixRandom
  },
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

**Brasil: BRL a BRL**

```json
{
  "country": "BR",
  "amount": 100,
  "currency": "BRL",
  "destinationCurrency":"BRL",
  "reason": "string",
  "reference": "PayOut34",
  "type": 4,
  "InstantPaymentData": {
    "PixEmail":"tcosta@mail.com" // También puede ser PixDocument, PixPhone o PixRandom
  },
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

{{< /tab >}}


{{< tab tabNum="3" >}}
<br>

**Chile: USD a CLP**

```json
{
  "country": "CL",
  "amount": 1000,
  "currency": "USD",
  "destinationCurrency":"CLP",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Mercedes",
    "lastName": "Garrido",
    "email": "merceddo@mail.com",
    "phone": "099999999",
    "address": "Camino Franco, 13, Atico 4, 93631, L Garay",
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
<br>

**Chile: CLP a CLP**

```json
{
  "country": "CL",
  "amount": 1000,
  "currency": "CLP",
  "destinationCurrency":"CLP",
  "reason": "string",
  "reference": "PayOut34",
  "type": 2,
  "payee": {
    "firstName": "Mercedes",
    "lastName": "Garrido",
    "email": "merceddo@mail.com",
    "phone": "099999999",
    "address": "Camino Franco, 13, Atico 4, 93631, L Garay",
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

**Colombia: USD a COP**

```json
{
  "country": "CO",
  "amount": 100,
  "currency": "USD",
  "destinationCurrency":"COP",
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
<br>

**Colombia: COP a COP**

```json
{
  "country": "CO",
  "amount": 100,
  "currency": "COP",
  "reason": "string",
  "destinationCurrency":"COP",
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

**México: USD a MXN**

```json
{
  "country": "MX",
  "amount": 1000,
  "currency": "USD",
  "destinationCurrency":"MXN",
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
<br>

**México: MXN a MXN**

```json
{
  "country": "MX",
  "amount": 1000,
  "currency": "MXN",
  "reason": "string",
  "destinationCurrency":"MXN",
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

**Perú: USD a PEN**

```json
{
  "country": "PE",
  "amount": 1000,
  "currency": "USD",
  "destinationCurrency":"PEN",
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
<br>

**Perú: PEN a PEN**

```json
{
  "country": "PE",
  "amount": 1000,
  "currency": "PEN",
  "reason": "string",
  "destinationCurrency":"PEN",
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
<br>

**Perú: USD a USD**

```json
{
  "country": "PE",
  "amount": 1000,
  "currency": "USD",
  "reason": "string",
  "destinationCurrency":"USD",
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

**Uruguay: USD a UYU**

```json
{
  "country": "UY",
  "amount": 1000,
  "currency": "USD",
  "destinationCurrency":"UYU",
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
      "number": "1234567",
      "type": 2,
      "codeBank": "113",
      "branch": "1"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**Uruguay: UYU a UYU**
```json
{
  "country": "UY",
  "amount": 1000,
  "currency": "UYU",
  "reason": "string",
  "destinationCurrency":"UYU",
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
      "number": "1234567",
      "type": 2,
      "codeBank": "113",
      "branch": "1"
    }
  },
  "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}
```
<br>

**Uruguay: USD a USD**
```json
{
    "country": "UY",
    "amount": 1000,
    "currency": "USD",
    "destinationCurrency": "USD",
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
            "number": "1234567",
            "type": 2,
            "codeBank": "113",
            "branch": "1"
        }
    },
    "notification_Url": "https://webhook.site/ebc46ace-94a1-4265-9d7f-d457d437a1b4"
}

```
{{< /tab >}}

{{< /tabs >}}

{{% alert title="Info" color="info"%}}
Para enviar el payout para persona jurídica, reemplazar los campos `firstName` y `lastName` por `companyName`.
Ejemplo `"companyName":"Google LLC"`
{{% /alert %}}



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
    "errors": []
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


* `BadRequest`: HttpCode `HttpCode 400`.<br>
Falló la validación del mensaje y el Payout queda en estado **is not created**.

**Response body**
```json
{
    "errors": [
        {
            "ErrorCode": "ExactLengthValidator",
            "PropertyName": "Country",
            "Message": "'Country' must be 2 characters in length. You entered 1 characters."
        }
    ],
    "statusCode": 400
}
```
<br>

* `Unauthorized`: HttpCode `401`.<br>
Error de autorización.

* `Conflict` - `Declined`: HttpCode `HttpCode 409`.<br>
La validación del mensaje fue exitosa pero, el Payout queda en estado **Declinado** debido a reglas de negocio.

**Response body**
```json
{
    "payoutId": 493945,
    "status": 8,
    "statusDescription": "Declined",
    "reference": "QA-538",
    "error": {
        "errorCode": 812,
        "message": "Declined by validation for document"
    }
}
```

### Obtener un Payout {#obtaining-a-payout}
Este método le permite traer la información de un Payout utilizando el identificador (ID) generado o la referencia que asignó cuando solicitó el Payout.

#### URL del Request {#request-url-2}
Debe invocar un request **GET** a las siguientes URL de acuerdo con sus necesidades.

* **Producción**: `https://payout-api.bamboopayment.com/api/payout`
* **Stage**: `https://payout-api.stage.bamboopayment.com/api/payout`

Para obtener el Payout, incluya los siguientes endpoints de acuerdo con sus necesidades.

* **A través del ID del Payout**: `{{URL}}/api/payout/{{PayoutID}}`
* **A través del ID de la referencia del Payout**: `{{URL}}/api/payout/reference/{{PayoutReference}}`

#### Parámetros del Response {#response-parameters-1}

| Parámetro | Formato | Descripción |
|---|:-:|---|
| `payoutId` | `long` | Identificador interno del Payout. (Máx. 19 caracteres) | |
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
{{% alert title="Info" color="info"%}}
En payouts para persona jurídica, se recibirá el campo `companyName` en lugar de `firstName` y `lastName`.
{{% /alert %}}