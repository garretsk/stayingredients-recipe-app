import React from "react";
import logoAnim from "../LogoAnimation.gif";
import castIron from "../cast_iron.png";
import subImg from "../sub_img.png";
import pantryImg from "../pantry_img.png";
import shopImg from "../shop_img.png";
import '../home.css';
import 'animate.css';
//maybe add subheadings
//add arrow with explore the website
function Home() {

  function reveal() {
    var reveals = document.querySelectorAll(".reveal");
    for (var i = 0; i < reveals.length; i++) {
      var windowHeight = window.innerHeight;
      var elementTop = reveals[i].getBoundingClientRect().top;
      var elementVisible = 0;
      if (elementTop < windowHeight - elementVisible) {
        reveals[i].classList.add("active");
        revealImg();
      } else {
        reveals[i].classList.remove("active");
      }
    }
  }

  function revealImg(){
    var imgs = document.querySelectorAll(".sectionImg");
    for (var i = 0; i < imgs.length; i++) {
      
      var windowHeight = window.innerHeight;
      var elementTop = imgs[i].getBoundingClientRect().top;
      var elementVisible = 0;
      console.log(windowHeight);
      console.log(elementTop);
      if (elementTop < windowHeight - elementVisible) {
        switch(i){
          case 0:
            imgs[i].classList.add("animate__animated", "animate__fadeInLeft", "animate__delay-2s");
            break;
          case 1:
            imgs[i].classList.add("animate__animated", "animate__jackInTheBox", "animate__delay-2s");
            break;
          case 2:
            imgs[i].classList.add("animate__animated", "animate__rollIn", "animate__delay-2s");
            break;
          case 3:
            imgs[i].classList.add("animate__animated", "animate__rotateIn", "animate__delay-2s");
            break;
          default:
            imgs[i].classList.add("animate__animated", "animate__fadeInLeft", "animate__delay-2s");
            break;
        }
      }
    }
  }

  window.addEventListener("scroll", reveal);

  return (
  <div>
    <div id="homeCard" class="homeCard animate__animated animate__fadeIn">
        <div class="p-5 homeBody">
          <img className="titleImage" src={logoAnim} alt="loading"/>
          <div class="textAlign animate__animated animate__fadeInDown animate__delay-2s" >
            Home cooking made simple.
          </div>
          <div class="animate__animated animate__fadeInDown animate__delay-3s"><div class="arrow-down animate__animated animate__bounce animate__delay-3s"></div></div>
          
        </div>
    </div>
    <div class="section reveal fadeInLeft">
      <h1>
        Find Meals to Cook
      </h1>
      <div class="sectionContainer">
      <div class="reveal fadeInLeft">StayIngredients boasts over 5,000 recipes to keep you and your taste buds refreshed! Search with the help of different filters that will help you find the perfect meal.</div>
        <img class="sectionImg imgLeft" src={castIron} alt="Cast iron"></img>
        <div class="reveal fadeInLeft">Missing an ingredient? No worries! StayIngredients can show you ingredient substitutions if there's any recipe that really catches your eye.</div>
        <img class="sectionImg imgLeft" src={subImg} alt="Substitution"></img>
      </div>
    </div>
    <div class="section reveal fadeInRight">
      <h1 class="titles">
        Customize Your Pantry
      </h1>
      <div class="sectionContainer">
        <img class="sectionImg" src={pantryImg} alt="Pantry"></img>
        <div class="reveal fadeInRight">Keep track of anything found in your pantry! StayIngredients provides over 2,600 ingredients that you can add, update, and remove from your own online pantry.</div>
        <img class="sectionImg" src={shopImg} alt="Grocery bag"></img>
        <div class="reveal fadeInRight">StayIngredients also helps you keep track of what you need with the help of a shopping list. Choose from our wide variety of ingredients to add to your online shopping list for your next grocery run.</div>
      </div>
    </div>
  </div>

  )
}

export default Home;
