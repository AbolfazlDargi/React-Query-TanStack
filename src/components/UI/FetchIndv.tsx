import { useQuery } from "@tanstack/react-query"
import { fetchInvPost } from "../../Api/api"
import { useParams } from "react-router-dom"
import { NavLink } from "react-router-dom"

export const  FetchIndv = () => {

    const { id } = useParams()

    const {data, isPending, isError, error} = useQuery({
        queryKey: ["post", id],
        queryFn: () => fetchInvPost(id)
    })

    if(isPending){
        return(
            <p>Loading...</p>
        )
    }

    if(isError){
        return(
            <p>Error: {error.message || "Something went wrong!"} </p>
        )
    }

    return (
      <div className="section-accordion">
        <h1>Post ID Number - {data.id}</h1>
        <div>
          <ul>
            <li>ID: {data.id}</li>
            <li>Title: {data.title}</li>
            <li>Body: {data.body}</li>
          </ul>
        </div>
        <NavLink to={"/rq"}>
            <button>Go Back</button>
        </NavLink>
      </div>
    );
}