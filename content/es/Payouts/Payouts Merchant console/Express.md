---
title: "Payouts express"
linkTitle: "Payouts express"
date: 2023-06-30T08:16:09-05:00
type: docs
Description: >
 Con _**Payouts exprés**_, puede iniciar Payouts masivos sin esfuerzo y sin necesidad de integrarse mediante API, simplemente cargando un archivo Excel que contiene sus solicitudes de Payouts. Este proceso simplificado le permite enviar múltiples pagos con facilidad y precisión de forma eficiente.
weight: 20
---

Para acceder a la funcionalidad de _**Payouts exprés**_, abra su consola de Comercios y seleccione ***Payout***, luego ***Payouts exprés***.

![PrintScreen](/assets/Payouts/Payouts13_es.png)

## Beneficios {#benefits}
* Configuración instantánea sin necesidad de integrarse mediante API.
* Rapidez y flexibilidad gracias a la carga por lotes.
* Centralice sus Payouts con mínimo esfuerzo.

## ¿Cómo utilizar Payouts exprés? {#how-to-use-express-payouts}
_**Payouts exprés**_ le brinda una secuencia fácil de llevar que le permite crear uno o más Payouts de forma simultánea. Una vez completado un paso, la secuencia activa el siguiente para evitar errores.

A continuación, describimos cada paso y le damos instrucciones.

### 1. Descargar la plantilla {#step1}
El primer paso es descargar la _Plantilla de Payouts exprés_. Este archivo de Excel tiene toda la información relacionada a un Payout y da ejemplos de cómo diligenciarlo.

Haga clic en el botón _**Descargar plantilla**_ para obtener el archivo de Excel.

![PrintScreen](/assets/Payouts/Payouts14_es.png)

Una vez tenga el archivo de Excel, puede diligenciarlo con la información de los Payouts. Cada fila representa una solicitud de Payout y tiene las siguientes columnas.

![PrintScreen](/assets/Payouts/Payouts15_en.png)

| Campo | ¿Obligatorio? | Descripción |
|---|:-:|---|---|
 | **Country** | Sí | Código ISO del país en formato `ISO 3166-2`.<br>[Listado de países disponibles de Payouts](../overview.html#coverage). |
 | **Amount** | Sí | Monto del Payout, el formato tiene dos dígitos decimales.<br>Ejemplo _100_ => _$ 1,00_. |
 | **Currency** | Sí | Código ISO de la moneda de su cuenta, que corresponde a la moneda de origen.<br>[Consulte aquí la lista de monedas](../payouts-api/variables.html#currencies). |
 | **destinationCurrency** | Sí | Código ISO de la moneda en la que el beneficiario recibirá el pago. Esta moneda debe corresponder al [modelo]({{< ref  Payout-Concepts.md >}}#payout-models) de su cuenta.<br>Por ejemplo:<br><ul style="margin-bottom: initial;"><li>Para _**USD2L**_, la columna **Currency** debe ser _USD_, y la columna **destinationCurrency** es optativa.</li><li>Para _**USD2USD**_, tanto **Currency** como **destinationCurrency** deben ser _USD_.</li><li>Para _**L2L**_, **Currency** y **destinationCurrency** deben ser la moneda del país elegido.</li></ul><br>[Consulte aquí la lista de monedas](../payouts-api/variables.html#currencies). |
 | **Reason** | No | Descripción del Payout. |
 | **Reference** | Sí | Identificador único del Payout definido por usted.<br>_Esta referencia no debe aparecer más de una vez en el archivo ni existir en Payouts anteriores._ |
 | **Type** | Sí | Tipo de transferencia del Payout.<br>[Lista de tipos de transferencia para Payouts]({{< ref Variables.md >}}#transfer-types-for-payouts). |
 | **Payee.FirstName** | Sí | Nombre del Beneficiario. | 
 | **Payee.LastName** | Sí | Apellido del Beneficiario. | 
 | **Payee.Email** | No | Dirección de correo electrónico del Beneficiario. |
 | **Payee.Phone** | No |Número de teléfono del Beneficiario. | 
 | **Payee.Address** | No | Dirección del Beneficiario. | 
 | **Payee.Document.Type** | Sí | Tipo de documento del Beneficiario.<br>[Encuentre la lista de documentos aquí]({{< ref Variables.md >}}#document-types). | 
 | **Payee.Document.Number** | Sí | Número de documento del Beneficiario. | 
 | **Payee.BankAccount.Number** | Sí<sup>*</sup> | Número de cuenta del Beneficiario.<br>Tenga en cuenta las siguientes consideraciones:<br><ul style="margin-bottom: initial;"><li>Para Argentina, configure the CBU/CVU.</li><li>Para México, configure el número CLABE.</li></ul> |
 | **Payee.BankAccount.Type** | Sí<sup>*</sup> | Tipo de cuenta del Beneficiario. Asigne `1` para Cuenta corriente y `2` para Cuenta de ahorros. |
 | **Payee.BankAccount.CodeBank** | Sí<sup>*</sup> | Código del banco del Beneficiario. | 
 | **Payee.BankAccount.Branch** | No | Código de la sucursal del banco del Beneficiario. Este campo solo aplica para Brasil y es obligatorio cuando utilice transferencia bancaria como tipo de Payout. | 
 | **Notification_Url** | No | Webhook para notificar el resultado del Payout. Para más información sobre la configuración de este webhook, consulte este [artículo]({{< ref Payout-Webhook.md >}}). |

<sup>*</sup> _Cuando utilice Transferencias Bancarias, estos parámetros son obligatorios para_ ***TODOS*** _los países. Para Transferencias Bancarias Instantáneas en Brasil, las columnas `Payee.BankAccount.Type`, `Payee.BankAccount.CodeBank` y `Payee.BankAccount.Branch` no deben estar presentes en el request._

{{% alert title="Importante sobre Payouts exprés" color="warning"%}}
* **No** modifique el archivo descargado agregando nuevas columnas, hojas o cambiando el nombre de las columnas.
* La funcionalidad soporta un máximo de **100** registros por archivo. Si necesita incluir más, repita el procedimiento para los Payouts restantes.
* Si ya tiene la plantilla descargada, no es necesario descargarla de nuevo.
* Puede guardar el archivo utilizando cualquier nombre.
* Cuando se utiliza PIX, es necesario configurar la clave PIX del beneficiario como se explica en la sección [Campos adicionales para PIX](#additional-columns-for-pix).
{{% /alert %}}

#### Columnas adicionales para PIX {#additional-columns-for-pix}
Al configurar PIX como tipo de pago del Payout (columna **Type** con el valor `4`), debe incluir una columna adicional de aqcuerdo con la clave PIX del beneficiario. Puede configurar cualquiera de las siguientes columnas, agregándolas junto a la columna **Notification_Url**, es decir, la columna **T** del archivo Excel:

* `PixDocument`: agregue esta columna para configurar el número CPF/CNPJ del beneficiario. El número de dígitos para **CPF** debe ser 11, y **CNPJ** debe ser 14.
* `PixEmail`: agregue esta columna para configurar la dirección de correo electrónico del beneficiario.
* `PixPhone`: agregue esta columna para configurar el número de teléfono del beneficiario. El número debe empezar por `+55`, y la celda debe estar configurada con formato de texto para permitir el uso del signo más.
* `PixRandom`: agregue esta columna para configurar la clave aleatoria que genera el beneficiario.

Debe agregar una columna por cada clave diferente en sus pagos. Por ejemplo, si tiene cinco beneficiarios, uno utiliza la dirección de correo electrónico, uno utiliza el número de teléfono, dos utilizan el número CPF/CNPJ y uno utiliza la clave aleatoria, debe incluir las columnas de la siguiente manera:

![PrintScreen](/assets/Payouts/Payouts23_en.png)

No incluya una columna si no tiene un valor.

### 2. Seleccionar la cuenta {#step2}
El segundo paso involucra escoger la cuenta de la que se debitarán los montos de los Payouts. Asegúrese de que la cuenta seleccionada tenga saldo suficiente para procesarlos todos.

Abra la lista desplegable _**Selecciona la cuenta**_ y seleccione la cuenta que desea utilizar.

![PrintScreen](/assets/Payouts/Payouts16_es.png)

### 3. Cargar la plantilla {#step3}
Una vez seleccione la cuenta en el [paso 2](#step2), el proceso activa este paso. Haga clic en el botón _**Cargar plantilla**_ para cargar el archivo creado en el [paso 1](#step1).

![PrintScreen](/assets/Payouts/Payouts17_es.png)

### 4. Resultados de la carga {#step4}
Si todos los payouts fueron correctos y no hubo errores en el archivo, el sistema informa el número de Payouts creados.

![PrintScreen](/assets/Payouts/Payouts18_es.png)

En caso contrario, la funcionalidad de _**Payouts exprés**_ informa el número de Payouts exitosos y fallidos. Puede consultar los Payouts fallidos en el archivo de Excel que generamos utilizando el enlace disponible.

![PrintScreen](/assets/Payouts/Payouts19_es.png)

Consulte la última columna en el archivo para saber el error del Payout.

![PrintScreen](/assets/Payouts/Payouts20_en.png)

Luego de corregir el error, guarde el archivo y cárguelo nuevamente utilizando la opción en el [paso 3](#step3).

Independiente de si el Payout fue exitoso, puede consultarlo en el [Reporte de Payouts]({{< ref Reports.md>}}). Los Payouts exitosos tienen el estado _Pendiente_ mientras que los fallidos, tienen el estado _Declinado_.
