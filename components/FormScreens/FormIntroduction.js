import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text } from "native-base";
import FormControls from './FormControls';
import CsAppText from '../CsAppText';
import CsAppTitle from '../CsAppTitle';
import theme from '../../assets/styles/common.js';

class FormIntroduction extends Component {
  	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	}

	render(){
		return(
			<View style={styles.container}>
				<CsAppTitle>Moisture MOT</CsAppTitle>
				<CsAppText>This Moisture MOT® surveying process focusses on all elements of moisture generation, penetration and supply in a structure.</CsAppText>
				<CsAppText>Designed to follow a sequential and logical process for gathering pertinent data, the system identifies current conditions that will provide a defined report for the property.</CsAppText>
				<CsAppText>Advisories will be generated where anomalies are noted for any subsequent remediation.</CsAppText>
				<CsAppText>Where the health of the structure is deemed to be compliant by Cornerstone a Certificate of Moisture Condition will be issued.</CsAppText>
				<CsAppText>Enter all relevant information in a sequential manner completing the sections aligned to the structure being surveyed.</CsAppText>
				<CsAppText>Where issues are observed, select the appropriate Warning Grade and complete the observation by populating the Advisory section.</CsAppText>
				<Button
					style={styles.button}
					onPress = {this.continue}
				>
					<Text style={styles.title}>Start Survey</Text>
				</Button>
			</View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  button: {
  	backgroundColor: theme.PRIMARY_COLOR,
  	width:140,
	height: 48,
	alignSelf: 'flex-end',
	justifyContent: 'center',
	borderRadius: 1,
	marginTop:40,
  },
  title: {
  	fontSize: theme.FONT_SIZE_SMALL,
  }
});


export default FormIntroduction;