'use strict';

var React = require('react-native');


var SearchPage = require("./src/SearchPage");

var styles = React.StyleSheet.create({
  container: {
    flex: 1
  }
});

class GoogleSearchApp extends React.Component {
  render() {
    return (
      <SearchPage/>
    );
  }
}

React.AppRegistry.registerComponent('GoogleSearch', function() { return GoogleSearchApp });
