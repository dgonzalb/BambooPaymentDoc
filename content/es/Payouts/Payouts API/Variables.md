---
title: "Variables"
linkTitle: "Variables"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  Find the list of variables and codes available for Payouts integration.
weight: 30
---

## Document Types
The following tables show the document types you must configure in the parameter `payee.document.type` according to the country.

### Argentina
| Abbreviation | Document name | Individuals / Companies | Type | Length |
|:-:|---|---|:-:|:-:|
| CUIT | Unique Tax Identification Code | Companies | Numeric | 11 |
| CUIL | Unique Labor Identification Code | Individuals | Numeric | 11 |

### Brasil {#brasil}
| Abbreviation | Document name | Individuals / Companies | Type | Length |
|:-:|---|---|:-:|:-:|
| CPF | Individuals Registration | Individuals | Numeric | 11<sup>*</sup> |
| CNPJ | National Registry of Legal Entities | Company | Numeric | 14<sup>*</sup> |

<sup>*</sup> _Validate verifier-digits_

### Chile
| Abbreviation | Document name | Individuals / Companies | Type | Length |
|:-:|---|---|:-:|:-:|
| CI | Identity Card | Individuals | Numeric | 8 or 9 |
| RUN | Unique National Role | Individuals | Numeric | 8 or 9 |
| RUT | Individuals Tax Role | Individuals | Numeric | 8 or 9 |

### Colombia
| Abbreviation | Document name | Individuals / Companies | Type | Length |
|:-:|---|---|:-:|:-:|
| CC | Citizenship ID | Individuals | Numeric | Between 6 and 10 |
| CE | Immigration ID | Individuals | Numeric | Between 6 and 10 |
| NIT | Tax Identification Number | Companies | Numeric | Between 8 and 15 |

<!--### Costa Rica
| Abbreviation | Document name | Individuals / Companies | Type | Length |
|:-:|---|---|:-:|:-:|
| CI | Identity Card | Individuals | Numeric | 9 |

### El Salvador
| Abbreviation | Document name | Individuals / Companies | Type | Length |
|:-:|---|---|:-:|:-:|
| DUI | Unique identity document | Individuals |  | Between 6 and 18 |-->

### México {#Mexico}
| Abbreviation | Document name | Individuals / Companies | Type | Length |
|:-:|---|---|:-:|:-:|
| CURP | Unique Population Registry Key | Individuals | | Between 8 and 18 |
| RFC | Federal Taxpayer Registry | Individuals and Companies | | Between 8 and 18 |
| IFE | Federal Electoral Institute | Individuals | | Between 8 and 18 |
| PASSPORT | International Travel Document | Individuals |  | Between 8 and 18 |
| RESIDENCIA | Document of foreigner residing in the country | Individuals |  | Between 8 and 18 |

<!--### Nicaragua
| Abbreviation | Document name | Individuals / Companies | Type | Length |
|:-:|---|---|:-:|:-:|
| CI | Identity card | Individuals |  | Between 8 and 18 |-->

### Perú {#peru}
| Abbreviation | Document name | Individuals / Companies | Type | Length |
|:-:|---|---|:-:|:-:|
| CE | Immigration ID | Individuals | Numeric | 9 |
| DNI | National Identity Document | Individuals | Numeric<br><hr>Numeric or Alphanumeric | 8<br><hr>9 |
| PASSPORT | International Travel Document | Individuals | | Between 7 and 18 |
| RUC | Single Taxpayer Registry | Individuals and Companies | | 11 |

### Uruguay
| Abbreviation | Document name | Individuals / Companies | Type | Length |
|:-:|---|---|:-:|:-:|
| CI | Identity Card | Individuals | Numeric | Between 6 and 8 |
| DE | | Single | Numeric | |
| PASSPORT | International Travel Document | Individuals | Alphanumeric | |
| RUT | Single Tax Role | Individuals | Numeric | 12 |

## Payout types
The following tables show the Payout types you must configure in the parameter `type`.

<div id="shortTable"></div>

| Type | Descripción |
|:-:|---|
| `1` | Efectivo |
| `2` | Transferencia Bancaria |
| `3` | Wallet |
| `4` | Transferencias Bancarias Instantáneas (Only for 🇧🇷) |
