import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';

let startingData = { name: "name", ending_date: "2018-05-01", done: false, category_id: 1};

class App extends Component {
  constructor(){ // initialize en Ruby, est déclenché quand on fait une création d'objet cad un new
    super(); // on appelle les propriétés de la classe parente
    this.state = { // this correspond à self en Ruby, state correspond au modèle, c'est une énumération de clé valeur
      startingData,
      myList  : [ ]
    }
  }

  fetchAPI(data, verb){
    // mettre la requete AJAX
  }

  async readTask() {
    const myrequest = await fetch(document.URL + 'api/v1/tasks', {
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

  setStartingData(name, ending_date, done, category_id) {
    this.setState({
      startingData: {name, ending_date, done, category_id}
    });
  }

  async fillList(){
    console.log(this.state.startingData);
    console.log("je fetch l'API avec une requete POST");
    const myrequest = await fetch(document.URL + 'api/v1/tasks', {
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
    const myrequest = await fetch(document.URL + `api/v1/tasks/${elementToRemove.id}`, {
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
    const myrequest = await fetch(document.URL + `api/v1/tasks/${elementToEdit.id}`, {
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
    // L'id est dans l'event
    console.log("==> debug");
    console.log(event.dataTransfer.getData("text/plain"));
    this.setState({
      myList : this.state.myList.map(
        function (element) {
          if (element.id == event.dataTransfer.getData("text/plain")) {
            Object.assign(element,{category_id: category});
            const myrequest = fetch(document.URL + `api/v1/tasks/${element.id}`, {
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
              .filter((element) => element.category_id === category)
              .map(
                (element, i) => <Task
                  key        = {i}
                  task       = {element}
                  removing   = {() => this.deleteElementFromList(element)}
                  editing    = {(newElement) => this.editingElementFromList(element, newElement)}
                />
              )
    return (
      <div>
        <br/>
        <input
          onChange = {(event) => this.setStartingData(event.target.value, this.state.startingData.ending_date, this.state.startingData.done, this.state.startingData.category_id)}
          value    = {this.state.startingData.name}
        />
        &nbsp;
        <input
          type  = "date"
          onChange = {(event) => this.setStartingData(this.state.startingData.name, event.target.value, this.state.startingData.done, this.state.startingData.category_id)}
          value = {this.state.startingData.ending_date}
        />
        &nbsp;
        <input
          value = {this.state.startingData.done}
          type="hidden"
        />
        <button onClick = {() => this.fillList()} >
          Valider
        </button>
        <br/>
        <br/>
        <div id="liste">
          <div id="one" className="tasks" onDrop={(event) => this.onDrop(event, 1)} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat(1)}
          </div>
          <div id="two" className="tasks" onDrop={(event) => this.onDrop(event, 2)} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat(2)}
          </div>
          <div id="three" className="tasks" onDrop={(event) => this.onDrop(event, 3)} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat(3)}
          </div>
          <div id="four" className="tasks" onDrop={(event) => this.onDrop(event, 4)} onDragOver={(event) => this.onDragOver(event)}>
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

// onDrop={(event) => this.onDrop(event, categorie1)}
// On récupère la catégorie quand fait un onDrop et la rebascule qd on fait le map.
// On peut rafacto les maps selon l'identification de task et on donne un bojet pour réassigner.
// Ordonner les taches. Il faut sous divser les zones de drop en A chque fois qu'on render une tache n définit aussi une zone.

ReactDOM.render(<App />, document.getElementById('root'));
