import { Component } from "react";
import { decrement, increment } from "../../Store/actions/CounterActions";
import { Store } from "../../Store/Store";
export default class Counter extends Component {

    constructor(props) {
        super(props);
        this.state = { counter: 0 }
    }
    componentDidMount() {
        this.counterUpdate();
        Store.subscribe(this.counterUpdate.bind(this));
    }
    counterUpdate(){
        const state = Store.getState();
        this.setState({
            counter: state.counter
        })
       // console.log(state);
    }
    onIncrement(){
       // debugger;
        Store.dispatch(increment());
        
    }
    onDecrement(){
        Store.dispatch(decrement());
    }

    render() {
        return (
            <>
                <h2>Counter Component</h2>
                <div>{this.state.counter}</div>
                <div>
                    <button onClick={this.onIncrement}>Increment</button>
                    <button onClick={this.onDecrement}>Decrement</button>
                </div>
            </>
        )
    }
}