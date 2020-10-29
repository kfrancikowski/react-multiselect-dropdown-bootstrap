import * as React from 'react';

interface Option {
  key: string;
  label: string;
}

interface IProps<T> {
  onClick: () => void;
  showDropdown: boolean;
  selected: (Option | T | string)[];
  buttonClass?: string;
  placeholder?: string;
  title?: string;
}

class DropdownMultiselectToggleBtnComponent<T> extends React.Component<IProps<T>> {
  render(): JSX.Element {
    const { buttonClass, onClick } = this.props;
    const title = this.getTitle();
    return (
      <button
        className={`btn dropdown-toggle ${buttonClass}`}
        type="button"
        data-toggle="dropdown"
        aria-haspopup="true"
        aria-expanded="false"
        onClick={onClick}
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
          {title}
        </span>
      </button>
    );
  }

  private getTitle = (): string => {
    const { placeholder, title, selected } = this.props;
    if (selected) {
      if (placeholder && selected.length === 0) {
        return placeholder;
      } else if (title && selected.length > 1) {
        return title;
      } else {
        if (typeof selected[0] === 'string') {
          return selected.join(', ');
        } else {
          // @ts-ignore
          return selected.map((opt) => opt[Object.keys(opt)[0]]).join(', ');
        }
      }
    }
    return '';
  };
}

export const DropdownMultiselectToggleBtn = DropdownMultiselectToggleBtnComponent;
