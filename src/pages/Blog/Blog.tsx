import { posts } from '../../shared/data/mockData';
import { BlogPostList } from './BlogPostList';

const Blog = () => {
  return (
    <div className="w-full lg:px-16 mt-12">
      <div className="text-center">
        <h1 className="mb-2 font-bold text-4xl">NextUI Latest Updates</h1>
        <h5 className="text-default-500 text-lg">All the latest news about NextUI.</h5>
      </div>
      <BlogPostList posts={posts} />
    </div>
  );
};

export default Blog;
