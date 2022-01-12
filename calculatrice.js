
class Calculator{
        constructor(previousOperandTextElement, currentOperandTextElement){
                this.previousOperandTextElement = previousOperandTextElement
                this.currentOperandTextElement = currentOperandTextElement 
                this.clear()
        }

        //Efacer Tous
        clear(){
                this.currentOperand ='0'
                this.previousOperand = ''
                this.operation = undefined
        }

        //Effacer un caractère en cours de saisie
        delete(){
                this.currentOperand = this.currentOperand.toString().slice(0, -1)
                if (this.currentOperand == ''){
                        this.currentOperand = ''
                }
        }

        //effacer la saisie en cours
        deleteAll(){
                this.currentOperand = ''
        }

        //opposer de la valeur saisi
        opposeNumber(){
                this.currentOperand = -this.currentOperand ;
        }

        //EMPECHER D'ECRIRE PLUS DE 1 VIRGULR dans la valeur d'entré
        appendNumber(number){
                if(number === ',' && this.currentOperand.includes(','))return
                this.currentOperand = this.currentOperand.toString() + number.toString()
        }

        //Choisir une opération
        chooseOperation(operation){
                if(this.currentOperand === '') return
                if(this.previousOperand !== ''){
                        this.compute()
                }
                this.operation = operation
                this.previousOperand = this.currentOperand
                this.currentOperand = ''
        }

        //Executer les opérations
        compute(){
                let computation
                const prev = parseFloat(this.previousOperand)
                const current = parseFloat(this.currentOperand)
                if (isNaN(prev) || isNaN(current)) return
                switch (this.operation){
                        case '+':
                                computation = prev + current 
                                break
                        case '-':
                                computation = prev - current 
                                break
                        case '*':
                                computation = prev * current 
                                break
                        case '/':
                                computation = prev / current 
                                break
                        default:
                                return
                }
                this.currentOperand = computation
                this.operation = undefined
                this.previousOperand=''
        }

        //TRANFORMER L4AFFICHAGE EN FORMAT FRANCAIS
        getDisplayNumber(number){
                const stringNumber = number.toString()
                const integerDigits = parseFloat(stringNumber.split(',')[0])
                const decimalDigits = stringNumber.split(',')[1]
                let integerDisplay 
                if (isNaN(integerDigits)){
                        integerDisplay = ''
                }else{
                        integerDisplay = integerDigits.toLocaleString('fr', {
                        maximumFractionDigits: 0})
                }
                if (decimalDigits != null){
                        return `${integerDisplay},${decimalDigits}`
               }else{
                        return integerDisplay
               }
        }
        
        //INITIALISER EN ULISISANT LE NOUVEL FORMAt toLocaleString
        updateDisplay(){
                this.currentOperandTextElement.innerText = this.getDisplayNumber(this.currentOperand)
                if (this.operation != null){
                        this.previousOperandTextElement.innerText = 
                        `${this.getDisplayNumber(this.previousOperand)} ${this.operation}`       
                }else {
                        this.previousOperandTextElement.innerText = ''
                }
        }      
}


const numberButtons = document.querySelectorAll('[data-number]')
const operationButtons = document.querySelectorAll('[data-operation]')
const equalButton = document.querySelector('[data-equals]')
const deleteButton = document.querySelector('[data-delete]')
const allClearButton = document.querySelector('[data-all-clear]')
const alldeleteButton = document.querySelector('[data-all-delete]')
const previousOperandTextElement = document.querySelector('[data-previous-operand]')
const currentOperandTextElement = document.querySelector('[data-current-operand]')
const currentNumberOpposed = document.querySelector('[data-opposed]')


//CREER UN NOUVEAU OBJET CALCULATRICE 
const calculatrice = new Calculator(previousOperandTextElement, currentOperandTextElement)

numberButtons.forEach(button => {
        button.addEventListener('click', () => {
                calculatrice.appendNumber(button.innerText)
                calculatrice.updateDisplay()
        })
})

operationButtons.forEach(button => {
        button.addEventListener('click', () => {
                calculatrice.chooseOperation(button.innerText)
                calculatrice.updateDisplay()
        })
})

equalButton.addEventListener('click', button =>{
        calculatrice.compute()
        calculatrice.updateDisplay()
})

allClearButton.addEventListener('click', button => {
        calculatrice.clear()
        calculatrice.updateDisplay()
})

alldeleteButton.addEventListener('click', button => {
        calculatrice.deleteAll()
        calculatrice.updateDisplay()
})

currentNumberOpposed.addEventListener('click', button => {
        calculatrice.opposeNumber()
        calculatrice.updateDisplay()
})


deleteButton.addEventListener('click', button => {
        calculatrice.delete()
        calculatrice.updateDisplay()
})