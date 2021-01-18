import { 
  Suspense, 
  useState, 
  lazy,
  useEffect, 
  useCallback 
} from 'react';
import { Spinner } from 'components/Spinner';
import { motion } from 'framer-motion';
import { Post } from 'components/Post';
import './PostsContainer.scss';

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
      return setPosts(data);
    } catch (error) {
      return error;
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
        <div
          className="col-6 info ml-5 mt-4 posts"
          variants={postsVariants}
        >
          <Suspense
            fallback={(
              <div className="spinner-container">
                <Spinner />
              </div>
            )}
          >
            {posts?.map((post) => (
              <Post
                title={post.title}
                key={post.id}
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
};

export default PostsContainer;
