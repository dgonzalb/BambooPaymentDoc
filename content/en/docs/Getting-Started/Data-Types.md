---
title: "Data Types"
linkTitle: "Data Types"
date: 2023-03-02T11:40:29-05:00
Description: >
  Review the Data types you need to use to integrate with Bamboo Payments.
weight: 20
---

## Basic
Refer to this section to learn some important aspects of the basic data types of Bamboo Integration.

### String
It's a set of characters that can contain any Unicode character. You can define a maximum length for this data type using square brackets; for example, `string[30]` means that the string can contain a maximum of 30 characters. If a string has more characters than the maximum defined, it will be truncated, and processing will continue.

### Numeric
Refers to an integer value. You can define a maximum length for this data type using square brackets; for example, `Numeric[3]` means that the number can have a maximum of 3 digits. If the data has a value greater than the specification, an error will be returned.

### Amount
Refers to a `Numeric` field that includes decimals to express the value of a transaction. 
These fields are always expressed with the integer part plus two decimals without punctuation marks between them. 

The following table shows how values should be codified:

<div id="shortTable"></div>

| Value | Coded as |
|---|---|
| 100 | 10000 |
| 1.237,52 | 123752 |
| 3.200,5 | 320050 |
| 0,01 | 1 |

### TimeStamp
This data type shows a date/time value that must be expressed in the following format:

`"YYYY-MM-DDTHH:mm:ss.ttt"`

Where:

* `YYYY` indicates the year
* `MM` indicates the month
* `DD` indicates the day
* `T` indicates the beginning of the required time section
* `hh` indicates the hour (from 0 to 23)
* `mm` indicates the minutes
* `ss` indicates the seconds
* `ttt` indicates the milliseconds

Below are examples of how values should be codified:

<div id="shortTable"></div>

| Value | Coded as |
|---|---|
| _2016/01/12 13:21:48.354_ | `2016-01-12T13:21:48.354` |
| _2016/03/31 05:17:00.000_ | `2016-03-31T05:17:00.000` |
| _2016/11/28 22:59:59.970_ | `2016-11-28T22:59:59.970` |

### Date
This Data type contains an exact date. Unlike the [TimeStamp](#TimeStamp) data type, it does not include hours and is in the following format:

`yyyyMMdd`

### Boolean
This data type is a logical value (`true` or `false`).

### TransactionStatus
Indicates the final status of a transaction.

Possible values:

<div id="shortTable"></div>

| TransactionStatusID | TransactionStatus |
|---|---|
| 1 | Approved |
| 2 | Pending |
| 3 | Pre-authorized |
| 4 | Rejected |
| 5 | Paid |
| 6 | Cancelled |

### ActionType
Indicates the type of action to be performed by the merchant. This data type is useful when processing purchases using the _Redirect flow_.

Possible values:

<div id="shortTable"></div>

| ActionType | Action |
|---|---|
| 1 | _Redirect_<br>Indicates that you need to make a redirection as the next step in the purchase. |
| 2 | _PWCapture_<br>Indicates that it is necessary to capture the CVV of the card. |