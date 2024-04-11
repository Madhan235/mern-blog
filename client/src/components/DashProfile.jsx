 import {useSelector} from 'react-redux';
import {Alert, Button, TextInput} from 'flowbite-react';
import { useEffect, useRef, useState } from 'react';
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase.js'

import { CircularProgressbar } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';

export default function DashProfile() {
  
  const {currentUser} = useSelector(state => state.user);

  const [imageFile,setImageFile] = useState(null);

  const [imageFileUrl,setImageFileUrl] = useState(null);

const filePickerRef = useRef(null);

const [imageFileUploadProcess, setImageFileUploadProcess] = useState(null);

const [imageFileUploadError, setImageFileUploadError] = useState(null);

 

  const handleImageChange = async (e)=>{
    const file = e.target.files[0];
    if(file){

        if (file.size > 2 * 1024 * 1024) {
            setImageFileUploadProcess(null)
            setImageFileUploadError('File size should be less than 2MB.');
            return; 
          }
          setImageFileUploadError(null);
        setImageFile(e.target.files[0]);
        setImageFileUrl(URL.createObjectURL(file));
        
    }
      
  };
   

  useEffect(()=>{

        if(imageFile){
            uploadImage();
        }
     
  },[imageFile]);

  
 


const uploadImage = async () => {
    try {
        
      const storage = getStorage(app);
      const fileName = `${new Date().getTime()}_${imageFile.name}`;
      const storageRef = ref(storage, fileName);
      const uploadTask = uploadBytesResumable(storageRef, imageFile);

      uploadTask.on(
        'state_changed',
        (snapshot) => {
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          setImageFileUploadProcess(progress.toFixed(0));
        },
        (error) => {
          setImageFileUploadError(error.message);
          setImageFileUploadProcess(null);
          setImageFile(null)
          setImageFileUrl(null);
        },
        () => {
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setImageFileUrl(downloadURL);
          });
        }
      );
    } catch (error) {
      setImageFileUploadError(error.message);
    }
  };
  

    return (
    <div className='
    max-w-lg mx-auto p-3
    '>
        <h1 className='my-7 text-center font-semibold text-3xl'>Profile</h1>
        <form className='flex flex-col gap-4'>

            <input type='file' accept='image/*'
            onChange={handleImageChange}
            ref={filePickerRef}
            hidden
            />

            <div className='relative w-32 h-32 
            self-center
             cursor-pointer shadow-md overflow-hidden rounded-full'
             onClick={()=>filePickerRef.current.click()}
             >
{imageFileUploadProcess && (<CircularProgressbar 
value={imageFileUploadProcess || 0}
 text={`${imageFileUploadProcess} %`} 
strokeWidth={5}
styles={{
    root:{
        width:'100%',
        height:'100%',
        position:'absolute',
        top:0,
        left:0,
    
    },
    path:{
        stroke:`rgb(0,255,255,${imageFileUploadProcess / 100})`
    }, text: {
        fill: '#00FF00',  
        fontSize: '20px',  
      },
}}
/>
)}

            <img src={imageFileUrl || currentUser.profilePicture} alt="userPicture"
            className={`rounded-full h-full w-full object-cover border-8 border-[lightgray]
            ${imageFileUploadProcess && imageFileUploadProcess < 100 && 'opacity-60' }
            `} 
            />
            </div>
 
             {imageFileUploadError && <Alert color="failure">{imageFileUploadError}</Alert>}

             <TextInput type='text' id='username' placeholder='username'
             defaultValue={currentUser.username}
             />
            
            <TextInput type='email' id='email' placeholder='email'
             defaultValue={currentUser.email}
             />
             
             <TextInput type='password' id='password' placeholder='password'
             />
             <Button gradientDuoTone='purpleToBlue' outline>Update</Button>
        </form>
        <div className='text-red-500 hover:text-red-300  mt-5 flex justify-between'>
            <span className='cursor-pointer
            '>Delete Account</span>
            <span className='cursor-pointer' >Sign Out</span>
            
        </div>
    </div>
    
  )
}
