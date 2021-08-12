var store = [{
        "title": "Partitioning table in Azure Synapse",
        "excerpt":"My take on official Microsoft Documentation Table Partition Enables you to divide data into smaller groups of data. Mostly created on a date column. Supported on all table types: clustered columnstore clustered index heap Supported on all distribution types: hash round robin Can be done on one column only. Benefits...","categories": ["blog"],
        "tags": ["Azure Synapse","Database","Partitioning"],
        "url": "/blog/sql-table-partitions/",
        "teaser": null
      },{
        "title": "Azure Synapse - Split Partition",
        "excerpt":"The setup Elaborating on official Microsoft documentation Let’s start with a partitioned table - src_tbl CREATE TABLE src_tbl ( order_id INT, order_date DATE, order_qty INT ) WITH (CLUSTERED COLUMNSTORE INDEX, DISTRIBUTION = HASH(order_id) ,PARTITION (order_date RANGE RIGHT FOR VALUES('2006-01-01','2007-01-01')) ) Now lets assume that we have new rows coming into...","categories": ["blog"],
        "tags": ["Azure Synapse","Partitioning"],
        "url": "/blog/partition-splitting/",
        "teaser": null
      }]
