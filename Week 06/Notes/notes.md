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
- HTML DOM constructed as tree of Objects
- All nodes in tree can be accessed by .js
- Root object in .js is *Object*
- An **Object** has *property* and *method*
- Js model for HTML document is the **Document** object, which has method *write* dynamically creating content
- Browser display window is **Window** object, two properties *document* and *window*


### Window Object
- Three methods for dialog boxes: 'alert', 'confirm', 'prompt'
-  