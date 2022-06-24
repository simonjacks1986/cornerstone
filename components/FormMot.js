import React, { Component } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
import FormIntroduction from './FormScreens/FormIntroduction';
import FormMoistureMOT from './FormScreens/FormMoistureMOT';
import FormProperty from './FormScreens/FormProperty';
import FormExterior from './FormScreens/FormExterior';
import FormRainwaterManagement from './FormScreens/FormRainwaterManagement';
import FormSupportingInformationExterior from './FormScreens/FormSupportingInformationExterior';
import FormInternal from './FormScreens/FormInternal';
import FormSupportingInformationMoistureSurvey from './FormScreens/FormSupportingInformationMoistureSurvey';
import FormVentilation from './FormScreens/FormVentilation';
import FormInsulations from './FormScreens/FormInsulations';
import FormObservationsGeneral from './FormScreens/FormObservationsGeneral';
import FormObservationsThermal from './FormScreens/FormObservationsThermal';
import FormAtmospherics from './FormScreens/FormAtmospherics';
import FormAdvisories from './FormScreens/FormAdvisories';
import FormModalHeaderMenu from './Modal/FormModalHeaderMenu';

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
		const {values, handleChange, validate, handlePicker, handleImage, handleChoice, handleSignature, handleFormSubmit, handleSetDate, removeImage, compressImages } = this.props;

		
		switch(step){
			case 1:
				return (
					<FormIntroduction 
						nextStep={this.nextStep}
					/>
				)
			case 2: 
				return(
					<FormMoistureMOT
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						compressImages={compressImages}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleImage={handleImage}
						handleChoice={handleChoice}
						values={values}
						removeImage={removeImage}
					/>
				)
			case 3: 
				return(
					<FormProperty
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleChoice={handleChoice}
						handlePicker={handlePicker}
						handleImage={handleImage}
						values={values}
						removeImage={removeImage}
					/>
				)
			case 4: 
				return(
					<FormExterior
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleImage={handleImage}
						handleColourChoice={handleChoice}
						values={values}
						removeImage={removeImage}
					/>
				)
			case 5: 
				return(
					<FormRainwaterManagement
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleImage={handleImage}
						handleColourChoice={handleChoice}
						values={values}
						removeImage={removeImage}
					/>
				)
			case 6: 
				return(
					<FormSupportingInformationExterior
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleTickBox={handleChoice}
						handleColourChoice={handleChoice}
						handleImage={handleImage}
						values={values}
						removeImage={removeImage}
					/>
				)
			case 7: 
				return(
					<FormInternal
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleTickBox={handleChoice}
						handleColourChoice={handleChoice}
						values={values}
					/>
				)
			case 8: 
				return(
					<FormSupportingInformationMoistureSurvey
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleColourChoice={handleChoice}
						handleImage={handleImage}
						values={values}
						removeImage={removeImage}
					/>
				)
			case 9: 
				return(
					<FormVentilation
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleColourChoice={handleChoice}
						values={values}
					/>
				)
			case 10: 
				return(
					<FormInsulations
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleColourChoice={handleChoice}
						handleTickBox={handleChoice}
						handleImage={handleImage}
						values={values}
						removeImage={removeImage}
					/>
				)
			case 11: 
				return(
					<FormObservationsGeneral
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleColourChoice={handleChoice}
						handleImage={handleImage}
						values={values}
						removeImage={removeImage}
					/>
				)
			case 12: 
				return(
					<FormObservationsThermal
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleColourChoice={handleChoice}
						handleImage={handleImage}
						values={values}
						removeImage={removeImage}
					/>
				)
			case 13: 
				return(
					<FormAtmospherics
						nextStep={this.nextStep}
						prevStep={this.prevStep}
						handleChange={handleChange}
						handlePicker={handlePicker}
						handleTickBox={handleChoice}
						values={values}
					/>
				)
			case 14: 
				return(
					<FormAdvisories
						prevStep={this.prevStep}
						handleChange={handleChange}
						handleColourChoice={handleChoice}
						handleSignature={handleSignature}
						handleFormSubmit={handleFormSubmit}
						handleChoice={handleChoice}
						values={values}
						isUploading={values.isUploading}
					/>
				)
		}
	}
}

export default UserForm;