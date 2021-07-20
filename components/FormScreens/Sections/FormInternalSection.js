import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View } from 'react-native';
import CsAppText from '../../Parts/CsAppText';
import CsAppLabel from '../../Parts/CsAppLabel';
import CsAppTitle from '../../Parts/CsAppTitle';
import CsInput from '../../Parts/CsInput';
import CsBigInput from '../../Parts/CsBigInput';
import { Picker, Icon, Button, Text } from "native-base";
import theme from '../../../assets/styles/common.js';

class FormInternalSection extends Component {
	render(){
		const { values, iteration, handleChange, handlePicker, handleColours, data1, setModalVisible, setWhichGrade } = this.props;

    let sectionKeys = ['A', 'B', 'C', 'D'];
    const sections = sectionKeys.map((section, key) =>
      <View key={section} style={styles.sectionBlock}>
        <View style={styles.row}>
          <View style={styles.one4}>
            <Text style={styles.identifier}>{section}</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.one4}>
            <CsAppLabel>Skirting %MC</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intSkirt" + iteration + section}
              numberPad={true}
            />
          </View>
          <View style={styles.one4}>
            <CsAppLabel>Wall %WME</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intWall" + iteration + section}
              numberPad={true}
            />
          </View>
          <View style={styles.one4}>
            <CsAppLabel>Bottom REL</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intBottom" + iteration + section}
              numberPad={true}
            />
          </View>
          <View style={styles.one4}>
            <CsAppLabel>Middle REL</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intMiddle" + iteration + section}
              numberPad={true}
            />
          </View>
          <View style={styles.one4}>
            <CsAppLabel>Top REL</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intTop" + iteration + section}
              numberPad={true}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.oneLong}>
            <CsAppLabel>Comment</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intComment" + iteration + section}
              multiline={true}
            />
          </View>
          <View style={styles.oneEnd}>
            <CsAppLabel>Grade</CsAppLabel>
            <TouchableHighlight
              style={styles.clickBoxWidth}
              onPress={() => {
                setModalVisible(true)
                setWhichGrade(iteration+section)
              }}
            >
              <View style={styles.clickBox}>
                { (values['intGrade'+iteration+section] == 3) && <View style={styles.clickBoxGreen}></View> }
                { (values['intGrade'+iteration+section] == 2) && <View style={styles.clickBoxOrange}></View> }
                { (values['intGrade'+iteration+section] == 1) && <View style={styles.clickBoxRed}></View> }
              </View>
            </TouchableHighlight>
          </View>
        </View>
      </View>
    );
        
		return(
      <View style={styles.whiteBlock}>
        <View style={styles.row}>
          <View style={styles.one1}>
            <CsAppLabel>Room</CsAppLabel>
            <Picker
              note
              mode="dropdown"
              style={styles.picker}
              placeholder="- Select -"
              iosIcon={<Icon name="arrow-down" />}
              selectedValue={values['intRoom'+iteration]}
              onValueChange={handlePicker("intRoom" + iteration)}
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
        </View>
        {sections}
        
        <View style={styles.row}>
          <View style={styles.one4}>
            <Text style={styles.identifier}>Floor</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.one4}>
            <CsAppLabel>%MC</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intSkirtFloor" + iteration}
              numberPad={true}
            />
          </View>
          <View style={styles.one4}>
            <CsAppLabel>%WME</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intWallFloor" + iteration}
              numberPad={true}
            />
          </View>
          <View style={styles.one4}>
            <CsAppLabel>REL</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intMiddleFloor" + iteration}
              numberPad={true}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.oneLong}>
            <CsAppLabel>Comment</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intCommentFloor" + iteration}
              multiline={true}
            />
          </View>
          <View style={styles.oneEnd}>
            <CsAppLabel>Grade</CsAppLabel>
            <TouchableHighlight
              style={styles.clickBoxWidth}
              onPress={() => {
                setModalVisible(true)
                setWhichGrade('Floor' + iteration)
              }}
            >
              <View style={styles.clickBox}>
                { (values['intGradeFloor'+iteration] == 3) && <View style={styles.clickBoxGreen}></View> }
                { (values['intGradeFloor'+iteration] == 2) && <View style={styles.clickBoxOrange}></View> }
                { (values['intGradeFloor'+iteration] == 1) && <View style={styles.clickBoxRed}></View> }
              </View>
            </TouchableHighlight>
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.one4}>
            <Text style={styles.identifier}>Ceiling</Text>
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.one4}>
            <CsAppLabel>%MC</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intSkirtCeiling" + iteration}
              numberPad={true}
            />
          </View>
          <View style={styles.one4}>
            <CsAppLabel>%WME</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intWallCeiling" + iteration}
              numberPad={true}
            />
          </View>
          <View style={styles.one4}>
            <CsAppLabel>REL</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intMiddleCeiling" + iteration}
              numberPad={true}
            />
          </View>
        </View>
        <View style={styles.row}>
          <View style={styles.oneLong}>
            <CsAppLabel>Comment</CsAppLabel>
            <CsInput
              handleChange={handleChange}
              values={values}
              identifier={"intCommentCeiling" + iteration}
              multiline={true}
            />
          </View>
          <View style={styles.oneEnd}>
            <CsAppLabel>Grade</CsAppLabel>
            <TouchableHighlight
              style={styles.clickBoxWidth}
              onPress={() => {
                setModalVisible(true)
                setWhichGrade('Ceiling' + iteration)
              }}
            >
              <View style={styles.clickBox}>
                { (values['intGradeCeiling'+iteration] == 3) && <View style={styles.clickBoxGreen}></View> }
                { (values['intGradeCeiling'+iteration] == 2) && <View style={styles.clickBoxOrange}></View> }
                { (values['intGradeCeiling'+iteration] == 1) && <View style={styles.clickBoxRed}></View> }
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
    justifyContent: 'space-between',
    flexWrap: 'wrap',
  },
  one1: {
    flex:1,
    padding:5
  },
  one4: {
    marginRight:5,
    marginLeft:5,
    flexGrow: 1
  },
  oneLong: {
    flexGrow: 1,
    padding:5
  },
  oneEnd: {
    alignSelf: 'flex-end',
    padding:5
  },
  sectionBlock: {
    marginTop:20
  },
  whiteBlock: {
    backgroundColor:'#FFF',
    borderColor:'#DDD',
    borderWidth:2,
    paddingLeft:20,
    paddingRight:20,
    paddingTop:20,
    paddingBottom:20,
    marginBottom:20,
  },
  picker: theme.PICKER,
  identifier: {
    fontSize:24,
    fontWeight:'bold',
  },
  clickBoxWidth: theme.CLICKBOXWIDTH,
  clickBox: theme.CLICKBOX,
  clickBoxRed: theme.CLICKBOXRED,
  clickBoxOrange: theme.CLICKBOXORANGE,
  clickBoxGreen:theme.CLICKBOXGREEN,
});
export default FormInternalSection;