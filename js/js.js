
document.addEventListener("DOMContentLoaded", () => {

  function findIdOfParent(obj) {
      var o = obj;
      while(!o.id) {
        o = o.parentNode;
      }
      return(o.id);
    }

  var menuItems = document.querySelectorAll("#desktop-menu .main-menu .menu-item"),
      subItems = document.querySelectorAll("#desktop-menu .sub-menu"),
      mobileMenuButon = document.querySelector("#mobile-menu nav > div > .menu-item"),
      mobileMenuClose = document.querySelector("#mobile-menu-close"),
      mobileSubMenu = document.querySelectorAll("button.sub-menu-item"),
      mobileSubMenuItems = document.querySelectorAll(".mobile-sub-menu-items"),
      mobileSubMenuBack = document.querySelectorAll(".mobile-menu-back > img");

  const naviStrip = document.getElementById("navi-strip"),
        body = document.body;

  function bodyOverflow(data){
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
    document.querySelector("#mobile-menu nav > .sub-menu").classList.add("active");
    bodyOverflow('add');
  });
  
  mobileMenuClose.addEventListener('click', function mobileMenuClick(event) { 
    document.querySelector("#mobile-menu nav > .sub-menu").classList.remove("active");
    mobileSubMenuItems.forEach(SubMenuItem => {
      SubMenuItem.classList.remove("active");
    });
    bodyOverflow();
  });

  mobileSubMenu.forEach(SubMenuItem => {
    SubMenuItem.addEventListener('click', function MbileSubMenuClick(event) { 
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


  var subMenuItems = document.querySelectorAll(".sub-menu-item > a"),
      subMenuOpis = document.querySelectorAll(".submenu-opis"),
      delayInMilliseconds = 30;

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


  /**
 * Set appropriate spanning to any masonry item
 *
 * Get different properties we already set for the masonry, calculate 
 * height or spanning for any cell of the masonry grid based on its 
 * content-wrapper's height, the (row) gap of the grid, and the size 
 * of the implicit row tracks.
 *
 * @param item Object A brick/tile/cell inside the masonry
 */
function resizeMasonryItem(item){
  /* Get the grid object, its row-gap, and the size of its implicit rows */
  var grid = document.getElementsByClassName('masonry')[0],
      rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-row-gap')),
      rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));

  /*
   * Spanning for any brick = S
   * Grid's row-gap = G
   * Size of grid's implicitly create row-track = R
   * Height of item content = H
   * Net height of the item = H1 = H + G
   * Net height of the implicit row-track = T = G + R
   * S = H1 / T
   */
  var rowSpan = Math.ceil((item.querySelector('.masonry-content').getBoundingClientRect().height+rowGap)/(rowHeight+rowGap));

  /* Set the spanning as calculated above (S) */
  item.style.gridRowEnd = 'span '+rowSpan;
}
/**
 * Apply spanning to all the masonry items
 *
 * Loop through all the items and apply the spanning to them using 
 * `resizeMasonryItem()` function.
 *
 * @uses resizeMasonryItem
 */
 function resizeAllMasonryItems(){
  // Get all item class objects in one list
  var allItems = document.getElementsByClassName('masonry-brick');

  /*
   * Loop through the above list and execute the spanning function to
   * each list-item (i.e. each masonry item)
   */
  for(var i=0;i<allItems.length;i++){
    resizeMasonryItem(allItems[i]);
  }
}
/**
 * Resize the items when all the images inside the masonry grid 
 * finish loading. This will ensure that all the content inside our
 * masonry items is visible.
 *
 * @uses ImagesLoaded
 * @uses resizeMasonryItem
 */
 function waitForImages() {
  var allItems = document.getElementsByClassName('masonry-brick');
  for(var i=0;i<allItems.length;i++){
    imagesLoaded( allItems[i], function(instance) {
      var item = instance.elements[0];
      resizeMasonryItem(item);
    } );
  }
}
/* Resize all the grid items on the load and resize events */
var masonryEvents = ['load', 'resize'];
masonryEvents.forEach( function(event) {
  window.addEventListener(event, resizeAllMasonryItems);
} );
/* Do a resize once more when all the images finish loading */
waitForImages();

});
 