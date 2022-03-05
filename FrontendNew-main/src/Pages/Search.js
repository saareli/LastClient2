
import * as React from "react";
import axios from "axios";
import Sale from "./Sale";


class Search extends React.Component {

    state = {
        sales: [],
        searchText: "",
    }

    onSearchTextChange = (e) => {
        this.setState({
            searchText: e.target.value
        })
    }

    searchFilter = () => {
        axios.get("http://localhost:8989/get-all-searches", {
            params: {
                searchText: this.state.searchText
            }
        }).then(response => {
            this.setState({sales: response.data})
        })
    }

    render() {
        return (

            <div style={{

                textAlign: "center",
                padding: "20px",
                marginLeft: "0px",
                marginRight: "30px",
                backgroundColor: "white",
                height: "auto",
                width: "100%",
                borderRadius: "10px",
                boxShadow: "5px 5px 5px grey"

            }}>
                <div className="font-face-gm" ><h3 className="headline"> Search </h3> </div>


                <div style={{marginBottom: "20px"}}>
                    <input style={{fontSize: "15px", margin: "20px"}} type={"text"} onChange={this.onSearchTextChange}
                           placeholder={"Please search here"} value={this.state.searchText}/>

                    <button className={"button"} disabled={this.state.text.length === 0} onClick={this.searchFilter}> SEARCH</button>
                </div>

                <div style={{display: "flex", flexWrap: "wrap"}}>

                    {
                        this.state.sales.map(sale => {
                            return (
                                <Sale sale={sale} bool={true}/>
                            )
                        })
                    }

                </div>
            </div>
        );
    }

}export default Search;



