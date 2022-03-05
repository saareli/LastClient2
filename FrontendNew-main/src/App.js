import './App.css';
import * as React from "react";
import {BrowserRouter, Redirect} from "react-router-dom";
import {Route} from "react-router";
import NavigationBar from "./NavigationBar";
import Cookies from "universal-cookie";
import './fonts/static/SourceSans3-Regular.ttf' ;
import './fonts/static/SourceSans3-LightItalic.ttf' ;
import './fonts/static/SourceSans3-Medium.ttf'  ;
import Dashboard from "./Pages/Dashboard";
import Search from "./Pages/Search";
import Store from "./Pages/Store";
import StoresList from "./Pages/StoresList";
import Setting from "./Pages/Setting";
import LoginPage from "./LoginPage";
import SignUp from "./SignUp";
import axios from "axios";

class App extends React.Component {
    cookies = new Cookies();
    ws  = new WebSocket("ws://localhost:8989/stream?token=" + this.cookies.get("logged_in"))

    state = {
        isLoggedIn: false,
        isFirstLogin: false,
        token : ""
    }

    componentDidMount() {

        const cookies = new Cookies();
        if (cookies.get("logged_in")) {
            this.setState({
                isLoggedIn: true,
                token : cookies.get("logged_in")
            })
            axios.get("http://localhost:8989/first-login", {
                params: {
                    token: cookies.get("logged_in"),
                }
            }).then(response => {
                if (response.data) {
                    this.setState({isFirstLogin: response.data})
                }
                else {

                    this.setState({isFirstLogin: response.data})
                }
            })
        }
    }

    render() {
        return (
            <div className="App">
                <BrowserRouter>
                    {
                        this.state.isLoggedIn ?
                            <div style={{display: "flex", alignItems: "start", marginTop: "50px"}}>
                                <NavigationBar/>
                                {
                                    this.state.isFirstLogin ?
                                        <Redirect to={"/setting"} />
                                        :
                                        <Redirect to={"/dashboard"} />

                                }
                                <Route path={"/dashboard"} component={Dashboard} exact={true}/>
                                <Route path={"/shops"} component={StoresList} exact={true}/>
                                <Route path={"/shop/:id"} component={Store} exact={true}/>
                                <Route path={"/search"} component={Search} exact={true}/>
                                <Route path={"/setting"} component={Setting} exact={true}/>
                            </div>
                            :
                            <div>
                                <Route path={"/"} component={LoginPage} exact={true}/>
                                <Route path={"/signUp"} component={SignUp}/>
                            </div>
                    }
                </BrowserRouter>
                <div className="font-face-gm2">
                    Project By Saar Eli And Tal Hamo
                </div>

            </div>
        )
    }

}

export default App;
