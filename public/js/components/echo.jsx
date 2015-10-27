var React = require("react");

var Echo = React.createClass({
  getInitialState() {
    return {
      text: ""
    };
  },
  render() {
    return (
        <div>
            <h2>Echo</h2>
            <div id="echo-component">
                <label>
                    Type some text into the field below.<br /><br />
                    <input type="text" onChange={this.doEcho} />
                </label>
                <p><span>{(this.state.text === '') ? 'You haven\'t typed anything yet' : (this.state.text.toLowerCase() === 'marco') ? 'POLO!!!' : 'You typed ' + this.state.text}</span></p>
            </div>
        </div>
    );
  },
  doEcho(event) {
    var text = event.target.value;

    this.setState({
      text: text
    });
  }
});

module.exports = Echo;
