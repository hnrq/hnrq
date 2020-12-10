import { FC } from 'react';
import { Post } from 'components/Post';

interface PostRendererProps {
  posts: Array<{[key: string]: string}>
}

const PostRenderer: FC<PostRendererProps> = ({ posts }) => (
  <>
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
  </>
);

export default PostRenderer;
