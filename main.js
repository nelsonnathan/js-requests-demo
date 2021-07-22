//const { default: axios } = require("axios")

//const { default: axios } = require("axios")

//const { default: axios } = require("axios")

//const { default: axios } = require("axios")

console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

// const baseURL = 

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}


function getAllCharacters() {
  clearCharacters()
  axios.get(`http://localhost:4000/characters`)
    .then(function(res){
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }
    })
    .catch(err => console.log(err))
}


function getSingleChar(event) {
  clearCharacters()
  axios.get(`http://localhost:4000/character/${event.target.id}`)
    .then(res => {
      createCharacterCard(res.data)
    })
    .catch(err => console.log(err))
}

function getOldChars(event) {
  event.preventDefault()
  clearCharacters()
  axios.get(`http://localhost:4000/character?age=${ageInput.value}`)
    .then(res => {
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }
    })
    .catch(err => console.log(err))
}


function createNewChar(event){
  event.preventDefault()
  clearCharacters()

  const newLikes = newLikesText.value.split(', ')

  const body = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes

  }

  axios.post(`http://localhost:4000/character`, body)
    .then(res => {
      for (let i = 0; i < res.data.length; i++) {
        createCharacterCard(res.data[i])
      }
    })
    .catch(err => console.log(err))
} 


getAllBtn.addEventListener('click', getAllCharacters)

for (i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener('click', getSingleChar)
}

ageForm.addEventListener('submit', getOldChars)

createForm.addEventListener('submit', createNewChar)