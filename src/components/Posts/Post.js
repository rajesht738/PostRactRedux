import { Component } from "react";
import { connect } from "react-redux";
import { Route } from "react-router-dom";
import { Switch } from "react-router-dom";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import EditPost from "../../pages/EditPost/EditPost";
import SinglePost from "../../pages/SinglePost/SinglePost";
import { createPostAction, getPostsAction, deletePostAction } from "../../Store/actions/PostActions";

class Post extends Component {
    onCreatePost() {
        // this.props.createPost();
        this.props.createPostAction();
    }
    componentDidMount() {
        if (this.props.posts && !this.props.posts.length) {
            this.props.getPostsAction();
        }

    }
    onDeletePost(postId) {
        if (window.confirm('Are you sure you want to delete post?')) {
            // onclick call deletePostAction
         this.props.deletePostAction(postId, this.props.history);
        }
    }
    render() {
        const posts = [];
        for (let post of this.props.posts) {
            posts.push(
                <div key={post.id} className='mt-3 w-1/2'>
                    <div className="shadow border p-3 mx-3">
                        <div>{post.title}</div>
                        <div>{post.description}</div>
                        <div>
                            <Link to={{ pathname: `/posts/${post.id}` }} className="text-purple-500">View Details</Link>
                        </div>
                        <div>
                            <Link to={{ pathname: `/posts/edit/${post.id}` }} className="text-purple-500">Edit</Link>
                        </div>
                        <div>
                            <button className="text-red-700" onClick={() => this.onDeletePost(post.id)}>Delete</button>
                        </div>
                    </div>
                </div>
            );
        }
        return (
            <>
                <div className="mt-4">
                    <div className="flex items-center justify-between my-4">
                        <h2 className="bolder text-lg">Post</h2>
                        {/* <button className="bg-red-300 px-3 py-2" onClick={this.onCreatePost.bind(this)}>Create Post</button> */}
                        <Link to='/createpost' className="bg-red-300 px-3 py-2">Create Post</Link>
                        <hr />

                    </div>
                    <div className="flex">
                        <div className="flex-1">
                            <div className="flex flex-wrap">{posts} </div>
                        </div>
                        <div className="flex-1">
                            {this.props.posts.length && (
                                <div>
                                    <Switch>
                                        <Route path='/posts/:id' exact component={SinglePost} />
                                        <Route path='/posts/edit/:id' component={EditPost} />

                                    </Switch>

                                </div>
                            )

                            }

                        </div>
                    </div>
                </div>
            </>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        posts: state.postR.posts
    };
};

const mapDispatchToProps = (dispatch) => {
    // return {
    //     createPost: () => dispatch(createPostAction()),
    // };
    return bindActionCreators({ createPostAction, getPostsAction , deletePostAction}, dispatch)
};

export default connect(mapStateToProps, mapDispatchToProps)(Post);
