 import Cookies from "universal-cookie/es6";
 import * as React from "react";
 import axios from "axios";


 class Setting extends React.Component {
     state = {
         organizations:  [],
         organizationsOfUser: []
     }

     componentDidMount() {
             this.getOrganization()
             this.getOrganizationOfUser()
         }

          getOrganization=()=> {
             axios.get("http://localhost:8989/get-organizations")
                 .then(response => {
                     this.setState({organizations: response.data})
                 })
         }

       getOrganizationOfUser=()=>{
         const cookies = new Cookies();
         axios.get("http://localhost:8989/get-organizations-of-user", {
             params: {
                 token: cookies.get("logged_in")
             }
          }).then((response) => {
             this.setState({organizationsOfUser: response.data})
         })
     }

         doseOrganizationBelongToUser=(organization)=>{
             let connect = false
             this.state.organizationsOfUser.map((org)=>{
                 return(
                     <div>
                         {org.id == organization && <div>{connect = true}</div>}
                     </div>
                 )
             })
             return connect
         }
     addOrganization = (id) => {
         const cookies = new Cookies();
         let data = new FormData();
         data.append("token", cookies.get("logged_in"));
         data.append("organId", id)
         axios.post("http://localhost:8989/add-organization-to-user", data)
             .then(() => {
                 this.getOrganizationOfUser()
             })
     }

    deleteOrganization = (id) => {
     const cookies = new Cookies();
     let data = new FormData();
     data.append("token", cookies.get("logged_in"));
     data.append("organId", id)
     axios.post("http://localhost:8989/delete-organization-from-user", data)
         .then(() => {
             this.getOrganizationOfUser()
         })
 }


     render() {
         return (
             <div>
                 <div className="font-face-gm" >
                   Setting
                 </div>
                      <div className="font-face-gm2" >
                      <h1>Which organizations belong to you?</h1>
                      </div>

                 <fieldset>
                     {
                         this.state.organizations.length == 0
                             ?
                             <div> No organization found</div>
                             :
                             this.state.organizations.map((organization) => {
                                 return (
                                     <div className={"organization"}>
                                         <input type="checkbox"
                                                id={organization}
                                                name="interest"
                                                checked={this.doseOrganizationBelongToUser(organization.id)}
                                                value={organization.id} onClick={this.addOrganization} />
                                         <label htmlFor="coding" >{organization.organizationName}</label>
                                     </div>
                                 )
                             })
                     }
                 </fieldset>
             </div>
         )
     }
 }

 export default Setting;

