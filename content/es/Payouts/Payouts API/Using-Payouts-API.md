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

<!--| Campo | Tipo | ¿Obligatorio? | Descripción |
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
| `payee` → `bankaccount` → `number` | `string` | Sí<sup>2</sup> | Número de cuenta del Beneficiario.<br>Tenga en cuenta las siguientes consideraciones:<br><ul style="margin-bottom: initial;"><li>Para Argentina, configure el CBU/CVU.</li><li>Para México, configure el número CLABE.</li><li>Para Perú:<ul><li>Si es a un **banco**, use el **CCI**.</li><li>Si es a una **wallet**, use el **número de teléfono** sin el `+`.</li></ul></li></ul> |
| `payee` → `bankaccount` → `type` | `integer` | Sí<sup>2</sup> | Tipo de cuenta del Beneficiario. Asigne `1` para Cuenta corriente y `2` para Cuenta de ahorros. |
| `payee` → `bankaccount` → `codebank` | `string` |  Sí<sup>2</sup> | Código del banco del Beneficiario.<br>Puede obtener la lista de bancos de un país determinado utilizando el [método _**Obtener listado de bancos**_](getting-started.html#get-bank-list). También, [puede encontrar el listado de bancos](variables.html#bank-codes). |-->

| Campo | Tipo | ¿Obligatorio? | Descripción |
|---|---|:-:|---|---|
| `country` | `string(2)` | Sí | Código ISO del país en formato `ISO 3166-2`.<br>[Listado de países disponibles de Payouts](../overview.html#coverage). |
| `amount` | `integer` | Sí | Monto del Payout, el formato tiene dos dígitos decimales.<br>Ejemplo _100_ => _$ 1,00_. |
| `currency` | `string(3)` | Sí | Código ISO de la moneda. Esta moneda debe coincidir con la configurada en su cuenta.<br>[Consulte aquí la lista de monedas](../payouts-api/variables.html#currencies). |
| `reason` | `string` | No | Descripción del Payout. |
| `destinationCurrency` | `string(3)` | Sí | Código ISO de la moneda en la que el beneficiario recibirá el pago. Este parámetro no es necesario para el modelo _**USD2L**_, y el sistema utilizará por defecto la moneda del país de destino cuando no se envíe.<br>Esta moneda debe cumplir el [modelo]({{< ref  Payout-Concepts.md >}}#payout-models) de su cuenta.<br>Por ejemplo:<br><ul style="margin-bottom: initial;"><li>Para _**USD2L**_, el parámetro `currency` debe ser _USD_, y el parámetro `destinationCurrency` es optativo.</li><li>Para _**USD2USD**_, tanto `currency` como `destinationCurrency` deben ser _USD_.</li><li>Para _**L2L**_, `currency` y `destinationCurrency` deben ser la moneda del país elegido.</li></ul><br>[Consulte aquí la lista de monedas](../payouts-api/variables.html#currencies). |
| `reference` | `string` | Sí | Identificador único del Payout definido por usted.<br>_Asegúrese de que sea único_. |
| `type` | `integer` | Sí | Tipo de Payout. Asigne cualquiera de los siguientes valores:<br><ul style="margin-bottom: initial;"><li>`1` para Efectivo</li><li>`2` para Transferencia Bancaria</li><li>`3` para Wallet</li><li>`4` para Transferencias Bancarias Instantáneas en Brasil</li></ul>|
| `InstantPaymentData` → `PixDocument` | `string` | Sí<sup>1</sup> | El número CPF/CNPJ del beneficiario configurado como clave PIX.<br>_El número de dígitos para **CPF** debe ser 11 y **CNPJ** debe ser 14._ |
| `InstantPaymentData` → `PixEmail` | `string` | Sí<sup>1</sup> | La dirección de correo electrónico del beneficiario configurado como clave PIX.<br>_Este parámetro debe ser una dirección de correo electrónico válida._ |
| `InstantPaymentData` → `PixPhone` | `string` | Sí<sup>1</sup> | El número de teléfono del beneficiario configurado como clave PIX.<br>_El número debe empezar por `+55`._ |
| `InstantPaymentData` → `PixRandom` | `string` | Sí<sup>1</sup> | La clave aleatoria que el beneficiario ha generado como clave PIX. |
| `notification_Url` | `string` | No | Webhook para notificar el resultado del Payout. Para más información sobre la configuración de este webhook, consulte este [artículo]({{< ref Payout-Webhook.md >}}). |
| `payee` → `FirstName` | `string` | Sí<sup>3</sup> | Nombre del Beneficiario. | 
| `payee` → `lastName` | `string` | Sí<sup>3</sup> | Apellido del Beneficiario. | 
| `payee` → `companyName` | `string` | Sí<sup>3</sup> | Nombre de la empresa. | 
| `payee` → `email` | `string` | No | Dirección de correo electrónico del Beneficiario. |  
| `payee` → `phone` | `string` | No | Número de teléfono del Beneficiario. | 
| `payee` → `nationalitiCode` | `string` | No | País de nacionalidad del beneficiario. Indicar country ISO code 2 dígitos. |
| `payee` → `BirthDay` | `Date Time` | No | Fecha de nacimiento del beneficiario. Formato "YYYY-MM-DD". |
| `payee` → `address` | `string` | No | Dirección del Beneficiario. | 
| `Location` → `City` | `string` | Sí<sup>5</sup> | Ciudad de residencia del beneficiario. |
| `Location` → `address` | `string` | Sí<sup>5</sup> | Dirección de residencia del beneficiario. |
| `Location` → `zipCode` | `string` | No | Código postal de residencia del beneficiario. |
| `payee` → `document` → `type` | `string` | Sí | Tipo de documento del Beneficiario.<br>[Encuentre la lista de documentos aquí](../payouts-api/variables.html#document-types). |  
| `payee` → `document` → `number` | `string` | Sí | Número de documento del Beneficiario. | 
| `payee` → `bankaccount` → `number` | `string` | Sí<sup>2</sup> | Número de cuenta del Beneficiario.<br>Tenga en cuenta las siguientes consideraciones:<br><ul style="margin-bottom: initial;"><li>Para Argentina, configure el CBU/CVU.</li><li>Para México, configure el número CLABE.</li><li>Para Perú:<ul><li>Si es a un **banco**, use el **CCI**.</li><li>Si es a una **wallet**, use el **número de teléfono** sin el `+`.</li></ul></li></ul> |
| `payee` → `bankaccount` → `type` | `integer` | Sí<sup>2</sup> | Tipo de cuenta del Beneficiario. Asigne `1` para Cuenta corriente y `2` para Cuenta de ahorros. |
| `payee` → `bankaccount` → `codebank` | `string` | Sí<sup>2</sup> | Código del banco del Beneficiario.<br>Puede obtener la lista de bancos de un país determinado utilizando el [método _**Obtener listado de bancos**_](getting-started.html#get-bank-list). También, [puede encontrar el listado de bancos](variables.html#bank-codes). |
| `payee` → `bankaccount` → `Swift` | `string` | Sí<sup>4</sup> | Código de ruteo internacional. |
| `payee` → `bankaccount` → `Branch` | `string` |  | Sucursal bancaria del Beneficiario. |
| `Remitter` → `fisrtName` | `string` | Sí<sup>4</sup> | Nombre del Remitente. |
| `Remitter` → `lastName` | `string` | Sí<sup>4</sup> | Apellido del Remitente. |
| `Remitter` → `companyName` | `string` | Sí<sup>4</sup> | Nombre de la persona jurídica (empresa) Remitente. |
| `Remitter` → `birthday` | `date time` | No | Fecha de nacimiento del Remitente. |
| `Remitter` → `CountryIsoCode` | `string` | No | País de residencia del Remitente. |
| `Remitter` → `location` → `City` | `string` | No | Ciudad del Remitente. |
| `Remitter` → `location` → `Address` | `string` | Sí<sup>4</sup> | Dirección del Remitente. |
| `Remitter` → `location` → `ZipCode` | `string` | No | Código Postal de Remitente. |

<sup>1</sup> _Sólo aplica para Brasil usando Transferencia Bancaria Instantánea. En caso contrario, el objeto_ `payee.InstantPaymentData` _y sus parámetros no deben estar presentes en el request._<br>
<sup>2</sup> _Cuando utilice Transferencias Bancarias, estos parámetros son obligatorios para_ ***TODOS*** _los países. Para Transferencias Bancarias Instantáneas en Brasil, el objeto_ `payee.bankaccount` _y sus parámetros no deben estar presentes en el request._<br>
<sup>3</sup> _Son mandatorios los campos `firstName` y `lastName` para persona física y `companyName` para persona jurídica (empresa). Si se envía un payout para empresa solo se tiene que completar el campo `companyName`, y si se envía un payout a una persona física solo se tienen que completar los campos `firstName` y `lastName`.<br>
***Importante:*** Los campos `firstName` y `lastName` no soportan ni números ni caracteres especiales, solo letras. El campo `companyName` sí acepta todo tipo de caracteres alfanuméricos._<br>

<sup>4</sup> _Estos campos son obligatorios para transferencias bancarias **SOLAMENTE** a los siguientes países:  
   **Bosnia y Herzegovina**, **Bulgaria**, **Costa Rica**, **República Dominicana**, **Egipto**, **Guatemala**, **Israel**, **Nicaragua**, **Noruega**, **Paraguay** y **Turquía**. _<br>

<sup>5</sup> _Estos campos son obligatorios **solamente** para transferencias bancarias a **Egipto**._


#### Ejemplo del Request {#request-example}
Consulte la pestaña correspondiente de acuerdo con el país del beneficiario.

<!--
{{< tabs tabTotal="7" tabID="countries" tabName1="Argentina" tabName2="Brasil" tabName3="Chile" tabName4="Colombia" tabName5="México" tabName6="Perú" tabName7="Uruguay" >}}
{{< tab tabNum="1" >}}
<br>

**Argentina: De USD a ARS:**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/AR/request_AR_USDtoARS >}}
{{< /highlight >}}
<br>

**Argentina: De ARS a ARS:**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/AR/request_AR_ARStoARS >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Como se mencionó anteriormente, el objeto `payee.bankaccount` no debe estar presente en el request. Por lo tanto, al utilizar _Transferencias Bancarias Instantáneas_ es necesario enviarlo de la siguiente manera:


**Brasil: De USD a BRL:**
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/BR/request_BR_USDtoBRL >}}
{{< /highlight >}}

<br>

**Brasil: BRL a BRL**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/BR/request_BR_BRLtoBRL >}}
{{< /highlight >}}

{{< /tab >}}
{{< tab tabNum="3" >}}
<br>

**Chile: USD a CLP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CL/request_CL_USDtoCLP >}}
{{< /highlight >}}
<br>

**Chile: CLP a CLP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CL/request_CL_CLPtoCLP >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="4" >}}
<br>

**Colombia: USD a COP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CO/request_CO_USDtoCOP >}}
{{< /highlight >}}
<br>

**Colombia: COP a COP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CO/request_CO_COPtoCOP >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="5" >}}
<br>

**México: USD a MXN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/MX/request_MX_USDtoMXN >}}
{{< /highlight >}}
<br>

**México: MXN a MXN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/MX/request_MX_MXNtoMXN >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="6" >}}
<br>

**Perú: USD a PEN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_USDtoPEN >}}
{{< /highlight >}}
<br>

**Perú: PEN a PEN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_PENtoPEN >}}
{{< /highlight >}}
<br>

**Perú: USD a USD**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_USDtoUSD >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="7" >}}
<br>

**Uruguay: USD a UYU**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_USDtoUYU >}}
{{< /highlight >}}
<br>

**Uruguay: UYU a UYU**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_UYUtoUYU >}}
{{< /highlight >}}
<br>

**Uruguay: USD a USD**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_USDtoUSD >}}
{{< /highlight >}}

{{< /tab >}}

{{< /tabs >}}-->
<!--tabID="countries"-->
{{< tabs tabTotal="18"  tabName1="Argentina" tabName2="Brasil" tabName3="Chile" tabName4="Colombia" tabName5="México" tabName6="Perú" tabName7="Uruguay" tabName8="Bosnia y Herzegovina" tabName9="Bulgaria" tabName10="Costa Rica" tabName11="Rep. Dominicana" tabName12="Egipto" tabName13="Guatemala" tabName14="Israel" tabName15="Nicaragua" tabName16="Noruega" tabName17="Paraguay" tabName18="Turquía" >}}

{{< tab tabNum="1" >}}
<br>

**Argentina: De USD a ARS:**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/AR/request_AR_USDtoARS >}}
{{< /highlight >}}
<br>

**Argentina: De ARS a ARS:**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/AR/request_AR_ARStoARS >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

Como se mencionó anteriormente, el objeto `payee.bankaccount` no debe estar presente en el request. Por lo tanto, al utilizar _Transferencias Bancarias Instantáneas_ es necesario enviarlo de la siguiente manera:

**Brasil: De USD a BRL:**
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/BR/request_BR_USDtoBRL >}}
{{< /highlight >}}

<br>

**Brasil: BRL a BRL**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/BR/request_BR_BRLtoBRL >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="3" >}}
<br>

**Chile: USD a CLP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CL/request_CL_USDtoCLP >}}
{{< /highlight >}}
<br>

**Chile: CLP a CLP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CL/request_CL_CLPtoCLP >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="4" >}}
<br>

**Colombia: USD a COP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CO/request_CO_USDtoCOP >}}
{{< /highlight >}}
<br>

**Colombia: COP a COP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/CO/request_CO_COPtoCOP >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="5" >}}
<br>

**México: USD a MXN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/MX/request_MX_USDtoMXN >}}
{{< /highlight >}}
<br>

**México: MXN a MXN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/MX/request_MX_MXNtoMXN >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="6" >}}
<br>

**Perú: USD a PEN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_USDtoPEN >}}
{{< /highlight >}}
<br>

**Perú: PEN a PEN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_PENtoPEN >}}
{{< /highlight >}}
<br>

**Perú: USD a USD**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/PE/request_PE_USDtoUSD >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="7" >}}
<br>

**Uruguay: USD a UYU**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_USDtoUYU >}}
{{< /highlight >}}
<br>

**Uruguay: UYU a UYU**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_UYUtoUYU >}}
{{< /highlight >}}
<br>

**Uruguay: USD a USD**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/UY/request_UY_USDtoUSD >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="8" >}}
<br>

**Bosnia y Herzegovina: USD a BAM**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/bosnia_herzegovina >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="9" >}}
<br>

**Bulgaria: USD a BGN**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/bulgaria >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="10" >}}
<br>

**Costa Rica: USD a CRC**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/costarica >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="11" >}}
<br>

**República Dominicana: USD a DOP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/republicadominicana >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="12" >}}
<br>

**Egipto: USD a EGP**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/egipto >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="13" >}}
<br>

**Guatemala: USD a GTQ**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/guatemala >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="14" >}}
<br>

**Israel: USD a ILS**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/israel >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="15" >}}
<br>

**Nicaragua: USD a NIO**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/nicaragua >}}
{{< /highlight >}}


{{< /tab >}}

{{< tab tabNum="16" >}}
<br>

**Noruega: USD a NOK**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/noruega >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="17" >}}
<br>

**Paraguay: USD a PYG**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/paraguay >}}
{{< /highlight >}}

{{< /tab >}}

{{< tab tabNum="18" >}}
<br>

**Turquía: USD a TRY**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/Stonex/turquia >}}
{{< /highlight >}}

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
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_http200 >}}
{{< /highlight >}}
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
Falló la validación del mensaje (error en validación de datos) y el Payout queda en estado **is not created**.

**Response body**

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_http400 >}}
{{< /highlight >}}
<br>

También aplica cuando un campo obligatorio de la API no es ingresado.
<br>
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_http400_2 >}}
{{< /highlight >}}

<br>
* `Unauthorized`: HttpCode `401`.<br>
Error de autorización.

* `Conflict` - `Declined`: HttpCode `HttpCode 409`.<br>
La validación del mensaje fue exitosa pero, el Payout queda en estado **Declinado** debido a reglas de negocio.

**Response body**
{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_http409 >}}
{{< /highlight >}}

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
| `description` | `string` | La descripción / razón ingresada en el request.  |


#### Ejemplo del Response {#response-example-1}

{{< highlight json >}}
{{< Payouts/Api/UsingPayoutsApi/response_getPayout >}}
{{< /highlight >}}

{{% alert title="Info" color="info"%}}
En payouts para persona jurídica, se recibirá el campo `companyName` en lugar de `firstName` y `lastName`.
{{% /alert %}}