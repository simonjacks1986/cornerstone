import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text } from 'react-native';
import FormControls from './FormControls';
import CsAppText from '../CsAppText';
import CsAppLabel from '../CsAppLabel';
import CsAppTitle from '../CsAppTitle';
import CsInput from '../CsInput';
import { Picker, Icon, Button } from "native-base";
import FormModalColourPicker from './Modal/FormModalColourPicker';
import FormModalCamera from './Modal/FormModalCamera';
import FormModalImage from './Modal/FormModalImage';
import FormObservationThermalSection from './Sections/FormObservationThermalSection';

class FormObservationsThermal extends Component {
	constructor(props) {
	  super(props);
	  this.state = {
	    modalColourVisible: false,
	  	modalCameraVisible: false,
	  	modalImageVisible: false,
	    whichGrade: 1,
	    whichImage: "notSet",
	    hasCameraPermission: null,
	    additionalSections: this.props.values.obstAmountOfSections,
	  };
	}
	
	setModalColourVisible = visible => this.setState({modalColourVisible: visible});
	setModalCameraVisible = visible => this.setState({modalCameraVisible: visible});
	setModalImageVisible = visible => this.setState({modalImageVisible: visible});
	setWhichGrade = which => this.setState({whichGrade: which});
	setWhichImage = which => this.setState({whichImage: which});

	handleColours = which => {
		const { handleColourChoice } = this.props;
		handleColourChoice('obsTherGrade' + this.state.whichGrade, which);
		this.setModalColourVisible(!this.state.modalColourVisible);
	}
	
	setAdditionalSections = amount => {
		let incrementAmount = this.state.additionalSections;
		this.setState({additionalSections: incrementAmount + 1});
	    const { handleColourChoice } = this.props;
	    handleColourChoice('obstAmountOfSections', this.state.additionalSections + 1);
	}

	render(){
		const values2 = this.state;
		let loopCount = 1;
		const { values, handleChange, handlePicker, handleImage } = this.props;
		const items = [];

		for (var i = 1; i <= this.state.additionalSections; i++) {
			items.push(<FormObservationThermalSection
				handleChange={handleChange}
				handlePicker={handlePicker}
				handleImage={handleImage}
				handleColours={this.handleColours}
				topValues={values2}
				values={values}
				iteration={i}
				key={i}
				setModalVisible={this.setModalColourVisible}
				setWhichGrade={this.setWhichGrade}
				setWhichImage={this.setWhichImage}
			/>)
		}
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

				<CsAppTitle>6.1 Observations - Thermal</CsAppTitle>
				<CsAppText>Enter the survey details below.</CsAppText>
				<View>
					{items}
					<View>
						<Button
							style={styles.addButtton}
							onPress={() => { this.setAdditionalSections(1) }}
						>
							<Text style={styles.addButttonText}>Add another section +</Text>
						</Button>
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
  addButtton: {
  	backgroundColor: '#E5E5E5',
  	width:220,
  	justifyContent: 'center',
  	borderRadius:3,
  	height:48,
  	marginTop:20,
  	marginBottom:40,
  },
  addButttonText: {
  	color:'#122F45',
  },
});
export default FormObservationsThermal;