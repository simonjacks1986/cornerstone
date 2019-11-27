import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import theme from '../assets/styles/common.js';

class CsInput extends Component {
  	render() {
  		const { values, handleChange, identifier, height, numberPad } = this.props;
  		if(this.props.numberPad) {
		    return (
		    	<TextInput 
		    		style={styles.input}
				  	onChange={ handleChange(identifier) }
				  	value={values[identifier]}
				  	keyboardType="number-pad"
				/>
		    );
		} else {
			return (
		    	<TextInput 
		    		style={styles.input}
				  	onChange={ handleChange(identifier) }
				  	value={values[identifier]}
				/>
		    );
		}
	}
}
const styles = StyleSheet.create({
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
	}
});

export default CsInput;