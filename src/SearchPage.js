'use strict';

var React = require('react-native');
var ProgressBar = require('ProgressBarAndroid');
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
	}
});

function urlForQueryAndPage(params) {
	return 'http://ajax.googleapis.com/ajax/services/search/web?v=1.0' + params;
}

class SearchPage extends Component {
	constructor(props) {
		super(props);

		this.state = {
			searchString: 'london',
			windowHeight: 0,
			resultCount: 0,
			resultResponse: {},
			timer: null,
			progress: 0
		};
	}

	componentDidMount() {
		this.setState({windowHeight : windowDims.height});
	}

	render() {
		var spinner = this.state.progress > 0 ? 
		(<ProgressBar progress={this.state.progress}/>)
		: (<View/>);
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

				{spinner}

				<SearchResults results={this.state.resultResponse}
				height={(this.state.windowHeight - 150)}/>
			</View>
		);
	}

 	never_call () {
  		this.setState({ progress: this.state.progress + (0.4 * Math.random())});
	}

	incrementProgress()
	{
		this.setState({timer : setTimeout(this.never_call(),1000)});
	}

	onSearchTextChanged(event) {
		this.setState({ searchString: event.nativeEvent.text });
		console.log("this.state.searchString: " + this.state.searchString);
	}

	_handleResponse(searchResult) {
		if(searchResult.responseStatus === 200) {
			this.setState({resultResponse : searchResult.responseData.results});
			this.setState({resultCount : searchResult.responseData.results.length});
		}
		if (this.state.timer != null)
		{
			clearInterval(this.state.timer);
			this.setState({timer: null});
		}	
			this.setState({progress: 0});
	}

	_fetchResults(query)
	{
		fetch(query)
		.then(response => response.json())
		.then(json => { 
			this._handleResponse(json);
		})
      	.catch(error => { 
      		console.log("error: " + error)
     		this.setState({ progress: 0});
     	});
	}

	onSearchPressed() {
		this.incrementProgress();

		this.setState({resultResponse : {}});

		var searchStringArr = this.state.searchString.split(" ");
		var params = "&q=" + (searchStringArr.length > 1 ? searchStringArr.join("+") : this.state.searchString);
		var query = urlForQueryAndPage(params);
		console.log("query: " + query);
		this._fetchResults(query);	
	}
}

module.exports = SearchPage;