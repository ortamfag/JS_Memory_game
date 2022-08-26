let choiceElements = []
let choiceHistory = []
let gameWrapper = document.querySelector('.game__wrapper')
let gameButton = document.querySelector('.game__button')

let counterRightAnswers = 0
let counterWrongAnswers = 0
let rightAnswers = document.querySelector('#right')
let wrongAnswers = document.querySelector('#wrong')

let numberArr = new Set()
const matrixLength = 12

for (let i = 0; numberArr.size !== matrixLength / 2; i++) {
    numberArr.add(Math.floor(Math.random() * (10 - 1) + 1))
}

const printNumber = () => {
    return [...numberArr].concat([...numberArr]).sort(() => {
        return -1
    }).map((el) => {
        gameWrapper.innerHTML += `<div data-item="${el}" class="game__item disactive"><p>${el}</p></div>`
    })
}

printNumber()

let elemStorage = document.querySelectorAll('.game__item');


elemStorage.forEach((event) => {
    event.addEventListener('click', () => {
        event.classList.add('finally')
        choiceHistory.push(event)
        choiceElements.push(event.dataset.item)


        if (choiceElements[1] !== undefined) {
            if (choiceElements[0] === choiceElements[1]) {
                console.log('правильно')
                choiceElements = []
                choiceHistory[0].classList.add('right')
                choiceHistory[1].classList.add('right')
                choiceHistory = []
                counterRightAnswers++
                rightAnswers.innerHTML = counterRightAnswers

            }

            if (choiceElements[0] !== choiceElements[1]) {
                console.log('неправильно')
                counterWrongAnswers++
                wrongAnswers.innerHTML = counterWrongAnswers
                choiceElements = []

                setTimeout(() => {
                    choiceHistory[0].classList.remove('finally')
                    choiceHistory[1].classList.remove('finally')
                    choiceHistory = []
                }, 1000)
            }
        }

        if(counterRightAnswers === 1) {
            gameButton.innerHTML += '<button id="reset" onclick="resetButton()">Играть снова?</button>'
        }


    })
})

function resetButton() {
    console.log('клик')
    elemStorage.forEach(elem => {
        elem.classList.remove('right', 'finally');
        console.log(elem)
        gameButton.innerHTML = ''
        counterRightAnswers = 0
        counterWrongAnswers = 0
        rightAnswers.innerHTML = counterRightAnswers
        wrongAnswers.innerHTML = counterWrongAnswers 
    })
}
