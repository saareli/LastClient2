import * as React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

class StoresList extends React.Component {

    state = {
        stores: []
    }

    componentDidMount() {
        axios.get("http://localhost:8989/get-all-stores")
            .then(response => {
                if (response.data) {
                    this.setState({stores: response.data})
                }
            })
    }

    render() {
        return (
            <div>
                <h1>Stores List</h1>

                <div style={{
                    textAlign: "center",
                    padding: "20px",
                    marginRight: "30px",
                    backgroundColor: "white",
                    height: "auto",
                    width: "100%",
                    borderRadius: "10px",
                    boxShadow: "5px 5px 5px grey"
                }}>
                    <h3 className="headline"> Stores Page </h3>
                    <div style={{display: "flex", flexWrap: "wrap"}}>
                        {this.state.stores.map(store => {
                            return (
                                <div>
                                    <Link to={"/shops/" + store.id}> {store.name}</Link>
                                </div>
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }
}

export default StoresList;









