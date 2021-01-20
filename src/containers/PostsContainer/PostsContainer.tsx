import { 
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
  const [posts, setPosts] = useState<Array<{ [key: string]: string }>>();
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
      className="posts-container grid"
    >
      <div className="title">
        <h1 className="mt-0 mb-2">DEV.TO</h1>
        <h1 className="mt-0 mb-4">POSTS</h1>
      </div>
      <Suspense
        fallback={(
          <div className="spinner-container">
            <Spinner />
          </div>
        )}
      >
        {posts?.map((post: { [key: string]: any }) => (
          <Post
            title={post.title}
            key={post.id}
            url={post.url}
            date={post.published_at}
            tags={post.tag_list}
            reactionsCount={post.public_reactions_count}
            commentsCount={post.comments_count}
          />
        ))}
      </Suspense>
    </motion.div>
  );
};

export default PostsContainer;
