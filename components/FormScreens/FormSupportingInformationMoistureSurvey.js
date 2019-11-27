import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View } from 'react-native';
import FormControls from './FormControls';
import CsAppText from '../CsAppText';
import CsAppLabel from '../CsAppLabel';
import CsAppTitle from '../CsAppTitle';
import CsInput from '../CsInput';
import FormMoistureSection from './Sections/FormMoistureSection';
import FormModalColourPicker from './Modal/FormModalColourPicker';
import { Button, Text } from "native-base";

class FormSupportingInformationMoistureSurvey extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			whichGrade: 1,
			additionalSections: this.props.values.simAmountOfSections,
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
		this.setState({additionalSections: incrementAmount + 1});
	    const { handleColourChoice } = this.props;
	    handleColourChoice('simAmountOfSections', this.state.additionalSections + 1);
	}
	handleColours = which => {
		const { handleColourChoice } = this.props;
		handleColourChoice('simGrade' + this.state.whichGrade, which);
		this.setModalVisible(!this.state.modalVisible);
	}
				
	render(){
		let loopCount = 1;
		const { values, handleChange, handlePicker } = this.props;
		const items = [];

		for (var i = 1; i <= this.state.additionalSections; i++) {
			items.push(<FormMoistureSection
				handleChange={handleChange}
				handlePicker={handlePicker}
				values={values}
				iteration={i}
				key={i}
				setModalVisible={this.setModalVisible}
				setWhichGrade={this.setWhichGrade}
			/>)
		}
		return(
			<View style={styles.container}>
				<FormModalColourPicker
					isOpen={this.state.modalVisible}
					setModalVisible={this.setModalVisible}
					handleColours={this.handleColours}
				/>

				<CsAppTitle>3.1 Supporting Information Moisture Survey</CsAppTitle>
				<CsAppText>Enter the survey details below.</CsAppText>
				<View>
					{items}
					<View>
						<Button
							style={styles.addButtton}
							onPress={() => { this.setAdditionalSections(1) }}
						>
							<Text style={styles.addButttonText}>Add another room +</Text>
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
  	flex:1,
  	margin:5
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
  }
});
export default FormSupportingInformationMoistureSurvey;