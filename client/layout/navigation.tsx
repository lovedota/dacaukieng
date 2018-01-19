import './styles/navigation.scss';

import * as React from 'react';
import { NavLink } from 'react-router-dom';
import BootstrapMenuLink from 'client/common/bootstrap-menu-link';
import Routes from 'client/routes';

export default () => {
    return (
        <header className="masthead text-center">
            <div className="inner">
                <h3 className="masthead-brand">Đá Cầu Kiểng</h3>
                <nav className="nav nav-masthead justify-content-center">
                {
                    Routes.map((route, index) => (
                        <NavLink
                            to={route.to}
                            key={index}
                            activeClassName="active"
                            exact={true}
                            className="nav-link"
                        >
                            {route.label}
                        </NavLink>
                    ))
                }
                </nav>
            </div>
        </header>
    );
};
