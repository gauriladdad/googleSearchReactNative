'use strict';

var React = require('react-native');

var {
	StyleSheet,
	Image,
	View,
	TouchableHighlight,
	ListView,
	Text,
	Component,
	IntentAndroid
} = React;

var styles = StyleSheet.create({
	rowContainer: {
		flex: 1,
		overflow:'hidden',
		flexDirection: 'row'
	},
	separator: {
    	height: 1,
    	backgroundColor: '#CCCCCC',
  	},
	title: {
		fontSize: 20,
		flexDirection: 'row',
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
					<View style={styles.rowContainer}>
						<Text style={styles.title} numberofLines={1}
						>
							{rowData.url}
						</Text>	
					</View>	
					
		);
	}	

	render() {
		return (
			<ListView
			dataSource={this.state.dataSource.cloneWithRows(this.props.results)}
			renderRow={this.renderRow.bind(this)}
			renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} 
							style={styles.separator} />}/>
		);
	}

	rowPressed(url) {
	  	IntentAndroid.openURL(url);
	}
}

module.exports = SearchResults;