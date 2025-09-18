import { useEffect, useState } from "react";
import { fetchPosts } from "../../Api/api";

export const FetchOld = () => {
  const [posts, setPosts] = useState([]);

  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      console.log(res);
      res.status == 200 ? setPosts(res.data) : [];
    } catch (error) {
      console.log(error);
      return []
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);

  return (
    <div>
      <ul
        className="z">
        {posts?.map((curElem) => {
          return (
            <li>
              <p>{curElem.title}</p>
              <p>{curElem.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
