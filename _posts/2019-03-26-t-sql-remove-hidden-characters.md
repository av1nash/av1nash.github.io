---
title: Remove hidden characters from a database table
date: 2019-03-26T00:00:01-05:00
toc: false
comments: true
classes: wide
tags: ["T-SQL","Database"]
excerpt: "How to find and remove hidden characters from a database table"
categories: ["blog"]
---
When working with large text fields (usually coming from fields which allow users to enter free text in front end or email body etc.) it is possible to encounter data which has invisible characters.
These characters could be invisible to your eyes in management studio while querying or even to certain functions like - LTRIM, RTRIM or in a predicate condition like -
```sql
WHERE([ColumnName]) <> ''
```

You can try a brute force method to resolve this by replacing commonly occuring invisible characters like -

| Character | ASCII Value |
| :----------|:-------------|
| Line Feed | 10 |
| Carriage Return | 13 |
| Horizontal Tab | 9 |
| Non-breaking space | 160 |

You can read more about it here: [ASCII character list](https://en.wikipedia.org/wiki/ASCII)

To replace you can use this pattern:
```sql
REPLACE(CAST([columnname] AS VARCHAR(max)),CHAR(10),'')
```
You can keep on adding more Replace statements as required in your case.

**Warning:** Please be aware that if [columnname] is large in size, your query performance will degrade.
