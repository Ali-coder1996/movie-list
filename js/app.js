'use strict';
let image=['action.png','adventure.png','animation.png','comedy.png','detective.png','fantasy.png','history.png','horror.png','musical.png','pirate.png','romantic.png','sci-fi.png','war.png','western.png'];
function Movie(name, movieCategory, issueYear) {
  this.name = name;
  this.movieCategory=movieCategory;
  this.issueYear=issueYear;
  Movie.array.push(this);
}
Movie.array=[];


let form = document.getElementById('form');

form.addEventListener('submit',handeSubmit);

function handeSubmit(event){
  event.preventDefault();

  let name=event.target.moveName.value;
  let movieCategory=event.target.movieCategory.value;
  let issueYear=event.target.issueYear.value;

  new Movie(name,movieCategory,issueYear );
  setTOLocalStorage();
  start();
  render();


}
let ol =document.querySelector('ol');

function render(){
  for (let x = 0; Movie.array.length; x++) {
    let li = document.createElement('li');
    ol.appendChild(li);
    li.innerHTML=`<a onclick='del(${x})'>x</a>  ${Movie.array[x].name} ${Movie.array[x].issueYear}`;

  }
}
Movie.prototype.remove=function(id){
  Movie.array.splice(id,1);
  setTOLocalStorage();
};
function del(id){
  Movie.prototype.remove(id);
  start();
}





start();
function start(){
  ol.innerHTML='';
  let lsMovie=getFromLocalStorage();
  if(lsMovie.length >0){
    Movie.array=[];
    for (let i = 0; i < lsMovie.length; i++) {
      new Movie(lsMovie[i].name,lsMovie[i].movieCategory,lsMovie[i].issueYear );
      render();
    }
  }
}

function setTOLocalStorage(){
  localStorage.setItem('movie',JSON.stringify(Movie.array));
}

function getFromLocalStorage(){
  let data = JSON.parse(localStorage.getItem('movie')) || [];
  return data;
}
getFromLocalStorage();
