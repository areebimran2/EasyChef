import $ from 'jquery'
import axios from 'axios'
import { useParams } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext'
import notfound from "../../MyRecipes/Card/local-file-not-found.png";

const CommentForm = () => {
  const {id} = useParams()
  const token = localStorage.getItem('token')
  const {comments, setComments} = useContext(RecipeAPIContext)
  const [commented, hasCommented ] = useState(false)
  const [edited, hasEdited] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [userId, setUserId] = useState(-1)

  // Taken from https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
  useEffect ( () => {
    $("textarea").each(function () {
      this.style.height = this.scrollHeight + "px";
      this.style.overflowY = "hidden";
    }).on("input", function () {
      this.style.height = "auto";
      this.style.height = this.scrollHeight + "px";
    });
  })

  useEffect( () => {
    fetch(`http://localhost:8000/accounts/id/`, {
      method: 'GET',
      headers: token === null ? {} : {'Authorization': `Bearer ${token}`}
    })
    .then(response => {
      if (!response.ok) {
        throw new Error(response.status)
      } else {
        return response.json()
      }})
    .then(json => {
      setUserId(json.id)
    })
    .catch(error => console.error(`HTTP error status: ${error.message}`))
  }, [])

  useEffect(()=>{
    fetch(`http://localhost:8000/recipes/recipe/${id}/comments/`)
    .then(response => response.json())
    .then(data=>{
      setComments(data.results)
    })
  },[commented, edited, deleted])

  comments.map(elem => {
    elem.date_added = elem.date_added.slice(0, 10)
    if (elem.file){
      elem['ext'] = elem.file && elem.file.split('.').pop();
    }})
  
  
  const handleEdit = (cid) => {
    $(`#edit-comment-btn-${cid}`).addClass('d-none')
    $(`#del-comment-btn-${cid}`).addClass('d-none')

    $(`#confirm-edit-btn-${cid}`).removeClass('d-none')
    $(`#edit-media-upload-${cid}`).removeClass('d-none')

    $(`#comment-box-${cid}`).removeAttr('readOnly')
  }

  const handleConfirm = (cid) => {
    $(`#edit-comment-btn-${cid}`).removeClass('d-none')
    $(`#del-comment-btn-${cid}`).removeClass('d-none')

    $(`#confirm-edit-btn-${cid}`).addClass('d-none')
    $(`#edit-media-upload-${cid}`).addClass('d-none')

    $(`#comment-box-${cid}`).attr('readOnly')
  }

  const handleEditSubmit = (e, cid) =>{
    e.preventDefault() // need to remove
    const formData = new FormData()
    let editedtext = $(`#comment-box-${cid}`).val()
    let img = $(`#edit-upload-file-${cid}`)[0].files[0] || ''

    if (editedtext === ''){
      alert('comment cannot be empty')
      e.preventDefault()
      return
    }

    formData.append('heading', 'comment')
    formData.append('content', editedtext)
    formData.append('file', img)

    axios.patch(`http://localhost:8000/recipes/comment/${cid}/edit/`, formData, {
      headers : {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'multipart/form-data'
      }
    })
    .then(response => {
      hasEdited(!edited)
      if (response.status === 200 || response.status === 204){
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
          <div className='d-flex mt-2'>
            <div class="flex-shrink-0 mt-2">
              <img id="commentAvatar" src={elem.author.avatar !== null ? elem.author.avatar : notfound} alt="Avatar"/>
            </div>
            <div className='flex-grow-1 ms-2 d-flex flex-column'>
              <form>
                <div className='d-flex justify-content-between'>
                  <span className='fw-bold p-1 mt-2'>{elem.author.username}</span>
                  {userId === elem.author.id ? 
                    <div>
                      <button type="button" id={`edit-comment-btn-${elem.id}`} className={'not-clicked btn mb-1'} onClick={() => handleEdit(elem.id)}>
                        <i className="fa-solid fa-pen-to-square"></i> Edit
                      </button>
                      <button type="button" id={`del-comment-btn-${elem.id}`} className={'not-clicked btn mb-1 ms-2'}
                      onClick={() => {
                        axios.delete(`http://localhost:8000/recipes/comment/${elem.id}/delete/`, {
                          headers: {
                            Authorization: `Bearer ${token}`,
                            },
                          })
                          .then(() => {
                            setDeleted(!deleted);
                          });
                        }}>
                        <i className="fa-solid fa-trash"></i> Delete
                      </button>
                      <button type="button" id={`confirm-edit-btn-${elem.id}`} className={'d-none not-clicked btn mb-1 ms-2'} onClick={(e) => {handleEditSubmit(e, elem.id); handleConfirm(elem.id);}}>
                        <i className="fa-solid fa-check"></i> Confirm
                      </button>
                    </div> : <></>
                  }
                </div>
                <div className='card p-2'>
                  <textarea id={`comment-box-${elem.id}`} class='no-resize border-0 p-2' readOnly>{elem.content}</textarea>
                  {elem.file && elem.ext !== 'mp4'? <img src={elem.file} alt='' className='direction-img'/> : ''}
                  {elem.file && elem.ext === 'mp4'? <video controls className='direction-img'> <source src={elem.file} type={`video/mp4`} /></video> : ''}
                </div>
                <div className='text-end'><small><em>{elem.date_added}</em></small></div>
                <div id={`edit-media-upload-${elem.id}`} className='d-none'>
                    <label htmlFor={`edit-upload-file-${elem.id}`} className="col-form-label-sm">Upload pictures/videos: (optional)</label>
                    <input type="file" className="form-control form-control-sm form w-50" id={`edit-upload-file-${elem.id}`} accept='png, jpg, jpeg, mp4'/>
                </div>
              </form>
            </div>
          </div>
        </div>
        
      ) : ''}
      
      <form>
        <textarea rows="3" id="comment-textarea" className="col-10 d-block rounded p-2 mt-4" placeholder="Write comments here">
        </textarea>
        <div>
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