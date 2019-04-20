import Autosuggest from 'react-autosuggest';
import React, {Component} from 'react';
import { connect } from 'react-redux';
import Actions from '../actions/productsAction';
// Imagine you have a list of languages that you'd like to autosuggest.
let suggestions = [
 
];

// Teach Autosuggest how to calculate suggestions for any given input value.
const getSuggestions = value => {
  const inputValue = value.trim().toLowerCase();
  const inputLength = inputValue.length;

  return inputLength === 0 ? [] : suggestions.filter(suggestion =>
    suggestion.word.toLowerCase().slice(0, inputLength) === inputValue
  );
};

// When suggestion is clicked, Autosuggest needs to populate the input
// based on the clicked suggestion. Teach Autosuggest how to calculate the
// input value for every given suggestion.
const getSuggestionValue = suggestion => suggestion.word;

// Use your imagination to render suggestions.
const renderSuggestion = suggestion => (
  <div>
    {suggestion.word}
  </div>
);

class SearchInput extends Component {
	
	constructor() {
    super();

    // Autosuggest is a controlled component.
    // This means that you need to provide an input value
    // and an onChange handler that updates this value (see below).
    // Suggestions also need to be provided to the Autosuggest,
    // and they are initially empty because the Autosuggest is closed.
    this.state = {
      value: '',
      suggestions: []
    };
  }

  onChange = (event, { newValue }) => {

  	const { dispatch } = this.props;
  	dispatch(Actions.suggestProductAction(newValue));
  	const { suggestions_list } = this.props;
  	suggestions= suggestions_list
    this.setState({
      value: newValue
    });
  };

  // Autosuggest will call this function every time you need to update suggestions.
  // You already implemented this logic above, so just use it.
  onSuggestionsFetchRequested = ({ value }) => {
    this.setState({
      suggestions: getSuggestions(value)
    });
  };

  // Autosuggest will call this function every time you need to clear suggestions.
  onSuggestionsClearRequested = () => {
    this.setState({
      suggestions: []
    });
  };
  search = (e) => {
  	
  	const { value } = this.state;

  	this.props.search(value)

  }
  getVal = () =>{
  	
  	const { value } = this.state;
  	return value;

  }
  
  render() {
    const { value, suggestions } = this.state;

    // Autosuggest will pass through all these props to the input.
    const inputProps = {
      placeholder: this.props.placeholder,
      value,
      onChange: this.onChange,
       onKeyPress:this.props._handleKeyPress
      /*onKeyUp:this.search,*/
    };

    // Finally, render it!
    return (
    	<div className='h_search-container'>
      <Autosuggest
        suggestions={suggestions}
        onSuggestionsFetchRequested={this.onSuggestionsFetchRequested}
        onSuggestionsClearRequested={this.onSuggestionsClearRequested}
        getSuggestionValue={getSuggestionValue}
        renderSuggestion={renderSuggestion}
        inputProps={inputProps}
      />
      <button type="button"  onClick={(e) => this.search(e)}><i className="fa fa-search"></i></button>
      </div>
    );
  }




}
export default connect(
  state => ({
    suggestions_list: state.products.suggestions_list
  })
)(SearchInput);