import React from 'react';
import {Component} from 'react';

class Task extends Component {
  constructor(props){
    super(props);
    this.state = {};
  }

  render(){
    let monStyle = {width: "130px", display: "inline-block"}
    return (
      <div className="task text-center" draggable="true" onDragStart={(event) => event.dataTransfer.setData("text/plain", this.props.task.id)}>
        {this.props.task.done ?
          (
            <span>
              <span style={monStyle} > {this.props.task.name} </span>
              &nbsp;
              <span style={monStyle} > {this.props.task.ending_date} </span>
            </span>
          ) : (
            <span>
              <input
                onChange = {(event) => this.props.editing({name: event.target.value})}
                value = {this.props.task.name}
              />
              &nbsp;
              <input
                type = "date"
                onChange = {(event) => this.props.editing({date: event.target.value})}
                value = {this.props.task.ending_date}
              />
            </span>
          )
        }
        &nbsp;
        <button onClick = {(event) => this.props.editing({done: !this.props.task.done})} >
          { this.props.task.done ? "Mark as undone" : "Mark as done" }
        </button>
        &nbsp;
        <button onClick = {this.props.removing} >
          Delete
        </button>
        <br/>
        <br/>
      </div>
    );
  }
}
