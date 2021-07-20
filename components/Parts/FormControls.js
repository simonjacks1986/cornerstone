import React, { Component, } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button, Text, Footer, FooterTab } from "native-base";
import theme from '../../assets/styles/common.js';

class FormControls extends Component {
	continue = e => {
		e.preventDefault();
		this.props.nextStep();
	}
	back = e => {
		e.preventDefault();
		this.props.prevStep();
	}
	render() {
		return (
			<Footer>
		        <FooterTab style={styles.buttons}>
					<Button
				  		bordered
				  		style={styles.buttonPrev}
						title="Previous"
						type="outline"
						onPress = {this.back}
					>
					<Text style={styles.titlePrev}>Back</Text>
					</Button>
					<Button></Button>
					<Button
						style={styles.button}
						onPress = {this.continue}
					>
						<Text style={styles.title}>Next</Text>
					</Button>
				</FooterTab>
			</Footer>
		);
	}
}

let {Platform} = React;
const styles = StyleSheet.create({
  buttons: {
  	paddingTop: (Platform.OS === 'ios') ? 10 : 0,
  	backgroundColor: '#F4F6FC',
  },
  buttonPrev: {
  	borderColor: theme.PRIMARY_COLOR,
  	backgroundColor: '#fff',
  	width:140,
	height: 48,
	justifyContent: 'center',
	borderRadius: 1,
  },
  button: {
  	backgroundColor: theme.PRIMARY_COLOR,
  	width:140,
	height: 48,
	justifyContent: 'center',
	borderRadius: 1,
  },
  title: {
  	fontSize: theme.FONT_SIZE_SMALL,
  	color: 'white'
  },
  titlePrev: {
  	fontSize: theme.FONT_SIZE_SMALL,
  	color: theme.PRIMARY_COLOR,
  }
});

export default FormControls;