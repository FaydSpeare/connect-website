import * as React from "react";
import "../component.css"
import "./home.css"
import {connect} from "react-redux";
import { useHistory } from 'react-router-dom';
import {getUserId} from "../../other/session";
import {deleteAccount} from "../../actions/profileActions";
import {logout} from "../../actions/loginActions";

function UpdateComponent(props) {

    let history = useHistory();

    return (
        <div className={"emailBox"}>
            <div style={{
                fontSize: "20px",
                textAlign: "center"
            }}>
                User Actions
            </div>
            <div>
                <button className={"loginButton"}
                        onClick={() => {
                            history.push("/update-password");
                        }}
                >
                    {"Update Password"}
                </button>
            </div>
            <div>
                <button className={"loginButton"}
                        onClick={() => {
                            history.push("/update-email");
                        }}
                >
                    {"Update Email"}
                </button>
            </div>
            <div>
                <button className={"loginButton"}
                        onClick={() => {
                            window.confirm("Are you sure you want to delete your account?");
                            window.confirm("Are you super sure you want to delete your account?");
                            let password = window.prompt("Enter password to delete account");
                            props.dispatch(deleteAccount(getUserId(), password));
                        }}
                        style = {{
                            backgroundColor: "crimson"
                        }}
                >
                    {"Delete Account"}
                </button>
            </div>
        </div>
    );
}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(UpdateComponent)