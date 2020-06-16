import React from "react";
import DropdownMultiselect from "./../src/index";

const options = [
  { value: 1, label: "Potatoes" },
  { value: 2, label: "Apples" },
  { value: 3, label: "Bananas" },
  { value: 4, label: "Poland" },
];

const Demo = () => (
  <>
    <DropdownMultiselect options={options} />
  </>
);
