
document.addEventListener("DOMContentLoaded", () => {

  function findIdOfParent(obj) {
      var o = obj;
      while(!o.id) {
        o = o.parentNode;
      }
      return(o.id);
    }

/*
** Nawigacja MENU GŁOWNE (desktop i mobile)
*/    

  const menuItems = document.querySelectorAll("#desktop-menu .main-menu .menu-item"),
      subItems = document.querySelectorAll("#desktop-menu .sub-menu"),
      mobileMenuButon = document.querySelector("#mobile-menu nav > div > .menu-item"),
      mobileMenuClose = document.querySelector("#mobile-menu-close"),
      mobileSubMenu = document.querySelectorAll("button.sub-menu-item"),
      mobileSubMenuItems = document.querySelectorAll(".mobile-sub-menu-items"),
      mobileSubMenuBack = document.querySelectorAll(".mobile-menu-back > img"),
      body = document.body;

  function bodyOverflow(data){ // zaciemnianie tła pod otwartym menu (popup)
    if( data == 'add'){
      body.classList.add("overflow-hidden");
    } else  if( data == 'menu'){
      body.classList.add("menu-expanded");
    }else{
      body.classList.remove("overflow-hidden");
      body.classList.remove("menu-expanded");
    }
  }

  mobileMenuButon.addEventListener('click', function mobileMenuClick(event) { 
    event.preventDefault();
    document.querySelector("#mobile-menu nav > .sub-menu").classList.add("active");
    bodyOverflow('add');
  });
  
  mobileMenuClose.addEventListener('click', function mobileMenuClick(event) { 
    event.preventDefault();
    document.querySelector("#mobile-menu nav > .sub-menu").classList.remove("active");
    mobileSubMenuItems.forEach(SubMenuItem => {
      SubMenuItem.classList.remove("active");
    });
    bodyOverflow();
  });

  mobileSubMenu.forEach(SubMenuItem => {
    SubMenuItem.addEventListener('click', function MbileSubMenuClick(event) { 
      event.preventDefault();
      parentId = event.target.parentNode.id;
        document.querySelector("#" + parentId + " > .mobile-sub-menu-items").classList.add("active");
    }); 
  });

  mobileSubMenuBack.forEach(menuBack => {
    menuBack.addEventListener('click', function MbileSubMenuBack(event) { 
      mobileSubMenuItems.forEach(SubMenuItem => {
        SubMenuItem.classList.remove("active");
      });
    });
  });
      
  menuItems.forEach(menuItem => {
    menuItem.addEventListener('click', function handleClick(event) { 
      event.preventDefault();
      subItems.forEach(subItem => {
          subItem.classList.remove("active");
          bodyOverflow();
      });

      if ( menuItem.classList.contains("current") ) { 
        menuItem.classList.remove("current");
      } else {
        menuItems.forEach(menuIte => { 
          menuIte.classList.remove("current"); 
        });
        menuItem.classList.add("current");
        bodyOverflow('menu');
        const sub = findIdOfParent(menuItem),
              submenu = document.getElementById("desktop-menu").getElementsByClassName(sub)[0];
            submenu.classList.add("active");
      }; 
    });
  });


  var subMenuItems = document.querySelectorAll("li.sub-menu-item"),
      subMenuOpis = document.querySelectorAll(".submenu-opis"),
      delayInMilliseconds = 4;

    subMenuItems.forEach(subMenuItem => {
      subMenuItem.addEventListener('mouseover', function subHoverIn(event) { 
        subMenuOpis.forEach(item=> {
          setTimeout(function() {
            item.classList.add("active");
          }, delayInMilliseconds);
        });
      });
      subMenuItem.addEventListener('mouseout', function subHoverOut(event) { 
        subMenuOpis.forEach(item=> {
          item.classList.remove("active");
        });
      });

    });
  
/*
** otwieranie i zamykanie panelu ZAPISANE ARTYKULY
*/
  const zapisaneClose = document.querySelectorAll(".zapisane-close"),
      zapisaneOpen = document.querySelectorAll(".zapisane-artykuly-button"),
      zapisanePanel = document.getElementById("zapisane-artykuly-panel");
  
  zapisaneOpen.forEach(zapisaneOpenItem => {
    zapisaneOpenItem.addEventListener('click', function handleClick(event) {
      zapisanePanel.classList.add("active");
      bodyOverflow('add');
      });
  });
  zapisaneClose.forEach(zapisaneCloseItem => {
    zapisaneCloseItem.addEventListener('click', function handleClick(event) {
      zapisanePanel.classList.remove("active");
      bodyOverflow();
    });
  });


  /*
  ** Nawigacja (otwieranie i zamykanie) blokami Autorzy i Bibliografia
  */
  const 
        bibliogr_container = document.getElementById("block-bibliografia"),
        bibliogr_button_open = document.querySelector("#block-bibliografia button.article-footer_expand"),
        bibliogr_button_close = document.querySelector("#block-bibliografia button.article-footer_close"),
        autorzy_container = document.getElementById("block-autorzy"),
        autorzy_button_open = document.querySelector("#block-autorzy button.article-footer_expand"),
        autorzy_button_close = document.querySelector("#block-autorzy button.article-footer_close");

 if (  bibliogr_container ){

    bibliogr_button_open.addEventListener('click', function expand_artfoot(event) {   
      bibliogr_container.classList.add('expanded');
      bibliogr_button_open.classList.toggle('hidden');
      bibliogr_button_close.classList.toggle('hidden');
    });
        
    bibliogr_button_close.addEventListener('click', function expand_artfoot(event) {   
      bibliogr_container.classList.remove('expanded');
      bibliogr_button_open.classList.toggle('hidden');
      bibliogr_button_close.classList.toggle('hidden');
    });

    autorzy_button_open.addEventListener('click', function expand_artfoot(event) {   
      autorzy_container.classList.add('expanded');
      autorzy_button_open.classList.toggle('hidden');
      autorzy_button_close.classList.toggle('hidden');
    });
      
    autorzy_button_close.addEventListener('click', function expand_artfoot(event) {   
      autorzy_container.classList.remove('expanded');
      autorzy_button_open.classList.toggle('hidden');
      autorzy_button_close.classList.toggle('hidden');
    });
  }

/*
MENU TOGGLE ON SCROLL
*/
var prevScrollpos = window.pageYOffset;

window.onscroll = function() {
  var currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navi-strip").style.top = "0";
    if (currentScrollPos < 200) {
      document.getElementById("navi-strip").classList.remove("menuontop")
    }
  } else if (currentScrollPos > 100) {
    document.getElementById("navi-strip").style.top = "-9rem";
    document.getElementById("navi-strip").classList.add("menuontop")
  }else{
    document.getElementById("navi-strip").classList.remove("menuontop")
  }
  prevScrollpos = currentScrollPos;
}

/*
** MASONRY OPTIONS
*/
var elem = document.querySelector('.grid');
var msnry = new Masonry( elem, {
  // options
  columnWidth: '.grid-sizer',
  itemSelector: '.grid-item',
  percentPosition: true
});

// element argument can be a selector string
//   for an individual element
var msnry = new Masonry( '.grid', {
  // options
  gutter: 52
});

});