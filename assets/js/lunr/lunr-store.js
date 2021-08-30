var store = [{
        "title": "Remove hidden characters from a database table",
        "excerpt":"When working with large text fields (usually coming from fields which allow users to enter free text in front end or email body etc.) it is possible to encounter data which has invisible characters. These characters could be invisible to your eyes in management studio while querying or even to...","categories": ["blog"],
        "tags": ["T-SQL","Database"],
        "url": "/blog/t-sql-remove-hidden-characters/",
        "teaser": null
      },{
        "title": "Regex to remove html tags",
        "excerpt":"I was working on a problem which required some string data cleanup, the string I was working with had categorical values of survey response - satisfied, dissatisfied, very satisfied etc. but with html tags embedded in the string. &lt;img src=\"https://organization123.surveycompany.com/CP/Graphic.php?IM=ABC\" style=\"width: 41px; height: 39px;\"&gt;&lt;/img&gt;&lt;br&gt;Very Satisfied I was only interested in...","categories": ["blog"],
        "tags": ["regex","python","pandas"],
        "url": "/blog/regex-removing-html-tags/",
        "teaser": null
      },{
        "title": "Partitioning tables in Azure Synapse",
        "excerpt":"Table Partition Enables you to divide data into smaller groups of data. Mostly created on a date column. Supported on all table types: clustered columnstore clustered index heap Supported on all distribution types: hash round robin Can be done on one column only. Benefits Load operations When leveraging partitions to...","categories": ["blog"],
        "tags": ["Azure Synapse","Database","Partitioning"],
        "url": "/blog/sql-table-partitions/",
        "teaser": null
      },{
        "title": "Partition splitting in Azure Synapse",
        "excerpt":"The setup Elaborating on official Microsoft documentation Let’s start with a partitioned table - src_tbl CREATE TABLE src_tbl ( order_id INT, order_date DATE, order_qty INT ) WITH (CLUSTERED COLUMNSTORE INDEX, DISTRIBUTION = HASH(order_id) ,PARTITION (order_date RANGE RIGHT FOR VALUES('2006-01-01','2007-01-01')) ) Now lets assume that we have new rows coming into...","categories": ["blog"],
        "tags": ["Azure Synapse","Partitioning"],
        "url": "/blog/partition-splitting/",
        "teaser": null
      }]
