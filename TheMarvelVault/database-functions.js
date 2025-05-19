// database-functions.js
// database-functions.js
import { db } from './firebase-config.js';

// Function to fetch and display data from a Firestore collection
async function fetchAndDisplayData(collectionName, containerElementId, displayFunction) {
  try {
    const container = document.getElementById(containerElementId);
    if (!container) {
      console.error(`Container element with ID "${containerElementId}" not found.`);
      return;
    }

    const snapshot = await db.collection(collectionName).get();
    if (snapshot.empty) {
      container.innerHTML = '<p>No data found.</p>';
      return;
    }

    container.innerHTML = ''; // Clear existing content
    snapshot.forEach(doc => {
      const data = doc.data();
      displayFunction(data, container);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    container.innerHTML = '<p>Error fetching data.</p>';
  }
}

// Example display function for movies
function displayMovie(movie, container) {
  const movieCard = document.createElement('div');
  movieCard.classList.add('movie-card');
  movieCard.innerHTML = `<img src="${movie.image}" alt="${movie.title}">
                         <div class="movie-info">
                           <p class="movie-title">${movie.title}</p>
                           <p class="movie-date">${movie.year}</p>
                         </div>`;
  container.appendChild(movieCard);
}

// Example display function for news
function displayNews(newsItem, container) {
  const newsCard = document.createElement('div');
  newsCard.classList.add('news-card');
  newsCard.innerHTML = `<img src="${newsItem.image}" alt="${newsItem.title}">
                        <h3>${newsItem.title}</h3>
                        <p>${newsItem.content}</p>`;
  container.appendChild(newsCard);
}

// Example display function for characters
function displayCharacter(character, container) {
  const characterCard = document.createElement('div');
  characterCard.classList.add('character-card');
  characterCard.innerHTML = `<img src="${character.image}" alt="${character.name}">
                             <h3>${character.name}</h3>
                             <p>${character.description}</p>`;
  container.appendChild(characterCard);
}

// Example display function for tv shows
function displayTVShow(tvShow, container) {
  const tvShowCard = document.createElement('div');
  tvShowCard.classList.add('tvshow-card');
  tvShowCard.innerHTML = `<img src="${tvShow.image}" alt="${tvShow.title}">
                          <h3>${tvShow.title}</h3>
                          <p>${tvShow.description}</p>`;
  container.appendChild(tvShowCard);
}

// Function to add data to Firestore
async function addData(collectionName, data) {
  try {
    await db.collection(collectionName).add(data);
    console.log('Data added successfully to ', collectionName);
  } catch (error) {
    console.error('Error adding data to ', collectionName, ':', error);
  }
}

// Function to edit data in Firestore
async function editData(collectionName, docId, data) {
    try {
        await db.collection(collectionName).doc(docId).update(data);
        console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document:', error);
    }
}

// Function to delete data from Firestore
async function deleteData(collectionName, docId) {
    try {
        await db.collection(collectionName).doc(docId).delete();
        console.log('Document successfully deleted!');
    } catch (error) {
        console.error('Error removing document:', error);
    }
}

export { fetchAndDisplayData, displayMovie, displayNews, displayCharacter, displayTVShow, addData, editData, deleteData };
