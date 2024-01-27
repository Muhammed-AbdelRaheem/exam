let mealData = document.querySelector(".meals")
let search = document.querySelector(".search")

$(document).ready(function  ( ) {
     searchByName("")
     $(".Loading").fadeOut(500,function  ( ) {
        
         $(".Loading").addClass("d-none")
     })
     $("body").removeClass("overflow-hidden")

})

function openNav() {

    $(".main-nav").animate({ width: 250 }, 1000)
    $(".nav-footer").removeClass("d-none")

    $(".open-close-icon").removeClass("fa-align-justify");
    $(".open-close-icon").addClass("fa-x");
    $(".links li").animate({
        top: 0
    }, 1000)

}


function clossNav() {

    $(".main-nav").animate({ width: 0 }, 1000, function () {

        $(".nav-footer").addClass("d-none")
    })

    $(".open-close-icon").addClass("fa-align-justify");
    $(".open-close-icon").removeClass("fa-x");
    $(".links li").animate({
        top: 300
    }, 1000)

}


$(".open-close-icon").click(function () {
    if ($(".main-nav").css("width") == "0px") {

        openNav()
    }
    else { clossNav() }
})



function showSearchInput() {
    document.querySelector(".searchInput").innerHTML = `
    <div class="col-md-6 ">
    <input onkeyUp="searchByName(this.value)" id="searchName" class="form-control bg-transparent text-white" type="text" placeholder="Search By Name">
    </div>
    <div class="col-md-6">
    <input onKeyUp="searchByLetter(this.value) " id="searchLetter" maxlength="1" class="form-control bg-transparent text-white" type="text" placeholder="Search By First Letter">
    </div>`

    // $(".searchcontainer").removeClass("d-none")
    clossNav()
    mealData.innerHTML = ""


    console.log("hi");
}
search.addEventListener("click", function () {
 
    showSearchInput( )
})





async function searchByName(name) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${name}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    // console.log(response.meals);
    displayMeals(response.meals)
}



async function searchByLetter(char) {

    char == "" ? char = "a" : "";
    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?f=${char}`)
    response = await response.json()

    response.meals ? displayMeals(response.meals) : displayMeals([])
    displayMeals(response.meals)

}





// function displayMeals(arr) {
//     let blackbox = ""
//     for (let i = 0; i < arr.length; i++) {

//         blackbox += `  <div class="col-md-3 py-3 meal">
//          <div onclick="getMealDetails(${arr[i].idMeal})" class="img  position-relative overflow-hidden z-n1">
//              <img src="${arr[i].strMealThumb}" alt="" class="img-fluid">
//              <div class="meal-layer position-absolute d-flex align-items-center text-black p-2">
//                         <h3>${arr[i].strMeal}</h3>

//                     </div>
//          </div>
//      </div> 
//      `
//     }

//     mealData.innerHTML = blackbox;
// }



async function getCategory() {
    $(".Loading").fadeIn(200)

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    response = await resp.json();

    console.log(response.categories
    );
    displayCategory(response.categories)
    $(".Loading").fadeOut(200)

}


function displayCategory(arr) {
    let blackbox = ""
    for (let i = 0; i < arr.length; i++) {

        blackbox += `  <div class="col-md-3 py-3 meal" onclick="getCategoryMeals('${arr[i].strCategory}')">
             <div  class="img  position-relative overflow-hidden rounded-2 z-n1">
                 <img src="${arr[i].strCategoryThumb}" alt="" class="img-fluid ">
                 <div class="meal-layer position-absolute flex-column d-flex align-items-center text-black p-2">
                        <h3 class="text-center">${arr[i].strCategory}</h3>
                        <p>${arr[i].strCategoryDescription.split(" ").slice(0,20).join(" ")}</p>

                    </div>
             </div>
         </div> 
         `
    }

    mealData.innerHTML = blackbox;
}
$(".searchCategory").on("click", function () {
    console.log("hiiiiiiii");
    clossNav()
    $(".searchcontainer").addClass("d-none")

    getCategory();
})


async function getArea() {
    $(".Loading").fadeIn(200)

    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?a=list`)
    response = await resp.json();

    // console.log(response.meals
    // );
    displayArea(response.meals.slice(0,20))
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

    console.log("hiiiiiiii");
    clossNav()
    $(".searchcontainer").addClass("d-none")
    getArea();
})



async function getIngredients() {
    $(".Loading").fadeIn(200)

    
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/list.php?i=list`)
    response = await resp.json();

    console.log(response.meals
    );
    displayIngredients(response.meals.slice(0,20))
    $(".Loading").fadeOut(200)

}


function displayIngredients(arr) {
    let blackbox = "";

    for (let i = 0; i < arr.length; i++) {
        blackbox +=`
        <div class="col-lg-3 col-md-4  ">
                <div onclick="getIngredientsMeals('${arr[i].strIngredient}')" class="rounded-2 text-center cursor-pointer">
                        <i class="fa-solid fa-drumstick-bite fa-4x"></i>
                        <h3>${arr[i].strIngredient}</h3>
                        <p>${arr[i].strDescription.split(" ",8).join(" ")}</p>
                </div>
        </div>
        `   
    }

    mealData.innerHTML = blackbox;
}
$(".searchIngredients").on("click", function () {
    console.log("hiiiiiiii");
    clossNav()
    $(".searchcontainer").addClass("d-none")

    getIngredients();
})



async function getCategoryMeals(category) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)
    response=await resp.json() 
    displayMeals(response.meals.slice(0, 20))

    console.log(response.meals.slice(0, 20));
    
}


async function getAreaMeals(area) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?a=${area}`)
    response=await resp.json() 
    displayMeals(response.meals.slice(0, 20))

    console.log(response.meals.slice(0, 20));
    
}


async function getIngredientsMeals(ingredients) {

    let response = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${ingredients}`)
    response = await response.json()


    displayMeals(response.meals.slice(0, 20))

}






 function displayMealDetails(idMeal) {
    console.log(idMeal);

    mealData.innerHTML=""
    let ingredients=''

    for (let i = 1; i <= 20; i++) {
        if(idMeal[`strIngredient${i}`]){ 
         ingredients+=`<li class="alert alert-info m-2 p-1">${idMeal[`strMeasure${i}`]} ${idMeal[`strIngredient${i}`]}</li>`
    }
       
    }


  

    
    let tags = idMeal.strTags?.split(",")
    if (!tags) tags = []

    let tagsStr = ''
    for (let i = 0; i < tags.length; i++) {
        tagsStr += `
        <li class="alert alert-danger m-2 p-1">${tags[i]}</li>`
    }
        
        
   
    

     let   blackbox=
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
   
mealData.innerHTML=blackbox;     


    }
    



async function getMealDetails(idMeal) {
    let resp = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${idMeal}`)
    response =await resp.json();
    displayMealDetails(response.meals[0])
    // console.log(response.meals[0]);
}


function displayMeals(arr) {
    let blackbox = ""
    for (let i = 0; i < arr.length; i++) {

        blackbox += `  <div onclick="getMealDetails('${arr[i].idMeal}')"  class="col-md-3 py-3 meal">
         <div class="img  position-relative overflow-hidden z-n1" >
             <img  src="${arr[i].strMealThumb}" alt="" class="img-fluid">
             <div  class="meal-layer position-absolute d-flex align-items-center text-black p-2">
                        <h3>${arr[i].strMeal}</h3>

                    </div>
         </div>
     </div> 
     `
    }

    mealData.innerHTML = blackbox;
}

