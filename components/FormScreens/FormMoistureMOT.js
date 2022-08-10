import React, { Component } from 'react';
import { Text, Image, Button, View, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView } from 'react-native';
import { Picker, Icon, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import CsBigInput from '../Parts/CsBigInput';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import FormModalCamera from '../Modal/FormModalCamera';
import FormModalImage from '../Modal/FormModalImage';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import { Camera } from 'expo-camera';
import DateTimePickerModal from "react-native-modal-datetime-picker";
import theme from '../../assets/styles/common.js';

class FormMoistureMOT extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			modalImageVisible: false,
			hasCameraPermission: null,
			hasPickerPermission: null, 
			type: Camera.Constants.Type.back,
			pictureUri: undefined,
			isTimePickerVisible: false,
			isDatePickerVisible: false,
		};
	}

	async componentDidMount() {
		const { status } = await Camera.requestCameraPermissionsAsync();
		const { medStatus } = await MediaLibrary.requestPermissionsAsync();
		this.setState({ hasCameraPermission: status === 'granted' });
		this.setState({ hasPickerPermission: medStatus === 'granted' });
	};

	showDatePicker = () => this.setState({ isDatePickerVisible: !this.state.isDatePickerVisible });
	showTimePicker = () => this.setState({ isTimePickerVisible: !this.state.isTimePickerVisible });

	handleDatePicked = date => {
		const { handleChoice } = this.props;
		this.showDatePicker();
		handleChoice('date', date.getDate() + "/" + (date.getMonth() + 1 ) + "/" + date.getFullYear());
	};
	handleTimePicked = time => {
		const { handleChoice } = this.props;
		this.showTimePicker();
		let minutes = time.getMinutes();
		minutes = (minutes < 10) ? "0" + minutes.toString() : minutes;
		let hour = time.getHours();
		hour = (hour < 10) ? "0" + hour.toString() : hour;
		handleChoice('time', hour + ":" + minutes);
	};

	setModalVisible = visible => this.setState({modalVisible: visible});
	setModalImageVisible = visible => this.setState({modalImageVisible: visible});
	setWhichImage = which => this.setState({whichImage: which});

	_pickImage = async () => {
	    let result = await ImagePicker.launchImageLibraryAsync({
	      mediaTypes: ImagePicker.MediaTypeOptions.All,
	      allowsEditing: false,
	      quality: 1,
	    });

	    if (!result.cancelled) {
	    	const manipResult = await ImageManipulator.manipulateAsync(
		      result.uri,
		      [{resize: { width: theme.compWidth }}],
          	  { compress: theme.compression, format: ImageManipulator.SaveFormat.JPEG }
		    );
		    let saveResult = await MediaLibrary.createAssetAsync(manipResult.uri);
			this.setState({ image: saveResult.uri });
			const { handleImage } = this.props;
			handleImage(this.state.whichImage, saveResult.uri);
	    }
	};

	render(){
		const { values, handleChange, handleImage, handleChoice, handlePicker, removeImage } = this.props;
	    const { hasCameraPermission } = this.state;
		if (hasCameraPermission === null) {
			return <View />;
		} else if (hasCameraPermission === false) {
			return <Text>No access to camera</Text>;
		} else {
			return(
				<Container style={styles.container}>
					<ScrollView>
						<FormModalCamera
							isOpen={this.state.modalVisible}
							handleImage={handleImage}
							setModalCameraVisible={this.setModalVisible}
							identifier="propertyImage"
						/>

						<FormModalImage
							isOpen={this.state.modalImageVisible}
							setModalVisible={this.setModalImageVisible}
							imageUri={values.photos.propertyImage}
							removeImage={removeImage}
							identifier="propertyImage"
						/>

						<DateTimePickerModal
							isVisible={this.state.isTimePickerVisible}
							onConfirm={this.handleTimePicked}
							onCancel={this.showTimePicker}
							mode="time"
						/>

						<DateTimePickerModal
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
								
							<View>
							<View style={styles.row}>
								<View style={styles.one1}>
									<CsAppLabel>Photo of the Property</CsAppLabel>
									<TouchableOpacity 
										onPress={() => this.setState({modalVisible: true})}
										style={styles.cameraButton}
									>
										<Icon name="camera" style={{fontSize: 50, color: '#aaa'}}/>
										<Text>Click here to take a photo of the property</Text>
								    </TouchableOpacity>
								    <View style={styles.photoRow}>
									    { values.photos.propertyImage && 
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
										<Text 
											style={styles.photoButton}
											onPress={() => {
												this.setWhichImage('propertyImage');
	               								this._pickImage();
								    			}
											}
										>
											Pick Photo
										</Text>
									</View>
							    </View>
							</View>
						</View>
									
						</View>
					</ScrollView>
					<FormControls
						nextStep={this.props.nextStep}
						prevStep={this.props.prevStep}
					/>
				</Container>
			);
		}
	}
}

const styles = StyleSheet.create({
  container: theme.CONTAINER,
  row: theme.ROW,
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
  picker: theme.PICKER,
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
  photoRow : {
    flex:1,
    justifyContent: 'space-between',
    flexDirection: 'row',
  }
});
export default FormMoistureMOT;