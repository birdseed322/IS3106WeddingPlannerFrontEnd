import React from "react";
import { useState, useEffect } from "react";
import {
  ref,
  uploadBytes,
  getDownloadURL,
  listAll,
  list,
} from "firebase/storage";
import { storage } from "./firebase";
import { v4 } from "uuid";

function TestingImageFunctions() {
  const [imageUpload, setImageUpload] = useState(null);
  const [imageUrls, setImageUrls] = useState([]);
  const folder = "testing";

  //place to obtain the image in
  const imagesListRef = ref(storage, "testing/");

  //function to upload file. adding a v4() creates a random string to prevent images having the same name during upload
  const uploadFile = () => {
    if (imageUpload == null) return;
    const imageRef = ref(storage, `${folder}/${imageUpload.name + v4()}`); // obtain the place to store the image in firebase
    uploadBytes(imageRef, imageUpload).then((snapshot) => {
      // upload image to firebase
      getDownloadURL(snapshot.ref).then((url) => {
        // getDownloadURL obtains the publically accessible URL on firebase
        setImageUrls((prev) => [...prev, url]); //appends the image to the imageURLs list to display image once you upload
      });
    });
  };

  // use effect hook to retrieve the images in a the imageListRef folder specific above
  useEffect(() => {
    listAll(imagesListRef).then((response) => {
      response.items.forEach((item) => {
        getDownloadURL(item).then((url) => {
          setImageUrls((prev) => [...prev, url]);
        });
      });
    });
  }, []);

  return (
    <div className="App">
      <input
        type="file"
        onChange={(event) => {
          setImageUpload(event.target.files[0]);
        }}
      />
      <button onClick={uploadFile}> Upload Image</button>
      {imageUrls.map((url) => {
        return <img src={url} />;
      })}
    </div>
  );
}

export default TestingImageFunctions;
