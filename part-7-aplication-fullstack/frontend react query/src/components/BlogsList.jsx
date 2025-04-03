import { getAllBlogs } from "../services/blogs";
import { useQuery } from "@tanstack/react-query";
import Blog from "./Blog";

const BlogsList = (user) => {
  const result = useQuery({
    queryKey: ["blogs"],
    queryFn: getAllBlogs,
    retry: 1,
  });

  if (result.isLoading) {
    return <>loading data....</>;
  }

  if (result.isError) {
    return <>blogs service not available due to problems in server</>;
  }

  const blogs = result.data;

  return (
    <>
      <div className="blogs">
        {blogs
          .sort((a, b) => b.likes - a.likes)
          .map((blog) => (
            <Blog key={blog.id} blog={blog} loggedUser={user} />
          ))}
      </div>
    </>
  );
};

export default BlogsList;
