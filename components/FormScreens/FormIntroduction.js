import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Container, Button, Text, Footer, FooterTab } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppTitle from '../Parts/CsAppTitle';
import theme from '../../assets/styles/common.js';

class FormIntroduction extends Component {
  	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	}

	render(){
		return(
			<Container style={styles.container}>
				<ScrollView>
					<CsAppTitle>Moisture MOT</CsAppTitle>
					<CsAppText>This Moisture MOT® surveying process focusses on all elements of a structure that may give rise to its health condition at the time of the survey.</CsAppText>
					<CsAppText>Designed to follow a sequential and logical process for gathering pertinent data, the system identifies current conditions that will provide a defined report for the building.</CsAppText>
					<CsAppText>Advisories will be generated where anomalies are noted for any subsequent remediation.</CsAppText>
					<CsAppText>Where the health of the structure is deemed to be compliant by Cornerstone a Certificate of Moisture Condition will be issued.</CsAppText>
					<CsAppText>Enter all relevant information in a sequential manner completing the sections aligned to the structure being surveyed.</CsAppText>
					<CsAppText>Where issues are observed, select the appropriate Warning Grade and complete the observation by populating the Advisory section.</CsAppText>
					<CsAppText>Upon completion, the report is despatched to a SMART knowledge portal where an expert review will determin the Certificate of Condition being issued.</CsAppText>
					<Text style={styles.boldText}>Note:</Text>
					<CsAppText>Prior to the commencement of a survey, all measuring equipement is to have undergone calibration in accordance with manufacturers guidelines</CsAppText>
					<Text style={styles.boldText}>Relevant Standards and Guidelines:</Text>
					<Text style={{color: '#15354E'}}>The Building Regulations 2010 - Approved Document F</Text>
					<CsAppText>BS5250:2002 Code of Practice for Control of Condensation in Buildings: Annex B</CsAppText>
				</ScrollView>
				<Footer>
          			<FooterTab style={styles.buttons}>
						<Button
							style={styles.button}
							onPress = {this.continue}
						>
							<Text style={styles.title}>Start Survey</Text>
						</Button>
					</FooterTab>
				</Footer>
			</Container>
		)
	}
}
let {Platform} = React;
const styles = StyleSheet.create({
  container: theme.CONTAINER,
  buttons: {
  	paddingTop: (Platform.OS === 'ios') ? 10 : 0,
  	backgroundColor: '#F4F6FC',
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
  	color: '#fff',
  },
  boldText: {
  	fontSize: 16, 
  	marginTop: 10, 
  	color: '#15354E',
  	fontWeight: 'bold'
  }
});


export default FormIntroduction;