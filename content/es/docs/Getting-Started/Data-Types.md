---
title: "Tipos de datos"
linkTitle: "Tipos de datos"
date: 2023-03-02T11:40:29-05:00
Description: >
  Revise los tipos de datos que necesita para integrarse con Bamboo Payment.
weight: 20
---

## Básicos {#basic}
Consulte esta sección para aprender algunos aspectos importantes de los tipos de datos básicos de la integración de Bamboo.

### String
Es un conjunto de caracteres que puede tener cualquier carácter Unicode. Se puede definir una longitud máxima para este tipo de datos utilizando paréntesis cuadrados; por ejemplo, `string[30]` significa que el string puede tener un máximo de 30 caracteres. Si un string tiene más caracteres que el máximo definido, será truncado y continuará el procesamiento.

### Numeric
Se refiere a un valor entero. Se puede definir una longitud máxima para este tipo de datos utilizando paréntesis cuadrados; por ejemplo, `Numeric[3]` significa que el número puede tener un máximo de 3 dígitos. Si el dato tiene un valor mayor al especificado, se retorna un error.

### Amount
Se refiere a un campo de tipo `Numeric` que incluye decimales para expresar el valor de una transacción. 
Estos campos siempre están expresados como la parte entera más dos dígitos decimales sin signo de separador entre ellos. 

La siguiente tabla muestra cómo se deben codificar los valores:

<div id="shortTable"></div>

| Valor | Codificado como |
|---|---|
| 100 | 10000 |
| 1.237,52 | 123752 |
| 3.200,5 | 320050 |
| 0,01 | 1 |

### TimeStamp
Este tipo de datos muestra los valores de fecha y hora que deben ser expresados en el siguiente formato:

`"YYYY-MM-DDTHH:mm:ss.ttt"`

Donde:

* `YYYY` indica el año
* `MM` indica el mes
* `DD` indica el día
* `T` indica el inicio de la sección de hora
* `hh` indica las horas (de 0 a 23)
* `mm`  indica los minutos
* `ss` indica los segundos
* `ttt` indicates los milisegundos

A continuación se encuentran ejemplos de cómo deben ser codificados:

<div id="shortTable"></div>

| Valor | Codificado como |
|---|---|
| _2016/01/12 13:21:48.354_ | `2016-01-12T13:21:48.354` |
| _2016/03/31 05:17:00.000_ | `2016-03-31T05:17:00.000` |
| _2016/11/28 22:59:59.970_ | `2016-11-28T22:59:59.970` |

### Date
Este tipo de datos contiene una fecha exacta. A diferencia del tipo de datos [TimeStamp](#TimeStamp), non incluye la hroa y está en el siguiente formato:

`yyyyMMdd`

### Boolean
Este tipo de datos es un valor lógico verdadero (`true`) o falso (`false`).

### TransactionStatus
Indica el estado final de una transacción.

Posibles valores:

<div id="shortTable"></div>

| TransactionStatusID | TransactionStatus |
|---|---|
| 1 | Aprobado |
| 2 | Pendiente |
| 3 | Pre-autorizado |
| 4 | Rechazado |
| 5 | Pagado |
| 6 | Cancelado |

### ActionType
Indica el tipo de acción que debe realizar el comercio. Este tipo de datos es útil cuando se procesan compras utilizando el _flujo de redirección_.

Posibles valores:

<div id="shortTable"></div>

| ActionType | Acción |
|---|---|
| 1 | _Redirect_<br>Indica que necesita hacer una redirección como paso siguiente de la compra. |
| 2 | _PWCapture_<br>Indica que necesita capturar el CVV de la tarjeta. |