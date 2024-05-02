import { useContext } from "react";
import { Link } from "react-router-dom";
import { LoginContext, LoginContextType, UserType } from "../../context/Context";

const Menu = () : JSX.Element => {
    //if user is logged in -> we want to render name 
    //if not logged in render -singin button

    //use condiditonal rendering
    //if user is logged in, renfer their name
    //if they are not lohhed in render 

    const contextPointer = useContext<LoginContextType>(LoginContext);

    const userDetail : UserType = contextPointer.user;

    return (
        <ul className="nav">
            <li><Link to="/find">Find a transaction</Link></li>
            <li><Link to="/add">New transaction</Link></li>
            {/* <li><Link to="/signin"> Sign In </Link> */}
            <li>
            {userDetail.id === 0 ? (<Link to="/signin"> Sign In </Link> ): (<p>{userDetail.name}</p>)}    
            {/* {userDetail.id !== null && <p>{userDetail.name}</p>}
            {userDetail.id === null && <p>no user</p>} */}
            </li>
            {/* </li> */}
        </ul>
    );
}

export default Menu;