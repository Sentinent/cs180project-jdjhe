import { useState } from "react";
import axios from "axios";
import "./Search.css"

function Search(){
    const [pageNum, setPageNum] = useState("");
    const [columns, setColumns] = useState("");
    const [serverStr, setServerStr] = useState("");

    const onSubmit = (e) => {
        e.preventDefault()
    
        if (!pageNum) {
            alert('Please enter a page number')
            return
        }
        if (!columns) {
            alert('Please enter a columns number')
            return
        }
        fetchData()
        setPageNum("")
        setColumns("")
    }

    const fetchData = async () => {
        const res = await axios("http://localhost:5000/data/cols="+ columns + "&page=" + pageNum)
        console.log(res.data)
        setServerStr(res.data)
    }

    return (
        <div className="search">
            <form className='add-form' onSubmit={onSubmit}>
                <div className='form-control'>
                    <label>Page</label>
                    <input
                    type='text'
                    placeholder='Page Number'
                    value={pageNum}
                    onChange={(e) => setPageNum(e.target.value)}
                    />
                </div>
                <div className='form-control'>
                    <label>Columns</label>
                    <input
                    type='text'
                    placeholder='Columns name'
                    value={columns}
                    onChange={(e) => setColumns(e.target.value)}
                    />
                </div>
        
                <input type='submit' value='Search' className='btn btn-block' />
            </form>
            <div>
                {serverStr.length > 0 ? (
                    <p>{serverStr}</p>
                ) : (
                    'No Tasks To Show'
                )}
            </div>
        </div>
    );
}

export default Search