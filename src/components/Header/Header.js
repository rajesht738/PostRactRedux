import { connect, useDispatch } from "react-redux";
import { withRouter } from "react-router-dom";
import { Link } from "react-router-dom";
import { logoutAction } from "../../Store/actions/AuthActions";
import { isAuthenticated } from "../../Store/selectors/AuthSelector";

function Header(props) {
const dispatch = useDispatch();
    function onLogout(e) {
        e.preventDefault();
        dispatch(logoutAction(props.history));
    }
    return (
        <>
            <div className="bg-red-400 text-white px-2 py-2 flex items-center">
                <h2 className="font-bold text-lg mr-4">React Router</h2>
                <div>
                    <Link to='/' className="px-2">Home</Link>
                   
                    {!props.isAuthenticated && <>
                        <Link to='/singup' className="px-2">SingUp</Link>
                    <Link to='/login' className="px-2">Login</Link>
                    </>}
                   {props.isAuthenticated && 
                   <>
                   <Link to='/posts' className="px-2">Posts</Link>
                   <button onClick={onLogout}>Logout</button>
                   </>}
                    
                </div>

            </div>

        </>
    )
}
const mapStateToProps = (state) => {
return {
    isAuthenticated: isAuthenticated(state)
}
}

export default withRouter(connect(mapStateToProps)(Header));