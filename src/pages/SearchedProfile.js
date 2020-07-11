import React, {Component} from 'react';
import {connect} from "react-redux";
import {fetchUserProfile, sendVerifyEmail} from "../actions/profileActions";
import "./profile.css"
import CommentSection from "../components/profile/CommentSection";
import ProfilePicture from "../components/profile/ProfilePicture";
import {getUserId, isLoggedIn} from "../other/session";
import {Redirect} from "react-router-dom";
import EmailComponent from "../components/profile/EmailComponent";
import DataComponent from "../components/profile/DataComponent";
import OnlineComponent from "../components/profile/OnlineComponent";

class SearchedProfile extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        let userId = this.props.match.params.userId;
        //let profile = this.props.userProfile.profile;
        this.props.dispatch(fetchUserProfile(userId))
    }

    render() {
        if (!isLoggedIn(this.props)) {
            return <Redirect to={"/login"}/>;
        }

        let isFetching = this.props.userProfile.isFetching;
        let profile = this.props.userProfile.profile;
        if (isFetching === true || profile === undefined) {
            return <div className={"loader"}/>;
        }
        console.log("rendering profile", this.props, profile.comments);
        let userId = this.props.match.params.userId;

        return (
            <div
                style={{
                    marginTop: "150px",
                    textAlign: "center"
                }}
            >
                <div className={"sideBySideDiv"}>
                    <div>
                        <ProfilePicture image={profile.image} searchedUserId={userId} username={profile.username}/>
                    </div>
                </div>
                <div className={"sideBySideDiv"} style={{marginLeft: "50px"}}>
                    <div>
                        <div>
                            <DataComponent elo={profile.elo} gamesPlayed={profile.pastGameCount}/>
                        </div>
                        <div style={{marginTop: "50px"}}>
                            <EmailComponent showVerify={false} email={profile.email} verified={profile.isVerified} sendEmail={() => this.props.dispatch(sendVerifyEmail(getUserId()))}/>
                        </div>
                        <div style={{marginTop: "50px"}}>
                            <OnlineComponent isOnline={profile.isOnline}/>
                        </div>
                    </div>
                </div>
                <div className={"sideBySideDiv"} style={{marginLeft: "50px"}}>
                    <CommentSection comments={profile.comments} searchedUserId={userId}/>
                </div>
            </div>
        );
    }

}

function mapStateToProps(state) {
    return state;
}


export default connect(mapStateToProps)(SearchedProfile)