import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { Picker, Icon, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import CsBigInput from '../Parts/CsBigInput';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import FormModalCamera from '../Modal/FormModalCamera';
import FormModalImage from '../Modal/FormModalImage';
import * as ImagePicker from 'expo-image-picker';
import * as MediaLibrary from 'expo-media-library';
import * as ImageManipulator from 'expo-image-manipulator';
import theme from '../../assets/styles/common.js';

class FormInsulations extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalColourVisible: false,
		  	modalCameraVisible: false,
		  	modalImageVisible: false,
		    whichGrade: 1,
		    whichImage: "notSet",
		    hasCameraPermission: null,
		    advisoriesOptions: {
		    	1: ['Loft Insulations', 'insCoverage1', 'insDescription'],
		    	2: ['Other', 'insCoverage2', 'insDescription2'],
		    },
		    advisories: []
		};
	}

	setModalColourVisible = visible => this.setState({modalColourVisible: visible});
	setModalCameraVisible = visible => this.setState({modalCameraVisible: visible});
	setModalImageVisible = visible => this.setState({modalImageVisible: visible});
	setWhichGrade = which => this.setState({whichGrade: which});
	setWhichImage = which => this.setState({whichImage: which});

	setAdvisories = () => {
		let advisories = this.state.advisoriesOptions
		const keys = Object.keys(advisories);
		let pushAdvisories = [];
		keys.forEach((key, index) => {
			if (this.props.values['insGrade' + key] == 1) {
				let pushItems = []
				this.state.advisoriesOptions[key].map( (i, key) => {
					(key == 0) ? pushItems.push(i) : pushItems.push(this.props.values[i])
				} )
				pushAdvisories.push(pushItems);
			}
		});
		this.props.handleAdvisories('5.0 Insulations', pushAdvisories)
	}

	handleColours = which => {
		const { handleColourChoice } = this.props;
		handleColourChoice('insGrade' + this.state.whichGrade, which);
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
		const values2 = this.state;
		const { values, handleTickBox, handleChange, handlePicker, handleImage, removeImage } = this.props;

		const items = [];		
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

					<CsAppTitle>5.0 Insulations</CsAppTitle>
					<CsAppText>Enter the survey details below</CsAppText>
					
					<View style={styles.spacer}>
						<View style={styles.row}>
							<View style={styles.rowFull}>
								<Text>Loft insulations</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.rowFull}>
								<CsAppLabel>Details</CsAppLabel>
						        <CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="insCoverage1"
								/>
							</View>
							<View style={styles.rowFull}>
								<CsAppLabel>Depth (mm)</CsAppLabel>
								<CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="insDepth"
								/>
							</View>
							<View style={styles.row1}>
								<CsAppLabel>Grade</CsAppLabel>
								<TouchableHighlight
									style={styles.clickBoxWidth}
									onPress={() => {
										this.setModalColourVisible(true);
										this.setWhichGrade(1);
									}}
								>
									<View style={styles.clickBox}>
										{ (values.insGrade1 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.insGrade1 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.insGrade1 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.rowFull}>
								<CsAppLabel>Comment</CsAppLabel>
								<CsBigInput
								  	handleChange={handleChange}
									values={values}
									identifier="insDescription"
								/>
								<View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('insDescriptionImage');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.insDescriptionImage && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('insDescriptionImage');
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
											this.setWhichImage('insDescriptionImage');
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


					<View style={styles.spacer}>
						<View style={styles.row}>
							<View style={styles.rowFull}>
								<Text>Other</Text>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.rowFull}>
								<CsAppLabel>Details</CsAppLabel>
						        <CsInput
								  	handleChange={handleChange}
									values={values}
									identifier="insCoverage2"
								/>
							</View>
							<View style={styles.row1}>
								<CsAppLabel>Grade</CsAppLabel>
								<TouchableHighlight
									style={styles.clickBoxWidth}
									onPress={() => {
										this.setModalColourVisible(true);
										this.setWhichGrade(2);
									}}
								>
									<View style={styles.clickBox}>
										{ (values.insGrade2 == 3) && <View style={styles.clickBoxGreen}></View> }
										{ (values.insGrade2 == 2) && <View style={styles.clickBoxOrange}></View> }
										{ (values.insGrade2 == 1) && <View style={styles.clickBoxRed}></View> }
									</View>
								</TouchableHighlight>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.rowFull}>
								<CsAppLabel>Comment</CsAppLabel>
								<CsBigInput
								  	handleChange={handleChange}
									values={values}
									identifier="insDescription2"
								/>
								<View style={styles.photoRow}>
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('insDescriptionImage2');
											this.setModalCameraVisible(true);
							    			}
										}
									>
										Take Photo</Text>
									{ values.photos.insDescriptionImage2 && 
									<Text 
										style={styles.photoButton}
										onPress={() => {
							    			this.setWhichImage('insDescriptionImage2');
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
											this.setWhichImage('insDescriptionImage2');
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
				</ScrollView>
				<FormControls
					nextStep={this.props.nextStep}
					prevStep={this.props.prevStep}
					setAdvisories={this.setAdvisories}
				/>
			</Container>
		)
	}
}
const styles = StyleSheet.create({
  container: theme.CONTAINER,
  row: theme.ROW,
  row1: {
  	margin:5
  },
  rowFull: {
  	flex:1,
  	margin:5
  },
  rowFirst: {
  	flex:1,
  	margin:5
  },
  rowSecond: {
  	flex:1,
  	margin:5
  },
  rowThird: {
  	flex:5,
  	margin:5
  },
  rowFourth: {
  	flex:1,
  	margin:5
  },
  spacer: {
  	marginTop:20
  },
  modal : {
  	flex:1,
  	alignItems: 'center',
  	justifyContent: 'center',
  	flexDirection: 'row',
  	padding:40,
  	textAlign: 'center'
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
  picker: theme.PICKER,
  photoRow : {
  	flex:1,
  	justifyContent: 'space-between',
  	flexDirection: 'row',
  	marginTop: 10,
  },
  photoButton : {
  	flex:1,
  	justifyContent: 'space-between',
  	flexDirection: 'row',
  	color: '#2187FF',
  	textDecorationLine: 'underline',
  },
});
export default FormInsulations;