
import React, {useState} from 'react'

const UpdateMessage = ({messages, post, setMessages}) => {
    const initialState = {
        message: ''
    }

    const [form, setForm] = useState(initialState)

    const handleSubmit = (event) => {
        event.preventDefault()
        console.log(form)
        fetch(`http://localhost:4000/group`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(form) 
        })
        .then(res => res.json())
        .then(setMessages(messages.map(m => {
          if (post.messageBody === m.messageBody) {
            m.messageBody = form.messageBody
          }
          return m
        })))
        // .then(song => setSongs([...songs, song]))
        setForm(initialState)
      }
    
      const handleChange = (event) => {
        setForm({...post, [event.target.id]: event.target.value})
      }

    return (
        <div>
            <form className="form" onSubmit={handleSubmit} >
                <div className="form-group">
                <label htmlFor="messageBody">Update: </label>
                <textarea id="messageBody" cols="30" rows="5" value={form.messageBody} onChange={handleChange}></textarea>
                </div>
                <div className="form-group">
                    <input type="submit" value="Update" />
                </div>
            </form>
        </div>
    )
}

export default UpdateMessage
