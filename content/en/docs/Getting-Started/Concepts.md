---
title: "Concepts"
linkTitle: "Concepts"
date: 2023-03-02T11:40:29-05:00
Description: >
  Understand the concepts behind any integration with Bamboo Payments.
weight: 10
---
<!--
type: tab
title: Generate the Token
-->
The next payment methods flow is by **Redirection**, therefore the token is generated using the method GetCustomRedirectToken


**Cash payment**

```javascript
<script>
  PWCheckout.GetCustomRedirectToken(110, "john@bamboopayment.com");
</script>
```
**Credit / Debit cards**

```javascript
<script>
  PWCheckout.GetCustomRedirectToken(109, "john@bamboopayment.com");
</script>
```

**PSE**
```javascript
<script>
  PWCheckout.GetCustomRedirectToken(108, "john@bamboopayment.com");
</script>
```

<!--
type: tab
title: Domestic purchase
-->

> The minimun operation amount is COP 10.000 (ten thousand colombian peso)

> The maximun operation amount is COP 5.000.000 (five million colombian peso)

### Required fields

These are the fields that it must receive for its correct operation:

| Property | Description | Presence
| ----- | ----- | -----
| Description <br> <i> string </i> | Description of the purchase | Mandatory.
| Order <br> <i> string </i> | Número de orden | Mandatorio
| Customer.Email <br> <i> string </i> | Email of the customer who makes the purchase | Mandatory (see Note 1)
| Customer.FirstName <br> <i> string </i> | Name of the customer who makes the purchase | Mandatory
| Customer.LastName <br> <i> string </i> | Last name of the customer who makes the purchase | Mandatory
| Customer.DocumentTypeId <br> <i> string </i> | Customer document type | Mandatory
| Customer.DocumentNumber <br> <i> string </i> | Customer document | Mandatory
| Customer.PhoneNumber <br> <i> string </i> | Customer document | Mandatory (see Note 1)
| Customer.BillingAddress.Country <br> <i> string </i> | Customer's country | Mandatory
| Customer.BillingAddress.State <br> <i> string </i> | Customer status | Mandatory
| Customer.BillingAddress.City <br> <i> string </i> | Customer address city | Mandatory
| Customer.BillingAddress.AddressDetail <br> <i> string </i> | Customer address street, number, apartment | Mandatory
| PaymentExpirationInMinutes <br> <i> numeric </i> | Inside MetaDataIn. This field is used to configure the expiration time that the coupon should have. Sets up in minutes. If this data is not received, a default value will be completed | Optional
| MetaDataIn.PaymentExpirationInMinutes <br> <i> numeric </i> | Inside MetaDataIn. This field is used to configure the expiration time that the coupon should have. Sets up in minutes. If this data is not received, a default value will be completed | Opcional
| MetaDataIn.TaxAmount <br> <i> numeric </i> | Se debe enviar el monto de IVA del monto bruto. Ej: en purchase con Amount 1000 se envia 159.6 | Requerido

> **Note 1**: When implementing the **Antifraud** system, the following parameters may be required and/or changed by others, check the section: [Antifraud parameters](https://doc.bamboopayment.com/docs/es-api-bamboo-payment-pci/ZG9jOjI5MDgwMTM4-parametros#flujo-de-autorizaci%C3%B3n-por-redirecci%C3%B3n). Keep in mind that for the correct functioning of the Antifraud system, it is suggested to send additional data.

<br>

Purchase example:

```json
{
    "TrxToken" : "OT__J2GWEll4hwZ9nIr_1oNtxkRtCs5QbbsO4jiYpVJ8SzQ_",
    "Order" : "928212",
    "Capture" : "false",
    "Amount": 3000000,
    "Currency" : "COP",
    "Customer": {
        "Email": "john@bamboopayment.com",
        "BillingAddress": {
          "AddressType": 1,
          "Country": "COL",
          "State": "Antioquia",
          "City": "Medellin",
          "AddressDetail": "Carrera 80 #30 - 20"
        },
        "FirstName" : "John",
        "LastName": "Doe",
        "DocNumber" : "1234567890",
        "DocumentTypeId": 12,
        "PhoneNumber" : "3004002010"
    },
    "Description": "Payment concept",
    "MetadataIn" : {
       "PaymentExpirationInMinutes": "1440",
       "TaxAmount": "478992"
    }
}
```

**TaxAmount**

In particular for domestic purchases, within MetadataIn the parameter "TaxAmount" must be included, which indicates the value of the rate (where the last two digits correspond to decimals, without thousands separators).

<!--
type: tab
title: Crossborder purchase
-->
### Required fields

The same as for Domestic purchase, additionally the **CrossBorderData** field is required to indicate the destination currency.
<br>

Purchase example:

```json
{
    "TrxToken" : "OT__J2GWEll4hwZ9nIr_1oNtxkRtCs5QbbsO4jiYpVJ8SzQ_",
    "Order" : "928212",
    "Capture" : "false",
    "Amount" : 3000,
    "Currency" : "COL",
    "CrossBorderData" : {
        "TargetCountryISO" : "CO"
    },
    "Customer": {
        "Email": "john@bamboopayment.com",
        "BillingAddress": {
          "AddressType": 1,
          "Country": "COL",
          "State": "Antioquia",
          "City": "Medellin",
          "AddressDetail": "Carrera 80 #30 - 20"
        },
        "FirstName" : "John",
        "LastName": "Doe",
        "DocNumber" : "1234567890",
        "DocumentTypeId": 12,
        "PhoneNumber" : "3004002010"
    },
    "Description": "Payment concept",
    "MetadataIn" : {
       "PaymentExpirationInMinutes": "1440"
    }
}
```

<!--
type: tab
title: Test data
-->

Brand      | Expiration | CVV  | PAN
-----------|------------|------|-----------
Mastercard | 10/22      | 673  | 5489179890943823
Visa       | 10/23      | 988  | 4641032701009953
Diners     | 11/24      | 774  | 38712069813992
Amex       | 03/24      | 598  | 372540410461532

<!-- type: tab-end -->

<br><br>

<!--
focus: false
-->
![footer](https://bamboo-doc-assets.s3.amazonaws.com/images/footer-barra.png)

[Back](docs/Colombia-Informacion-General.md)  [Next](docs/Costa-Rica-Informacion-General.md)

## Title 1 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lectus et pellentesque imperdiet. Etiam at maximus odio. Aliquam vel risus vitae ipsum viverra maximus sed id mauris. Morbi lacus mi, pellentesque eu efficitur quis, ultricies sed sapien. Nunc vitae orci quis dui ornare sodales. Nulla tincidunt in nibh ut hendrerit. Nam non ornare lectus. Mauris et lectus lacus. Quisque interdum purus eu diam euismod, non sodales nibh molestie. Donec dignissim diam at justo fringilla lobortis. In vulputate dignissim nisl, id sollicitudin augue hendrerit in. Curabitur dignissim porta nunc nec ullamcorper. Suspendisse potenti. Aliquam commodo fermentum turpis vitae tincidunt. Pellentesque nec bibendum sem, ut dignissim lacus.

## Title 2 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lectus et pellentesque imperdiet. Etiam at maximus odio. Aliquam vel risus vitae ipsum viverra maximus sed id mauris. Morbi lacus mi, pellentesque eu efficitur quis, ultricies sed sapien. Nunc vitae orci quis dui ornare sodales. Nulla tincidunt in nibh ut hendrerit. Nam non ornare lectus. Mauris et lectus lacus. Quisque interdum purus eu diam euismod, non sodales nibh molestie. Donec dignissim diam at justo fringilla lobortis. In vulputate dignissim nisl, id sollicitudin augue hendrerit in. Curabitur dignissim porta nunc nec ullamcorper. Suspendisse potenti. Aliquam commodo fermentum turpis vitae tincidunt. Pellentesque nec bibendum sem, ut dignissim lacus.

### Subtitle 1
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lectus et pellentesque imperdiet. Etiam at maximus odio. Aliquam vel risus vitae ipsum viverra maximus sed id mauris. Morbi lacus mi, pellentesque eu efficitur quis, ultricies sed sapien. Nunc vitae orci quis dui ornare sodales. Nulla tincidunt in nibh ut hendrerit. Nam non ornare lectus. Mauris et lectus lacus. Quisque interdum purus eu diam euismod, non sodales nibh molestie. Donec dignissim diam at justo fringilla lobortis. In vulputate dignissim nisl, id sollicitudin augue hendrerit in. Curabitur dignissim porta nunc nec ullamcorper. Suspendisse potenti. Aliquam commodo fermentum turpis vitae tincidunt. Pellentesque nec bibendum sem, ut dignissim lacus.

### Subtitle 2
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lectus et pellentesque imperdiet. Etiam at maximus odio. Aliquam vel risus vitae ipsum viverra maximus sed id mauris. Morbi lacus mi, pellentesque eu efficitur quis, ultricies sed sapien. Nunc vitae orci quis dui ornare sodales. Nulla tincidunt in nibh ut hendrerit. Nam non ornare lectus. Mauris et lectus lacus. Quisque interdum purus eu diam euismod, non sodales nibh molestie. Donec dignissim diam at justo fringilla lobortis. In vulputate dignissim nisl, id sollicitudin augue hendrerit in. Curabitur dignissim porta nunc nec ullamcorper. Suspendisse potenti. Aliquam commodo fermentum turpis vitae tincidunt. Pellentesque nec bibendum sem, ut dignissim lacus.

### Subtitle 3
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lectus et pellentesque imperdiet. Etiam at maximus odio. Aliquam vel risus vitae ipsum viverra maximus sed id mauris. Morbi lacus mi, pellentesque eu efficitur quis, ultricies sed sapien. Nunc vitae orci quis dui ornare sodales. Nulla tincidunt in nibh ut hendrerit. Nam non ornare lectus. Mauris et lectus lacus. Quisque interdum purus eu diam euismod, non sodales nibh molestie. Donec dignissim diam at justo fringilla lobortis. In vulputate dignissim nisl, id sollicitudin augue hendrerit in. Curabitur dignissim porta nunc nec ullamcorper. Suspendisse potenti. Aliquam commodo fermentum turpis vitae tincidunt. Pellentesque nec bibendum sem, ut dignissim lacus.

## Title 3 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lectus et pellentesque imperdiet. Etiam at maximus odio. Aliquam vel risus vitae ipsum viverra maximus sed id mauris. Morbi lacus mi, pellentesque eu efficitur quis, ultricies sed sapien. Nunc vitae orci quis dui ornare sodales. Nulla tincidunt in nibh ut hendrerit. Nam non ornare lectus. Mauris et lectus lacus. Quisque interdum purus eu diam euismod, non sodales nibh molestie. Donec dignissim diam at justo fringilla lobortis. In vulputate dignissim nisl, id sollicitudin augue hendrerit in. Curabitur dignissim porta nunc nec ullamcorper. Suspendisse potenti. Aliquam commodo fermentum turpis vitae tincidunt. Pellentesque nec bibendum sem, ut dignissim lacus.

## Title 4 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lectus et pellentesque imperdiet. Etiam at maximus odio. Aliquam vel risus vitae ipsum viverra maximus sed id mauris. Morbi lacus mi, pellentesque eu efficitur quis, ultricies sed sapien. Nunc vitae orci quis dui ornare sodales. Nulla tincidunt in nibh ut hendrerit. Nam non ornare lectus. Mauris et lectus lacus. Quisque interdum purus eu diam euismod, non sodales nibh molestie. Donec dignissim diam at justo fringilla lobortis. In vulputate dignissim nisl, id sollicitudin augue hendrerit in. Curabitur dignissim porta nunc nec ullamcorper. Suspendisse potenti. Aliquam commodo fermentum turpis vitae tincidunt. Pellentesque nec bibendum sem, ut dignissim lacus.

## Title 5 
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec interdum lectus et pellentesque imperdiet. Etiam at maximus odio. Aliquam vel risus vitae ipsum viverra maximus sed id mauris. Morbi lacus mi, pellentesque eu efficitur quis, ultricies sed sapien. Nunc vitae orci quis dui ornare sodales. Nulla tincidunt in nibh ut hendrerit. Nam non ornare lectus. Mauris et lectus lacus. Quisque interdum purus eu diam euismod, non sodales nibh molestie. Donec dignissim diam at justo fringilla lobortis. In vulputate dignissim nisl, id sollicitudin augue hendrerit in. Curabitur dignissim porta nunc nec ullamcorper. Suspendisse potenti. Aliquam commodo fermentum turpis vitae tincidunt. Pellentesque nec bibendum sem, ut dignissim lacus.
