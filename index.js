console.log("helllo")

const getBtnEle = document.getElementById("get-btn")
const dropDownEle = document.getElementById("mode-drop-down")
const colourInpEle = document.getElementById("color-input")
const colourOpEle = document.getElementById("color-op")
let canFetch = true

let colorSchemeObj = [

    {
        image:"https://www.thecolorapi.com/id?format=svg&named=false&hex=000000",
        hexVal: "#000000"
    },
    {
        image:"https://www.thecolorapi.com/id?format=svg&named=false&hex=1A1919",
        hexVal:"#1A1919"
    },
    {
        image:"https://www.thecolorapi.com/id?format=svg&named=false&hex=343232",
        hexVal:"#343232"
    },
    {
        image:"https://www.thecolorapi.com/id?format=svg&named=false&hex=4F4A4A",
        hexVal:"#4F4A4A"
    },
    {
        image:"https://www.thecolorapi.com/id?format=svg&named=false&hex=6A6262",
        hexVal:"#6A6262"
    }


   
]



renderColorScheme(colorSchemeObj)

document.addEventListener("click",function(e){

    if(e.target.id === "get-btn"){

        if(canFetch){
            canFetch = false
            updateColourArr()
            
        }



    }

    if(e.target.parentElement.id === "color-tile"){

        navigator.clipboard.writeText(e.target.parentElement.dataset.hexval)
        alert("copied to clipboard")

    }
    





})

function updateColourArr(){
    let colorInpHex = colourInpEle.value.slice(1)
    colorSchemeObj = []

    fetch(`https://www.thecolorapi.com/scheme?hex=${colorInpHex}&count=5&mode=${dropDownEle.value}`)
    .then(res => res.json())
    .then(data => {
        data.colors.forEach((color)=>{

            let tempObj = {
                image:color.image.bare,
                hexVal: color.hex.value
            }
            colorSchemeObj.push(tempObj)
            

        })
        canFetch = true
        renderColorScheme(colorSchemeObj)
    })


}

function renderColorScheme(colorSchemeObj){

    let html = ""

    colorSchemeObj.forEach((color)=>{

        html += `<div class="color-tile" id="color-tile" data-hexval=${color.hexVal}>
        <img src=${color.image}>
        <p>${color.hexVal}</p>
        </div>`


    })

    colourOpEle.innerHTML = html



}



