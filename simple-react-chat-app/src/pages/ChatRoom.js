import React, {Component } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import SendIcon from '@material-ui/icons/Send';
import { Row, Container } from 'react-bootstrap';

import CurrentUserText from '../components/CurrentUserText'
import OtherUserText from '../components/OtherUserText'
import ChatNotification from '../components/ChatNotification'

import {printServerURL, setSocketServerURL} from '../services/socket'

let styles = {
	chatRoomContainer: {
		marginTop: 10,
	},
	header:{
		height: "7vh",
		backgroundColor: 'rgba(0, 0, 0, 0.25)',
		alignItems: 'center',
		justifyContent: 'center',
		display: 'flex',
		borderTopLeftRadius: 8,
		borderTopRightRadius: 8,
		flexDirection: 'column',
	},
	headerText: {
		fontSize: 20,
	},
	youAppearAsText: {
		fontSize: 14,
		marginTop: 5,
		display: 'flex',
		flexDirection: 'row',
	},
	usernameText:{
		fontWeight: 'bold',
		marginLeft: 3,
		marginRight: 3,
	},
	chatThread: {
		backgroundColor: 'rgba(227, 227, 227, 0.2)',
		flex: 0,
		display: 'flex',
    	flexDirection: 'column',
    	height: "65vh",
    	overflowY: 'auto',
    	width: '45vw',
    	alignSelf: 'center',
    	padding: 20,
    	paddingBottom: 40,
    	border: '1px solid rgba(0, 0, 0, 0.2)',
    	borderBottomLeftRadius: 8,
		borderBottomRightRadius: 8,
    	marginBottom: 8
	},
	messageInputSection: {
		display: 'flex',
		justifyContent: 'flex-start',
	},
	messageTextField: {
		flex: 1
	},
	messageSubmitButton: {
		flex: 0
	},
	serverInputSection: {
		display: 'flex',
		justifyContent: 'flex-start',
		marginBottom: 5
	}

}

const autoScrollOffset = 100 //offset value that allows screen to auto scroll when you are not exactly at bottom of chat window

class ChatRoom extends Component {

	constructor(props) {
	    super(props);
	    this.state = {
	    	currentUsername: "User1",
	    	currentUserID: 1,
	    	serverURL: '',
	    	message: '',
	    	chatRoomData: [
	    	],
	    	initialLoad: true,
	    	chatSocket: null
	    };
	    //Create Ref for managing "auto-scroll"
	    this.messagesEndRef = React.createRef()
	}

	componentDidMount(){

		// localStorage.removeItem('userID')
		// localStorage.removeItem('username')

		

	}

	componentWillUnmount(){
		if(this.state.chatSocket){
			this.state.chatSocket.off("RetrieveChatRoomData")
			this.state.chatSocket.off("SetUserData")
		}
	}

	setMessage(message){
		//Set Message being typed in input field
		this.setState({message: message})
	}

	sendMessageData(){
		var {message, currentUsername, currentUserID} = this.state

		if(message.length > 0){
			//Send chat message to server...
			this.state.chatSocket.emit("SendMessage", {message: message, username: currentUsername, userID: currentUserID, timeStamp: null})
			//Clear chat message textfield box
			this.setState({message: ''})
		}
	}

	setServerURL(serverURL){
		console.log("Set Server URL")
		this.setState({serverURL: serverURL})
	}

	submitServerURL(){
		console.log("Submit Server URL")
		var chatSocket = setSocketServerURL(this.state.serverURL)
		this.setState({chatSocket: chatSocket, chatRoomData: []}, () => {
			this.SetChatRoomSocketConnection()
		})
	}

	SetChatRoomSocketConnection(){

		printServerURL()

		let userIDVal = localStorage.getItem('userID')
		let usernameVal = localStorage.getItem('username')

		//If user does not have a userid and username saved in local storage, create them for them
		if(!userIDVal){

	      this.state.chatSocket.on("SetUserData", userData => {
	        //When user creation on server is complete, retrieve and save data to local storage
	        localStorage.setItem('userID', userData.userID)
	        localStorage.setItem('username', userData.username)
	        console.log(userData)

	        this.setState({currentUsername: userData.username, currentUserID: userData.userID})

	        //Notify Socket server is not ready to chat
	        this.state.chatSocket.emit("UserEnteredRoom", userData)
	      });

	      //Send Socket command to create user info for current user
	      this.state.chatSocket.emit("CreateUserData")
	    } 
	    else {
	    	//If user already has userid and username, notify server to allow them to join chat
	    	this.setState({currentUsername: usernameVal, currentUserID: userIDVal})
	    	this.state.chatSocket.emit("UserEnteredRoom", {userID: userIDVal, username: usernameVal})
	    }

	    //Retrieve game data (from Get Chat data socket call)
	    this.state.chatSocket.on("RetrieveChatRoomData", (chatRoomData) => {
	    	this.setState({chatRoomData: chatRoomData}, () => this.shouldScrollToBottom())
	    })
	}


	shouldScrollToBottom(){
		//If user is near the bottom of the chat, automatically navigate them to bottom when new chat message/notification appears
		if (this.messagesEndRef.current.scrollHeight - this.messagesEndRef.current.scrollTop < this.messagesEndRef.current.offsetHeight + autoScrollOffset){
			this.scrollToBottom()
		}

		//Navigate to end of chat when entering chat the first time
		if(this.state.initialLoad){
			this.scrollToBottom()
			this.setState({initialLoad: false})
		}
	}

	scrollToBottom(){
		//Scrolls user to end of chat message window
		this.messagesEndRef.current.scrollTop = this.messagesEndRef.current.scrollHeight
	}


	render(){

		let {chatRoomData, currentUsername} = this.state

		return (
			<Container style = {styles.chatRoomContainer}>

				<Container style={styles.serverInputSection}>
			    		<TextField 
			    			style= {styles.messageTextField}
			    			id="input-with-icon-adornment" 
			    			label="Enter Chat Server Url" 
			    			variant="outlined"  
			    			value={this.state.serverURL} 
			    			onChange={(event) => this.setServerURL(event.target.value)}
			    			onKeyPress= {(event) => {
					            if (event.key === 'Enter') {
					              console.log('Enter key pressed');
					              this.submitServerURL()
					            }
						    }}
						    InputProps={{
						    	endAdornment:(
							    	<InputAdornment position="end">
							    		<IconButton onClick={() => this.submitServerURL()}>
							    			<SendIcon/>
							    		</IconButton>
							    	</InputAdornment>
							    )
						    }}
			    		/>
				</Container>

				<Container style ={styles.header}>
					<Row style={styles.headerText}>Chat Room</Row>
					<Row style={styles.youAppearAsText}>
						You appear as 
						<div style={styles.usernameText}> {currentUsername}</div>
						in chat
					</Row>
				</Container>
				

				<Container style={styles.chatThread} ref={this.messagesEndRef}>
					{chatRoomData.map( (messageData, index) => {

						if(messageData.username == currentUsername) {
			    			return <CurrentUserText key={index} username={messageData.username} message={messageData.message}/>
			    		} else if (messageData.username == '') {
			    			return <ChatNotification key={index} username={messageData.username} message={messageData.message}/>
			    		} else {
			    			return <OtherUserText key={index} username={messageData.username} message={messageData.message}/>
			    		}
		    			
		    		})}

	  				
	    		</Container>

	    		<Container style={styles.messageInputSection}>
			    		<TextField 
			    			style= {styles.messageTextField}
			    			id="input-with-icon-adornment" 
			    			label="Enter Message" 
			    			variant="outlined"  
			    			value={this.state.message} 
			    			onChange={(event) => this.setMessage(event.target.value)}
			    			onKeyPress= {(event) => {
					            if (event.key === 'Enter') {
					              console.log('Enter key pressed');
					              this.sendMessageData()
					            }
						    }}
						    InputProps={{
						    	endAdornment:(
							    	<InputAdornment position="end">
							    		<IconButton onClick={() => this.sendMessageData()}>
							    			<SendIcon/>
							    		</IconButton>
							    	</InputAdornment>
							    )
						    }}
			    		/>
				</Container>

			</Container>
		);
	}
}

export default ChatRoom;