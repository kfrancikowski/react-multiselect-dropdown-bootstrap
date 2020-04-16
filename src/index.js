import React from "react";
import PropTypes from "prop-types";

class DropdownMultiselect extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      options: this.props.options,
      placeholder: this.props.placeholder,
      showDropdown: false,
      selected: this.props.selected,
    };
  }

  componentDidMount() {
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
    var currentSelected = [...this.state.selected];

    if (ev.currentTarget.checked) {
      currentSelected.push(ev.currentTarget.value);
    } else {
      var index = currentSelected.indexOf(ev.currentTarget.value);
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
      this.setState({ selected: allOptions });

      this.props.handleOnChange !== undefined
        ? this.props.handleOnChange(allOptions)
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
            {this.state.selected.length > 0
              ? this.state.selected.join(", ")
              : this.props.placeholder}
          </span>
        </button>
        <div className={dropdownClass} style={{ padding: 0, width: "100%" }}>
          <div className="btn-group btn-group-sm btn-block">
            <button
              className="actions-btn btn btn-light"
              onClick={() => this.handleSelectDeselectAll()}
            >
              Select/Deselect All
            </button>
          </div>

          {this.props.options.map((value, index) => {
            return (
              <div key={index} className="dropdown-item">
                <div className="form-check">
                  <input
                    value={value}
                    id={`multiselect-${this.props.name}-${index}`}
                    className="form-check-input"
                    type="checkbox"
                    name={`${this.props.name}[]`}
                    onChange={(ev) => this.handleChange(ev)}
                    checked={
                      this.state.selected.indexOf(value) > -1 ? "checked" : ""
                    }
                  />
                  <label
                    className="form-check-label"
                    style={{ userSelect: "none", width: "100%" }}
                    htmlFor={`multiselect-${this.props.name}-${index}`}
                  >
                    {value}
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
  options: PropTypes.array.isRequired,
  name: PropTypes.string.isRequired,
};

DropdownMultiselect.defaultProps = {
  placeholder: "Nothing selected",
  buttonClass: "btn-light",
  selected: [],
};

export default DropdownMultiselect;
