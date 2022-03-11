import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { updatePostAction } from "../../Store/actions/PostActions";
import { getPost } from "../../Store/selectors/PostSelectors";


function EditPost(props) {
    const [post, setPost] = useState(props.post);
    const dispatch = useDispatch();

    useEffect(() => {
        setPost((props.post));
    }, [props.post]);

    function onUpdate(e) {
        e.preventDefault();
        dispatch(updatePostAction(post, props.history))

    }
    return (
        <>
            <div>Edit Post</div>
            <div>
                <form onSubmit={onUpdate}>
                    <div className="my-2">
                        <label>Title</label>
                        <div><input type="text" value={post.title}
                            onChange={(e) => setPost({
                                ...post,
                                title: e.target.value
                            })} className="border border-gray-300 w-full " /></div>
                    </div>
                    <div className="my-2">
                        <label>Description</label>
                        <div>
                            <textarea className="border border-gray-300 w-full p-1" value={post.description}
                                onChange={(e) => setPost({
                                    ...post,
                                    description: e.target.value
                                })}></textarea>
                        </div>

                    </div>
                    <div>
                        <button className="bg-red-500 px-1 py-1">Edit Post</button>
                    </div>
                </form>
            </div>
        </>
    )
}
const makeStateToProps = () => {
    const post = getPost();
    return (state, props) => {
        return {
            post: post(state, props.match.params.id),
        };
    };

};

export default connect(makeStateToProps)(EditPost);