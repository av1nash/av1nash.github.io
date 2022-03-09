---
title: ADLS Gen2 Best Practices - File Formats
date: 2022-02-22 21:46:00
toc: false
comments: true
excerpt: "Azure data lake storage gen2 best practices for choosing file formats"
tags: ["Azure Data Lake Storage","Best Practices"]
categories: ["blog"]
---

Azure data lake storage (adls) gen2 supports various file formats. Follow this recommendation from Microsoft while choosing the correct file format for your data operations.

[![](https://mermaid.ink/img/pako:eNptkMFqg0AQhl9l2FMKht4NFFJNoKWtJZa2oDlM3LEuuLt23Q2I-u5dg5YUOqc5fPPNz9-zQnNiIfsy2FTwFm9yBX622V7UBKU2Em17hPX6bqicRAWGkOOppgHuV49p8hJAlL4H8Pn8dLPcXmiJRSUU_fJwEgpNB-WVd4BotT0bHcArmm9HNoDkEC2eaPJA3EeV1i3BVaBxJuLLpw8jLEFFeO7g4TaBBq0lowbYZZP8-Ac--Dj_sftsjgCo-JTiuGEBk-TfCe776SdJzmxFknIW-pVTia62OcvV6FHXcLS048Jqw8IS65YChs7qtFMFC61xtECxQF-3nKnxB_NwfnQ)](https://mermaid-js.github.io/mermaid-live-editor/edit#pako:eNptkMFqg0AQhl9l2FMKht4NFFJNoKWtJZa2oDlM3LEuuLt23Q2I-u5dg5YUOqc5fPPNz9-zQnNiIfsy2FTwFm9yBX622V7UBKU2Em17hPX6bqicRAWGkOOppgHuV49p8hJAlL4H8Pn8dLPcXmiJRSUU_fJwEgpNB-WVd4BotT0bHcArmm9HNoDkEC2eaPJA3EeV1i3BVaBxJuLLpw8jLEFFeO7g4TaBBq0lowbYZZP8-Ac--Dj_sftsjgCo-JTiuGEBk-TfCe776SdJzmxFknIW-pVTia62OcvV6FHXcLS048Jqw8IS65YChs7qtFMFC61xtECxQF-3nKnxB_NwfnQ)

**Note**

* Machine-readable binary file formats are compressed and have a schema embedded in each file.
* Avro stores data in a row-based format
  * Suited for write heavy I/O patterns
  * Ex: Avro format works well with a message bus such as Event Hub or Kafka that write multiple events/messages in succession.
* Parquet and ORC stores data in a columnar format.
  * Suited for read heavy I/O patterns.
  * Read transactions can be optimized to retrieve specific columns instead of entire record.
