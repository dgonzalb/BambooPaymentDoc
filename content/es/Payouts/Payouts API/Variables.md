---
title: "Variables"
linkTitle: "Variables"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  Encuentre el listado de variables y códigos disponibles para la integración de Payouts.
weight: 30
---

## Tipos de documentos {#document-types}
Las siguientes tablas muestran los tipos de documento que debe configurar en el parámetro `payee.document.type` según el país.

### Argentina
| Abreviación | Nombre del documento | Individuos / Compañías | Tipo | Longitud |
|:-:|---|---|:-:|:-:|
| CUIT | Clave Única de Identificación Tributaria | Compañías | Numérico | 11 |
| CUIL | Código único de Identificación Laboral | Individuos | Numérico | 11 |

### Brasil {#brasil}
| Abreviación | Nombre del documento | Individuos / Compañías | Tipo | Longitud |
|:-:|---|---|:-:|:-:|
| CPF | Registro de Personas Físicas | Individuos | Numérico | 11<sup>*</sup> |
| CNPJ | Registro Nacional de Personas Jurídicas | Compañías | Numérico | 14<sup>*</sup> |

<sup>*</sup> _Validar dígitos verificadores_

### Chile
| Abreviación | Nombre del documento | Individuos / Compañías | Tipo | Longitud |
|:-:|---|---|:-:|:-:|
| CI | Cédula de Identidad | Individuos | Numérico | 8 o 9 |
| RUN | Rol Único Nacional | Individuos | Numérico | 8 o 9 |
| RUT | Rol Único Tributario | Individuos | Numérico | 8 o 9 |

### Colombia
| Abreviación | Nombre del documento | Individuos / Compañías | Tipo | Longitud |
|:-:|---|---|:-:|:-:|
| CC | Cédula de ciudadanía | Individuos | Numérico | Entre 6 y 10 |
| CE | Cédula de extranjería | Individuos | Numérico | Entre 6 y 10 |
| NIT | NIT | Compañías | Numérico | Entre 8 y 15 |

<!--### Costa Rica
| Abreviación | Nombre del documento | Individuos / Compañías | Tipo | Longitud |
|:-:|---|---|:-:|:-:|
| CI | Cédula de identidad | Individuos | Numérico | 9 |

### El Salvador
| Abreviación | Nombre del documento | Individuos / Compañías | Tipo | Longitud |
|:-:|---|---|:-:|:-:|
| DUI | Documento único de identidad | Individuos |  | Entre 6 y 18 |-->

### México {#Mexico}
| Abreviación | Nombre del documento | Individuos / Compañías | Tipo | Longitud |
|:-:|---|---|:-:|:-:|
| CURP | Clave Única de Registro de Población | Individuos | | Entre 8 y 18 |
| RFC | Registro Federal de Contribuyentes | Individuos y Compañías | | Entre 8 y 18 |
| IFE | Instituto Federal Electoral | Individuos | | Entre 8 y 18 |
| PASSPORT | Documento de Viaje Internacional | Individuos |  | Entre 8 y 18 |
| RESIDENCIA | Documento de extranjero residente en el país | Individuos |  | Entre 8 y 18 |

<!--### Nicaragua
| Abreviación | Nombre del documento | Individuos / Compañías | Tipo | Longitud |
|:-:|---|---|:-:|:-:|
| CI | Cédula de identidad | Individuos |  | Entre 8 y 18 |-->

### Perú {#peru}
| Abreviación | Nombre del documento | Individuos / Compañías | Tipo | Longitud |
|:-:|---|---|:-:|:-:|
| CE | Cédula de Extranjería | Individuos | Numérico | 9 |
| DNI | Documento Nacional de Identidad | Individuos | Numérico<br><hr>Numérico o Alfanumérico | 8<br><hr>9 |
| PASSPORT | Documento de Viaje Internacional | Individuos | | Entre 7 y 18 |
| RUC | Registro Único de Contribuyentes | Individuos y Compañías | | 11 |

### Uruguay
| Abreviación | Nombre del documento | Individuos / Compañías | Tipo | Longitud |
|:-:|---|---|:-:|:-:|
| CI | Cédula de Identidad| Individuos | Numérico | Entre 6 y 8 |
| DE | | Individuos | Numérico | |
| PASSPORT | Documento de Viaje Internacional | Individuos | Alfanumérico | |
| RUT | Rol Único Tributario | Individuos | Numérico | 12 |

## Tipos de Payout {#payout-types}
La siguiente tabla muestra los tipos de Pago que debe configurar en el parámetro `type`.

<div id="shortTable"></div>

| Tipo | Descripción |
|:-:|---|
| `1` | Efectivo |
| `2` | Transferencia Bancaria |
| `3` | Wallet |
| `4` | Transferencias Bancarias Instantáneas (Solo para 🇧🇷) |
