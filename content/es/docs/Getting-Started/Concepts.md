---
title: "Conceptos"
linkTitle: "Conceptos"
date: 2023-03-02T11:40:29-05:00
Description: >
  Entienda los conceptos detrás de cualquier integración con Bamboo Payment.
weight: 10
---

## Adquirente {#acquirer}
Un adquirente es un facilitador de pagos que le permite realizar pagos electrónicos. Además, el adquirente es responsable de las transacciones y maneja la liquidación a su cuenta bancaria.

## API
Una API (del acrónimo en inglés **A**pplication **P**rogramming **I**nterface, Interfaz de programación de aplicaciones) es un conjunto de métodos y definiciones que permite interactuar con un sistema a través de unos datos de entrada. En nuestro caso, desarrollamos una API para permitirle procesar la información de una transacción para recibir la respuesta relacionada.

{{% alert title="Info" color="info"%}}
Implementamos la API de Bamboo Payment utilizando servicios REST y formato JSON (Content-Type: `application/json`) para el intercambio de mensajes. 

Debe realizar cada llamada a la API utilizando `HTTPS` (`TLS 1.3`) y manejar el código de respuesta HTTP de cada operación para determinar el estado de procesamiento de la transacción enviada.
{{% /alert %}}

## Ambiente {#environment}
El ambiente es un conjunto de software y recursos que le permite procesar las transacciones. El ambiente contiene información real o de prueba dependiendo de su tipo.

Nuestra plataforma tiene dos ambientes separados: `Stage` y `Production`.

### Stage
Este ambiente le permite realizar transacciones de prueba. Aquí, las transacciones nunca llegan a los sistemas reales de los proveedores de medios de pago. Es una forma segura de probar tareas y flujos.

* URL base: `https://api.stage.bamboopayment.com`.

### Production
Este ambiente le permite realizar transacciones **reales**, las cuales son procesadas por los sistemas de medios de pago reales. Antes de empezar a procesar transacciones en este ambiente, recomendamos probar en `Stage`.

* URL base: `https://api.bamboopayment.com`.

{{% alert title="Nota" color="info"%}}
Nuestra documentación usa `{environment_api}` para referirse a las URLs donde están expuestos los servicios. Debe sustituir la URL correspondiente en su ambiente operativo.
{{% /alert %}}

## Autenticación {#authentication}
La autenticación es el procedimiento para validar la identidad de un comercio. Todos los comercios integrados con nuestra plataforma reciben llaves por cada cuenta asociada: la _Private Account Key_ y la _Public Account Key_.

Cada una de estas llaves identifica la cuenta de comercio en nuestro sistema en cada transacción realizada para determinar si el comercio está autorizado para operar y sus condiciones de integración (Por ejemplo, qué medios de pago tiene activos).

### Private Account Key
La llave privada del comercio (Private Account Key) es un identificador único adjuntado a cada request privado (server to server) donde están disponibles las operaciones críticas, como iniciar o confirmar una transacción, acceder a la información de las transacciones del comercio, crear o eliminar planes de suscripción, etc.

{{% alert title="Importante" color="warning"%}}
No debe compartir esta _Private Account Key_ o exponerla públicamente en ningún momento para evitar comprometer la seguridad de la integración. **Es su responsabilidad mantenerla segura**.
{{% /alert %}}

### Public Account Key
La llave  pública de comercio (Public Account key) es un identificador único que debe adjuntarse a cada request público (lanzado desde una interfaz web) para operaciones de consulta o solicitud de captura de datos.

Además, puede utilizarse para invocar la librería JavaScript `PWCheckout`.

## Checkout
El checkout es el formulario donde sus clientes seleccionan el medio de pago que quieren utilizar para completar el pago. De acuerdo con el método seleccionado, este formulario le permite capturar su información y enviarla para procesar la transacción.

## CVV
CVV significa _**C**ard **V**erification **V**alue_ (Código Valor de Validación o Verificación). Es un código de seguridad de tres o cuatro dígitos de las tarjetas crédito o débito. El CVV es una medida de seguridad adicional para verificar que la persona que está haciendo la transacción en línea tiene la posesión física de la tarjeta.

## Formulario
Un _Formulario_ es un componente web que le permite adjuntar un conjunto de campos para tokenizar una tarjeta o realizar compras con un medio de pago. Para más información, consulte [Formularios](../forms.html).

## Identificador Único (UniqueID) {#UniqueID}
El Identificador Único le permite evitar transacciones duplicadas, como las operaciones de compra, cuando se produce un fallo al obtener la respuesta de Bamboo y se vuelve a intentar el request.

El objetivo del Identificador Único es identificar la transacción, y en caso de que se produzca un fallo en la conexión y la transacción sea aprobada en nuestro sistema, nuestra API responde con el resultado de la compra procesada anteriormente, evitando la creación de una nueva.

El parámetro `UniqueID` no es obligatorio; no obstante, se recomienda incluirlo en cada request. Puede definir cualquier valor alfanumérico siempre que no lo utilice en otras transacciones.

Ejemplo:

```json
{
  "TrxToken": "OT__-3aFeJUpsjDWsYl26yvnj8k0SW703Cut4jiYpVJ8SzQ_",
  "Order": "12345678",
  "Amount": "10000",
  "Installments": 1,
  "Customer": {
    ...
  },
  "UniqueID": "6908304133336033404953",
  "Currency": "UYU",
  "Capture": false
}
```

## Modelo Gateway {#gateway-model}
En el _Modelo Gateway_, el adquirente o medio de pago paga directamente a las cuentas del comercio. En este modelo, el comercio y el adquirente (o medio de pago) implementan su proceso de liquidación.

## Modelo Payfac {#payfac-model}
Se refiere al modelo de _Facilitador de Pagos_, en el cual, el comercio es un subcomercio de Bamboo con el que firma un acuerdo comercial. Para la liquidación, el adquirente o el medio de pago paga a Bamboo y Bamboo le paga al comercio.

## Servicio de FX {#fx-service}
El cambio de divisas, a menudo abreviado como _FX_ (Foreign Exchange), representa el tipo de cambio vigente para convertir la moneda de un país en otra. Nuestra plataforma actualiza periódicamente este tipo de cambio según la normativa del país de destino.

## Tenant
Un _Tenant_ se refiere al canal de procesamiento de Bamboo, el cual puede ser Crossborder (opera en múltiples países y usa la tasa de conversión) o local.

## Tokenización {#tokenization}
En cuanto a la seguridad de los datos, la tokenización consiste en sustituir un elemento sensible por su homólogo no sensible. Este elemento no sensible, el token, se produce mediante la tokenización. Este token no tiene ningún valor inherente y carece de significado excepto para la entidad responsable de su creación. En el caso de una brecha de seguridad que conduzca al robo de estos números, no tienen ninguna utilidad para la parte no autorizada, ya que no pueden ser explotados para sus fines.

Dado que el _token_ es una referencia o identificador que el sistema asigna a una tarjeta almacenada, es único para cada par de "comercio/token"; cuando un cliente registra su tarjeta en dos comercios diferentes, cada comercio recibirá un _token_ adicional. Esto hace imposible que un comercio utilice los _tokens_ de un cliente para otro fin.