import { catsData } from "/data.js"
const emotionRadios = document.getElementById('emotion-radios')

emotionRadios.addEventListener('change', highlightCheckedOption)

function highlightCheckedOption(e){
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
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

