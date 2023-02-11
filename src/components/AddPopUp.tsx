import React, { useEffect, useState } from 'react'
import { Modal, Button } from 'react-bootstrap';
import styled from 'styled-components';
import { Images } from '../actions/types';
import { Axios } from '../config';
import { uploadImage } from '../reducers/common';
import { useAppDispatch } from '../reducers/hooks';


const ImageHeader = styled.div`
h3{
    color: #DCDCDC;
}
span{
        color: #DCDCDC;
        font-size: 13px;
    }

`
const ImageWrap = styled.div`
border: 2px grey dotted;
border-radius: 9px;
display: block;
img{
    width: 100%;
    height: 380px;
    border-radius: 9px;
    padding: 10px;
    border-radius: 15px;
}
.queries{
    display: flex;
    justify-content: space-around;
    div{
       
        input{
            width: 100%;
            border: 1px grey solid;
            border-radius: 3px;
        }
        p{
            font-weight: 150;
        }
        span{
            color: grey;
        }
    }
}

`
const postImage = async (image: Images) => {
  return await Axios.post('/images/add', image)
        .then(res => console.log(res))
        .catch(err => console.log(err,'error'))
}

export default function AddPopUp(props: any) {
    const [image, setImage] = useState<any>()

    const [description, setdescription] = useState<any>()
    useEffect(() => {
        const image = props.data.filter((img: any) => img.id === props.id)
        setImage(image[0])
    }, [])    
    const dispatch = useAppDispatch()
    const handleSave = async (e: any) => {
        e.preventDefault()
        let img: Images = {
            uid: image.id,
            createdAt: Date.now(),
            name: description,
            description: image.alt_description,
            url: image.urls.full,
            thumbnail: image.urls.thumb,
            userId: 'password'
        }
       await postImage(img)
        dispatch(uploadImage(img))
        props.onHide()
    }

    return (
        <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
        >
            <Modal.Header closeButton>
                <ImageHeader>
                    <h3>Add Image</h3>
                    <span>Edit your media files here</span>
                </ImageHeader>
            </Modal.Header>
            <Modal.Body>
                {image && <ImageWrap>
                    <img src={image.urls.thumb} alt={image.user.name} />
                    <div className="queries">
                        <div>
                            <span>Title</span> <br />
                            <input type="text" onChange={(e) => setdescription(e.target.value)} defaultValue={image.user.name} />
                        </div>
                        <div>
                            <span>Type</span>
                            <p>JPG</p>
                        </div>
                        <div>
                            <span>Size</span>
                            <p>400kb</p>
                        </div>
                        <div>
                            <span>Dimension</span>
                            <p>{image.width + " x " + image.height}</p>
                        </div>
                    </div>
                </ImageWrap>}

            </Modal.Body>
            <Modal.Footer>
                <Button onClick={handleSave}>Submit</Button>
            </Modal.Footer>
        </Modal>
    )
}
