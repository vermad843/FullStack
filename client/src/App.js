import React, { Component } from 'react';
import  './App.css'
import svg from './logo.svg'



class App extends Component {
    constructor() {
     super();
     this.state = {
         title : 'App For Fun',
         name : '',
         content : '',
         loading : false ,
         done : null,
         data : {}
     }
     this.formSubmitted = this.formSubmitted.bind(this);
     this.inputChanged = this.inputChanged.bind(this);
    }



    inputChanged(event) {
        const value = event.target.value;
       this.setState({
        ...this.state,
        [event.target.name]: value
      });
    }
   



    formSubmitted(event) {
        this.setState({loading : true, done : true })
        event.preventDefault(); 
        const data = {
           name  : this.state.name,
           content  : this.state.content
        }

        fetch('http://localhost:5000/content', {
            method : 'POST',
            body : JSON.stringify(data),
            headers : {
                'content-type' : 'application/json'
            } 
         });
         console.log(data)
    }

  

 


  

 
    
  

    render() {
        const {title, name , content, loading, done} = this.state;
        return (
            <div className = "App">
               <section className = 'title'>
               <h1 >
                    {title} 
                </h1>
                <img className = "code" src = {svg} alt = "svg"/>
               </section>
               { !done && ( 
                <form onSubmit = {this.formSubmitted} className = "form">
                    <label htmlFor = "name">Name</label>
                    <input 
                        onChange = {this.inputChanged}
                        value = {name}
                        className = "u-full-width" 
                        type = "text" 
                        id = "name" 
                        name = "name"/>
                    <label htmlFor = "content">Message</label>
                    <textarea 
                        value = {content}
                        onChange = {this.inputChanged}
                        className = "u-full-width" 
                        type = "text" 
                        id = "content" 
                        name = "content"/>
                    <button type = "submit" className = "button-primary">Submit</button>
                </form>)}
                <div className = "loading">
           {loading ? <img  src = "Facebook-1s-200px.gif" alt = "loading" /> : '' }
      </div>
            </div>
        );
    }
}

export default App;