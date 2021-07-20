import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import theme from '../../assets/styles/common.js';

class CsBigInput extends Component {
  	render() {
  		const { values, handleChange, identifier, height } = this.props;
	    return (
	    	<TextInput
	    		style={styles.input}
			  	onChange={ handleChange(identifier) }
			  	value={values[identifier]}
			  	multiline={true}
			  	numberOfLines={5}			  	
			/>
	    );
	}
}
const styles = StyleSheet.create({
	input:{
		backgroundColor: '#FFF',
		width:'100%',
		height:130,
		borderColor:theme.MEDIUM_GREY,
		borderWidth:1,
		marginTop:15,
		borderRadius:2,
		paddingLeft:5,
	}
});

export default CsBigInput;