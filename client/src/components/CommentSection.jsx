import { Alert, Button, Modal, Textarea } from "flowbite-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link,useNavigate } from "react-router-dom";
import Comment from "../components/Comment";
import { HiOutlineExclamationCircle} from 'react-icons/hi';

export default function CommentSection({postId}) {
  
  const { currentUser } = useSelector((state) => state.user);

  const [comment ,setComment] = useState("");
  const [commentError,setCommentError] = useState(null);
  const [commentData,setCommentData] = useState([]);
  const [showModal,setShowModal] = useState(false);
  const [commentToDelete,setCommentToDelete] = useState(null);
  const navigate = useNavigate();

const handleChange=(e)=>{
 setComment(e.target.value);
}

const handleSumbit = async (e)=>{
    e.preventDefault();
     try {
       if(comment.length > 200){
         return ;
        }
        const res = await fetch(`/api/comment/create`,{
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({content: comment , postId, userId: currentUser._id }),
        })
        const data = await res.json();
        if(res.ok){
          setComment('');
          setCommentError(null);
          setCommentData([data, ...commentData])
        }
      } catch (error) {
        setCommentError(error.message);
      }
};
 
useEffect(()=>{
  const getComments = async ()=>{
    try {
      const res = await fetch(`/api/comment/getpostcomments/${postId}`);

      if(res.ok){
        const data = await res.json();
        setCommentData(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  }
  getComments();
},[postId]);

 const handleLike = async (commentId)=>{
   
try {
  if(!currentUser){
    navigate('/sign-in');
    return;
  }
  const res = await fetch(`/api/comment/likecomment/${commentId}`,{
    method: 'PUT',
  });
  const data = await res.json();

  setCommentData(commentData.map((comment)=> 
  comment._id === commentId ? {
    ...comment,
    likes: data.likes, 
    numberOfLikes : data.likes.length,
  } : comment
));
} catch (error) {
  console.log(error.message);
}
}
 
const handleEdit=(comment,editedContent)=>{
 
  setCommentData(
    commentData.map((c)=> c._id === comment._id ? {...comment, content:editedContent} : comment)  
  )
}

const handleDelete = async ()=>{
      setShowModal(false);
  try {
  const res = await fetch(`/api/comment/deletecomment/${commentToDelete}`,{
    method: "DELETE",
  })
  const data = await res.json();
  if(res.ok){
    setCommentData(
      commentData.filter((c)=> c._id !== commentToDelete)
    )
  }

} catch (error) {
  console.log(error.message);
}
}
 
  return (
    <div className="max-w-2xl mx-auto w-full p-3">
      {currentUser ? (
        <div className="flex items-center gap-2 my-5 text-gray-500 text-sm">
          <p>
            signed in as :
            </p>
              <img
              className="rounded-full w-8 h-8 object-cover"
                src={currentUser.profilePicture}
                alt={currentUser.username}
              />

            <Link
              className="text-teal-500 hover:underline text-xs"
              to={"/dashboard?tab=profile"}
            >
              @{currentUser.username}
            </Link>
        </div>
      ) : (

        <div className="text-sm flex gap-1">
        <p>
          You must be Signed in to Comment 
          <Link to={"/sign-in"} className="text-teal-500 hover:underline">
            signin
          </Link>
        </p>
        </div>
      )}
      {currentUser && (
        <form className="border border-teal-500 rounded-md p-3" onSubmit={handleSumbit}>
            <Textarea
            placeholder="Add a Comment..."
            rows={"3"}
            maxLength={"200"}
            onChange={handleChange}
            value={comment}
            />
            <div className="flex justify-between mt-5 items-center">
                <p className="text-gray-500 text-xl"> {200 - comment.length } Characters remaining</p>
                <Button type="submit" outline gradientDuoTone={"purpleToBlue"}>Submit</Button>
            </div>
            { commentError && (<Alert color={"failure"} className="mt-5">{commentError}</Alert>)}
        </form>
      )}
      {commentData.length === 0 ? ( <p className="text-sm my-5">No comments yet!</p> ):(
     <>
        <div className="text-sm my-5 flex flex-row gap-1 items-center">
        <p>
          {commentData.length === 1 ? "comment" : "comments"}
        </p>
          <div className="border border-gray-400 py-1 px-2 rounded-md"><p>{commentData.length}</p></div>

          </div>

          {commentData.map((comment)=>(

                  <Comment
                  key={comment._id}
                  comment={comment}
                  onLike = {handleLike}
                  onEdit = {handleEdit}
                  onDelete = {
                    (commentId)=>{
                    setShowModal(true)
                   setCommentToDelete(commentId)}
                             }
                  />
          )) }
     </>
        
      )}

<Modal show={showModal} onClose={()=>setShowModal(false)} 
      popup
      size={'md'}
      >
  <Modal.Header/>
<Modal.Body>
<div className="text-center">

  <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400 dark:text-gray-200 mb-4 mx-auto'/>
  <h3 className='mb-5 text-lg text-gray-500 dark:text-gray-400'>Are you sure want to delete this Comment</h3>
  <div className="flex justify-center gap-6">
    <Button color={'failure'} onClick={handleDelete}>Yes, I'm sure</Button>
    <Button onClick={()=>setShowModal(false)}
    color={'success'}
    >No, cancel</Button>

    </div>
</div>
</Modal.Body>
      </Modal>
    </div>
  );
}
