---
title: "Tarjetas crédito y débito"
linkTitle: "Tarjetas crédito y débito"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con tarjetas crédito o débito.
weight: 10
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El Request y Response mostrado en este artículo aplican tanto para el Modelo [Gateway]({{< ref Concepts.md >}}#gateway-model) como [Payfac]({{< ref Concepts.md >}}#payfac-model). Para el modelo Gateway, tenga en cuenta las recomendiaciones mostradas en [esta sección](#considerations).
{{% /alert %}}

## Parámetros del Request {#request-parameters}
Se necesita incluir campos específicos para que este método de pago funcione correctamente. Consulte la sección [Parámetros del Request]({{< ref purchase-operations.md >}}#request-parameters) para obtener información detallada sobre los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `TrxToken` | `string` | Sí | Token que identifica la tarjeta del cliente.<br>Para más información sobre cómo crear el token, consulte [Clientes](/es/docs/purchase-workflow/customer-types.html). |
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Installments` | `integer` | No | Este parámetro hace referencia al número de pagos en el que se divide una compra con tarjeta de crédito. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | Sí | Nombre del cliente. |
| `Customer` → `LastName` | `string` | Sí | Apellido del cliente. |
| `Customer` → `DocumentType` | `string` | No | Tipo de documento del cliente.<br>Consulte la [tabla de tipos de documento](/es/docs/payment-methods/uruguay.html#document-types) para ver los posibles valores. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | Sí | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | Sí | País del cliente. |
| `Customer` → `Address` → `State` | `string` | Sí | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | Sí | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | Sí | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente.<br>El código postal es obligatorio para Estados Unidos y Canadá. |
| `CustomerIP` | `string` | No | IP del cliente que utiliza el servicio. |
| `DataUY` | `object` | No | Información específica para _Uruguay_.<br>En Uruguay, dos leyes promueven los medios de pago electrónicos mediante la devolución de puntos de IVA. Las leyes **19.210** (Ley de inclusión financiera) y **17.934** de servicios gastronómicos y afines regulan estos beneficios, y los datos presentados en este objeto son necesarios para su correcto uso.<br>Este campo es requerido para el modelo Gateway. |
| `DataUY` → `IsFinalConsumer` | `boolean` | No | Indica si la venta se realiza a un consumidor final.<br>Este campo es requerido para el modelo Gateway. |
| `DataUY` → `Invoice` | `string` | No <sup>*</sup> | Número de factura asociado a la venta. Este parámetro solo acepta caracteres numéricos. |
| `DataUY` → `TaxableAmount` | `number` | No <sup>*</sup> | Importe gravado por IVA. En caso de no enviarse el valor, no se aplicará la devolución de puntos de IVA.|

{{% alert title="Info" color="info"%}}
* <sup>*</sup> Este parámetro es obligatorio cuando `DataUY.IsFinalConsumer` es `true`.
* Recuerde que para el correcto funcionamiento del sistema antifraude, sugerimos enviar la información adicional descrita en la sección [Antifraude]({{< ref Antifraud.md>}}).

{{% /alert %}}

### Ejemplo del Request {#request-example}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Uruguay/requestPurchase>}}
{{< /highlight >}}

## Parámetros del Response {#response-parameters}
Para más información sobre los parámetros del Response, consulte la [sección de parámetros]({{< ref purchase_v3.md >}}#response-parameters) de la creación de la compra.

### Ejemplo del Response {#response-example}
{{< highlight json >}}
{{< Payins/V3/CreatePurchase/http200_approved currency="UYU">}}
{{< /highlight >}}

<!--
### Response para AMEX {#response-for-amex}
Cuando utilice AMEX, la respuesta incluye el objeto `AcquirerResponseDetail` dentro del objeto `Response.Transaction.Steps` con la siguiente información.

| Propiedad | Descripción |
|---|---|
| `ResponseCode` | Código de respuesta. |
| `ResultDescription` | Descripción. |
| `Indi` | Indicador de aplicación de devolución de impuestos (1=aplica, 2=no aplica). |
| `Monto_dev` | Este monto corresponde a la devolución de impuestos. |
| `SerialTraceAuditNumber` | Referencia del adquirente. |
| `RetrievalReferenceNumber` | RRN, referencia del adquirente. |
| `PurchaseIdSended` | Identificador de la compra que se envió al adquirente. |
| `BatchId` | Identificador del batch al cual pertenece la compra realizada. |

Ejemplo:

```json
{
  "Response": {
    "Transaction": {
      "Steps": [
        {
          "AcquirerResponseDetail": "{ 'ResponseCode' : '00', 'ResultDescription': 'Aprobado', 'Indi' : '1', 'Monto_dev': '10', 'SerialTraceAuditNumber': '931819',  'RetrievalReferenceNumber': '564149', 'PurchaseIdSended': '4973a588-7665-4f26-b6ed-011b7f528bea', 'BatchId': '467162' }\r\n"
        }
      ]
    },
  },
  "Errors": []
}
```
-->

## Tarjetas de prueba {#testing-cards}
Para generar información de tarjetas válidas para pruebas, debe establecer primero qué adquirente necesita probar y qué tipo de prueba quiere hacer.

### Determinación del BIN {#determination-of-bin}
Al configurar un adquirente, también se crea el BIN (número de identificación bancaria) de la tarjeta. Este BIN debe coincidir con uno de los bines asociados a las marcas procesadas por el adquirente. Por ejemplo, si está realizando una prueba de integración con MasterCard, el BIN de la tarjeta generada debe ajustarse al siguiente formato: `^ 5 \ [1-5] \ [0-9]*`

Este formato significa que debe comenzar con el número **5**; el segundo número debe estar entre 1 y 5, luego se acepta cualquier otro número. Por ejemplo, el BIN a probar puede ser `510000`. A continuación se enumeran los bines válidos en el sistema y su adquirente correspondiente.

| BIN (formato) | Marca | Notas |
|--------------|-------|-------|
| `^4\[0-9]*` | VISA | Cualquier tarjeta que empiece con `4`. |
| `^5\[1-5]\[0-9]*`| MasterCard | Cualquier tarjeta que empiece con `51` hasta `5`. |
| `^589892\|^542991`| OCA | Cualquier tarjeta que empiece con `589892` o `542991`. |
<!--| `^601828` | Créditos Directos | Cualquier tarjeta que empiece con `601828` |
| `^3\[47\]\[0-9\]*` | American Express | Cualquier tarjeta que empiece con `3` seguido de `4` o `7`. |
| `^628026` | Passcard | Cualquier tarjeta que empiece con `628026`. |
| `^504736` | Club del Este | Cualquier tarjeta que empiece con `504736`. |
| `^589657\|^603522\|^6042\[0-9\]\[1-9\]\*\|^604400\*\|^6043\[0-9\]\*\|^600178\|^604230` | Cabal | Cualquier tarjeta que empiece con `589657`, `603522`, `604400`, `600178`, `604230`, `6042` seguido de `0` al `9` en la quinta posición y `1` al `9` en la sexta posición. |
| `^637483` | Edenred | Cualquier tarjeta que empiece con `637483`. |
| `^86\[0-9\]*` | Bancard Check | Cualquier tarjeta que empiece con `86`. |
| `^280991` | Credifielco | Cualquier tarjeta que empiece con `280991`. |
| `^600692` | Infonet | Cualquier tarjeta que empiece con `600692`. |
| `^589562` | Tarjeta Naranja | Cualquier tarjeta que empiece con `589562`. |
| `^603199` | Anda | Cualquier tarjeta que empiece con `603199`. |
| `^606211` | Hipercard | Cualquier tarjeta que empiece con `606211`. |
| `^636297` | Elo | Cualquier tarjeta que empiece con `636297`. |
| `^507860` | Aura | Cualquier tarjeta que empiece con `507860`. |-->

### Determinación de Comportamiento para el modelo PayFac {#configured-behaviors-for-the-payfac-model}
El comportamiento de la respuesta dependerá del monto enviado. Utilice las siguientes tarjetas para simular los diferentes estados de la compra.

| Marca | PAN | CVV | Fecha de Expiración |
|---|---|---|---|
| Mastercard | `5165850000000008` | `123` | `12/29` | 
| Visa | `4704550000000005` | `123` | `12/29` |

#### Tarjetas sin CVV

| Marca | PAN | Fecha de Expiración |
|---|---|---|
| Mastercard Crédito | `5101980000000000` |`12/29` |
| Mastercard Prepago | `5599260000000006` | `12/29` |
| Visa Crédito | `4103770000000006` |`12/29` |
| Visa Débito | `4213000000000005` |`12/29` |
| Visa Internacional Crédito | `4147960000000001` |`12/29` |
| Visa Internacional Débito | `4345590000000006` |`12/29` |

<div id="shortTable"></div>

| Comportamiento | Monto |
|---|---|
| Resultado: Rejected <br> Error: La tarjeta no permite operar con cuotas. | **UYU** 1045,00  |
| Resultado: Rejected <br> Error: Tarjeta expirada. | **UYU** 1046,00  |
| Resultado: Rejected <br> Error: Fondos insuficientes. | **UYU** 1051,00  |
| Resultado: OK <br> Aprobado | <ul style="margin-bottom: initial;"><li>Menor o igual a **UYU** 1000,00</li><li>Mayor a **UYU** 1061,00</li></ul> |

### Determinación de Comportamiento para el modelo Gateway {#configured-behaviors-for-the-gateway-model}
El comportamiento de la respuesta dependerá de tarjeta utilizada.

<div id="shortTable"></div>

### Tarjetas para modelo Gateway

| Marca | PAN | Fecha de Expiración | Comportamiento
|---|---|---|---|
| Mastercard Crédito | `5385300000000001` |`12/29` | `Aprobado`|
| Mastercard Prepago | `5572400000000001` | `12/29` |`Aprobado`|
| Mastercard Débito | `5558460000000001` | `12/29` |`Aprobado`|
| Visa Crédito | `4000020000000000` |`12/29` |`Aprobado`|
| Visa Débito | `4659105569051157` |`12/29` |`Aprobado`|
| Visa Prepago | `4000148147058142` |`12/29` |`Aprobado`|
| OCA Crédito | `5429910000000001` |`12/29` |`Aprobado`|
| Mastercard crédito | `5165850000000004` | `12/29` |`Rechazado`|
| Visa Crédito | `4456530000001001` |`12/29` |`Rechazado`|
<!--
| Terminación | Comportamiento  |
|:-----------:|-----------|
| `0001` | Resultado: OK <br> Aprobado. |
| `0002` | Resultado: Rechazado <br> Error: TR007 <br> Error con algún dato del medio de pago (número de tarjeta, código de verificación y/o fecha de expiración). |
| `0013` | Resultado: Rechazado <br> Error: TR012 <br> Límite de crédito excedido. |-->

<!--{{< tabs tabTotal="7" tabID="acquirers" tabName1="OCA" tabName2="VISA" tabName3="Anda" tabName4="Créditos Directos" tabName5="Mastercard" tabName6="AMEX (UY)" >}}
{{< tab tabNum="1" >}}
<br>

<div id="shortTable"></div>

| Operación | Terminación | Comportamiento  |
|-----------|:-----------:|-----------|
| Compra | `0001` | Resultado: OK <br> Aprobado. |
| Compra | `0010` | Resultado: OK <br> Aprobado. |
| Compra | `0011` | Resultado: Rejected <br> Error: TR011 <br> Tarjeta perdida o bloqueada. |
| Compra | `0012` | Resultado: Rejected <br> Error: TR013 <br> Error indefinido en Adquirente. Compra no autorizada. |
| Compra | `0013` | Resultado: Rejected <br> Error: TR012 <br> Límite de crédito excedido. |
| Compra | `0002` | Resultado: Rejected <br> Error: TR007 <br> Error con algún dato del medio de pago (número de tarjeta, código de verificación y/o fecha de expiración). |
| Compra | `0003` | Resultado: Rejected <br> Error: TR010 <br> Documento de identidad inválido. |
| Compra | `0004` | Resultado: Rejected <br> Error: TR011 <br> Tarjeta perdida o bloqueada. |
| Compra | `0005` | Resultado: Rejected <br> Error: TR013 <br> Error indefinido en Adquirente. Compra no autorizada. |
| Anulación | `0001` | Resultado: Cancel OK. |
| Anulación | `0010` | Resultado: Rejected <br> Error: TR013 <br> Error indefinido en Adquirente. Anulación no realizada. |

{{< /tab >}}

{{< tab tabNum="2" >}}
<br>

<div id="shortTable"></div>

| Operación | Terminación | Comportamiento |
|---------|:-----------:| -----------|
| Preautorización (Purchase) | `0001` | Resultado: OK <br> Aprobado. |
| Preautorización (Purchase) | `0011` | Resultado: OK <br> Aprobado. |
| Preautorización (Purchase) | `0012` | Resultado: OK <br> Aprobado. |
| Preautorización (Purchase) | `0013` | Resultado: OK <br> Aprobado. |
| Preautorización (Purchase) | `0014` | Resultado: OK <br> Aprobado. |
| Preautorización (Purchase) | `0002` | Resultado: Rejected <br> Error: TR007 <br> Error con algún dato del medio de pago (número de tarjeta, código de verificación y/o fecha de expiración). |
| Preautorización (Purchase) | `0003` | Resultado: Rejected <br> Error: TR005 <br> Emisor fuera de línea. |
| Preautorización (Purchase) | `0004` | Resultado: Rejected <br> Error: TR014 <br> El Adquirente denegó la transacción por posible fraude. |
| Preautorización (Purchase) | `0005` | Resultado: Rejected <br> Error: TR012 <br> Límite de crédito excedido. |
| Preautorización (Purchase) | `0006` | Resultado: Rejected <br> Error: TR011 <br> Tarjeta perdida o bloqueada. |
| Captura de Preautorización (Commit) | `0001` | Resultado: OK <br> Aprobado. |
| Captura de Preautorización (Commit) | `0011` | Resultado: OK <br> Aprobado. |
| Captura de Preautorización (Commit) | `0012` | Resultado: Rejected <br> Error: TR005 <br> Emisor fuera de línea. |
| Captura de Preautorización (Commit) | `0013` | Resultado: Rejected <br> Error: TR019 <br> Transacción rechazada por el Adquirente/Procesador. |
| Captura de Preautorización (Commit) | `0014` | Resultado: Rejected <br> Error: TR013 <br> Error indefinido en Adquirente. |
| Anulación de Preautorización (Rollback) | `0001` | Resultado: OK <br> Anulado. |
| Anulación de Preautorización (Rollback) | `0011` | Resultado: Rejected <br> Error: TR005 <br> Emisor fuera de línea. |
| Anulación de Preautorización (Rollback) | `0012` | result: Rejected <br> Error: TR003 <br> Problemas con la cuenta del comercio en Adquirente. |
| Anulación de Preautorización (Rollback) | `0013` | Resultado: Rejected <br> Error: TR019 <br> Transacción rechazada por el Adquirente/Procesador. |
| Anulación de Preautorización (Rollback) | `0014` | Resultado: Rejected <br> Error: TR013 <br> Error indefinido en Adquirente. |
| Reembolso | `0001` | Resultado: OK <br> Error: TR013 <br> Reembolsado. |
| Reembolso | `0011` | Resultado: Rejected <br> Error: TR005 <br> Emisor fuera de línea. |
| Reembolso | `0012` | Resultado: Rejected <br> Error: TR003 <br> Problemas con la cuenta del comercio en Adquirente. |
| Reembolso | `0013` | Resultado: Rejected <br> Error: TR019 <br> Transacción rechazada por el Adquirente/Procesador. |
| Reembolso | `0014` | Resultado: Rejected <br> Error: TR013 <br> Error indefinido en Adquirente. |

Ejemplo de BIN (6 primeros dígitos) para comprobar tipos de tarjeta específicos:

* `468562` – Tarjeta Visa prepago
* `430307` – Tarjeta Débito Visa
* `463308` – Tarjeta Débito Visa

{{< /tab >}}

{{< tab tabNum="3" >}}
<br>

<div id="shortTable"></div>

| Operación | Terminación | Comportamiento |
|-----------|:-----------:|----------|
| Compra | `0001` | Resultado: OK <br> Aprobado. |
| Compra | `0002` | Resultado: OK <br> Aprobado. |
| Compra | `0003` | Resultado: OK <br> Aprobado. |
| Reembolso | `0001` | Resultado: OK. |
| Reembolso | `0002` | Resultado: OK. |

{{< /tab >}}

{{< tab tabNum="4" >}}
<br>

<div id="shortTable"></div>

| Operación | Terminación | Comportamiento |
|-----------|:-----------:|----------|
| Compra | `0001` | Resultado: OK <br> Aprobado. |
| Compra | `0002` | Resultado: Rejected <br> Error: TR007 <br> Datos incorrectos asociados a tarjeta. |
| Compra | `0003` | Resultado: Rejected <br> Error: TR016 <br> Error en los parámetros informados al adquirente. |
| Compra | `0004` | Resultado: Rejected <br> Error: TR012 <br> Límite de crédito excedido. |
| Compra | `0005` | Resultado: Rejected <br> Error: TR997 <br> Error del adquirente procesando el pago. |
| Anulación | `0001` | Resultado: OK <br> Anulado. |
| Anulación | `0010` | Resultado: Rejected <br> Error: TR001 <br> Error de comunicación con el Adquirente. |

{{< /tab >}}

{{< tab tabNum="5" >}}
<br>

<div id="shortTable"></div>

| Operación | Terminación | Comportamiento |
|-----------|:-----------:|----------|
| Compra | `0001` | Resultado: OK <br> Aprobado. |
| Compra | `0002` | Resultado: Rejected <br> Error: TR005 <br> Emisor fuera de línea o problema relacionado al Adquirente. |
| Compra | `0003` | Resultado: Rejected <br> Error: TR009 <br> Error desconocido del Adquirente. |
| Compra | `0004` | Resultado: Rejected <br> Error: TR013 <br> El Adquirente denegó la transacción. |
| Compra | `0005` | Resultado: Rejected <br> Error: TR004 <br> Error de comunicación al enviar transacción al Adquirente. |
| Anulación | `0001` | Resultado: OK <br> Anulado. |

{{< /tab >}}

{{< tab tabNum="6" >}}
<br>

<div id="shortTable"></div>

| Operación | Terminación | Comportamiento |
|-----------|:-----------:|----------|
| Compra | `0001` al `0010` | Resultado: OK <br> Aprobado. |
| Compra | `0011` | Resultado: Rejected <br>Error: PR003<br>Monto inválido. |
| Compra | `0012` | Resultado: Rejected <br>Error: TR007<br>Tarjeta inválida. |
| Compra | `0013` | Resultado: Rejected <br>Error: TR019<br>Denegada. |

{{< /tab >}}

{{< /tabs >}}-->

## Particularidades para el modelo Gateway {#considerations}
* **Creditel**,  **PassCard** y **OCA** requieren que el mensaje de `Purchase` incluya el número y tipo de documento del tarjetahabiente (campos `Customer.DocumentTypeId` y `Customer.DocNumber`).
* Puede realizar compras a cuotas siempre que el Banco Emisor lo tenga habilitado.
* Puede realizar compras con Tarjetas de Débito siempre que el Banco Emisor lo tenga habilitado.
* **Visanet** exige la inclusión del CVV en la primera compra del cliente o en el alta del cliente.<br>Una vez realizado el registro y obtenido el _Commerce Token_, no es necesario solicitar el CVV en futuras transacciones.
* **Fiserv** requiere que se envíe el CVV, incluso si tiene el _Commerce Token_. Debe ejecutar [Flujo de solicitud de código de verificación]({{< ref Registered-users.md >}}#verification-code-request-flow).<br>Esta modalidad está activada por defecto. Si desea desactivarla, debe negociar con **Fiserv** y notificarnoslo.
* **PassCard** requiere que se envíe el CVV, incluso si tiene el _Commerce Token_. Por lo tanto, debe ejecutar el [Flujo de Solicitud de Código de Verificación]({{< ref Registered-users.md >}}#verification-code-request-flow).
* Cuando utilice **OCAOneClick2** (OCA Multi-Acquiring), necesita incluir la dirección IP de la persona que está haciendo la compra. Para esto, debe enviar el parámetro `CustomerIP` en el request.

### Compras utilizando MasterCard a través de OCA {#purchases-using-mastercard-through-oca}
Cuando utilice **MasterCard** en el model Gateway, se recomienda enviar el device FingerPrint utilizando el método `SetDeviceFingerPrint`.

Agregue esta función al script utilizado en para el formulario de Checkout (`PWCheckOut`) para generar y retornar el valor utilizado en la compra.

En este ejemplo, mostramos cómo invocar y obtener el resultado.

```html
<script type="text/javascript">
    PWCheckout.SetDeviceFingerprint();
</script>
```
<br>

Luego, incluya el token en la creación de la compra de acuerdo con los siguientes escenarios.

* Para _**OneTimeToken**_, envíe el device FingerPrint que generó y el **OT token**.
* Para _**CommerceToken**_, existen dos casos:
  * Para compras recurrentes (sin CVV), envíe el device FingerPrint que genera y el **CT token**. Usted puede utilizar un **CT token** existente o generar uno nuevo.
  * Para compras con CVV, no es necesario generar un `DeviceFingerPrint` ya que cuando el cliente ingresa el CVV, el sistema envía el valor generado cuando se muestra la página de solicitud de CVV. Después, se genera una Compra en estado _Pending_ y necesita redirigir al cliente a la URL retornada en el parámetro `actionUrl` donde ingresa el CVV.