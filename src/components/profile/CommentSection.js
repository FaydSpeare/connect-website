import * as React from "react";
import Comment from "./Comment";
import "./home.css"
import {getUserId, getUsername} from "../../other/session";
import {backendURL} from "../../other/constants";
import {addComment} from "../../actions/profileActions";
import {connect} from "react-redux";

class CommentSection extends React.Component {

    constructor(props) {
        super(props);
        this.input = React.createRef();
        this.bottom = React.createRef();
    }

    getList = () => {
        if (this.props.comments === undefined) {
            return null;
        }
        return this.props.comments.map((item, i) => (<Comment key={i} username={item.commentor} comment={item.comment}/>));
    };

    enterComment = (e) => {
        if (e.key === 'Enter') {
            console.log("comment? ", e.target.value);
            let commentText = e.target.value;
            let comment = {
                comment: commentText,
                commentor: getUsername()
            };
            this.props.dispatch(addComment(comment));
            this.postComment(commentText);
            this.input.current.value = "";
            this.bottom.current.scrollIntoView();
        }
    };

    postComment = (comment) => {
        fetch(backendURL + '/user/comment', {
            method: 'POST',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                userId: this.props.searchedUserId,
                commentorId: getUserId(),
                comment: comment
            })
        }).then(response => {
            console.log(response);
        }).catch(e => {
            console.log(e);
        });
    };

    render() {
        return (
            <div className={"commentSectionContainer"} style={{padding: "20px"}}>
                <div style={{
                    fontSize: "20px",
                    textAlign: "center",
                    marginBottom: "10px"
                }}>
                    Comments
                </div>
                <div className={"commentsContainer"}>
                    {this.getList()}
                    <div style={{ float:"left", clear: "both" }}
                         ref={this.bottom}>
                    </div>
                </div>
                <div>
                    <input
                        style={{
                            width: "100%",
                            height: "100%",
                            display: "block",
                            boxSizing: "border-box",
                            resize: "none"
                        }}
                        onKeyDown={this.enterComment}
                        className={"commentInput"} type={"input"} ref={this.input}
                    />
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return state;
}

export default connect(mapStateToProps)(CommentSection)
