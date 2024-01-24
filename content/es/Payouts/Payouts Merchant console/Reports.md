---
title: "Reporte de Payouts"
linkTitle: "Reporte de Payouts"
date: 2023-03-22T15:30:03-05:00
type: docs
Description: >
  El reporte de Payouts muestra el listado de Payouts sin importar su estado y le permite buscar por alguno en particular.
weight: 10
---

Para navegar al Reporte de Payouts, abra su consola de Comercios y seleccione ***Payout***, luego ***Reporte de Payouts***.

![PrintScreen](/assets/Payouts/Payouts5_es.png)

En esta ventana, encuentra dos secciones: _**Filtros**_ y _**Lista de Payout**_.

## Sección de Filtros
En la primera sección, dispone de los criterios de búsqueda, donde puede combinar uno o más atributos para buscar un Payout específico. 

Haga clic en el botón _**Filtros**_ para mostrar los criterios de búsqueda disponibles.

![PrintScreen](/assets/Payouts/Payouts11_es.png)

Puede incluir y combinar cualquiera de los siguientes parámetros como criterio de búsqueda.

* Rango de fecha de creación - _De forma predeterminada, el rango se establece desde tres a un día antes de la fecha actual_.
* Payout Id
* Referencia
* País
* Estado final
* Nombre del banco

Además de los parámetros de búsqueda fijos mencionados anteriormente, puede seleccionar un atributo en el campo Descripción y definir un operador (**Es**, **Incluye**, **Mayor que**, **Menor que**) para comparar con un valor. Dispone de los siguientes parámetros:

<div id="columns">
     <li>ID de pago</li>
     <li>Referencia del comercio</li>
     <li>Nombre del comercio</li>
     <li>Importe de entrada del comercio</li>
     <li>Nombre del beneficiario</li>
     <li>Número de documento del beneficiario</li>
     <li>Tipo de cambio</li>
     <li>Importe de pago local</li>
     <li>Código bancario</li>
     <li>Sucursal bancaria</li>
     <li>Número de cuenta bancaria</li>
     <li>Tipo de cuenta bancaria</li>
     <li>Fecha de pago</li>
     <li>Actualización de estado</li>
     <li>Motivo</li>
     <li>Motivo de rechazo del banco real</li>
     <li>Motivo del pago</li>
     <li>ID de estado del lote</li>
</div>
<br>

Además, puede utilizar el botón _**Descargar**_ situado en la parte inferior de la sección para obtener un archivo Excel con los resultados de la búsqueda.

## Sección de lista de Payouts
En la segunda sección, encontrará la lista de payouts solicitados. Por defecto, la sección de la lista de Payouts muestra todos los Payouts que ha solicitado en todas sus cuentas, puede filtrar por una cuenta determinada utilizando el cuadro combinado _**Cuenta**_ en la esquina superior derecha. 

![PrintScreen](/assets/Payouts/Payouts21_es.png)

{{% alert title="Info" color="info"%}}
El filtro _**Cuenta**_ sólo está disponible cuando tiene varias cuentas.
{{% /alert %}}

In this section you have the following columns:

| Columna | Descripción |
|---|---|
| **Id** | Número único generado por Bamboo para identificar el Payout. |
| **Referencia** | Identificador seleccionado por usted en el request para identificar el Payout. |
| **Creado** | Fecha en la que el sistema creó el Payout. |
| **Estado** | Estado más reciente del Payout. Para más información, consulte [estados del Payout]({{< ref "Payout-Status.md" >}}). |
| **Beneficiario** | Nombre del tercero beneficiario del Payout. |
| **País** | País del beneficiario. |
| **Monto Origen** | Monto del Payout en la moneda origen. |
| **Monto Destino** | Monto del Payout en la moneda destino. |

Para ver los detalles de un Payout, haga clic sobre el mismo en la tabla. Aparece la siguiente ventana.

![PrintScreen](/assets/Payouts/Payouts6_es.png)

Haga clic en el botón _**Más Detalles**_ para ver detalles adicionales del Payout y su log de estado.

![PrintScreen](/assets/Payouts/Payouts7_es.png)