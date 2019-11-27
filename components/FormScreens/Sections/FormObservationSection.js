import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import CsAppText from '../../CsAppText';
import CsAppLabel from '../../CsAppLabel';
import CsAppTitle from '../../CsAppTitle';
import CsInput from '../../CsInput';
import FormModalCamera from '../Modal/FormModalCamera';
import FormModalImage from '../Modal/FormModalImage';
import { Picker, Icon } from "native-base";

class FormObservationSection extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modalCameraVisible: false,
      modalImageVisible: false,
      whichImage: "notSet",
      hasCameraPermission: null,
    };
  }

	setModalCameraVisible = visible => this.setState({modalCameraVisible: visible});
  setModalImageVisible = visible => this.setState({modalImageVisible: visible});
  setWhichImage = which => this.setState({whichImage: which});

	render(){
		const { values, iteration, handleChange, setWhichGrade, setWhichImage, handleColours, setModalVisible, handlePicker, data1, handleImage } = this.props;
		return(
			<View style={styles.row}>
        <FormModalCamera 
          isOpen={this.state.modalCameraVisible}
          setModalCameraVisible={this.setModalCameraVisible}
          handleImage={handleImage}
          identifier={this.state.whichImage}
        />

        <FormModalImage
          isOpen={this.state.modalImageVisible}
          setModalVisible={this.setModalImageVisible}
          imageUri={values.photos[this.state.whichImage]}
        />

				<View style={styles.rowFirst}>
          <CsAppLabel>Location</CsAppLabel>
          <Picker
                  note
                  mode="dropdown"
                  style={styles.picker}
                  placeholder="- Select -"
                  iosIcon={<Icon name="arrow-down" />}
                  selectedValue={values['obsLocation' + iteration]}
                  onValueChange={handlePicker('obsLocation' + iteration)}
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

          <View style={styles.photoRow}>
            <Text 
              style={styles.photoButton}
              onPress={() => {
                this.setWhichImage('obsImage' + iteration);
                this.setModalCameraVisible(true);
                }
              }
            >
              Take Photo</Text>
            { values.photos['obsImage' + iteration] && 
            <Text 
              style={styles.photoButton}
              onPress={() => {
                  this.setWhichImage('obsImage' + iteration);
                  this.setModalImageVisible(true);
                  }
              }
            >
              View Photo
            </Text>
            }
          </View>
				</View>
				<View style={styles.rowSecond}>
					<CsAppLabel>Comment</CsAppLabel>
				    <CsInput
					  	handleChange={handleChange}
						  values={values}
						  identifier={"obsComment" + iteration}
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
							{ (values['obsGrade'+iteration] == 3) && <View style={styles.clickBoxGreen}></View> }
							{ (values['obsGrade'+iteration] == 2) && <View style={styles.clickBoxOrange}></View> }
							{ (values['obsGrade'+iteration] == 1) && <View style={styles.clickBoxRed}></View> }
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
  clickBox: {
  	borderWidth:1,
  	borderColor:'#DDDDDD',
  	borderStyle:'solid',
  	backgroundColor:'#fff',
  	height:40,
  	marginTop:15,
  	padding:5
  },
  clickBoxWidth: {
    width:40,
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
  photoRow : {
    flex:1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  },
  photoButton : {
    flex:1,
    justifyContent: 'space-between',
    flexDirection: 'row',
    color: '#2187FF',
    textDecorationLine: 'underline',
    marginTop:5
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
export default FormObservationSection;