import { Button, Modal, Table } from "flowbite-react";
import { useEffect, useState } from "react"
import { HiOutlineExclamationCircle } from "react-icons/hi";
import {useSelector } from 'react-redux';
import { Link } from "react-router-dom";
 

export default function DashComments() {

  const {currentUser} = useSelector(state => state.user);

  const [ comments, setComments] = useState([]);

  const [showmore,setShowmore] = useState(true);

  const [showModal,setShowModal] = useState(false);
   
  const [deleteCommentId, setDeleteCommentId] = useState("");
   
   useEffect(()=>{
 const fetchComments = async ()=>{
  try {
    const res = await fetch(`/api/comment/getcomments?userId=${currentUser._id}`);

    const data = await res.json();
    if(res.ok){

      setComments(data.comments);
      if(data.comments.length < 9 ){
        setShowmore(false);
      }
    }

  } catch (error) {
    console.log(error.message);
  }

 };
 if(currentUser.isAdmin){
  fetchComments();
 }

   },[currentUser._id]);

   const handleShowMore = async ()=>{
    const startIndex = Comments.length;
     
try {
  const res = await fetch(`/api/comment/getcomments?userId=${currentUser._id}&startIndex=${startIndex}`);

  const data = await res.json();

  if(res.ok){
    setComments((prev)=> [...prev, ...data.comments]);
    if(data.comments.length < 9){
      setShowmore(false);
    }
  }

} catch (error) {
  console.log(error.message);
  
}
   };

   const handleDeleteComment = async ()=>{
    setShowModal(false);
    try {
      const res = await fetch(`/api/comment/deletecomment/${deleteCommentId}`,{
        method: 'DELETE',
      })
const data = await res.json();

if(!res.ok){
   console.log(data.message);
} else {
  setComments((prev)=>
prev.filter((comment)=> comment._id !== deleteCommentId));
}
    } catch (error) {
      console.log(error.message);
    }
   };

  return (
    <div className="table-auto overflow-x-scroll md:mx-auto p-3 scrollbar scrollbar-track-slate-100 scrollbar-thumb-slate-300 dark:scrollbar-track-slate-700 dark:scrollbar-thumb-slate-500"> {currentUser.isAdmin && comments.length > 0 
      ? 
      ( 
<>
<Table hoverable className="shadow-md">
  <Table.Head>
    <Table.HeadCell>
      Date updated
    </Table.HeadCell>
    <Table.HeadCell>
         Comment content
    </Table.HeadCell>
    <Table.HeadCell>
        Number of likes
    </Table.HeadCell>
    <Table.HeadCell>
        postId
    </Table.HeadCell>
    <Table.HeadCell>
      <span>
        UserId
      </span>
    </Table.HeadCell>
    <Table.HeadCell>
      <span>
      Delete
      </span>
    </Table.HeadCell>
  </Table.Head>
  {comments.map((comment)=>(

    <Table.Body className="divide-y" key={comment._id}>

      <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">

        <Table.Cell >
          { new Date(comment.updatedAt).toLocaleDateString()}
        </Table.Cell>

        <Table.Cell>
        {comment.content}
        </Table.Cell>

        <Table.Cell>
            {comment.numberOfLikes}
        </Table.Cell>

        <Table.Cell>
            {comment.postId}
        </Table.Cell>

        <Table.Cell>{comment.userId}</Table.Cell>

        <Table.Cell>
          <span
          onClick={()=>{
         setShowModal(true);
         setDeleteCommentId(comment._id)
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
      <p>You have no commentss yet!</p>
    )}
 
<Modal show={showModal} onClose={()=>setShowModal(false)} 
      popup
      size={'md'}
      >
  <Modal.Header/>
<Modal.Body>
<div className="text-center">

  <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
  <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure want to delete this comment</h3>
  <div className="flex justify-center gap-6">
    <Button color={'failure'} onClick={handleDeleteComment}>Yes, I'm sure</Button>
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
