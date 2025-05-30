// script.js
document.addEventListener('DOMContentLoaded', () => {
  const matchesContainer = document.getElementById('matches');
  
  fetch('http://localhost:3000/matches')
    .then(response => response.json())
    .then(data => {
      if (data.matches && data.matches.length > 0) {
        matchesContainer.classList.remove('loading');
        let matchesHtml = '<h2>Upcoming Matches</h2><ul>';
        
        data.matches.forEach(match => {
          matchesHtml += `
            <li>
              <div class="team-names">
                ${match.homeTeam.name} vs ${match.awayTeam.name}
              </div>
              <div class="match-time">
                ${new Date(match.utcDate).toLocaleString()}
              </div>
            </li>
          `;
        });
        
        matchesHtml += '</ul>';
        matchesContainer.innerHTML = matchesHtml;
      } else {
        matchesContainer.classList.remove('loading');
        matchesContainer.classList.add('failed');
        matchesContainer.innerText = 'No upcoming matches available';
      }
    })
    .catch(error => {
      matchesContainer.classList.remove('loading');
      matchesContainer.classList.add('failed');
      matchesContainer.innerText = 'Failed to load matches';
      console.error('Error fetching matches:', error);
    });
});
