import React, { Component } from 'react';
import { Text, Image, Button, View, StyleSheet, TouchableOpacity, TouchableHighlight } from 'react-native';
import { Picker, Icon } from "native-base";
import FormControls from './FormControls';
import CsAppText from '../CsAppText';
import CsAppLabel from '../CsAppLabel';
import CsAppTitle from '../CsAppTitle';
import CsInput from '../CsInput';
import CsBigInput from '../CsBigInput';
import * as Permissions from 'expo-permissions';
import FormModalCamera from './Modal/FormModalCamera';
import FormModalImage from './Modal/FormModalImage';
import { Camera } from 'expo-camera';
import DateTimePicker from "react-native-modal-datetime-picker";

import FormModalColourPicker from './Modal/FormModalColourPicker';
class FormMoistureMOT extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			modalImageVisible: false,
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
			pictureUri: undefined,
			isTimePickerVisible: false,
			isDatePickerVisible: false,
		};
	}

	showDatePicker = () => {
		this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible });
	};
	showTimePicker = () => {
		this.setState({ isTimePickerVisible: !this.state.isTimePickerVisible });
	};

	handleDatePicked = date => {
		const { handleChoice } = this.props;
		this.showDatePicker();
		handleChoice('date', date.getDate() + "/" + (date.getMonth() + 1 ) + "/" + date.getFullYear());
	};
	handleTimePicked = time => {
		const { handleChoice } = this.props;
		this.showTimePicker();
		handleChoice('time', time.getHours() + ":" + time.getMinutes());
	};

	async componentDidMount() {
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
		this.setState({ hasCameraPermission: status === 'granted' });
	};

	setModalVisible = visible => {
	    this.setState({modalVisible: visible});
	}
	setModalImageVisible = visible => {
	    this.setState({modalImageVisible: visible});
	}


	render(){
		const { values, handleChange, handleImage, handleChoice, handlePicker } = this.props;
	    const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return(
				<View style={styles.container}>
					<FormModalCamera
						isOpen={this.state.modalVisible}
						handleImage={handleImage}
						setModalCameraVisible={this.setModalVisible}
						identifier="northFacingImage"
					/>

					<FormModalImage
						isOpen={this.state.modalImageVisible}
						setModalVisible={this.setModalImageVisible}
						imageUri={values.photos.northFacingImage}
					/>

					<DateTimePicker
						isVisible={this.state.isTimePickerVisible}
						onConfirm={this.handleTimePicked}
						onCancel={this.showTimePicker}
						mode="time"
					/>

					<DateTimePicker
						isVisible={this.state.isDatePickerVisible}
						onConfirm={this.handleDatePicked}
						onCancel={this.showDatePicker}
						mode="date"
					/>

					<CsAppTitle>Moisture MOT</CsAppTitle>
					<CsAppText>Enter the survey details below:</CsAppText>
					<View>
						<View style={styles.row}>
							<View style={styles.one3}>
								<CsAppLabel>Date</CsAppLabel>
						        <TouchableHighlight 
									onPress={() => {
										this.showDatePicker();
									}}
									style={styles.timePicker}
								>
									<Text>{ (values.date) && values.date }</Text>
								</TouchableHighlight>
							</View>
							<View style={styles.one3}>
								<CsAppLabel>Time</CsAppLabel>
								<TouchableHighlight 
									onPress={() => {
										this.showTimePicker();
									}}
									style={styles.timePicker}
								>
									<Text>{ (values.time) && values.time }</Text>
								</TouchableHighlight>
							</View>
							<View style={styles.one3}>
								<CsAppLabel>Weather</CsAppLabel>
								<CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="weather"
								/>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.one3}>
								<CsAppLabel>Property ID</CsAppLabel>
								<CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="propertyId"
								/>
							</View>
							<View style={styles.one3}>
								<CsAppLabel>Author</CsAppLabel>
								<CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="author"
								/>
							</View>
							<View style={styles.one3}>
								<CsAppLabel>Client</CsAppLabel>
							    <CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="client"
								/>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.one1}>
								<CsAppLabel>Address</CsAppLabel>
								<CsBigInput
								  	handleChange={handleChange}
									values={values}
									identifier="address"
								/>
							</View>
						</View>
							
						<View style={styles.row}>
							<View style={styles.one3}>
								<CsAppLabel>Status</CsAppLabel>
								<Picker
					              note
					              mode="dropdown"
					              style={styles.picker}
					              placeholder="- Select -"
					              iosIcon={<Icon name="arrow-down" />}
					              selectedValue={values.status}
					              onValueChange={handlePicker('status')}
					            >
									<Picker.Item label="Occupied" value="Occupied" />
									<Picker.Item label="Void" value="Void" />
									<Picker.Item label="New Build Unoccupied" value="New Build Unoccupied" />
									<Picker.Item label="Multiple Occupancy" value="Multiple Occupancy" />
									<Picker.Item label="Partial Occupancy" value="Partial Occupancy" />
					            </Picker>
					        </View>

					        <View style={styles.one3}>
								<CsAppLabel>Age</CsAppLabel>
								<Picker
					              note
					              mode="dropdown"
					              style={styles.picker}
					              placeholder="- Select -"
					              iosIcon={<Icon name="arrow-down" />}
					              selectedValue={values.age}
					              onValueChange={handlePicker('age')}
					            >
									<Picker.Item label="Pre 1885" value="Pre 1885" />
									<Picker.Item label="1885 - 1920" value="1885 - 1920" />
									<Picker.Item label="1920 - 1950" value="1920 - 1950" />
									<Picker.Item label="1950 - 1965" value="1950 - 1965" />
									<Picker.Item label="1965 - 1990" value="1965 - 1990" />
									<Picker.Item label="1990 - present day" value="1990 - present day" />
					            </Picker>
							</View>

							<View style={styles.one3}>
								<CsAppLabel>Period</CsAppLabel>
								<Picker
					              note
					              mode="dropdown"
					              style={styles.picker}
					              placeholder="- Select -"
					              iosIcon={<Icon name="arrow-down" />}
					              selectedValue={values.period}
					              onValueChange={handlePicker('period')}
					            >
									<Picker.Item label="Tudor 1485 - 1560" value="Tudor 1485 - 1560" />
									<Picker.Item label="Stuart 1603 - 1714" value="Stuart 1603 - 1714" />
									<Picker.Item label="Georgian 1714 - 1790" value="Georgian 1714 - 1790" />
									<Picker.Item label="Victorian 1839 - 1900" value="Victorian 1839 - 1900" />
									<Picker.Item label="Queen Anne 1880 - 1900" value="Queen Anne 1880 - 1900" />
									<Picker.Item label="Edwardian 1900 - 1918" value="Edwardian 1900 - 1918" />
									<Picker.Item label="Addison Homes 1919 - 1930's" value="Addison Homes 1919 - 1930's" />
									<Picker.Item label="Semi 1918 - 1939" value="Semi 1918 - 1939" />
									<Picker.Item label="Art Deco 1920 - 1940" value="Art Deco 1920 - 1940" />
									<Picker.Item label="Airey Homes 1940's" value="Airey Homes 1940's" />
									<Picker.Item label="Terraced 1960 - 1970's" value="Terraced 1960 - 1970's" />
									<Picker.Item label="New Builds - 1990's" value="New Builds - 1990's" />
									<Picker.Item label="Modern Minimalist - present day" value="Modern Minimalist - present day" />
									<Picker.Item label="Unknown" value="Unknown" />
					            </Picker>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.one2}>
								<CsAppLabel>North Facing Elevation</CsAppLabel>
								<Picker
					              note
					              mode="dropdown"
					              style={styles.picker}
					              placeholder="- Select -"
					              iosIcon={<Icon name="arrow-down" />}
					              selectedValue={values.northFacing}
					              onValueChange={handlePicker('northFacing')}
					            >
					              <Picker.Item label="Yes" value="Yes" />
					              <Picker.Item label="No" value="No" />
					              <Picker.Item label="North East" value="North East" />
					              <Picker.Item label="North West" value="North West" />
					            </Picker>
							</View>
							<View style={styles.one2}>
								<CsAppLabel>North Facing Elevation Image</CsAppLabel>
								<TouchableOpacity 
									onPress={() => this.setState({modalVisible: true})}
									style={styles.cameraButton}
								>
									<Icon name="camera" style={{fontSize: 50, color: '#aaa'}}/>
									<Text>Click here to take a photo of the property</Text>
							    </TouchableOpacity>
							    { values.photos.northFacingImage && 
								<Text 
									style={styles.photoButton}
									onPress={() => {
										this.setModalImageVisible(true);
						    			}
									}
								>
									View Photo
								</Text>
								}
							</View>
						</View>
								
					</View>
					<FormControls
						nextStep={this.props.nextStep}
						prevStep={this.props.prevStep}
					/>
					
					<Image 
						// source={{ uri: "data:image/png;base64," + this.state.pictureUri }} 
						source={{ uri: values.moistureImage }} 
						style={{width: 200, height:130}}
					/>
				</View>
			);
		}
	}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
  },
  row: {
    flex: 1,
    flexDirection:'row',
    marginBottom:20,
  },
  one1: {
  	flex:1,
  	margin:5
  },
  one2: {
  	flex:1,
  	margin:5
  },
  one3: {
  	flex:2,
  	margin:5
  },
  spacer: {
  	height:16,
  },
  picker: {
  	padding:0,
  	margin:0,
  	backgroundColor: "#fff",
  	borderColor:'#DDDDDD',
  	borderWidth:1,
  	marginTop: 16,
  	borderRadius: 2,
  	height:40
  },
  cameraButton: {
  	backgroundColor: "#fff",
  	borderColor:'#DDDDDD',
  	borderWidth:1,
  	marginTop: 16,
  	borderRadius: 2,
  	height:140,
  	flex:1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	flexDirection: 'column',
  	textAlign: 'center',
  	paddingLeft: 20,
  	paddingRight: 20,
  },
  timePicker: {
  	backgroundColor: '#FFF',
	width:'100%',
	height:40,
	borderColor:'#DDDDDD',
	borderWidth:1,
	paddingLeft:10,
	paddingRight:10,
	paddingTop:10,
	marginTop:15,
	borderRadius:2
  },
  photoButton : {
	marginTop: 5,
  	color: '#2187FF',
  	textDecorationLine: 'underline',
  },
});
export default FormMoistureMOT;