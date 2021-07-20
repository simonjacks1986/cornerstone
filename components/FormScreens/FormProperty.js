import React, { Component } from 'react';
import { Text, Image, Button, View, StyleSheet, TouchableOpacity, TouchableHighlight, ScrollView} from 'react-native';
import { Picker, Icon, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsBigInput from '../Parts/CsBigInput';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import { Camera } from 'expo-camera';
import FormModalCamera from '../Modal/FormModalCamera';
import FormModalImage from '../Modal/FormModalImage';
import theme from '../../assets/styles/common.js';

class FormProperty extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			modalImageVisible: false,
			hasCameraPermission: null,
			type: Camera.Constants.Type.back,
			pictureUri: undefined,
		};
	}

	async componentDidMount() {
		const { status } = await Camera.requestPermissionsAsync();
		this.setState({ hasCameraPermission: status === 'granted' });
	}

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
		const { values, handleChange, handleImage, removeImage, handlePicker } = this.props;
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
							identifier="northFacingImage"
						/>
						<FormModalImage
							isOpen={this.state.modalImageVisible}
							setModalVisible={this.setModalImageVisible}
							imageUri={values.photos.northFacingImage}
							removeImage={removeImage}
		          			identifier="northFacingImage"
						/>

						<CsAppTitle>1.0 Property</CsAppTitle>
						<CsAppText>Enter the survey details below;</CsAppText>
						


						<View style={styles.row}>
							
					        <View style={styles.one2}>
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

							<View style={styles.one2}>
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
								<CsAppLabel>Type</CsAppLabel>
								<Picker
					              note
					              mode="dropdown"
					              style={styles.picker}
					              placeholder="- Select -"
					              iosIcon={<Icon name="arrow-down" />}
					              selectedValue={values.type}
					              onValueChange={handlePicker('type')}
					            >
									<Picker.Item label="Detached" value="Detached" />
									<Picker.Item label="Semi-detached" value="Semi-detached" />
									<Picker.Item label="Mid-terraced" value="Mid-terraced" />
									<Picker.Item label="End-terraced" value="End-terraced" />
									<Picker.Item label="Bungalow" value="Bungalow" />
									<Picker.Item label="Flat" value="Flat" />
									<Picker.Item label="Apartment" value="Apartment" />
									<Picker.Item label="Maisonette" value="Maisonette" />
									<Picker.Item label="Other" value="Other" />
					            </Picker>
					        </View>

					        <View style={styles.one2}>
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
						</View>

						<View style={styles.row}>
					        <View style={styles.one2}>
								<CsAppLabel>Dwelling</CsAppLabel>
								<Picker
					              note
					              mode="dropdown"
					              style={styles.picker}
					              placeholder="- Select -"
					              iosIcon={<Icon name="arrow-down" />}
					              selectedValue={values.dwelling}
					              onValueChange={handlePicker('dwelling')}
					            >
									<Picker.Item label="More than 1 floor" value="More than 1 floor" />
									<Picker.Item label="1 floor, located 5 storeys or more above ground level" value="1 floor, located 5 storeys or more above ground level" />
									<Picker.Item label="1 floor, located 1-4 floors above ground level" value="1 floor, located 1-4 floors above ground level" />
					            </Picker>
					        </View>

					        <View style={styles.one2}>
								<CsAppLabel>Floors occupied</CsAppLabel>
								<Picker
					              note
					              mode="dropdown"
					              style={styles.picker}
					              placeholder="- Select -"
					              iosIcon={<Icon name="arrow-down" />}
					              selectedValue={values.floorsOccupied}
					              onValueChange={handlePicker('floorsOccupied')}
					            >
									<Picker.Item label="Basement" value="Basement" />
									<Picker.Item label="Lower ground floor" value="Lower ground floor" />
									<Picker.Item label="Ground floor" value="Ground floor" />
									<Picker.Item label="1st Floor" value="1st Floor" />
									<Picker.Item label="2nd Floor" value="2nd Floor" />
									<Picker.Item label="3rd Floor" value="3rd Floor" />
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
							    <View style={styles.photoRow}>
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
									<Text 
										style={styles.photoButton}
										onPress={() => {
											this.setWhichImage('northFacingImage');
	           								this._pickImage();
							    			}
										}
									>
										Pick Photo
									</Text>
								</View>
							</View>
						</View>
						<View>
							<View style={styles.row}>
								<View style={styles.one1}>
									<CsAppLabel>Description</CsAppLabel>
									<CsBigInput
									  	handleChange={handleChange}
										values={values}
										identifier="propertyDescription"
									/>
								</View>
							</View>
						</View>
					</ScrollView>
					<FormControls
						nextStep={this.props.nextStep}
						prevStep={this.props.prevStep}
					/>
				</Container>
			)
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
  	flex:2,
  	margin:5,
  },
  picker: theme.PICKER,
  cameraButton: {
  	backgroundColor: "#fff",
  	borderColor:'#DDDDDD',
  	borderWidth:1,
  	marginTop: 20,
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
export default FormProperty;