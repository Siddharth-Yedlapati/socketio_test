import React from 'react'
import { Redirect } from 'react-router-dom'
import { ColorContext } from '../context/colorcontext' 

const uuid = require('uuid');
const socket = require('../connection/socket').socket

class CreateNewGame extends React.Component {
    state = {
        didGetUserName: false,
        inputText: "",
        gameId: ""
    }

    constructor(props) {
        super(props);
        this.textArea = React.createRef();
    }
    
    send = () => {

        const newGameRoomId = uuid.v4();

        this.setState({
            gameId: newGameRoomId
        })

        socket.emit('createNewGame', newGameRoomId)
    }

    typingUserName = () => {
        // grab the input text from the field from the DOM 
        const typedText = this.textArea.current.value
        

        this.setState({
            inputText: typedText
        })
    }

    render() {


        return (<React.Fragment>
            {
                this.state.didGetUserName ? 

                <Redirect to = {"/game/" + this.state.gameId}><button className="btn btn-success" style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px"}}>Start Game</button></Redirect>

            :
               <div>
                    <h1 style={{textAlign: "center", marginTop: String((window.innerHeight / 3)) + "px"}}>Your Username:</h1>

                    <input style={{marginLeft: String((window.innerWidth / 2) - 120) + "px", width: "240px", marginTop: "62px"}} 
                           ref = {this.textArea}
                           onInput = {this.typingUserName}></input>
                           
                    <button className="btn btn-primary" 
                        style = {{marginLeft: String((window.innerWidth / 2) - 60) + "px", width: "120px", marginTop: "62px"}} 
                        disabled = {!(this.state.inputText.length > 0)} 
                        onClick = {() => {
                            // When the 'Submit' button gets pressed from the username screen,
                            // We should send a request to the server to create a new room with
                            // the uuid we generate here.
                            this.props.didRedirect() 
                            this.props.setUserName(this.state.inputText) 
                            this.setState({
                                didGetUserName: true
                            })
                            this.send()
                        }}>Submit</button>
                </div>
            }
            </React.Fragment>)
    }
}

const Onboard = (props) => {
    const color = React.useContext(ColorContext)

    return <CreateNewGame didRedirect = {color.playerDidRedirect} setUserName = {props.setUserName}/>
}


export default Onboard