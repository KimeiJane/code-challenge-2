const form = document.getElementById('guest-form');
const guestList = document.getElementById('guest-list');
const guestNameInput = document.getElementById('guest-name');
const guestCategory = document.getElementById('guest-category');

const categoryColor = {
  Friend: 'tag-friend',
  Family: 'tag-family',
  Colleague: 'tag-colleague'
};

// Format time nicely
function formatTime(date) {
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}

// Add guest
form.addEventListener('submit', function (e) {
  e.preventDefault();

  if (guestList.children.length >= 10) {
    alert("Guest limit reached! You can only add up to 10 guests.");
    return;
  }

  const name = guestNameInput.value.trim();
  const category = guestCategory.value;
  const time = formatTime(new Date());

  if (name === '') return;

  const categoryClass = categoryColor[category] || 'tag-default';

  const li = document.createElement('li');
  li.innerHTML = `
    <span class="name">${name}</span>
    <span class="tag ${categoryClass}">${category}</span>
    <small class="time">added at ${time}</small>
    <div class="buttons">
      <button class="edit">Edit</button>
      <button class="remove">Remove</button>
      <button class="rsvp">Attending</button>
    </div>
  `;

  guestList.appendChild(li);
  guestNameInput.value = '';
});

// Event delegation for edit/remove/rsvp
guestList.addEventListener('click', function (e) {
  const btn = e.target;
  const li = btn.closest('li');

  if (btn.classList.contains('remove')) {
    li.remove();
  }

  if (btn.classList.contains('edit')) {
    const nameSpan = li.querySelector('.name');
    const newName = prompt('Edit guest name:', nameSpan.textContent);
    if (newName && newName.trim() !== '') {
      nameSpan.textContent = newName.trim();
    }
  }

  if (btn.classList.contains('rsvp')) {
    btn.textContent =
      btn.textContent === 'Attending' ? 'Not Attending' : 'Attending';
    btn.classList.toggle('not-attending');
    li.classList.toggle('not-coming');
  }
});
