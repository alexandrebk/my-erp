import React from 'react';
import {Component} from 'react';
import ReactDOM from 'react-dom';
// import '../../assets/stylesheets/application.scss';

let startingData = { title: "", date: "2018-05-01", done: false, category: "one"};

class App extends Component {
  constructor(){ // initialize en Ruby, est déclenché quand on fait une création d'objet cad un new
    super(); // on appelle les propriétés de la classe parente
    this.state = { // this correspond à self en Ruby, state correspond au modèle, c'est une énumération de clé valeur
      startingData,
      myList  : [
        {
          title: "Tache1",
          date: "2017-01-01",
          done: false,
          category: "one"
        },
        {
          title: "Tache2",
          date: "2017-01-01",
          done: false,
          category: "two"
        },
        {
          title: "Tache3",
          date: "2017-01-01",
          done: false,
          category: "three"
        },
        {
          title: "Tache4",
          date: "2017-01-01",
          done: false,
          category: "four"
        }
      ]
      // editing: YES
    }
  }

  setStartingData(title, date, done, category) {
    this.setState({
      startingData: {title, date, done, category}
    });
  }

  fillList(){
    this.setState({
      // old fashioned way to add to myList:
      // myList: this.state.myList.concat([this.state.startingData]),
      // better way :
      myList: [...this.state.myList, this.state.startingData],
      // Ensuite on réinitialise la variable à zéro
      startingData,
    });
  }

  removeElementFromList(elementToRemove){
    this.setState({myList: this.state.myList.filter((element) => element !== elementToRemove)});
  }

  editingElementFromList(elementToEdit, newElement){
    this.setState({
      myList : this.state.myList.map(
        function (element) {
          console.log(elementToEdit);
          console.log(newElement);
          console.log(element === elementToEdit);
          if (element === elementToEdit) {return Object.assign(elementToEdit,newElement)}
          else {return element}
        }
      )
    });
  }

  onDrop(event, categorie){
    console.log("==> debug");
    console.log(categorie);
    console.log(event.dataTransfer.getData("text/plain"));
    // quand c'est false true, quand c'est true false ==> toggle
    //
    this.setState({
      myList : this.state.myList.map(
        function (element) {
          console.log(element.title);
          if (element.title === event.dataTransfer.getData("text/plain")) {return Object.assign(element,{category: categorie})}
          else {return element}
        }
      )
    });
  }


  onDragOver(event){
    event.preventDefault();
  }

  render() {
    console.log(this.state.myList);
    let afficherCat = (done) =>
          this.state.myList
              .filter((element) => element.category === done)
              .map(
                (element, i) => <Task
                  key        = {i}
                  task       = {element}
                  removing   = {() => this.removeElementFromList(element)}
                  editing    = {(newElement) => this.editingElementFromList(element, newElement)}
                />
              )
    return (
      <div>
        <div> To Do List </div>
        <br/>
        <input
          onChange = {(event) => this.setStartingData(event.target.value, this.state.startingData.date, this.state.startingData.done, this.state.startingData.category)}
          value    = {this.state.startingData.title}
        />
        &nbsp;
        <input
          type  = "date"
          onChange = {(event) => this.setStartingData(this.state.startingData.title, event.target.value, this.state.startingData.done, this.state.startingData.category)}
          value = {this.state.startingData.date}
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
          <div className="one" onDrop={(event) => this.onDrop(event, "one")} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat("one")}
          </div>
          <div className="two" onDrop={(event) => this.onDrop(event, "two")} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat("two")}
          </div>
          <div className="three" onDrop={(event) => this.onDrop(event, "three")} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat("three")}
          </div>
          <div className="four" onDrop={(event) => this.onDrop(event, "four")} onDragOver={(event) => this.onDragOver(event)}>
            {afficherCat("four")}
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
      <div className="task" draggable="true" onDragStart={(event) => event.dataTransfer.setData("text/plain", this.props.task.title)}>
        {this.props.task.done ?
          (
            <span>
              <span style={monStyle} > {this.props.task.title} </span>
              &nbsp;
              <span style={monStyle} > {this.props.task.date} </span>
            </span>
          ) : (
            <span>
              <input
                onChange = {(event) => this.props.editing({title: event.target.value})}
                value = {this.props.task.title}
              />
              &nbsp;
              <input
                type = "date"
                onChange = {(event) => this.props.editing({date: event.target.value})}
                value = {this.props.task.date}
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
