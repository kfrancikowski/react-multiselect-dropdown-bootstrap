import React, { useEffect, useState } from "react";
import DropdownMultiselect from "./components/DropdownMultiselect";

const options = [
  { key: 1, label: "Potatoes" },
  { key: 2, label: "Apples" },
  { key: 3, label: "Bananas" },
  { key: 4, label: "Mango" },
];

const options2 = [
  { key: 1, label: "Potatoes" },
  { key: 2, label: "Apples" },
  { key: 3, label: "Bananas" },
  { key: 4, label: "Mango" },
  { key: 5, label: "Mango2" },
  { key: 6, label: "Mango3" },
  { key: 7, label: "Mango4" },
]

const optionsSimple = ["Potatoes", "Apples", "Bananas", "Mango"];

const optionSimple2 = ["Potatoes", "Apples", "Bananas", "Mango", "Mango2", "Mango3"];

const Demo = (props) => {

  const [opt, setOpt] = useState(options);
  const [optS, setOptS] = useState(optionsSimple);
  useEffect( () => {
    setTimeout(() => {
      console.log("Timeout happening...");
      setOpt(options2);
      setOptS(optionSimple2);
    }, 5000)
  },[])

  return (
  <>
    <DropdownMultiselect options={opt} name="example1" />
    <DropdownMultiselect options={optS} name="example2" />
  </>)
};


export default Demo;