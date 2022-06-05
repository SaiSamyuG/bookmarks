import BookMarkService from "../BookMarkService";
import {useEffect, useState} from "react";
import {Button, Grid, Icon, Table, TableBody, TableCell, TableContainer, TableHead, TableRow} from "@material-ui/core";
import {Card, InputGroup, FormControl} from "react-bootstrap";
import {
    faStepBackward,
    faFastBackward,
    faStepForward,
    faFastForward,
} from "@fortawesome/free-solid-svg-icons";
//import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import _ from 'lodash';
import AddBookMark from "./AddBookMark";
import axios from "axios";

const ListOfBookMarks = (props) => {
    const [bookMarks, setBookMarks] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [bookMarksPerPage, setBookMarksPerPage] = useState(4);
    const [totalPages, setTotalPages] = useState(1);
    const [totalElements, setTotalElements] = useState(1);
    const [deleteStatus, setDeleteStatus] = useState(false);
    const [editStatus, setEditStatus] = useState(false);
    const [editBookMarkData, setEditBookMarkData] = useState({});
    console.log(bookMarks);

    // useEffect(() => {
    //     // By moving this function inside the effect, we can clearly see the values it uses.
    //     async function fetchProduct() {
    //         const response = await BookMarkService.list();
    //         console.log(response);
    //         setBookMarks(response.data);
    //     }
    //
    //     fetchProduct();
    // }, []);

    const getAllBookMarks = async (currentPage) => {
        let page = currentPage - 1
        //await BookMarkService.list().then(response => {
        axios.get("http://localhost:8080/bookmarks/list?page=" + page + "&size=" + bookMarksPerPage).then(response => {
            console.log(response.data);
            setBookMarks(response.data.content);
            setTotalPages(response.data.totalPages)
            setTotalElements(response.data.totalElements)
            setCurrentPage(response.data.number + 1)
        })
    }

    useEffect(() => {
        (async () => {
            await getAllBookMarks(currentPage);
        })();
    }, [deleteStatus, editStatus])

    async function deleteBookMark(bookMark) {
        setDeleteStatus(true);
        let id = _.filter(bookMarks, function (eachBookMark) {
            return eachBookMark.title.toLowerCase() === bookMark.title.toLowerCase();
        })[0].id;
        console.log(id);
        await BookMarkService.remove(id);
    }

    function editBookMark(bookMark) {
        setEditStatus(true);
        setEditBookMarkData(bookMark);
    }

    const handleClose = () => {
        setEditStatus(false);
        setDeleteStatus(false);
    }

    async function firstPage() {
        let fp = 1
        if (currentPage > fp) {
            //setCurrentPage(1)
            await getAllBookMarks(fp)
        }
    }

    async function prevPage() {
        let pp = 1
        if (currentPage > pp) {
            await getAllBookMarks(currentPage - pp)
        }
    }

    async function changePage(event) {
        let targetPage = parseInt(event.target.value)
        setCurrentPage(targetPage)
        await getAllBookMarks(targetPage)
    }

    async function nextPage() {
        if (currentPage < Math.ceil(totalElements / bookMarksPerPage)) {
            await getAllBookMarks(currentPage + 1)
        }
    }

    async function lastPage() {
        let condition = Math.ceil(totalElements / bookMarksPerPage);
        if (currentPage < condition) {
            await getAllBookMarks(condition)
        }
    }

    return (
        <div>
            <TableContainer>
                <Table aria-label="sticky table" id="table" stickyHeader>
                    <TableHead>
                        <TableRow>
                            <TableCell id="sno" align="flex-start"
                            >S.No</TableCell>
                            <TableCell id="title" align="flex-start"
                            >Title</TableCell>
                            <TableCell id="link" align="flex-start">Link</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {
                            bookMarks.map((bookMark, index) => {
                                    return (
                                        <>
                                            <TableRow id="row">
                                                <TableCell align="flex-start"
                                                >{index + 1}</TableCell>
                                                <TableCell align="flex-start"
                                                >{bookMark.title}</TableCell>
                                                <TableCell align="flex-start"
                                                >{bookMark.link}</TableCell>
                                                <Grid style={{position: "sticky", right: 0}}>
                                                    <TableCell
                                                        item xs={1}
                                                        style={{
                                                            cursor: "pointer", borderBottom: "none", position: "sticky",
                                                            right: 0,
                                                            backgroundColor: "white",
                                                            zIndex: 800
                                                        }}><Button
                                                        id="delete-icon"
                                                        variant="outlined"
                                                        onClick={() => deleteBookMark(bookMark)}>
                                                        Delete
                                                    </Button>
                                                    </TableCell>

                                                    <TableCell item xs={1}
                                                               style={{
                                                                   cursor: "pointer",
                                                                   borderBottom: "none",
                                                                   position: "sticky",
                                                                   right: 0,
                                                                   backgroundColor: "white",
                                                                   zIndex: 850,
                                                               }}>
                                                        <Button id="edit-icon"
                                                                variant="outlined"
                                                                onClick={() => editBookMark(bookMark)}>
                                                            {/*onClick={<AddBookMark/>}>*/}
                                                            Edit
                                                        </Button>
                                                    </TableCell>
                                                </Grid>
                                            </TableRow>
                                        </>


                                        // bookMarks.map(eachBk => {
                                        // // <li key={eachBk.title}>
                                        // //     {eachBk.title}
                                        // // </li>
                                        // return <p>{eachBk.title + "-" + eachBk.link}</p>
                                    )
                                }
                            )}
                    </TableBody>
                </Table>
                {bookMarks.length > 0 &&
                <div>
                    <div style={{float: "left"}}>
                        Showing Page {currentPage} of {totalPages}
                    </div>
                    <div>
                        {/*<InputGroup size="sm">*/}
                        {/*    <InputGroup.Prepend>*/}
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === 1}
                            onClick={firstPage}
                        >
                            {/*<Icon icon={faFastBackward}/> */}
                            First
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === 1}
                            onClick={prevPage}
                        >
                            {/*<Icon icon={faStepBackward}/>*/}
                            Prev
                        </Button>
                        {/*    </InputGroup.Prepend>*/}
                        {/*</InputGroup>*/}
                        <FormControl
                            className={"page-num bg-dark"}
                            name="currentPage"
                            value={currentPage}
                            onChange={changePage}
                        />
                        {/*<InputGroup.Append>*/}
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === totalPages}
                            onClick={nextPage}
                        >
                            {/*<Icon icon={faStepForward}/> */}
                            Next
                        </Button>
                        <Button
                            type="button"
                            variant="outline-info"
                            disabled={currentPage === totalPages}
                            onClick={lastPage}
                        >
                            {/*<Icon icon={faFastForward}/> */}
                            Last
                        </Button>
                        {/*</InputGroup.Append>*/}
                        {/*</InputGroup>*/}
                    </div>
                </div>}
            </TableContainer>
            {/* <div>*/}
            {/*    {bookMarks.length > 0 &&*/}
            {/*    <div>*/}
            {/*        <div style={{float: "left"}}>*/}
            {/*            Showing Page {currentPage} of {totalPages}*/}
            {/*        </div>*/}
            {/*        <div style={{float: "right"}}>*/}
            {/*            <InputGroup size="sm">*/}
            {/*                <InputGroup.Prepend>*/}
            {/*                    <Button*/}
            {/*                        type="button"*/}
            {/*                        variant="outline-info"*/}
            {/*                        disabled={currentPage === 1}*/}
            {/*                        onClick={firstPage}*/}
            {/*                    >*/}
            {/*                        <Icon icon={faFastBackward}/> First*/}
            {/*                    </Button>*/}
            {/*                    <Button*/}
            {/*                        type="button"*/}
            {/*                        variant="outline-info"*/}
            {/*                        disabled={currentPage === 1}*/}
            {/*                        onClick={prevPage}*/}
            {/*                    >*/}
            {/*                        <Icon icon={faStepBackward}/> Prev*/}
            {/*                    </Button>*/}
            {/*                </InputGroup.Prepend>*/}
            {/*                <FormControl*/}
            {/*                    className={"page-num bg-dark"}*/}
            {/*                    name="currentPage"*/}
            {/*                    value={currentPage}*/}
            {/*                    onChange={changePage}*/}
            {/*                />*/}
            {/*                <InputGroup.Append>*/}
            {/*                    <Button*/}
            {/*                        type="button"*/}
            {/*                        variant="outline-info"*/}
            {/*                        disabled={currentPage === totalPages}*/}
            {/*                        onClick={nextPage}*/}
            {/*                    >*/}
            {/*                        <Icon icon={faStepForward}/> Next*/}
            {/*                    </Button>*/}
            {/*                    <Button*/}
            {/*                        type="button"*/}
            {/*                        variant="outline-info"*/}
            {/*                        disabled={currentPage === totalPages}*/}
            {/*                        onClick={lastPage}*/}
            {/*                    >*/}
            {/*                        <Icon icon={faFastForward}/> Last*/}
            {/*                    </Button>*/}
            {/*                </InputGroup.Append>*/}
            {/*            </InputGroup>*/}
            {/*        </div>*/}
            {/*    </div>*/}
            {/*    }*/}
            {/*</div>*/}
            {editStatus && <AddBookMark data={editBookMarkData} handleClose={handleClose}/>}
        </div>
    )
}

export default ListOfBookMarks;