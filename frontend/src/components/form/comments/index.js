import $ from 'jquery'
import axios from 'axios'
import { useParams } from 'react-router'
import { useState, useEffect, useContext } from 'react'
import RecipeAPIContext from '../../../contexts/recipeAPIcontext'
import notfound from "../../MyRecipes/Card/local-file-not-found.png"
import CommentEditForm from './edit'

const CommentForm = () => {
  const {id} = useParams()
  const token = localStorage.getItem('token')
  const [comments, setComments] = useState([])
  const [commented, hasCommented ] = useState(false)
  const [edited, hasEdited] = useState(false)
  const [deleted, setDeleted] = useState(false)
  const [userId, setUserId] = useState(-1)

  const perPage = 5
  const [hasEnded, setHasEnded] = useState(true)
  const [page, setPage] = useState(1)
  const [count, setCount] = useState(0)

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

  useEffect(() => {
    fetch(`http://localhost:8000/recipes/recipe/${id}/comments/?page=${page}&page_size=${perPage}`)
    .then(response => {
        if (!response.ok) {
            throw new Error(response.status)
        } else {
            return response.json()
        }
    })
    .then(json => {
        if (json === undefined) {
            setPage(page - 1)
        } else {
            setCount(json.count)
            setComments([...comments, ...json.results])
            setHasEnded(json.next === null)
        }
    })
    .catch(error => {
        console.log(error.message)
    })
  },[page, commented, edited, deleted])

  comments.map(elem => {
    elem.date_added = elem.date_added.slice(0, 10)
    if (elem.file){
      elem['ext'] = elem.file && elem.file.split('.').pop();
    }})

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
      <div key={index} className='mb-3'>
          <div className='d-flex mt-2'>
            <div class="flex-shrink-0 mt-2">
              <img id="commentAvatar" src={elem.author.avatar !== null ? elem.author.avatar : notfound} alt="Avatar"/>
            </div>
            <div className='flex-grow-1 ms-2 d-flex flex-column'>
              <CommentEditForm token={token} elem={elem} userId={userId} edited={edited} hasEdited={hasEdited} deleted={deleted} setDeleted={setDeleted}/>
            </div>
          </div>
        </div>
        
      ) : ''}

      {!hasEnded ? 
        <div className='d-flex justify-content-center'>
          <button className="btn btn-brown btn-sm" onClick={() => setPage(page + 1)}>{`Load more comments (${count - (perPage * page)})`}</button>
        </div>
        : ''
      }
      
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