import { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import UserContext from "../context/UserContext";
import postServices from "../services/post.Service";
import postImageServices from "../services/postImage.Service";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Image from "@tiptap/extension-image";

import "react-toastify/dist/ReactToastify.css";

function Write() {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const [title, setTitle] = useState("");
  const [thumbnail, setThumbnail] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);

  const editor = useEditor({
    extensions: [StarterKit, Underline, Image],
    content: "",
  });

  useEffect(() => {
    if (!user) navigate("/login");

    setCategories([
      { id: 1, name: "Programming" },
      { id: 2, name: "Technology" },
      { id: 3, name: "Lifestyle" },
    ]);

    return () => editor?.destroy();
  }, [user, navigate]);

  const toggleFormat = (format) => {
    if (!editor) return;
    editor.chain().focus()[`toggle${format}`]().run();
  };

  const isActive = (format) => editor?.isActive(format.toLowerCase());

  const handleThumbnailChange = (e) => {
    const file = e.target.files[0];
    setThumbnail(file);
    setPreviewUrl(URL.createObjectURL(file));
  };

  const handleImageInsert = async () => {
    const fileInput = document.createElement("input");
    fileInput.type = "file";
    fileInput.accept = "image/*";

    fileInput.onchange = async () => {
      const file = fileInput.files[0];
      const caption = prompt("Enter image caption:");
      if (!file || !caption) return;

      const formData = new FormData();
      formData.append("content", file);       // <--- image file here as 'content'
      formData.append("caption", caption);
      formData.append("post_id", "temp");     // dummy post_id

      try {
        toast.info("Uploading image...");
        const res = await postImageServices.createImage(formData);

        if (res?.image_url) {
          editor.chain().focus().setImage({ src: res.image_url, alt: caption }).run();
          toast.success("Image inserted!");
        } else {
          toast.error("Image upload failed.");
        }
      } catch (err) {
        console.error(err);
        toast.error("Error uploading image.");
      }
    };

    fileInput.click();
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!title || !category || !thumbnail || !editor?.getHTML()) {
      toast.warn("Please fill in all fields.");
      return;
    }

    const formData = new FormData();
    formData.append("userId", user.id);
    formData.append("title", title);
    formData.append("categoryId", category);
    formData.append("content", editor.getHTML());
    formData.append("thumbnail", thumbnail);
    formData.append("status", "published"); // adjust if needed

    try {
      const post = await postServices.createPost(formData);
      if (post?.id) {
        toast.success("Post created successfully!");
        navigate(`/profile/${user.id}/content`);
      } else {
        
      }
    } catch (err) {
      console.error(err);
      
    }
  };

  return (
    <>
      <style>{`
        .editor-content strong { font-weight: bold; color: black; }
        .editor-content em { font-style: italic; color: #444; }
        .editor-content u { text-decoration: underline; color: black; }
        .editor-content code {
          background: #f5f5f5;
          padding: 2px 5px;
          border-radius: 4px;
          color: #e63946;
        }
        .editor-content img {
          max-width: 100%;
          height: auto;
          margin-top: 10px;
          border-radius: 6px;
        }
        .toolbar-button {
          padding: 6px 12px;
          margin-right: 6px;
          border: 1px solid #ccc;
          background: white;
          border-radius: 6px;
          cursor: pointer;
          font-weight: 500;
        }
        .toolbar-button.active {
          background: #000;
          color: white;
        }
      `}</style>

      <div className="max-w-3xl mx-auto mt-10 bg-white p-6 shadow rounded-xl">
        <h2 className="text-2xl font-semibold mb-6">Create a New Post</h2>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="font-semibold block mb-1">Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Post title"
              className="w-full border p-2 rounded"
            />
          </div>

          <div>
            <label className="font-semibold block mb-1">Category</label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full border p-2 rounded"
            >
              <option value="">Select category</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div>
            <label className="font-semibold block mb-1">Thumbnail</label>
            <input
              type="file"
              accept="image/*"
              onChange={handleThumbnailChange}
              className="w-full p-2 border rounded"
            />
            {previewUrl && (
              <img
                src={previewUrl}
                alt="Thumbnail preview"
                className="mt-2 h-48 w-full object-cover rounded"
              />
            )}
          </div>

          <div>
            <label className="font-semibold block mb-1">Content</label>
            <div className="mb-3 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => toggleFormat("Bold")}
                className={`toolbar-button ${isActive("bold") ? "active" : ""}`}
              >
                B
              </button>
              <button
                type="button"
                onClick={() => toggleFormat("Italic")}
                className={`toolbar-button ${isActive("italic") ? "active" : ""}`}
              >
                I
              </button>
              <button
                type="button"
                onClick={() => toggleFormat("Underline")}
                className={`toolbar-button ${isActive("underline") ? "active" : ""}`}
              >
                U
              </button>
              <button
                type="button"
                onClick={() => toggleFormat("Code")}
                className={`toolbar-button ${isActive("code") ? "active" : ""}`}
              >
                &lt;/&gt;
              </button>
              <button
                type="button"
                onClick={() => toggleFormat("BulletList")}
                className={`toolbar-button ${isActive("bulletList") ? "active" : ""}`}
              >
                • List
              </button>
              <button
                type="button"
                onClick={() => toggleFormat("OrderedList")}
                className={`toolbar-button ${isActive("orderedList") ? "active" : ""}`}
              >
                1. List
              </button>
              <button
                type="button"
                onClick={handleImageInsert}
                className="toolbar-button"
              >
                📷 Insert Image
              </button>
            </div>
            <div className="editor-content border p-2 rounded min-h-[200px]">
              <EditorContent editor={editor} />
            </div>
          </div>

          <button
            type="submit"
            className="bg-black text-white px-5 py-2 rounded hover:bg-gray-800"
          >
            Publish
          </button>
        </form>
      </div>
    </>
  );
}

export default Write;
