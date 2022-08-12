import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Text, ScrollView } from 'react-native';
import { Picker, Icon, Button, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import FormModalImage from '../Modal/FormModalImage';
import FormObservationThermalSection from './Sections/FormObservationThermalSection';
import theme from '../../assets/styles/common.js';

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
	    advisories: []
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
	setAdditionalSections(amount){
		let incrementAmount = this.state.additionalSections;
		if(incrementAmount + amount >= 0) {
			this.setState({additionalSections: incrementAmount + amount});
		    const { handleColourChoice } = this.props;
		    handleColourChoice('obstAmountOfSections', this.state.additionalSections + amount);
		}
	}

	setAdvisories = () => {
		let pushAdvisories = [];
		let inc = 1
		let pushItems = []
		while(inc <= this.state.additionalSections) {
			if (this.props.values['obsTherGrade' + inc] == 1) {
				let loopItem = [
					"Location",
					this.props.values['obsTherLocation' + inc],
					this.props.values['obsTherComment' + inc]
				]
				pushItems.push(loopItem)
			}
			inc++
		}
		this.props.handleAdvisories('6.1 Observations - Thermal', pushItems)
	}

	render(){
		const values2 = this.state;
		let loopCount = 1;
		const { values, handleChange, handlePicker, handleImage, removeImage } = this.props;
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
				removeImage={removeImage}
			/>)
		}
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

					<CsAppTitle>6.1 Observations - Thermal</CsAppTitle>
					<CsAppText>Enter the survey details below.</CsAppText>
					<View>
						{items}
						<View style={styles.addButttonContainer}>
							<Button
								style={styles.addButtton}
								onPress={() => { this.setAdditionalSections(1) }}
							>
								<Text style={styles.addButttonText}>Add another section +</Text>
							</Button>
							<Button
								style={styles.addButtton}
								onPress={() => { this.setAdditionalSections(-1) }}
							>
								<Text style={styles.addButttonText}>Remove section -</Text>
							</Button>
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
  addButttonContainer: {
  	marginBottom:40,
  	marginTop:20,
  	justifyContent: 'space-between',
  	flexDirection: 'row'
  },
  addButtton: {
  	backgroundColor: '#E5E5E5',
  	width:220,
  	justifyContent: 'center',
  	borderRadius:3,
  	height:48,
  },
  addButttonText: {
  	color:'#122F45',
  },
});
export default FormObservationsThermal;