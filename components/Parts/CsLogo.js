import React, { Component } from 'react';
import { Image } from 'react-native';

class CsLogo extends Component {
  	render() {
	    return (
	        <Image
	        	source={require('../../assets/cornerstone_logo.png')}
	        />
	    );
	}
}

export default CsLogo;