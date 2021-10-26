import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
// import MainView from '../MainView';
// import Analytics from '../../pages/Analytics';
// import { Link, Router } from "react-router-dom";

const Menu = ({ open }) => {
    return (
        <StyledMenu open={open}>
            <a href="/">
                <span role="img" aria-label="about us">&#128270;</span>
                Search
            </a>
            <a href="/analytics">
                <span role="img" aria-label="price">&#128073;</span>
                Analytics
            </a>
        </StyledMenu>
    )
}
Menu.propTypes = {
    open: bool.isRequired,
}
export default Menu;
