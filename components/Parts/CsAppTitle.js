import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';

class CsAppTitle extends Component {
  	render() {
	    return (
			<Text style={{fontSize: 26, marginBottom: 16, color: '#15354E', fontWeight: 'bold'}}>{this.props.children}</Text>
	    );
	}
}

export default CsAppTitle;