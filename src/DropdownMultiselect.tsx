import * as React from 'react';
import { DropdownMultiselectToggleBtn } from './DropdownMultiselectToggleBtn';
import { DropdownMultiselectSelection } from './DropdownMultiselectSelection';
import { DropdownMultiselectOption } from './DropdownMultiselectOption';

interface Option {
  key: string;
  label: string;
}

interface IState<T> {
  showDropdown: boolean;
  selected: (Option | T | string)[];
  isMultiSelectable: boolean;
}

interface IProps<T> {
  name: string;
  options: (Option | T | string)[];
  selected?: (Option | T | string)[];
  isMultiSelectable?: boolean;
  placeholder?: string;
  title?: string;
  placeholderSelect?: string;
  placeholderDeselect?: string;
  buttonClass?: string;
  onChange?: (value: (Option | T | string)[]) => void;
  getOptionKey?: (value: Option | T | string) => string;
  getOptionLabel?: (value: Option | T | string) => string;
}

class DropdownMultiselectComponent<T> extends React.Component<IProps<T>, IState<T>> {
  private node: HTMLDivElement | null | undefined;

  constructor(props: IProps<T>) {
    super(props);
    const { selected, isMultiSelectable } = this.props;
    this.state = {
      showDropdown: false,
      selected: selected ? selected : [],
      isMultiSelectable: isMultiSelectable ? isMultiSelectable : false,
    };
  }

  public componentDidMount(): void {
    document.addEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  public componentWillUnmount(): void {
    document.removeEventListener('mousedown', this.handleClickOutside.bind(this));
  }

  render(): JSX.Element {
    const {
      buttonClass,
      placeholder,
      title,
      placeholderSelect,
      placeholderDeselect,
      name,
      onChange,
      getOptionLabel,
      getOptionKey,
      options,
    } = this.props;
    const { showDropdown, selected, isMultiSelectable } = this.state;
    return (
      <div className="dropdown" ref={(node) => (this.node = node)}>
        <DropdownMultiselectToggleBtn
          onClick={this.onClick}
          showDropdown={showDropdown}
          buttonClass={buttonClass}
          placeholder={placeholder}
          selected={selected}
          title={title}
        />
        <div className={showDropdown ? 'dropdown-menu show' : 'dropdown-menu'} style={{ padding: 0, width: '100%' }}>
          <DropdownMultiselectSelection
            handleSelect={this.handleSelectAll}
            handleDeselect={this.handleDeselectAll}
            isMultiSelectable={isMultiSelectable}
            placeholderSelect={placeholderSelect}
            placeholderDeselect={placeholderDeselect}
          />
          <DropdownMultiselectOption
            setSelected={(value: (Option | T | string)[]) => this.setState({ selected: value })}
            options={options}
            selected={selected}
            name={name}
            onChange={onChange}
            getOptionKey={getOptionKey}
            getOptionLabel={getOptionLabel}
          />
        </div>
      </div>
    );
  }

  private onClick = (): void => {
    const { showDropdown } = this.state;
    this.setState({
      showDropdown: !showDropdown,
    });
  };

  private handleSelectAll = (): void => {
    const { options, onChange } = this.props;

    const selected = [...options];

    this.setState({ selected });

    if (onChange) {
      onChange(options);
    }
  };

  private handleDeselectAll = (): void => {
    const { onChange } = this.props;

    this.setState({ selected: [] });

    if (onChange) {
      onChange([]);
    }
  };

  private handleClickOutside = (event: any): void => {
    if (this.state.showDropdown && this.node?.contains(event.target) === false) {
      this.setState({
        showDropdown: false,
      });
    }
  };
}

export const DropdownMultiselect = DropdownMultiselectComponent;
