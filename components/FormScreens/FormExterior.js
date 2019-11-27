import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, Image } from 'react-native';
import FormControls from './FormControls';
import CsAppText from '../CsAppText';
import { Picker, Icon } from "native-base";
import CsAppLabel from '../CsAppLabel';
import CsAppTitle from '../CsAppTitle';
import CsInput from '../CsInput';
import FormModalColourPicker from './Modal/FormModalColourPicker';
import FormModalCamera from './Modal/FormModalCamera';
import FormModalImage from './Modal/FormModalImage';
import * as Permissions from 'expo-permissions';
import { Camera } from 'expo-camera';

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
		const { status } = await Permissions.askAsync(Permissions.CAMERA);
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
					              iosIcon={<Icon name="arrow-down" />}
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
					              <Picker.Item label="None" value="None" />
					        </Picker>
						</View>
						<View style={styles.rowFirst}>
							<CsAppLabel>Insulated</CsAppLabel>
							<Picker
					              note
					              mode="dropdown"
					              style={styles.picker}
					              placeholder="- Select -"
					              iosIcon={<Icon name="arrow-down" />}
					              selectedValue={values.exInsulated}
					              onValueChange={handlePicker('exInsulated')}
					            >
					              <Picker.Item label="None" value="None" />
					              <Picker.Item label="Unconfirmed" value="Unconfirmed" />
					              <Picker.Item label="Cavity" value="Cavity" />
					              <Picker.Item label="External" value="External" />
					              <Picker.Item label="Internal" value="Internal" />
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
					              iosIcon={<Icon name="arrow-down" />}
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
							</View>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Comment</CsAppLabel>
						    <CsInput
							  	handleChange={handleChange}
								values={values}
								identifier="exComment1"
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
					              iosIcon={<Icon name="arrow-down" />}
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
							</View>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Comment</CsAppLabel>
							<CsInput
							  	handleChange={handleChange}
								values={values}
								identifier="exComment2"
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
					            iosIcon={<Icon name="arrow-down" />}
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
							</View>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Comment</CsAppLabel>
							<CsInput
							  	handleChange={handleChange}
								values={values}
								identifier="exComment3"
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
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.exDoors}
					            onValueChange={handlePicker('exDoors')}
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
							</View>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Comment</CsAppLabel>
							<CsInput
							  	handleChange={handleChange}
								values={values}
								identifier="exComment4"
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
					            iosIcon={<Icon name="arrow-down" />}
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
							</View>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Comment</CsAppLabel>
							<CsInput
							  	handleChange={handleChange}
								values={values}
								identifier="exComment5"
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
					            iosIcon={<Icon name="arrow-down" />}
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
							</View>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Comment</CsAppLabel>
							<CsInput
							  	handleChange={handleChange}
								values={values}
								identifier="exComment6"
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
});
export default FormExterior;