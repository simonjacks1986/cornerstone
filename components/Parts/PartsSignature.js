import React, {Component} from 'react';
import {View} from 'react-native';
import SignaturePad from 'react-native-signature-pad';
 
export default class Signature extends Component {

  render(){
    const { handleSignature } = this.props;
    return (
      <View style={{flex: 1, height: 100}}>
          <SignaturePad 
            onError={this.signaturePadError}
            onChange={this._signaturePadChange}
            style={{flex: 1, backgroundColor: 'white', borderColor:'#DDDDDD', borderWidth:1, borderRadius:2}}
        />
      </View>
    )
  };
 
  _signaturePadChange = ({base64DataUrl}) => {
    const { handleSignature } = this.props;
    handleSignature({base64DataUrl});
  };

  signaturePadError = (error) => {
    console.error(error);
  };
}