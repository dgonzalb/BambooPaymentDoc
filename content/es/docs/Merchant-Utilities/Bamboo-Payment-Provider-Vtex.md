---
title: "Guía de Instalación Payment Provider de Bamboo en VTEX"
linkTitle: "Guía de Instalación Payment Provider de Bamboo en VTEX"
date: 2023-03-02T11:40:29-05:00
Description: >
  Esta guía proporciona todos los pasos necesarios para integrar nuestra solución de pago en su plataforma de comercio electrónico VTEX. Hemos diseñado el proveedor de pagos de Bamboo para que sea fácil de instalar y configurar, a fin de ayudarle a optimizar su proceso de pago y mejorar la experiencia de sus clientes.
weight: 20
---

{{% alert title="Importante" color="info"%}}
* El proveedor de pagos Bamboo sólo está disponible para Uruguay.
* A lo largo de esta guía, nos referiremos a su sitio VTEX como `{su-sitio}`.
{{% /alert %}}

## Prerrequisitos {#prerequisites}
Tenga en cuenta los siguientes prerrequisitos antes de continuar.

### Registre su comercio en VTEX {#register-your-commerce-in-vtex}
Acceda al [sitio VTEX](https://vtex.com/) para registrar su eCommerce. Una vez registrado, necesitará un usuario administrador para todo el proceso de integración con Bamboo Payment Systems.

### Genere Clave y Token para VTEX {#generate-key-and-token-for-vtex}
Abra su consola de comerciante (Producción o Stage) y despliegue la sección ***Configuración*** en el menú de la izquierda.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_01.png)

Esta ventana muestra los ajustes de configuración de su cuenta. Vaya a la pestaña ***VTEX***.<br>En la sección **App Key-Token Bamboo** de la configuración de VTEX, haga clic en el botón _**Generar nuevas claves**_ para crear las nuevas credenciales.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_02.png)

Guarde ambas llaves, la `Bamboo app key` y el `Bamboo app token`, ya que las necesitará más adelante.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_03.png)

### Habilite el ambiente Sandbox {#enable-sandbox-environment}
Para habilitar las pruebas en el ambiente Sandbox, debe utilizar el workspace _testing_ y solicitar acceso a la consola de comercio en el ambiente de stage. Complete este paso antes de pasar al ambiente de producción.

Para crear este espacio de trabajo, descargue e instale `nodejs` desde la [página oficial de node](https://nodejs.org/en/download).

A continuación, ejecute el siguiente comando en su símbolo del sistema.

```cmd
npx vtex use testing
```

{{% alert title="Advertencia" color="warning"%}}
No utilice esta configuración en el ambiente de producción; utilice siempre el workspace _master_.
{{% /alert %}}

## Instalar y configurar el Payment Provider de Bamboo en VTEX {#install-and-configure-the-bamboo-payment-provider-on-vtex}
Abra la _VTEX App Store_ utilizando la URL: `https://{su-sitio}.myvtex.com/admin/store/`.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_04.png)

A continuación, busque _Payment Provider Bamboo_. Si no encuentra el componente, utilice la siguiente URL: `https://{su-sitio}.myvtex.com/admin/apps/bamboopayments.payment@1.3.4/setup/`

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_05.png)

Una vez instalado el componente, configure los medios de pago para su uso. Agregue a Bamboo como procesador de pagos, tal y como se menciona en la sección [Configurar el proveedor de pagos Bamboo](#configure-bamboo-payment-provider).

## Configurar el proveedor de pagos de Bamboo {#configure-bamboo-payment-provider}
Para configurar el proveedor de pagos, haga clic en la opción _**Store Settings**_ del panel izquierdo. A continuación, seleccione la opción _**Settings**_ del grupo  _**Payment**_.

Se abrirá la ventana _Payment settings_. Vaya a la pestaña _**Gateway Affiliations**_ . También puede utilizar la siguiente URL: `https://{su-sitio}.myvtex.com/admin/pci-gateway/#/affiliations`.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_06.png)

Haga clic en el icono más de la esquina superior derecha para añadir el conector y, a continuación, busque el conector Bamboo en la sección _**OTHER**_.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_07.png)

Ingrese la siguiente información para la Bamboo Gateway Affiliation:

* **Affiliation name**: VTEX asigna un nombre por defecto. No obstante, puede establecer uno de su elección.
* **Test or Live toggle**: seleccione el modo de la Gateway Affiliation. Antes de utilizar la Gateway Affiliation en transacciones reales, pruébela primero en el modo _Test_.
* **Application Key**: utilice el campo _**Bamboo app key**_ [generado anteriormente](#generate-key-and-token-for-vtex).
* **Application Token**: utilice el campo _**Bamboo app token**_ [generado anteriormente](#generate-key-and-token-for-vtex).

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_08.png)

Haga clic en _**Guardar**_ cuando haya terminado.

## Configurar los medios de pago {#configure-the-payment-methods}
Después de configurar la Bamboo Gateway Affiliation, debe configurar los medios de pago. Se pueden configurar los métodos de pago predefinidos por VTEX o los métodos de pago personalizados.

### Configurar medios de pago predefinidos {#configure-predefined-payment-methods}
Se pueden configurar los preexistentes en VTEX (Visa, Mastercard, Cabal, etc.) dentro de los métodos de pago. Siga el procedimiento para añadir un método de pago.

Vaya a la opción _**Store Settings**_ del panel izquierdo. A continuación, seleccione la opción _**Settings**_ del grupo _**Payment**_.

Se abre la ventana _Payment settings_. Vaya a la pestaña _**Payment conditions**_.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_09.png)

Haga clic en el icono más de la esquina superior derecha para añadir una nueva condición de pago y, a continuación, busque el medio de pago que desea incluir.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_10.png)

Ingrese la siguiente información para la condición de pago:

* **Condition name**: proporcione un nombre significativo para la condición en el campo situado junto al nombre del método de pago.
* **Status**: defina si la condición está habilitada.
* **Process with affiliation**: seleccione la Bamboo Gateway Affiliation creada en el paso anterior.
* **Payment conditions**: en el panel de la derecha, incluya las condiciones del medio de pago, como las cuotas y otros factores relevantes.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_11.png)

Haga clic en _**Guardar**_ cuando haya terminado.

### Configurar medios de pago personalizados {#configure-custom-payment-methods}
Dentro de los medios de pago personalizados, puede configurar los métodos de pago listos para usar de VTEX y configurar las siguientes tarjetas.

<div id="cards" style="padding: 10px;text-align: center;">

<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Oca_CreditCard.png" style="max-width: 40%"/>
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Creditel_CreditCard.png" style="max-width: 40%" />
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/CreditosDirectos_CreditCard.png" style="max-width: 40%" />
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Lider_CreditCard.png" style="max-width: 40%" />
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Passcard_CreditCard.png" style="max-width: 40%" />
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/ClubDelEste_CreditCard.png" style="max-width: 40%" />
<img src="https://s3.amazonaws.com/gateway.prod.bamboopayment.com/payment-method-logos/Anda_CreditCard.png" style="max-width: 40%" />

</div><br>

Vaya a la opción _**Store Settings**_ del panel izquierdo. A continuación, seleccione la opción _**Settings**_ del grupo _**Payment**_.

Se abre la ventana _Payment settings_. Vaya a la pestaña _**Custom Payments**_.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_12.png)

Puede añadir tarjetas _**de marca compartida**_ o _**de marca propia**_ utilizando la sección correspondiente. Para ello, haga clic en una de las casillas vacías con la inscripción _**Config**_. En el formulario que se muestra, ingrese la siguiente información en función de los bines y marcas de las tarjetas.

* OCA: `589892,542991`
* Creditel: `601933,608700`
* Creditos Directos: `601828`
* Lider: `501109,501088,505863,505864,505865,505866,505867,505868,505869,505870,505871,505872`
* PassCard: `628026`
* Club del Este: `504736`
* Anda: `603199`

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_13.png)

{{% alert title="Información" color="info"%}}
Para los campos _**Description**_ y _**Acquirer payment code**_, utilice el mismo valor que en el campo _**Name**_.
{{% /alert %}}

## Checkout
Para esta integración, el Checkout y la captura de la tarjeta son realizados por VTEX realizando un débito directo. Puede configurar cualquier método de pago tipo tarjeta que se muestra [aquí](/docs/payment-methods/uruguay.html#payment-methods).

### Tarjetas con preautorización {#cards-with-pre-authorization}
Por defecto, VTEX reserva el monto de la compra en la tarjeta del cliente (pre-autorización). Al generar la factura, se confirma el monto a debitar, pero no puede ser mayor al monto reservado inicialmente. Si el cliente anula la compra antes de la generación de la factura, VTEX también anula el monto reservado.

### Tarjetas sin preautorización {#cards-without-pre-authorization}
VTEX realiza un débito directo a estas tarjetas, y en la generación de la factura, el monto debe ser el mismo que el monto original de la compra. Este tipo de transacción no permite modificar el monto de la compra desde el panel de administración de VTEX. Sólo puede solicitar reembolsos completos si el método de pago lo soporta, y si desea solicitar un reembolso parcial, debe solicitarlo desde la consola de comercio de Bamboo.

## Habilitar pre-autorizaciones {#enable-pre-authorizations}
Abra su consola de comercio (Producción o Stage) y expanda la sección ***Configuración*** en el menú de la izquierda.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_01.png)

Esta ventana muestra los ajustes de configuración de su cuenta. Vaya a la pestaña ***VTEX***. En la sección **Preautorización** de los ajustes de VTEX, puede activar las preautorizaciones e indicar el porcentaje de reserva que desea configurar en cada transacción utilizando los campos correspondientes.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_14.png)

* **Pre-autorización habilitada**: cuando se selecciona esta opción, se indica que todas las compras realizadas utilizando un método de pago que admita la preautorización permanecen preautorizadas hasta que se completa la factura de compra en VTEX y, si el resultado es satisfactorio, se aprueba en Bamboo.

* **Porcentaje de reserva sobre la compra**: este valor es opcional y sólo tiene efecto cuando has habilitado la Preautorización. Si ingresa un valor en este campo, VTEX sumará el porcentaje al monto de compra preautorizado. Por ejemplo, si el monto de la compra es USD 100 y el porcentaje es 10%, el sistema preautorizará la compra por un valor de USD 110.00.

{{% alert title="Importante" color="info"%}}
El porcentaje de la reserva sólo se aplica en Bamboo. En VTEX, siempre verá el monto original de la compra. Puede aumentar este monto más adelante si es necesario. Por ejemplo, el precio final podría superar la estimación inicial en el caso de artículos pesables.
{{% /alert %}}

## Cambio de monto y anulación de compra {#amount-changing-and-purchase-cancellation}
VTEX permite, en su flujo de compra, cancelar o modificar el monto original, ya sea incrementándolo o realizando un reembolso parcial.

Las acciones de anulación y reembolso parcial estarán limitadas respecto a las diferentes funcionalidades soportadas para cada medio de pago.

Para solicitar un aumento del monto o un reembolso total/parcial, diríjase al detalle del pedido desde la consola VTEX. Despliegue la sección _**Orders**_ y haga clic en la opción _**All Orders**_ option. Alternativamente, puede utilizar la URL `https://{su-sitio}.myvtex.com/admin/checkout/#/orders`.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_15.png)

### Aumentar el monto de la compra {#increase-purchase-amount}
Esta opción sólo está disponible para compras preautorizadas. Desde los detalles de un pedido, debe llevarlo al paso _**Ready for handling**_.

![PrintScreen](/assets/PaymentProvider/PaymentProvider_en_16.png)

Una vez que la orden se encuentra en este paso, VTEX habilita la opción _**Change value**_, donde podrá ingresar el monto a incrementar. Antes de confirmar la acción, asegúrese de que se encuentra en la opción de incremento.