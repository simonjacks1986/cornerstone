import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import { Picker, Icon } from "native-base";
import CsAppText from '../../Parts/CsAppText';
import CsAppLabel from '../../Parts/CsAppLabel';
import CsAppTitle from '../../Parts/CsAppTitle';
import CsInput from '../../Parts/CsInput';
import CsBigInput from '../../Parts/CsBigInput';
import theme from '../../../assets/styles/common.js';

class FormVentilationSection extends Component {
	render(){
		const { values, iteration, setModalVisible, setWhichGrade, handleChange, handlePicker,  } = this.props;
		return(
      <View style={styles.whiteBlock}>

        <View style={styles.row}>
          <View style={styles.one2}>
            <CsAppLabel>Room</CsAppLabel>
            <Picker
                note
                mode="dropdown"
                style={styles.picker}
                placeholder="- Select -"
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={values['venRoom' + iteration]}
                onValueChange={handlePicker('venRoom' + iteration)}
            >
                <Picker.Item label="Kitchen" value="Kitchen" />
                <Picker.Item label="Bathroom" value="Bathroom" />
                <Picker.Item label="Ensuite" value="Ensuite" />
                <Picker.Item label="WC" value="WC" />
                <Picker.Item label="Other" value="Other" />
            </Picker>
          </View> 
          <View style={styles.one2}>
            <CsAppLabel>Unit Location</CsAppLabel>
            <Picker
                note
                mode="dropdown"
                style={styles.picker}
                placeholder="- Select -"
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={values['venUnitLocation' + iteration]}
                onValueChange={handlePicker('venUnitLocation' + iteration)}
            >
                <Picker.Item label="Window" value="Window" />
                <Picker.Item label="Internal Wall" value="Internal Wall" />
                <Picker.Item label="Window Wall" value="Window Wall" />
                <Picker.Item label="Ceiling" value="Ceiling" />
                <Picker.Item label="Cooker Hood" value="Cooker Hood" />
                <Picker.Item label="None" value="None" />
            </Picker>
          </View> 
        </View>
        <View style={styles.row}>
          <View style={styles.one2}>
            <CsAppLabel>How Operated?</CsAppLabel>
            <Picker
                note
                mode="dropdown"
                style={styles.picker}
                placeholder="- Select -"
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={values['venHowOperated' + iteration]}
                onValueChange={handlePicker('venHowOperated' + iteration)}
            >
                <Picker.Item label="Isolator Switch" value="Isolator Switch" />
                <Picker.Item label="Pull Cord" value="Pull Cord" />
                <Picker.Item label="Light Switch" value="Light Switch" />
                <Picker.Item label="Push Button" value="Push Button" />
                <Picker.Item label="RH Control" value="RH Control" />
                <Picker.Item label="Other" value="Other" />
            </Picker>
          </View> 
          <View style={styles.one2}>
            <CsAppLabel>Flow device used</CsAppLabel>
            <Picker
                note
                mode="dropdown"
                style={styles.picker}
                placeholder="- Select -"
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={values['venFlowDevice' + iteration]}
                onValueChange={handlePicker('venFlowDevice' + iteration)}
            >
                <Picker.Item label="Testo Anemometer" value="Testo Anemometer" />
                <Picker.Item label="Airflow Hood" value="Airflow Hood" />
                <Picker.Item label="Other Anemometer" value="Other Anemometer" />
                <Picker.Item label="Other" value="Other" />
            </Picker>
          </View> 
        </View>
        <View style={styles.row}> 
          <View style={styles.one2}>
            <CsAppLabel>Flow rate m/s</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"venFlowRate" + iteration}
            />
          </View> 
          <View style={styles.one2}>
            <CsAppLabel>Overrun (mins)</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"venOverrun" + iteration}
            />
          </View> 
        </View>
        <View style={styles.row}>
          <View style={styles.one2}>
            <CsAppLabel>Door Undercut (mm)</CsAppLabel>
            <Picker
                note
                mode="dropdown"
                style={styles.picker}
                placeholder="- Select -"
                iosIcon={<Icon name="arrow-down" />}
                selectedValue={values['venDoorUndercut' + iteration]}
                onValueChange={handlePicker('venDoorUndercut' + iteration)}
            >
                <Picker.Item label="> 10mm" value="> 10mm" />
                <Picker.Item label="< 10mm" value="< 10mm" />
                <Picker.Item label="N/A" value="N/A" />
            </Picker>
          </View>
          
          <View style={styles.one2}>
            <CsAppLabel>Comment</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"venComment" + iteration}
              multiline={true}
            />
          </View>
          <View style={styles.oneEnd}>
            <CsAppLabel>Grade</CsAppLabel>
            <TouchableHighlight
                style={styles.clickBoxWidth}
                onPress={() => {
                  setModalVisible(true);
                  setWhichGrade('Ex' + iteration);
                }}
              >
                <View style={styles.clickBox}>
                  { (values['venGradeEx' + iteration] == 3) && <View style={styles.clickBoxGreen}></View> }
                  { (values['venGradeEx' + iteration] == 2) && <View style={styles.clickBoxOrange}></View> }
                  { (values['venGradeEx' + iteration] == 1) && <View style={styles.clickBoxRed}></View> }
                </View>
              </TouchableHighlight>
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
  oneEnd: {
    padding:5
  },
  sectionBlock: {
    marginTop:20
  },
  whiteBlock: theme.WHITEBLOCK,
  clickBoxWidth: theme.CLICKBOXWIDTH,
  clickBox: theme.CLICKBOX,
  clickBoxRed: theme.CLICKBOXRED,
  clickBoxOrange: theme.CLICKBOXORANGE,
  clickBoxGreen:theme.CLICKBOXGREEN,
  picker: theme.PICKER,
});
export default FormVentilationSection;