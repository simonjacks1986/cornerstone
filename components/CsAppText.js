import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class CsAppText extends Component {
  	render() {
	    return (
			<Text style={{fontSize: 16, marginBottom: 16, color: '#15354E'}}>{this.props.children}</Text>
	    );
	}
}

export default CsAppText;