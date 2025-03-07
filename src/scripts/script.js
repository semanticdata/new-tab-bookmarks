const columns = [];

chrome.bookmarks.getTree((items) => {
  const bookmarksBar = items[0].children.find((x) =>
    options.ROOT_FOLDER.test(x.title)
  );

  if (!bookmarksBar) {
    console.error(`Expected a folder called '${options.ROOT_FOLDER}'`);
    return;
  }

  const rootColumn = { title: '/', children: [] };
  bookmarksBar.children.forEach((node) => {
    if (node.children) {
      const column = { title: node.title, children: [] };
      visit(column, node);
      columns.push(column);
    } else {
      addBookmark(rootColumn, node);
    }
  });

  if (rootColumn.children.length > 0) {
    columns.push(rootColumn);
  }

  render(columns);
});

const visit = (column, node, path = []) => {
  if (!node.children) {
    addBookmark(column, node, path);
    return;
  }

  node.children.forEach((child) => visit(column, child, [...path, node.title]));
};

const addBookmark = (column, node, path = []) => {
  if (!node.url || node.url.startsWith('javascript:')) {
    // Ignore bookmarklets
    return;
  }

  const isSeparator =
    options.SEPARATORS.includes(node.title) || node.type === 'separator';

  column.children.push({
    title: node.title,
    url: node.url,
    path: path,
    isSeparator
  });
};

document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('welcome').style.color = options.TITLE_COLOR;
});
