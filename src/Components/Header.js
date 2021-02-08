import PropTypes from 'prop-types'
import { useLocation } from "react-router-dom";
import Button from "./Button";
const Header = ({ showAdd, onAdd, title }) => {
    const location = useLocation();//this for the button to disappear if it is on the about page 
    // const onClick = () => {
    //     console.log("clicked");
    // }

    return (
        <header className="header">
            <h1>{title}</h1>
            {/* Only make the button visible when its on the main index page */}
            {location.pathname === '/' && <Button color={showAdd ? 'red' : 'green'} text={showAdd ? 'Close' : 'Add'} onClick={onAdd} />}
            {/* <Button color="red" text="hello"/>
            <Button color="blue" text="hi"/> */}
        </header>
    )
}

// Css in jsx

// const headerStyle={
//     color:'red',
//     backgroundColor:'black'
// }

//if props is missing it will give this as default
Header.defaultProps = {
    title: 'Task Tracker'
}

//To make your code robust and catch errors, basically it is telling that the prop title should be only of string type
// Header.propTypes = {
//     title: PropTypes.string,
// }

export default Header
