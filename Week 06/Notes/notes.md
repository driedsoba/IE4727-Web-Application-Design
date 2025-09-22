## Javascript
- Not strictly object-oriented
- Case Sensitive
- Interpreted by browser at client side
- Dynamically typed
- Variables can be implicitly or explicitly declared, eg. var sum = 0 and today = "monday"
- 

### Two Ways of embedding in HTML
```
    <script type = "text/javaScript">
    -- JavaScript script –-
    </script>

    OR

    <script type="text/javaScript” src=“myScript.js”>
```
### HTML Events
- onchange, HTML element changed
- onclick user clicks HTML element
- onkeydown, user pushes keyboard key
- onload, browser finished loading the page

### Form Events
- **onblur** The event occurs when a form element loses focus
- **onchange** The event occurs when an element in the form  changed value
- **onfocus** The event occurs when an element gets focus
- **onfocusin** The event occurs when an element is about to get focus
- **onfocusout** The event occurs when an element is about to lose focus
- **oninput** The event occurs when an element gets user input
- **onreset** The event occurs when a form is reset
- **onsubmit** The event occurs when a form is submitted


## DOM
- HTML DOM constructed as tree of Objects (array of nodes)
- All nodes in tree can be accessed by .js
- Root object in .js is *Object*
- An **Object** has *property* and *method*
- Js model for HTML document is the **Document** object, which has method *write* dynamically creating content
- Browser display window is **Window** object, two properties *document* and *window*
```javascript
// Access using address reference
document.forms[0].elements[0]
// Using name reference
document.myForm.myText
// DOM Methods
// Using id reference
document.getElementById("myText")
// Using tag name reference
document.getElementsByTagName("input")
// Using class name reference
document.getElementsByClassName("inputClass")
```

### Window Object
- Three methods for creating dialog boxes: 'alert', 'confirm', 'prompt'


### Control Statements
- Three types of Control expressions: Primitive, Relational, Compound
- P: if string true unless empty or "0". R: ==, !=, <, >, <=, >=, C: &&, ||, !
- Switch statements containing control expressions


### Functions as Constructors
```javascript
function plane(newMake, newModel) {
    this.make = newMake;
    this.model = newModel;
}
// Usage
myPlane = new plane("Cessna", "Centurion");

// Object Creation
var myObject = new Object();

// Adding Properties
myObject.make = "example property";

// Access Property
var property1 = myObject["make"];

// Js Core Objects
var now = new Date();
var now1 = new Array();
var sum = new Function(arguments, statements;)
```

### Regex
- Two ways, 1. RegExp Objects 2. Using method on String objects (Search(), match(), replace(), split())
- Two categories of characters: \ | ( ) [ ] { } ^ $ * + ? .
- **period is a special metacharacter** - it matches any character except
newline
```javascript
// two ways to create regex objects

// literal way, where options are i(ignore case), g(global search for all occurrences), m(match over multiple lines)
var variable_name = /regular_expression/options;

// constructor way
var variable_name = new RegExp("regular_expression", "options");
```
