import React, { Suspense, useState, useEffect, useCallback } from 'react';
import { Spinner } from 'components/Spinner';
import { motion } from 'framer-motion';
import './PostsContainer.scss';

const PostRenderer = React.lazy(() => import('./PostRenderer'));

const postsVariants = {
  show: {
    transition: {
      staggerChildren: 0.7,
    },
  },
};

const PostsContainer = () => {
  const [posts, setPosts] = useState();
  const fetchPosts = useCallback(async (url) => {
    try {
      const data = await (await fetch(url)).json();
      setPosts(data);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchPosts('https://dev.to/api/articles?username=hnrq');
  }, [fetchPosts]);

  return (
    <motion.div
      animate={{ opacity: 1 }}
      initial={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="posts-container"
    >
      <div className="row mt-6 pt-4">
        <div className="col-6 title">
          <h1 className="mt-0 mb-2">DEV.TO</h1>
          <h1 className="mt-0 mb-2">POSTS</h1>
          <hr />
        </div>
        <motion.div
          className="col-6 info ml-5 mt-4 posts"
          variants={postsVariants}
        >
          <Suspense
            fallback={
              <div className="spinner-container">
                <Spinner />
              </div>
            }
          >
            <PostRenderer posts={posts} />
          </Suspense>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default PostsContainer;
