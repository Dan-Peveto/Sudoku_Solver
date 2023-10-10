
const puzzleBoard = document.querySelector("#puzzle");   
const solveButton = document.querySelector("#solve-button");
const squares = 81;
const sumbission = [];
const solutionDisplay = document.querySelector("#solution")
const resetButton = document.querySelector('#reset')

for (var i = 0; i < squares; i++) {
    const inputElement = document.createElement('input');
    inputElement.setAttribute('type', 'number');
    inputElement.setAttribute('min', '1');
    inputElement.setAttribute('max', '9');

    inputElement.setAttribute('id', `cell-${i + 1}`);
    if (
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i < 21) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i < 27) ||
        ((i % 9 == 3 || i % 9 == 4 || i % 9 == 5) && (i > 27 && i < 53)) ||
        ((i % 9 == 0 || i % 9 == 1 || i % 9 == 2) && i > 53) ||
        ((i % 9 == 6 || i % 9 == 7 || i % 9 == 8) && i > 53)
    ) {
        inputElement.classList.add('odd-section')
    }

    puzzleBoard.appendChild(inputElement)
}

const joinValues = () => {
    const inputs = document.querySelectorAll('input')
    inputs.forEach(input => {
        if (input.value) {
            sumbission.push(input.value)
        }   else {
            sumbission.push('.')
        }
    })
    console.log(sumbission)
}

const populateValues = (isSolvable, solution) => {
    const inputs = document.querySelectorAll('input')
    if (isSolvable && solution) {
        
        inputs.forEach((input, i) => {
            input.value = solution[i]
        })
        solutionDisplay.innerHTML = 'This is the answer'
    } else {
        solutionDisplay.innerHTML = 'This is not solvable'
    }
}

const solve = async () => {
    
    joinValues();
    const data = sumbission.join('');
    console.log('data:', data);
    const options = {
      method: 'POST',
      url: 'https://solve-sudoku.p.rapidapi.com/',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': '9c09c50ce9msh53f06a26b0a0a9cp1b9df9jsn7c538e9967b6',
        'X-RapidAPI-Host': 'solve-sudoku.p.rapidapi.com'
      },
      data: {
        puzzle: data
      }
    };
    
    try {
        const response = await axios.request(options);
        console.log(response.data);
        populateValues(response.data.solvable, response.data.solution) 
    } catch (error) {
        console.error(error);
    }
}

const clearInputValues = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach(input => {
        input.value = '';
    })
    solutionDisplay.innerHTML = '';
    sumbission.length = 0
}

solveButton.addEventListener('click', solve)
resetButton.addEventListener('click', clearInputValues)
