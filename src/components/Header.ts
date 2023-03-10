
import styled from 'styled-components'
export const SearchBar = styled.div`

    display:flex;
    border: 0.5px aliceblue solid;
    margin: auto;
    padding: 5px;
    border-radius: 9px;
    justify-content: space-between;
    background-color: white;
    align-items: center;
    label{
        display: flex;
        align-items: center;
        gap: 5px;
        button{
        margin-right:3px;
        border: none;
        background-color: white;
        color: black;
        margin-top: 3px;
        border-radius: 5px;
        &:hover{
            background-color: aliceblue;
        };
        &:disabled {
         backgroundColor: "red";
         border: none
        };
    }
    }
    input{
        border: 1px lightgray solid;
        border-radius: 5px;
        cursor: pointer;
    }

`
export const Wrapper = styled.div`
    margin: 10px;
    padding: 10px;
    display: block;
    border: 1px aliceblue solid;
    border-radius: 9px;
    background-color: white;
    align-items: center;

`
export const SortingButtons = styled.div`
    display: flex;
    justify-content: flex-start;
    border-radius: 9px;
    background-color: white;
    align-items: center;
    button{
        margin-right:3px;
        border: 1px aliceblue solid;
        background-color: white;
        color: black;
        margin-top: 3px;
        border-radius: 5px;
        &:hover{
            background-color: aliceblue;

        }
    }
    div{
        margin-right: 5px;
        border-right: 1px aliceblue solid;
        margin-left: 5px;
        background-color: white;

    }
`

export const Container = styled.div`
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

`