# react-dropdown-multiselect
A React.js component to easy create dropdowns that allows multiple option selection.

# Examples
Here is an example with default settings when only an array with options is provided: 

![Default settings](https://s6.gifyu.com/images/a6eab38b3456122ba.gif)

# How to install
```
npm install react-dropdown-multiselect
```

Then you need to import it and place somewere in your app. Here is an example for default setup: 

```js
import React from "react";
import DropdownMultiselect from "bootstrap-multiselect-react";

class SomeSection extends React.Component {
  render() {
    return (
      <DropdownMultiselect
        options={[
          "Australia",
          "Canada",
          "USA",
          "Poland",
          "Spain",
          "France",
        ]}
      ></DropdownMultiselect>
    );
  }
}

export default SectionTwo;
```
