import React from "react";
import Sale from "./Sale";
import axios from "axios";
import Cookies from "universal-cookie";

class Dashboard extends React.Component {
    state = {
        userSales: []
    }

    componentDidMount() {
        const cookies = new Cookies();
        axios.get("http://localhost:8989/get-user-sales", {
            params: {
                token: cookies.get("logged_in")
            }
        }).then(response => {
            this.setState({userSales: response.data})
        })
    }

    render() {
        return (
            <div style={{textAlign: "center"}}>
                <div className="font-face-gm" ><h1>Dashboard Page </h1></div>
                <div className="font-face-gm2" > <h3>All the sales that available for you </h3></div>
                {
                    this.state.userSales.length> 0 ?
                        this.state.userSales.map(sale => {
                            return (
                                <div>
                                    <Sale data={sale}/>
                                </div>
                            )
                        })
                        :
                        <div className="font-face-gm3red">There are no sales for you at this moment.
                           <br/> Please try again later.</div>

                }
            </div>
        );
    }
}
export default Dashboard;