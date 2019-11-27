import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View } from 'react-native';
import { Button, Text } from "native-base";
import FormControls from './FormControls';
import CsAppText from '../CsAppText';
import CsAppLabel from '../CsAppLabel';
import CsAppTitle from '../CsAppTitle';
import CsInput from '../CsInput';
import FormAtmosphericSection from './Sections/FormAtmosphericSection';

class FormAtmospherics extends Component {
	constructor(props) {
		super(props);
		this.state = {
      additionalSections: this.props.values.atsAmountOfSections,
		};
	}
	setAdditionalSections(amount){
		let incrementAmount = this.state.additionalSections;
		this.setState({additionalSections: incrementAmount + 1});
    const { handleTickBox } = this.props;
    handleTickBox('atsAmountOfSections', this.state.additionalSections + 1);
	}

	render(){
		const { values, handleChange, handlePicker, handleTickBox } = this.props;

		const items = [];
		for (var i = 1; i <= this.state.additionalSections; i++) {
			items.push(<FormAtmosphericSection
				handleChange={handleChange}
				handlePicker={handlePicker}
				values={values}
				iteration={i}
				key={i}
			/>)
		}
		return(
			<View style={styles.container}>

				<CsAppTitle>7.0 Atmospherics</CsAppTitle>
				<CsAppText>Enter the survey details below</CsAppText>
				<View style={styles.spacer}>
          <CsAppTitle>Exterior</CsAppTitle>
          <View style={styles.whiteBlock}>
            <View style={styles.row}>
              <View style={styles.one2}>
                <CsAppLabel>% Relative Humidity</CsAppLabel>
                <CsInput
                    handleChange={handleChange}
                    values={values}
                    identifier="atsExRelativeHumidity"
                    numberPad={true}
                  />
              </View> 
              <View style={styles.one2}>
                <CsAppLabel>Temp. °C</CsAppLabel>
                <CsInput
                    handleChange={handleChange}
                    values={values}
                    identifier="atsExTemp"
                    numberPad={true}
                  />
              </View> 
            </View>
            <View style={styles.row}>
              <View style={styles.one2}>
                <CsAppLabel>Dew point temp °C</CsAppLabel>
                <CsInput
                    handleChange={handleChange}
                    values={values}
                    identifier="atsExDewPoint"
                    numberPad={true}
                  />
              </View>
              <View style={styles.one2}>
                <CsAppLabel>Specific Humidity g/Kg</CsAppLabel>
                <CsInput
                    handleChange={handleChange}
                    values={values}
                    identifier="atsExSpecificHumidity"
                    numberPad={true}
                  />
              </View> 
            </View>
          </View> 
          
          <View style={styles.spacer}>
            <CsAppTitle>Interior</CsAppTitle>
					  {items}
          </View>
					<View>
						<Button
              style={styles.addButtton}
              onPress={() => { this.setAdditionalSections(1) }}
            >
              <Text style={styles.addButttonText}>Add another room +</Text>
            </Button>
					</View>
				</View>
				
				<FormControls
					nextStep={this.props.nextStep}
					prevStep={this.props.prevStep}
				/>
			</View>
		)
	}
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:20,
  },
  whiteBlock: {
    backgroundColor:'#FFF',
    borderColor:'#DDD',
    borderWidth:2,
    paddingLeft:10,
    paddingRight:10,
    paddingTop:20,
    paddingBottom:20,
    marginBottom:20,
  },
  row: {
    flex: 1,
    flexDirection:'row',
    marginBottom:20,
  },
  one2: {
  	flex:2,
  	margin:5
  },
  spacer: {
  	marginTop:20
  },
  addButtton: {
    backgroundColor: '#E5E5E5',
    width:220,
    justifyContent: 'center',
    borderRadius:3,
    height:48,
    marginTop:20,
    marginBottom:40,
  },
  addButttonText: {
    color:'#122F45',
  }
});
export default FormAtmospherics;