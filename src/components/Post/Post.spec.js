import React from 'react';
import { render } from '@testing-library/react';
import Post from './Post';

describe('Post test section', () => {
  it('should receive an URL' , () => {
    // prepare
    const { getByTestId } = render(<Post title="Example post" url="http://t.me/"/>);
    // execute
    expect(getByTestId('post').getAttribute('href')).toBe('http://t.me/');
  })
  it('should render the title.', () => {
    // prepare
    const { getByTestId } = render(<Post title="Example post"/>);
    // execute
    expect(getByTestId('post-title').textContent).toBe('Example post');
  });
  it('should render the author.', () => {
    // prepare
    const { getByTestId } = render(<Post author="John Doe"/>);
    // execute
    expect(getByTestId('post-author').textContent).toBe('John Doe');
  });
  it('should render the date.', () => {
    // prepare
    const { getByTestId } = render(<Post date="2020-07-27T16:17:42Z" />);
    // execute
    expect(getByTestId('post-date').textContent).toBe('27 Jul 2020')
  });
  it('should render the tags.', () => {
    // prepare
    const { getAllByTestId } = render(<Post tags={['tag1', 'tag2', 'tag3']} />);
    // execute
    expect(getAllByTestId('post-tag').length).toBe(3);
  });
  it('should render total count of reactions', () => {
    // prepare
    const { getByTestId } = render(<Post reactionsCount={13} />);
    // execute
    expect(getByTestId('post-reactions-count').textContent).toBe('13 Likes');
  });
  it('should render the total comments count ', () => {
    // prepare
    const { getByTestId } = render(<Post commentsCount={2} />);
    // execute
    expect(getByTestId('post-comments-count').textContent).toBe('2 Comments');
  });
});