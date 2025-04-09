---
title: "Formulario de Tokenización"
linkTitle: "Formulario de Tokenización"
date: 2024-07-31T09:28:16-05:00
Description: >
  El Formulario de Tokenización captura de forma segura la información de la tarjeta de crédito o débito del cliente y convierte los datos sensibles en un token. Este token puede utilizarse para procesar transacciones sin almacenar la información de la tarjeta directamente en los sistemas del comercio.
weight: 50
notopicssection: true
---

El formulario de tokenización es una herramienta útíl cuando es necesario capturar de forma segura la información de tarjeta de los compradores para procesar el pago. En lugar de almacenar directamente los datos de la tarjeta, **este formulario genera un token** que puede enviarse al servidor del comercio para completar el proceso de compra.

{{% alert title="Versiones Anteriores" color="info"%}}
En caso de requerir documentación técnica de las versiones anteriores del formulario de captura, consulte nuestra [sección Legacy]({{< ref Checkout-Form.md >}})
{{% /alert %}}

## Importando el JavaScript {#importing-the-javascript-library}

Para integrar el Formulario de Tokenización, es necesario incluir un script que apunte a la URL del formulario. Esto permite acceder al objeto **BambooForm** que contiene los métodos necesarios para renderizar los formularios de Bamboo.

```javascript
//STAGE - Ambiente de Pruebas:
<script src="https://capture.stage.bamboopayment.com/"
		integrity="sha256-MZTrPbIEEQfZsVKZ0X2W0WKWynw90m2ZnLsf+K4d4f8= sha384-lR7NrY3+mgbapfzO93PhsFYrm2qY2U9qDGSb5pvZnrrQ+UgcwIuX3AQPAt0GXhn/ sha512-dFeUYkspbL2fl9a7cKzz0GJK/inIXIxd687/jHFMVEIv+/QV9FfnWK+CqkS9Lyq2iucNRvAz11kxkhlr7x9OMg=="
		crossorigin="anonymous">
	</script>
```

```javascript
//PRODUCCIÓN:
<script src="https://capture.bamboopayment.com/"
		integrity="sha256-VjLXumZeKViFVhMpiaW5IUQZ213LOzPRw5DTde6AiVU= sha384-GRjWfO5d//CNj5CCFEo3xVfWn/rmZLZOvFkkdXsHE/PsECHSRWXDqjfJ930Bq4bM sha512-guivUBLq1cpFO5KnYnwIvM6UYAF6yA2rjLT0rBgniE+XZdgjN1//abizyKbyJ2y9j8MKmSJbKhLD3gmJVMh5ug=="
		crossorigin="anonymous"> 
	</script>
```

### Método **renderTokenizationForm** {#rendertokenizationform-method}

Una vez importado el Script que apunta a los formularios de Bamboo, se puede invocar el método **renderTokenizationForm** que renderiza el **Formulario de Tokenización**, permitiendo a los compradores ingresar sus tarjetas de manera segura.

```javascript
BambooForm.renderTokenizationForm(configuration);
```

<br/>
<div style="text-align: center"><img src="/assets/Tokenization_Form.png" alt="Formulario de Tokenización" width="300"/></div>

### Ejemplo de Solicitud {#request-example}

```javascript
<script> 
BambooForm.renderTokenizationForm({
  containerId: 'MERCHANT_PAGE_CONTAINER_ID',
  metadata: {
    publicKey: 'MERCHANT_PUBLIC_KEY',
    targetCountryISO: 'UY',
    customer: {
      email: 'cliente@example.com',
      cardHolderName: 'Juan Pérez'
    },
    locale: 'es',
    logoUrl: '<https://mieshop.com/logo.png>'
  },
  hooks: {
    onOperationSuccess: (token) => {
      console.log('Token recibido:', token);
    },
    onOperationError: (error) => {
      console.error('Error:', error);
    }
  }
});
</script>
```

### Parámetros de Configuración {#configuration-parameters}

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:-------------:|-------------|
| `containerId` | `string` | Sí | ID del contenedor HTML donde se mostrará el formulario. |
| `metadata` | `object` | Sí | Configura información relacionada con el cliente y la transacción. |
| `hooks` | `object` | Sí | Funciones de callback para manejar los eventos del formulario. |

### Personalice su Formulario de Tokenización | objeto metadata {#customize-your-tokenization-form--metadata-object}

Puede personalizar el formulario de tokenización con su logo e idioma preferido, además de pre-llenar datos ya proporcionados por el comprador, o restringir la tokenización a tarjetas específicas.

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:-------------:|-------------|
| `metadata` → `publicKey` | `string` | Sí | Clave pública del comercio. |
| `metadata` → `targetCountryISO` | `string` | Sí | Código ISO del país donde se procesará la transacción. |
| `metadata` → `customer` | `object` | No | Información del cliente. |
| `metadata` → `locale` | `string` | No | Idioma del formulario, usando código ISO Español: 'es' (por defecto) Inglés: 'en' |
| `metadata` → `logoUrl` | `string` | No | URL del logo que aparecerá en el formulario. Si no se define, se muestra sin logo en el encabezado |
| `metadata` → `filters` | `object` | No | Permite restringir la tarjeta ingresada por el usuario a un banco emisor o tipo de tarjeta específico |

#### Información del Cliente

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:-------------:|-------------|
| `metadata` → `customer` → `uniqueId` | `string` | No | Identificador único del cliente. Indica si se genera un Token de uso único o recurrente [Tipos de Token](https://docs.bamboopayment.com/en/docs/purchase-workflow/customer-types/anonymous-users.html) |
| `metadata` → `customer` → `email` | `string` | No | Correo electrónico del cliente. Se precarga en el formulario y permite edición si hay errores de sintaxis que impidan generar el token |
| `metadata` → `customer` → `cardHolderName` | `string` | No | Nombre del titular de la tarjeta. Se precarga en el formulario sin opción de edición. |

#### Tokenización restringida a Tarjetas específicas

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:-------------:|-------------|
| `metadata` → `filters` → `paymentMediaType` | `number` | No | Identificador del tipo de medio de pago (tarjeta de crédito, débito, etc.). ([Ver medios de pago](https://docs.bamboopayment.com/en/docs/payment-methods.html#payment-method-types)) |
| `metadata` → `filters` → `issuerBank` | `number` | No | Identificador del banco emisor. ([Ver bancos](https://docs.bamboopayment.com/en/docs/payment-methods/uruguay.html#issuer-banks-table)) |

### Gestione la interacción de su cliente | objeto hooks

| Parámetro | Tipo | ¿Obligatorio? | Descripción |
|-----------|------|:-------------:|-------------|
| `hooks` → `onOperationSuccess` | `function` | Sí | Callback ejecutado al completar exitosamente la tokenización. Recibe el token como parámetro. |
| `hooks` → `onOperationFinalize` | `function` | No | Callback opcional ejecutado cuando se finaliza la operación. |
| `hooks` → `onOperationError` | `function` | No | Callback de manejo de errores durante la tokenización. |
| `hooks` → `onApplicationLoaded` | `function` | No | Callback ejecutado cuando el formulario ha sido cargado correctamente. |

<br/>
<div style="text-align: center"><img src="/assets/Tokenization_Form_Details_ES.png" alt="Detalles del Formulario de Tokenización" width="500"/></div>

## Tokenización exitosa | objeto Token {#successful-tokenization--token-object}

El objeto **token** se devuelve en el hook **onOperationSuccess** ejecutado al completar exitosamente la tokenización y contiene los siguientes parámetros.

| Propiedad | Tipo | Descripción |
|-----------|:----:|-------------|
| `TokenId` | `string` | Identificador del token. |
| `Created` | `timestamp` | Fecha y hora de creación del token. |
| `Type` | `string` | Tipo de token, valores posibles: `OneTime`, `Commerce` |
| `Brand` | `string` | Franquicia de la tarjeta o medio de pago utilizado. |
| `IssuerBank` | `string` | Banco emisor de la tarjeta. |
| `Owner` | `string` | Nombre del titular de la tarjeta. |
| `Bin` | `numeric[6]` | Identificador de la tarjeta. |
| `Last4` | `numeric[4]` | Últimos cuatro dígitos de la tarjeta. |
| `CardType` | `string` | Tipo de medio de pago o tarjeta, valores posibles: `CreditCard`, `DebitCard`, `PhysicalNetwork`, `PrePaid` |
| `CardExpMonth` | `numeric[2]` | Mes de vencimiento de la tarjeta. |
| `CardExpYear` | `numeric[2]` | Año de vencimiento de la tarjeta. |


## Formulario CVV

El **Formulario CVV** está diseñado específicamente para capturar el **código de verificación de la tarjeta (CVV)**, que se encuentra en el reverso de la tarjeta física. Este formulario se utiliza cuando se requiere validar una transacción con el CVV, generalmente en pagos recurrentes o en compras en las que la información de la tarjeta ya ha sido previamente tokenizada.
Uso típico: Cuando un cliente ha almacenado previamente su tarjeta de crédito a través del proceso de tokenización, pero se le solicita que ingrese su CVV para validar o completar una transacción, proporcionando una capa adicional de seguridad.

## Método renderCVVForm

Una vez importado el Script que apunta a los formularios de Bamboo, tendrás acceso al método **renderCVVForm** que renderiza un formulario dedicado exclusivamente a la captura del CVV del cliente.

```javascript
BambooForm.renderCVVForm(url, configurationCVV);
```
<br/>
<div style="text-align: center"><img src="/assets/Formulario_cvv.png" alt="Formulario de CVV" width="300"/></div>

### Parámetros de configuración

| Parámetro               | Tipo       | ¿Obligatorio? | Descripción                                                                                                                     |
|-------------------------|------------|:-------------:|---------------------------------------------------------------------------------------------------------------------------------|
| `url`                   | `string`   | Sí            | La URL con los datos de la sesión y la información del perfil de pago del cliente. Incluye `key`, `session_id`, `paymentProfileId`, `brand`, y los últimos cuatro dígitos de la tarjeta. Esta URL se recibe como respuesta al querer ejecutar una compra si se le solicita verificación por CVV. |
| `containerId`           | `string`   | Sí            | ID del contenedor HTML donde se mostrará el formulario.                                                                         |
| `metadata`              | `object`   | Sí            | Configura la información relacionada con la sesión y la transacción.                                                            |
| `logoUrl`               | `string`   | No            | URL del logo que aparecerá en el formulario.                                                                                    |
| `locale`                | `string`   | No            | Idioma del formulario, usando un código de locales ISO.                                                                         |
| `hooks`                 | `object`   | Sí            | Funciones de callback para manejar eventos del formulario.                                                                      |
| `hooks` → `onOperationSuccess`    | `function` | Sí            | Callback ejecutado al completar exitosamente la validación del CVV. Recibe el token como parámetro.                             |
| `hooks` → `onOperationFinalize`   | `function` | No            | Callback opcional ejecutado cuando se finaliza la operación.                                                                    |
| `hooks` → `onOperationError`      | `function` | No            | Callback opcional que maneja errores durante la validación del CVV.                                                             |
| `hooks` → `onApplicationLoaded`   | `function` | No            | Callback ejecutado cuando el formulario ha sido cargado correctamente.                                                          |

### Ejemplo de uso
```javascript
<script>
BambooForm.renderCVVForm(
  '<https://api.stage.bamboopayment.com/v1/Capture/?key=FEdJ84hzdIKBY0gyC7-NDG_I56ONV7HQ&session_id=CA_51864eaf-1603-4fe8-8720-ae8c569ea702&paymentProfileId=375108&brand=MasterCard&lastFour=4008>',
  {
    metadata: {
      locale: 'es',
      logoUrl: '<http://www.example.com/>'
    },
    hooks: {
       onOperationSuccess: () => {
        console.log('Operation successful');
      },
      onOperationError: (error) => {
        console.error('Error in CVV validation:', error);
      }
    }
  }
);
</script>
```