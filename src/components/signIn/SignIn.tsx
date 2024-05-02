import { useContext } from "react"
import { LoginContext, LoginContextType } from "../../context/Context"

const SignIn = () : JSX.Element=>{
const contextPointer = useContext<LoginContextType>(LoginContext)

const handleLogin = () : void => {
    contextPointer.login({id:1, name: "Matt T", role: "admin"})
};

    return (
        <>
        <p>This is where the login form would</p>
        <button onClick={handleLogin}> Log In </button>
        </>
    )
}

export default SignIn;