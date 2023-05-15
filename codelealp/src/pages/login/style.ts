import styled from 'styled-components';


export const LoginDiv = styled.div`

      background-color: #040404;
      display: flex;
      flex-direction: column;
      height: 100vh;
      align-content: center;

img{
      width: 90%;
      align-self: center;
      margin-top: 6.25rem;
}

form{
    
      padding: .625rem;
      border-radius: .625rem;
      display: flex;   
      align-self: center;
      justify-content: center;
      font-family: "Alata";
      font-weight: 400;
      color: #cdcdcd;

  :hover{

      background-color: rgba(249,249,249, 0.05);
}
    input{

      margin: .625rem;
        
       &:focus {
      outline: .125rem solid rgb(65,193,206);
      outline: .125rem solid linear-gradient(225deg, rgba(65,193,206,1) 0%, rgba(122,138,244,1) 50%);
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

    &:disabled{
      background: rgb(65,193,206);
      opacity: 0.2;
      color: black
}
    
}

}
`;


