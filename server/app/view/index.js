/** @jsx React.DOM */

App = React.createClass({
  componentDidMount: function() {
    var self = this;
    var timer = setInterval(function() {
      self.setState({now: new Date()});
    }, 1000);
    this.setState({timer: timer});
  },
  
  componentWillUnmount: function() {
    clearInternal(this.state.timer);
    this.setState({timer: undefiend});
  },
  
  getInitialState: function() {
    return {
      now: new Date(),
      newText: "",
      items: [
        { text: "Foo", time: new Date() },
        { text: "Bar", time: new Date() }
      ]
    };
  },

  addItem: function() {
    this.setState({
      items: [{text: this.state.newText, time: new Date()}].concat(this.state.items),
      newText: ""
    })
  },
  
  updateNewText: function(ev) {
    this.setState({
      newText: ev.target.value
     });
  },
  
  render: function() {
    return <div className="container todo">
      <div className="row newForm">
        <div className="col-lg-12">
          <div className="input-group">
            <input type="text" value={this.state.newText} onChange={this.updateNewText} placeholder="Your task" className="form-control" />
            <span className="input-group-btn">
              <button onClick={this.addItem} className="btn btn-default" type="button">Add</button>
            </span>
          </div>
        </div>
      </div>

      <div className="row newForm">
        <div className="col-lg-12 text-center">
          {this.state.items.length} 件
        </div>
      </div>
                
      <div className="items">
        {this.state.items.map(function(item) {
          return <div className="item row">
                <div className="text col-lg-12">
                  {item.text}
                </div>
                <div className="time col-lg-12">
                  {moment(item.time).from(this.state.now)}
                </div>
          </div>;
        }, this)}
      </div>
   </div>;
  }
});

React.render(<App/>, document.body);

