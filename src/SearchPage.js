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

function urlForQueryAndPage(params) {
	return 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0&start=0&num=10' + params;
}

class SearchPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchString: 'london',
			isLoading: true,
			message: '',
			windowHeight: 0,
			resultCount: 0,
			resultResponse: {},
			latitude: 51.5073,
			longitude: -0.1277
		};
	}

	componentDidMount() {
		this.setState({windowHeight : windowDims.height});
		console.log("in componentDidMount windowHeight: " + this.state.windowHeight);

		this.watchID = navigator.geolocation.watchPosition((position) => {
      		this.setState({latitude: position.coords.latitude});
      		this.setState({longitude: position.coords.longitude});
    	});
	}

	render() {
		return (
			<View style={styles.container} 
					onLayout={(event) => {
						var layout = event.nativeEvent.layout;
						if (layout.width == windowDims.width)
  						{
  							console.log('portrait');
  							this.setState({windowHeight : windowDims.height});
  						}
  						else if (layout.width > windowDims.width) {
  							console.log('landscape');
  							this.setState({windowHeight : windowDims.width});
  						}
  					} }> 

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
					<Text style={styles.buttonText}>Include location</Text>
				</TouchableHighlight>	

				<SearchResults results={this.state.resultResponse}
				height={(this.state.windowHeight - 180)}/>

			</View>
		);
	}

	onSearchTextChanged(event) {
		this.setState({ searchString: event.nativeEvent.text });

		console.log("event.nativeEvent.text: " + event.nativeEvent.text);
		console.log("this.state.searchString: " + this.state.searchString);
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

	_fetchResults(query)
	{
		fetch(query)
		.then(response => response.json())
		.then(json => { 
			this._handleResponse(json);
		})
      	//.then(response => console.log(response))
      	//.then(response => console.log("I am json: " + response.json()))
     	.catch(error => console.log("error: " + error));
	}

	onLocationPressed() {
		//location=-33.8670522,151.1957362&radius=500
		var searchStringArr = this.state.searchString.split(" ");
		var params = "&q=" + searchStringArr.length > 1 ? searchStringArr.join("+") : this.state.searchString;
	
		params += "&location=" + this.state.latitude + "," + this.state.longitude;
		params += "&radius=500";

		var query = urlForQueryAndPage(params);
		console.log("query: " + query);
		this._fetchResults(query);
	}

	onSearchPressed() {
		var searchStringArr = this.state.searchString.split(" ");
		var params = "&q=" + (searchStringArr.length > 1 ? searchStringArr.join("+") : this.state.searchString);
		var query = urlForQueryAndPage(params);
		console.log("query: " + query);
		this._fetchResults(query);	
	}
}

module.exports = SearchPage;