import $ from 'jquery'
import axios from 'axios'
import { useParams } from 'react-router'
import { useState } from 'react'

const CommentForm = () =>{
  const {id} = useParams()
  const token = localStorage.getItem('token')

  const handleSubmit = (e) =>{
    e.preventDefault() // need to remove
    const formData = new FormData()
    let commenttext = $('#comment-textarea').val()
    console.log($('#comment-upload-file')[0])
    let img = $('#comment-upload-file')[0].files[0] || ''

    if (commenttext === ''){
      alert('comment cannot be empty')
      return
    }
    formData.append('heading', 'comment')
    formData.append('content', commenttext)
    // formData.append('') // need to create image field in 

    axios.post(`http://localhost:8000/recipes/recipe/${id}/add-comment/`, formData, {
      headers : {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      console.log("response status=== ", response.status)
      // if (response.status === 401){
      //   // nagivate('login')
      // }
      if (response.status !== 201 && response.status !== 200){
        alert(`An error occurred: ${response.status}`)
        throw new Error(`HTTP error status: ${response.status}`)
      }
      return response.data;
    })
    .then(dat => {
      console.log("response json:==== ", dat)
    })
    .catch(error => {
      console.error(error)
    })  
  }

  return (
    <>
      <form>
          <textarea rows="3" id="comment-textarea" className="col-10 d-block rounded p-2" placeholder="Write comments here">
          </textarea>
          <div >
              <label htmlFor="comment-upload-file" className="col-form-label-sm">Upload pictures: (optional)</label>
              <input type="file" className="form-control form-control-sm form w-50" id="comment-upload-file"/>
          </div>
          
          <button className="btn btn-brown btn-sm mt-2" onClick={handleSubmit}>Post comment</button>
      </form>
    </>
  )
}
export default CommentForm