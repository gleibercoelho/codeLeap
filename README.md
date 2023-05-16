
# CodeLeap Blog

- en-US
This project is part of a technical code interview for a front-end job at Codeleap. The challenge is to create the code for a blog made available from Figma. Creating, editing and removing blog posts is done through the API available for this challenge.

- pt-BR
Este projeto faz parte de uma entrevista técnica de código para uma vaga de front-end na Codeleap. O desafio é criar o código de um blog disponibilizado a partir do Figma. A criação, edição e remoção dos post do blog é feita através da API disponibilizada para esse desafio.
![App Screenshot](https://github.com/gleibercoelho/codeLeap/blob/master/codelealp/src/assets/images/Home.jpeg)

## tags



![language count](https://img.shields.io/github/languages/count/gleibercoelho/codeLeap)

![top language](https://img.shields.io/github/languages/top/gleibercoelho/codeLeap)


## Authors

- [@gleibercoelho](https://www.github.com/octokatherine)

 

## Stacks

**Front-end:** React, Redux, Typescript, Styled Components, Axios.

**Back-end:** Django(provided by Codeleap)




## GitHub Page

You can check the page running  on:
https://gleibercoelho.github.io/codeleapPage


## Functionalities

- Athentication

there is no real authentication with the backend. Just a string check. Any password will lead to blog page.

- Create posts with API.

You must be logged in as "admin"

- Edit posts with API.

You must be logged in as "admin"

- Delete posts with API.

You must be logged in as "admin"

- Hook useState
- Components
- Session Storage

Stores the logged in user. Sends the logged in user to the Redux Store. Stores the navigation page and reloads the navigation from the last page.

- Redux Store

Stores the logged in user. reloads the logged in user from session storage when reloading the page.

-Logout

Removes the user from redux store and session storage.

- Axios




## Learnings

- en-US
This was my first project developed using session storage. I was able to learn how to send information stored in the Session to Redux, since it loses the store information when the page is reloaded. I learned how to better use pagination hooks to store the page the user is browsing in session storage so that he can return to the same page if he reloads the browser. More learnings with redux features.This was the first React project I published on GitHub Pages. I learned how to make routes available beyond the main page.

- pt-BR
Este foi meu primeiro projeto desenvolvido usando session storage. Eu pude aprender como enviar informações armazenadas na Session para o Redux, uma vez que ele perde as informações da store quando a página é recarregada. Aprendi a usar melhor os hooks de paginação para armazenar na session storage a página em que o usuário está navegando para que ele possa voltar a mesma página caso recarregue o navegador. Mais aprendizados com funcionalidades do redux. Este foi o primeiro projeto em React que eu publiquei no GitHub Pages. Aprendi como disponibilizar rotas além da página principal.

## install

To get started, clone this repository:
```bash
  git clone  
```
Install Codeleap with npm on main page:
```bash
  cd codeleap   
```
then:
```bash  
  npm install  
```
## Deploy

To deploy this project run in the main folder:

```bash
  npm run dev
```
 


## Screenshots

- Login
![App Screenshot](https://github.com/gleibercoelho/codeLeap/blob/master/codelealp/src/assets/images/Home.jpeg)

- Blog page
![App Screenshot](https://github.com/gleibercoelho/codeLeap/blob/master/codelealp/src/assets/images/Blog%20Page.jpeg)

- Create post
![App Screenshot](https://github.com/gleibercoelho/codeLeap/blob/master/codelealp/src/assets/images/Create%20Post.jpeg)

- Edit post
![App Screenshot](https://github.com/gleibercoelho/codeLeap/blob/master/codelealp/src/assets/images/Edit%20Post.jpeg)

- Delete post
![App Screenshot](https://github.com/gleibercoelho/codeLeap/blob/master/codelealp/src/assets/images/Delete%20Post.jpeg)




## Feedback

If you have any feedback, please let us know via gleiberfelipe@hotmail.com


## 🚀 About Me
i'm a passionate fullstack dev Jr living in Brazil. You can check if my locate change by GitHub profile or Linkedin
