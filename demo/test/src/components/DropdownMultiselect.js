import React, {useEffect, useRef, useState} from "react";
import PropTypes from "prop-types";

const DropdownMultiselect = (props) => {
  
  const [showDropdown, setShowDropdown] = useState(false);
  const [options, setOptions]           = useState([]);
  const [selected, setSelected]         = useState([]);
  const node                            = useRef(null);

  const handleClickOutside = (ev) => {
    if (showDropdown !== false &&
      node.current.target == ev.target
    ) {
      setShowDropdown(false);
    }
  }
  const handleClick = () => {
    setShowDropdown(!showDropdown);
  }
  const handleChange = (ev) =>  {
    if(ev.currentTarget === undefined) {
      return;
    }
    
    var currentSelected = [...selected];
    let value = ev.currentTarget.value;
    
    if (ev.currentTarget.checked) {
      currentSelected.push(value);
    } else {
      var index = currentSelected.indexOf(value);
      currentSelected.splice(index, 1);
    }

    // update the state with the new array of options
    setSelected(currentSelected);
   
    if(props.handleOnChange !== undefined) {
      props.handleOnChange(currentSelected)
    }
  }
  const getPlaceholderValue = () => {
    if (selected.length == 0) {
      return props.placeholder;
    }

    if (
      props.placeholderMultipleChecked !== null &&
      selected.length > 1
    ) {
      return props.placeholderMultipleChecked;
    } else {
      let currentOptions = [...options];

      if(currentOptions.length == 0) {
        return props.placeholder;
      }

      let selectedLabels = [];
      let optionKey = props.optionKey;
      
      selected.map((row) => {
        let foundOption = currentOptions.find((option) => {
          return option['key'] == row;
        });

        selectedLabels.push(foundOption.label);
      });

      return selectedLabels.join(", ");
    }
  }
  const handleSelectDeselectAll = () => {
    if (selected.length == options.length) {
      setSelected([]);
      if(props.handleOnChange) {
        props.handleOnChange([]);
      }
    } else {
      let allOptions = options;

      let newSelected = [];

      allOptions.map((obj) => {
        newSelected.push(obj.key.toString());
      });

      setSelected(newSelected);
      if(props.handleChange) {
        props.handleOnChange(newSelected)
      }
    }
  }

  useEffect(() => {

    console.log(JSON.stringify(props));
    //setOptions();
      document.addEventListener("mousedown", handleClickOutside);

      return function cleanup() {
        document.removeEventListener(
          "mousedown",
          handleClickOutside
        );
      }
  }, [])

  useEffect(() => {
    if(!props)
      return;

    if (props.options.length == 0) {
      console.error("React Dropdown Multiselect Error: options array is empty.");
      return;
    }

    let optionsArray = [];
    if (typeof props.options[0] === "object") {
      props.options.map((value, index) => {
        let key = value[props.optionKey];
        let label = value[props.optionLabel];

        optionsArray.push({ key: key, label: label });
      });
    } else if (typeof props.options[0] === "string") {
      props.options.map((value) => {
        optionsArray.push({ key: value, label: value });
      });
    }

    setOptions(optionsArray);

  }, [props.options])

  return (
    <div className="dropdown" ref={node}>
        <button
          className={`btn dropdown-toggle ${props.buttonClass}`}
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => handleClick()}
          style={{
            width: "100%",
            overflow: "hidden",
          }}
        >
          <span
            style={{
              overflow: "hidden",
              textOverflow: "ellipsis",
              width: "100%",
              float: "left",
              textAlign: "left",
              paddingRight: "6px",
              marginRight: "-6px",
            }}
          >
            {getPlaceholderValue()}
          </span>
        </button>
        <div className={showDropdown == true ? "dropdown-menu show" : "dropdown-menu"} style={{ padding: 0, width: "100%" }}>
          {props.showSelectToggle === true && (
            <div className="btn-group btn-group-sm btn-block">
              <button
                className="actions-btn btn btn-light"
                onClick={() => handleSelectDeselectAll()}
              >
                {props.selectDeselectLabel}
              </button>
            </div>
          )}

          {options.map((option, index) => {
            return (
              <div key={index} className="dropdown-item">
                <div className="form-check">
                  <input
                    value={option.key}
                    id={`multiselect-${props.name}-${index}`}
                    className="form-check-input"
                    type="checkbox"
                    name={`${props.name}[]`}
                    onChange={(ev) => handleChange(ev)}
                    checked={
                      selected.indexOf(option.key.toString()) > -1
                        ? "checked"
                        : ""
                    }
                  />
                  <label
                    className="form-check-label"
                    style={{ userSelect: "none", width: "100%" }}
                    htmlFor={`multiselect-${props.name}-${index}`}
                  >
                    {option.label}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
  )
}

DropdownMultiselect.propTypes = {
  buttonClass: PropTypes.string,
  selected: PropTypes.array,
  value: PropTypes.array,
  placeholder: PropTypes.string,
  selectDeselectLabel: PropTypes.string,
  placeholderMultipleChecked: PropTypes.string,
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
  showSelectToggle: PropTypes.bool,
  optionKey: PropTypes.string,
  optionLabel: PropTypes.string,
};

DropdownMultiselect.defaultProps = {
  placeholder: "Nothing selected",
  selectDeselectLabel: "Select/Deselect All",
  buttonClass: "btn-light",
  placeholderMultipleChecked: null,
  selected: [],
  showSelectToggle: true,
  optionKey: 'key',
  optionLabel: 'label',
};

export default DropdownMultiselect;
