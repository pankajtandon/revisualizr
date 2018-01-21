import React from 'react';

import Navigation from './Navigation';
import BurgerMenu from "../menu/BurgerMenu";

export default class Layout extends React.Component{
  render(){
    return(
      <section className="page">
      <div id="outer-container">
          <BurgerMenu pageWrapId={ "page-wrap" } outerContainerId={ "outer-container" } />
          <main id="page-wrap">
            <Navigation/>
            <section>
              {this.props.children}
            </section>
          </main>
      </div>
      </section>
    );
  }
}
