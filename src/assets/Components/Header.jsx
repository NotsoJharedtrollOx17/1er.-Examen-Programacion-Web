import React from "react";
import PropTypes from 'prop-types';

class Header extends React.Component {

    render () {
        return (
            <div>
                <img src={this.props.logo}></img>
            </div>
        )
    }
}

Header.propTypes = {
    logo: PropTypes.string.isRequired,
}

export default Header;