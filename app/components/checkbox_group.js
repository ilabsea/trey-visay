import React, {Component, PropTypes} from "react";
import {View, Text} from "react-native";
import { Checkbox } from 'react-native-material-ui';

export default class CheckboxGroup extends Component {

    constructor(props) {
      super(props);
      this.state = {
        selected: []
      };
    }

    static propTypes = {
      onSelect: PropTypes.func,
      checked: PropTypes.array,
      items: PropTypes.arrayOf(PropTypes.shape({
          value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
          label: PropTypes.string,
          disabled: PropTypes.bool
      }))
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

        var newSelected;
        if (checked) {
            newSelected = [...selected, value]
        } else {
            let index = selected.indexOf(value);
            newSelected = [
                ...selected.slice(0, index),
                ...selected.slice(index + 1)
            ]
        }

        this.setState({
            selected: newSelected
        });

        const { onSelect } = this.props;
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
