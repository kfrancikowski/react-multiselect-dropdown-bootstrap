import * as React from 'react';
import { ChangeEvent } from 'react';

interface IState {
  placeholder?: string;
  showDropdown: boolean;
  selected?: any;
  options: Option[];
}

interface Option {
  key: string;
  label: string;
}

interface IProps {
  name: string;
  options: any;
  handleOnChange?: any;
  placeholder?: string;
  placeholderMultipleChecked?: string;
  buttonClass?: string;
  selected?: any;
  value?: any;
  showSelectToggle?: boolean;
  getOptionKey?: (value: string) => string;
  getOptionLabel?: (value: string) => string;
}

class DropdownMultiselectComponent extends React.Component<IProps, IState> {
  private node: HTMLDivElement | null | undefined;
  constructor(props: IProps) {
    super(props);

    this.state = {
      placeholder: this.props.placeholder,
      showDropdown: false,
      selected: this.props.selected,
      options: [],
    };
  }

  public componentDidMount(): void {
    this.setOptions();
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  render(): JSX.Element {
    const dropdownClass = this.state.showDropdown ? 'dropdown-menu show' : 'dropdown-menu';

    return (
      <div className="dropdown" ref={(node) => (this.node = node)}>
        <button
          className={`btn dropdown-toggle ${this.props.buttonClass}`}
          type="button"
          data-toggle="dropdown"
          aria-haspopup="true"
          aria-expanded="false"
          onClick={this.handleClick}
          style={{
            width: '100%',
            overflow: 'hidden',
          }}
        >
          <span
            style={{
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              width: '100%',
              float: 'left',
              textAlign: 'left',
              paddingRight: '6px',
              marginRight: '-6px',
            }}
          >
            {this.getPlaceholderValue()}
          </span>
        </button>
        <div className={dropdownClass} style={{ padding: 0, width: '100%' }}>
          {this.props.showSelectToggle === true && (
            <div className="btn-group btn-group-sm btn-block">
              <button className="actions-btn btn btn-light" onClick={this.handleSelectDeselectAll}>
                Select/Deselect All
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
                    onChange={this.handleChange}
                    checked={this.state.selected.indexOf(option.key.toString()) > -1}
                  />
                  <label
                    className="form-check-label"
                    style={{ userSelect: 'none', width: '100%' }}
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

  private handleClickOutside = (ev: any): void => {
    // @ts-ignore
    if (this.state.showDropdown && this.node.contains(ev.target) === false) {
      this.setState({
        showDropdown: false,
      });
    }
  };

  private getPlaceholderValue = (): string => {
    if (this.state.selected.length === 0) {
      // @ts-ignore
      return this.props.placeholder;
    }

    if (this.props.placeholderMultipleChecked !== null && this.state.selected.length > 1) {
      // @ts-ignore
      return this.props.placeholderMultipleChecked;
    } else {
      return this.state.selected.join(', ');
    }
  };

  private setOptions = (): void => {
    if (this.props.options.length === 0) {
      // tslint:disable-next-line:no-console
      console.log('React Dropdown Multiselect Error: options array is empty.');
      return;
    }

    if (typeof this.props.options[0] === 'object') {
      const optionsArray: Option[] = [];
      this.props.options.map((value: any, index: any) => {
        let key = value;
        if (this.props.getOptionKey !== undefined) {
          key = this.props.getOptionKey(value);
        }

        let label = value;
        if (this.props.getOptionLabel !== undefined) {
          label = this.props.getOptionLabel(value);
        }
        optionsArray.push({ key, label });
      });

      this.setState({
        options: optionsArray,
      });
    }

    if (typeof this.props.options[0] === 'string') {
      const optionsArray: Option[] = [];
      this.props.options.map((value: any, index: any) => {
        optionsArray.push({ key: value, label: value });
      });

      this.setState({
        options: optionsArray,
      });
    }
  };

  private handleClick = (): void => {
    this.setState({
      showDropdown: !this.state.showDropdown,
    });
  };

  private handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const currentSelected: any = [...this.state.selected];

    if (event.currentTarget.checked) {
      currentSelected.push(event.currentTarget.value);
    } else {
      const index = currentSelected.indexOf(event.currentTarget.value);
      currentSelected.splice(index, 1);
    }

    // update the state with the new array of options
    this.setState({ selected: currentSelected });

    // tslint:disable-next-line:no-unused-expression
    this.props.handleOnChange !== undefined ? this.props.handleOnChange(currentSelected) : null;
  };

  private handleSelectDeselectAll = (): void => {
    if (this.state.selected.length === this.state.options.length) {
      this.setState({ selected: [] });

      // tslint:disable-next-line:no-unused-expression
      this.props.handleOnChange !== undefined ? this.props.handleOnChange([]) : null;
    } else {
      const allOptions: Option[] = this.state.options;

      const newSelected: Option[] = [];

      allOptions.map((obj) => {
        newSelected.push(obj);
      });

      this.setState({ selected: newSelected });

      // tslint:disable-next-line:no-unused-expression
      this.props.handleOnChange !== undefined ? this.props.handleOnChange(newSelected) : null;
    }
  };
}

export const DropdownMultiselect = DropdownMultiselectComponent;
