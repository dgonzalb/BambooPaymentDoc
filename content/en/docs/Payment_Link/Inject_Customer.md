---
title: "Inject Customer"
linkTitle: "Inject Customer"
date: 2024-08-02T08:43:44-05:00
Description: >
  Learn how to utilize the Inject Customer endpoint in the Payment Link API to associate or update customer information for a specific payment. This includes the workflow, request parameters, and examples.
weight: 20
tags: ["subtopic"]
---

After creating a payment request, you may need to link customer information to it. The Inject Customer endpoint allows you to add or update customer data for a specific payment.

#### Workflow

1. **Create a Payment**: Use the [Create Payment Link]({{< ref Create_Payment_Link.md >}}) endpoint to initiate the payment request.
2. **Obtain the `paymentId`**: The `paymentId` will be included in the [response to your Create Payment request.]({{< ref Create_Payment_Link.md >}}#response)
3. **Inject Customer Information**: Use the appropriate endpoint to associate the customer data with the payment.

The payment will be updated with the customer's details, ensuring that the following payment process has access to this information.

---

### Request URL

You must invoke a **PATCH** request to the following URLs based on your environment:

- **Production**: `https://h2h.bamboopayment.com/api/v1/payments/{paymentId}`
- **Stage**: `https://h2h.stage.bamboopayment.com/api/v1/payments/{paymentId}`

> **Note:** Replace `{paymentId}` with the identifier of the payment you want to update.

---

## Request Parameters

| Parameter           | Type       | Required? | Description                                              |
|---------------------|------------|-----------|----------------------------------------------------------|
| `paymentId`         | `string`   | Yes       | The unique identifier of the payment to update.          |
| `customer`          | `object`   | Yes       | Object containing the customer information to inject.    |

#### Customer Object

| Parameter                | Type       | Required? | Description                                  |
|--------------------------|------------|-----------|----------------------------------------------|
| `identifier`             | `string`   | Yes       | Unique customer identifier (e.g., email).    |
| `email`                  | `string`   | No        | Email address of the customer.               |
| `firstName`              | `string`   | No        | First name of the customer.                  |
| `lastName`               | `string`   | No        | Last name of the customer.                   |
| `documentTypeId`         | `integer`  | No        | Type of document. Review the [Document types table](/en/docs/payment-methods/uruguay.html#document-types) for Uruguay      |
| `documentNumber`         | `string`   | No        | Number of the document.                      |
| `phoneNumber`            | `string`   | No        | Customer's phone number.                     |
| `billingAddress`         | `object`   | No        | Billing address details (see Address Object).|
| `shippingAddress`        | `object`   | No        | Shipping address details (see Address Object).|

#### Address Object

| Parameter      | Type     | Required? | Description                                    |
|----------------|----------|-----------|------------------------------------------------|
| `detail`       | `string` | No        | Street address|
| `country`      | `string` | No        | Country of the address.                       |
| `state`        | `string` | No        | State or department of the address.           |
| `city`         | `string` | No        | City of the address.                          |
| `postalCode`   | `string` | No        | Postal code of the address.                   |


### Request Example

{{< highlight json >}}
{{< Payins/PaymentLink/Inject_Customer_Request >}}
{{< /highlight >}} 


## Response

| Field              | Type       | Description                                           |
|--------------------|------------|-------------------------------------------------------|
| `paymentId`        | `string`   | The payment ID that was updated.                     |
| `redirectUrl`      | `string`   | URL for the next step in the payment process.         |
| `validForMinutes`  | `integer`  | Remaining time (in milliseconds) for the payment link.     |
| `isSuccess`        | `boolean`  | Indicates whether the request was successful.         |
| `errors`           | `array`    | List of validation errors, if any.                   |

### Response example

{{< highlight json >}}
{{< Payins/PaymentLink/Inject_Customer_Response >}}
{{< /highlight >}} 
