'use strict';

var React = require('react-native');
var HTMLView = require('react-native-htmlview');

var {
	StyleSheet,
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
		fontSize: 12,
		fontFamily: 'Arial',
		flexDirection: 'row',
		color: 'green',
		paddingBottom: 10
	}
});

class SearchResults extends Component {

	constructor(props) {
		super(props);
		this.state = {	
			dataSource: new ListView.DataSource(
			{rowHasChanged: (r1, r2) => r1.url !== r2.url})
		};
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
							{this.changeText(rowData.url)}
						</Text>
					</View>

					<View style={styles.separator}/>	
					
					<HTMLView
			        value={rowData.content}
			        stylesheet={styles}/>
				</View>	
		);
	}	

	render() {
		return (
			<ListView
			style={this.changeStyle()}
			dataSource={this.state.dataSource.cloneWithRows(this.props.results)}
			renderRow={this.renderRow.bind(this)}
			renderSeparator={(sectionID, rowID) => <View key={`${sectionID}-${rowID}`} 
							style={styles.rowSeparator} />}/>
		);
	}

	changeText(url)
	{
		return url.length > 40 ? url.substring(0, 40) + "..."
					: url;;
	}

	changeStyle()
	{
		return {
			height: this.props.height
		}
	}

	rowPressed(url) {
	  	IntentAndroid.openURL(url);
	}
}

module.exports = SearchResults;