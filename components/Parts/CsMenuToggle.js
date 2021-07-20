import React, { Component } from 'react';
import { StyleSheet, View, Image } from 'react-native';
import theme from '../../assets/styles/common.js';

class CsMenuToggle extends Component {
  	render() {
	    return (
	    	<View style={styles.button}>
		        <Image 
		        	source={require('../../assets/menu.png')} 
		        	style={{width: 20}}
		        />
	        </View>
	    );
	}
}
const styles = StyleSheet.create({
	button:{
		flex: 1,
		alignItems: 'center',
		justifyContent: 'center',
		backgroundColor: theme.SECONDARY_COLOR,
		width:80,
		height:'100%',
	}
});

export default CsMenuToggle;