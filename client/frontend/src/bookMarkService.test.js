import axios from "axios";
import BookMarkService from "./BookMarkService";

jest.mock("axios");
describe("com.example.bookmark service tests", () => {
    it("should get list of all bookmarks", async () => {
        const data = [{id: 1, title: "one", link: "one.com"}];

        axios.get.mockImplementationOnce(() => {
            Promise.resolve(data)
        });
        await expect(BookMarkService.list).resolves.toEqual(data);
        expect(axios.get).toHaveBeenCalledWith("http://localhost:8080/bookmarks/list")
    })

    it("should save details of bookmark", async () => {
        const bookMark = {
            title: "new",
            link: "new.com"
        }
        axios.post.mockImplementationOnce(() => Promise.resolve(bookMark));

        await expect(
            BookMarkService.add(bookMark)
        ).resolves.toEqual(bookMark);
    })

    it("should delete details of bookmark by id",()=>{

    })
})