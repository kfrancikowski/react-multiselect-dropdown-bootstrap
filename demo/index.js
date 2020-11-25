import React from "react";
import DropdownMultiselect from "./../src/index";

const options = [
  { key: 1, label: "Potatoes" },
  { key: 2, label: "Apples" },
  { key: 3, label: "Bananas" },
  { key: 4, label: "Mango" },
];

const optionsSimple = ["Potatoes", "Apples", "Bananas", "Mango"];

const Demo = () => (
  <>
    <DropdownMultiselect options={options} name="example1" />
    <DropdownMultiselect options={optionsSimple} name="example2" />
  </>
);
