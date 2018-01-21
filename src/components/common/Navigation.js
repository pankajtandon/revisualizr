import React from 'react';
import { Link } from 'react-router';

export default class Navigation extends React.Component{
  static contextTypes = {
    user: React.PropTypes.object
  };
  render(){
    return (

        <div className="col-lg-offset-1 col-md-offset-1 col-xs-offset-1 navbar navbar-inverse navbar-sticky navbar-static-top">
          <div className="container">
            <div className="navbar-header">
              <Link to="/" className="navbar-brand">Visualizr</Link>
            </div>
            {/*<div className="navbar-collapse collapse">*/}
              {/*<ul className="nav navbar-nav navbar-right smooth-scroll">*/}
                {/*<li><Link to="/">Home</Link></li>*/}
                {/*<li><Link to="scenes">My Scenes</Link>*/}
                  {/*<li><Link to="uploadedScenes">Uploaded Scenes</Link></li>*/}
                  {/*<li><Link to="approvedScenes">Approved Scenes</Link></li>*/}
                {/*</li>*/}
                {/*<li><Link to="about">About</Link></li>*/}
                {/*<li><Link to="contact">Contact</Link></li>*/}
                {/*<li><Link to="login">Login</Link></li>*/}
              {/*</ul>*/}
            {/*</div>*/}
          </div>
        </div>

    );
  }
}
