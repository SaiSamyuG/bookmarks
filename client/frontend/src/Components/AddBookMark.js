import {useState} from "react";
import {Button, Container, Grid, TextField} from "@material-ui/core";
import BookMarkService from "../BookMarkService";

const AddBookMark = (props) => {
    const [id, setId] = useState(props.data?.id || null)
    const [title, setTitle] = useState(props.data?.title || "")
    const [link, setLink] = useState(props.data?.link || "")

    async function handleSubmit(event) {
        event.preventDefault();
        await BookMarkService.add({
            id: id ? id : null,
            title: title,
            link: link
        })
        props.handleClose();
    }

    return (
        <div>
            <form>
                <Container style={{paddingTop: "70px", display: 'flex', justifyContent: 'center'}}>
                    <Grid>
                        <Grid item xs={3}>
                            <label htmlFor={title}>
                                Title*
                            </label>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                id="title"
                                value={title}
                                onChange={(event) => setTitle(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={3}>
                            <label htmlFor={title}>
                                Link*
                            </label>
                        </Grid>
                        <Grid item xs={9}>
                            <TextField
                                id="link"
                                value={link}
                                onChange={(event) => setLink(event.target.value)}
                            />
                        </Grid>
                        <Grid item xs={4}>

                        </Grid>
                        <Grid item xs={3}>
                            <Button
                                id="add-bookmark"
                                variant="contained"
                                size="large"
                                color="primary"
                                style={{textTransform: "capitalize"}}
                                onClick={handleSubmit}>
                                Add
                            </Button>
                        </Grid>
                    </Grid>
                </Container>
            </form>
        </div>
    )

}
export default AddBookMark