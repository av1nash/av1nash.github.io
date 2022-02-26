---
title: Partitioning tables in Azure Synapse
date: 2021-07-16 18:00:00
toc: true
comments: true
classes: wide
tags: ["Azure Synapse","Database", "Partitioning"]
excerpt: "Practical guide on table partitioning in Azure Synapse (SQL Data warehouse)"
categories:
  - blog
---

# Table Partition
1. Enables you to divide data into smaller groups of data.
2. Mostly created on a date column.
3. Supported on all table types:
    * clustered columnstore
    * clustered index
    * heap
4. Supported on all distribution types:
    * hash
    * round robin
5. Can be done on **one** column only.

## Benefits

### Load operations
When leveraging partitions to load data into a table, you can avoid use of transaction logs, significantly improving performance.

#### Inserts/Updates/Deletes
Leverage **Partition Switching** to move entire partitions between tables. This is a metadata-only operation i.e. no physical movement of data is involved.

Partition switching is executed using **ALTER TABLE SWITCH** statement.

General requirements for Switching Partitions

1. Both tables must exist before the SWITCH operation. 
2. The receiving partition must exist and it must be empty. 
3. The receiving non-partitioned table must exist and it must be empty.
4. Partitions must be on the same column.
5. Source and target tables must share the same filegroup.

[exhaustive list of requirements](https://docs.microsoft.com/en-us/previous-versions/sql/sql-server-2008-r2/ms191160(v=sql.105)#general-requirements-for-switching-partitions)

##### Partition Switching patterns
![](https://i.imgur.com/fAd0yHA.png)


###### 1. Switch from non-partitioned table to non-partitioned table
```sql
ALTER TABLE src_tbl SWITCH TO tgt_tbl
```
![](https://i.imgur.com/5YyXMzP.png)


**Note:** tgt_tbl MUST be empty and should have exact same schema as src_tbl, or SQL server will throw an error.

###### 2. Switch from non-partitioned table to partitioned table
_This is <ins>not supported</ins> in Azure Synapse, as check constraints are not supported to enforce the range of values in a table._
```sql
ALTER TABLE src_tbl SWITCH TO tgt_tbl PARTITION 1
```
![](https://i.imgur.com/IwP5aC9.png)

Above SQL statement will fail if (non-partitioned) src_tbl doesn't have check constraints to validate that it only contains data with values that are allowed in partition 1 on the (partitioned) tgt_tbl.

If such a constraint was not added while creating the table, you can alter the table to add the constraint.

```sql
ALTER TABLE src_tbl
WITH CHECK ADD CONSTRAINT orderdate_check
CHECK(order_date IS NOT NULL AND order_date <'2008-01-01')
```

###### 3. Switch from partitioned table to non-partitioned table
```sql
ALTER TABLE src_tbl SWITCH PARTITION 1 TO tgt_tbl; 
```

![](https://i.imgur.com/FFJimPv.png)

###### 4. Switch from partitioned table to partitioned table

![](https://i.imgur.com/u0rOPLx.png)


```sql
ALTER TABLE src_tbl SWITCH PARTITION 2 TO tgt_tbl PARTITION 2
```

In our example, tgt_tbl didn't had any rows in partition # 2 but if it had rows in that partition, sql server will throw this error message:

>ALTER TABLE SWITCH statement failed. The specified partition 2 of target table 'Distribution_16.dbo.Table_54e7fg12e67a45d9859e904b723a9ae7_16' must be empty.

There are two ways to deal with the scenario when target table's partition is not empty:

Solution  1

```sql
--Clear partition # 2 by switching it to a dummy table (partitioned to non-partitioned table switching pattern)
ALTER TABLE tgt_tbl PARTITION 2 SWITCH TO stg_tbl;

--Switch from partitioned table to partitioned table 
ALTER TABLE src_tbl SWITCH PARTITION 2 to tgt_tbl PARTITION 2;

--truncate dummy table
TRUNCATE TABLE stg_tbl;
```
Solution  2

```sql
ALTER TABLE src_tbl SWITCH PARTITION 2 to tgt_tbl PARTITION WITH (TRUNCATE_TARGET = ON)
```

### Query operations
Partitioning can improve query performance by limiting the scan to only the qualifying partitions. This method of filtering can avoid a full table scan and only scan a smaller subset of data. 

**Note:** Clustered columnstore indexes make predicate elimination performance benefits less beneficial, but in some cases there can be a benefit to queries.

For more information refer [Microsoft Documentation](https://docs.microsoft.com/en-us/azure/synapse-analytics/sql-data-warehouse/sql-data-warehouse-tables-partition)
