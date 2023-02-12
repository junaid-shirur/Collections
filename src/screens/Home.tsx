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
import { Images as Img } from '../actions/types';
import { useMutation, useQuery, useQueryClient } from "react-query";
import { deleteImages, fetchImages, updateFavourite } from '../remote';
import { ToastContainer, toast } from 'react-toastify';
import Navbar from '../components/Navbar';
import { useLocation } from 'react-router-dom';
import Config from '../config'
import deleteIcon from '../assets/delete_icon.png'
import favIcon from '../assets/fav_icon.png'

function App() {

  const [modalShow, setModalShow] = useState(false);
  const location = useLocation().pathname
  const dispatch = useAppDispatch()

  const { discover, favourites } = Config.reader.routes

  const state = useAppSelector(state => state.images)
  let stateImgs = location == discover ? state.Images : state.favourites
  const { data, status, error } = useQuery('getImages', { queryFn: fetchImages, enabled: !!stateImgs.length == 0 })

  useEffect(() => {
    console.log(data);
    if (status == 'success' && stateImgs.length == 0)
      dispatch(getImages(data))

    if (status == 'error')
      toast('Something went wrong', { type: 'error' })
  }, [data])
  

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
      border: 1px solid;
      &:hover{
            border: 1px solid;
        };
    }
   
  `
  const filterImages = (filterBy: string) => {
    var imageList: any = Object.assign([], state)

    if (filterBy === 'title') {
      imageList.sort((a: any, b: any) => {
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

      imageList.sort((a: any, b: any) => {

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

      imageList.sort((a: any, b: any) => {

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

  const onSelectAll = (e) => {
    e.preventDefault()
    setselectAll(!selectAll)
    let temp = {}
    stateImgs && stateImgs.forEach((img: Img) => {
      temp = { ...temp, [img._id]: !selectAll ? img._id : null }
    });
    setSelectedDelete(temp)
  }
  // console.log(selectedDelete);

  const mutation = useMutation(deleteImages, {
    onSuccess(data, variables, context) {
      toast('delete images successfull', { type: 'success' })
      dispatch(deleteImage(selectedDelete))
    },
    onError(error: any, variables, context) {
      toast('could not delete images' + error.message, { type: 'error' })
    },
  })

  const favMutation = useMutation(updateFavourite, {
    onSuccess(data, variables, context) {
      console.log(data, variables, context);
      const msg = !variables.add ? 'successFully removed from favourite' : 'added to favourite successfull'
      toast(msg, { type: 'success' })
      // dispatch(deleteImage(selectedDelete))
    },
    onError(error: any, variables, context) {
      toast('could not add to favourite' + error.message, { type: 'error' })
    },
  })

  const selectedImgs = Object.keys(selectedDelete).map(e => selectedDelete[e])
  const handleDelete = (e) => mutation.mutate(selectedImgs)
  const handleFav = () => favMutation.mutate({ imgIds: selectedImgs, add: location != favourites ? true : false })
  const DynamicDisable = () => {

    for (let item in selectedDelete) {
      return !selectedDelete[item]
    }
    return true
  }

  return (

    <div style={{ backgroundColor: "#F5F5F5" }} >
      <ToastContainer />
      <Navbar favCount={state.favourites.length} />
      <Container>
        <div>
          <span>Create,Edit and manage the media on your community</span>
        </div>
        {/* ToDo: remove inline styles */}
        {location != favourites && <button style={{ fontWeight: 500 }} className="btn" onClick={() => setModalShow(true)}>Add Image</button>}
      </Container>

      <Wrapper>

        <SearchBar>
          <label htmlFor='selectAllInput'>
            select All{" "}
            <input id='selectAllInput' onChange={onSelectAll} checked={selectAll} type="checkbox" />{" "}
            {location != favourites && <button className="btn" disabled={DynamicDisable()} onClick={handleDelete}><img src={deleteIcon}/></button>}
             <button className="btn" disabled={DynamicDisable()} onClick={handleFav}><img src={location != favourites ? favIcon : deleteIcon}/></button>
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
          images={stateImgs}
          isLoading={status == 'loading'}
          selectedDelete={selectedDelete}
          selectAll={selectAll}
          setSelectedDelete={setSelectedDelete}
          location={location}
        />
    </div>
  );
}

export default App;
