import React from 'react'

const backgroundColors = [
  "#ac3b61",
  "#5783c9",
  "#b06d25",
  "#93b88f",
  "#b29bc2",
  "#750204"
];

const fontFamilies = [
  "'Nunito Sans', sans-serif",
  "'Playfair', serif",
  "'Raleway', sans-serif",
  "'Rubik', sans-serif",
  "'Unbounded', cursive;"
]

function App() {
  const [data, setData] = React.useState(null);
	const [isLoading, setIsLoading] = React.useState(true);
	const [error, setError] = React.useState(null);
  const [quote, setQuote] = React.useState({
		quote: "",
		author: "",
		index: null
	});
  const [backgroundColor, setBackgroundColor] = React.useState("#ac3b61");
  const [fontFamily, setFontFamily] = React.useState("'Nunito Sans', sans-serif");

  const src = "https://gist.githubusercontent.com/camperbot/5a022b72e96c4c9585c32bf6a75f62d9/raw/e3c6895ce42069f0ee7e991229064f167fe8ccdc/quotes.json";

  React.useEffect(()=>{
    fetch(src).
      then(res=>{
        if (res.ok) {
          return res.json();
        }
        else {
          throw res;
        }
      }).
      then(
        (result)=>{
          setData(result);
          randomColor();
          randomFont();
          setQuote(result.quotes[Math.floor(Math.random() * result.quotes.length)]);
        }
      )
      .catch(error => {
        console.log("Error: ", error);
        setError(error);
      })
      .finally(() => {
        setIsLoading(false);	
      });
  },[])

  const randomQuote = () => {
    let randomizer = Math.floor(Math.random() * data.quotes.length);
		const quoteObj = data["quotes"][randomizer];
		setQuote({
			quote: quoteObj.quote,
			author: quoteObj.author,
			index: randomizer
		});
  }

  const randomColor = () => {
		const index = Math.floor(Math.random() * backgroundColors.length);
		setBackgroundColor(backgroundColors[index]);
	}

  const randomFont = () => {
    const index = Math.floor(Math.random() * fontFamilies.length);
    console.log('FONT',fontFamilies[index])
		setFontFamily(fontFamilies[index]);
  }

  const handleClick = () => {
		randomQuote();
    randomColor();
    randomFont();
	}

  if (isLoading) {
		return (
      <>
        <div className="loader" style={{borderTop:`16px solid ${backgroundColor}`}}></div>
        <p className="devMessage">Loading</p>
      </>
		);
	}
	
	if (error) {
		return (
			<p className="devMessage">Error</p>
		);
	}

  return (
    <div className="container" style={{backgroundColor:backgroundColor}}>
      <div id="quote-box">
        {
          !isLoading && <>
          <div id="text">
            <h1 style={{color:backgroundColor, fontFamily}}>{quote.quote}</h1>
          </div>
          <div id="author">
            <p className="text-black">{quote.author}</p>
          </div>
          <div id="button-wrapper">
            <a id="tweet-quote" target="_blank" rel="noreferrer" href={`https://www.twitter.com/intent/tweet/?text=${quote.quote}`}>
              <i className="fa-brands fa-square-twitter" style={{color:backgroundColor}}></i>
            </a>
            <button className="button" style={{backgroundColor:backgroundColor}} onClick={()=>{handleClick()}}>New Quote</button>
          </div>
          </>
        }
      </div>
      <div id="created-by">
        <span>By <a href="https://github.com/BurningAl15" style={{color:backgroundColor}}>Aldhair Vera</a></span>
      </div>
    </div>
  )
}

export default App
