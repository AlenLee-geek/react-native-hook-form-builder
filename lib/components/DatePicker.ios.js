import React from 'react';
import {Text, View, StyleSheet, Modal, TouchableOpacity} from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import PropTypes from 'prop-types';
// COMPONENTS
import ErrorMessage from './ErrorMessage';
// UTILS
import {height, width} from '../utils/constants';

class DatePicker extends React.Component {
  state = {
    date: new Date(),
    newDate: new Date(),
    show: false,
  };

  toggleModal = () => {
    this.setState(prevState => ({
      show: !prevState.show,
      newDate: prevState.date,
    }));
  };

  render() {
    const {date, newDate, show} = this.state;
    const {
      field,
      label,
      reference,
      onChange,
      errors,
      customStyles,
      currentLocale,
      styleName,
    } = this.props;
    return (
      <View
        style={StyleSheet.flatten([
          styles.datePickerContainer,
          customStyles.datePickerContainer,
          customStyles[`datePickerContainer${styleName}`],
        ])}>
        <Text
          style={StyleSheet.flatten([
            styles.datePickerLabel,
            customStyles.datePickerLabel,
            customStyles[`datePickerLabel${styleName}`],
          ])}>
          {label}
        </Text>
        <View
          style={StyleSheet.flatten([
            styles.datePickerTextWrapper,
            customStyles.datePickerTextWrapper,
            customStyles[`datePickerTextWrapper${styleName}`],
          ])}>
          <Text
            style={StyleSheet.flatten([
              styles.datePickerText,
              customStyles.datePickerText,
              customStyles[`datePickerText${styleName}`],
            ])}
            onPress={() => this.toggleModal()}>
            {date.toLocaleDateString(currentLocale)}
          </Text>
        </View>
        <Modal
          animationType="fade"
          transparent
          visible={show}
          onRequestClose={() => this.toggleModal()}>
          <TouchableOpacity
            style={StyleSheet.flatten([
              styles.datePickerModalOverlay,
              customStyles.datePickerModalOverlay,
              customStyles[`datePickerModalOverlay${styleName}`],
            ])}
            activeOpacity={1}
            onPress={() => this.toggleModal()}
          />
          <View
            style={StyleSheet.flatten([
              styles.datePickerModalContainer,
              customStyles.datePickerModalContainer,
              customStyles[`datePickerModalContainer${styleName}`],
            ])}>
            <View
              style={StyleSheet.flatten([
                styles.datePickerModalWrapper,
                customStyles.datePickerModalWrapper,
                customStyles[`datePickerModalWrapper${styleName}`],
              ])}>
              <View
                style={StyleSheet.flatten([
                  styles.datePickerModalConfirmContainer,
                  customStyles.datePickerModalConfirmContainer,
                  customStyles[`datePickerModalConfirmContainer${styleName}`],
                ])}>
                <TouchableOpacity
                  onPress={() => {
                    this.setState({date: newDate});
                    onChange(newDate);
                    this.toggleModal();
                  }}>
                  <Text>Done</Text>
                </TouchableOpacity>
              </View>
              <DateTimePicker
                ref={reference}
                value={newDate}
                maximumDate={new Date()}
                onChange={(event, d) => {
                  this.setState({newDate: d});
                }}
              />
            </View>
          </View>
        </Modal>
        {errors[field.name] && (
          <ErrorMessage
            error={errors[field.name]}
            name={styleName}
            customStyles={customStyles}
          />
        )}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  datePickerContainer: {
    marginBottom: 20,
  },
  datePickerTextWrapper: {
    borderWidth: 1,
    borderColor: '#000',
  },
  datePickerText: {
    padding: 10,
  },
  datePickerLabel: {
    marginBottom: 15,
    fontWeight: '800',
  },
  datePickerModalOverlay: {
    height: (height * 2) / 3,
    backgroundColor: 'rgba(60, 60, 60, 0.5)',
  },
  datePickerModalContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end',
    marginBottom: 80,
    backgroundColor: '#fff',
  },
  datePickerModalWrapper: {
    flex: 1,
    padding: 15,
    width,
  },
  datePickerModalConfirmContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
});

DatePicker.defaultProps = {
  value: new Date(),
  customStyles: {},
  errors: {},
  currentLocale: null,
};

DatePicker.propTypes = {
  field: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  styleName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  reference: PropTypes.func.isRequired,
  value: PropTypes.instanceOf(Date),
  errors: PropTypes.object,
  customStyles: PropTypes.object,
  currentLocale: PropTypes.string,
};

export default DatePicker;
