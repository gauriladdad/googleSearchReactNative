'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	ListView,
	Text,
	Component
} = React;

var styles = StyleSheet.create({
	thumb: {
		width: 80,
		height: 80,
		marginRight: 10
	},
	textContainer: {
		flex: 1
	},
	separator: {
		height: 1,
		backgroundColor: '#dddddd'
	},
	price: {
		fontSize: 25,
		fontWeight: 'bold',
		color: '#48BBEC'
	},
	title: {
		fontSize: 20,
		color: '#48BBEC'
	}
});

class SearchResults extends Component {

	constructor(props) {
		super(props);
		console.log("creating search results: " + props.results);
		this.state = {
			dataSource: new ListView.DataSource(
			{rowHasChanged: (r1, r2) => r1.url !== r2.url})
		};
	}

	componentWillMount() {
		console.log("comoponent mounted");
	}


	renderRow(rowData, sectionID, rowID) {
		return (
			<TouchableHighlight 
			onPress={() => 
				this.rowPressed(rowData.guid)}
				underlayColor='#dddddd'>
				<View>
					<View>
						<View sytle={styles.textContainer}>
							<Text style={styles.title} numberofLines={1}>
								{rowData.url}
							</Text>	
						</View>		
					</View>
					<View style={styles.separator}/>
				</View>			
			</TouchableHighlight>
		);
	}	

	render() {
		return (
			<ListView dataSource={this.state.dataSource.cloneWithRows(this.props.results)}
			renderRow={this.renderRow.bind(this)}/>
		);
	}

	rowPressed(propertyGuid) {
	  	
	}
}

module.exports = SearchResults;