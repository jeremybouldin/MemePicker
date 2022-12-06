import { catsData } from "/data.js"
const emotionRadios = document.getElementById('emotion-radios')
const getImgBtn = document.getElementById('get-image-btn')
const gifsOnlyCheckbox = document.getElementById('gifs-only-option')


getImgBtn.addEventListener('click', renderCat)
emotionRadios.addEventListener('change', highlightCheckedOption)


function highlightCheckedOption(e){
    // first remove the highlighting from all other radios
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    
    // next assign highlighting to the selected radio
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

//returns an array matching user's criteria
function getMatchingCatsArray() {
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyCheckbox.checked
        const matchingCatsArray = catsData.filter(function(cat){
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            } else {
                return cat.emotionTags.includes(selectedEmotion)
            }
        })
        return matchingCatsArray
    }
}

//Narrows down the array to a single object selected randomly
function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    if (catsArray.length === 1){
        console.log(catsArray[0])
    } else {
        const randomNumber = Math.floor(Math.random()*catsArray.length)
        return catsArray[randomNumber]
    }
}

//renders out the cat image/gif
function renderCat(){
    getSingleCatObject()
}

function getEmotionsArray(cats) {
    const emotionsArray=[]
    for (const cat of cats) {
        for (const emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

function renderEmotionRadios(cats) {
    const emotions = getEmotionsArray(cats)
    let radioItems = ''
    for (const emotion of emotions) {
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
                type = "radio"
                id = "${emotion}"
                value = "${emotion}"
                name = "emotions"
            >
        </div>
        `
    }
    emotionRadios.innerHTML = radioItems  
}

renderEmotionRadios(catsData)

