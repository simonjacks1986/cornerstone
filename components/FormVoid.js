import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import FormIntroduction from './VoidScreens/FormIntroduction';
import VoidHealthSafety from './VoidScreens/VoidHealthSafety';
import VoidKitchen from './VoidScreens/VoidKitchen';
import VoidBathroomToilet from './VoidScreens/VoidBathroomToilet';
import VoidDoorsWindows from './VoidScreens/VoidDoorsWindows';
import VoidInternally from './VoidScreens/VoidInternally';
import VoidDampCondensation from './VoidScreens/VoidDampCondensation';
import VoidExternalAreas from './VoidScreens/VoidExternalAreas';
import VoidOverallCondition from './VoidScreens/VoidOverallCondition';
import VoidAdditionalWorks from './VoidScreens/VoidAdditionalWorks';
import VoidAdditionalComments from './VoidScreens/VoidAdditionalComments';


class UserForm extends Component {
	constructor(props) {
		super(props);
		this.state = {
			step: 1,
		}
	}

	nextStep = () => {
	    const { step } = this.state;
	    this.setState({ step: step + 1 });
	}
	prevStep = () => {
		const { step } = this.state;
		this.setState({ step: step - 1 });
	}

	render(){
		const { step } = this.state;
		const {values, handleChange, validate, handleChoice, handleSignature, handleFormSubmit } = this.props;
		
		switch(step){
			case 1:
				return (
					<FormIntroduction 
						nextStep={this.nextStep}
					/>
				)
			case 2: 
				return(
					<VoidHealthSafety 
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						values={values}
					/>
				)
			case 3: 
				return(
					<VoidKitchen 
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						values={values}
					/>
				)	
			case 4: 
				return(
					<VoidBathroomToilet 
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						values={values}
					/>
				)	
			case 5: 
				return(
					<VoidDoorsWindows 
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						values={values}
					/>
				)	
			case 6: 
				return(
					<VoidInternally 
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						values={values}
					/>
				)
			case 7: 
				return(
					<VoidDampCondensation 
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						values={values}
					/>
				)
			case 8: 
				return(
					<VoidExternalAreas 
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						values={values}
					/>
				)
			case 9: 
				return(
					<VoidOverallCondition 
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						values={values}
					/>
				)
			case 10: 
				return(
					<VoidAdditionalWorks 
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						values={values}
					/>
				)
			case 11: 
				return(
					<VoidAdditionalComments 
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						values={values}
						handleFormSubmit={handleFormSubmit}
						isUploading={values.isUploading}
					/>
				)
		}
	}
}

export default UserForm;