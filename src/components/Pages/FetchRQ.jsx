import { fetchPosts } from "../../Api/api";
import { useQuery } from "@tanstack/react-query";

export const FetchRQ = () => {
  // const [posts, setPost] = useState([]);



  // useEffect(() => {
  //   getPostsData();
  // }, []);

  const { data } = useQuery({
    queryKey: ["posts"], // useState
    queryFn: fetchPosts, // useEffect
  });

  return (
    <div>
      <ul className="section-accordion">
        {data?.map((curElem) => {
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
