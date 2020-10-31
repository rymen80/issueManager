import axios from "axios";

export default {
  search: function() {
    return axios.get('https://dog.ceo/api/breeds/image/random');
  },
  searchByBreed: function(breed) {
    return axios.get(`https://dog.ceo/api/breed/${breed}/images`);
  }
};



