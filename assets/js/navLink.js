class HeaderContainer extends HTMLElement{
    connectedCallback(){
        this.innerHTML = `
        <link rel="stylesheet" href="./assets/css/alert.css">
        <header id="header">
            <div class="header-inner flex">
                <div class="logo">
                    <a href="/"><img src="./images/logo.png" alt="Logo icon"></a>
                </div>
                <div id="menu-toggle">
                    <span class="fa-solid fa-bars"></span>

                </div>
                <nav role="navigation">
                    <ul id="navigation-menu" class="flex">
                        <li>
                            <form class="search flex" action="" id="formSearch">
                                <label for="search-form">Search Form</label>
                                <input type="search" id="search-form" name="search-form">
                                <button id="main_search" type="submit">

                                    <span class="fa-solid fa-magnifying-glass search-icon"></span>
                                </button>
                                <span id=alertDialog>You need to enter a recipe name</span>
                            </form>
                        </li>    
                        <li><a class="nav_bar_link_item" href="./category.html">ΚΑΤΗΓΟΡΙΕΣ</a></li>
                        <li><a class="nav_bar_link_item" href="./recipe-registration.html">ΚΑΤΑΧΩΡΗΣΗ ΣΥΝΤΑΓΗΣ</a></li>
                        <!--<li><a class="nav_bar_link_item" href="./login.html">LOGIN</a></li>
                        <li><a class="nav_bar_link_item" href="./register.html">REGISTER</a></li>-->
                    </ul>
                </nav>
            </div>    
        </header>`;
    }
}

class FooterContainer extends HTMLElement {
    connectedCallback(){
        this.innerHTML=`<footer class="flex">
            <div class="logo flex">
                <img src="./images/logo.png" alt="Logo icon">
            </div>
            <div class="copyright"><span>Copyright © 2024 Συνταγές Μαγειρικής. All rights reserved. Designed &amp; Built by Λούζης Νίκος, Μπακαλώνη Ελπίδα, Τζιβένης Κωνσταντίνος</span>
            </div>
        </footer>`
    }
}





customElements.define("header-container", HeaderContainer);

customElements.define("footer-container", FooterContainer);