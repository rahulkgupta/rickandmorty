var Character = React.createClass({
  render: function() {
    console.log(this.props)
    return (
      <div className="character">
        <h2>{this.props.character.character}</h2>
        <h2>{this.props.character.actor}</h2>
      </div>
    );
  }
});

var CharacterList = React.createClass({
  render: function() {
    var characterNodes = this.props.data.map(function(character, index) {
      return (
        <Character character={character} key={index}>
        </Character>
      );
    });
    return (
      <div className="characterList">
        {characterNodes}
      </div>
    );
  }
});

var CharacterBox = React.createClass({

  loadCharactersFromServer: function() {
    $.ajax({
      url: this.props.url,
      dataType: 'json',
      cache: false,
      success: function(data) {
        this.setState({data: data});
      }.bind(this),
      error: function(xhr, status, err) {
        console.error(this.props.url, status, err.toString());
      }.bind(this)
    });
  },

  getInitialState: function() {
    return {data: []};
  },

  componentDidMount: function() {
    this.loadCharactersFromServer();
    console.log('ehllo');
  },

  render: function() {
    return (
      <div className="characterBox">
        <h1>Characters</h1>
        <CharacterList data={this.state.data} />
      </div>
    );
  }

});

React.render(
  <CharacterBox url="characters.json"s/>,
  document.getElementById('content')
);
