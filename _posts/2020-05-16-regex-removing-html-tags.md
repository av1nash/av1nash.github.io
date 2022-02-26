---
title: Regex to remove html tags
date: 2020-05-16 00:13:12
toc: false
comments: true
tags: ["regex","python","pandas"]
excerpt: "How to use regex to remove html tags from a string"
categories: ["blog"]
---

I was working on a problem which required some string data cleanup, the string I was working with had categorical values of survey response - satisfied, dissatisfied, very satisfied etc. but with html tags embedded in the string.

```html
<img src="https://organization123.surveycompany.com/CP/Graphic.php?IM=ABC" style="width: 41px; height: 39px;"></img><br>Very Satisfied
```

I was only interested in the user rating part and wanted to get rid of all the html tags. In this quest to remove html tags I stumbled upon some very helpful stackoverflow posts which used regular expressions to remove html tags. I chose one such regex and it worked like a charm.

```python
<[^<]+?>
```

I know the basics of regular expression but I still didn't understand the two symbols towards the end of this expression so I searched again to find out what this expression is doing and found a great [website](https://www.regextester.com/) where you can not only build your expression and find the meaning of each component of your expression but also test it.

Here is my breakdown of how this regular expression is able to match all html tags:

| Character | Meaning                                                                                                                                  |
|-----------|------------------------------------------------------------------------------------------------------------------------------------------|
| <         | Matches character "<"                                                                                                                    |
| [^<]      | Negated set - matches any character that is not in the set.                                                                     |
| +         | Matches one or more of the preceding token                                                                                               |
| ?         | If used immediately after any of the quantifiers *, +, ?, or {}, makes the quantifier non-greedy (matching the minimum number of times). |

I was using python to do this transformation and this data was in a pandas dataframe, so I used the **pandas.Series.str.replace** to perform the complete operation.

```python
# Replace all html tags with blank from surveyAnswer column in dataframe df.
# regex=True is the default so you can choose not to explicitly specify it.
df["surveyAnswer"] = df["surveyAnswer"].str.replace('<[^<]+?>','',regex=True)
```
