---
title: "Store Management"
linkTitle: "Store Management"
date: 2023-05-08T07:28:16-05:00
description: >
  This guide outlines the administrative processes for managing orders and transactions in a VTEX store integrated with Bamboo.
weight: 30
tags: ["subtopic"]
---

## Order Management

### Viewing Orders

1. Access the VTEX admin menu
2. Select 'Orders' > 'All Orders'
3. You will see a list of all orders received in your store

![PrintScreen](/assets/VTEX/bamboo-vtex-020.png)

### Order Details

1. Click on a specific order to view its details
2. The order details include all payment information processed through Bamboo
3. Click 'View Details' to see the associated transaction

![PrintScreen](/assets/VTEX/bamboo-vtex-021.png)

## Transaction Management

### Viewing Transactions

1. From the VTEX admin menu, select 'Orders' > 'Transactions'
2. This displays all transactions received in your store

![PrintScreen](/assets/VTEX/bamboo-vtex-022.png)

### Transaction Details

1. Click on a specific transaction to view its details
2. You can see the full traceability of payment statuses processed by Bamboo
3. In the upper right corner, you can access the order

![PrintScreen](/assets/VTEX/bamboo-vtex-023.png)

![PrintScreen](/assets/VTEX/bamboo-vtex-024.png)


## Additional Actions

### Capture
If the **'Authorization and capture'** option is active, you will need to charge payments manually. To do this, you only need to invoice the order in VTEX. This involves starting the order preparation and then invoicing it.

1. Begin order preparation

![PrintScreen](/assets/VTEX/bamboo-vtex-026.png)

2. Invoice the order

![PrintScreen](/assets/VTEX/bamboo-vtex-027.png)

### Refunds

{{% alert title="Info" color="info"%}}
Refunds can be made on transactions when the order status is **'Invoiced'** in VTEX.
{{% /alert %}}

1. If theorder status is 'Invoiced', click the **'Return items'** button

![PrintScreen](/assets/VTEX/bamboo-vtex-028.png)

2. You can process total or partial refunds
3. The return details will be visible in the associated transaction

![PrintScreen](/assets/VTEX/bamboo-vtex-029.png)

### Cancellations

{{% alert title="Info" color="info"%}}
You can cancel transactions for orders in 'Ready for Preparation' status.
{{% /alert %}}

1. Locate the order you wish to cancel
2. Click the 'Cancel' button on the order page

![PrintScreen](/assets/VTEX/bamboo-vtex-030.png)

**Note:** Cancellation is only possible for orders in 'Ready for Preparation' status, not in later stages

![PrintScreen](/assets/VTEX/bamboo-vtex-031.png)

4. Cancellation details will be visible in the associated transaction

![PrintScreen](/assets/VTEX/bamboo-vtex-032.png)

## Important Notes

- Ensure that orders are in the correct status before attempting **refunds** or **cancellations**.
- Always check the associated transaction for the most up-to-date payment information