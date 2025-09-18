import { fetchPosts } from "../../Api/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {
  // const [posts, setPost] = useState([]);



  // useEffect(() => {
  //   getPostsData();
  // }, []);

  const { data, isPending, isError, error } = useQuery({
    queryKey: ["posts"], // useState
    queryFn: fetchPosts, // useEffect
  });

  if (isPending) {
    return <p>Loading...</p>;
  }
  if(isError){
    <p> Error: {error.message || "Something went wrong!"}</p>
  }

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
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
