import { useParams } from "react-router-dom";
import { useEffect, useState} from "react";
import UserContext from "../context/UserContext";
import postServices from "../services/post.Service";

function Content() {
  const { id } = useParams(); // destructure id directly
  const [data, setData] = useState(null);

  async function fetchPost(postId) {
    try {
      const res = await postServices.getPostById(postId);
      if (res) {
        setData(res);
      } else {
        setData(null);
      }
    } catch (error) {
      console.log(`Error: ${error}`);
    }
  }

  useEffect(() => {
    if (id) fetchPost(id);
  }, [id]);

  if (!data) {
    return <div className="text-center mt-10">Loading...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto mt-10 px-4">
      {/* Title */}
      <h1 className="text-3xl font-bold text-center mb-6">{data.title}</h1>

      {/* Thumbnail */}
      {data.thumbnail_url && (
        <div className="flex justify-center mb-6">
          <img
            src={data.thumbnail_url}
            alt="Post Thumbnail"
            className="max-w-full rounded-lg shadow-lg"
          />
        </div>
      )}

      {/* HTML Content */}
      <div
        className="prose max-w-none"
        dangerouslySetInnerHTML={{ __html: data.content }}
      />
    </div>
  );
}

export default Content;
