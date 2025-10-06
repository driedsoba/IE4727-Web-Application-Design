# PHP Notes


## Introduction to PHP
- Server-side scripting language
- case-sensitive
- Interpreted at web server, dynamically generates HTML
- Stands for PHP Hypertext Preprocessor


## Introduction to MySQL
- multiuser, multithreaded server
- open-source relational database management system (RDBMS)
- data stored in tables with rows and columns

## PHP and MySQL
- PHP can connect to MySQL databases to add, modify, and delete data
- PHP + MySQL are cross-platform

## Embedding PHP in HTML
- PHP code is embedded within HTML using `<?php ... ?>` tags
- PHP code is executed on the server, and the result is sent to the client's browser as plain HTML
- Any text between tags is interpreted by web server as PHP, any text outside these tags is treated as normal HTML

## Four styles of PHP tags
``` php
// XML style
<?php echo "Hello World!"; ?>

// Short style, need to enable short_open_tag in php.ini
<? echo "Hello World!"; ?>

// Script style
<script language="php"> 
  echo "Hello World!"; 
</script>

// ASP style need to enable asp_tags in php.ini
<% echo "Hello World!"; %>
```

## PHP Syntax
- Statements end with a semicolon `;`
- Comments can be single-line (`//` or `#`) or multi-line (`/* ... */`)
- Variables start with a dollar sign `$` and are case-sensitive
- Data types include strings, integers, floats, booleans, arrays, objects, and NULL
### Dynamic content example
``` php
// built-in date() function
<?php 
  echo "<p>Order processed at";
  echo date('H:i, jS F Y');
  echo "</p>";
?>
// concatentation operator `.`
<?php
echo "<p>Order processed at " . date('H:i, jS F Y') . "</p>";
?>
```
### Accessing Form variables
``` php
// Three ways of accessing form data via variables
$tireqty // short style requires register_globals = On, deprecated
$_POST['tireqty'] // medium style, PREFERRED
$HTTP_POST_VARS['tireqty'] // long style, deprecated
```
- Data in tireqty will be stored in $_POST['tireqty'] if the form method is POST and in $_GET['tireqty'] if the form method is GET.
- POST hides data from URL, GET appends data to URL
- Both cases, data available in $REQUEST['tireqty']

- Example of declaring PHP variables
``` php
<?php
  $tireqty = $_POST['tireqty'];>
  $oilqty = $_POST['oilqty'];
  $sparkqty = $_POST['sparkqty'];
?>
```

### True String literals
- Single quoted strings are true string literals.
- String concatenation operator is a period `.`.
```php
echo $tireqty . 'tires<br />';
echo "$tireqty . tires<br />"; // WRONG, will not work
"$tireqty.tires<br />" // sends "$tireqty.tires<br />" to browser
```

### Special types
- NULL: variable with no value, use `is_null()` to check
- Resource is external variable, e.g. database connection
- PHP variables are loosely typed, type is determined by value assigned to it

### Constants
- Defined using `define()` function
- Constant does not have $
``` php
define("TIREPRICE", 100);
define("OILPRICE", 10);
define("SPARKPRICE", 4);
```

### Variables scope
- Built in superglobal variables visible everywhere
- Constants visible everywhere
- Global variables declared outside function are visible throughout script but not inside functions
- Variables declared inside function as static are invisible from outside but keep their value between function calls

### Operators
- Execution operator is backtick ``
```php
  # php attempts to execute what's between backticks as a command at the server's command line
  $result = `ls -l`;
  echo "<pre>$result</pre>";
```

### Multidimensional arrays
- to store data in a table format
``` php
  $products = array(
    array("Tires", 100),
    array("Oil", 10),
    array("Spark Plugs", 4)
  );
  echo $products[0][0]; // Tires
  echo $products[0][1]; // 100
  ```
- to display content of this array
``` php
  for ($row = 0; $row < 3; $row++) {
    echo "<p><b>Row number $row</b></p>";
    echo "<ul>";
    for ($col = 0; $col < 2; $col++) {
      echo "<li>" . $products[$row][$col] . "</li>";
    }
    echo "</ul>";
  }
```

### Pass by value vs pass by reference
- By default, PHP passes arguments by value
- To pass by reference, use `&` before the argument in function definition
``` php
# pass by value
function addone($value) {
  $value++;
}

function addone(&$value) {
  $value++;
}
```