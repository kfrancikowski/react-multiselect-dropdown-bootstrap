import * as React from 'react';

interface IProps {
  isMultiSelectable: boolean
  placeholderSelect?: string
  placeholderDeselect?: string
  handleSelect: () => void;
  handleDeselect: () => void;
}

class DropdownMultiselectSelectionComponent extends React.Component<IProps> {
  render(): JSX.Element {
    const { isMultiSelectable, placeholderSelect, placeholderDeselect, handleSelect, handleDeselect } = this.props;
    return (
      <>
        {isMultiSelectable && (
          <div className="btn-group btn-group-sm btn-block">
            <button className="actions-btn btn btn-light" onClick={handleSelect}>
              {placeholderSelect ? placeholderSelect : 'Select'}
            </button>
            <button className="actions-btn btn btn-light" onClick={handleDeselect}>
              {placeholderDeselect ? placeholderDeselect : 'Deselect All'}
            </button>
          </div>
        )}
      </>
    );
  }
}

export const DropdownMultiselectSelection = DropdownMultiselectSelectionComponent;
