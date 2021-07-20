import React, { Component } from 'react';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Container, Button, Text, Footer, FooterTab } from "native-base";
import CsAppText from '../Parts/CsAppText';
import CsAppTitle from '../Parts/CsAppTitle';
import FormModalColourPicker from '../Modal/FormModalColourPicker';

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
					<CsAppTitle>Void</CsAppTitle>
					<CsAppText>Void introduction text here</CsAppText>
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
  	color: "#fff",
  }
});

export default FormIntroduction;