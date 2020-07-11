import React from "react";
import {getUserId} from "../../other/session";
import "./home.css"
import {connect} from "react-redux";
import {sendImage, uploadImage} from "../../actions/profileActions";
import {loginUser} from "../../actions/loginActions";

class ProfilePicture extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            drag: false
        };
        this.componentDidMount.bind(this);
        this.componentWillUnmount.bind(this);
    }

    dropRef = React.createRef();

    handleDrag = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: true})
    };

    handleDragIn = (e) => {
        e.preventDefault();
        e.stopPropagation();
    };


    handleDragOut = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false})
    };

    handleDrop = (e) => {
        e.preventDefault();
        e.stopPropagation();
        this.setState({drag: false});
        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            this.props.dispatch(sendImage(e.dataTransfer))
        }
    };

    componentDidMount() {
        let div = this.dropRef.current;
        if (div == null) return;
        if (getUserId() === this.props.searchedUserId) {
            div.addEventListener('dragenter', this.handleDragIn);
            div.addEventListener('dragleave', this.handleDragOut);
            div.addEventListener('dragover', this.handleDrag);
            div.addEventListener('drop', this.handleDrop)
        }
    }

    componentWillUnmount() {
        let div = this.dropRef.current;
        if (div == null) return;
        div.removeEventListener('dragenter', this.handleDragIn);
        div.removeEventListener('dragleave', this.handleDragOut);
        div.removeEventListener('dragover', this.handleDrag);
        div.removeEventListener('drop', this.handleDrop)
    }

    render() {
        let blob = false;
        if (this.props.image != null && this.props.image.includes("blob")) {
            blob = true;
        }
        return (
            <div className={"profilePictureContainer"} ref={this.dropRef} >
                <div style={{
                    fontSize: "20px",
                    textAlign: "center",
                    marginBottom: "10px",
                }}>
                    Profile Picture
                </div>
                <div className={this.state.drag === true ? "dragging" : "notDragging"}>
                    <img alt="" src={blob ? this.props.image : "data:image/png;base64," + this.props.image} style={{
                        width: "100%"
                    }}/><br/>
                </div>
                {getUserId() === this.props.searchedUserId &&
                    <div>
                        <input type="file" id="myFile" name="filename" hidden onChange={(e) => {
                            if (e.target.files.length > 0) {
                                this.props.dispatch(sendImage(e.target))
                            }
                        }}/>
                        <input value={"Upload Image"} type="submit" className={"loginButton"} onClick={() => document.getElementById("myFile").click()}/>
                    </div>
                }
            </div>
        );
    }

}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(ProfilePicture)

//<label className={"fileLabel"} htmlFor="upload-photo">{name == null ? "Select Image" : name}</label>