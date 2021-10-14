import React from 'react';
import { bool } from 'prop-types';
import { StyledMenu } from './Menu.styled';
// import { Link, Router } from "react-router-dom";

const Menu = ({ open }) => {
    return (
        <StyledMenu open={open}>
            <a href="/">
                <span role="img" aria-label="about us">&#128270;</span>
                Search
            </a>
            <a href="/searchbyyear">
                <span role="img" aria-label="price">&#128073;</span>
                Search By Year
            </a>
            <a href="/">
                <span role="img" aria-label="contact">&#128073;</span>
                Search By Plate ID
            </a>
            <a href="/">
                <span role="img" aria-label="contact">&#128073;</span>
                Search By State
            </a>
            <a href="/">
                <span role="img" aria-label="contact">&#128073;</span>
                Search By Date
            </a>
            <a href="/">
                <span role="img" aria-label="contact">&#128073;</span>
                Search By Time
            </a>
            <a href="/">
                <span role="img" aria-label="contact">&#128073;</span>
                Search By Street Name
            </a>
            <a href="/">
                <span role="img" aria-label="contact">&#128073;</span>
                Search By Violation Code
            </a>
        </StyledMenu>
    )
}
Menu.propTypes = {
    open: bool.isRequired,
}
export default Menu;
