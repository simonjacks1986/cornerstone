import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Image } from 'react-native';
import FormControls from './FormControls';
import CsAppText from '../CsAppText';
import CsAppLabel from '../CsAppLabel';
import CsAppTitle from '../CsAppTitle';
import CsInput from '../CsInput';
import CsBigInput from '../CsBigInput';
import FormModalColourPicker from './Modal/FormModalColourPicker';
import FormModalCamera from './Modal/FormModalCamera';
import FormModalImage from './Modal/FormModalImage';
import { Picker, Icon } from "native-base";

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
		};
	}

	setModalColourVisible = visible => this.setState({modalColourVisible: visible});
	setModalCameraVisible = visible => this.setState({modalCameraVisible: visible});
	setModalImageVisible = visible => this.setState({modalImageVisible: visible});
	setWhichGrade = which => this.setState({whichGrade: which});
	setWhichImage = which => this.setState({whichImage: which});
	
	handleColours = which => {
		const { handleColourChoice } = this.props;
		handleColourChoice('insGrade' + this.state.whichGrade, which);
		this.setModalColourVisible(!this.state.modalColourVisible);
	}

	render(){
		const values2 = this.state;
		const { values, handleTickBox, handleChange, handlePicker, handleImage } = this.props;

		const items = [];		
		return(
			<View style={styles.container}>
				<FormModalColourPicker
					isOpen={this.state.modalColourVisible}
					setModalVisible={this.setModalColourVisible}
					handleColours={this.handleColours}
				/>

				<FormModalImage
					isOpen={this.state.modalImageVisible}
					setModalVisible={this.setModalImageVisible}
					imageUri={values.photos[this.state.whichImage]}
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
						<View style={styles.row1}>
							<CsAppLabel>Yes</CsAppLabel>
							<TouchableHighlight
								style={styles.clickBoxWidth}
								onPress={() => {
									handleTickBox('insLoft', 1)
								}}
							>
								<View style={styles.clickBox}>
									{ (values.insLoft == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
								</View>
							</TouchableHighlight>
						</View>
						<View style={styles.row1}>
							<CsAppLabel>No</CsAppLabel>
							<TouchableHighlight
								style={styles.clickBoxWidth}
								onPress={() => {
									handleTickBox('insLoft', 0)
								}}
							>
								<View style={styles.clickBox}>
									{ (values.insLoft == 0) && <View><Image source={require('../../assets/check.png')}/></View> }
								</View>
							</TouchableHighlight>
						</View>
						<View style={styles.rowFull}>
							<CsAppLabel>Condition</CsAppLabel>
							<Picker
					            note
					            mode="dropdown"
					            style={styles.picker}
					            placeholder="- Select -"
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.insCoverage1}
					            onValueChange={handlePicker('insCoverage1')}
					        >
					            <Picker.Item label="Complete" value="Complete" />
					            <Picker.Item label="Incomplete" value="Incomplete" />
					            <Picker.Item label="Unknown" value="Unknown" />
					            <Picker.Item label="None" value="None" />
					            <Picker.Item label="N/A" value="Option" />
					            
					        </Picker>
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
						<View style={styles.row1}>
							<CsAppLabel>Yes</CsAppLabel>
							<TouchableHighlight
								style={styles.clickBoxWidth}
								onPress={() => {
									handleTickBox('insOther', 1)
								}}
							>
								<View style={styles.clickBox}>
									{ (values.insOther == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
								</View>
							</TouchableHighlight>
						</View>
						<View style={styles.row1}>
							<CsAppLabel>No</CsAppLabel>
							<TouchableHighlight
								style={styles.clickBoxWidth}
								onPress={() => {
									handleTickBox('insOther', 0)
								}}
							>
								<View style={styles.clickBox}>
									{ (values.insOther == 0) && <View><Image source={require('../../assets/check.png')}/></View> }
								</View>
							</TouchableHighlight>
						</View>
						<View style={styles.rowFull}>
							<CsAppLabel>Condition</CsAppLabel>
							<Picker
					            note
					            mode="dropdown"
					            style={styles.picker}
					            placeholder="- Select -"
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.insCoverage2}
					            onValueChange={handlePicker('insCoverage2')}
					        >
					        	<Picker.Item label="None" value="None" />
					            <Picker.Item label="Unknown" value="Unknown" />
					            <Picker.Item label="N/A" value="Option" />
					        </Picker>
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
							</View>
						</View>
					</View>
				</View>	

				<FormControls
					nextStep={this.props.nextStep}
					prevStep={this.props.prevStep}
				/>
			</View>
		)
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
  	padding:5,
  	alignItems: 'center',
  	justifyContent: 'center',
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