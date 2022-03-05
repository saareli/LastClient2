import React from "react";


class Sale extends React.Component {
    render() {
        return (
            <div className={"board"} style={{borderRadius:"2px" ,color:"solid black" ,width:"50%", height:"auto", padding:"20px"}}>
                <div className="font-face-gm" ><h3 style={{color: "black"}}> {this.props.data.store.storeName}  </h3></div>
                <h3 style={{color: "tan"}}>{this.props.data.description}</h3>
            </div>
        )
    }
}
export default Sale;