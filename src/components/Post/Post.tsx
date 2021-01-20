// @flow
import { format } from 'date-fns';
import { motion } from 'framer-motion';
import './Post.scss';

type PostProps = {
  /** Title of the post */
  title: string,
  /** Date when the post was published */
  date?: string,
  /** Post tags */
  tags: Array<string>,
  /** Number of reactions given to this post */
  reactionsCount: number,
  /** Number of comments of the post */
  commentsCount: number,
  /** The post URL */
  url: string,
};

const variants = {
  show: {
    opacity: 1,
    scale: 1,
  },
  hidden: {
    opacity: 0,
    scale: 0.9,
  },
  hover: {
    scale: 1.02,
    transition: {
      duration: 0.1,
    },
  },
};

const Post = ({
  title,
  url,
  date,
  tags,
  reactionsCount,
  commentsCount,
}: PostProps) => (
  <motion.a
    className="post p-4"
    href={url}
    whileHover="hover"
    initial="hidden"
    animate="show"
    data-testid="post"
    target="_blank"
    variants={variants}
    rel="noopener noreferrer"
  >
    <div className="post-info">
      <small className="post-date" data-testid="post-date">
        {format(new Date(date), 'd MMM yyyy')}
      </small>
    </div>
    <h2 className="post-title mb-3 mt-4 " data-testid="post-title">
      {title}
    </h2>
    <div className="post-tags">
      {tags.map((tag) => (
        <small
          key={tag}
          className="post-tag mr-3  py-1 px-2"
          data-testid="post-tag"
        >
          {tag}
        </small>
      ))}
    </div>
    <div className="post-footer mt-4">
      <span
        className="post-reactions-count mr-5"
        data-testid="post-reactions-count"
      >
        {reactionsCount} Likes
      </span>
      <span className="post-comments-count" data-testid="post-comments-count">
        {commentsCount} Comments
      </span>
    </div>
  </motion.a>
);

Post.defaultProps = {
  date: Date.now(),
  tags: [],
};

export default Post;
