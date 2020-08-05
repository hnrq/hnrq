// @flow
import React from 'react';
import { format } from 'date-fns';
import './Post.scss';

type Props = {
  /** Title of the post */
  title: string,
  /** Author of the post */
  author: string,
  /** Date when the post was published */
  date?: Date,
  /** Post tags */
  tags: Array<string>,
  /** Number of reactions given to this post */
  reactionsCount: number,
  /** Number of comments of the post */
  commentsCount: number,
  /** The post URL */
  url: string
}

const Post = ({
  title,
  url,
  author,
  date,
  tags,
  reactionsCount,
  commentsCount
}: Props) => (
  <a 
    className="post m-4 p-4" 
    href={url}
    data-testid="post"
    target="_blank"
    rel="noopener noreferrer"
  >
    <div className="post-info">
      <b className="post-author" data-testid="post-author"><small>{author}</small></b>
      <small className="post-date" data-testid="post-date">{format(new Date(date), 'd MMM yyyy')}</small>
    </div>
    <h2 className="post-title mb-3 mt-4 " data-testid="post-title">{title}</h2>
    <div className="post-tags">
      {tags.map((tag) => <small key={tag} className="post-tag mr-3  py-1 px-2" data-testid="post-tag">{tag}</small>)}
    </div>
    <div className="post-footer mt-4">
      <span className="post-reactions-count mr-5" data-testid="post-reactions-count">{reactionsCount} Likes</span>
      <span className="post-comments-count" data-testid="post-comments-count">{commentsCount} Comments</span>
    </div>
  </a>
);

Post.defaultProps = {
  date: Date.now(),
  tags: []
}

export default Post;