import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {useSelector } from 'react-redux';
import { Link } from "react-router-dom";
 

export default function DashPosts() {

  const {currentUser} = useSelector(state => state.user);

  const [userPosts, setUserPosts] = useState([]);

  const [showmore,setShowmore] = useState(true);

  const [showModal,setShowModal] = useState(false);
   
  const [deletePostId, setDeletePostId] = useState("");
   
   useEffect(()=>{
 const fetchPosts = async ()=>{
  try {
    const res = await fetch(`/api/post/getposts?userId=${currentUser._id}`);

    const data = await res.json();
    if(res.ok){

      setUserPosts(data.posts);
      if(data.posts.length < 9 ){
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
    const startIndex = userPosts.length;
     
try {
  const res = await fetch(`/api/post/getposts?userId=${currentUser._id}&startIndex=${startIndex}`);

  const data = await res.json();

  if(res.ok){
    setUserPosts((prev)=> [...prev, ...data.posts]);
    if(data.posts.length < 9){
      setShowmore(false);
    }
  }

} catch (error) {
  console.log(error.message);
  
}
   };

   const handleDeletePost = async ()=>{
    setShowModal(false);
    try {
      const res = await fetch(`/api/post/delete/${deletePostId}/${currentUser._id}`,{
        method: 'DELETE',
      })
const data = await res.json();

if(!res.ok){
  console.log(data.message);
} else {
  setUserPosts((prev)=>
prev.filter((post)=> post._id !== deletePostId));
}
    } catch (error) {
      console.log(error.message);
    }
   };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"> {currentUser.isAdmin && userPosts.length > 0 
      ? 
      ( 
<>
<Table hoverable className="shadow-md">
  <Table.Head>
    <Table.HeadCell>
      Date Updated
    </Table.HeadCell>
    <Table.HeadCell>
       Post image
    </Table.HeadCell>
    <Table.HeadCell>
       Post title
    </Table.HeadCell>
    <Table.HeadCell>
       Category
    </Table.HeadCell>
    <Table.HeadCell>
      <span>
       Delete
      </span>
    </Table.HeadCell>
    <Table.HeadCell>
      <span>
      Edit
      </span>
    </Table.HeadCell>
  </Table.Head>
  {userPosts.map((post)=>(

    <Table.Body className="divide-y">

      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

        <Table.Cell >
          { new Date(post.updatedAt).toLocaleDateString()}
        </Table.Cell>

        <Table.Cell>
        <Link  to={`/post/${post.slug}`}>
         <img src={post.image} alt={post.title} className="w-20 h-10 object-contain rounded-xl bg-gray-500 border"/>
        </Link>
        </Table.Cell>

        <Table.Cell>
           <Link className="font-medium text-gray-900 dark:text-white" to={`/post/${post.slug}`}>
            {post.title}
           </Link>
        </Table.Cell>

        <Table.Cell>
            {post.category}
        </Table.Cell>

        <Table.Cell>
          <span
          onClick={()=>{
         setShowModal(true);
         setDeletePostId(post._id)
          }}
          className="font-medium text-red-500 hover:underline cursor-pointer">Delete</span>
        </Table.Cell>
        
        <Table.Cell>
          <Link to={`/update-post/${post._id}`} className="text-teal-500 hover:underline">
          <span>Edit</span>
          </Link>
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
      <p>You have no posts yet!</p>
    )}
 
<Modal show={showModal} onClose={()=>setShowModal(false)} 
      popup
      size={'md'}
      >
  <Modal.Header/>
<Modal.Body>
<div className="text-center">

  <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
  <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure want to delete this post</h3>
  <div className="flex justify-center gap-6">
    <Button color={'failure'} onClick={handleDeletePost}>Yes, I'm sure</Button>
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
