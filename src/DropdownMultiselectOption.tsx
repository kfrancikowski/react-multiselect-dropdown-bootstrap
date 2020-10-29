import * as React from 'react';
import { ChangeEvent } from 'react';

interface Option {
  key: string;
  label: string;
}

interface IProps<T> {
  name: string;
  onChange?: (value: (Option | T | string)[]) => void;
  setSelected: (selected: (Option | T | string)[]) => void;
  options: (Option | T | string)[];
  selected: (Option | T | string)[];
  getOptionKey?: (value: Option | T | string) => string;
  getOptionLabel?: (value: Option | T | string) => string;
}

class DropdownMultiselectOptionComponent<T> extends React.Component<IProps<T>> {
  render(): JSX.Element {
    const { options, name, selected } = this.props;
    return (
      <>
        {options &&
          (options as (Option | T | string)[]).map((option: Option | T | string, index: number) => {
            return (
              <div key={index} className="dropdown-item">
                <div className="form-check">
                  <input
                    value={this.getKey(option)}
                    id={`multiselect-${name}-${index}`}
                    className="form-check-input"
                    type="checkbox"
                    name={`${name}`}
                    onChange={(event) => this.handleChange(event, option)}
                    checked={selected.findIndex(opt => this.getKey(opt) === this.getKey(option)) > -1}
                  />
                  <label
                    className="form-check-label"
                    style={{ userSelect: 'none', width: '100%' }}
                    htmlFor={`multiselect-${name}-${index}`}
                  >
                    {this.getValue(option)}
                  </label>
                </div>
              </div>
            );
          })}
      </>
    );
  }

  private handleChange = (event: ChangeEvent<HTMLInputElement>, option: any): void => {
    const { onChange, selected, setSelected } = this.props;
    const currentSelected = [...selected];

    if (event.currentTarget.checked) {
      currentSelected.push(option);
    } else {
      const index = currentSelected.indexOf(option);
      currentSelected.splice(index, 1);
    }

    setSelected(currentSelected);

    if (onChange !== undefined) {
      onChange(currentSelected);
    }
  };

  private getKey = (value: Option | T | string): string => {
    const { getOptionKey } = this.props;

    if (getOptionKey) {
      return getOptionKey(value);
    }

    if (typeof value === 'string') {
      return value as string;
    }

    return (value as Option).key ? (value as Option).key : '';
  };

  private getValue = (value: Option | T | string): string => {
    const { getOptionKey } = this.props;

    if (getOptionKey) {
      return getOptionKey(value);
    }

    if (typeof value === 'string') {
      return value as string;
    }

    return (value as Option).label ? (value as Option).label : '';
  };
}

export const DropdownMultiselectOption = DropdownMultiselectOptionComponent;
