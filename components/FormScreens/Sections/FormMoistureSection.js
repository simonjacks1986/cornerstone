import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View } from 'react-native';
import CsAppText from '../../CsAppText';
import CsAppLabel from '../../CsAppLabel';
import CsAppTitle from '../../CsAppTitle';
import CsInput from '../../CsInput';
import { Button, Text, Picker, Icon } from "native-base";

class FormMoistureSection extends Component {
	
	render(){
		const { values, iteration, handleChange, setWhichGrade, setModalVisible, handlePicker, data1 } = this.props;
		return(
			<View style={styles.row}>
				<View style={styles.rowFirst}>
					<CsAppLabel>Location</CsAppLabel>
          <Picker
            note
            mode="dropdown"
            style={styles.picker}
            placeholder="- Select -"
            iosIcon={<Icon name="arrow-down" />}
            selectedValue={values['simLocation'+iteration]}
            onValueChange={handlePicker('simLocation' + iteration)}
          >
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
          </Picker>
				</View>
				<View style={styles.rowSecond}>
					<CsAppLabel>Comment</CsAppLabel>
				  <CsInput
					  handleChange={handleChange}
					   values={values}
						identifier={"simComment" + iteration}
					/>
				</View>
				<View style={styles.rowThird}>
					<CsAppLabel>Grade</CsAppLabel>
					<TouchableHighlight
            style={styles.clickBoxWidth}
						onPress={() => {
							setModalVisible(true)
							setWhichGrade(iteration)
						}}
					>
						<View style={styles.clickBox}>
							{ (values['simGrade'+iteration] == 3) && <View style={styles.clickBoxGreen}></View> }
							{ (values['simGrade'+iteration] == 2) && <View style={styles.clickBoxOrange}></View> }
							{ (values['simGrade'+iteration] == 1) && <View style={styles.clickBoxRed}></View> }
						</View>
					</TouchableHighlight>
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
  },
  rowFirst: {
  	flex:3,
  	margin:5
  },
  rowSecond: {
  	flex:4,
  	margin:5
  },
  rowThird: {
  	margin:5
  },
  picker: {
  	padding:0,
  	margin:0
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
export default FormMoistureSection;