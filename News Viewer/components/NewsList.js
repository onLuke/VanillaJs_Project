// do something!

'use strict';


function NewsList($root, categoryState){
  const create = (tagName) => document.createElement(tagName);
  
  const apiKey = "83f8c879393e452f9bf61c7c00c80574";
  const pageSize = 5;
  let page = 1;
  let category = "all";
  let isOk = true;
  let newsURL = null;
  let firstErrorTime = null;
  let news = null;
  
  const $newsListContainer = create('div');
  $newsListContainer.classList.add('news-list-container');
  

  
  
  let $scrollObserver = create('div');
  $scrollObserver.classList.add('scroll-observer');
  
  const appendScroll = () => {
    $scrollObserver.innerHTML += 
    `<img src="img/ball-triangle.svg" alt="Loading..." />`
    $root.append($scrollObserver);
    
  }
  
  const request_Reaccess_To_User = () => {
    alert(`
    일시적인 오류가 발생했습니다.
    새로고침 후 다시 접근해 주시기 바랍니다.

    이용에 불편을 드려 죄송합니다.
    `)
  }
  
  const getNews = async() => {
    newsURL = `https://newsapi.org/v2/top-headlines?country=kr&category=${category === 'all' ? '' : category}&page=${page}&pageSize=${pageSize}&apiKey=${apiKey}`;
    
    try{
      news = await axios.get(newsURL)
      
    }catch(error){
      isOk = false;
      if(firstErrorTime) firstErrorTime = new Date();
      console.log(error)
      console.log(
        `뉴스리스트 get 수신 중 오류가 발생했습니다.
        최초 발생 시각 : ${firstErrorTime},
        최근 발생 시각 : ${new Date()},
        발생 컴포넌트 : NewsList.js`
        );
      }
    }
    
    
    const showNews = async() => {
      await getNews();

      const $newsList = create('article');
      $newsList.classList.add('news-list')

      if(isOk){
        const articles = news.data.articles;
        
        articles.forEach(article =>{
          $newsList.innerHTML +=`
          <section class="news-item">
          
            <div class="thumbnail">
            <a class="news-link" href=${article.url} target="_blank" rel="noopener noreferrer">
            <img
            src=${article.urlToImage}
            alt="thumbnail" />
            </a>
            </div>
            
            <div class="contents">
            <h2>
            <a class="news-link" href=${article.url} target="_blank" rel="noopener noreferrer">
            ${article.title}
            </a>
            </h2>
            <p>
            ${article.description}
            </p>
            </div>
          
          </section>
          `
        });
        
        $newsListContainer.append($newsList);

        
      }else {
        request_Reaccess_To_User()
      }
    };
    
    const changeCategory = async(newCategory) => {
      const $newsList = create('article');
      $newsList.classList.add('news-list');
      
      category = newCategory;

      await getNews();
      
      if(isOk){
        const articles = news.data.articles;
        
        articles.forEach(article =>{
          $newsList.innerHTML +=`
          <section class="news-item">
          
            <div class="thumbnail">
            <a class="news-link" href=${article.url} target="_blank" rel="noopener noreferrer">
            <img
            src=${article.urlToImage}
            alt="thumbnail" />
            </a>
            </div>
            
            <div class="contents">
            <h2>
            <a class="news-link" href=${article.url} target="_blank" rel="noopener noreferrer">
            ${article.title}
            </a>
            </h2>
            <p>
            ${article.description}
            </p>
            </div>
          
          </section>
          `
        });

        $newsListContainer.replaceChildren($newsList)

      }else request_Reaccess_To_User()
      
    }

    

    const addObserver = () => {
      function loadNews(entries){
        entries.forEach(async (entry) => {
          if(entry.intersectionRatio >= 1) {
            page++;
            await showNews();
          }
        })
      }
      let observer = new IntersectionObserver(loadNews, {threshold: [1.0]})
      observer.observe($scrollObserver);
    }
    
    
    categoryState.observeFromProxy(async(_, val) => {
      await changeCategory(val);
    })

    const init = async() => {
      await showNews();
      if(isOk){
        appendScroll();
        $root.insertBefore($newsListContainer, $scrollObserver);
        addObserver(); 
      }
    }

    init();
  }
  
  export default NewsList;