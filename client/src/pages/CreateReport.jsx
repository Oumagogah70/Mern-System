import ReactQuill from "react-quill";
import { Alert, Button, FileInput, Select, TextInput } from "flowbite-react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function CreateReport() {
  const currentUser = useSelector((state) => state.user.currentUser);
  const [file, setFile] = useState(null);
  const [users, setUsers] = useState([]);
  const [formData, setFormData] = useState({
    sentTo: "",
    sentBy: currentUser?.username || "",
    title: "",
    content: "",
  });
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await fetch(`/api/perdm/getusersperdm`);
        const data = await res.json();
        setUsers(data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => {
      const newData = {
        ...prevState,
        [name]: value,
      };
      console.log("New form data", newData);
      return newData;
    });
  };
  const handleQuillChange = (content) => {
    setFormData((prevState) => ({
      ...prevState,
      content: content,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/report/createreport", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      if (res.ok) {
        alert("Report sent successfull");
        setFormData({
          sentTo: "",
          sentBy: currentUser?.username || "",
          title: "",
          content: "",
        });

        navigate('/dashboard?tab=reports')
      }
    } catch (error) {
      console.error({ message: "something went wrong" });
    }
  };
  return (
    <div className="p-3 max-w-3xl mx-auto min-h-screen">
      <h1 className="text-center text-3xl my-7 font-semibold">Reports</h1>
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <div className="flex flex-col gap-4 sm:flex-row justify-around">
          <TextInput
            type="text"
            placeholder="Title"
            required
            name="title"
            className="flex-1"
            onChange={handleChange}
          />
          <Select
            name="sentTo"
            value={formData.sentTo || ""}
            onChange={handleChange}
          >
            {users.map((user) => (
              <option key={user._id} value={user.name}>
                {user.username}
              </option>
            ))}
          </Select>
        </div>
        
        <ReactQuill
          theme="snow"
          placeholder="Write something..."
          className="h-72 mb-12"
          value={formData.content}
          required
          onChange={handleQuillChange}
        />

        <Button type="submit" gradientDuoTone="purpleToPink">
          Submit
        </Button>
        {/* {publishError && (
        <Alert className='mt-5' color='failure'>
          {publishError}
        </Alert>
      )} */}
      </form>
    </div>
  );
}
