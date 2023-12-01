---
title: "Estados de los Payouts"
linkTitle: "Estados de los Payouts"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  Desde que solicita un Payout hasta que el beneficiario recibe el dinero, el Payout sigue un conjunto de estados. En esta sección, damos una explicación breve de los mismos.
weight: 20
---

El siguiente diagrama representa los estados de un Payout:

![](/assets/Payouts/Payouts2_es.png)

* **Recibido**: Este es el estado inicial. Una vez solicite un Payout, validamos su estructura (para Payouts solicitado a través del API) y lo creamos en nuestro sistema. Para más información sobre la estrucutra, consulte la [API de Payouts](../payouts-api.html).<br>Adicionalmente, validamos que su cuenta tenga el suficiente salfo antes de pasar al siguiente estado; en caso contrario, la solicitud será declinada.

* **Validado**: Este estado indica que el Payout tiene una estructura válida y que su cuenta tiene fondos suficientes para cubrir el monto y la tasa (en caso de que usted la asuma). En este estado, definimos si el Payout necesita una revisión manual bajo dos criterios: primero, el límite de pagos recibidos por el beneficiario y segundo, el proceso de [sanction screening](../overview/payout-concepts.html#sanction-screening).

* **Held**: Este estado indica que el Payout está en revisiñon manual de nuestro lado debido a las validaciones realizadas en el paso anterior. <!--El ETC de este estado es de XX días hábiles.-->

* **Pendiente**: Este estado indica que el Payout y el pagador ha complido todas las validaciones requeridas y está por ser enviado a la _Conexión bancaria_.

* **Procesándose**: La _Conexión bancaria_ ha recibido el Payout; el tiempo antes de pasar al estado ***Pagado*** depende del país y el método de pago seleccionado.

* **Pagado**: La _Conexión bancaria_ ha procesado el Payout y fue aprobado. En este estado, actualizamos su [saldo]({{< ref "Payout-Balances.md" >}}) con los valores de la transacción.

* **Rechazado**: La _Conexión bancaria_ ha procesado el Payout y no fue aprobado. En este estado, actualizamos su [saldo]({{< ref "Payout-Balances.md" >}}) con los valores de la transacción.

* **Declinado**: El payout fue rechazado debido a una validación de estructura o debido a razones internas.

 