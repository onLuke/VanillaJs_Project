// do something!

'use strict';

function Nav($root, categoryState){

  const getChild = (parent, child) => parent.querySelector(child);
  const create = (tagName) => document.createElement(tagName);

  const $nav = create('nav');
  $nav.classList.add('category-list');

  $nav.innerHTML +=`
    <ul>
      <li id="all" class="category-item active">전체보기</li>
      <li id="business" class="category-item">비즈니스</li>
      <li id="entertainment" class="category-item">엔터테인먼트</li>
      <li id="health" class="category-item">건강</li>
      <li id="science" class="category-item">과학</li>
      <li id="sports" class="category-item">스포츠</li>
      <li id="technology" class="category-item">기술</li>
    </ul>
  `
  
  $nav.addEventListener('click', (e) => {
    if(e.target.tagName === 'LI' && ! e.target.classList.contains('active')){
      const $currentActive = getChild($nav, '.active')
      $currentActive.classList.remove('active');
      e.target.classList.add('active');
      
      const newCategory = e.target.id;
      categoryState.category = newCategory;
    }
  })
  
  $root.prepend($nav);
  
}

export default Nav;