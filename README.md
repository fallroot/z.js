# z.js

Better DOM element builder inspired by [zen-coding].

## Usage

### Type Selector

If type selector is not given, `<div>` element will be used by default.

``` javascript
$z();

$z('h1');
```

Output:

``` html
<div></div>

<h1></h1>
```

### ID Selector

``` javascript
$z('#main');

$z('section#page');
```

Output:

``` html
<div id="main"></div>

<section id="page"></section>
```

### Class Selector

``` javascript
$z('.content');

$z('p.error.critical');
```

Output:

``` html
<div class="content"></div>

<p class="error critical"></p>
```

### Child Selector

``` javascript
$z('div>ul>li');
```

Output:

``` html
<div>
    <ul>
        <li></li>
    </ul>
</div>
```

### Adjacent Sibling Selector

``` javascript
$z('form>p+button');
```

Output:

``` html
<form>
    <p></p>
    <button></button>
</form>
```

### Text Node

``` javascript
$z('p{hello}');
```

Output:

``` html
<p>hello</p>
```

### Attribute Selector

``` javascript
$z("input[name=\"hello\"][type='hidden'][disable][value=test]");
```

Output:

``` html
<input name="hello" type="hidden" disable="disable" value="test" />
```

### All Together

``` javascript
$z('header>h1#title{hello}+p#message.error.critical{oops}');
```

Output:

``` html
<header>
    <h1 id="title">hello</h1>
    <p id="message" class="error critical">oops</p>
</header>
```

[zen-coding]: http://code.google.com/p/zen-coding/