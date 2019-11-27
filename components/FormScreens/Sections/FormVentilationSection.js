import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import CsAppText from '../../CsAppText';
import CsAppLabel from '../../CsAppLabel';
import CsAppTitle from '../../CsAppTitle';
import CsInput from '../../CsInput';
import CsBigInput from '../../CsBigInput';
import { Picker, Icon } from "native-base";

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
            <CsAppLabel>Flow rate m/s</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"venFlowRate" + iteration}
            />
          </View> 
        </View> 
        <View style={styles.row}>
          <View style={styles.one2}>
            <CsAppLabel>Overrun (mins)</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"venOverrun" + iteration}
            />
          </View> 
          <View style={styles.one2}>
            <CsAppLabel>Air changes in mins</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"venAirChanges" + iteration}
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
  whiteBlock: {
    backgroundColor:'#FFF',
    borderColor:'#DDD',
    borderWidth:2,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:20,
    paddingBottom:20,
    marginBottom:20,
  },
  clickBoxWidth: {
    width:40,
  },
  clickBox: {
    borderWidth:1,
    borderColor:'#DDDDDD',
    borderStyle:'solid',
    backgroundColor:'#fff',
    height:40,
    marginTop:15,
    padding:5
  },
  clickBoxRed: {
    backgroundColor: '#FC0000',
    width:'100%',
    height:'100%',
    borderRadius:3
  },
  clickBoxOrange: {
    backgroundColor: '#FCC400',
    width:'100%',
    height:'100%',
    borderRadius:3
  },
  clickBoxGreen: {
    backgroundColor: '#28A745',
    width:'100%',
    height:'100%',
    borderRadius:3
  },
  picker: {
    backgroundColor: "#fff",
    borderColor:'#DDDDDD',
    borderWidth:1,
    marginTop: 16,
    borderRadius: 2,
    marginBottom:10,
    height:40
  },
});
export default FormVentilationSection;