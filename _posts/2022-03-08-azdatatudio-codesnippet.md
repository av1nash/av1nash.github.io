---
title: Azure Data Studio - Code snippets
date: 2022-03-08 22:48:00
toc: false
comments: true
excerpt: "Azure data studio code snippets to increase your productivity"
tags: ["Azure Data Studio","SQL"]
categories: ["blog"]
---
Azure Data Studio is a cross-platform IDE to work with (mostly) data platforms in the Microsoft ecosystem.

At the time of writing, it supports connections to following data sources:
* MS SQL Server
* Azure SQL Database
* Azure Synapse Analytics
* PostgreSQL (requires extension)
* Oracle (requires extension)

My work requires me to work a lot on Azure Synapse Analytics and even though there is a web ide to query Synapse, I prefer a desktop based IDE because of the customizations which makes things easier for me. One such customization is **[Code Snippet](https://docs.microsoft.com/en-us/sql/azure-data-studio/code-snippets?view=azure-sqldw-latest)**.

Some code snippets come out of the box and you can access them from a new query window by typing the keyword sql and selecting the desired snippet.

But you can also create your own custom sql code snippets. Follow these steps to create a custom sql code snippet:

1. Open command palette (Shortcut: **Ctrl + Shift + P**)
2. Type and select **Preferences: Configure User Snippets**
3. Select **SQL** in the Select Language for Snippet dialog box.
4. Add your custom code inside the curly braces. You can copy the following content as is and replace it with the existing content of sql.json file on your machine.

```json
{
	"Select top 10": {
		"prefix": "sqlSelectTop",
		"body": "SELECT TOP 10 * FROM ${1:ObjectName}",
		"description": "Select top 10 rows from a table"
		},
	"Select Row Count": {
			"prefix": "sqlSelectRowCount",
			"body": "SELECT COUNT(*) FROM ${1:ObjectName}",
			"description": "Select row count"
			},
	"Select View Definition": {
			"prefix": "sqlViewDefintion",
			"body": ["SELECT definition, uses_ansi_nulls, uses_quoted_identifier, is_schema_bound", 
			"FROM sys.sql_modules  WHERE object_id = OBJECT_ID('${1:SchemaName}.${2:ViewName}')"],
			"description": "Select view defintion"
			}
}
```
Another handy shortcut related to intellisense, if in a new query window you are not getting intellisense or its lagging i.e. not showing a recent change in the database. Try these steps to fix it:

1. Open command palette (Shortcut: **Ctrl + Shift + P**)
2. Type and select **Refresh Intellisense Cache**
3. Sometimes after executing # 2, you are still not able to make intellisense work as expected. Try these additional steps to fix that:
 * Open command palette (Shortcut: **Ctrl + Shift + P**)
 * Type and select **Developer: Reload Window**
 * Open a new query editor

