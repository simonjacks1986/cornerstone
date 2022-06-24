import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Picker, Icon, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import FormModalCamera from '../Modal/FormModalCamera';
import FormModalImage from '../Modal/FormModalImage';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import theme from '../../assets/styles/common.js';


class FormRainwaterManagement extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	modalColourVisible: false,
	  	modalCameraVisible: false,
	  	modalImageVisible: false,
	    whichGrade: 1,
	    whichImage: "notSet",
	  }; 
	}
	
	setModalColourVisible = visible => this.setState({modalColourVisible: visible});
	setModalCameraVisible = visible => this.setState({modalCameraVisible: visible});
	setModalImageVisible = visible => this.setState({modalImageVisible: visible});
	setWhichGrade = which => this.setState({whichGrade: which});
	setWhichImage = which => this.setState({whichImage: which});
	handleColours = which =>{
		const { handleColourChoice } = this.props;
		handleColourChoice('rmGrade' + this.state.whichGrade, which);
		this.setModalColourVisible(!this.state.modalColourVisible);
	}
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
		const { values, handleChange, handleImage, handlePicker, removeImage } = this.props;
		return(
			<Container style={styles.container}>
				<ScrollView>
					<FormModalColourPicker
						isOpen={this.state.modalColourVisible}
						setModalVisible={this.setModalColourVisible}
						handleColours={this.handleColours}
					/>

					<FormModalImage
						isOpen={this.state.modalImageVisible}
						setModalVisible={this.setModalImageVisible}
						imageUri={values.photos[this.state.whichImage]}
						removeImage={removeImage}
	          			identifier={this.state.whichImage}
					/>
					
					<FormModalCamera 
						isOpen={this.state.modalCameraVisible}
						setModalCameraVisible={this.setModalCameraVisible}
						handleImage={handleImage}
						identifier={this.state.whichImage}
					/>

					<CsAppTitle>2.1 Rainwater Management</CsAppTitle>
					<CsAppText>Enter the survey details below.</CsAppText>
					<View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Roof Type</CsAppLabel>
								<Picker
						            note
						            mode="dropdown"
						            style={styles.picker}
						            placeholder="- Select -"
						            iosIcon={<Icon name="chevron-down" />}
						            selectedValue={values.rmRoof}
						            onValueChange={handlePicker('rmRoof')}
						        >
						            <Picker.Item label="Flat" value="Flat" />
									<Picker.Item label="Pitched" value="Pitched" />
									<Picker.Item label="Pitched mono" value="Pitched mono" />
									<Picker.Item label="Pitched Butterfly" value="Pitched Butterfly" />
									<Picker.Item label="Mansard" value="Mansard" />
						        </Picker>
						        <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('rmRoof');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.rmRoof && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('rmRoof');
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
											this.setWhichImage('rmRoof');
               								this._pickImage();
							    			}
										}
									>
										Pick Photo
									</Text>
								</View>
							</View>
							<View style={styles.rowSecond}>
								<CsAppLabel>Comment</CsAppLabel>
							    <CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="rmComment1"
									multiline={true}
								/>
							</View>
							<View style={styles.rowThird}>
								<CsAppLabel>Grade</CsAppLabel>
								<TouchableHighlight
									style={styles.clickBoxWidth}
									onPress={() => {
										this.setModalColourVisible(true);
										this.setWhichGrade(1);
									}}
								>
									<View style={styles.clickBox}>
										{ (values.rmGrade1 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.rmGrade1 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.rmGrade1 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>


						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Roof System</CsAppLabel>
								<Picker
						            note
						            mode="dropdown"
						            style={styles.picker}
						            placeholder="- Select -"
						            iosIcon={<Icon name="chevron-down" />}
						            selectedValue={values.rmRoofSys}
						            onValueChange={handlePicker('rmRoofSys')}
						        >
									<Picker.Item label="Membrane sheet" value="Membrane sheet" />
									<Picker.Item label="Asphalt" value="Asphalt" />
									<Picker.Item label="Tile" value="Tile" />
									<Picker.Item label="Slate" value="Slate" />
									<Picker.Item label="Metal" value="Metal" />
									<Picker.Item label="Thatch" value="Thatch" />
						        </Picker>
						        <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('rmRoofSys');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.rmRoofSys && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('rmRoofSys');
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
											this.setWhichImage('rmRoofSys');
               								this._pickImage();
							    			}
										}
									>
										Pick Photo
									</Text>
								</View>
							</View>
							<View style={styles.rowSecond}>
								<CsAppLabel>Comment</CsAppLabel>
							    <CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="rmComment5"
									multiline={true}
								/>
							</View>
							<View style={styles.rowThird}>
								<CsAppLabel>Grade</CsAppLabel>
								<TouchableHighlight
									style={styles.clickBoxWidth}
									onPress={() => {
										this.setModalColourVisible(true);
										this.setWhichGrade(5);
									}}
								>
									<View style={styles.clickBox}>
										{ (values.rmGrade5 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.rmGrade5 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.rmGrade5 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Gutters</CsAppLabel>
								<Picker
						            note
						            mode="dropdown"
						            style={styles.picker}
						            placeholder="- Select -"
						            iosIcon={<Icon name="chevron-down" />}
						            selectedValue={values.rmGutters}
						            onValueChange={handlePicker('rmGutters')}
						        >
						            <Picker.Item label="uPVC" value="uPVC" />
						            <Picker.Item label="Composite" value="Composite" />
						            <Picker.Item label="Metal" value="Metal" />
						            <Picker.Item label="Asbestos" value="Asbestos" />
						            <Picker.Item label="Internal" value="Internal" />
						        </Picker>
						        <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('rmGutters');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.rmGutters && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('rmGutters');
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
											this.setWhichImage('rmGutters');
               								this._pickImage();
							    			}
										}
									>
										Pick Photo
									</Text>
								</View>
							</View>
							<View style={styles.rowSecond}>
								<CsAppLabel>Comment</CsAppLabel>
								<CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="rmComment2"
									multiline={true}
								/>
							</View>
							<View style={styles.rowThird}>
								<CsAppLabel>Grade</CsAppLabel>
								<TouchableHighlight
									style={styles.clickBoxWidth}
									onPress={() => {
										this.setModalColourVisible(true);
										this.setWhichGrade(2);
									}}
								>
									<View style={styles.clickBox}>
										{ (values.rmGrade2 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.rmGrade2 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.rmGrade2 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Downpipes</CsAppLabel>
								<Picker
						            note
						            mode="dropdown"
						            style={styles.picker}
						            placeholder="- Select -"
						            iosIcon={<Icon name="chevron-down" />}
						            selectedValue={values.rmPipes}
						            onValueChange={handlePicker('rmPipes')}
						        >
						            <Picker.Item label="uPVC" value="uPVC" />
						            <Picker.Item label="Composite" value="" />
						            <Picker.Item label="Metal" value="Metal" />
						            <Picker.Item label="Asbestos" value="Asbestos" />
						            <Picker.Item label="N/A" value="N/A" />
						        </Picker>
						        <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('rmPipes');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.rmPipes && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('rmPipes');
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
											this.setWhichImage('rmPipes');
               								this._pickImage();
							    			}
										}
									>
										Pick Photo
									</Text>
								</View>
							</View>
							<View style={styles.rowSecond}>
								<CsAppLabel>Comment</CsAppLabel>
								<CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="rmComment3"
									multiline={true}
								/>
							</View>
							<View style={styles.rowThird}>
								<CsAppLabel>Grade</CsAppLabel>
								<TouchableHighlight
									style={styles.clickBoxWidth}
									onPress={() => {
										this.setModalColourVisible(true);
										this.setWhichGrade(3);
									}}
								>
									<View style={styles.clickBox}>
										{ (values.rmGrade3 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.rmGrade3 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.rmGrade3 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Hoppers</CsAppLabel>
								<Picker
						            note
						            mode="dropdown"
						            style={styles.picker}
						            placeholder="- Select -"
						            iosIcon={<Icon name="chevron-down" />}
						            selectedValue={values.rmHoppers}
						            onValueChange={handlePicker('rmHoppers')}
						        >
						            <Picker.Item label="uPVC" value="uPVC" />
						            <Picker.Item label="Composite" value="" />
						            <Picker.Item label="Metal" value="Metal" />
						            <Picker.Item label="Asbestos" value="Asbestos" />
						            <Picker.Item label="N/A" value="N/A" />
						        </Picker>
						        <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('rmHoppers');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.rmHoppers && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('rmHoppers');
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
											this.setWhichImage('rmHoppers');
               								this._pickImage();
							    			}
										}
									>
										Pick Photo
									</Text>
								</View>
							</View>
							<View style={styles.rowSecond}>
								<CsAppLabel>Comment</CsAppLabel>
								<CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="rmComment4"
									multiline={true}
								/>
							</View>
							<View style={styles.rowThird}>
								<CsAppLabel>Grade</CsAppLabel>
								<TouchableHighlight
									style={styles.clickBoxWidth}
									onPress={() => {
										this.setModalColourVisible(true);
										this.setWhichGrade(4);
									}}
								>
									<View style={styles.clickBox}>
										{ (values.rmGrade4 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.rmGrade4 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.rmGrade4 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
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
const styles = StyleSheet.create({
  container: theme.CONTAINER,
  row: theme.ROW,
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
  closeButton: {
  	fontSize: 24,
  	fontWeight: 'bold',
  },
  clickBoxWidth: theme.CLICKBOXWIDTH,
  clickBox: theme.CLICKBOX,
  clickBoxRed: theme.CLICKBOXRED,
  clickBoxOrange: theme.CLICKBOXORANGE,
  clickBoxGreen:theme.CLICKBOXGREEN,
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
  },
  picker: theme.PICKER,
});
export default FormRainwaterManagement;
