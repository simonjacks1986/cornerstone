import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import FormControls from './FormControls';
import { Picker, Icon } from "native-base";
import CsAppText from '../CsAppText';
import CsAppLabel from '../CsAppLabel';
import CsAppTitle from '../CsAppTitle';
import CsInput from '../CsInput';
import FormModalColourPicker from './Modal/FormModalColourPicker';
import FormModalCamera from './Modal/FormModalCamera';
import FormModalImage from './Modal/FormModalImage';

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

	render(){
		const { values, handleChange, handleImage, handlePicker } = this.props;
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

				<CsAppTitle>2.1 Rainwater Management</CsAppTitle>
				<CsAppText>Enter the survey details below.</CsAppText>
				<View>

					<View style={styles.row}>
						<View style={styles.rowFirst}>
							<CsAppLabel>Roof</CsAppLabel>
							<Picker
					            note
					            mode="dropdown"
					            style={styles.picker}
					            placeholder="- Select -"
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.rmRoof}
					            onValueChange={handlePicker('rmRoof')}
					        >
					            <Picker.Item label="Tile" value="Tile" />
					            <Picker.Item label="Slate" value="Slate" />
					            <Picker.Item label="Flat" value="Flat" />
					            <Picker.Item label="Corrugated" value="Corrugated" />
					            <Picker.Item label="Clad" value="Clad" />
					            <Picker.Item label="Standard Pitched" value="Standard Pitched" />
					            <Picker.Item label="Mono" value="Mono" />
					            <Picker.Item label="Butterfly" value="Butterfly" />
					            <Picker.Item label="Mansard" value="Mansard" />
					            <Picker.Item label="N/A" value="N/A" />
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
							</View>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Comment</CsAppLabel>
						    <CsInput
							  	handleChange={handleChange}
								values={values}
								identifier="rmComment1"
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
							<CsAppLabel>Gutters</CsAppLabel>
							<Picker
					            note
					            mode="dropdown"
					            style={styles.picker}
					            placeholder="- Select -"
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.rmGutters}
					            onValueChange={handlePicker('rmGutters')}
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
							</View>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Comment</CsAppLabel>
							<CsInput
							  	handleChange={handleChange}
								values={values}
								identifier="rmComment2"
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
					            iosIcon={<Icon name="arrow-down" />}
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
							</View>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Comment</CsAppLabel>
							<CsInput
							  	handleChange={handleChange}
								values={values}
								identifier="rmComment3"
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
					            iosIcon={<Icon name="arrow-down" />}
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
							</View>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Comment</CsAppLabel>
							<CsInput
							  	handleChange={handleChange}
								values={values}
								identifier="rmComment4"
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
export default FormRainwaterManagement;
