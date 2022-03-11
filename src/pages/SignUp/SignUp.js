import { useState } from "react";
import { connect, useDispatch } from "react-redux";
import Loader from "../../components/Loader/Loader";
import { loadingToggleAction, signupAction } from "../../Store/actions/AuthActions";


function SingUp(props) {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    let errorsObj = { email: '', password: '' };
    const [errors, setErrors] = useState(errorsObj);
    function onSingUp(e) {
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

        dispatch(signupAction(email, password, props.history));


    }
    return (
        <>
            <div className="flex justify-center my-5">
                {props.dispalyShowLoading && <Loader />}
                <div className="w-1/3 shadow p-3 border border-gray-400">
                    <h1 className="text-2xl font-extrabold ">SingUp Page</h1>
                    {props.errorMessage && <div className="bg-red-300 text-red-700 p-1 my-3">{props.errorMessage}</div>}
                    {props.successMessage && <div className="bg-green-300 text-green-700 p-1 my-3">{props.successMessage}</div>}
                    <form onSubmit={onSingUp}>
                        <div>
                            <label>Email</label>
                            <div> <input type="text" value={email}
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
                            <button className="bg-green-600 text-white px-3 py-1">SingUp</button>
                        </div>
                    </form>
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
export default connect(mapStateToProps)(SingUp); 