import React, { Component } from 'react';
import  './App.css'
import svg from './logo.svg'



class App extends Component {
    constructor() {
     super();
     this.state = {
         title : 'App For Fun'
     }
    }


  
    render() {
        const {title} = this.state;
        return (
            <div className = "App">
               <section className = 'title'>
               <h1 >
                    {title} 
                </h1>
                <img className = "code" src = {svg}/>
               </section>
               
                <form className = "form">
                    <label htmlFor = "name">Name</label>
                    <input 
                        className = "u-full-width" 
                        type = "text" 
                        id = "name" 
                        name = "name"/>
                    <label htmlFor = "message">Message</label>
                    <textarea 
                        className = "u-full-width" 
                        type = "text" 
                        id = "content" 
                        name = "content"/>
                    <button className = "button-primary">Submit</button>
                </form>
            </div>
        );
    }
}

export default App;