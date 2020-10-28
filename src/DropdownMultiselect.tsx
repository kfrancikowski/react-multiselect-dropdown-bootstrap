import * as React from 'react';
import { Option } from './index';
import { DropdownMultiselectToggleBtn } from './DropdownMultiselectToggleBtn';
import { DropdownMultiselectSelection } from './DropdownMultiselectSelection';
import { DropdownMultiselectOption } from './DropdownMultiselectOption';

interface IState {
  showDropdown: boolean;
  options: Option[];
  selected: Option[];
}

interface IProps {
  name: string;
  options: Option[] | any;
  isMultiSelectable: boolean;
  placeholder?: string;
  title?: string;
  placeholderSelect?: string;
  placeholderDeselect?: string;
  buttonClass?: string;
  selected?: any;
  value?: any;
  onChange?: any;
  getOptionKey?: (value: string) => string;
  getOptionLabel?: (value: string) => string;
}

class DropdownMultiselectComponent extends React.Component<IProps, IState> {
  private node: HTMLDivElement | null | undefined;

  constructor(props: IProps) {
    super(props);
    const { selected } = this.props;
    this.state = {
      showDropdown: false,
      selected: selected ? selected : [],
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
    const {
      isMultiSelectable,
      buttonClass,
      placeholder,
      title,
      placeholderSelect,
      placeholderDeselect,
      name,
      onChange,
    } = this.props;
    const { showDropdown, options, selected } = this.state;
    return (
      <div className="dropdown" ref={(node) => (this.node = node)}>
        <DropdownMultiselectToggleBtn
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
          <DropdownMultiselectOption options={options} selected={selected} name={name} onChange={onChange} />
        </div>
      </div>
    );
  }

  private handleSelectAll = (): void => {
    const { options, onChange } = this.props;
    this.setState({ selected: options });

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

  private setOptions = (): void => {
    const { options, getOptionKey, getOptionLabel } = this.props;

    if (options.length === 0) {
      return;
    }

    if (typeof options[0] === 'object') {
      const optionsArray: Option[] = [];
      options.map((value: Option) => {
        let key: string = '';
        if (getOptionKey !== undefined) {
          key = getOptionKey(value.key);
        }

        let label: string = '';
        if (getOptionLabel !== undefined) {
          label = getOptionLabel(value.label);
        }
        optionsArray.push({ key, label });
      });

      this.setState({
        options: optionsArray,
      });
    }

    if (typeof options[0] === 'string') {
      const optionsArray: Option[] = [];
      options.map((value: any) => {
        optionsArray.push({ key: value, label: value });
      });

      this.setState({
        options: optionsArray,
      });
    }
  };
}

export const DropdownMultiselect = DropdownMultiselectComponent;
