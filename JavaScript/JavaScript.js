
var IMAGES_URL = ["../images/קיוי.jpg", "../images/banana.jpg", "../images/pineapple.jpg", "../images/strawberry.jpg"];
var randomImage = [];
//var TIME = 30;
var numOfpress = 0;// מספר ההקשה של המשתמש
var points = 0;
var ARROWS = {
    //קוראים לה ShowImages
    LEFT: 37,
    TOP: 38,
    RIGHT: 39,
    BOTTOM: 40,
}
var timeForCurrentLevel = 50000;
var w = 10;
var level = 3;
var ShowImagesInterval;           //מאפשר לעצור את ההצגה של התמונות ועובר למשחק
var countImage = 0;               //סופר איזה תמונה צריך להציג - לצורך הצגה משתמש

var isModalOpen = false;
var isShowingImages = false;

var timer;

//נתוני השלב הנוכחי
var currentLevel = {
    number: 1,
    numOfImage: 4,
    seconds: 40
}



function startRound() {         //תחילת סיבוב של המשחק
    if (!isModalOpen) {
        randomImage = [];              //איפוס המערך
        doRandom();                    //שליחה לפונקציה שמגרילה תמונות
        renderRandomImages();
        isShowingImages = true;
        ShowImagesInterval = setInterval(ShowImages, 1000);//שליחה לפונקציה שמעדכנת את התצוגה

    }
    // ClickOnImage();             //שליחה לפונקציה שמקבלת את ההקשה
}

function onKeyPress(event) {
    console.log(event.keyCode);
    //alert(event.keyCode);
    if (isShowingImages == true)
        return;
    switch (event.keyCode) {
        case ARROWS.LEFT:
                /*if (*/ClickOnImage('../images/banana.jpg')/*)*/
            //document.getElementById("arrow-left").classList.add("arrow-succses");
            //else
            //    document.getElementById("arrow-left").classList.add("arrow-error");
            break;
        case ARROWS.TOP:
               /* if (*/ClickOnImage('../images/קיוי.jpg')/*)*/
            //    document.getElementById("arrow-top").classList.add("arrow-succses");
            //else
            //    document.getElementById("arrow-top").classList.add("arrow-error");
            break;
        case ARROWS.RIGHT:
                /*if (*/ClickOnImage('../images/pineapple.jpg')/*)*/
            //    document.getElementById("arrow-right").classList.add("arrow-succses");
            //else
            //    document.getElementById("arrow-right").classList.add("arrow-error");
            break;
        case ARROWS.BOTTOM:
                /*if (*/ClickOnImage('../images/strawberry.jpg')/*)*/
            //    document.getElementById("arrow-bottom").classList.add("arrow-succses");
            //else
            //    document.getElementById("arrow-bottom").classList.add("arrow-error");
            break;
        default:
    }

    //CheckClick();
}

//מגרילה תמונות בקוד
function doRandom() {
    var index;
    for (var i = 0; i < currentLevel.numOfImage; i++) {
        index = Math.floor(Math.random() * IMAGES_URL.length);
        randomImage[i] = IMAGES_URL[index];
    }
    console.log(randomImage);
}

//מעדכנת את התצוגה
function renderRandomImages() {
    isShowingImages = false;
    var randomImagesDiv = document.getElementById('random-images');
    randomImagesDiv.innerHTML = '';
    for (var i = 0; i < randomImage.length; i++) {
        var img = createImageCard(randomImage[i], i);
        randomImagesDiv.appendChild(img);
    }

}

//יוצרת כרטיס עם פרטים של תמונה
function createImageCard(imageUrl, number) {
    var img = document.createElement('img');
    //להחליף לניתוב של תמונה
    img.src = "../images/ריק.png";
    img.setAttribute("data-img", imageUrl);
    img.id = "img" + number;
    img.classList.add("pic");
    return img;
}

function ShowImages() {
    if (!isModalOpen) {
        if (countImage > 0) {
            //להחליף לניתוב של תמונה
            document.getElementById("img" + (countImage - 1)).src = "../images/ריק.png";
        }
        if (countImage < randomImage.length) {
            document.getElementById("img" + countImage).src = document.getElementById("img" + countImage).getAttribute("data-img");
        }
        countImage++;
        if (countImage == randomImage.length + 1) {   //אם הציג את כל התמונות
            countImage = 0;      //מאפס את המיקום של התמונה לפעם הבאה
            clearInterval(ShowImagesInterval);       //עוצרים הצגה של תמונות
            clearInterval(timer);
            timer = setInterval(TimePlay, currentLevel.seconds);
            isShowingImages = false;                      //מאפשרים למשתמש ללחוץ
            //onKeyPress();
        }
    }
}



//מקבלת את ההקשה של המשתמש ושולחת לפונקציה שבודקת
//הפונקציה מקבלת את התמונה של הכפתור שעליו לחצנו
function ClickOnImage(imageUrl) {
    //לבדוק אם התמונה מתאימה לתמונות שוהגרלו
    //i - סופר באיזה הקשה אנחנו - המקום שמבדוק במערך
    return CheckClick(imageUrl, numOfpress % randomImage.length);

}

//פונקציה שבודקת אם הקיש נכון
function CheckClick(imageUrl, index) {
    numOfpress++;
    if (randomImage[index] == imageUrl) {
        onSuccess(index);
        return true;
    }
    else {
        onFail();
        return false;
    }
}

function onSuccess(index) {
    console.log("success");
    var src = randomImage[index];
    var img = document.getElementById('img' + index);
    img.src = src;
    //אפ בתמונה האחרונה
    if (index == randomImage.length - 1 && !isModalOpen) {
        renderPoints(10);
        setTimeout(startRound, 500);
    }
}

function onFail() {
    console.log("error");
    renderPoints(-10);
    showFailureMessage();
    startRound();
}
function showFailureMessage() {
    var message = document.getElementById("failureMessage");
    message.style.display = "block";
    setTimeout(function () {     
        message.style.display = "none"
    },2000);
}
//הפונקציה תקבל מספר חיובי או שלילי של נקודות מעדכנת את המשתנה ואת התצוגה
function renderPoints(num) {
    //עדכון מאחורה - בקוד
    if (points + num >= 0)
        points += num;
    //תפיסה של אלמנט לפי האי די שלו
    //עדכון של התצוגה
    var pointsDiv = document.getElementById("points");
    pointsDiv.innerHTML = points;
}

function showModal() {
    isModalOpen = true;
    document.getElementById("time").style.width = "0px";
    clearInterval(timer);

    modal.style.display = "block";
    if (points > 50) { //   הצגה  של סוף השלב: כפתור המשך וכפתור יציאה 
        //nextLevel();//אם לחץ על כפתור המשך
        document.getElementById("game-over").classList.add("hidden");
        document.getElementById("btn-again").classList.add("hidden");
        document.getElementById("btn-level").classList.remove("hidden");
        document.getElementById("modal-level").classList.remove("hidden");
        document.getElementById("modal-level").innerHTML = "level " + currentLevel.number;
        if (currentLevel.number == 3)
            document.getElementById("btn-level").style.display = "none";
    }
    else {
        document.getElementById("game-over").classList.remove("hidden");
        document.getElementById("btn-again").classList.remove("hidden");
        document.getElementById("btn-level").classList.add("hidden");
        document.getElementById("modal-level").classList.add("hidden");
    }


}


function nextLevel(isNext) {
    if (isNext) {
        currentLevel.number++;
        currentLevel.numOfImage++;
        currentLevel.seconds -= 5;//הורדת מהירות לשלב הבא
    }
    closeModal();
    startRound();
    localStorage.level = currentLevel.number;
    if (currentLevel.number == 3)
        localStorage.removeItem("level");
}

function exit() {
    open("דף הבית.html", "_self");
}

var modal;
var span;
function initModal() {
    // Get the modal
    modal = document.getElementById("myModal");

    // Get the button that opens the modal
    var btn = document.getElementById("myBtn");

    // Get the <span> element that closes the modal
    span = document.getElementsByClassName("close")[0];

    // When the user clicks on <span> (x), close the modal
    span.onclick = closeModal;

    // When the user clicks anywhere outside of the modal, close it
    window.onclick = function (event) {
        if (event.target == modal) {
            closeModal();
        }
    }
}
function closeModal() {
    isModalOpen = false;
    modal.style.display = "none";
}

/********************* initilaze game *************************/

function main() {
    //init level
    currentLevel.number = parseInt(sessionStorage.currentLevel);
    currentLevel.numOfImage = 3 + currentLevel.number;
    currentLevel.seconds = currentLevel.seconds - (currentLevel.number - 1) * 5;

    //showStartMessage
    randomImage = [];              //איפוס המערך
    doRandom();                    //שליחה לפונקציה שמגרילה תמונות
    renderRandomImages();
    setTimeout(function () {
        isShowingImages = true;
        ShowImagesInterval = setInterval(ShowImages, 1000);
    }, 5000);

    renderPoints(0);

    window.addEventListener('keydown', onKeyPress);
    //    setInterval(function () {
    //        timeForCurrentLevel--;
    //        document.getElementById('time').innerHTML = timeForCurrentLevel;
    //    }, 1000);
}

function TimePlay() {
    document.getElementById("time").style.width = w + "px";
    w += 1;
    if (w >= window.innerWidth) {
        showModal();// הצגה  של סוף השלב: כפתור המשך וכפתור יציאה 
        w = 0;
        clearInterval(timer);
    }

}
