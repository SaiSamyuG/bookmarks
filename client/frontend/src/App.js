import './App.css';
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import ListOfBookMarks from "./Components/ListOfBookMarks";
import AddBookMark from "./Components/AddBookMark";

function App() {
    return (
        <div>
            <BrowserRouter>
                <Routes>
                    <Route path="/bookmarks/list" element={<ListOfBookMarks/>}/>
                    <Route path="/bookmarks/add" element={<AddBookMark/>}/>
                    <Route path="/*" element={<Navigate replace to="/"/>}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}

export default App;
