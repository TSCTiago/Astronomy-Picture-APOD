

function changeImg(date) {
    var req = new XMLHttpRequest();
    const dateTime = date;
    var url = `https://api.nasa.gov/planetary/apod?api_key=5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk&date=${dateTime}`;

    req.open("GET", url);
    req.send();

    req.addEventListener("load", function () {
        if (req.status == 200 && req.readyState == 4) {
            var response = JSON.parse(req.responseText);
            makeCards(response);
        }
    })
}

const row = document.querySelector('.row');


function makeCards(response) {
    console.log(response)
    const column = document.createElement('div');

    column.classList.add('column');
    column.classList.add('card');
    column.classList.add('green');

    let url = response.media_type !== "video" ? response.url : 'https://p2.trrsf.com/image/fget/cf/1200/630/middle/images.terra.com/2022/07/28/nasa-g9943322a3_1920-rhg2kcja4gtw.jpg';



    column.innerHTML = `
        <div class="content">
            <div>
                <img id="screen"
                    src="${url}"
                    alt="${response.title}">
                <h3>${response.title}</h3>
                <p>Data: <span id="date">${response.date}</span></p>
            </div>
            <button class="btn">See More</button>
        </div>
`
    row.appendChild(column);

    column.addEventListener('mouseenter', function () {
        const btn = this.querySelector(".btn");
        const date = this.querySelector('#date').textContent
        btn.onclick = function () {
            datasImg(date)
            modal.style.display = "flex";
        }
    })

}

//  buscando dados de uma imagem
function datasImg(date) {
    var req = new XMLHttpRequest();
    const dateTime = date;
    var url = `https://api.nasa.gov/planetary/apod?api_key=5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk&date=${dateTime}`;

    req.open("GET", url);
    req.send();

    req.addEventListener("load", function () {
        if (req.status == 200 && req.readyState == 4) {
            var response = JSON.parse(req.responseText);
            makeExplanation(response);
        }
    })
}


function clearFields() {
    document.getElementById("title-singular").textContent = ''
    document.getElementById("date-singular").textContent = ''
    document.getElementById("img-singular").src = ''
    document.getElementById("video-singular").src = ''
    document.getElementById("explanation-singular").textContent = ''
    document.getElementById("copyright-singular").textContent = ''
}

function makeExplanation(response) {
    clearFields()

    let url = ''
    const video = document.getElementById("video-singular")
    const img = document.getElementById("img-singular")

    if (!response.hdurl) {
        url = response.url
        video.style.display = 'block'
        img.style.display = 'none'
        video.src = url


    }
    else {
        url = response.hdurl
        img.style.display = 'block'
        video.style.display = 'none'
        img.src = url

    }

    document.getElementById("title-singular").textContent = response.title;
    document.getElementById("date-singular").textContent = response.date;
    document.getElementById("explanation-singular").textContent = response.explanation;
    document.getElementById("copyright-singular").textContent = response.copyright ?? 'Não forcencido pela API';
}






function randomDate(start, end) {
    const randomTime = start.getTime() + Math.random() * (end.getTime() - start.getTime());
    const d = new Date(randomTime);
    const month = d.getMonth() + 1 < 10 ? `0${d.getMonth() + 1}` : d.getMonth() + 1;
    const day = d.getDate() < 10 ? `0${d.getDate()}` : d.getDate();
    const year = d.getFullYear();
    return `${year}-${month}-${day}`;
}



function dates() {
    let array = [];
    for (var i = 0; i < 8; i++) {
        const a = randomDate(new Date(1995, 6, 1), new Date());
        array.push(a);
    }


    array.forEach(function (date) {
        changeImg(date);
    });

}

window.addEventListener('load', dates);

var modal = document.getElementById("myModal");

var span = document.getElementsByClassName("close")[0];

span.onclick = function () {
    modal.style.display = "none";
    clearFields()
}

window.onclick = function (event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const refreshButton = document.querySelector('.refresh');

refreshButton.addEventListener('click', function() {
this.classList.toggle('loading');
setTimeout(function() {
location.reload(true);
}, 1000);
});