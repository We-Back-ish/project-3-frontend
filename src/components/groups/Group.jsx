import React, {useState, useEffect} from 'react'
import AddMessage from './AddMessage'
import UpdateMessage from './UpdateMessage'
import DeleteMessage from './DeleteMessage'
import axios from "axios"

const Group = ({ match }) => {

    const [messages, setMessages] = useState()

    useEffect(() => {
        axios.get('/group')
        .then(res => setMessages(res.data))
   
    }, [])

    // useEffect(() => {
    //     fetch(`http://localhost:4000/group`)
    //     .then(res => res.json())
    //     .then(messages => setMessages(messages))
    //   }, []) 

    const deletePost = (id) => {
        fetch(`http://localhost:4000/group`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(id)
    })
    .then(res => res.json())
    // .then(res => console.log(res))
    .then(() => fetch(`http://localhost:4000/group`).then(res => res.json()).then(res => setMessages(res)))
    }


// let messageInterest = match.params.interest
// console.log(messageInterest)
// console.log(messages)
// let pageMessage = messages.filter(msg => msg.interest === messageInterest)

    return (
        <div>
            <h1>{match.params.interest}</h1>
            <p>Discuss {match.params.interest} here!</p>
            { messages ?
                    messages.map((post) => (
                    <div key={post._id} className="post">
                        <p>{post.messageBody}</p>
                        <UpdateMessage messages={messages} post={post} setMessages={setMessages} />
                        <DeleteMessage post={post} deletePost={deletePost} />
                    </div>
                )) 
                : ``
            }
            <AddMessage match={match} messages={messages} setMessages={setMessages} />
            
        </div>
    )
}

export default Group