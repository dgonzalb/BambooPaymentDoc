---
title: "Concepts"
linkTitle: "Concepts"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  Please look at the concepts behind the ***Payouts*** feature so you can start using it easily!
weight: 20
---

## Account
An account represents the currency used to request Payouts. We configure the destination currency according to the model selected.

## Balance
The _Balance_ is the amount of money settled in your account. We have three different balances for Payouts; consult those types [here]({{< ref "Payout-Balances" >}}).

## Banking Connections
The _Banking Connection_ technology allows us to send money to a payee regardless of the selected payment method.

## FX Service
_Foreign Exchange_ or _FX_ refers to the current rate to convert one country's currency to another. We update this value according to destination country regulations.

## Payee
A _Payee_ is a third party who will receive the money result of your Payout request. The information required for a _Payee_ is their name, document, phone, e-mail address, and bank account.

## Payout
_Payout_ refers to disbursing funds to a third party using funds settled in your account. 

## Payout fee
The _Payout fee_ refers to the processing cost of the Payout. This cost can be assumed by you (as a Payer) or taken by the Payee.

## Payout models
Bamboo Payouts offers three models that means a combination of origin and destination currency.

### USD to Local (USD2L)
The payout is requested in US Dollars and the payee receives the funds in local currency.

### Local to Local (L2L)
The payout is requested in local currency and the payee receives the funds in local currency. In this model, the country of origin and recipient must be the same.

### USD to USD (USD2USD)
The payout is requested in US Dollars and the payee receives the funds in US Dollars. Currently, this model is only available in Peru and Uruguay.

### Local to Local (L2L) with USD balance ###
The payout is requested in local currency and the beneficiary receives the funds in local currency, but the balance is held in USD.

## Sanction screening
_Sanction screening_ lets us know if the merchant is making payouts to legally sanctioned persons. This process is essential as an Anti-Money Laundering (AML) and Payout limits control.

The output of this process determines whether the _Payout_ requires manual validation.


