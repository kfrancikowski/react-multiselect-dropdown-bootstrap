import React from "react";
import PropTypes from "prop-types";

class DropdownMultiselect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      placeholder: this.props.placeholder,
      showDropdown: false,
      selected: this.props.selected,
      options: [],
    };
  }

  setSelected() {}

  setOptions() {
    if (this.props.options.length == 0) {
      console.log("React Dropdown Multiselect Error: options array is empty.");
      return;
    }

    let optionsArray = [];
    if (typeof this.props.options[0] === "object") {
      this.props.options.map((value, index) => {
        let key = value[this.props.optionKey];
        let label = value[this.props.optionLabel];

        optionsArray.push({ key: key, label: label });
      });
    } else if (typeof this.props.options[0] === "string") {
      this.props.options.map((value) => {
        optionsArray.push({ key: value, label: value });
      });
    }

    this.setState({
      options: optionsArray,
    });
  }

  componentDidMount() {
    this.setOptions();
    document.addEventListener("mousedown", this.handleClickOutside.bind(this));
  }

  handleClickOutside(ev) {
    if (
      this.state.showDropdown !== false &&
      this.node.contains(ev.target) == false
    ) {
      this.setState({
        showDropdown: false,
      });
    }
  }

  getPlaceholderValue() {
    if (this.state.selected.length == 0) {
      return this.props.placeholder;
    }

    if (
      this.props.placeholderMultipleChecked !== null &&
      this.state.selected.length > 1
    ) {
      return this.props.placeholderMultipleChecked;
    } else {
      let currentOptions = [...this.state.options];

      if(currentOptions.length == 0) {
        return this.props.placeholder;
      }

      let selectedLabels = [];
      let optionKey = this.props.optionKey;
      
      this.state.selected.map((row) => {
        let foundOption = currentOptions.find((option) => {
          return option['key'] == row;
        });

        selectedLabels.push(foundOption.label);
      });

      return selectedLabels.join(", ");
    }
  }

  componentWillUnmount() {
    document.removeEventListener(
      "mousedown",
      this.handleClickOutside.bind(this)
    );
  }

  handleClick() {
    this.setState({
      showDropdown: !this.state.showDropdown,
    });
  }

  handleChange(ev) {
    if(ev.currentTarget === undefined) {
      return;
    }
    
    var currentSelected = [...this.state.selected];
    let value = ev.currentTarget.value;
    
    if (ev.currentTarget.checked) {
      currentSelected.push(value);
    } else {
      var index = currentSelected.indexOf(value);
      currentSelected.splice(index, 1);
    }

    // update the state with the new array of options
    this.setState({ selected: currentSelected });

    this.props.handleOnChange !== undefined
      ? this.props.handleOnChange(currentSelected)
      : null;
  }

  handleSelectDeselectAll() {
    if (this.state.selected.length == this.state.options.length) {
      this.setState({ selected: [] });

      this.props.handleOnChange !== undefined
        ? this.props.handleOnChange([])
        : null;
    } else {
      let allOptions = this.state.options;

      let newSelected = [];

      allOptions.map((obj) => {
        newSelected.push(obj.key.toString());
      });

      this.setState({ selected: newSelected });

      this.props.handleOnChange !== undefined
        ? this.props.handleOnChange(newSelected)
        : null;
    }
  }
  render() {
    const dropdownClass =

    this.state.showDropdown == true ? "dropdown-menu show" : "dropdown-menu";

    return (
      <div className="dropdown" ref={(node) => (this.node = node)}>
        <button
          className={`btn dropdown-toggle ${this.props.buttonClass}`}
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={() => this.handleClick()}
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
            {this.getPlaceholderValue()}
          </span>
        </button>
        <div className={dropdownClass} style={{ padding: 0, width: "100%" }}>
          {this.props.showSelectToggle === true && (
            <div className="btn-group btn-group-sm btn-block">
              <button
                className="actions-btn btn btn-light"
                onClick={() => this.handleSelectDeselectAll()}
              >
                {this.props.selectDeselectLabel}
              </button>
            </div>
          )}

          {this.state.options.map((option, index) => {
            return (
              <div key={index} className="dropdown-item">
                <div className="form-check">
                  <input
                    value={option.key}
                    id={`multiselect-${this.props.name}-${index}`}
                    className="form-check-input"
                    type="checkbox"
                    name={`${this.props.name}[]`}
                    onChange={(ev) => this.handleChange(ev)}
                    checked={
                      this.state.selected.indexOf(option.key.toString()) > -1
                        ? "checked"
                        : ""
                    }
                  />
                  <label
                    className="form-check-label"
                    style={{ userSelect: "none", width: "100%" }}
                    htmlFor={`multiselect-${this.props.name}-${index}`}
                  >
                    {option.label}
                  </label>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
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
