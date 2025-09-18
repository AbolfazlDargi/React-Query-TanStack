import { useEffect, useState } from "react";
import { fetchPosts } from "../../Api/api";

export const FetchOld = () => {
  const [posts, setPosts] = useState([]);
  const [isLoading, setIsLoading] = useState(true)
  const [isError, setIsError] = useState(false)

  const getPostsData = async () => {
    try {
      const res = await fetchPosts();
      console.log(res);
      if (res.status === 200){
        setPosts(res.data)
        setIsLoading(false)
      }else{
        setIsError(true)
      }
    } catch (error) {
      console.log(error);
      setIsError(true)
      setIsLoading(false)
      // return []
    }
  };

  useEffect(() => {
    getPostsData();
  }, []);


  if (isLoading) {
    return(
      <p>Loading....</p>
    )
  }
  if (isError){
    return(
      <p>something went wrong!</p>
    )
  }

  return (
    <div>
      <ul className="section-accordion">
        {posts?.map((curElem) => {
          return (
            <li key={curElem.id}>
              <p>{curElem.title}</p>
              <p>{curElem.body}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};
