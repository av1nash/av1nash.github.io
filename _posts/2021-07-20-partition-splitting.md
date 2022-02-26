---
title: Partition splitting in Azure Synapse
date: 2021-07-20 18:42:19
toc: true
comments: true
classes: wide
excerpt: "Visual explanation of partition splitting in Azure Synapse (SQL data warehouse)"
tags: ["Azure Synapse","Partitioning"]
categories: ["blog"]
---

# The setup 
Elaborating on official [Microsoft documentation](https://docs.microsoft.com/en-us/azure/synapse-analytics/sql-data-warehouse/sql-data-warehouse-tables-partition#how-to-split-a-partition-that-contains-data)


Let's start with a partitioned table - src_tbl
```sql
CREATE TABLE src_tbl (
  order_id INT,
  order_date DATE,
  order_qty INT
)
WITH 
(CLUSTERED COLUMNSTORE INDEX,
DISTRIBUTION = HASH(order_id)
,PARTITION (order_date RANGE RIGHT FOR VALUES('2006-01-01','2007-01-01'))
)
```
![](https://i.imgur.com/slkvnFi.png)

Now lets assume that we have new rows coming into our table and we want to split the partition to accomodate them for better performance.
![](https://i.imgur.com/RwnvqDi.png)

We issue the SPLIT range command, like so:

```sql
ALTER TABLE src_tbl SPLIT RANGE ('2008-01-01')
```
But it fails with this error message:

>SPLIT clause of ALTER PARTITION statement failed because the partition is not empty.  Only empty partitions can be split in when a columnstore index exists on the table. Consider an ALTER TABLE SWITCH operation from one of the nonempty partitions on table 'Table_8909ageg2b31453daaa3a19af7db605f_47' to a temporary staging table and then re-attempt the ALTER PARTITION SPLIT operation. Once completed, use ALTER TABLE SWITCH to move the staging table partition back to the original source table.

It's clear that SQL server engine will not allow us to split partition when it is not empty, in this case we can see that partition # 3 is not empty and hence cannot be split.

To get around this problem we follow these steps in order:

# Partition Splitting

## 1. Create a table with same partition scheme as original table
```sql
CREATE TABLE dbo.stg_tbl_par_sync
    WITH    (   DISTRIBUTION = HASH(order_id)
            ,   CLUSTERED COLUMNSTORE INDEX
            ,   PARTITION (order_date RANGE RIGHT FOR VALUES('2006-01-01','2007-01-01'))
            )
AS
SELECT *
FROM    src_tbl
WHERE   1=2
;
```
![](https://i.imgur.com/nsb1Oj7.png)

## 2. Move data from the partition you want to eventually split
Since the table we created in step 1 has same partition boundaries as our original table, we can do a switch to move data out of original table and into this replicated table.
```sql
ALTER TABLE src_tbl SWITCH PARTITION 3 to src_tbl_par_sync PARTITION 3
```
![](https://i.imgur.com/4so5oqE.png)

Now that partition # 3 is empty in src_tbl, we can split it - 
```sql
ALTER TABLE src_tbl SPLIT RANGE ('2008-01-01')
```

## 3. Create a new table with new partition boundaries
We need to switch in the data we switched out from the original table but to do that we need to have a table which aligns with the new partition boundaries, so we create one - 
```sql

CREATE TABLE dbo.src_tbl_par_sync_new
    WITH    (   DISTRIBUTION = HASH(order_id)
            ,   CLUSTERED COLUMNSTORE INDEX
            ,   PARTITION (order_date RANGE RIGHT FOR VALUES('2006-01-01','2007-01-01','2008-01-01'))
            )
AS
SELECT *
FROM    src_tbl_par_sync
WHERE order_date >= '2007-01-01'
AND order_date <'2008-01-01'
;
```
![](https://i.imgur.com/dbSy7mK.png)



## 4. Switch in data back to original table
This is the final step, where you switch in the data into original table.
```sql
ALTER TABLE src_tbl_par_sync_new SWITCH PARTITION 4 TO src_tbl PARTITION 4
```

![](https://i.imgur.com/IBi5Uxd.png)

## 5. Cleanup
You can now drop the dummy tables you created to perform partition splitting
