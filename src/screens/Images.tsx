import React from 'react'
import styled from '@emotion/styled'
import { Flex } from 'rebass'
import { useAppSelector } from '../reducers/hooks'
import { Images as Img } from '../actions/types'


const Images: React.FC<any> = ({ selectedDelete, setSelectedDelete, selectAll }) => {
  const state = useAppSelector(state => state.images.Images)
  console.log(state)
  return (
    <>
      <Container>
        {state.length && state.map((img: Img) => (
          <Wrapper>
            <Checkbox
              type="checkbox"
              id={img.uid}
              checked={(selectedDelete[img.uid] && selectedDelete[img.uid].isChecked) || selectAll}
              onChange={(e: any) => { setSelectedDelete({ ...selectedDelete, [img.uid]: { isChecked: e.target.checked } }) }}
            />
            <ImgWraper href={img.url} download>
              <Image src={img.thumbnail} alt={img.description} />
              <Description>
                <span>{img.name}</span>
                <p>{img.createdAt}</p>
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
}))

const Description = styled(Flex)<any>(({ theme }) => ({
  justifyContent: 'space-between',
}))

export default Images