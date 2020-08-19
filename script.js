const quoteContainter = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const authorText = document.getElementById('author');
const twitterBtn = document.getElementById('twitter');
const newQuoteBtn = document.getElementById('new-quote');
const loader = document.getElementById('loader');

// show loading
function loading(){
    loader.hidden = false;
    quoteContainter.hidden = true;
}

// hide loading
function complete(){
    if(!loader.hidden){
        quoteContainter.hidden = false;
        loader.hidden = true;
    }
}

// get quote from API
async function getQuote(){
    loading();
    const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try{
        const response = await fetch(proxyUrl + apiUrl);
        const data = await response.json();
        // if author is black and unkown
        if(data.quoteAuthor === ''){
            authorText.innerText = 'Unkown';
        }else{
            authorText.innerText = data.quoteAuthor;
        }
        // reduce font size for long quote
        if(data.quoteText.length > 120){
            quoteText.classList.add('long-quote');
        }else{
            quoteText.classList.remove('long-quote');
        }
        quoteText.innerText = data.quoteText;
        complete();
    }catch (error){
        getQuote();
    }
}

function tweetQuote(){
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'__blank');
}

// event listerner
newQuoteBtn.addEventListener('click',getQuote);
twitterBtn.addEventListener('click', tweetQuote);

// on Load
getQuote();