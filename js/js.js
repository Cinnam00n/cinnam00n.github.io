
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
    }{
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
      
});