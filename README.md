# react-multiselect-dropdown-bootstrap

A React.js component to easy create dropdowns that allows multiple option selection.

# Examples

Here is an example with default settings when only an array with options is provided:

![Default settings](https://s6.gifyu.com/images/a6eab38b3456122ba.gif)

# How to install

```
npm install react-multiselect-dropdown-bootstrap
```

Then you need to import it and place somewere in your app. Here is an example for default setup:

```js
import React from "react";
import DropdownMultiselect from "react-multiselect-dropdown-bootstrap";

class SomeSection extends React.Component {
  render() {
    return (
      <DropdownMultiselect
        options={["Australia", "Canada", "USA", "Poland", "Spain", "France"]}
        name="countries"
      />
    );
  }
}

export default SectionTwo;
```

# Available props

## Required

- `options` - an array with available options
- `name` - a string with the name (just like for normal html inputs)

## Optional

- `selected` - an array with options that should be selected as default
- `handleOnChange` - a callback function to run when selected options will be changed. A "selected" param is available. It contains an array of currently selected options. Example:

```js
handleOnChange={(selected) => {
  props.changeMarket(selected);
}}
```

- `placeholder` - default value is "Nothing selected"
- `buttonClass` - you can specify a css class for button. Default is "btn-light"
