import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {useSelector } from 'react-redux';
 
import { FaXmark } from "react-icons/fa6"; 
import { TiTick } from "react-icons/ti";


export default function DashUsers() {

  const {currentUser} = useSelector(state => state.user);

  const [users, setUsers] = useState([]);

  const [showmore,setShowmore] = useState(true);

  const [showModal,setShowModal] = useState(false);
   
  const [deleteUserId, setDeleteUserId] = useState("");
   
   useEffect(()=>{
 const fetchPosts = async ()=>{
  try {
    const res = await fetch(`/api/user/getusers`);

    const data = await res.json();
    if(res.ok){

      setUsers(data.users);
      if(data.users.length < 9 ){
        setShowmore(false);
      }
    }

  } catch (error) {
    console.log(error.message);
  }

 };
 if(currentUser.isAdmin){
  fetchPosts();
 }

   },[currentUser._id]);

   const handleShowMore = async ()=>{
    const startIndex = users.length;
     
try {
  const res = await fetch(`/api/user/getusers?startIndex=${startIndex}`);

  const data = await res.json();

  if(res.ok){
    setUsers((prev)=> [...prev, ...data.users]);
    if(data.users.length < 9){
      setShowmore(false);
    }
  }

} catch (error) {
  console.log(error.message);
  
}
   };

   const handleDeleteUser = async ()=>{
    setShowModal(false);
    try {
      const res = await fetch(`/api/user/delete/${deleteUserId}`,{
        method: 'DELETE',
      })
const data = await res.json();

if(!res.ok){
  console.log(data.message);
} else {
  setUsers((prev)=>
prev.filter((user)=> user._id !== deleteUserId));
setShowModal(false);
}
    } catch (error) {
      console.log(error.message);
    }
   };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"> {currentUser.isAdmin && users.length > 0 
      ? 
      ( 
<>
<Table hoverable className="shadow-md">
  <Table.Head>
    <Table.HeadCell>
      Date Created
    </Table.HeadCell>
    <Table.HeadCell>
        User image
    </Table.HeadCell>
    <Table.HeadCell>
       Username
    </Table.HeadCell>
    <Table.HeadCell>
        Email
    </Table.HeadCell>
    <Table.HeadCell>
        Admin
    </Table.HeadCell>
    <Table.HeadCell>
      <span>
       Delete
      </span>
    </Table.HeadCell>
  </Table.Head>

  {users.map((user)=>(

    <Table.Body className="divide-y" key={user._id}>

      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

        <Table.Cell >
          { new Date(user.createdAt).toLocaleDateString()}
        </Table.Cell>

        <Table.Cell>
         
         <img src={user.profilePicture} alt={user.username} className="w-10 h-10 object-contain rounded-full overflow-hidden"/>
         
        </Table.Cell>

        <Table.Cell>
           {user.username}
        </Table.Cell>

        <Table.Cell>
            {user.email}
        </Table.Cell>

         <Table.Cell>
            {user.isAdmin ? <TiTick color="green" size={25}/> : <FaXmark color="black" size={20} />}
         </Table.Cell>

        <Table.Cell>
          <span
          onClick={()=>{
         setShowModal(true);
         setDeleteUserId(user._id)
          }}
          className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
        </Table.Cell>
        
         
      </Table.Row>

    </Table.Body>

  ))}
</Table>
{showmore && (<button className="w-full text-teal-400 self-center text-sm py-7 "
onClick={handleShowMore}
>Show more</button>)}


</>
      ) : (
      <p>No Users yet!</p>
    )}
 
<Modal show={showModal} onClose={()=>setShowModal(false)} 
      popup
      size={'md'}
      >
  <Modal.Header/>
<Modal.Body>
<div className="text-center">

  <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
  <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure want to delete this user</h3>
  <div className="flex justify-center gap-6">
    <Button color={'failure'} onClick={handleDeleteUser}>Yes, I'm sure</Button>
    <Button onClick={()=>setShowModal(false)}
    color={'success'}
    >No, cancel</Button>

    </div>
</div>
</Modal.Body>
      </Modal>

    </div>


  )
}
