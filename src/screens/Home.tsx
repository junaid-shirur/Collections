// @ts-nocheck
import React, { useState, useEffect } from 'react';
import Images from './Images'
import SelectPopUp from '../components/SelectPopUp';
import { deleteImage, filter, getImages } from '../reducers/common';
import styled from '@emotion/styled'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Wrapper, SearchBar, SortingButtons } from '../components/Header';
import { useAppDispatch, useAppSelector } from '../reducers/hooks';
import { Axios } from '../config';
import { Images  as Img } from '../actions/types';
// import DeleteOutlinedIcon from '@material-ui/icons/DeleteOutlined';

function App() {
  const name = "office"

  const [modalShow, setModalShow] = useState(false);

  const dispatch = useAppDispatch()
  const fetchImages = async () => {
    await Axios.get('/images')
    .then(res => {
      dispatch(getImages(res.data as Img))
    })
    .catch(err => console.log(err,'error'))
  }
  useEffect(() => {
    fetchImages()
  }, [])

  const Container = styled.div`
    display: flex;
    justify-content: space-between;
    padding: 10px;
    margin: auto;
    align-items: center;
    h4{
      font-family: 'Times New Roman', Times, serif;
    }
    span{
      color: grey;
      font-size: small;
    }
    button{
      background-color: #24a0ed ;
      border: none;
      border-radius: 9px;
      cursor: pointer;
      font-weight: 200;
      color: white;
    }
   
  `
  const state = []

  const filterImages = (filterBy: string) => {
    var imageList:any = Object.assign([], state)

    if (filterBy === 'title') {
      imageList.sort((a:any, b:any) => {
        if (a.user.name.toLowerCase() < b.user.name.toLowerCase()) {
          return -1
        }
        if (a.user.name.toLowerCase() > b.user.name.toLowerCase()) {
          return 1
        }
        return 0
      })
    }
    else if (filterBy === 'date') {

      imageList.sort((a:any, b:any) => {

        if (a.created_at < b.created_at) {
          return -1
        }
        if (a.created_at > b.created_at) {
          return 1
        }
        return 0
      })
    }
    else {

      imageList.sort((a:any, b:any) => {

        if (a.height * a.width < b.height * a.width) {
          return -1
        }
        if (a.height * a.width > b.height * a.width) {
          return 1
        }
        return 0
      })
    }

    dispatch(filter(imageList))
  }

  const [searchText, setSearchText] = useState()

  const [selectedDelete, setSelectedDelete] = useState<any>([]);
  const [selectAll, setselectAll] = useState<any>(false);

  const onSelectAll = () => {
    var temp = {}
   state && state.forEach((img: any) => {
      temp = { ...temp, [img.id]: { isChecked: !selectAll } }
    });
    setSelectedDelete(temp)
    setselectAll(!selectAll)
  }

  const handleDelete = () => {
    const filteredData = state.filter((img:any) =>!(selectedDelete[img.id] && selectedDelete[img.id].isChecked))
    dispatch(deleteImage(filteredData))
  }

  const DynamicDisable=()=>{

    for (let item in selectedDelete) {
      return !selectedDelete[item].isChecked
    }
    return true
  }

  return (

    <div style={{ backgroundColor: "#F5F5F5" }} >

      <Container>
        <div>
          <h4>Media Library</h4>
          <span>Create,Edit and manage the media on your community</span>
        </div>
        {/* ToDo: remove inline styles */}
        <button style={{fontWeight: 500}} className="btn" onClick={() => setModalShow(true)}>Add Image</button>
      </Container>

      <Wrapper>

        <SearchBar>
          <label>
            select All{" "}
            <input onChange={onSelectAll} checked={selectAll} type="checkbox" />{" "}
            <button disabled={DynamicDisable()} onClick={handleDelete}>delete</button>
          </label>
          {/* <input type="text" value={searchText} placeholder="search..." onChange={handleChange} /> */}
        </SearchBar>

        <SortingButtons>
          <div>
            sort by :{" "}
          </div>
          <button className="btn" onClick={() => filterImages('title')}>Title</button>
          <button className="btn" onClick={() => filterImages('date')}>date</button>
          <button className="btn" onClick={() => filterImages('size')}>size</button>
        </SortingButtons>

      </Wrapper>

      <SelectPopUp
        show={modalShow}
        onHide={() => setModalShow(false)}
      />

      <Images
        data={state}
        selectedDelete={selectedDelete}
        selectAll={selectAll}
        setSelectedDelete={setSelectedDelete}
      />

    </div>
  );
}

export default App;
