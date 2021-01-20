import { render } from '@testing-library/react';
import Post from './Post';

describe('Post test section', () => {
  it('should receive an URL', () => {
    // prepare
    const { getByTestId } = render(
      <Post 
        title="Example post" 
        date="2020-07-27T16:17:42Z"
        tags={['tag1', 'tag2']}
        reactionsCount={13}
        commentsCount={2}
        url="https://dev.to/"
      />
    );
    // execute
    expect(getByTestId('post').getAttribute('href')).toBe('https://dev.to/');
  });
  it('should render the title.', () => {
    // prepare
    const { getByTestId } = render(
      <Post 
        title="Example post" 
        date="2020-07-27T16:17:42Z"
        tags={['tag1', 'tag2']}
        reactionsCount={13}
        commentsCount={2}
        url="https://dev.to/"
      />
    );
    // execute
    expect(getByTestId('post-title').textContent).toBe('Example post');
  });
  it('should render the date.', () => {
    // prepare
    const { getByTestId } = render(
      <Post 
        title="Example post" 
        date="2020-07-27T16:17:42Z"
        tags={['tag1', 'tag2']}
        reactionsCount={13}
        commentsCount={2}
        url="https://dev.to/"
      />
    );
    // execute
    expect(getByTestId('post-date').textContent).toBe('27 Jul 2020');
  });
  it('should render tags.', () => {
    // prepare
    const { getAllByTestId } = render(
      <Post 
        title="Example post" 
        date="2020-07-27T16:17:42Z"
        tags={['tag1', 'tag2', 'tag3']}
        reactionsCount={13}
        commentsCount={2}
        url="https://dev.to/"
      />
    );
    // execute
    expect(getAllByTestId('post-tag').length).toBe(3);
  });
  it('should render total count of reactions', () => {
    // prepare
    const { getByTestId } = render(
      <Post 
        title="Example post" 
        date="2020-07-27T16:17:42Z"
        tags={['tag1', 'tag2']}
        reactionsCount={13}
        commentsCount={2}
        url="https://dev.to/"
      />
    );
    // execute
    expect(getByTestId('post-reactions-count').textContent).toBe('13 Likes');
  });
  it('should render the total comments count ', () => {
    // prepare
    const { getByTestId } = render(
      <Post 
        title="Example post" 
        date="2020-07-27T16:17:42Z"
        tags={['tag1', 'tag2']}
        reactionsCount={13}
        commentsCount={2}
        url="https://dev.to/"
      />
    );
    // execute
    expect(getByTestId('post-comments-count').textContent).toBe('2 Comments');
  });
});
