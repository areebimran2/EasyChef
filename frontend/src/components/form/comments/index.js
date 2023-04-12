import $ from 'jquery'
import axios from 'axios'
import { useParams } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext'

const CommentForm = () =>{
  const {id} = useParams()
  const token = localStorage.getItem('token')
  const {comments, setComments} = useContext(RecipeAPIContext)
  const [commented, hasCommented ] = useState(false)

  useEffect(()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/comments/`)
    .then(response => response.json())
    .then(data=>{
      setComments(data.results)
    })
  },[commented])

  comments.map(elem => {
    elem.date_added = elem.date_added.slice(0, 10)
    if (elem.file){
      elem['ext'] = elem.file && elem.file.split('.').pop();
    }
})
  

  const handleSubmit = (e) =>{
    e.preventDefault() // need to remove
    const formData = new FormData()
    let commenttext = $('#comment-textarea').val()
    let img = $('#comment-upload-file')[0].files[0] || ''

    if (commenttext === ''){
      alert('comment cannot be empty')
      e.preventDefault()
      return
    }
    formData.append('heading', 'comment')
    formData.append('content', commenttext)
    formData.append('file', img)

    axios.post(`http://localhost:8000/recipes/recipe/${id}/add-comment/`, formData, {
      headers : {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      hasCommented(!commented)
      if (response.status === 201 || response.status === 200){
        return response.data
      }
      else if (response.status === 401){
        alert('You have been logged out.\n Please log in again')
      }
      else{
        alert(`An error occurred: ${response.status}`)
        throw new Error(`HTTP error status: ${response.status}`)
      }
      
    })
    .then(dat => {
      console.log("response json:==== ", dat)
    })
    .catch(error => {
      if (error.response && error.response.status === 401) {
        console.log("Unauthorized");
        alert('You have been logged out.\n Please log in again')
      } 
      else {
        console.error(error);
      }
    })
  }

  return (
    <>
    <div className="card col-8 bg-light p-4 mt-5">
      <h3>Comments</h3>
      
      {comments ? comments.map((elem, index) => 
      <div key={index} className='mb-4'>
          <div className='card p-2'>
          <p>{elem.content}</p>
          {elem.file && elem.ext !== 'mp4'? <img src={elem.file} alt='' className='direction-img'/> : ''}
          {elem.file}
          {elem.file && elem.ext === 'mp4'? <video controls className='direction-img'>
          <source src={elem.file} type={`video/mp4`} />
        </video> : ''}
        </div>
        <div className='text-end'><small><em>{elem.date_added}</em></small></div>
      </div>
        
      ) : ''}
      
      <form>
        <textarea rows="3" id="comment-textarea" className="col-10 d-block rounded p-2 mt-4" placeholder="Write comments here">
        </textarea>
        <div >
            <label htmlFor="comment-upload-file" className="col-form-label-sm">Upload pictures/videos: (optional)</label>
            <input type="file" className="form-control form-control-sm form w-50" id="comment-upload-file" accept='png, jpg, jpeg, mp4'/>
        </div>
        
        <button className="btn btn-brown btn-sm mt-2" onClick={handleSubmit}>Post comment</button>
      </form>
    </div>
      
    </>
  )
}
export default CommentForm