'use strict';

var React = require('react-native');
var SearchResults = require('./SearchResults');
const Dimensions = require('Dimensions');
const windowDims = Dimensions.get('window');

var {
	StyleSheet,
	Text,
	TextInput,
	View,
	TouchableHighlight,
	Component
} = React;

var styles = StyleSheet.create({
	container: {
		padding: 30,
		marginTop: 15,
		alignItems: 'stretch'
	},
	flowRight: {
		flexDirection: 'row',
		alignItems: 'center',
		alignSelf : 'stretch'
	},
	buttonText: {
		fontSize: 18,
		color: 'white',
		alignSelf: 'center'
	},
	button: {
		height: 36,
		flex: 1,
		flexDirection: 'row',
		backgroundColor: '#48BBEC',
		borderColor: '#48BBEC',
		borderWidth: 1,
		borderRadius: 8,
		marginBottom: 15,
		alignSelf: 'stretch',
		justifyContent: 'center'
	},
	searchInput: {
		height: 36,
		padding: 4,
		marginRight: 5,
		flex: 4,
		fontSize: 18,
		borderWidth: 1,
		borderColor: '#48BBEC',
		borderRadius: 8,
		color: '#48BBEC'
	},
	textContainer: {
		flex: 1
	},
	rowContainer: {
		flexDirection: 'row',
		padding: 10
	},
	listHeight: {
		height: 400
	}
});

function urlForQueryAndPage(value) {
	return 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&q=' + encodeURIComponent(value);
}

class SearchPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchString: 'london',
			isLoading: true,
			message: '',
			resultCount: 0,
			resultResponse: {}
		};
	}

	render() {
		return (
			<View style={styles.container}>

				<View style={styles.flowRight}>
					<TextInput 
						style={styles.searchInput}
						value={this.state.searchString}
						onChange={this.onSearchTextChanged.bind(this)}
						placeholder='Search Google or type URL'/>
					<TouchableHighlight style={styles.button}
						underlayColor='#99d9f4'>
						<Text style={styles.buttonText}
						onPress={this.onSearchPressed.bind(this)}>
							Go
						</Text>			
					</TouchableHighlight>	
				</View>

				<TouchableHighlight style={styles.button}
					underlayColor='#99d9f4'
					onPress={this.onLocationPressed.bind(this)}>
					<Text style={styles.buttonText}>Location</Text>
				</TouchableHighlight>	

				<SearchResults results={this.state.resultResponse}
				height={(windowDims.height - 180)}/>

			</View>
		);
	}

	onLocationPressed() {
		
	}

	onSearchTextChanged(event) {
		this.setState({ searchString: event.nativeEvent.text });

		console.log("event.nativeEvent.text: " + event.nativeEvent.text);
		console.log("this.state.searchString: " + this.state.searchString);
	}


	_executeQuery(query) {
		console.log(query);
		this.setState({isLoading: true});
		fetch(query)
			.then(response => console.log("results: " + response.json().results))
			//.then(response => response.json())
			//.then(json => this._handleResponse(json.response))
			.catch(error => 
				this.setState({
					isLoading: false,
					message: 'Something bad happened ' + error	
			}));
	}

	_handleResponse(searchResult) {
		this.setState({ isLoading: false, message: ''});

		if(searchResult.responseStatus === 200) {
			console.log("json: "+ searchResult.responseData.results);

			searchResult.responseData.results.map(function(object, i){
        			console.log("result number: " + i);
        			console.log("object: " + object.url);
    			});
		
			this.setState({resultResponse : searchResult.responseData.results});
			this.setState({resultCount : searchResult.responseData.results.length});
			
		}
		else {
			this.setState({ message: 'Location not recognized, please try again'});
		}
	}

	onSearchPressed() {
		var query = urlForQueryAndPage(this.state.searchString);
		fetch(query)
		/*.then(response => { 
			console.log(response.json()); 
			var data = response._bodyInit;
			console.log("responseData: " + data["responseData"]);
		})*/
		.then(response => response.json())
		.then(json => { 
			this._handleResponse(json);
		})
      	//.then(response => console.log(response))
      	//.then(response => console.log("I am json: " + response.json()))
     	.catch(error => console.log("error: " + error));
	}
}

module.exports = SearchPage;