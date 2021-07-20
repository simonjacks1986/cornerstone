import React, { Component } from 'react';
import { StyleSheet, View, TextInput, ActivityIndicator } from 'react-native';
import { Button, Text } from "native-base";
import FormControls from './Parts/FormControls';
import CsAppText from './Parts/CsAppText';
import CsAppLabel from './Parts/CsAppLabel';
import CsAppTitle from './Parts/CsAppTitle';
import CsInput from './Parts/CsInput';
import theme from '../assets/styles/common.js';

class FormLogin extends Component {
	
	render(){
		const { values, handleChange, validate } = this.props;

		return(
			<View style={styles.container}>
				<CsAppTitle>Login</CsAppTitle>
				<CsAppText>Please log in with your username and password</CsAppText>
				<View style={styles.loginBlock}>
					<CsAppLabel>Username</CsAppLabel>
					<TextInput
			    		style={styles.input}
					  	onChange={ handleChange('username') }
					  	value={values['username']}
					  	autoCapitalize="none"
					/>
				</View>
				<View style={styles.loginBlock}>
					<CsAppLabel>Password</CsAppLabel>
				    <TextInput
			    		style={styles.input}
					  	onChange={ handleChange('password') }
					  	value={values['password']}
					  	autoCapitalize="none"
					  	secureTextEntry={true}
					/>
				</View>
				<Button
					style={styles.button}
					onPress = { () => {validate()}}
				>
					{(this.props.validating == true) ? <ActivityIndicator size="large" color="#FFFFFF" /> : <Text style={styles.title}>Login</Text>}
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
  },
  input:{
	backgroundColor: '#FFF',
	width:'100%',
	height:40,
	borderColor:theme.MEDIUM_GREY,
	borderWidth:1,
	paddingLeft:10,
	paddingRight:10,
	marginTop:15,
	borderRadius:2
  },
  loginBlock: {
  	marginBottom:20,
  	marginTop:10,
  }
});


export default FormLogin;