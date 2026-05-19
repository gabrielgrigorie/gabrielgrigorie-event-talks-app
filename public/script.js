document.addEventListener('DOMContentLoaded', () => {
    fetch('/data/talks.json')
        .then(response => response.json())
        .then(talks => {
            const scheduleContainer = document.getElementById('schedule');
            const categorySearchInput = document.getElementById('categorySearch');

            // Store original talks to reset filters
            let allTalks = talks;

            function renderSchedule(filteredTalks) {
                scheduleContainer.innerHTML = ''; // Clear existing schedule
                filteredTalks.forEach(talk => {
                    const talkCard = document.createElement('div');
                    talkCard.classList.add('talk-card');
                    if (talk.id === 'lunch') {
                        talkCard.classList.add('break');
                    }

                    let speakersHtml = '';
                    if (talk.speakers && talk.speakers.length > 0) {
                        speakersHtml = `<h3>${talk.speakers.join(' & ')}</h3>`;
                    }

                    let categoryHtml = '';
                    if (talk.category && talk.category.length > 0) {
                        categoryHtml = `<p class="category">Categories: ${talk.category.join(', ')}</p>`;
                    }

                    talkCard.innerHTML = `
                        <p class="time">${talk.startTime} - ${talk.endTime}</p>
                        <h2>${talk.title}</h2>
                        ${speakersHtml}
                        <p>${talk.description}</p>
                        ${categoryHtml}
                        ${talk.id !== 'lunch' ? `<p class="duration">Duration: ${talk.duration} minutes</p>` : ''}
                    `;
                    scheduleContainer.appendChild(talkCard);
                });
            }

            // Initial render
            renderSchedule(allTalks);

            // Search functionality
            categorySearchInput.addEventListener('keyup', (event) => {
                const searchTerm = event.target.value.toLowerCase();
                const filteredTalks = allTalks.filter(talk => {
                    if (talk.category) {
                        return talk.category.some(cat => cat.toLowerCase().includes(searchTerm));
                    }
                    return false;
                });
                renderSchedule(filteredTalks);
            });
        })
        .catch(error => console.error('Error fetching talks:', error));
});
