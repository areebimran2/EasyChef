import $ from 'jquery'
import axios from 'axios'
import { useState, useEffect, useContext } from 'react'

const CommentEditForm = ({token, elem, userId, edited, hasEdited, deleted, setDeleted}) => {
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

  const handleEdit = (cid) => {
    $(`#edit-comment-btn-${cid}`).addClass('d-none')
    $(`#del-comment-btn-${cid}`).addClass('d-none')

    $(`#confirm-edit-btn-${cid}`).removeClass('d-none')
    $(`#edit-media-upload-${cid}`).removeClass('d-none')
    $(`#delete-upload-btn-${cid}`).removeClass('d-none')

    $(`#comment-box-${cid}`).removeAttr('readOnly')
  }

  const handleConfirm = (cid) => {
    $(`#edit-comment-btn-${cid}`).removeClass('d-none')
    $(`#del-comment-btn-${cid}`).removeClass('d-none')

    $(`#confirm-edit-btn-${cid}`).addClass('d-none')
    $(`#edit-media-upload-${cid}`).addClass('d-none')
    $(`#delete-upload-btn-${cid}`).addClass('d-none')

    $(`#comment-box-${cid}`).attr('readOnly')
  }

  const handleUploadDelete = (cid) => {
    $(`#upload-${cid}`).addClass('d-none')
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

    if ($(`#upload-${cid}`).hasClass('d-none')) {
      formData.append('delete_img', true)
    }

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

  return (
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
            {elem.file ?
            <div id={`upload-${elem.id}`} className='position-relative d-inline-block mt-3'>
                {elem.ext !== 'mp4'?
                <img src={elem.file} alt='' className='direction-img'/>
                : ''}
                {elem.ext === 'mp4'? 
                <video controls className='direction-img'> <source src={elem.file} type={`video/mp4`} /></video>
                : ''}
                <button type='button' id={`delete-upload-btn-${elem.id}`} className='d-none not-clicked btn rounded-pill align-img position-absolute' onClick={() => handleUploadDelete(elem.id)}><i class="fa-solid fa-xmark"></i></button>
            </div>
            : ''}
        </div>
        <div className='text-end'><small><em>{elem.date_added}</em></small></div>
        <div id={`edit-media-upload-${elem.id}`} className='d-none'>
            <p className='text-danger mb-2'>Note: this will replace the existing upload in the comment</p>
            <label htmlFor={`edit-upload-file-${elem.id}`} className="col-form-label-sm">Upload pictures/videos: (optional)</label>
            <input type="file" className="form-control form-control-sm form w-50" id={`edit-upload-file-${elem.id}`} accept='png, jpg, jpeg, mp4'/>
        </div>
    </form>
  )
}

export default CommentEditForm;
