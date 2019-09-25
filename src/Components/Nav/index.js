import React from 'react';
import { Link } from "react-router-dom";
import { Nav, NavItem } from 'reactstrap';
import { FaHome, FaSignOutAlt, FaUsers } from 'react-icons/fa';
import { Separator } from '../../containers';
import './Nav.css';

const NavVerticalDark = (props) => (
    <Nav vertical className="nav-dark">
        {props.children}
    </Nav>
)

function DefaultNav() {
    return (
        <div>
            <NavVerticalDark>
                <NavItem>
                    <Link className="nav-link" to="/">
                        <FaHome />
                        Home
                    </Link>
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to="/sair">
                        <FaSignOutAlt />
                        Sair
                    </Link>
                </NavItem>
            </NavVerticalDark>
            <Separator>Opções</Separator>
            <NavVerticalDark>
                <NavItem>
                    <Link className="nav-link" to="/modulos">
                        <FaUsers />
                        Modulos
                    </Link>
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to="/pessoas">
                        <FaUsers />
                        Pessoas
                    </Link>
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to="/projetos">
                        <FaUsers />
                        Projetos
                    </Link>
                </NavItem>
                <NavItem>
                    <Link className="nav-link" to="/marcos">
                        <FaUsers />
                        Marcos
                    </Link>
                </NavItem>
            </NavVerticalDark>
        </div>
    );
}

export default DefaultNav;