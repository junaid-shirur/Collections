import React, { useState, useEffect } from 'react'
import Modal from 'react-bootstrap/Modal'
import { Button } from 'react-bootstrap'
import styled from 'styled-components'

import AddPopUp from './AddPopUp';
import axios from 'axios';


const HeaderWrapper = styled.div`
    h3{
        color: #DCDCDC;
    }
    input{
        margin-right: 15px;
        border: 1px aliceblue solid;
    }
    button{
        background-color: aliceblue;
        border-radius: 5px;
        border: none;
    }
    span{
        color: #DCDCDC;
        font-size: 13px;
    }

`
const Wrapper = styled.div`
display: flex;
flex-wrap: wrap;
position: relative;
padding: 10px;
border: 2px grey dotted;
border-radius: 9px;
div{
    margin: auto;
    display: grid;
    
}
#button{
    background-color: white;
    border: none;
    &:hover{
       background-color: #DCDCDC;
       border-radius: 9px;

    }
}
img{
    margin-bottom: 5px;
    width: 160px;
    height: 100px;
    border-radius: 9px;
    cursor: pointer;
}
`
export default function SelectPopUp(props: any) {
    useEffect(() => {
        fetchImages("random")
    }, [])


    const [images, setimages] = useState<any>()

    const [name, setname] = useState("waterfalls")

    const [addPopUp, setaddPopUp] = useState({
        isPop: false,
        imageId: "",
    })

    const fetchImages = async (search: string) => {
        const response: any = await axios.get(`https://api.unsplash.com/search/photos/?&query=${search}&count=20&per_page=20&client_id=vXO48hCN-bQrna6DYg_yzZlpX_cdb51VHLEzJEDCML8`)
            .catch((err) => {
                console.log(err);
            })
        setimages(response.data.results)
    }

    return (
        <Modal
            {...props}
            size="xl"
            aria-labelledby="contained-modal-title-vcenter"
            centered
            animation={true}
        >
            <Modal.Header closeButton>
                <HeaderWrapper>
                    <h3>Select Image</h3>
                    <span>search and select an image</span>
                    <div>
                        <input type="text" onChange={(e) => setname(e.target.value)} placeholder="search" />
                        <button className="btn" onClick={() => fetchImages(name)}>search</button>
                    </div>
                </HeaderWrapper>
            </Modal.Header>
            <Modal.Body>
                <Wrapper>
                    {images ? images.map((img:any) => {

                        return (
                            <div key={img.id}>
                                <button id="button" onClick={() => {
                                    setaddPopUp({ ...addPopUp, isPop: !addPopUp.isPop, imageId: img.id })
                                }}>
                                    <img src={img.urls.thumb} alt={img.alt_description} />
                                </button>
                                {addPopUp.isPop ?
                                    <AddPopUp
                                        show={true}
                                        onHide={() => {
                                            setaddPopUp({
                                                ...addPopUp, isPop: false
                                            });
                                            props.onHide()
                                        }}
                                        data={images}
                                        id={addPopUp.imageId}

                                    /> : <></>}
                            </div>
                        )
                    }) : <p>loading...</p>}
                </Wrapper>
            </Modal.Body>
            <Modal.Footer>
                <Button onClick={props.onHide}>select</Button>
            </Modal.Footer>
        </Modal>

    )
}
