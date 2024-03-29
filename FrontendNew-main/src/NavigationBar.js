import './App.css';
import * as React from "react";
import {Link, NavLink} from "react-router-dom";
import Cookies from "universal-cookie";

class NavigationBar extends React.Component {
    state = {
        links: [
            {title: "Home Page", path: "/home"},
            {title: "Setting", path: "/settingPage"},
            {title: "Search", path: "/searchPage"},
            {title: "Dashboard", path: "/Dashboard"},
            {title: "Shop List", path: "/shopsPage"},
        ]
    }

    logout = () => {
        const cookies = new Cookies();
        cookies.remove("logged_in");
        window.location.reload();
    }

    render() {
        return (
            <div className="font-face-gm3" style={{marginRight: "20px", marginLeft: "20px", borderRight: "1px solid", paddingRight: "20px"}}>
                <ul>
                    {
                        this.state.links.map(link => {
                            return (
                                <NavLink to={link.path} className={"link"} activeClassName={"active"}>
                                    <li style={{marginBottom: "10px"}}>
                                        <i>
                                            {link.title}
                                        </i>
                                    </li>
                                </NavLink>
                            )
                        })
                    }

                    <button onClick={this.logout}>
                        <NavLink to={"/"} className={"link"} activeClassName={"active"}>
                        Logout
                        </NavLink>
                    </button>
                </ul>
            </div>
        )
    }
}
export default NavigationBar;
