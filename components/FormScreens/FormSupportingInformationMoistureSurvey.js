import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import FormMoistureSection from './Sections/FormMoistureSection';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import theme from '../../assets/styles/common.js';

class FormSupportingInformationMoistureSurvey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			whichGrade: 1,
			additionalSections: this.props.values.simAmountOfSections,
			advisories: []
		};
	}
	
	setModalVisible = visible =>  {
	    this.setState({modalVisible: visible});
	}
	setWhichGrade = which =>  {
		this.setState({whichGrade: which});	
	}
	setAdditionalSections(amount){
		let incrementAmount = this.state.additionalSections;
		if(incrementAmount + amount >= 0) {
			this.setState({additionalSections: incrementAmount + amount});
		    const { handleColourChoice } = this.props;
		    handleColourChoice('simAmountOfSections', this.state.additionalSections + amount);
		}
	}
	setAdvisories = () => {
		let pushAdvisories = [];
		let inc = 1
		let pushItems = []
		while(inc <= this.state.additionalSections) {
			if (this.props.values['simGrade' + inc] == 1) {
				let loopItem = [
					"Location",
					this.props.values['simLocation' + inc],
					this.props.values['simComment' + inc]
				]
				pushItems.push(loopItem)
			}
			inc++
		}
		this.props.handleAdvisories('3.1 Supporting Information Moisture Survey', pushItems)
	}

	handleColours = which => {
		const { handleColourChoice } = this.props;
		handleColourChoice('simGrade' + this.state.whichGrade, which);
		this.setModalVisible(!this.state.modalVisible);
	}
				
	render(){
		let loopCount = 1;
		const { values, handleChange, handlePicker, handleImage, removeImage } = this.props;
		const items = [];

		for (var i = 1; i <= this.state.additionalSections; i++) {
			items.push(<FormMoistureSection
				handleChange={handleChange}
				handlePicker={handlePicker}
				handleImage={handleImage}
				values={values}
				iteration={i}
				key={i}
				setModalVisible={this.setModalVisible}
				setWhichGrade={this.setWhichGrade}
			/>)
		}
		return(
			<Container style={styles.container}>
				<ScrollView>
					<FormModalColourPicker
						isOpen={this.state.modalVisible}
						setModalVisible={this.setModalVisible}
						handleColours={this.handleColours}
					/>

					<CsAppTitle>3.1 Supporting Information Moisture Survey</CsAppTitle>
					<CsAppText>Enter the survey details below.</CsAppText>
					<View>
						{items}
						<View style={styles.addButttonContainer}>
							<Button
								style={styles.addButtton}
								onPress={() => { this.setAdditionalSections(1) }}
							>
								<Text style={styles.addButttonText}>Add another room +</Text>
							</Button>
							<Button
								style={styles.addButtton}
								onPress={() => { this.setAdditionalSections(-1) }}
							>
								<Text style={styles.addButttonText}>Remove room -</Text>
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
  	flex:1,
  	margin:5
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
  }
});
export default FormSupportingInformationMoistureSurvey;