import React, { Component } from 'react';
import { StyleSheet, TextInput } from 'react-native';
import theme from '../../assets/styles/common.js';

class CsInput extends Component {
	constructor (props) {
		super(props);
		this.state = {
			newValue: '',
			height: 40
		}
	}

	updateSize = (height) => this.setState({ height });

  	render() {
  		const { values, handleChange, identifier, numberPad, multiline } = this.props;
  		const { newValue, height} = this.state;
  		let newStyle = { height }
  		if(this.props.numberPad) {
		    return (
		    	<TextInput 
		    		style={styles.input}
				  	onChange={ handleChange(identifier) }
				  	value={values[identifier]}
				  	keyboardType="number-pad"
				/>
		    );
		} else if(this.props.multiline) {
			return (
		    	<TextInput 
		    		style={[styles.input, styles.inputMulti, newStyle]}
				  	onChange={ handleChange(identifier) }
				  	value={values[identifier]}
				  	multiline={this.props.multiline ? true : false}
				  	onContentSizeChange={(e) => this.updateSize(e.nativeEvent.contentSize.height)}
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
	},
	inputMulti: {
		paddingTop: 10,
		minHeight: 40
	}
});

export default CsInput;