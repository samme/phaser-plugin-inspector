export function AddActive (items, pane, options = { title: 'Active' }) {
  const folder = pane.addFolder(options);

  for (const item of items) {
    folder.addInput(item, 'active', { min: 0, max: 1, label: item.name || item.type });
  }

  return folder;
}

export function AddAlpha (items, pane, options = { title: 'Alpha' }) {
  const folder = pane.addFolder(options);

  for (const item of items) {
    folder.addInput(item, 'alpha', { min: 0, max: 1, label: item.name || item.type });
  }

  return folder;
}

export function AddVisible (items, pane, options = { title: 'Visible' }) {
  const folder = pane.addFolder(options);

  for (const item of items) {
    folder.addInput(item, 'visible');
  }

  return folder;
}
