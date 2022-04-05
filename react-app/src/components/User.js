import './User.css'
import React, { useState, useEffect } from 'react';
import { NavLink, Redirect, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { postDelete, updateUsersPost } from '../store/post';
import EditPostForm from './OnePostPage/EditPostPage';
import { postImgLikes, deletingImgLike } from '../store/imglikes';

function User() {
  const dispatch = useDispatch()
  const [user, setUser] = useState({});
  const { userId } = useParams();
  const [clicked,setClicked] = useState('regular')
  const realUserId = useSelector(state=> state.session.user.id);

  const userPosts = useSelector(state => Object.values(state.posts).filter(post => {

    //+ is cheat way for parseInt
    return post.user_id === +userId;
  }))
  const allImgLikes = useSelector(state => Object.values(state.likes))

  console.log(allImgLikes);
  useEffect(() => {
    if (!userId) {
      return;
    }
    (async () => {
      const response = await fetch(`/api/users/${userId}`);
      const user = await response.json();
      setUser(user);
    })();
  }, [userId]);


  if (!user) {
    return null;
  }

  const handleClick = (e, postId) => {
    e.preventDefault();

    const userLike = allImgLikes.filter(like => (+realUserId === like?.user_id && +postId === like?.post_id));


    if (userLike.length) {

      setClicked('regular')
      dispatch(deletingImgLike(userLike[0].id))
    } else {
      setClicked('solid')
      dispatch(postImgLikes(realUserId, postId))
    }

  }
  console.log(clicked);

  return (
    <>
      <div className='prof-page-container'>
        <div className='prof-info-container'>
          <div>
            <img style={{ width: "150px", height: "150px", 'borderRadius': '100px' }} src={user.profile_pic}></img>
          </div>
          <div className='prof-username'><h3>{user.username}</h3></div>
          <div className='prof-name'><h4>{user.name}</h4></div>
          <div>
            <p>
              {user.profile_bio}
            </p>
          </div>
        </div>
        <div className='prof-posts-img'>POSTS</div>
        <div className='prof-posts-container'>
          {userPosts.map(post =>
            <div className='prof-post-container' key={post?.id}>
              <NavLink to={`/post/${post.id}`}><img src={post?.image_url} alt="pic" style={{ width: "293px", height: "293px" }} /></NavLink>
              <i onClick={(e) => handleClick(e, post.id)} className={`fa-${clicked} fa-heart`}></i>
              <p>{allImgLikes.filter(like => like?.post_id === post?.id).length}</p>
            </div>


          )}
        </div>
      </div>
    </>
  );
}
export default User;
