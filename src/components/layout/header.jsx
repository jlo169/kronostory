import React from 'react';
import './layout.css';
import { Link } from 'react-router-dom';

export default class Header extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            showDropdownMenu: false
        }
        this.toggleMenuNav = this.toggleMenuNav.bind(this);
        this.mouseLeaveMenuNav = this.mouseLeaveMenuNav.bind(this);
        this.closeDropdown = this.closeDropdown.bind(this);
    }
    componentDidMount(){
		document.addEventListener('click', this.closeDropdown)
		window.addEventListener('scroll', this.closeDropdown)
	}
	componentWillUnmount(){
		document.removeEventListener('click', this.closeDropdown)
		window.removeEventListener('scroll', this.closeDropdown)
	}
    closeDropdown(event){
        if(event.target.className !== 'username'){
            this.setState({showDropdownMenu: false})
        }
    }
    toggleMenuNav(){
        this.setState({showDropdownMenu: !this.state.showDropdownMenu});
    }
    mouseLeaveMenuNav(){
        this.setState({showDropdownMenu: false});
    }
    render(){
        let menuNav;
        let menuNavClass;
        let menuNavDropdownClass;

        if(this.state.showDropdownMenu){
            menuNavClass = "menu-nav-dropdown";
            menuNavDropdownClass = "menu-nav-dropdown-arrow"
        } else {
            menuNavClass = "menu-nav-dropdown d-none"
            menuNavDropdownClass = "menu-nav-dropdown-arrow d-none"
        }
        
        if(this.props.userSeshData.id) {
            menuNav = (
                <div className="menu-nav align-self-center" >
                    <i className="far fa-user-circle"></i> 
                    <span className="username" onClick={this.toggleMenuNav}>
                        {this.props.userSeshData.username} &#9663; 
                        <div className={menuNavClass} onMouseLeave={this.mouseLeaveMenuNav}>
                            <Link to={{
                                pathname: `/${this.props.userSeshData.username}`,
                                state: {
                                    userId: this.props.userSeshData.id, 
                                    username: this.props.userSeshData.username, 
                                }
                            }} className="dropdown-link" onClick={this.dashboardHandler}>
                                dashboard
                            </Link>
                            <Link to='/user-login' className="dropdown-link" onClick={this.props.logoutHandler}>
                                logout
                            </Link>
                        </div>
                    </span>
                    <div className={menuNavDropdownClass}></div>
                </div>
                );
        } else {
            menuNav = (
                <div className="menu-nav align-self-center">
                    <Link to="/user-signup">Sign Up</Link>
                    <Link to="/user-login">Log In</Link>
                </div>
                );
        }

        return(
            <React.Fragment>
            <div className="row d-flex justify-content-between py-2 mx-2">
                <div className="logo d-flex align-items-center">
                    <div className="logo-icon">
                        <img className="img-fluid" src="/images/white-logo.png" />
                    </div>
                    <h2>
                        <Link to="/">
                            {this.props.title}
                        </Link>
                    </h2>
                </div>
                {menuNav}
            </div>
            </React.Fragment>
        );
    }
}