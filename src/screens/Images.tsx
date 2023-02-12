import React from 'react'
import styled from '@emotion/styled'
import { Flex } from 'rebass'
import { Images as Img } from '../actions/types'
import { Spinner } from 'react-bootstrap'
import favIcn from '../assets/fav_icon.png'

const Images: React.FC<any> = ({ selectedDelete, setSelectedDelete, images, isLoading, location }) => {
  if (isLoading) {
    return (
      <Container>
        <Spinner />
      </Container>
    )
  }
  return (
    <>
      <Container>
        {images.length && images.map((img: Img) => (
          <Wrapper key={img._id}>
            <Checkbox
              type="checkbox"
              id={img._id}
              checked={ selectedDelete[img._id] ? true : false}
              onChange={(e: any) => {
                setSelectedDelete({ ...selectedDelete, [img._id]: !selectedDelete?.[img._id] ? img._id : null })
              }}
            />
            <ImgWraper href={img.url} download>
              <WrapImage>
              <Image src={img.thumbnail} alt={img.description} />
              {(img.favourite && location != '/favourites') && <Fav src={favIcn} />}
              </WrapImage>
              <Description>
                <span>{img.name}</span>
                <p>{new Date(img.createdAt).toLocaleDateString()}</p>
              </Description>
            </ImgWraper>
          </Wrapper>
        ))}
      </Container>
    </>
  )
}

const Container = styled(Flex)<any>(({ theme }) => ({
  flexWrap: 'wrap',
  position: 'relative'
}))

const Wrapper = styled.div<any>(({ theme }) => ({
  padding: '10px',
  margin: 'auto',
  display: 'grid',
  '&:hover': {
    backgroundColor: '#DCDCDC',
    borderRadius: '9px',
    transition: '0.3s ease'
  }
}))

const Checkbox = styled.input<any>(({ theme }) => ({
  position: 'absolute',
  borderRadius: '9px',
  height: '22px',
  width: '23px',
  cursor: 'pointer',
  zIndex: 15
}))

const ImgWraper = styled.a<any>(({ theme }) => ({
  color: 'black',
  textDecoration: 'none',
  display: 'grid',
  '&:hover':{
    color: 'black'
  }
}))

const Image = styled.img<any>(({ theme }) => ({
  margin: '5px',
  width: '260px',
  height: '180px',
  borderRadius: '9px',
  position: 'relative'
}))

const Description = styled(Flex)<any>(({ theme }) => ({
  justifyContent: 'space-between',
}))

const WrapImage = styled(Flex)<any>(({ theme }) => ({
  justifyContent: 'end',
}))


const Fav = styled.img<any>(({ theme }) => ({
  width: 'fit - content',
  height: 'fit - content',
  position: 'absolute',
  zIndex: 10,
  cursor: 'default'
}))

export default Images