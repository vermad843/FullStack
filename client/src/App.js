import React, { Component } from 'react';
import  './App.css'




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
            <div>
                <h1 className = 'title'>
                    {title} 
                </h1>
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