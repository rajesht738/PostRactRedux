import { connect } from "react-redux";
import { getPost } from "../../Store/selectors/PostSelectors";

function SinglePost(props){
    return (
        <>
        <div>Single Post Page</div>
        <div>Id: {props.post.id}</div>
        <div>Title: {props.post.title}</div>
        <div>Description: {props.post.description}</div>
        </>
    )
}
const makeStateToProps = () => {
    const post = getPost();
    return (state, props) => {
        return {
            post: post(state, props.match.params.id),
        };
    }
}
export default connect(makeStateToProps)(SinglePost);