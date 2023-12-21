import React from "react";
import { Col, Row } from "react-bootstrap";
import CommentList from './CommentList'
/* import { Container, Row, Form, Col} from 'react-bootstrap' */

class CommentArea extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            commenti: [],
            isLoading: true,
            isError: false,
        }
    }
    getCommenti= () => {
        fetch(`https://striveschool-api.herokuapp.com/api/books/${this.props.id}/comments/`, {
            headers: {
                "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NTg0NDhlMGI1MjViYjAwMThlZDA4MWMiLCJpYXQiOjE3MDMxNjgyMjQsImV4cCI6MTcwNDM3NzgyNH0.B5CDaWFimBIb7pfX_uiGZiJ540IFyrQXo_I8q_wZpXg"
            }
        }).then((res) => {
            if (res.ok) {
                return res.json()
            }else{
                throw new Error ('Errore nel recupero dei commenti!')
            }
        }).then((data) => {
            this.setState({
                commenti: data,
                isLoading: false,
            })
        }).catch(error => {
            console.log('ERRORE', error)
            this.setState({
                isLoading: false,
                isError: true,
            })
        })
        
    }

    componentDidMount() {
        this.getCommenti()
    }
    render() {
        console.log(this.state.commenti)
        return(
            <div>
                <CommentList comments = {this.state.commenti}/>
            </div>
        )
    }
}

export default CommentArea

