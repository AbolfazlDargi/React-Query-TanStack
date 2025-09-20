import { fetchPosts } from "../../Api/api";
import { useQuery } from "@tanstack/react-query";
import { NavLink } from "react-router-dom";

export const FetchRQ = () => {
  // const [posts, setPost] = useState([]);

  // useEffect(() => {
  //   getPostsData();
  // }, []);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"], // useState
    queryFn: fetchPosts, // useEffect
    refetchInterval: 1000,
    refetchIntervalInBackground: true,
  });

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
            </li>
          );
        })}
      </ul>
    </div>
  );
};
