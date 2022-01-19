
let memory = document.getElementsByClassName("mem")
let code = ''
let inCycle = false
let cutCode = []
let atLine = 0
let withLabels = ''
let compMem = []
let labels = []
let labelIndexes = []
let running = false
let INPUT = []
let OUTPUT = []
let onRow = 0

function compileCode(){
    labels = []
    cutCode = code.split(/ |,|\n|\.data|subleq /g)
    let labelCount = 0
    cutCode = cutCode.filter(function(value,index,array){return value != ""})
    for(let i = 0;i<cutCode.length;i++){
        if(cutCode[i].startsWith("@") && cutCode[i].endsWith(":")){
            labels[labelCount] = cutCode[i]
            labels[labelCount] = labels[labelCount].slice(0,-1)
            labelIndexes[labelCount] = i-labelCount
            labelCount++
        }
    }
    cutCode = cutCode.filter(function(val,i,arr){return !(val.startsWith("@") && val.endsWith(":"))})
    for(let i = 0;i<255;i++){
        compMem[i] = 0
    }
    let replace=false
    for(let i = 0;i<cutCode.length;i++){
        if(cutCode[i].startsWith("@")){
            for(let j = 0;j<labels.length;j++){
                if(labels[j]==cutCode[i]){
                    compMem[i]=labelIndexes[j]
                    break
                }
            }
        }
        else{
            compMem[i] = parseInt(cutCode[i])
        }
    }
}

function runLine(){
    if(compMem[compMem[atLine]] - compMem[compMem[atLine+1]] <= 0){
        compMem[compMem[atLine]] = compMem[compMem[atLine]] - compMem[compMem[atLine+1]]
        atLine = compMem[atLine+2]
    }
    else{
        compMem[compMem[atLine]] = compMem[compMem[atLine]] - compMem[compMem[atLine+1]]
        atLine+=3
    }
}

function start(){
    if(!inCycle){
        code = document.getElementById("codebody").value
        compileCode()
        running = true
        inCycle = true
        run()
    }
    else if(!running){
        running = true
        run()
    }
}

function step(){
    if(inCycle){
        running = false
        run()
    }
    else{
        code = document.getElementById("codebody").value
        compileCode()
        inCycle = true
        running = false
        run()
    }
}

function stop(){
    inCycle = false
    running = false
    run()
    newCycle()
}

function addRow(){
    document.getElementById("add").innerHTML += '<tbody><tr><td><textarea class="input"></textarea></td></tr><tbody>'
    document.getElementById("add").innerHTML = document.getElementById("add").innerHTML.slice(0,-15)
    onRow++
}

function subRow(){
    if(!(onRow<=0)){
        onRow--
        document.getElementById("add").innerHTML = document.getElementById("add").innerHTML.slice(0,-68)
    }
}

function newCycle(){
    for(let i = 0;i<memory.length;i++){
        memory[i].classList.remove("emphesize")
        memory[i].innerHTML = "00"
    }
    atLine = 0
}

function run(){
    if(inCycle){
        for(let i = 0;i<compMem.length;i++){
            if(parseInt(compMem[i])<16&&parseInt(compMem[i])>=0){
                memory[i].innerHTML = "0"
            }
            else{
                memory[i].innerHTML = ""
            }
            memory[i].innerHTML += parseInt(compMem[i]).toString(16).toUpperCase()
        }
        for(let i = 0;i<memory.length;i++){
            memory[i].classList.remove("emphesize")
        }
        memory[atLine].classList.add("emphesize")
        memory[atLine+1].classList.add("emphesize")
        memory[atLine+2].classList.add("emphesize")
        runLine()
        if(running){
            setTimeout(run,10)
        }
    }
}