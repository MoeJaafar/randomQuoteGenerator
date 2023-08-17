import React, { useState, useEffect, useCallback } from 'react';

const QuoteBox = () => {
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [quote, setQuote] = useState('');
  const [author, setAuthor] = useState('');

  const fetchQuote = useCallback(async () => {
    try {
      const response = await fetch('https://type.fit/api/quotes');
      const data = await response.json();
      const nextIndex = (quoteIndex + 1) % data.length;
  
      if (data[nextIndex].text && data[nextIndex].author) {
        const nextQuote = data[nextIndex];
        nextQuote.author = nextQuote.author.slice(0, -10);
        setQuote(nextQuote.text);
        setAuthor(nextQuote.author);
        setQuoteIndex(nextIndex);
      }
    } catch (error) {
      console.error('Error fetching quote:', error);
    }
  }, [quoteIndex]);
  
  useEffect(() => {
    fetchQuote();
  }, []);

  return (
    <><div id="quote-box">
      <div class="center">
        <p id="text">{quote}</p>
        <p id="author">{author}</p>
        <button class="btn btn-primary" id="new-quote" onClick={fetchQuote}>New Quote</button>
        <a
          class="btn btn-link"
          id="tweet-quote"
          href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(quote + " - " + author)}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          Tweet Quote
        </a>
      </div>

    </div><div className="text-center">
  <a href='https://github.com/MoeJaafar'>by Moe Jaafar</a>
</div>
</>
    
  );
};

export default QuoteBox;
