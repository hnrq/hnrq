import React, { 
  Suspense, 
  useState, 
  useEffect, 
  useCallback 
} from 'react';
import { Spinner } from 'components/Spinner';
import { motion } from 'framer-motion';
import { Post } from 'components/Post';
import './PostsContainer.scss';

const PostsContainer = () => {
  const [posts, setPosts] = useState([]);
  const fetchPosts = useCallback(async (url) => {
    try {
      const data = await (await fetch(url)).json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchPosts('https://dev.to/api/articles?username=olawanle_joel');
  }, [fetchPosts]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="posts-container">
      <div className="row mt-6">
        <div className="col-6 title">
          <h1 className="mt-0 mb-2">POSTS</h1>
          <h1 className="mt-0 mb-2">DEV.TO</h1>
          <hr />
        </div>
        <div className="col-6 info pl-5 mt-4 posts">
          <Suspense fallback={
          <div className="spinner-container"><Spinner /></div>}>
            {posts.map((post) => (
              <Post 
                title={post.title}
                url={post.url}
                author={post.user.name}
                date={post.published_at}
                tags={post.tag_list}
                reactionsCount={post.public_reactions_count}
                commentsCount={post.comments_count}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </motion.div>
  );
}

export default PostsContainer;