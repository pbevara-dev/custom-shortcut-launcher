document.addEventListener('DOMContentLoaded', () => {
  const list = document.getElementById('shortcut-list');

  chrome.storage.sync.get('shortcuts', (data) => {
    const shortcuts = data.shortcuts || [];
    if (shortcuts.length === 0) {
      list.innerHTML = '<li>No shortcuts defined. <br>Go to Manage Shortcuts.</li>';
      return;
    }

    shortcuts.forEach(shortcut => {
      const li = document.createElement('li');
      const link = document.createElement('a');
      link.href = shortcut.url;
      link.target = '_blank';
      link.textContent = shortcut.name;
      li.appendChild(link);
      list.appendChild(li);
    });
  });
});
