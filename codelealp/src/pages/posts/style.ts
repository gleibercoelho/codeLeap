import styled from "styled-components";


export const PostsDiv = styled.div`

    background-color: #040404;
    display: flex;
    flex-direction: column;
    align-content: center;
    font-family: 'Heebo', Helvetica;
    color: #cdcdcd;



    ul{
        list-style: none;
        margin: 1.25rem;
    
    

    li{
        background-color: rgba(249,249,249, 0.05);
        padding-left: 1.875rem;
        margin: 1.25rem 0; 
        
    }

    span{
        width: 90%;
        color: #7695EC;
        font-size: 2.5rem;
        background: linear-gradient(45deg, #8481FA, #38C9C8);
        background-image: linear-gradient(45deg, rgb(132, 129, 250), rgb(56, 201, 200));
        background-clip: text;
        -webkit-background-clip: text;
        -webkit-text-fill-color: transparent;
        flex-wrap: wrap;
        word-wrap: break-word
    
    }

    p{
        padding-bottom: 1.875rem;
        padding-right: 1.875rem;
        text-align: justify;    
        word-wrap: break-word   
        
        
    }

    div{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        margin-right: 1.875rem;

        p{
        padding-bottom: .9375rem;
            
        }
    }

    div.actions button{
        margin: .625rem;
        padding: 0;
        background-color: none;
        background: none;
        border: none;
        cursor: pointer;
    }
 
}

div.newPost{
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        color: black;
        
        background: linear-gradient(45deg, #8481FA, #38C9C8);
        background-image: linear-gradient(45deg, rgb(132, 129, 250), rgb(56, 201, 200));

    button{
        
        color: white;
        opacity: 0.9;
        display: flex;
        flex-direction: column;
        align-items: center;
        margin: .625rem;
        padding: .3125rem;
        justify-content: center;       
        border: none;
        border-radius: .3125rem;
        width: 6.25rem;
        height: 1.25rem;
        float: inline-start;
        background-color: #040404;
        
        &:hover{
        background: linear-gradient(45deg, #8481FA, #38C9C8);
        background-image: linear-gradient(45deg, rgb(132, 129, 250), rgb(56, 201, 200));
    }

        }

    
}

div.pagination{

        display: flex;
        flex-direction: row;
        justify-content: center;

    button{   
    
        color: black;
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
        width: 3.125rem;
        height: 1.25rem;
        float: inline-start;
        cursor: pointer;

      &:disabled{
        background: rgb(65,193,206);
        opacity: 0.3;
        color: white;
        cursor: default;
      }
    
    }
}

`;