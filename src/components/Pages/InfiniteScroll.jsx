import { useInfiniteQuery } from "@tanstack/react-query";
import { fetchUser } from "../../Api/api";
import { useEffect } from "react";

export const InfiniteScroll = () => {
  const { data, hasNextPage, fetchNextPage, isFetchingNextPage } = useInfiniteQuery({
    queryKey: ["users"],
    queryFn: fetchUser,
    getPreviousPageParam: (lastPage, allPage) => {
      console.log(lastPage, allPage);
      return lastPage.length === 10 ? allPage.length + 1 : undefined;
    },
  });

  console.log(data);

   

const {ref , inView} = useInView({
    threshold: 1
})

  useEffect(() =>{
    if ( inView && hasNextPage){
        fetchNextPage()
    }
  }, [inView, hasNextPage, fetchNextPage])



  return (
    <div>
      <h1>Infinite Scroll with React Query v5 </h1>

      {data?.pages?.map((page, index) => (
        <ul key={index}>
          {page.map((user) => (
            <li
              key={user.id}
              style={{ padding: "10px", border: "1px solid #ccc" }}>
              <p>{user.login}</p>
              <img
                src={user.avatar_url}
                alt={user.login}
                width={50}
                height={50}
                style={{ borderRadius: "50%" }}
              />
            </li>
          ))}
        </ul>
      ))}
      <div ref={ref} style={{padding: "20px", textAlign: "center"}}>
        {isFetchingNextPage
          ? "Loading more..."
          : hasNextPage
          ? "Load More"
          : "Nothing more to load"}
      </div>
    </div>
  );
};
