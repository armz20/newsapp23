import React, { Component } from 'react';
import Cookies from 'js-cookie';
import { withRouter } from 'react-router-dom';


class ProfileHeader extends Component {

  state = {
    id: this.props.id,
    name: this.props.name,
    page: this.props.page,
    index: this.props.index
  };

  redirect = (page) => {
    const { history } = this.props;
    history.push("/" + page);
    window.location.reload();
  }

  render() {
    return (
      <div>
        <span>
          <div>
            {/* <span className={Style.profilePic}>
                <img
                  src="https://www.tenforums.com/geek/gars/images/2/types/thumb_15951118880user.png"
                  width="150"
                  height="auto" />
              </span> */}
            {this.state.page === "profile" &&
            <span> {this.state.name} </span>
            }
            {this.state.page !== "profile" &&
            <span> <button className="user-button" onClick={() => this.redirect("profile/"+this.state.id)}>{this.state.name}</button> </span>
            }
            

          </div>
        </span>
        </div>
    )
  }
}

export default withRouter(ProfileHeader);