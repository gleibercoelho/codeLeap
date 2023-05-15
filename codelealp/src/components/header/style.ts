import styled from "styled-components"

export const HeaderDiv = styled.div`

    display: flex;
    flex-direction: row;
    align-items: center;
    width: 100%;
    justify-content: space-between;  

    div.info{
        display: flex;
        flex-direction: row;
        flex-wrap: nowrap;
        justify-content: space-between;
        
        width: 100%;
        word-wrap: break-word;
        
    img{
        width: 6.25rem;
        object-fit: contain;
    }
}

    button{
        font-family: 'Alata', sans-serif;
        color: #cdcdcd;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: .625rem;
        padding: .3125rem;
        justify-content: center;
        background: rgb(65,193,206);
        background: linear-gradient(225deg, rgba(65,193,206,1) 0%, rgba(122,138,244,1) 100%);
        border: none;
        border-radius: .3125rem;
        width: 6.25rem;
        height: 1.25rem;
        float: inline-start;
        
}

    @media only screen and (max-width: 48rem) {
            
    h2{
        font-size: 1.125rem;
}
}


`