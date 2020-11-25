import React from "react";
import DropdownMultiselect from "./../src/index";

const options = [
  { value: 1, label: "Potatoes" },
  { value: 2, label: "Apples" },
  { value: 3, label: "Bananas" },
  { value: 4, label: "Mango" },
];

const optionsSimple = ["Potatoes", "Apples", "Bananas", "Mango"];

const Demo = () => (
  <>
    <DropdownMultiselect options={options} name="example1" />
    <DropdownMultiselect options={optionsSimple} name="example2" />
  </>
);
