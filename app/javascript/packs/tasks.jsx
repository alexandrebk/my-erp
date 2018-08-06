import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
// import Task from './task';

var width  = window.innerWidth ;
var height = window.innerHeight ;

let startingData = { name: "New Task", ending_date: "2018-05-01", done: false, category_id: 1};

class App extends Component {
  constructor(){ // initialize en Ruby, est déclenché quand on fait une création d'objet cad un new
    super(); // on appelle les propriétés de la classe parente
    this.state = { // this correspond à self en Ruby, state correspond au modèle, c'est une énumération de clé valeur
      startingData,
      myList  : [ ]
    }
  }

  async readTask() {
    const myrequest = await fetch(document.origin + '/api/v1/tasks', {
      method: 'GET',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content
      },
      credentials: 'same-origin'
    });
    let text = await myrequest.json();
    console.log(text);
    return text
  };

  async componentDidMount() {
    // On utilise await pour attendre la vraie réponse et ne pas avoir une promesse
    let tasks = await this.readTask();
    // Retourne seulement une promesse car on ne met pas de await
    console.log(this.readTask());
    this.setState({
      myList: tasks
    });
  }

  handleCategoryChange = (value, option) => {
    const newElement = { [option] : parseInt(value, 10) }
    Object.assign(this.state.startingData,newElement);
    console.log(this.state.startingData);
  }

  async fillList(){
    console.log(this.state.startingData);
    console.log("je fetch l'API avec une requete POST");
    const myrequest = await fetch(document.origin + '/api/v1/tasks', {
      method: 'POST',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(this.state.startingData)
    });
    // let text = await myrequest.json();
    // console.log(text);
    this.setState({
      // old fashioned way to add to myList:
      // myList: this.state.myList.concat([this.state.startingData]),
      // better way :
      myList: [...this.state.myList, this.state.startingData],
      // Ensuite on réinitialise la variable à zéro
      startingData,
    });
  }

  async deleteElementFromList(elementToRemove){
    const myrequest = await fetch(document.origin + `/api/v1/tasks/${elementToRemove.id}`, {
      method: 'DELETE',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
    });
    this.setState({myList: this.state.myList.filter((element) => element !== elementToRemove)});
  }

  async editingElementFromList(elementToEdit, newElement){
    console.log("On modifie l'element")
    Object.assign(elementToEdit,newElement);
    console.log(elementToEdit);
    console.log("je fetch l'API avec une requete PATCH");
    const myrequest = await fetch(document.origin + `/api/v1/tasks/${elementToEdit.id}`, {
      method: 'PATCH',
      headers: {
        'X-Requested-With': 'XMLHttpRequest',
        'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
        'Content-Type': 'application/json'
      },
      credentials: 'same-origin',
      body: JSON.stringify(elementToEdit)
    });
    this.setState({
      myList : this.state.myList.map(
        function (element) {
          // Quand la tache est égale à la tâche modifié alors on la modifie
          console.log(element === elementToEdit);
          if (element === elementToEdit) {return Object.assign(elementToEdit,newElement)}
          else {return element}
        }
      )
    });
  }

  async onDrop(event, category){
    // On sélectionne la tache avec le nom. Quand celui-ci n'est pas unique ca fait buguer le schmilblik.
    // Soit j'essaye de récupérer l'ID de la tache soit je donne un fake ID.
    console.log("Je suis dans onDrop");
    console.log(event.dataTransfer.getData("text/plain"));
    this.setState({
      myList : this.state.myList.map(
        function (element) {
          if (element.name == event.dataTransfer.getData("text/plain")) {
            Object.assign(element,{category_id: category});
            const myrequest = fetch(document.origin + `/api/v1/tasks/${element.id}`, {
              method: 'PATCH',
              headers: {
                'X-Requested-With': 'XMLHttpRequest',
                'X-CSRF-Token': document.querySelector('meta[name="csrf-token"]').content,
                'Content-Type': 'application/json'
              },
              credentials: 'same-origin',
              body: JSON.stringify(element)
            });
            return element;
          } else {
            return element;
          }
        }
      )
    });
  }


  onDragOver(event){
    event.preventDefault();
  }

  render() {
    let afficherCat = (category) =>
          this.state.myList
              .filter((element) => element.category_id === category && element.done === false)
              .map(
                (element, i) => <Task
                  key        = {i}
                  task       = {element}
                  removing   = {() => this.deleteElementFromList(element)}
                  editing    = {(newElement) => this.editingElementFromList(element, newElement)}
                  editingEnd = {(newElement) => this.editingElementFromList(element, newElement)}
                  category   = {category}
                />
              )
    return (
      <div id="container">
        <div className="row">
          <div className="col-md-2" >
          </div>
          <div className="col-md-10 task__new" >
            <input
              onChange = {(event) => this.setStartingData(event.target.value, this.state.startingData.ending_date, this.state.startingData.done, this.state.startingData.category_id)}
              value    = {this.state.startingData.name}
            />
            &nbsp;
            <input
              type     = "date"
              onChange = {(event) => this.setStartingData(this.state.startingData.name, event.target.value, this.state.startingData.done, this.state.startingData.category_id)}
              value    = {this.state.startingData.ending_date}
            />
            &nbsp;
            <input
              value = {this.state.startingData.done}
              type  = "hidden"
            />
            <select onChange = {(event) => this.handleCategoryChange(event.target.value, 'category_id')}>
              <option value="1">Urgent & Important</option>
              <option value="2">Urgent & Pas Important</option>
              <option value="3">Pas Urgent & Important</option>
              <option value="4">Pas Urgent & Pas Important</option>
            </select>
            &nbsp;
            <button className="btn btn-primary" onClick = {() => this.fillList()}>
              Add a new task
            </button>
          </div>
        </div>
        <div className="row task__header">
          <div className="col-md-2" >
          </div>
          <div className="col-xs-12 col-md-5 text-center" >
            Important
          </div>
          <div className="col-xs-12 col-md-5 text-center" >
            Pas Important
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 text-right" >
          Urgent
          </div>
          <div id="one" className="col-xs-12 col-md-5 line" onDrop={(event) => this.onDrop(event, 1)} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat(1)}
          </div>
          <div id="two" className="col-xs-12 col-md-5 line" onDrop={(event) => this.onDrop(event, 2)} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat(2)}
          </div>
        </div>
        <div className="row">
          <div className="col-md-2 text-right" >
          Pas Urgent
          </div>
          <div id="three" className="col-xs-12 col-md-5 line" onDrop={(event) => this.onDrop(event, 3)} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat(3)}
          </div>
          <div id="four" className="col-xs-12 col-md-5 line" onDrop={(event) => this.onDrop(event, 4)} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat(4)}
          </div>
        </div>
      </div>
    );
  }
}

class Task extends Component {
  constructor(props){
    super(props);
    this.state = { edit: false };
  }

  changeStateTask(element) {
    this.setState({
      edit: !this.state.edit
    });
  }

  render(){
    let monStyle = {width: "200px", display: "inline-block", color: "black"};
    // let green  = { backgroundColor: "green"  };
    // let blue   = { backgroundColor: "blue" } ;
    // let orange = { backgroundColor: "orange" };
    // let red    = { backgroundColor: "red" } ;
    // console.log(this.props.category);
    let color  = {}
    // if (a > 0) {
    //   return "positive";
    // } else {
    //   return "NOT positive";
    // }
    switch (this.props.category) {
      case 1:
        Object.assign(color, {backgroundColor: "green" });
        break;
      case 2:
        Object.assign(color, {backgroundColor: "blue" });
        break;
      case 3:
        Object.assign(color, {backgroundColor: "orange" });
        break;
      case 4:
        Object.assign(color, {backgroundColor: "red" });
    }
    return (
      <div style={color} className="task text-center" draggable="true" onDragStart={(event) => event.dataTransfer.setData("text/plain", this.props.task.name)} >
        {this.state.edit ?
          (
            <div>
              <input
                onChange = {(event) => this.props.editing({name: event.target.value})}
                value = {this.props.task.name}
              />
            </div>
          )
          :
          (
            <div className="task__name"> {this.props.task.name} </div>
          )
        }
        {this.state.edit ?
          (
            <div>
              <input
                type = "date"
                onChange = {(event) => this.props.editing({date: event.target.value})}
                value = {this.props.task.ending_date}
              />
            </div>
          )
          :
          (
            <div> {this.props.task.ending_date} </div>
          )
        }
        <div onClick = {(event) => this.props.editing({done: !this.props.task.done})} >
          { this.props.task.done ? <i className="fas fa-times-circle"></i> : <i className="fas fa-check-circle"></i> }
          &nbsp;
          <i className="fas fa-trash-alt" onClick = {this.props.removing}> </i>
          &nbsp;
          <i className="fas fa-edit" onClick = {(event) => this.changeStateTask(event)}> </i>
        </div>
        <br/>
        <br/>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('root'));
