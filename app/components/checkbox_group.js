import React, { Component } from "react";
import {View, Text} from "react-native";
import { Checkbox } from 'react-native-material-ui';
import { PropTypes } from 'prop-types';

export default class CheckboxGroup extends Component {

  constructor(props) {
    super(props);
    this.state = {
      selected: []
    };

    this.previousSelected = [];
  }

  // https://stackoverflow.com/questions/26402534/how-to-listen-state-changes-in-react-js
  // https://developmentarc.gitbooks.io/react-indepth/content/life_cycle/the_life_cycle_recap.html
  componentWillReceiveProps(props) {
    if (props.checkedVip) {
      this.setState({
        selected: props.checkedVip
      });
    }
  }

  static propTypes = {
    onSelect: PropTypes.func,
    checked: PropTypes.array,
    items: PropTypes.arrayOf(PropTypes.shape({
        value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
        label: PropTypes.string,
        disabled: PropTypes.bool
    })),
    limitCheckedItems: PropTypes.number
  };

  componentWillMount = () => {
    const { checked } = this.props;

    if (checked && checked.length) {
        this.value = checked;
    }
  };

  render() {
      const { items, ...props } = this.props;

      return (
        <View>
          {
            items && items.length && items.map((item, i) => {
              const { value, label } = item;

              return (
                <Checkbox
                  {...props}
                  key={i}
                  label={label}
                  value={value}
                  onCheck={this._onChange}
                  checked={this.state.selected && this.state.selected.indexOf(value) !== -1}
                  {...item}
                />
              );
            })
          }
        </View>
      );
  };

  _onChange = (checked, value) => {
    const { selected } = this.state;
    const { onSelect, limitCheckedItems } = this.props;
    let newSelected;

    if (checked) {
      newSelected = [...selected, value]
    } else {
      let index = selected.indexOf(value);
      newSelected = [
          ...selected.slice(0, index),
          ...selected.slice(index + 1)
      ]
    }

    if (!!limitCheckedItems && newSelected.length > limitCheckedItems) {
      this.setState({selected: this.previousSelected});
      const { onSelect } = this.props;
      onSelect && onSelect(newSelected);
      return;
    }

    this.previousSelected = newSelected;
    this.setState({selected: newSelected});
    onSelect && onSelect(newSelected);
  };

  /**
   * Get the value of checked Checkbox in CheckboxGroup. Often use in form.
   * @returns {Array}
   */
  get value() {
    return this.state.selected
  }

  /**
   * Make CheckboxGroup set some checkbox checked
   * @param {string[]} value - An array of values of some Checkbox in　CheckboxGroup
   */
  set value(value) {
    this.setState({
        selected: value
    });

    const { onSelect } = this.props;
    onSelect && onSelect(value);
    return
  }
}
