import * as React from "react";
import axios from "axios";
import Sale from "./Sale";

class Store extends React.Component {
    state = {
        sales: [],
        storeName: [],
        id:this.props.match.params.id
    }

    componentDidMount() {
        axios.get("http://localhost:8989/get-store-name",{
            params: {
                id: parseInt(this.state.id)}})
            .then(response => {
                this.setState({storeName: response.data})
            })
        axios.get("http://localhost:8989/get-store-sales", {
            params: {
                storeId: parseInt(this.state.id)}})
            .then(response => {
                this.setState({sales: response.data})
        })

    }
    render() {
        return (
            <div style={{
                padding: "10px",
                boxShadow: "5px 5px 5px pink",
                height: "auto",
                backgroundColor: "white",
                textAlign: "center",
                marginLeft: "0px",
                marginRight: "20px",
                borderRadius: "3px",
                width: "80%",
            }}>
                <h3> {this.state.storeName}  </h3>
                <div style={{display: "flex", flexWrap: "wrap"}}>
                    {
                        this.state.sales.map(sale => {
                            return (
                                <Sale sale={sale} />
                            )
                        })
                    }
                </div>
            </div>
        );
    }

}

export default Store;