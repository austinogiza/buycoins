const gh = "ghp_"

const th = "QyzLwRln5R25v"

const end = "T0Dqq2JHgM4RL813U3r6S6h"

const formSubmit = document.querySelector(".login")
const formText = document.querySelector(".form-value")
const formError = document.querySelector(".form_error")
const formPass = document.querySelector(".form_passed")
const formSvg = document.querySelector(".form_error svg ")
const formErrorText = document.querySelector(".form_error h1")
const button = document.querySelector(".button")
const buttonText = document.querySelector(".button p")



const loading =()=>{
    buttonText.style.display = 'none'
    button.innerHTML = `<div class="loader"><img src="./assets/images/octocat-spinner-128.gif" alt=""></div>`
}

const stopLoader = () => {
    buttonText.style.display = 'flex';
    button.innerHTML = `<p>View Repositories</p>`
  }
const submitForm =e=>{
e.preventDefault();
const formValue = formText.value.toLowerCase().trim();

formError.classList.remove("form_error_show")
loading()

if(formValue===""){
    
    formError.classList.add("form_error_show")
    formError.innerHTML = `
    <h1>Please provide a value</h1>`
    stopLoader()
}

else{



  //api call start
  const baseUrl = 'https://api.github.com/graphql'


  //graphql query
const getUserRepo = {
    "query":`
    query { 
        user(login:"${formValue}"){
          avatarUrl,
          name,
  }
}
      
    `
    
  }
  
  
  const headers ={
    "Content-Type": "application/json",
    Authorization: "bearer " + `${gh}${th}${end}`
  }
  
  //api fetch
  fetch(baseUrl, {
  method: "POST",
  headers: headers,
  body: JSON.stringify(getUserRepo)
  }).then(res=>{

 
    const info = res.json().then(res=>
        {

      

        if(res.data.user === null){
            formPass.classList.remove("form_passed_show")
       
            formError.classList.add("form_error_show")
    formError.innerHTML = `
    <h1>${formValue} does not exist. Please enter a new username</h1>`
    stopLoader();
        }
        
        else{
            formError.classList.remove("form_error_show")
            formPass.classList.add("form_passed_show")
            formPass.innerHTML = `
            <h1>${formValue} exists as a GitHub user, kindly wait as I fetch his repo for you</h1>`
      
            localStorage.setItem("austinOgiza", JSON.stringify(formValue))
      
            location.assign('/repo.html')
        }
        }
        
        )

  })
    
}

}

const removeError =()=>{
    formError.classList.remove("form_error_show")
}

formSvg.addEventListener('click', removeError)
formSubmit.addEventListener('submit', submitForm)
