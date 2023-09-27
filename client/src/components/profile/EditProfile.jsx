import "./editProfile.css";
import React, { useEffect, useState } from 'react';
import axios from "axios";
import CameraIcon from '../../icons/CameraIcon';
import { useDispatch, useSelector } from 'react-redux';
import {
    getStorage,
    ref,
    uploadBytesResumable,
    getDownloadURL,
  } from "firebase/storage";
  import app from "../../firebase";
import {updateUserFailure, updateUserStart, updateUserSuccess} from "../../redux/redux-slices/UserSlice";
import { makeRequest } from "../../axios";
import { toast, ToastContainer } from "react-toastify";

const EditProfile = ({ setIsOpen }) => {
    const user = useSelector((state) => state.user.currentUser);
    const [username, setUsername] = useState(user.username);
    const [email, setEmail ] = useState(user.email);
    const [ file, setFile ] = useState("");
    const [img, setImg] = useState(null);
    const [ birthday, setBirthday ] = useState(user.birthday);
    const dispatch = useDispatch();

    const ImageRendering = (prop) => {
        const UserImage = <img
                  src={prop.image }
                  width={190}
                  height={190}
                  className="editImg"
                />
    
        return prop.image ? UserImage : <CameraIcon />
      }
      const uploadFile = (file) => {
        const fileName = new Date().getTime() + file.name;
        const storage = getStorage(app);
        const storageRef = ref(storage, fileName);
        const uploadTask = uploadBytesResumable(storageRef, file);
    
        // Register three observers:
        // 1. 'state_changed' observer, called any time the state changes
        // 2. Error observer, called on failure
        // 3. Completion observer, called on successful completion
        uploadTask.on(
          "state_changed",
          (snapshot) => {
            const progress =
              (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            console.log("Upload is " + progress + "% done");
            switch (snapshot.state) {
              case "paused":
                console.log("Upload is paused");
                break;
              case "running":
                console.log("Upload is running");
                break;
              default:
            }
          },
          (error) => {
            // Handle unsuccessful uploads
          },
          () => {
            getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImg(downloadURL)
            //   const product = { ...inputs, img: downloadURL, categories: cat };
            //   addProduct(product, dispatch);
            });
          }
        );
      };

    useEffect(() => {
        file && uploadFile(file)
    }, [file])

    const handleClose = () => {
        setIsOpen(false)
    }
    const handleSubmit = async(e) => {
        e.preventDefault()
        const data = {
            img: img ? img : user.img,
            username,
            birthday,
            email,
            _id: user._id
        }
        dispatch(updateUserStart())
        try {
            const res = await makeRequest.put(`users/${user._id}`, data);
            dispatch(updateUserSuccess(res.data));
            toast.success("Successfully updated!");
            setIsOpen(false);
        }catch(err) {
            dispatch(updateUserFailure());
            toast.error(err.response.data)
            console.log(err);
        }
    }

  return (
    <div className='editContainer'>
        <div className="editClose" onClick={handleClose}>X</div>
      <form action="" className="editForm" onSubmit={handleSubmit}>
      <div className='editImgIcon'>
        <label
          htmlFor="image"
          className="editLabel"
        >
          {file ? (
            <img
              width={100}
              height={100}
              src={URL.createObjectURL(file)}
              className="editImg"
            />
          ) : (
            <ImageRendering image={user.img} />
          )}
        </label>
        <input
          type="file"
          name="image"
          id="image"
          hidden
          onChange={(e) => setFile(e.target.files[0])}
        />
      </div>
      <div className="editDiv">
        <label htmlFor="username">User Name</label>
        <input
          type="text"
          // userName="userName"
          id="username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="editInput"
        />
      </div>
      <div className="editDiv">
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="editInput"
        />
      </div>
      <div className="editDiv">
        <label htmlFor="birthday">Birthday</label>
        <input
          type="date"
          id="birthday"
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
          className="editInput"
        />
      </div>
      <button className='editButton'>Edit</button>
      </form>
      <ToastContainer />
    </div>
  );
}

export default EditProfile;
