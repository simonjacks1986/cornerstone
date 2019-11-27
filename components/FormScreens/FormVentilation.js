import React, { Component } from 'react';
import { TouchableHighlight, StyleSheet, View } from 'react-native';
import FormControls from './FormControls';
import CsAppText from '../CsAppText';
import CsAppLabel from '../CsAppLabel';
import CsAppTitle from '../CsAppTitle';
import CsInput from '../CsInput';
import FormVentilationSection from './Sections/FormVentilationSection';
import FormModalColourPicker from './Modal/FormModalColourPicker';
import { Button, Text, Picker, Icon } from "native-base";

class FormVentilation extends Component {
	constructor(props) {
		super(props);
		this.state = {
			modalVisible: false,
			additionalSections: this.props.values.venAmountOfSections,
		};
	}

	setModalVisible = visible => {
	    this.setState({modalVisible: visible});
	}
	setWhichGrade = which => {
		this.setState({whichGrade: which});	
	}
	setAdditionalSections(amount){
		let incrementAmount = this.state.additionalSections;
		this.setState({additionalSections: incrementAmount + 1});
		const { handleColourChoice } = this.props;
    	handleColourChoice('venAmountOfSections', this.state.additionalSections + 1);
	}
	handleColours = which =>{
		const { handleColourChoice } = this.props;
		handleColourChoice('venGrade' + this.state.whichGrade, which);
		this.setModalVisible(!this.state.modalVisible);
	}

	render(){
		const values2 = this.state;
		const { values, handleChange, handlePicker } = this.props;
		const items = [];
		for (var i = 1; i <= this.state.additionalSections; i++) {
			items.push(<FormVentilationSection
				handleChange={handleChange}
				handlePicker={handlePicker}
				setModalVisible={this.setModalVisible}
				setWhichGrade={this.setWhichGrade}
				topValues={values2}
				values={values}
				iteration={i}
				key={i}
			/>)
		}
		return(
			<View style={styles.container}>
				<FormModalColourPicker
					isOpen={this.state.modalVisible}
					setModalVisible={this.setModalVisible}
					handleColours={this.handleColours}
				/>

				<CsAppTitle>4.0 Ventilation</CsAppTitle>
				<CsAppText>Enter the survey details below</CsAppText>
				<View>
					{items}
					<View>
						<Button
							style={styles.addButtton}
							onPress={() => { this.setAdditionalSections(1) }}
						>
							<Text style={styles.addButttonText}>Add another room +</Text>
						</Button>
					</View>
				</View>
				<View style={styles.spacer}>
					<View style={styles.row}>
						<View style={styles.rowFirst}>
							<CsAppLabel>Trickle vents location</CsAppLabel>
							<Picker
					            note
					            mode="dropdown"
					            style={styles.picker}
					            placeholder="- Select -"
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.venTrickleVents}
					            onValueChange={handlePicker('venTrickleVents')}
					        >
					          <Picker.Item label="None" value="None" />
					          <Picker.Item label="All" value="All" />
					          <Picker.Item label="Lounge" value="Lounge" />
				              <Picker.Item label="Diner" value="Diner" />
				              <Picker.Item label="Lounge/Diner" value="Lounge/Diner" />
				              <Picker.Item label="Kitchen" value="Kitchen" />
				              <Picker.Item label="Kitchen/Diner" value="Kitchen/Diner" />
				              <Picker.Item label="Study" value="Study" />
				              <Picker.Item label="Hallway" value="Hallway" />
				              <Picker.Item label="Landing" value="Landing" />
				              <Picker.Item label="Bed 1" value="Bed 1" />
				              <Picker.Item label="Bed 2" value="Bed 2" />
				              <Picker.Item label="Bed 3" value="Bed 3" /> 
				              <Picker.Item label="Bed 4" value="Bed 4" /> 
				              <Picker.Item label="Bed 5" value="Bed 5" /> 
				              <Picker.Item label="Bathroom" value="Bathroom"/>
				              <Picker.Item label="Ensuite" value="Ensuite" />
				              <Picker.Item label="Utility" value="Utility" />
				              <Picker.Item label="Conservatory" value="Conservatory" />
				              <Picker.Item label="WC" value="WC" />
				              <Picker.Item label="Cupboard" value="Cupboard" />
				              <Picker.Item label="Boiler Room" value="Boiler Room" />
				              <Picker.Item label="Office" value="Office" />
				              <Picker.Item label="Other" value="Other" />
					        </Picker>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Condition</CsAppLabel>
							<Picker
					            note
					            mode="dropdown"
					            style={styles.picker}
					            placeholder="- Select -"
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.venCondition1}
					            onValueChange={handlePicker('venCondition1')}
					        >
					            <Picker.Item label="Clear & Open" value="Clear & Open" />
					            <Picker.Item label="Clear and Closed" value="Clear and Closed" />
					            <Picker.Item label="Blocked & Open" value="Blocked & Open" />
					            <Picker.Item label="Blocked & Closed" value="Blocked & Closed" />
					            <Picker.Item label="None" value="None" />
					        </Picker>
						</View>
						<View style={styles.rowThird}>
							<CsAppLabel>Grade</CsAppLabel>
							<TouchableHighlight
								style={styles.clickBoxWidth}
								onPress={() => {
									this.setModalVisible(true);
									this.setWhichGrade(1);
								}}
							>
								<View style={styles.clickBox}>
									{ (values.venGrade1 == 3) && <View style={styles.clickBoxGreen}></View> }
									{ (values.venGrade1 == 2) && <View style={styles.clickBoxOrange}></View> }
									{ (values.venGrade1 == 1) && <View style={styles.clickBoxRed}></View> }
								</View>
							</TouchableHighlight>
						</View>
					</View>

					<View style={styles.row}>
						<View style={styles.rowFirst}>
							<CsAppLabel>Passive vents location</CsAppLabel>
							<Picker
					            note
					            mode="dropdown"
					            style={styles.picker}
					            placeholder="- Select -"
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.venPassiveVents}
					            onValueChange={handlePicker('venPassiveVents')}
					        >
					          <Picker.Item label="None" value="None" />
					          <Picker.Item label="Lounge" value="Lounge" />
				              <Picker.Item label="Diner" value="Diner" />
				              <Picker.Item label="Lounge/Diner" value="Lounge/Diner" />
				              <Picker.Item label="Kitchen" value="Kitchen" />
				              <Picker.Item label="Kitchen/Diner" value="Kitchen/Diner" />
				              <Picker.Item label="Study" value="Study" />
				              <Picker.Item label="Hallway" value="Hallway" />
				              <Picker.Item label="Landing" value="Landing" />
				              <Picker.Item label="Bed 1" value="Hallway" />
				              <Picker.Item label="Bed 2" value="Bed 2" />
				              <Picker.Item label="Bed 3" value="Bed 3" /> 
				              <Picker.Item label="Bed 4" value="Bed 4" /> 
				              <Picker.Item label="Bed 5" value="Bed 5" /> 
				              <Picker.Item label="Bathroom" value="Bathroom"/>
				              <Picker.Item label="Ensuite" value="Ensuite" />
				              <Picker.Item label="Utility" value="Utility" />
				              <Picker.Item label="Conservatory" value="Conservatory" />
				              <Picker.Item label="WC" value="WC" />
				              <Picker.Item label="Cupboard" value="Cupboard" />
				              <Picker.Item label="Boiler Room" value="Boiler Room" />
				              <Picker.Item label="Office" value="Office" />
				              <Picker.Item label="Other" value="Other" />
					        </Picker>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Condition</CsAppLabel>
							<Picker
					            note
					            mode="dropdown"
					            style={styles.picker}
					            placeholder="- Select -"
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.venCondition2}
					            onValueChange={handlePicker('venCondition2')}
					        >
					            <Picker.Item label="Clear & Open" value="Clear & Open" />
					            <Picker.Item label="Clear and Closed" value="Clear and Closed" />
					            <Picker.Item label="Blocked & Open" value="Blocked & Open" />
					            <Picker.Item label="Blocked & Clear" value="Blocked & Clear" />
					            <Picker.Item label="None" value="None" />
					        </Picker>
						</View>
						<View style={styles.rowThird}>
							<CsAppLabel>Grade</CsAppLabel>
							<TouchableHighlight
								style={styles.clickBoxWidth}
								onPress={() => {
									this.setModalVisible(true);
									this.setWhichGrade(2);
								}}
							>
								<View style={styles.clickBox}>
									{ (values.venGrade2 == 3) && <View style={styles.clickBoxGreen}></View> }
									{ (values.venGrade2 == 2) && <View style={styles.clickBoxOrange}></View> }
									{ (values.venGrade2 == 1) && <View style={styles.clickBoxRed}></View> }
								</View>
							</TouchableHighlight>
						</View>
					</View>

					<View style={styles.row}>
						<View style={styles.rowFirst}>
							<CsAppLabel>Tumble Dryer Outlet</CsAppLabel>
							<Picker
					            note
					            mode="dropdown"
					            style={styles.picker}
					            placeholder="- Select -"
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.venTumbleDryer}
					            onValueChange={handlePicker('venTumbleDryer')}
					        >
					            <Picker.Item label="Washer/Dryer" value="Washer/Dryer" />
					            <Picker.Item label="Plumbed Vent" value="Plumbed Vent" />
					            <Picker.Item label="Manual Pipe" value="Manual Pipe" />
					            <Picker.Item label="None" value="None" />
					            <Picker.Item label="N/A" value="N/A" />
					            
					        </Picker>
						</View>
						<View style={styles.rowSecond}>
							<CsAppLabel>Drying Method</CsAppLabel>
							<Picker
					            note
					            mode="dropdown"
					            style={styles.picker}
					            placeholder="- Select -"
					            iosIcon={<Icon name="arrow-down" />}
					            selectedValue={values.venDryerMethod}
					            onValueChange={handlePicker('venDryerMethod')}
					        >
					            <Picker.Item label="Washer/Dryer" value="Washer/Dryer" />
					            <Picker.Item label="Convection" value="Convection" />
					            <Picker.Item label="Clothes Horse" value="Clothes Horse" />
					            <Picker.Item label="Radiators" value="Radiators" />
					            <Picker.Item label="Bathroom" value="Bathroom" />
					            <Picker.Item label="Exterior" value="Exterior" />
					            <Picker.Item label="None" value="None" />
					        </Picker>
						</View>
						<View style={styles.rowThird}>
							<CsAppLabel>Grade</CsAppLabel>
							<TouchableHighlight
								style={styles.clickBoxWidth}
								onPress={() => {
									this.setModalVisible(true);
									this.setWhichGrade(3);
								}}
							>
								<View style={styles.clickBox}>
									{ (values.venGrade3 == 3) && <View style={styles.clickBoxGreen}></View> }
									{ (values.venGrade3 == 2) && <View style={styles.clickBoxOrange}></View> }
									{ (values.venGrade3 == 1) && <View style={styles.clickBoxRed}></View> }
								</View>
							</TouchableHighlight>
						</View>
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
  row: {
    flex: 1,
    flexDirection:'row',
    marginBottom:20,
  },
  one2: {
  	flex:2,
  	margin:5
  },
  rowFirst: {
  	flex:4,
  	margin:5
  },
  rowSecond: {
  	flex:3,
  	margin:5
  },
  rowThird: {
  	margin:5
  },
  spacer: {
  	marginTop:40
  },
  closeButton: {
  	fontSize: 24,
  	fontWeight: 'bold',
  },
  clickBoxWidth: {
  	width:40,
  },
  clickBox: {
  	borderWidth:1,
  	borderColor:'#DDDDDD',
  	borderStyle:'solid',
  	backgroundColor:'#fff',
  	height:40,
  	marginTop:15,
  	padding:5
  },
  clickBoxRed: {
  	backgroundColor: '#FC0000',
  	width:'100%',
  	height:'100%',
  	borderRadius:3
  },
  clickBoxOrange: {
  	backgroundColor: '#FCC400',
  	width:'100%',
  	height:'100%',
  	borderRadius:3
  },
  clickBoxGreen: {
  	backgroundColor: '#28A745',
  	width:'100%',
  	height:'100%',
  	borderRadius:3
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
  },
  picker: {
    backgroundColor: "#fff",
    borderColor:'#DDDDDD',
    borderWidth:1,
    marginTop: 16,
    borderRadius: 2,
    marginBottom:10,
    height:40
  },
});
export default FormVentilation;