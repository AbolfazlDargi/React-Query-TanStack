import { useEffect, useState } from "react";
import { fetchPosts } from "../../Api/api";

export const FetchRQ = () => {
  const [posts, setPost] = useState([]);

  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      console.log(res);
      res.status == 200 ? setPost(res.data) : [];
    } catch (error) {
      console.log(error);
      return [];
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);
  

  return (
    <div>
      <ul className="">
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
