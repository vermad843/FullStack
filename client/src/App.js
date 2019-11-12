import React, { Component } from 'react';
import  './App.css'
import svg from './logo.svg'



class App extends Component {
    constructor() {
     super();
     this.state = {
         title : 'Twitter Clone',
         name : '',
         content : '',
         loading : false ,
         tweets : []
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
        event.preventDefault(); 
        this.setState({loading : true });
        const tweet = {
           name  : this.state.name,
           content  : this.state.content
        }

        fetch('http://localhost:5000/tweets', {
            method : 'POST',
            body : JSON.stringify(tweet),
            headers : {
                'content-type' : 'application/json'
            } 
         }).then((res) => {
            return res.json();
         }).then((createdTweet) => {
             this.setState({
                 name : '',
                 content : '',
                 loading : false ,
             })
            console.log(createdTweet);
         });

         fetch('http://localhost:5000/tweets')
         .then((res) => {
             return res.json();
         })
        .then(tweets => {
             tweets.reverse()
             this.setState({
               tweets  
             });
         });  
    }
    
  
    render() {
        const {title, name , content, loading, tweets} = this.state;
        return (
            <div className = "App" >
               <section className = 'title'>
               <h1 >
                    {title} 
                </h1>
                <img className = "code" src = {svg} alt = "svg"/>
               </section>
              
                <div >
               {loading  ? <img style = {{textAlign : 'center'}} src = "Facebook-1s-200px.gif" alt = "loading" /> :  
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
                </form>}
            </div>

            <section >
                 { 
                  tweets.map((tweet) => {
                        return  <div className = "tweets" key ={tweet.id} >
                        <h3>{tweet.name}</h3>
                        <p>{tweet.content}</p>
                        <h6>{tweet.created}</h6>
                        
                    </div>                
                 })}
            </section>
      
             
       </div>
        );
    }
} 

export default App;