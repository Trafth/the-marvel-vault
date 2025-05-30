
import { db } from './firebase-config.js';

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

    container.innerHTML = ''; 
    snapshot.forEach(doc => {
      const data = doc.data();
      displayFunction(data, container);
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    container.innerHTML = '<p>Error fetching data.</p>';
  }
}

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


function displayNews(newsItem, container) {
  const newsCard = document.createElement('div');
  newsCard.classList.add('news-card');
  newsCard.innerHTML = `<img src="${newsItem.image}" alt="${newsItem.title}">
                        <h3>${newsItem.title}</h3>
                        <p>${newsItem.content}</p>`;
  container.appendChild(newsCard);
}

function displayCharacter(character, container) {
  const characterItem = document.createElement('div');
  characterItem.classList.add('character-item');
  characterItem.innerHTML = `<img src="${character.image}" alt="${character.name}">
                             <h4 class="character-title">${character.name}</h4>
                             <p class="character-series">${character.series}</p>`;
  container.appendChild(characterItem);
}

function displayTVShow(tvShow, container) {
  const tvShowCard = document.createElement('div');
  tvShowCard.classList.add('tvshow-card');
  tvShowCard.innerHTML = `<img src="${tvShow.image}" alt="${tvShow.title}">
                          <h3>${tvShow.title}</h3>
                          <p>${tvShow.description}</p>`;
  container.appendChild(tvShowCard);
}

async function addData(collectionName, data) {
  try {
    await db.collection(collectionName).add(data);
    console.log('Data added successfully to ', collectionName);
  } catch (error) {
    console.error('Error adding data to ', collectionName, ':', error);
  }
}

async function editData(collectionName, docId, data) {
    try {
        await db.collection(collectionName).doc(docId).update(data);
        console.log('Document updated successfully!');
    } catch (error) {
        console.error('Error updating document:', error);
    }
}

async function deleteData(collectionName, docId) {
    try {
        await db.collection(collectionName).doc(docId).delete();
        console.log('Document successfully deleted!');
    } catch (error) {
        console.error('Error removing document:', error);
    }
}

export { fetchAndDisplayData, displayMovie, displayNews, displayCharacter, displayTVShow, addData, editData, deleteData };
