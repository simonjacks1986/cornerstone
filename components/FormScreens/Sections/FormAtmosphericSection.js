import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import CsAppText from '../../Parts/CsAppText';
import CsAppLabel from '../../Parts/CsAppLabel';
import CsAppTitle from '../../Parts/CsAppTitle';
import CsInput from '../../Parts/CsInput';
import { Picker, Icon } from "native-base";
import theme from '../../../assets/styles/common.js';

class FormAtmosphericSection extends Component {
	render(){
		const { values, iteration, handleChange, handlePicker  } = this.props;
		return(
      <View>
        <View style={styles.one2}>
          <CsAppLabel>Location</CsAppLabel>
          <Picker
              note
              mode="dropdown"
              style={styles.picker}
              placeholder="- Select -"
              iosIcon={<Icon name="chevron-down" />}
              selectedValue={values['atsLocation' + iteration]}
              onValueChange={handlePicker('atsLocation' + iteration)}
          >
              <Picker.Item label="Exterior Front" value="Exterior Front" />
              <Picker.Item label="Exterior Side" value="Exterior Side" />
              <Picker.Item label="Exterior Rear" value="Exterior Rear" />
              <Picker.Item label="Lounge" value="Lounge" />
              <Picker.Item label="Diner" value="Diner" />
              <Picker.Item label="Lounge/Diner" value="Lounge/Diner" />
              <Picker.Item label="Kitchen" value="Kitchen" />
              <Picker.Item label="Kitchen/Diner" value="Kitchen/Diner" />
              <Picker.Item label="Study" value="Study" />
              <Picker.Item label="Hallway" value="Hallway" />
              <Picker.Item label="Landing" value="Landing" />
              <Picker.Item label="Bed 1" value="Bed 1" />
              <Picker.Item label="Bed 2" value="Bed 2" />
              <Picker.Item label="Bed 3" value="Bed 3" /> 
              <Picker.Item label="Bed 4" value="Bed 4" /> 
              <Picker.Item label="Bed 5" value="Bed 5" /> 
              <Picker.Item label="Bathroom" value="Bathroom"/>
              <Picker.Item label="Ensuite" value="Ensuite" />
              <Picker.Item label="Utility" value="Utility" />
              <Picker.Item label="Conservatory" value="Conservatory" />
              <Picker.Item label="WC" value="WC" />
              <Picker.Item label="Cupboard" value="Cupboard" />
              <Picker.Item label="Boiler Room" value="Boiler Room" />
              <Picker.Item label="Office" value="Office" />
              <Picker.Item label="Other" value="Other" />
              <Picker.Item label="None" value="None" />
          </Picker>
        </View> 
        <View style={styles.whiteBlock}>
          <View style={styles.row}>
            <View style={styles.one2}>
              <CsAppLabel>% Relative Humidity</CsAppLabel>
              <CsInput
                  handleChange={handleChange}
                  values={values}
                  identifier={"atsRelativeHumidity" + iteration}
                  numberPad={true}
                />
            </View> 
            <View style={styles.one2}>
              <CsAppLabel>Temp. °C</CsAppLabel>
              <CsInput
                  handleChange={handleChange}
                  values={values}
                  identifier={"atsTemp" + iteration}
                  numberPad={true}
                />
            </View>
          </View>
          <View style={styles.row}>
            <View style={styles.one2}>
              <CsAppLabel>Dew point temp °C</CsAppLabel>
              <CsInput
                  handleChange={handleChange}
                  values={values}
                  identifier={"atsDewPoint" + iteration}
                  numberPad={true}
                />
            </View> 
            <View style={styles.one2}>
              <CsAppLabel>Specific Humidity g/Kg</CsAppLabel>
              <CsInput
                  handleChange={handleChange}
                  values={values}
                  identifier={"atsSpecificHumidity" + iteration}
                  numberPad={true}
                />
            </View>
          </View>
        </View>
      </View>
		)
	}
}
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection:'row',
    marginBottom:20,
    justifyContent: 'space-evenly',
  },
  one1: {
    flex:1,
    padding:5
  },
  one2: {
    flex:1,
    padding:5
  },
  sectionBlock: {
    marginTop:20
  },
  whiteBlock: theme.WHITEBLOCK,
  picker: theme.PICKER,

});
export default FormAtmosphericSection;