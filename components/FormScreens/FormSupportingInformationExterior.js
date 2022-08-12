import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Image, ScrollView } from 'react-native';
import { Button, Text, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import FormGradeSection from './Sections/FormGradeSection';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import theme from '../../assets/styles/common.js';

class FormSupportingInformationExterior extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalColourVisible: false,
			whichGrade: 1,
			additionalSections: this.props.values.suAmountOfSections,
			advisories: []
		};
	}
	
	setModalColourVisible = visible => this.setState({modalColourVisible: visible});
	setWhichGrade = which => this.setState({whichGrade: which});
	setWhichImage = which => this.setState({whichImage: which});

	setAdditionalSections(amount){
		let incrementAmount = this.state.additionalSections;
		if(incrementAmount + amount >= 0) {
			this.setState({additionalSections: incrementAmount + amount});
		    const { handleColourChoice } = this.props;
		    handleColourChoice('suAmountOfSections', this.state.additionalSections + amount);
		}
	}

	setAdvisories = () => {
		let pushAdvisories = [];
		let inc = 1
		let pushItems = []
		while(inc <= this.state.additionalSections) {
			if (this.props.values['suGrade' + inc] == 1) {
				let loopItem = [
					"Title",
					this.props.values['suTitle' + inc],
					this.props.values['suComment' + inc]
				]
				pushItems.push(loopItem)
			}
			inc++
		}
		this.props.handleAdvisories('2.2 Supporting Information Exterior', pushItems)
	}
	
	handleColours = which => {
		const { handleColourChoice } = this.props;
		handleColourChoice('suGrade' + this.state.whichGrade, which);
		this.setModalColourVisible(!this.state.modalColourVisible);
	}
				
	render(){
		const values2 = this.state;
		let loopCount = 1;
		
		const { values, handleChange, handleTickBox, handlePicker, handleImage, removeImage } = this.props;
		const items = [];

		for (var i = 1; i <= this.state.additionalSections; i++) {
			items.push(<FormGradeSection
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

					<CsAppTitle>2.2 Supporting Information Exterior</CsAppTitle>
					<CsAppText>Enter the survey details below.</CsAppText>
					<View>
						{items}
						<View>
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
							<Text style={styles.red}>Please note:</Text>
							<Text>Before entering the property, place a hygrometer/sensor outside to record external atmospheric conditions. The device is NOT to be placed in direct sunlight or where it can be affected by rainfall. Readings from the device are to be collected upon completion of the internal survey.</Text>              
						</View>
						<View style={styles.confirmLabel}>
						 	<CsAppLabel>Confirm</CsAppLabel>
							<TouchableHighlight
								style={styles.confirmBoxWidth}
								onPress={() => {
								  handleTickBox('supConfirm', 1)
								}}
							>
							<View style={styles.clickBox}>
							  	{ (values.supConfirm == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
							</View>
							</TouchableHighlight>
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
  red: {
  	color:'#FC0000',
  	marginBottom: 10,
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
  confirmLabel: {
    marginTop:20,
    marginLeft: 5,
  },
  confirmBoxWidth: {
    width:40,
    marginBottom: 20,
  },
});
export default FormSupportingInformationExterior;