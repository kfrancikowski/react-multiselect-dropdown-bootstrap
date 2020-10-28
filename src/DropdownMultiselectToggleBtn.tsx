import * as React from 'react';
import { Option } from './index';

interface IProps {
  showDropdown: boolean;
  selected: Option[];
  buttonClass?: string;
  placeholder?: string;
  title?: string;
}

class DropdownMultiselectToggleBtnComponent extends React.Component<IProps> {
  render(): JSX.Element {
    const { buttonClass } = this.props;
    return (
      <button
        className={`btn dropdown-toggle ${buttonClass}`}
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={this.onClick}
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
          {this.getTitle}
        </span>
      </button>
    );
  }

  private onClick = (): void => {
    const { showDropdown } = this.props;
    this.setState({
      showDropdown: !showDropdown,
    });
  };

  private getTitle = (): string => {
    const { placeholder, title, selected } = this.props;

    if (selected) {
      if (placeholder && selected.length === 0) {
        return placeholder;
      } else if (title && selected.length > 1) {
        return title;
      } else {
        return selected?.join(', ');
      }
    }
    return '';
  };
}

export const DropdownMultiselectToggleBtn = DropdownMultiselectToggleBtnComponent;
