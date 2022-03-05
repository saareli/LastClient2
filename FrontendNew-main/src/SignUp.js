import './App.css';
import * as React from "react";
import axios from "axios";
import {NavLink} from "react-router-dom";


class SignUp extends React.Component {
    state = {
        username: "",
        password: "",
        showErr: "",
        response:"",

    }


    onUsernameChange = (e) => {
        let username = e.target.value;
        this.setState({
            username: username
        })
    }
    onPasswordChange = (e) => {
        this.setState({
            password: e.target.value
        })
    }


    SignUp = () => {
            axios.get("http://localhost:8989/create-account", {
                params: {
                    username: this.state.username,
                    password: this.state.password
                }
            })
               .then((response) => {
                    console.log("enter: " +response.data);
                    if (response.data) {
                        this.setState({showErr: "User Created!"})
                    } else {
                        console.log(response)
                        this.setState({
                            showErr: "This Username already exist. Please Choose Other Username"
                        })
                    }
                })
    }

    render() {
        const inputStyle = {
            margin: "10px",
            width: "200px"
        }
        const buttonStyle = {
            margin: "10px",
            width: "200px",
            backgroundColor: "black",
            color: "white",
            borderRadius: "5px"
        }

        return (
            <div style={{margin: "auto", width: "50%", padding: "10px"}}>
                <fieldset style={{width: "500px"}}>
                    <legend>
                        <div className="font-face-gm"  style={{fontSize: "20px"}}>
                            Sign Up to the website
                        </div>
                    </legend>
                    <div className="font-face-gm">Enter User Name And Password To Sign Up </div>
                    <input style={inputStyle}
                           onChange={this.onUsernameChange}
                           value={this.state.username}
                           placeholder={"Enter UserName"}
                    />
                    <br/>
                    <input style={inputStyle}
                           onChange={this.onPasswordChange}

                           value={this.state.password}
                           placeholder={"Enter Password"}
                    />
                    <br/>
                    <button style={buttonStyle} onClick={this.SignUp}>Sign Up</button>
                    <div>
                        {this.state.showErr}
                    </div>
                    <div className="font-face-gm">
                        <ul>
                            <u>UserName Conditions-</u><br/>
                            <li >NONE :)</li><br/>
                           <u>Password Conditions- </u><br/>
                            <li> NONE :)</li>

                        </ul>
                    </div>
                    <div>
                        <NavLink to={"/"} className={"link"} activeClassName={"active"}>
                            <button >Back To Main Page</button>
                        </NavLink>

                    </div>
                </fieldset>
            </div>
        )
    }
}export default SignUp;