let mealData = document.querySelector(".meals")
let search = document.querySelector(".search")
// let submitBtn = 



$(document).ready(() => {
    searchByName("").then(() => {
        $(".Loading").fadeOut(500, function () {

            $(".Loading").addClass("d-none")
        })
        $("body").removeClass("overflow-hidden")
    }


    )
})




                                // SIDE NAVBAR //

function openNav() {

    $(".main-nav").animate({ width: 250 }, 500)
    $(".nav-footer").removeClass("d-none")

    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    $(".links li").animate({
        top: 0
    }, 1000)

}


function clossNav() {

    $(".main-nav").animate({ width: 0 }, 500, function () {

        $(".nav-footer").addClass("d-none")
    })

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({
        top: 300
    }, 500)

}


$(".open-close-icon").click(function () {
    if ($(".main-nav").css("width") == "0px") {

        openNav()
    }
    else { clossNav() }
})



                            //SEARCH//

function showSearchInput() {
    document.querySelector(".searchInput").innerHTML = `
    <div class="col-md-6 ">
    <input onkeyUp="searchByName(this.value)" id="searchName" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
    <input onKeyUp="searchByLetter(this.value) " id="searchLetter" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>`

    clossNav()

    mealData.innerHTML = ""
    $(".searchcontainer").removeClass("d-none")


    // console.log("hi");
}
search.addEventListener("click", function () {

    showSearchInput()
})


async function searchByName(name) {
    $(".Loading").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    // console.log(response.meals);
    displayMeals(response.meals)
    $(".Loading").fadeOut(200)

}



async function searchByLetter(char) {
    $(".Loading").fadeIn(200)

    char == "" ? char = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    displayMeals(response.meals)
    $(".Loading").fadeOut(200)


}



                            //DISPLAY MEALS & CATEGORY//


function displayMeals(arr) {
    let blackbox = ""
    for (let i = 0; i < arr.length; i++) {

        blackbox += `  <div onclick="getMealDetails('${arr[i].idMeal}')"  class="col-md-3 py-3 meal">
         <div class="img  position-relative overflow-hidden z-n1" >
             <img  src="${arr[i].strMealThumb}" alt="" class="img-fluid">
             <div  class="meal-layer  position-absolute d-flex justify-content-center align-items-center text-black p-2">
                        <h3 >${arr[i].strMeal}</h3>

                    </div>
         </div>
     </div> 
     `
    }

    mealData.innerHTML = blackbox;
}


async function getCategory() {
    $(".Loading").fadeIn(500)

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await resp.json();

    // console.log(response.categories
    // );
    displayCategory(response.categories)
    $(".Loading").fadeOut(500)

}


async function getCategoryMeals(category) {
    $(".Loading").fadeIn(500)

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response = await resp.json()
    displayMeals(response.meals.slice(0, 20))

    $(".Loading").fadeOut(500)

    // console.log(response.meals.slice(0, 20));

}



function displayCategory(arr) {
    let blackbox = ""
    for (let i = 0; i < arr.length; i++) {

        blackbox += `  <div class="col-md-3 py-3 meal" onclick="getCategoryMeals('${arr[i].strCategory}')">
             <div  class="img  position-relative overflow-hidden rounded-2 z-n1">
                 <img src="${arr[i].strCategoryThumb}" alt="" class="img-fluid ">
                 <div class="meal-layer position-absolute flex-column d-flex align-items-center text-black p-2">
                        <h3 class="text-center">${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0, 20).join(" ")}</p>

                    </div>
             </div>
         </div> 
         `
    }

    mealData.innerHTML = blackbox;
}

$(".searchCategory").on("click", function () {
    // console.log("hiiiiiiii");
    clossNav()
    $(".searchcontainer").addClass("d-none")

    getCategory();
})



                            //AREA & Ingredients//




async function getArea() {
    $(".Loading").fadeIn(200)

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await resp.json();

    // console.log(response.meals
    // );
    displayArea(response.meals.slice(0, 20))
    $(".Loading").fadeOut(200)

}

async function getAreaMeals(area) {
    $(".Loading").fadeIn(200)

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response = await resp.json()
    displayMeals(response.meals.slice(0, 20))

    // console.log(response.meals.slice(0, 20));
    $(".Loading").fadeOut(200)

}


function displayArea(arr) {
    let blackbox = "";

    for (let i = 0; i < arr.length; i++) {
        blackbox += `
                <div class="col-md-3">
                        <div onclick="getAreaMeals('${arr[i].strArea}')" class="rounded-2 text-center cursor-pointer">
                                <i class="fa-solid fa-house-laptop fa-4x"></i>
                                <h3>${arr[i].strArea}</h3>
                        </div>
                </div>
                `
    }

    mealData.innerHTML = blackbox;
}

$(".searchArea").on("click", function () {

    // console.log("hiiiiiiii");
    clossNav()
    $(".searchcontainer").addClass("d-none")
    getArea();
})





async function getIngredients() {
    $(".Loading").fadeIn(200)


    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await resp.json();

    // console.log(response.meals
    // );
    displayIngredients(response.meals.slice(0, 20))
    $(".Loading").fadeOut(200)

}

async function getIngredientsMeals(ingredients) {
    $(".Loading").fadeIn(200)

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))
    $(".Loading").fadeOut(200)

}


function displayIngredients(arr) {
    let blackbox = "";

    for (let i = 0; i < arr.length; i++) {
        blackbox += `
        <div class="col-lg-3 col-md-4  ">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ", 8).join(" ")}</p>
                </div>
        </div>
        `
    }

    mealData.innerHTML = blackbox;
}

$(".searchIngredients").on("click", function () {
    // console.log("hiiiiiiii");
    clossNav()
    $(".searchcontainer").addClass("d-none")

    getIngredients();
})

                            //MEAL DETAILS//


function displayMealDetails(idMeal) {
    // console.log(idMeal);

    mealData.innerHTML = ""
    let ingredients = ''

    for (let i = 1; i <= 20; i++) {
        if (idMeal[`strIngredient${i}`]) {
            ingredients += `<li class="alert alert-info m-2 p-1">${idMeal[`strMeasure${i}`]} ${idMeal[`strIngredient${i}`]}</li>`
        }

    }





    let tags = idMeal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }




    let blackbox =
        `
    <div class="col-md-4">
                <img class="w-100 rounded-3" src="${idMeal.strMealThumb}"
                    alt="">
                    <h2>${idMeal.strMeal}</h2>
            </div>
            <div class="col-md-8">
                <h2>Instructions</h2>
                <p>${idMeal.strInstructions}</p>
                <h3><span class="fw-bolder">Area : </span>${idMeal.strArea}</h3>
                <h3><span class="fw-bolder">Category : </span>${idMeal.strCategory}</h3>
                <h3>Recipes :
                </h3>
                <ul class="list-unstyled d-flex g-3 flex-wrap">
                ${ingredients}
                </ul>

                <h3>Tags : </h3>
                <ul class="tag list-unstyled d-flex g-3 flex-wrap">
                ${tagsStr}

                </ul>

                <a target="_blank" href="${idMeal.strSource}" class="btn btn-success">Source</a>
                <a target="_blank" href="${idMeal.strYoutube}" class="btn btn-danger">Youtube</a>
            </div>

        `

    mealData.innerHTML = blackbox;


}

async function getMealDetails(idMeal) {
    $(".Loading").fadeIn(200)

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    response = await resp.json();
    displayMealDetails(response.meals[0])
    // console.log(response.meals[0]);
    $(".Loading").fadeOut(200)

}














                            // DISPLAY CONTACTS WITH VALIDATION //

function displayContactUs() {
    mealData.innerHTML = `
 <div class="contact min-vh-100 d-flex justify-content-center align-items-center">
    <div class="container w-75 text-center">
        <div class="row g-4">
            <div class="col-md-6">
                <input id="nameInput" onfocus="namefocus()"  onkeyup="isValid()"  type="text" class="form-control" placeholder="Enter Your Name">
                <div id="nameAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Special characters and numbers not allowed
                </div>
            </div>
            <div class="col-md-6">
                <input id="emailInput" onfocus="emailfocus()" onkeyup="isValid()" type="email" class="form-control " placeholder="Enter Your Email">
                <div id="emailAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Email not valid *exemple@yyy.zzz
                </div>
            </div>
            <div class="col-md-6">
                <input id="phoneInput" onfocus="phonefocus()" onkeyup="isValid()" type="text" class="form-control " placeholder="Enter Your Phone">
                <div id="phoneAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid Phone Number
                </div>
            </div>
            <div class="col-md-6">
                <input id="ageInput"onfocus="agefocus()" onkeyup="isValid()" type="number" class="form-control " placeholder="Enter Your Age">
                <div id="ageAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid age
                </div>
            </div>
            <div class="col-md-6">
                <input  id="passwordInput"onfocus="passwordfocus()"  onkeyup="isValid()" type="password" class="form-control " placeholder="Enter Your Password">
                <div id="passwordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid password *Minimum eight characters, at least one letter and one number:*
                </div>
            </div>
            <div class="col-md-6">
                <input  id="repasswordInput" onfocus="repasswordfocus()" onkeyup="isValid()" onblur=" activebtn()" type="password" class="form-control " placeholder="Repassword">
                <div id="repasswordAlert" class="alert alert-danger w-100 mt-2 d-none">
                    Enter valid repassword 
                </div>
            </div>
        </div>
        <button id="submitBtn" disabled class="btn btn-outline-danger px-2 mt-3">Submit</button>
    </div>
</div>
 `
    // console.log("hello");
}




$(".contactUs").on("click", function () {

    displayContactUs()
    clossNav()
})



function namefocus() {

    nameInput = true
}
function emailfocus() {

    emailInput = true
}
function phonefocus() {

    phoneInput = true
}

function agefocus() {

    ageInput = true
}
function passwordfocus() {

    passwordInput = true
}
function repasswordfocus() {

    repasswordInput = true
}


let nameInput = false;
let emailInput = false;
let phoneInput = false;
let ageInput = false;
let passwordInput = false;
let repasswordInput = false;


function isValid() {
    if (nameInput) {
        if (nameValidation()) {
            document.getElementById("nameAlert").classList.replace("d-block", "d-none")

        }
        else {
            document.getElementById("nameAlert").classList.replace("d-none", "d-block")

        }
    }

    if (emailInput) {
        if (emailValidation()) {
            document.getElementById("emailAlert").classList.replace("d-block", "d-none")

        }
        else {
            document.getElementById("emailAlert").classList.replace("d-none", "d-block")

        }
    }

    if (phoneInput) {
        if (phoneValidation()) {
            document.getElementById("phoneAlert").classList.replace("d-block", "d-none")
        }
        else {
            document.getElementById("phoneAlert").classList.replace("d-none", "d-block")
        }
    }

    if (ageInput) {
        if (ageValidation()) {
            document.getElementById("ageAlert").classList.replace("d-block", "d-none")
        } else {
            document.getElementById("ageAlert").classList.replace("d-none", "d-block")
        }
    }


    if (passwordInput) {
        if (passWordValidation()) {
            document.getElementById("passwordAlert").classList.replace("d-block", "d-none")

        }
        else {
            document.getElementById("passwordAlert").classList.replace("d-none", "d-block")

        }
    }
    if (repasswordInput) {
        if (repasswordValidation()) {
            document.getElementById("repasswordAlert").classList.replace("d-block", "d-none")

        } else {
            document.getElementById("repasswordAlert").classList.replace("d-none", "d-block")

        }
    }


}

function activebtn() {
    if (nameValidation() &&
        emailValidation() &&
        phoneValidation() &&
        ageValidation() &&
        passWordValidation() &&
        repasswordValidation()) {
        document.getElementById("submitBtn").removeAttribute("disabled")
    }
    else {
        document.getElementById("submitBtn").setAttribute("disabled", true)
    }
}

function nameValidation() {
    let regex = /^[a-zA-Z ]+$/
    let regexResult = regex.test(document.querySelector("#nameInput").value)
    // console.log(regexResult);
    return (regexResult)
}

function emailValidation() {
    let regex = /^[a-zA-Z0-9_-]+@(gmail|yahoo|hotmail)\.com$/
    let regexResult = regex.test(document.querySelector("#emailInput").value)
    // console.log(regexResult);

    return (regexResult)
}


function phoneValidation() {
    let regex = /^([0-9]?){3}01[1245][0-9]{8}$/
    let regexResult = regex.test(document.querySelector("#phoneInput").value)
    return (regexResult)
}


function ageValidation() {
    let regex = /^([1-9]|[1-9][0-9]|[1][0-9][0-9])$/
    let regexResult = regex.test(document.querySelector("#ageInput").value)
    return (regexResult)
}

function passWordValidation() {
    let regex = /^(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[^\w\d\s:])([^\s]){8,16}$/
    let regexResult = regex.test(document.querySelector("#passwordInput").value)
    // console.log(regexResult);

    return (regexResult)
}

function repasswordValidation() {

    return document.querySelector("#repasswordInput").value == document.querySelector("#passwordInput").value

}



