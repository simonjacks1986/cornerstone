import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View, Image, ScrollView } from 'react-native';
import { Picker, Icon, Button, Text, Container } from "native-base";
import FormControls from '../Parts/FormControls';
import CsAppText from '../Parts/CsAppText';
import CsAppLabel from '../Parts/CsAppLabel';
import CsAppTitle from '../Parts/CsAppTitle';
import CsInput from '../Parts/CsInput';
import FormInternalSection from './Sections/FormInternalSection';
import FormModalColourPicker from '../Modal/FormModalColourPicker';
import theme from '../../assets/styles/common.js';

class FormInternal extends Component {
	constructor(props) {
		super(props);
		this.state = {
			additionalSections: this.props.values.intAmountOfSections,
			modalColourVisible: false,
		};
	}

	setModalColourVisible = visible => this.setState({modalColourVisible: visible});
	setWhichGrade = which => this.setState({whichGrade: which});
	handleColours = which => {
		const { handleColourChoice } = this.props;
		handleColourChoice('intGrade' + this.state.whichGrade, which);
		this.setModalColourVisible(!this.state.modalColourVisible);
	}
	setAdditionalSections(amount){
		let incrementAmount = this.state.additionalSections;
		if(incrementAmount + amount >= 0) {
			this.setState({additionalSections: incrementAmount + amount});
		    const { handleTickBox } = this.props;
		    handleTickBox('intAmountOfSections', this.state.additionalSections + amount);
		}
	}
	

	render(){
		const values2 = this.state;
		const { values, handleChange, handlePicker, handleColourChoice, handleTickBox } = this.props;
		const items = [];
		for (var i = 1; i <= this.state.additionalSections; i++) {
			items.push(<FormInternalSection
				handleChange={handleChange}
				handlePicker={handlePicker}
				handleColours={this.handleColours}
				topValues={values2}
				values={values}
				iteration={i}
				key={i}
				setModalVisible={this.setModalColourVisible}
				setWhichGrade={this.setWhichGrade}
			/>)
		}
		return(
			<Container style={styles.container}>
				<ScrollView>
					<FormModalColourPicker
						isOpen={this.state.modalColourVisible}
						setModalVisible={this.setModalColourVisible}
						handleColours={this.handleColours}
					/>

					<CsAppTitle>3.0 Internal</CsAppTitle>
					<CsAppText>Before commencing the internal survey, place hygrometers/sensors in each main living area avoiding the kitchen and bathroom and avoiding direct sunlight, heating elements etc. Readings from the device are to be collected upon completion of the internal survey</CsAppText>
					<View style={styles.confirmLabel}>
			            <CsAppLabel>Confirm</CsAppLabel>
						<TouchableHighlight
							style={styles.confirmBoxWidth}
							onPress={() => {
							  handleTickBox('intConfirm', 1)
							}}
						>
						<View style={styles.tickBox}>
							{ (values.intConfirm == 1) && <View><Image source={require('../../assets/check.png')}/></View> }
						</View>
						</TouchableHighlight>
			        </View>
					<View>
						<View style={styles.row}>
							<View style={styles.one2}>
								<CsAppLabel>Ground floor</CsAppLabel>
								<Picker
						              note
						              mode="dropdown"
						              style={styles.picker}
						              placeholder="- Select -"
						              iosIcon={<Icon name="arrow-down" />}
						              selectedValue={values.intGroundFloor}
						              onValueChange={handlePicker('intGroundFloor')}
						            >
						              <Picker.Item label="Concrete" value="Concrete" />
						              <Picker.Item label="Timber Suspended" value="Timber Suspended" />
						              <Picker.Item label="Ground supported slab" value="Ground supported slab" />
						              <Picker.Item label="GSS Insulated" value="GSS Insulated" />
						              <Picker.Item label="Block & Beam Insulated" value="Block & Beam Insulated" />
						              <Picker.Item label="Block & Beam Uninsulated" value="Block & Beam Uninsulated" />
						              <Picker.Item label="Uncomfirmed" value="Uncomfirmed" />
						              <Picker.Item label="Option" value="Option" />
						        </Picker>
							</View>
							<View style={styles.one2}>
								<CsAppLabel>First Floor</CsAppLabel>
								<Picker
						              note
						              mode="dropdown"
						              style={styles.picker}
						              placeholder="- Select -"
						              iosIcon={<Icon name="arrow-down" />}
						              selectedValue={values.intFirstFloor}
						              onValueChange={handlePicker('intFirstFloor')}
						            >
						              <Picker.Item label="Timber Suspended" value="Timber Suspended" />
						              <Picker.Item label="Concrete" value="Concrete" />
						              <Picker.Item label="Insulated" value="Insulated" />
						              <Picker.Item label="Uncomfirmed" value="Uncomfirmed" />
						              <Picker.Item label="Option" value="Option" />
						        </Picker>
							</View>
						</View>
						<View style={styles.row}>
							<View style={styles.one2}>
								<CsAppLabel>Ceilings</CsAppLabel>
								<Picker
						              note
						              mode="dropdown"
						              style={styles.picker}
						              placeholder="- Select -"
						              iosIcon={<Icon name="arrow-down" />}
						              selectedValue={values.intCeilings}
						              onValueChange={handlePicker('intCeilings')}
						            >
						              <Picker.Item label="Solid Lath & Plaster" value="Solid Lath & Plaster" />
						              <Picker.Item label="Suspended" value="Suspended" />
						              <Picker.Item label="Concrete" value="Concrete" />
						              <Picker.Item label="Plasterboard" value="Plasterboard" />
						              <Picker.Item label="Artex Finish" value="Artex Finish" />
						              <Picker.Item label="Uncomfirmed" value="Uncomfirmed" />
						              <Picker.Item label="N/A" value="N/A" />
						        </Picker>
							</View>
							<View style={styles.one2}>
								<CsAppLabel>Walls</CsAppLabel>
								<Picker
						              note
						              mode="dropdown"
						              style={styles.picker}
						              placeholder="- Select -"
						              iosIcon={<Icon name="arrow-down" />}
						              selectedValue={values.intWalls}
						              onValueChange={handlePicker('intWalls')}
						            >
						              <Picker.Item label="Plasterboard" value="Plasterboard" />
						              <Picker.Item label="Dry Lined" value="Dry Lined" />
						              <Picker.Item label="Insulated" value="Insulated" />
						              <Picker.Item label="Stud Walls" value="Stud Walls" />
						              <Picker.Item label="Solid Plastered" value="Solid Plastered" />
						              <Picker.Item label="Mix of Solid and Stud walls" value="Mix of Solid and Stud walls" />
						        </Picker>
							</View>
						</View>
						<CsAppTitle>Moisture Survey</CsAppTitle>
						<CsAppText>Start at entrance with wall A on LH side and check walls in a clockwise direction. Add worst case readings and notify where in the comment box.</CsAppText>
						{items}

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
  row: theme.ROW,
  one2: {
  	flex:2,
  	margin:5
  },
  tickBox: {
  	borderWidth:1,
  	borderColor:'#DDDDDD',
  	borderStyle:'solid',
  	backgroundColor:'#fff',
  	height:40,
  	marginTop:15,
  	paddingTop:10,
  	paddingLeft:7
  },
  picker: theme.PICKER,
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
  },
  confirmLabel: {
    marginTop:20,
    marginLeft: 5,
  },
  confirmBoxWidth: {
  	width:40,
  	marginBottom: 20,
  },
});
export default FormInternal;