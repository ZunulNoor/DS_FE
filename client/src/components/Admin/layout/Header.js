import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { GlobalContext } from '../../../Context/context';
import Cookies from 'js-cookie';
import { decodeToken } from 'react-jwt'

export const Header = () => {
    const { state, dispatch } = useContext(GlobalContext)
    const currentUser = decodeToken(state.token)


    const [width] = useState(window.innerWidth);
    const isMobile = width <= 768;
    const [sidebar, setSidebar] = useState(!isMobile);
    function onToggleSwitchChange() {
        setSidebar(!sidebar)
    }
    useEffect(() => {
        if (sidebar === true) {
            document.body.classList.remove('sidebar-collapse');
            document.body.classList.add('sidebar-open');
        } else {
            document.body.classList.remove('sidebar-open');
            document.body.classList.add('sidebar-collapse');

        }
    }, [sidebar]);
    return (
        <div>
            {/*<!-- Header -->*/}
            <header className="main-header">

                {/*<!-- Logo -->*/}
                <Link to="/" className="logo">
                    {/*<!-- mini logo for sidebar mini 50x50 pixels -->*/}
                    <span className="logo-mini"><b>D</b>S</span>
                    {/*<!-- logo for regular state and mobile devices -->*/}
                    <span className="logo-lg"><b>DiamondStar</b> International</span>
                </Link>

                {/*<!-- Header Navbar: style can be found in header.less -->*/}
                <nav className="navbar navbar-static-top" role="navigation">
                    {/*<!-- Sidebar toggle button-->*/}
                    <span onClick={() => { onToggleSwitchChange() }} className="sidebar-toggle" data-toggle="offcanvas" role="button">
                        <span className="sr-only">Toggle navigation</span>
                    </span>
                    {/*<!-- Navbar Right Menu -->*/}
                    <div className="navbar-custom-menu">
                        <ul className="nav navbar-nav">

                            {/*<!-- User Account: style can be found in dropdown.less -->*/}
                            <li className="dropdown user user-menu">
                                <a href="#" className="dropdown-toggle" data-toggle="dropdown">
                                    <img src="https://banner2.cleanpng.com/20180702/v/kisspng-computer-icons-login-adityaram-properties-business-saudi-standards-metrology-and-quality-organization-5b3ab6eda02403.387019831530574573656.jpg" className="user-image" alt="User Image" />
                                    <span className="hidden-xs">{currentUser.user_name}</span>
                                </a>
                                <ul className="dropdown-menu">
                                    {/*<!-- User image -->*/}
                                    <li className="user-header">
                                        <img src="https://banner2.cleanpng.com/20180702/v/kisspng-computer-icons-login-adityaram-properties-business-saudi-standards-metrology-and-quality-organization-5b3ab6eda02403.387019831530574573656.jpg" className="img-circle" alt="User Image" />
                                        {/* <p>
                                            Zun Ul Noor - Web Developer
                                            <small>Member since Nov. 2004</small>
                                        </p> */}
                                    </li>
                                    {/*<!-- Menu Body -->*/}
                                    {/* <li className="user-body">
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Followers</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Sales</a>
                                        </div>
                                        <div className="col-xs-4 text-center">
                                            <a href="#">Friends</a>
                                        </div>
                                    </li> */}
                                    {/*<!-- Menu Footer-->*/}
                                    <li className="user-footer">
                                        {/* <div className="pull-left">
                                            <a href="#" className="btn btn-default btn-flat">Profile</a>
                                        </div> */}
                                        <div className="pull-right">
                                            <button onClick={() => {
                                                Cookies.remove('token')
                                                dispatch({ type: "USER_LOGOUT" })
                                            }} className="btn btn-default btn-flat">Sign out</button>
                                        </div>
                                    </li>
                                </ul>
                            </li>

                        </ul>
                    </div>

                </nav>
            </header>
        </div>
    )
}
