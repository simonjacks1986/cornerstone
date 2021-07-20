import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, ScrollView } from 'react-native';
import { Button, Text, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import FormAtmosphericSection from './Sections/FormAtmosphericSection';
import theme from '../../assets/styles/common.js';

class FormAtmospherics extends Component {
  constructor(props) {
    super(props);
    this.state = {
      additionalSections: this.props.values.atsAmountOfSections,
    };
  }
  setAdditionalSections(amount){
    let incrementAmount = this.state.additionalSections;
    if(incrementAmount + amount >= 0) {
      this.setState({additionalSections: incrementAmount + amount});
        const { handleTickBox } = this.props;
        handleTickBox('atsAmountOfSections', this.state.additionalSections + amount);
    }
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
      <Container style={styles.container}>
        <ScrollView>
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
            <View style={styles.addButttonContainer}>
              <Button
                style={styles.addButtton}
                onPress={() => { this.setAdditionalSections(1) }}
              >
                <Text style={styles.addButttonText}>Add another room +</Text>
              </Button>
              <Button
                style={styles.addButtton}
                onPress={() => { this.setAdditionalSections(-1) }}
              >
                <Text style={styles.addButttonText}>Remove room -</Text>
              </Button>
            </View>
          </View>
        </ScrollView>
        <FormControls
          nextStep={this.props.nextStep}
          prevStep={this.props.prevStep}
        />
      </Container>
    )
  }
}
const styles = StyleSheet.create({
  container: theme.CONTAINER,
  whiteBlock: theme.WHITEBLOCK,
  row: theme.ROW,
  one2: {
    flex:2,
    margin:5
  },
  spacer: {
    marginTop:20
  },
  addButttonContainer: {
    marginBottom:40,
    marginTop:20,
    justifyContent: 'space-between',
    flexDirection: 'row'
  },
  addButtton: {
    backgroundColor: '#E5E5E5',
    width:220,
    justifyContent: 'center',
    borderRadius:3,
    height:48,
  },
  addButttonText: {
    color:'#122F45',
  }
});
export default FormAtmospherics;