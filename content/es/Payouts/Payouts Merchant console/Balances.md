---
title: "Reporte de Saldos de Payouts"
linkTitle: "Reporte de Saldos de Payouts"
date: 2023-06-30T08:16:09-05:00
type: docs
Description: >
  Los saldos de Payouts muestran un reporte de cuánto dinero tiene para procesar transacciones. Para conocer los términos introductorios de esta funcionalidad, consulte [Saldos de Payout]({{< ref "Payout-Balances.md" >}}).
weight: 30
---

Para navegar al Reporte de Payouts, abra su consola de Comercios y seleccione ***Payout***, luego ***Saldos de Payouts***.

![PrintScreen](/assets/Payouts/Payouts9_es.png)

Dispone de dos secciones en esta pantalla; la primera sección muestra los tipos de saldos. Para más información, consulte [Saldos de Payouts]({{< ref Payout-Balances.md>}}#balance-types).

Como se menciona en la sección [Conceptos]({{< ref  Payout-Concepts.md >}}#payout-models), cada cuenta representa una moneda específica para realizar los pagos. Por lo tanto, debe elegir la cuenta seleccionando la moneda en la lista desplegable de la esquina superior derecha.

![PrintScreen](/assets/Payouts/Payouts22_es.png)

{{% alert title="Info" color="info"%}}
El filtro _**Moneda**_ sólo está disponible cuando tiene varias cuentas.
{{% /alert %}}

A continuación, podrá ver el saldo de la moneda seleccionada.

![PrintScreen](/assets/Payouts/Payouts10_es.png)

{{% alert title="Importante" color="warning"%}}
El saldo de cada moneda es independiente. Al seleccionar una moneda, el saldo mostrado no es la cantidad exacta convertida a la misma. Por ejemplo, en su cuenta en _**UYU**_, el saldo podría ser _UYU 500_, mientras que la cuenta en _**USD**_ podría mostrar _USD 1000_.
{{% /alert %}}

La segunda sección muestra los movimientos de su saldo. Por defecto, cuando no ha seleccionado la moneda, la lista muestra todos los movimientos de todas las cuentas (monedas).

La lista muestra las siguientes columnas:

| Columna | Descripción |
|---|---|
| **Payout ID** | Número único generado por Bamboo para identificar el Payout. |
| **Fecha** |Fecha en la que el sistema creó el movimiento del Payout. |
| **Tipo** | Tipo de movimiento aplicado en el payout. |
| **Importe Origen** | Monto del movimiento.<br>El reporte muestra los movimientos crédito (como retiros, tasas, etc.) en rojo y los movimientos débito (como los depósitos) en verde. |
| **Saldo Total** | Saldo resultado luego de que se aplica el movimiento. |

Puede incluir filtros haciendo clic en el botón _**Filtros**_, donde podrá filtrar por el identificador del Payour, por monto o por tipo de movimiento.