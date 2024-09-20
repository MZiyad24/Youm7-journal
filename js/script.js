

// time and date functions 

// can be better if using another static function that saves the current date and time and when the server 
// stops it displays the last value returned

function updateTime() {    // not client-side only so will be affected by live-server
    const current = new Date();
    const time = current.toLocaleTimeString('ar-EG', { hour: '2-digit', minute: '2-digit', hour12: true });
    const date = current.toLocaleDateString('ar-EG', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' });

    dynamic_date.textContent = date;
    dynamic_time.textContent = time;

}

updateTime();
setInterval(updateTime, 1000);


//-------------------------- fixing site ears


function Ears()
{
    document.getElementById("ear1").style.position="absolute";
    if ( document.documentElement.scrollTop > 230 || document.body.scrollTop > 230) {
        document.getElementById("ear1").style.position="fixed";
        document.getElementById("ear2").style.position="fixed";

        document.getElementById("ear1").style.top=0;
        document.getElementById("ear2").style.top=0;
    }
    else {
        document.getElementById("ear1").style.position="absolute";
        document.getElementById("ear2").style.position="absolute";

        document.getElementById("ear1").style.top='230px';
        document.getElementById("ear2").style.top='230px';
    }
}



//----------------------------------------- thumbnails carosel

let currentIndex = 0;
const thumbnails = document.querySelectorAll('.thumbnail');
const thumButtons = document.querySelectorAll('.btn-primary');
const totalThumbnails = thumbnails.length;
const offset = 5;

function updateThumbnails(index) {
    thumbnails.forEach((thumbnail, i) => {
        thumbnail.classList.remove('large', 'small');
        if (i === index) {
            thumbnail.classList.add('large');
        } else if (i === (index + offset) % totalThumbnails) {
            thumbnail.classList.add('small');
        }
    });
}

function setCurrentIndex(newIndex) {
    currentIndex = newIndex;
    updateThumbnails(currentIndex);


}

// Set up button event listeners
thumButtons.forEach((button, index) => {
    button.addEventListener('click', () => setCurrentIndex(index));
});

// Optionally start cycling automatically
setInterval(() => {
    setCurrentIndex((currentIndex + 1) % totalThumbnails);
}, 2000);



//---------------------- updating ticker 

let News = [];

function updateTicker() {
    const tickerUl = document.getElementById("ticker_ul");
    const tickerUl2 = document.getElementById("ticker_ul2");
    News.forEach(([id, news]) => {
        if (news.showinticker === true) {
            const list = document.createElement("li");
            list.innerHTML = `
                <a href="#">${news.overview}</a>
            `;
            tickerUl.appendChild(list);
            
        }


    });
}

function updateTicker2() {
    const tickerUl2 = document.getElementById("ticker_ul2");
    News.forEach(([id, news]) => {
        if (news.showinticker === true) {
            const list = document.createElement("li");
            list.innerHTML = `
                <a href="#">${news.overview}</a>
            `;
            tickerUl2.appendChild(list);
            
        }


    });
}

//----------------------- search function

function search(data) {

    const suggestions_ul = document.querySelector(".suggestions_ul");
    const suggestions_div = document.querySelector(".suggestions_div");
    const space = document.querySelector(".empty");
    suggestions_ul.innerHTML = ``;
    News.forEach(([id, news]) => {
        if (news.title.includes(data)) {
            // creating the list
            const suggestions = document.createElement("li");
            suggestions.className="suggestions";
            suggestions.innerHTML=`${news.title}`;

            // appending to the ul
            suggestions_ul.appendChild(suggestions);

            // making it visible 
            suggestions_div.style.display='block';

            // creating the space
            
            space.style.minHeight=suggestions_div.offsetHeight + 'px';
            space.style.display='block';

            document.querySelector(".search_bar_div").style.marginBottom='20px';
        }
        if (data.length===0)
        {
            suggestions_div.style.display='none';
            space.style.display='none';
            document.querySelector(".search_bar_div").style.marginBottom='0px';
        }
    });
    
}


//------------------------------- cards displayment

const categories = ['political', 'religion', 'sport', 'art', 'science'];

function DisplayCards()
{
    const data = [];
    News.forEach(([id,news])=>{
        data.push(news);
    })

    
    
    const updateNews = (data, category) => {
        const categoryContainer = document.querySelector('.'+category);
        const bigNewsContainer = categoryContainer.querySelector(".latest_news_big");
        const smallNewsContainers = categoryContainer.querySelectorAll(".latest_news_small_col");
        console.log(data);
        // Filter data for the current category
        const categoryData = data.filter(news => news.category === category);

        // Update big news
        if (categoryData.length > 0) {
            bigNewsContainer.querySelector(".news_image").style.backgroundImage = `url("../${categoryData[0].photo}")`;
            bigNewsContainer.querySelector(".news_link").textContent = categoryData[0].title;
        }

        // Update small news
        categoryData.slice(1, 5).forEach((news, index) => {
            if (smallNewsContainers[index]) {
                smallNewsContainers[index].querySelector(".news_image").style.backgroundImage = `url("../${news.photo}")`;
                smallNewsContainers[index].querySelector(".news_link").textContent = news.title;
            }
        });
    };

    // Update news for each category
    categories.forEach(category => updateNews(data, category));
}


//--------------------------------------- news carosel

function updateCarousel()
{
    const carousel_items = document.querySelectorAll('.carousel-item');
    const list_items = document.querySelectorAll('.list-group-item');
    
    const data = [];
    News.forEach(([id,news])=>{
        data.push(news);
    })

    const carousel_data = data.filter(news => news.showinticker===true);

    for ( let i=0 ; i < carousel_items.length ; i++)
    {
        carousel_items[i].querySelector('.d-block').src=`${carousel_data[i].photo}`;
        carousel_items[i].querySelector('.header_of_caption').innerHTML=`${carousel_data[i].title}`;
        carousel_items[i].querySelector('.carousel-p').innerHTML=`${carousel_data[i].overview}`;

        list_items[i].querySelector('h6').innerHTML=`${carousel_data[i].overview}`;
    }
}





//-----------------------fetching the json file


fetch('news.json')
    .then(response => response.json())
    .then(data => {
        News = Array.from(Object.entries(data));

        // the ticker call
        updateTicker();
        updateTicker2();

        DisplayCards();
        
        updateCarousel();




    })

    .catch(error => console.error(data));


;

// to up button

function Scroll()
{
    if(document.documentElement.scrollTop > 300 || document.body.scrollTop > 300 )
    {
        document.getElementById("TopButton").style.display='block';
    }
    else
    {
        document.getElementById("TopButton").style.display='none';
    }
}

window.onscroll=function(){Scroll();Ears();}

function ScrollUp()
{
    document.documentElement.scrollTop=0;
    document.body.scrollTop=0
}



