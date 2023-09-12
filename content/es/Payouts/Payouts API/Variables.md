---
title: "Variables"
linkTitle: "Variables"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  Find the list of variables and codes available for Payouts integration.
weight: 20
---

## ID Types
The following table shows the document types you must configure in the parameter `payee.document.type`.

### Argentina
| Abreviación | Nombre del documento | Individuals / Companies | Tipo | Length |
|:-:|---|---|:-:|:-:|
| CUIT | Unique Tax Identification Code | Companies | Numeric | 11 |
| CUIL | Unique Labor Identification Code | Individuals | Numeric | 11 |

### Brazil
| Abreviación | Nombre del documento | Individuals / Companies | Tipo | Length |
|:-:|---|---|:-:|:-:|
| CPF | Individuals Registration | Individuals | Numeric | 11<sup>*</sup> |
| CNPJ | National Registry of Legal Entities | Company | Numeric | 14<sup>*</sup> |

<sup>*</sup> _Validate verifier-digits_

### Chile
| Abreviación | Nombre del documento | Individuals / Companies | Tipo | Length |
|:-:|---|---|:-:|:-:|
| CI | Identity Card | Individuals | Numeric | 8 or 9 |
| RUN | Unique National Role | Individuals | Numeric | 8 or 9 |
| RUT | Individuals Tax Role | Individuals | Numeric | 8 or 9 |

### Colombia
| Abreviación | Nombre del documento | Individuals / Companies | Tipo | Length |
|:-:|---|---|:-:|:-:|
| CC | Citizenship ID | Individuals | Numeric | Between 6 and 10 |
| CE | Immigration ID | Individuals | Numeric | Between 6 and 10 |
| NIT | Tax Identification Number | Companies | Numeric | Between 8 and 15 |

<!--### Costa Rica
| Abreviación | Nombre del documento | Individuals / Companies | Tipo | Length |
|:-:|---|---|:-:|:-:|
| CI | Identity Card | Individuals | Numeric | 9 |

### El Salvador
| Abreviación | Nombre del documento | Individuals / Companies | Tipo | Length |
|:-:|---|---|:-:|:-:|
| DUI | Unique identity document | Individuals |  | Between 6 and 18 |-->

### Mexico
| Abreviación | Nombre del documento | Individuals / Companies | Tipo | Length |
|:-:|---|---|:-:|:-:|
| CURP | Unique Population Registry Key | Individuals | | Between 8 and 18 |
| RFC | Federal Taxpayer Registry | Individuals and Companies | | Between 8 and 18 |
| IFE | Federal Electoral Institute | Individuals | | Between 8 and 18 |
| PASSPORT | International Travel Document | Individuals |  | Between 8 and 18 |
| RESIDENCIA | Document of foreigner residing in the country | Individuals |  | Between 8 and 18 |

<!--### Nicaragua
| Abreviación | Nombre del documento | Individuals / Companies | Tipo | Length |
|:-:|---|---|:-:|:-:|
| CI | Identity card | Individuals |  | Between 8 and 18 |-->

### Peru
| Abreviación | Nombre del documento | Individuals / Companies | Tipo | Length |
|:-:|---|---|:-:|:-:|
| CE | Immigration ID | Individuals | Numeric | 9 |
| DNI | National Identity Document | Individuals | Numeric<br><hr>Numeric or Alphanumeric | 8<br><hr>9 |
| PASSPORT | International Travel Document | Individuals | | Between 7 and 18 |
| RUC | Single Taxpayer Registry | Individuals and Companies | | 11 |

### Uruguay
| Abreviación | Nombre del documento | Individuals / Companies | Tipo | Length |
|:-:|---|---|:-:|:-:|
| CI | Identity Card | Individuals | Numeric | Between 6 and 8 |
| DE | | Single | Numeric | |
| PASSPORT | International Travel Document | Individuals | Alphanumeric | |
| RUT | Single Tax Role | Individuals | Numeric | 12 |

## Error Codes
| Error code | Descripción |
|---|---|
| `200` | Success |
| `400` | Bad Request |
| `401` | Unauthorized |
| `409` | Conflict |
| `812` | Declined by validation for document |
| `813` | Declined by validation for account |
| `814` | Declined by validation for country |
| `815` | Declined by Compliance |
| `816` | Reference ID already used.<br>This error is not be displayed in the [Payouts console](/payouts/payouts-merchant-console.html) but it is returned via API. |
| `901` | Bank account is closed |
| `902` | Invalid bank account |
| `903` | Invalid bank account type |
| `904` | Invalid bank branch |
| `905` | Monthly limit exceeded for user |
| `906` | Rejected by merchant's request |
| `907` | The bank account is unable to receive transfers |
| `908` | Invalid beneficiary document |
| `909` | Beneficiary name doesn't match bank Detalles |
| `910` | PIX key invalid |
| `911` | Invalid state change requested |
| `912` | Insufficient Balance |
| `999` | Error |