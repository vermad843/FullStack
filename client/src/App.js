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
            </div>
        );
    }
}

export default App;