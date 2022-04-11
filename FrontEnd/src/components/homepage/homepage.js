import React from 'react'
import "./homepage.css"
import {useState} from 'react';
import axios from 'axios';
import {useNavigate} from "react-router-dom"


const Homepage = () =>{
    const navigate = useNavigate()
    const [book,setBook]=useState("");
    const [result,setResult]=useState([]);
    const [apiKey,setApiKey]=useState("AIzaSyA9YQIMZqPvytnenChVh2HGabLtg9ZM0rM");
    function handleChange(event){
        const book=event.target.value;
        setBook(book);
    }
    function handleSubmit(event){
        event.preventDefault();
        axios.get("https://www.googleapis.com/books/v1/volumes?q="+book+"&key="+apiKey+"&maxResults=20")
        .then(data=>{
            console.log(data.data.items);
            setResult(data.data.items);
        })
    }
    return (
        <div className="homepage">
            <div class="container">
                <h1>Book Search App</h1>
                <form onSubmit={handleSubmit}>
                    <div class="form-group">
                        <input type="text" onChange={handleChange} className="form-control mt-10"placeholder="Search for Books"
                        autoComplete="off"/>
                    </div>
                    <button type="submit" classname="btn btn-danger">Search</button>
                </form>
                {result.map(book=>(
                    <a href={book.volumeInfo.previewLink}>
                    <img src={book.volumeInfo.imageLinks.thumbnail} alt={book.title}/>
                    </a>
                ))}
            
            </div><div className="button" onClick={()=> navigate("/login")}>Logout</div>
        </div>
    )
}
export default Homepage
