import { deletePost, fetchPosts } from "../../Api/api";
import { keepPreviousData, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { NavLink } from "react-router-dom";

export const FetchRQ = () => {
  // const [posts, setPost] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);

 const queryClient =  useQueryClient()

  // useEffect(() => {
  //   getPostsData();
  // }, []);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts", pageNumber], // useState
    queryFn: () => fetchPosts(pageNumber), // useEffect
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
    placeholderData: keepPreviousData
  });

  const DeletMotion =  useMutation({
    mutationFn: (id) => deletePost(id),
    onSuccess: (data, id) => {
        queryClient.setQueryData(["posts"], pageNumber, (curElem) => {
            return curElem?.filter((postId) => postId !== id)
        })
    }
  })

  if (isPending) {
    return <p>Loading...</p>;
  }
  if (isError) {
    return <p> Error: {error.message || "Something went wrong!"}</p>;
  }

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
          const { id, title, body } = curElem;
          return (
            <li key={id}>
              <NavLink to={`/rq/${id}`}>
                <p>{id}</p>
                <p>{title}</p>
                <p>{body}</p>
              </NavLink>
              <button onClick={() => DeletMotion.mutate(id) }>Delete</button>
            </li>
          );
        })}
      </ul>

      <div className="pagination-section container">
        <button onClick={() => setPageNumber((prev) => prev - 1)}>prev</button>
        <h2>{pageNumber}</h2>
        <button onClick={() => setPageNumber((prev) => prev + 1)}>Next</button>
      </div>
    </div>
  );
};
