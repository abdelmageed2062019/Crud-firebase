import { useState, useEffect } from "react";
import "./crud.css";
import { db, storage } from "./firebase";
import {
  collection,
  addDoc,
  doc,
  updateDoc,
  deleteDoc,
  getDocs,
} from "firebase/firestore";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  deleteObject,
} from "firebase/storage";
import Loading from "./loading";
import DataDisplay from "./items";

const Crud = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [number, setNumber] = useState("");
  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const querySnapshot = await getDocs(collection(db, "CRUD"));
      const fetchedData = [];
      querySnapshot.forEach((doc) => {
        fetchedData.push({ id: doc.id, ...doc.data() });
      });
      setData(fetchedData);
    };
    fetchData();
  }, []);

  const addData = async (e) => {
    e.preventDefault();
    setLoading(true);

    if (!name || !email || !number || (!image && !editingItem)) {
      alert("Please fill out all fields and select an image.");
      setLoading(false);
      return;
    }

    try {
      let imageURL = "";
      if (image) {
        const imageRef = ref(storage, `images/${image.name}`);
        await uploadBytes(imageRef, image);
        imageURL = await getDownloadURL(imageRef);
      } else if (editingItem) {
        imageURL = editingItem.imageURL; // keep the existing image URL if not changing the image
      }

      if (editingItem) {
        const itemDoc = doc(db, "CRUD", editingItem.id);
        await updateDoc(itemDoc, { name, email, number, imageURL });
        setData((prevData) =>
          prevData.map((item) =>
            item.id === editingItem.id
              ? { id: editingItem.id, name, email, number, imageURL }
              : item
          )
        );
        setEditingItem(null);
      } else {
        const docRef = await addDoc(collection(db, "CRUD"), {
          name,
          email,
          number,
          imageURL,
        });
        setData([...data, { id: docRef.id, name, email, number, imageURL }]);
      }

      setName("");
      setEmail("");
      setNumber("");
      setImage(null);
      document.getElementById("fileInput").value = "";

      alert("Data saved successfully");
    } catch (error) {
      console.error("Error saving data: ", error);
      alert("Failed to save data");
    } finally {
      setLoading(false);
    }
  };

  const handleEditClick = (item) => {
    setEditingItem(item);
    setName(item.name);
    setEmail(item.email);
    setNumber(item.number);
    setImage(null); // Reset image input
  };

  const deleteItem = async (item) => {
    if (window.confirm("Are you sure you want to delete this item?")) {
      setLoading(true);
      try {
        const itemDoc = doc(db, "CRUD", item.id);
        await deleteDoc(itemDoc);

        if (item.imageURL) {
          const imageRef = ref(storage, item.imageURL);
          await deleteObject(imageRef);
        }

        setData(data.filter((i) => i.id !== item.id));
        alert("Item deleted successfully");
      } catch (error) {
        console.error("Error deleting item: ", error);
        alert("Failed to delete item");
      } finally {
        setLoading(false);
      }
    }
  };

  return (
    <div className="crud">
      <div className="container">
        <div className="crud-form">
          <h2>{editingItem ? "Edit" : "Add"} Form</h2>
          <form className="box" onSubmit={addData}>
            <input
              type="text"
              placeholder="Enter name..."
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
            <input
              type="email"
              placeholder="Enter email..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <input
              type="text"
              placeholder="Enter number..."
              value={number}
              onChange={(e) => setNumber(e.target.value)}
              required
            />
            <input
              type="file"
              id="fileInput"
              onChange={(e) => setImage(e.target.files[0])}
              required={!editingItem}
            />
            <button type="submit">{loading ? <Loading /> : "Submit"} </button>
          </form>
        </div>
      </div>

      <div className="items">
        <DataDisplay
          data={data}
          onEditClick={handleEditClick}
          onDeleteClick={deleteItem}
        />
      </div>
    </div>
  );
};

export default Crud;
