---
title: "SPEI"
linkTitle: "SPEI"
date: 2023-05-08T07:28:16-05:00
description: >
  Aprenda cómo integrar su solución para procesar pagos con SPEI.
weight: 20
tags: ["subtopic"]
---

{{% alert title="Info" color="info"%}}
El estado de la compra para pagos con SPEI permanecerá en _Pending_ hasta que el cliente complete el pago a través de banca en línea o aplicación de banca móvil.
{{% /alert %}}


## Transferencia Bancaria (SPEI) {#bank-transfer-spei}
El **SPEI** (Sistema de Pagos Electrónicos Interbancarios) es un sistema de pagos electrónicos en México que permite a sus clientes transferir fondos entre bancos al instante. 

Para utilizar **SPEI**, los clientes deben tener acceso a la banca en línea o a una aplicación de banca móvil ofrecida por su banco y luego iniciar una transferencia proporcionando el número CLABE (Clave Bancaria Estandarizada) retornado en el response.

### Parámetros del Request {#request-parameters-2}
Es necesario incluir campos específicos para que este método de pago funcione correctamente. Consulte el artículo [operación de compra]({{< ref Purchase_V3.md >}}#request-parameters) para obtener información detallada sobre la autenticación, los idiomas de la respuesta y los parámetros de compra básica como el monto y la moneda.

| Propiedad | Tipo | ¿Obligatorio? | Descripción |
|---|:-:|:-:|---|
| `PaymentMethod` | `string` | Sí | Consulta el identificador en la tabla de [Medios de pago](/es/docs/payment-methods/mexico.html#payment-methods).|
| `TargetCountryISO` | `string` | Sí | Indica el país destino. |
| `Customer` → `Email` | `string` | Sí | Correo electrónico del cliente. |
| `Customer` → `FirstName` | `string` | No | Nombre del cliente. |
| `Customer` → `LastName` | `string` | No | Apellido del cliente. |
| `Customer` → `DocumentNumber` | `string` | No | Número de documento del cliente. |
| `Customer` → `PhoneNumber` | `string` | No | Número de teléfono del cliente. |
| `Customer` → `Address` → `Country` | `string` | No | País del cliente. |
| `Customer` → `Address` → `State` | `string` | No | Estado del cliente. |
| `Customer` → `Address` → `City` | `string` | No | Ciudad del cliente. |
| `Customer` → `Address` → `AddressDetail` | `string` | No | Detalle de la dirección del cliente. |
| `Customer` → `Address` → `PostalCode` | `string` | No | Código postal del cliente. |
| `MetaDataIn` → `PaymentExpirationInMinutes` | `numeric` | No | Configure el tiempo de expiración del pago a través de este campo, especificando la duración en minutos. Si no envía este campo, la API asignará un valor por defecto.<br>El tiempo máximo permitido es de **30** días (**43200** minutos). |

#### Ejemplo del Request {#request-example-2}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/request_stp >}}
{{< /highlight >}}

<!--```json
{
    "PaymentMediaId": 73,
    "Order": "ORD1012",
    "Amount": 180,
    "Currency": "USD",
    "Description": "Test Order",
    "MetaDataIn": {
        "PaymentExpirationInMinutes": "1440"
    },
    "TargetCountryISO": "MX",
    "Customer": {
        "FirstName": "John",
        "LastName": "Diaz",
        "Email": "jdiaz@mail.com"
    }
}
```-->

### Parámetros del Response {#response-parameters-2}
En el Response, encontrará los siguientes parámetros. Puede utilizarlos para crear su propia página de confirmación o utilizar el cupón devuelto en la respuesta:

| Propiedad | Tipo | Descripción |
|---|:-:|---|
| `Response` → `MetadataOut` → `Clabe` | `string`  | Corresponde al número _CLABE_ de la cuenta a la que se enviarán los fondos. Este número es dinámico y único por transacción. |
| `Response` → `MetadataOut` → `Expiration` | `date` | Fecha y hora de expiración del pago. |
| `Response` → `MetadataOut` → `Amount` | `numeric` | Cantidad que debe introducir el pagador al efectuar el pago. |
| `Response` → `MetadataOut` → `BankBeneficiaryName` | `string` | Nombre del dueño de la cuenta del número _CLABE_ |
| `Response` → `MetadataOut` → `BankConcept` | `string` | ID del dueño de la cuenta del número _CLABE_ |
| `Response` → `MetadataOut` → `BankReference` | `string` | ID del dueño de la cuenta del número _CLABE_ |
| `Response` → `MetadataOut` → `PaymentCouponUrl` | `string` | URL del cupon de pago. |


{{% alert title="Nota" color="info"%}}
El número _CLABE_ en el Response pertenece a _Bamboo Payment Systems_, su cliente debe configurar una transferencia electrónica a este número desde su aplicación bancaria.
{{% /alert %}}

#### Ejemplo del Response {#response-example-2}
{{< highlight json >}}
{{< Payins/V3/PaymentMethods/Mexico/response_stp >}}
{{< /highlight >}}

<!--```json
{
    "Response": {
        "PurchaseId": 148817,
        "Created": "2023-10-31T12:23:00.494",
        "TrxToken": null,
        "Order": "ORD1012",
        "Transaction": {
            "TransactionID": 159700,
            "Created": "2023-10-31T12:23:00.493",
            "AuthorizationDate": "",
            "TransactionStatusId": 2,
            "Status": "Pending",
            "ErrorCode": null,
            "Description": "",
            "ApprovalCode": null,
            "Steps": [
                {
                    "Step": "Generic External",
                    "Created": "2023-10-31T12:23:29.923",
                    "Status": null,
                    "ResponseCode": "",
                    "ResponseMessage": "",
                    "Error": null,
                    "AuthorizationCode": "",
                    "UniqueID": null,
                    "AcquirerResponseDetail": ""
                }
            ]
        },
        "Capture": true,
        "Amount": 3000,
        "OriginalAmount": 3000,
        "TaxableAmount": null,
        "Tip": 0,
        "Installments": 1,
        "Currency": "MXN",
        "Description": "Test Order",
        "Customer": {
            "CustomerId": 70505,
            "Created": "2023-10-31T12:22:51.353",
            "CommerceCustomerId": null,
            "Owner": "Anonymous",
            "Email": "jdiaz@mail.com",
            "Enabled": true,
            "ShippingAddress": null,
            "BillingAddress": null,
            "Plans": null,
            "AdditionalData": null,
            "PaymentProfiles": [
                {
                    "PaymentProfileId": 72313,
                    "PaymentMediaId": 73,
                    "Created": "2023-10-31T12:22:52.153",
                    "LastUpdate": "2023-10-31T12:22:53.173",
                    "Brand": "STP",
                    "CardOwner": null,
                    "Bin": null,
                    "IssuerBank": null,
                    "Installments": null,
                    "Type": "BankTransfer",
                    "IdCommerceToken": 0,
                    "Token": null,
                    "Expiration": null,
                    "Last4": "",
                    "Enabled": null,
                    "DocumentNumber": null,
                    "DocumentTypeId": null,
                    "ExternalValue": null,
                    "AffinityGroup": null
                }
            ],
            "CaptureURL": null,
            "UniqueID": null,
            "URL": "https://devapi.siemprepago.com/v1/api/Customer/70505",
            "FirstName": "John",
            "LastName": "Diaz",
            "DocNumber": null,
            "DocumentTypeId": null,
            "PhoneNumber": null,
            "ExternalValue": null
        },
        "RefundList": null,
        "PlanID": null,
        "UniqueID": null,
        "AdditionalData": null,
        "CustomerUserAgent": null,
        "CustomerIP": null,
        "URL": "https://devapi.siemprepago.com/v1/api/Purchase/148817",
        "DataUY": {
            "IsFinalConsumer": false,
            "Invoice": null,
            "TaxableAmount": null
        },
        "DataDO": {
            "Invoice": null,
            "Tax": null
        },
        "Acquirer": {
            "AcquirerID": 105,
            "Name": "STP",
            "CommerceNumber": null
        },
        "CommerceAction": null,
        "PurchasePaymentProfileId": 72313,
        "LoyaltyPlan": null,
        "DeviceFingerprintId": null,
        "MetadataIn": {
            "PaymentExpirationInMinutes": "1440"
        },
        "MetadataOut": {
            "Clabe": "646180366600000240",
            "Expiration": "11/03/2023 13:43:00",
            "Amount": "30",
            "BankBeneficiaryName": "Bamboo Payment Mexico SRL DE CV",
            "BankName": "STP",
            "BankConcept": "11285028",
            "BankReference": "11285028",
            "PaymentCouponUrl": "https://s3.amazonaws.com/gateway.prod.bamboopayment.com/purchase-coupons/11285028_0d941f46-1788-413b-b80b-ae269333e1c0_20240613.html"
        },
        "CrossBorderData": null,
        "CrossBorderDataResponse": {
            "TargetCountryISO": "MX",
            "TargetCurrencyISO": "USD",
            "TargetAmount": 1.8
        },
        "Redirection": null,
        "AntifraudData": {
            "AntifraudFingerprintId": null,
            "AntifraudMetadataIn": null
        },
        "PaymentMediaId": null,
        "TargetCountryISO": null,
        "PurchaseType": 1,
        "IsFirstRecurrentPurchase": false
    },
    "Errors": []
}
```-->

### Experiencia de pago para los clientes {#payment-experience-for-customers}
Su cliente debe completar el pago creando una transferencia bancaria al número CLABE retornado en la respuesta. Su cliente debe seguir los siguientes pasos para realizar la transferencia en su app bancaria.

1. **Ingresar a la Plataforma bancaria**<br>
Su cliente debe iniciar sesión en su plataforma de banca en línea para iniciar la transferencia única.

2. **Seleccionar la opción de transferencia**<br>
Su cliente debe navegar hasta la opción para realizar una transferencia o pago. Las plataformas bancarias suelen denominar esta opción como _**Transferencias**_ o un término similar.

3. **Ingresar los datos del destinatario**<br>
Se debe informar el número de CLABE en la respuesta, y su cliente debe proporcionarlo en los datos del destinatario. Recuerde que su cliente debe ingresar información precisa para evitar cualquier problema con la transferencia.

4. **Especificar monto de la transferencia**<br>
Su cliente debe introducir el monto de la compra. Algunas plataformas pueden pedir el tipo de divisa si su cliente tiene cuentas con varias divisas.

{{% alert title="¡Importante!" color="danger"%}}
La transferencia debe coincidir con el monto de la compra. De lo contrario, Bamboo rechazará la transacción.
{{% /alert %}}

5. **Revisar y confirmar**<br>
Recuérdele a su cliente que revise cuidadosamente toda la información introducida para garantizar su exactitud. Su cliente debe comprobar el número de CLABE y el monto de la transferencia. Además, confirmar que tenga fondos suficientes en su cuenta.

6. **Autorizar la transferencia**<br>
Si es necesario, el sistema puede pedirle a su cliente que autorice la transferencia utilizando una medida de seguridad como contraseña, NIP o autenticación de dos factores.

7. **Confirmación de la Transferencia**<br>
Su cliente recibirá un mensaje de confirmación una vez que la transferencia haya sido aprobada y procesada. Esta confirmación puede incluir un número de referencia de la transacción que pueden utilizar con fines de seguimiento.

Es importante tener en cuenta que los pasos y opciones específicos pueden variar ligeramente según el banco y la plataforma de banca electrónica que utilice su cliente. Consulte siempre las instrucciones del banco del cliente y siga sus protocolos de seguridad para garantizar una transferencia segura y satisfactoria.
