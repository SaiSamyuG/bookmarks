import axios from "axios";

const BookMarkService = () => {
    return {
        list: async () => {
            return await axios.get(`http://localhost:8080/bookmarks/list`);
        },
        add: async (bookMark) => {
            console.log("in add.js");
            console.log(bookMark);
            return await axios.post(`http://localhost:8080/bookmarks/add`, bookMark)
        },
        remove: async (id) => {
            return await axios.delete(`http://localhost:8080/bookmarks/${id}`)
        }
    }
}
export default BookMarkService();