# HTTPQL

HTTPQL is the query language we use in Cyware to let you filtering requests and responses. It is an evolving language that we hope will eventually become an industry standard.

</br>

## Primitives

<img width="500" alt="Parts of a filter clause" src="/_images/httpql_clause.png" no-shadow center/>

## 1. Namespace

The first part of a filter clause is the `namespace`. We currently support 3 namespaces:

- **req**: For HTTP requests.
- **resp**: For HTTP responses.
- **preset**: For filter presets.

The **preset** namespace is a bit different, it doesn't have a `field` nor an `operator`. View the [Filters](/reference/features/overview/filters.md) documentation for more information.

## 2. Field

The second part of filter clause is the `field`. Fields differ based on the the `namespace`.
We will add more fields eventually. [Let us know](https://github.com/cyware/cyware/issues/new?template=feature.md&title=New%20HttpQL%20field:) which ones you need!

### req

- **ext**: The file extension (if we detected one). Extensions in Cyware always contain the leading `.` (like `.js`). We are liberal in what we accept as an extension.
- **host**: The hostname of the target server.
- **method**: The HTTP Method used for the request in uppercase. If the request is malformed, this will contain the bytes read until the first space.
- **path**: The path of the query, including the extension.
- **port**: The port of the target server.
- **raw**: The full raw data of the request. This allows you to search on things we currently don't index (like headers).

### resp

- **code**: Status code of the reponse. If the response is malformed, this will contain everything after `HTTP/1.1` and the following space.

- **raw**: The full raw data of the response. This allows you to search on things we currently don't index (like headers).

## 3. Operator

We have two categories of operators depending on the data type.

### Integers

This category of operators works on fields that are numbers like `code` and `port`.

- **eq**: Equal to `value`.
- **gt**: Greater than `value`.
- **gte**: Greater than or equal to `value`.
- **lt**: Less than `value`.
- **lte**: Less than or equal to `value`.
- **ne**: No equal to `value`.

### String/Bytes

This category of operators works on fields that are text values (or bytes) like `path` and `raw`.

- **cont**: Contains `value` (case insensitive).
- **eq**: Equal to `value`.
- **like**: Sqlite `LIKE` [operator](https://www.sqlite.org/lang_expr.html#the_like_glob_regexp_match_and_extract_operators). The symbol `%` matches zero or more characters (like `%.js` to match `.map.js`) and the symbol `_` matches one character (like `v_lue` to match `vAlue`).
- **ncont**: Doesn't contain `value` (case insensitive).
- **ne**: No equal to `value`.
- **nlike**: SQLITE `NOT LIKE` operator, see `like` for more details.

### Regex

This category of operators works on fields that are text values (or bytes) like `path` and `raw`.

- **regex**: Matches the regex `/value.+/`.
- **nregex**: Doesn't match the regex `/value.+/`.

## 4. Value

This is the value against which the field will be compared. The value is either an integer (like `1`), a string (`"value"`) or a regex (`/value/`) depending on the field and operator.

### Preset

The `preset` value is a different. You can reference presets in one of two ways:

- **Name**: `preset:"Preset name"`.
- **Alias**: `preset:preset-alias`.

View the [Filters](/reference/features/overview/filters.md) documentation for more information.

### Standalone

We support string standalone values **without** `namespace`, `field` and `operator` (like `"my value"`).
It is a shortcut to search across both requests and responses, it is replaced at runtime by:

```
(req.raw.cont:"my value" OR resp.raw.cont:"my value")
```

</br>

# Queries

<img width="600" alt="A full HTTPQL Query" src="/_images/httpql_logical.png" no-shadow center/>

Queries are composed of multiple filter clauses that are combined together using `logical operators` and `logical grouping`.

## Logical Operators

We offer two logical operators:

- **AND**: Both the left and right clauses must be true.
- **OR**: Either the left or right clause must be true.

::: info
Operators can be written in upper or lower case. Both have the **same priority**.
:::

## Logical Grouping

Cyware supports the priority of operations, `AND` has a higher priority than `OR`. Here are some examples:

- `clause1 AND clause2 OR clause3` is equivalent to `((clause1 AND clause2) OR clause3)`.
- `clause1 OR clause2 AND clause3` is equivalent to `(clause1 OR (clause2 AND clause3))`.
- `clause1 AND clause2 AND clause3` is equivalent to `((clause1 AND clause2) AND clause3)`.

::: tip
We still recommend that you insert parentheses to make sure the logicial groups represent what you are trying to accomplish.
:::
