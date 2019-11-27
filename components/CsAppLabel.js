import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class CsAppLabel extends Component {
  	render() {
	    return (
			<Text style={{fontSize: 14, marginBottom: 0, color: '#15354E'}}>{this.props.children}</Text>
	    );
	}
}

export default CsAppLabel;