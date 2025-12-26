document.addEventListener('DOMContentLoaded', () => {
  const tiles = document.querySelectorAll('#deliverableGrid .tile');
  const detail = document.getElementById('tileDetail');
  const preview = document.getElementById('tilePreviewImage');

  const setActive = (tile) => {
    tiles.forEach(t => t.classList.remove('active'));
    tile.classList.add('active');
    if (detail) detail.textContent = tile.dataset.detail || '';
    if (preview) {
      const img = tile.querySelector('img');
      if (img) preview.src = img.src;
    }
  };

  tiles.forEach(tile => {
    tile.addEventListener('click', () => setActive(tile));
  });

  if (tiles.length) setActive(tiles[0]);
});
