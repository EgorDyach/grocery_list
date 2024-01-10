const groceries = document.getElementsByClassName("groceries")[0]
const basket = document.getElementById("basket")
const allItems = document.getElementById("allItems")
const userInput = document.getElementById("userInput")
const addBtn = document.getElementById('addBtn')
const favouritesItems = document.getElementById('favouritesItems')
let items = [] // content: str, isFavourite: false, isDeleted: false
basket.addEventListener("click", function () {
    items = [];
    render()
})

userInput.addEventListener("keydown", function (event) {
    if (event.key == "Enter") {
        addItem();
    }
})

addBtn.addEventListener('click', function (event) {
    addItem()
})

function addItem() {
    if (userInput.value != '' && userInput.value.length >= 2 && userInput.value.length <= 50) {
        items.push({ 
            content: userInput.value, 
            isFavourite: false, 
            isDeleted: false, 
        })
        userInput.value = "";
        render()
    }
}

function render() {
    allItems.innerHTML = ''
    favouritesItems.innerHTML = ''
    console.log(items)
    for (let i = 0; i < items.length; i++) {
        allItems.append(objectToItem(items[i], i))
        if (items[i].isFavourite) {
            favouritesItems.append(objectToItem(items[i], i))
        }
    }

}

function objectToItem(obj, i) {
    const li = document.createElement('li')
    const deleteBtn = document.createElement('button')
    const favouriteBtn = document.createElement('button')
    li.innerHTML = obj.content
    deleteBtn.classList = 'deleteBtn'
    deleteBtn.textContent = 'Вычеркнуть'
    if (obj.isDeleted) {
        li.classList = 'line'
    }
    deleteBtn.addEventListener('click', function () {
        if (obj.isDeleted == false) {
            items[i].isDeleted = true
        } else {
            items[i].isDeleted = false
        }
        render()
    })
    favouriteBtn.classList = 'favourites'
    if (obj.isFavourite) {
        favouriteBtn.classList = 'favourites isFavourite'
    }
    favouriteBtn.addEventListener('click', function () {
        if (obj.isFavourite == false) {
            items[i].isFavourite = true
        } else {
            items[i].isFavourite = false
        }
        render()
    })
    li.append(deleteBtn, favouriteBtn)
    return li
}