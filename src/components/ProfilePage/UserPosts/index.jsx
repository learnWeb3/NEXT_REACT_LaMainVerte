import React, { useEffect, useState } from "react";
import PostCard from '../../../components/PostCard';
import {findUserDatas} from "../../../requests/user";
import { useSelector } from "react-redux";

const UserPosts = ({user}) => {
    const [posts, setPosts] = useState([]);
    const [current_user, setCurrentUser] = useState(useSelector(state=>state.current_user));

    useEffect(() => {

        const fetchPageDatas = async () => {
    
          const fetchUser = await findUserDatas(user.id);
          setPosts(fetchUser.posts);
        };
    
        fetchPageDatas();
      }, [])
    
    return (
        <section id="user-posts" className="flex flex-col">
            <div className="radius bg-light-brown shadow-neomorph p-4 my-5">
            {   current_user && current_user.id == user.id?
                    <h1>Mes derniers posts</h1>
                :
                    <h1>Derniers posts de {user.username}</h1>
            }
            </div>

            <div className={posts?.length > 3? "posts overflow-y-scroll" : "posts"}>
            { posts?.map((post) => (
                <PostCard
                id = {post.id}
                title = {post.title}
                content = {post.content}
                garden_id = {post.garden_id}
                created_at = {post.created_at}
                updated_at = {post.updated_at}
                likes = {post.likes}
                />
            ))

            }
            </div>
        </section>
    )
}

export default UserPosts;