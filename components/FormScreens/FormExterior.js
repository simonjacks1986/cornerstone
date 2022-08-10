import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Image, ScrollView } from 'react-native';
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
import { Camera } from 'expo-camera';
import theme from '../../assets/styles/common.js';

class FormExterior extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	  	modalColourVisible: false,
	  	modalCameraVisible: false,
	  	modalImageVisible: false,
	    whichGrade: 1,
	    whichImage: "notSet",
	    hasCameraPermission: null,
	  };
	}

	async componentDidMount() {
		const { status } = await Camera.requestCameraPermissionsAsync();
		this.setState({ hasCameraPermission: status === 'granted' });
	};
	
	setModalColourVisible = visible => this.setState({modalColourVisible: visible});
	setModalCameraVisible = visible => this.setState({modalCameraVisible: visible});
	setModalImageVisible = visible => this.setState({modalImageVisible: visible});
	setWhichGrade = which => this.setState({whichGrade: which});
	setWhichImage = which => this.setState({whichImage: which});
	handleColours = which => {
		const { handleColourChoice } = this.props;
		handleColourChoice('exGrade' + this.state.whichGrade, which);
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

					<CsAppTitle>2.0 Exterior</CsAppTitle>
					<CsAppText>Describe all exterior aspects as indicated and advise any anomalies accordingly.</CsAppText>
					<View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Exterior Wall Type</CsAppLabel>
								<Picker
						              note
						              mode="dropdown"
						              style={styles.picker}
						              placeholder="- Select -"
						              iosIcon={<Icon name="chevron-down" />}
						              selectedValue={values.exFacade}
						              onValueChange={handlePicker('exFacade')}
						            >
									<Picker.Item label="Brick" value="Brick" />
									<Picker.Item label="Stone" value="Stone" />
									<Picker.Item label="Timber" value="Timber" />
									<Picker.Item label="Render" value="Render" />
									<Picker.Item label="Panel" value="Panel" />
									<Picker.Item label="Clad" value="Clad" />
									<Picker.Item label="Mix" value="Mix" />
									<Picker.Item label="Solid" value="Solid" />
									<Picker.Item label="Cavity" value="Cavity" />
									<Picker.Item label="None" value="None" />
						        </Picker>
							</View>
							<View style={styles.rowFirst}>
								<CsAppLabel>Insulation</CsAppLabel>
								<Picker
						              note
						              mode="dropdown"
						              style={styles.picker}
						              placeholder="- Select -"
						              iosIcon={<Icon name="chevron-down" />}
						              selectedValue={values.exInsulated}
						              onValueChange={handlePicker('exInsulated')}
						            >
					              	<Picker.Item label="None" value="None" />
									<Picker.Item label="Unconfirmed" value="Unconfirmed" />
									<Picker.Item label="Cavity" value="Cavity" />
									<Picker.Item label="External" value="External" />
									<Picker.Item label="Internal" value="Internal" />
									<Picker.Item label="Cavity – retrofit" value="Cavity – retrofit" />
									<Picker.Item label="External – retrofit" value="External – retrofit" />
									<Picker.Item label="Internal - retrofit" value="Internal - retrofit" />
						        </Picker>
							</View>
						</View>


						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Construction material</CsAppLabel>
								<Picker
						              note
						              mode="dropdown"
						              style={styles.picker}
						              placeholder="- Select -"
						              iosIcon={<Icon name="chevron-down" />}
						              selectedValue={values.exConstruct}
						              onValueChange={handlePicker('exConstruct')}
						            >
									<Picker.Item label="Brick/Block" value="Brick/Block" />
									<Picker.Item label="Stone" value="Stone" />
									<Picker.Item label="Concrete" value="Concrete" />
									<Picker.Item label="Timber" value="Timber" />
									<Picker.Item label="Metal frame" value="Metal frame" />
									<Picker.Item label="Cob" value="Cob" />
						        </Picker>
							</View>
							<View style={styles.rowFirst}>
								<CsAppLabel>Exterior Finish</CsAppLabel>
								<Picker
						              note
						              mode="dropdown"
						              style={styles.picker}
						              placeholder="- Select -"
						              iosIcon={<Icon name="chevron-down" />}
						              selectedValue={values.exExFin}
						              onValueChange={handlePicker('exExFin')}
						            >
					              	<Picker.Item label="Natural" value="Natural" />
									<Picker.Item label="Render system" value="Render system" />
									<Picker.Item label="Cladding" value="Cladding" />
						        </Picker>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Finish Condition</CsAppLabel>
								<Picker
						              note
						              mode="dropdown"
						              style={styles.picker}
						              placeholder="- Select -"
						              iosIcon={<Icon name="chevron-down" />}
						              selectedValue={values.exFinish}
						              onValueChange={handlePicker('exFinish')}
						            >
						            <Picker.Item label="Good" value="Good" />
						            <Picker.Item label="Fair" value="Fair" />
									<Picker.Item label="Poor" value="Poor" />
									<Picker.Item label="N/A" value="N/A" />
						        </Picker>
							    <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exFinishImage');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.exFinishImage && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exFinishImage');
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
											this.setWhichImage('exFinishImage');
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
									identifier="exComment1"
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
										{ (values.exGrade1 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.exGrade1 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.exGrade1 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Bridging</CsAppLabel>
								<Picker
						              note
						              mode="dropdown"
						              style={styles.picker}
						              placeholder="- Select -"
						              iosIcon={<Icon name="chevron-down" />}
						              selectedValue={values.exBridging}
						              onValueChange={handlePicker('exBridging')}
						            >
						              <Picker.Item label="Yes" value="Yes" />
						              <Picker.Item label="No" value="No" />
						              <Picker.Item label="Bridging DPC" value="Bridging DPC" />
						              <Picker.Item label="Unconfirmed" value="Unconfirmed" />
						              <Picker.Item label="N/A" value="N/A" />
						        </Picker>
						        <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exBridging');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.exBridging && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exBridging');
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
											this.setWhichImage('exBridging');
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
									identifier="exComment2"
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
										{ (values.exGrade2 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.exGrade2 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.exGrade2 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Windows</CsAppLabel>
								<Picker
						            note
						            mode="dropdown"
						            style={styles.picker}
						            placeholder="- Select -"
						            iosIcon={<Icon name="chevron-down" />}
						            selectedValue={values.exWindows}
						            onValueChange={handlePicker('exWindows')}
						        >
						            <Picker.Item label="Wood" value="Wood" />
						            <Picker.Item label="uPVC" value="uPVC" />
						            <Picker.Item label="Metal" value="Metal" />
						            <Picker.Item label="None" value="None" />
						        </Picker>
						        <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exWindows');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.exWindows && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exWindows');
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
											this.setWhichImage('exWindows');
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
									identifier="exComment3"
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
										{ (values.exGrade3 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.exGrade3 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.exGrade3 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Doors</CsAppLabel>
								<Picker
						            note
						            mode="dropdown"
						            style={styles.picker}
						            placeholder="- Select -"
						            iosIcon={<Icon name="chevron-down" />}
						            selectedValue={values.exDoors}
						            onValueChange={handlePicker('exDoors')}
						        >
						            <Picker.Item label="Wood" value="Wood" />
						            <Picker.Item label="uPVC" value="uPVC" />
						            <Picker.Item label="Metal" value="Metal" />
						            <Picker.Item label="Composite" value="Composite" />
						            <Picker.Item label="None" value="None" />
						        </Picker>
						        <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exDoors');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.exDoors && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exDoors');
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
											this.setWhichImage('exDoors');
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
									identifier="exComment4"
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
										{ (values.exGrade4 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.exGrade4 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.exGrade4 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Fascias/Soffits</CsAppLabel>
								<Picker
						            note
						            mode="dropdown"
						            style={styles.picker}
						            placeholder="- Select -"
						            iosIcon={<Icon name="chevron-down" />}
						            selectedValue={values.exFascias}
						            onValueChange={handlePicker('exFascias')}
						        >
						        	<Picker.Item label="uPVC" value="uPVC" />
						            <Picker.Item label="Composite" value="" />
						            <Picker.Item label="Asbestos" value="Asbestos" />
						            <Picker.Item label="Timber" value="Timber" />
						            <Picker.Item label="None" value="None" />
						        </Picker>
						        <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exFascias');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.exFascias && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exFascias');
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
											this.setWhichImage('exFascias');
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
									identifier="exComment5"
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
										{ (values.exGrade5 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.exGrade5 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.exGrade5 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>

						<View style={styles.row}>
							<View style={styles.rowFirst}>
								<CsAppLabel>Stop Cock</CsAppLabel>
								<Picker
						            note
						            mode="dropdown"
						            style={styles.picker}
						            placeholder="- Select -"
						            iosIcon={<Icon name="chevron-down" />}
						            selectedValue={values.exStopCock}
						            onValueChange={handlePicker('exStopCock')}
						        >
						            <Picker.Item label="Yes" value="Yes" />
						            <Picker.Item label="No" value="No" />
						            <Picker.Item label="Unconfirmed" value="Unconfirmed" />
						        </Picker>
						        <View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exStopCock');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.exStopCock && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('exStopCock');
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
											this.setWhichImage('exStopCock');
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
									identifier="exComment6"
									multiline={true}
								/>
							</View>
							<View style={styles.rowThird}>
								<CsAppLabel>Grade</CsAppLabel>
								<TouchableHighlight
									style={styles.clickBoxWidth}
									onPress={() => {
										this.setModalColourVisible(true);
										this.setWhichGrade(6);
									}}
								>
									<View style={styles.clickBox}>
										{ (values.exGrade6 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.exGrade6 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.exGrade6 == 1) && <View style={styles.clickBoxRed}></View> }
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
  picker: {
  	padding:0,
  	margin:0,
  	backgroundColor: "#fff",
  	borderColor:'#DDDDDD',
  	borderWidth:1,
  	marginTop: 16,
  	borderRadius: 2,
  	marginBottom:10,
  	height:40
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
});
export default FormExterior;