document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('shortcut-form');
  const nameInput = document.getElementById('shortcut-name');
  const urlInput = document.getElementById('shortcut-url');
  const list = document.getElementById('shortcut-list');

  function renderShortcuts(shortcuts) {
    list.innerHTML = '';
    shortcuts.forEach((shortcut, index) => {
      const li = document.createElement('li');
      li.textContent = `${shortcut.name} → ${shortcut.url}`;

      const removeBtn = document.createElement('span');
      removeBtn.textContent = ' [Remove]';
      removeBtn.classList.add('remove');
      removeBtn.addEventListener('click', () => {
        shortcuts.splice(index, 1);
        chrome.storage.sync.set({ shortcuts }, () => {
          renderShortcuts(shortcuts);
        });
      });

      li.appendChild(removeBtn);
      list.appendChild(li);
    });
  }

  chrome.storage.sync.get('shortcuts', (data) => {
    const shortcuts = data.shortcuts || [];
    renderShortcuts(shortcuts);
  });

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const name = nameInput.value.trim();
    const url = urlInput.value.trim();
    if (!name || !url) return;

    chrome.storage.sync.get('shortcuts', (data) => {
      const shortcuts = data.shortcuts || [];
      shortcuts.push({ name, url });
      chrome.storage.sync.set({ shortcuts }, () => {
        renderShortcuts(shortcuts);
        form.reset();
      });
    });
  });
});
