import * as React from "react";
import "../component.css"
import "./home.css"
import {useState} from "react";

function EmailComponent(props) {

    const [emailSent, setEmailSent] = useState(false);

    return (
        <div className={"emailBox"}>
            <div style={{
                fontSize: "20px",
                textAlign: "center"
            }}>
                Email
            </div>
            <div>
                <input className={"infoInput"} defaultValue={props.email} readOnly={true}/>
            </div>
            {props.showVerify &&
            <div style={{
                textAlign: "center",
                marginTop: "5px"
            }}>
                {props.verified ?
                    <div style={{
                        color: "lime",
                        fontSize: "20px"
                    }}>
                        Verified
                    </div> :
                    <div>
                        <button className={"loginButton"} disabled={emailSent} onClick={() => {
                            setEmailSent(true);
                            props.sendEmail();
                        }}>
                            {emailSent ? "Verification Email Sent" : "Verify Email"}
                        </button>
                    </div>
                }
            </div>
            }
        </div>
    );
}

export default EmailComponent;