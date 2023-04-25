import React from "react";
import PropTypes from 'prop-types';

class Banner extends React.Component {

    render () {
        return (
            <div>
                <h3>{this.props.texto_banner}</h3>
            </div>
        )
    }
}

Banner.propTypes = {
    texto_banner: PropTypes.string.isRequired
}

export default Banner;