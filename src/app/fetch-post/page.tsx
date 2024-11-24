 "use client"
 import {useState , useEffect} from "react"


export default function FetchPostPage() {
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/external")
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        if (data.success) {
          setPosts(data.data);
          setLoading(false);
        } else {
          setError(data.message);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.error(err);
        setError("An unexpected error");
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-gray-100 text-gray-700">
        Loading...
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-red-100 text-red-700">
        Error: {error}
      </div>
    );
  }
  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        Posts
      </h1>
      <ul className="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-4">
        {posts.map((post: { id: number; title: string }) => (
          <li
            key={post.id}
            className="border-b last:border-none py-2 px-4 hover:bg-gray-100 transition"
          >
            {post.title}
          </li>
        ))}
      </ul>
    </div>
  );
}
