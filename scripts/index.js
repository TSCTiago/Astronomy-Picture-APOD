

function changeImg(date) {
    var req = new XMLHttpRequest();
    // const dateTime = '2015-04-21';
    const dateTime = date;
    var url = `https://api.nasa.gov/planetary/apod?api_key=5B6oJsSCQyekXZvNOKpsUhRPl1e7FHqjIAyHpybk&date=${dateTime}`;

    req.open("GET", url);
    req.send();

    req.addEventListener("load", function () {
        if (req.status == 200 && req.readyState == 4) {
            var response = JSON.parse(req.responseText);
            // console.log(response.length)
            makeCards(response);
        }
    })
}

const row = document.querySelector('.row');


function makeCards(response) {
    console.log(response);
    const column = document.createElement('div');
    column.classList.add('column');
    column.classList.add('card');
    column.classList.add('green');

    column.innerHTML = `
        <div class="content">
            <div>
                <img id="screen"
                    src="${response.url}"
                    alt="${response.title}">
                <h3>${response.title}</h3>
                <p>Data: <span id="date">${response.date}</span></p>
            </div>
            <button class="btn">See More</button>
        </div>
`
    row.appendChild(column);

    column.addEventListener('mouseenter', function () {
        // console.log(btn)
        const btn = this.querySelector(".btn");
        const date = this.querySelector('#date').textContent
        btn.onclick = function () {
            datasImg(date)
            modal.style.display = "flex";
        }
        // console.log(this.getElementsByTagName('h3'))
    })

}

//  buscando dados de uma imagem
// 
function datasImg(date) {
    var req = new XMLHttpRequest();
    // const dateTime = '2015-04-21';
    const dateTime = date;
    // console.log(date)
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
    document.getElementById("explanation-singular").textContent = ''
    document.getElementById("copyright-singular").textContent = ''
}

function makeExplanation(response) {
    // console.log(response)
    clearFields()
    document.getElementById("title-singular").textContent = response.title;
    document.getElementById("date-singular").textContent = response.date;
    document.getElementById("img-singular").src = response.hdurl;
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

    // mapa(array);
    // console.log(array)
    // array.map(function (date) {
    //     console.log('chamo');
    //     changeImg(date);
    //     // sleep(0.1)
    // });

    array.forEach(function (date) {
        changeImg(date);
    });

}

// console.log(document.title)
window.addEventListener('load', dates);





// function mapa(array) {
// }

// Get the modal
var modal = document.getElementById("myModal");

// Get the button that opens the modal


// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];

// When the user clicks the button, open the modal 
// btn.onclick = function() {
//   modal.style.display = "block";
// }

// When the user clicks on <span> (x), close the modal
span.onclick = function () {
    modal.style.display = "none";
    clearFields()
}

// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
