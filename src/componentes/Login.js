import React, { Component } from 'react';

export default class Login extends Component{

    constructor(){
        super();
        this.state = {msg:''}
    }


    envia(event){
        event.preventDefault();

        const requestInfo = {
            method:'POST',
            body:JSON.stringify({
                login:this.login.value,
                senha:this.senha.value
            }),
            headers:new Headers({
                "Content-type":'application/json'
            })
        }

        fetch("https://instalura-api.herokuapp.com/api/public/login",requestInfo)
        .then(response=>{
            if(response.ok){
                return response.text()
            }
            throw new Error("Não foi possivel fazer o login");
        })
        .then(token=>{
            console.log(token);
        }).catch(error=>this.setState({msg:error.message}))
    }

    render(){
        return(
            <div className="login-box">
                <h1 className="header-logo">Instalura</h1>
                <span>{this.state.msg}</span>
                <form onSubmit={this.envia.bind(this)}>
                    <input type="text" ref={(input)=>this.login = input} />
                    <input type="password" ref={(input)=>this.senha = input}/>
                    <input type="submit" value="login"/>
                </form>
            </div>
        )
    }

}