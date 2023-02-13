import styled from '@emotion/styled'
import React from 'react'
import { Button } from 'react-bootstrap'
import { Box, Flex } from 'rebass'

const EmptyState: React.FC<any> = ({
    isError = false,
    msg,
    onclick
}) => {

    return (
        <>
            <Container>
                <Text>{msg}</Text>
                <ActBtn variant="primary" onClick={() => onclick()}>{isError ? 'Retry' : 'Add Image'}</ActBtn>
            </Container>
        </>
    )
}

const Container = styled(Box)<any>(({ theme }) => ({
    height: '100%',
    width: '100%',
    textAlign: 'center',
    padding: '50px'
}))

const Text = styled.p<any>(({ theme }) => ({
    fontSize: '22px',
    fontFamily: 'inherit'
}))

const ActBtn = styled(Button)<any>(({ theme }) => ({

}))


export default EmptyState