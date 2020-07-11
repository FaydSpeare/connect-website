import * as React from "react";
import {connect} from "react-redux";
import {ChatLine} from "./ChatLine";
import {sendChatLine} from "../../actions/gameActions";
import {useEffect} from "react";

function LiveChat(props) {
    let chat = props.currentGame.chat;
    let ref = React.useRef();

    useEffect(() => {
        ref.current.scrollIntoView();
    }, [props.currentGame.chat]);

    return (
        <div
            style={{
                display: "inline-block",
                marginLeft: "100px",
            }}
        >
            <div
                style={{
                    display: "inline-block",
                    backgroundColor: "#38363a",
                    width: "400px",
                    height: "634px",
                    borderRadius: "15px",
                    margin: "10px",
                    textAlign: "center"
                }}
            >
                <p>Live Chat</p>
                <div
                    style={{
                        width: "360px",
                        height: "480px",
                        backgroundColor: "#1f1e20",
                        display: "inline-block",
                        overflowWrap: "break-word",
                        textAlign: "left",
                        overflowY: "scroll",
                        whiteSpace: "pre-wrap"
                    }}
                >
                    {chat.map((item, i) => (<ChatLine key={i} username={item.username} chatLine={item.chatLine}/>))}
                    <div style={{ float:"left", clear: "both" }}
                         ref={ref}>
                    </div>
                </div>
                <div
                    style={{
                        width: "360px",
                        height: "60px",
                        display: "inline-block",
                        border: "1px solid black",
                        marginTop: "10px"
                    }}
                >
                    <textarea
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                            boxSizing: "border-box",
                            resize: "none"
                        }}
                        onKeyDown={e => {
                            if (e.key === 'Enter') {
                                e.preventDefault();
                                let userId = props.userDetails.userId;
                                let gameId = props.currentGame.gameId;
                                sendChatLine(userId, gameId, e.target.value);
                                e.target.value = "";
                            }
                        }}
                    >

                    </textarea>
                </div>

            </div>

        </div>
    )
}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(LiveChat)