// call function to retrieve pokemon data
const fetchPokemon = () => {
  retrievePokemon();
};

// sends request to api returning all pokemons in a range
function retrievePokemon() {
  for (let i = 1; i <= 150; i++) {
    var pokeRequest = $.ajax({
      url: `https://pokeapi.co/api/v2/pokemon/${i}`,
      type: "GET"
    });

    pokeRequest.done(function (response) {

      let pokemons = document.querySelector("#poke__container");
      let pokemon_card = document.createElement("div");
      let pokemon_image_container = document.createElement("div");
      let pokemon_image = document.createElement("img")
      let pokemon_like_container = document.createElement("div")
      let pokemon_like = document.createElement("i")
      let pokemon_name = document.createElement("h4");
      let separator = document.createElement("hr");

      // setting up attributes

      // pokemon card
      pokemon_card.classList.add("card_pokemon")

      // pokemon like container
      pokemon_like_container.classList.add("pokeLike__container")

      // pokemon image container
      pokemon_image_container.classList.add("pokeImage__container")

      // pokemon image
      pokemon_image.setAttribute('src', `${response.sprites.other["official-artwork"].front_default}`)
      pokemon_image.setAttribute('width', '100');
      pokemon_image.setAttribute('height', '100');

      // pokemon like
      if (localStorage.getItem(response.name) == 'liked') {
        pokemon_like.classList.add("fa-solid");
        pokemon_like.classList.add("fa-heart");
        pokemon_like.classList.add("likable");
      } else {
        pokemon_like.classList.add("far");
        pokemon_like.classList.add("fa-heart");
        pokemon_like.classList.add("likable");
      }
      pokemon_like.setAttribute('id', `${response.name}`);


      // pokemon name
      pokemon_name.classList.add("text-center")


      // setting up children
      pokemon_image_container.appendChild(pokemon_image)
      pokemon_image_container.appendChild(pokemon_like_container)
      pokemon_like_container.appendChild(pokemon_like)

      pokemon_name.innerText = response.name

      pokemon_card.appendChild(pokemon_image_container)
      pokemon_card.appendChild(separator)
      pokemon_card.appendChild(pokemon_name)

      pokemons.appendChild(pokemon_card)

      // setting up pokemon like buttons
      let likes = document.getElementsByClassName('likable')

      if (likes.length == 150) {
        for (var i = 0; i < likes.length; i++) {
          likes[i].addEventListener("click", function () {
            if (this.classList.contains("far")) {
              this.classList.remove("far")
              this.classList.remove("fa-heart")
              this.classList.add("fa-solid")
              this.classList.add("fa-heart")

              localStorage.setItem(this.id, 'liked')
              addpokemon()
              location.reload()
            } else {
              this.classList.remove("fa-solid")
              this.classList.remove("fa-heart")
              this.classList.add("far")
              this.classList.add("fa-heart")

              localStorage.removeItem(this.id)
              addpokemon()
            }
          });
        }
      }
    });
  }
}


fetchPokemon();

// retrieve all saved data from localstorage
function retrieveAllStorage() {
  let localStorageItems = []
  let keys = Object.keys(localStorage);
  let i = keys.length;
  while (i--) {
    localStorageItems.push(keys[i]);
  }
  return localStorageItems;
}

// remove pokemon from localstorage
function removePokemon(pokemon){
  localStorage.removeItem(pokemon)
}


// add pokemons to DOM
function addpokemon() {
  let favoriteInfo = document.getElementsByClassName('favorite__Info')[0];
  let favoriteInfoResponsive = document.getElementsByClassName('favorite__InfoResponsive')[0];

  let favorites = retrieveAllStorage()  
  favoriteInfo.innerHTML = ''
  favoriteInfoResponsive.innerHTML = ''

  favorites.forEach(element => {
    let favorite_container = document.createElement("div")
    favorite_container.classList.add("favorite__container")
    let linkPokemon = document.createElement("button")
    linkPokemon.classList.add('btn')
    linkPokemon.classList.add('delete-pokemon')
    let deletePokemon = document.createElement("i")
    deletePokemon.classList.add('fas')
    deletePokemon.classList.add('fa-trash')
    linkPokemon.appendChild(deletePokemon)
  
    let strongPokemon = document.createElement('b')
    strongPokemon.innerText = element


    favorite_container.appendChild(strongPokemon)
    favorite_container.appendChild(linkPokemon)

    let copy_favorite_container = favorite_container.cloneNode(true)

    favoriteInfo.appendChild(favorite_container)
    favoriteInfoResponsive.appendChild(copy_favorite_container)
  })
}


addpokemon()


// on dom completely loaded
document.addEventListener("DOMContentLoaded", function(event) {
  let deletar = document.querySelectorAll('.delete-pokemon')
  deletar.forEach(item => {
    item.addEventListener('click',deleteFromFav)
  })
});

// remove pokemons from favorites (unlikes)
function deleteFromFav() {
  removePokemon(this.closest('div').firstChild.innerText)
  let liked = document.getElementById(`${this.closest('div').firstChild.innerText}`)
  this.closest('div').remove(); 
  liked.classList.remove("fa-solid")
  liked.classList.remove("fa-heart")
  liked.classList.add("far")
  liked.classList.add("fa-heart")
}
