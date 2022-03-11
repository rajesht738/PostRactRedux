import { useEffect, useState } from "react"
import { decrement, increment } from "../../Store/actions/CounterActions";
import { Store } from "../../Store/Store";

export function CounterFunction(props) {

    const [counter, setCounter] = useState(0);

    useEffect(() => {
        CounterUpdate();
        Store.subscribe(CounterUpdate);
    },[]);
    
    function CounterUpdate() {
        const state = Store.getState();
        setCounter(state.counter);

    }
    function onIncrement(){
        Store.dispatch(increment());
    }
    function onDecrement(){
        Store.dispatch(decrement());
    }
    return (
        <>
            <h2>Function Counter</h2>
            <div>{counter}</div>
            <div>
                <button onClick={onIncrement}>Increment</button>
                <button onClick={onDecrement}>Decrement</button>
            </div>
        </>
    )
}