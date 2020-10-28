import * as React from 'react';
import { ChangeEvent } from 'react';
import { Option } from './index';

interface IProps {
  name: string;
  onChange?: any;
  options: Option[];
  selected: Option[];
}

class DropdownMultiselectOptionComponent extends React.Component<IProps> {
  render(): JSX.Element {
    const { options, selected, name } = this.props;
    return (
      <>
        {options.map((option, index) => {
          return (
            <div key={index} className="dropdown-item">
              <div className="form-check">
                <input
                  value={option.key}
                  id={`multiselect-${name}-${index}`}
                  className="form-check-input"
                  type="checkbox"
                  name={`${name}[]`}
                  onChange={this.handleChange}
                  checked={selected.find((select) => select.key === option.key) !== undefined}
                />
                <label
                  className="form-check-label"
                  style={{ userSelect: 'none', width: '100%' }}
                  htmlFor={`multiselect-${name}-${index}`}
                >
                  {option.label}
                </label>
              </div>
            </div>
          );
        })}
      </>
    );
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    const { selected, onChange } = this.props;
    const currentSelected: any = [...selected];

    if (event.currentTarget.checked) {
      currentSelected.push(event.currentTarget.value);
    } else {
      const index = currentSelected.indexOf(event.currentTarget.value);
      currentSelected.splice(index, 1);
    }

    // update the state with the new array of options
    this.setState({ selected: currentSelected });

    if (onChange !== undefined) {
      onChange(currentSelected);
    }
  };
}

export const DropdownMultiselectOption = DropdownMultiselectOptionComponent;
