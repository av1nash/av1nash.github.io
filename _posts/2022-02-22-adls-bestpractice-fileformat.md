---
title: ADLS Gen2 Best Practices - File Formats
date: 2022-02-22 21:46:00
toc: true
comments: true
classes: wide
excerpt: "Azure data lake storage gen2 best practices for choosing file formats"
tags: ["Azure Data Lake Storage","Best Practices"]
categories: ["blog"]
---

Azure data lake storage (adls) gen2 supports various file formats. Follow this recommendation from Microsoft while choosing the correct file format for your data operations.

```mermaid
graph TD;
    A[File formats] -->|human readable| B(JSON, CSV, XML);
    A -->|machine readable binary file formats| C(Avro, Parquet, ORC);
    C --> D{Choose File format};
    D -->|Write heavy I/O pattern| E[Avro];
    D -->|Read heavy I/O pattern| F[Parquet and ORC];
```

**Note**

* Machine-readable binary file formats are compressed and have a schema embedded in each file.
* Avro stores data in a row-based format
  * Suited for write heavy I/O patterns
  * Ex: Avro format works well with a message bus such as Event Hub or Kafka that write multiple events/messages in succession.
* Parquet and ORC stores data in a columnar format.
  * Suited for read heavy I/O patterns.
  * Read transactions can be optimized to retrieve specific columns instead of entire record.
