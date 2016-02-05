'use strict';

var React = require('react-native');
var HTMLView = require('react-native-htmlview');
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
	rowSeparator: {
    	height: 10
    },
    separator: {
    	height: 1,
    	backgroundColor: '#CCCCCC'
  	},
	title: {
		fontSize: 15,
		flexDirection: 'row',
		color: 'blue'
	},
	url: {
		fontSize: 10,
		flexDirection: 'row',
		color: 'green',
		paddingBottom: 10
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
				<View>
					<View>
						<Text style={styles.title} numberofLines={2}
							 			onPress={() => 
										this.rowPressed(rowData.url)}>
							
							{rowData.titleNoFormatting}
						</Text>	
					</View>

					<View style={styles.rowContainer}>
						<Text style={styles.url} numberofLines={1}>
						
							{rowData.url}
						</Text>
					</View>

					<View style={styles.separator}/>	
					
					<HTMLView
			        value={rowData.content}
			        onLinkPress={(url) => console.log('navigating to: ', url)}
			        stylesheet={styles}/>
				</View>	
		);
	}	

	render() {
		return (
			<ListView
			dataSource={this.state.dataSource.cloneWithRows(this.props.results)}
			renderRow={this.renderRow.bind(this)}
			renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} 
							style={styles.rowSeparator} />}/>
		);
	}

	rowPressed(url) {
	  	IntentAndroid.openURL(url);
	}
}

module.exports = SearchResults;