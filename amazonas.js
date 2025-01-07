let tablero = []

let blackPiece = '♚';
let whitePiece = '♔';

let colorClassName = 'white';
let letters = 'abcdefghij';
for (let i = 0; i < 100;i++){

    let row = Math.floor(i / 10);
    let col = i % 10;

    if((row + col) % 2 === 0){
        colorClassName = 'white';
    }else{
        colorClassName = 'brown';
    }

    let casilla = document.createElement('div');
    casilla.id = `${letters[col]}${row + 1}`;
    casilla.classList.add(colorClassName);
    tablero.push(casilla);
}

let tableElement = document.querySelector('.table');

for (let casilla of tablero){
    casilla.addEventListener('click', (event) => {
        // console.log(event.target.id);
        handleClick(event)
    });
    if(casilla.id === 'd1'){
        casilla.textContent = blackPiece;
    }
    if(casilla.id === 'g1'){
        casilla.textContent = blackPiece;
    }
    if(casilla.id === 'a4'){
        casilla.textContent = blackPiece;
    }
    if(casilla.id === 'j4'){
        casilla.textContent = blackPiece;
    }
    if(casilla.id === 'a7'){
        casilla.textContent = whitePiece;
    }
    if(casilla.id === 'j7'){
        casilla.textContent = whitePiece;
    }
    if(casilla.id === 'd10'){
        casilla.textContent = whitePiece;
    }
    if(casilla.id === 'g10'){
        casilla.textContent = whitePiece;
    }

    tableElement.appendChild(casilla);
}

let selectedCell = null;
let selectedPiece = null;
actualPossibleMoves = [];
let moved = false;
function handleClick(event){
    console.log("handleClick");
    console.log(event.target.textContent);
    
    console.log("selectedCell class list", );
    //si no hay pieza seleccionada y la celda no esta bloqueada
    if(event.target.textContent !== '' && !event.target.classList.contains('blocked') && selectedCell !== event.target.id){
        selectedCell = event.target.id;
        if(selectedPiece === null){
            selectedPiece = event.target.textContent;
            console.log("hola")
            calculatePosibleMoves(selectedPiece, selectedCell);
            highlightMoves(actualPossibleMoves,"move");
        }

        console.log("selectedPiece", selectedPiece);
        console.log("selectedCell", selectedCell);

    //si es la misma casilla que ya estaba seleccionada
    }else if(selectedCell === event.target.id){
        selectedCell = null;
        selectedPiece = null;
        unHighlightMoves(actualPossibleMoves);
        clearMove();

    }else{
        if(actualPossibleMoves.includes(event.target.id)){
            console.log("event.target.textcontent", event.target.textContent !== '')
            console.log("event.target.id", event.target.id);
            console.log("event.target.textContent", event.target.textContent);

            if(event.target.textContent === '' && moved){
                event.target.classList.add('blocked');
                unHighlightMoves(actualPossibleMoves);
                clearMove();
            }else{
                event.target.textContent = selectedPiece;
                document.getElementById(selectedCell).textContent = '';
                unHighlightMoves(actualPossibleMoves);
                actualPossibleMoves = [];
                calculatePosibleMoves(selectedPiece, event.target.id);
                highlightMoves(actualPossibleMoves,"block");
                moved = true;

            }
        }
    }

}
function clearMove(){
    selectedCell = null;
    selectedPiece = null;
    unHighlightMoves(actualPossibleMoves);
    actualPossibleMoves = [];
    moved = false;
    console.log("clearMove executed");
    console.log("selectedCell", selectedCell);
    console.log("selectedPiece", selectedPiece);
    console.log("actualPossibleMoves", actualPossibleMoves);
    
}

function unHighlightMoves(moves) {
    
    moves.forEach(move => {
        let cell = document.getElementById(move);
        if (cell) {
            cell.classList.remove('possibleMove');
        }
    });
    moves.forEach(move => {
        let cell = document.getElementById(move);
        if (cell) {
            cell.classList.remove('possibleBlock');
        }
    });
}

function calculatePosibleMoves(piece,cell){
    const possibleMoves = [];
    // const letters = 'abcdefghij';
    const [col, row] = [cell.charCodeAt(0), parseInt(cell.slice(1))];
    //convertimos la letra a numero para poder ir sumando

    // Direcciones posibles para la reina (combinación de torre y alfil)
    const directions = [
        [1, 0], [-1, 0], // Horizontal (derecha, izquierda)
        [0, 1], [0, -1], // Vertical (arriba, abajo)
        [1, 1], [-1, -1], // Diagonal (arriba-derecha, abajo-izquierda)
        [1, -1], [-1, 1]  // Diagonal (arriba-izquierda, abajo-derecha)
    ];

    for (const [dx, dy] of directions) {
        let newCol = col;
        let newRow = row;

        // Sigue moviéndote en la dirección hasta que llegues al borde del tablero o encuentres un obstáculo
        while (true) {
            newCol += dx;
            //sumamos la letra a la que estamos para poder ir moviendonos
            newRow += dy;
            //sumamos la fila a la que estamos para poder ir moviendonos

            // Convertir newCol de código ASCII a letra para poder acceder a la celda
            let newColLetter = String.fromCharCode(newCol);

            // Verificar si la nueva posición está dentro de los límites del tablero
            
            //aqui newCol esta en charCode, por lo que si es menor a la a o mayor a la j, no es valido
            if (newCol < 'a'.charCodeAt(0) || newCol > 'j'.charCodeAt(0) || newRow < 1 || newRow > 10) {
                break;
            }

            const targetCell = document.getElementById(`${newColLetter}${newRow}`);
            if (targetCell && !targetCell.classList.contains('blocked') && targetCell.textContent === '') {
                possibleMoves.push(`${newColLetter}${newRow}`);
            } else {
                break;
            }
        }
    }

    console.log("Possible Moves:", possibleMoves);
    actualPossibleMoves = possibleMoves;
    // highlightMoves(possibleMoves);
}

function highlightMoves(moves,type) {
    let typeClass = null;
    if(type === "move"){
        typeClass = "possibleMove";
    }else if(type === "block"){
        typeClass = "possibleBlock";
    }
    moves.forEach(move => {
        let cell = document.getElementById(move);
        if (cell) {
            cell.classList.add(typeClass);
        }
    });
}




// tablero.forEach(casilla => {
//     tableElement.appendChild(casilla);
// });