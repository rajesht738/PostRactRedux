import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { loadingToggleAction, loginAction } from "../../Store/actions/AuthActions";

function Login(props){
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    function onLogin(e){
        e.preventDefault();
        let error = false;
        const errorObj = { ...errorsObj };
        if (email === '') {
            errorObj.email = 'Email is Required';
            error = true;
        }
        if (password === '') {
            errorObj.password = 'Password is Required';
            error = true;
        }
        setErrors(errorObj);
        if (error) return;
        dispatch(loadingToggleAction(true));

        dispatch(loginAction(email, password, props.history));
    }
    return(
        <>
            <div>
                
                <div className="flex justify-center my-5">
                {props.dispalyShowLoading && <Loader />}
                <div className="w-1/3 shadow p-3 border border-gray-400">
                    <h1 className="text-2xl font-extrabold ">Login Page</h1>
                    {props.errorMessage && <div className="bg-red-300 text-red-700 p-1 my-3">{props.errorMessage}</div>}
                    {props.successMessage && <div className="bg-green-300 text-green-700 p-1 my-3">{props.successMessage}</div>}
                    <form onSubmit={onLogin}>
                        <div>
                            <label>Email</label>
                            <div> <input type="email" value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="border border-gray-600 p-1 w-full" /></div>
                            {errors.email && <div>{errors.email}</div>}
                        </div>
                        <div>
                            <label>Password</label>
                            <div> <input type="password"
                                value={password} onChange={(e) => setPassword(e.target.value)}
                                className="border border-gray-600 p-1 w-full " /></div>
                            {errors.password && <div>{errors.password}</div>}
                        </div>

                        <div className="my-3">
                            <button className="bg-green-600 text-white px-3 py-1">Login</button>
                        </div>
                    </form>
                </div>
            </div>
            </div>
        </>
    )
}
const mapStateToProps = (state) => {
    return {
        errorMessage: state.authR.errorMessage,
        successMessage: state.authR.successMessage,
        dispalyShowLoading: state.authR.showLoading,
    };

};
export default connect(mapStateToProps)(Login);