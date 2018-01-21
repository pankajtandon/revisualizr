import React, {Component} from 'react'
import { elastic as Menu } from 'react-burger-menu'

class BurgerMenu extends React.Component {
    showSettings (event) {
        console.log('sub...');
        event.preventDefault();
    }

    render () {
        return (
            <Menu>
                <a id="home" className="menu-item" href="/">Home</a>
                <a id="scenes" className="menu-item" href="/scenes">My Scenes</a>
                <a id="about" className="menu-item" href="/about">About</a>
                <a id="contact" className="menu-item" href="/contact">Contact</a>
                <a onClick={ this.showSettings } className="menu-item" href="">Settings</a>
                <a id="login" className="menu-item" href="/login">Login</a>
            </Menu>
        );
    }
}
export default BurgerMenu;