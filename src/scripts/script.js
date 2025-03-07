// Array to store bookmark columns for rendering
const columns = [];

// Fetch the bookmark tree from Chrome's bookmarks API
chrome.bookmarks.getTree((items) => {
  // Find the bookmarks bar folder that matches the ROOT_FOLDER regex
  const bookmarksBar = items[0].children.find((x) =>
    options.ROOT_FOLDER.test(x.title)
  );

  // Exit if the root folder isn't found
  if (!bookmarksBar) {
    console.error(`Expected a folder called '${options.ROOT_FOLDER}'`);
    return;
  }

  // Create a root column for bookmarks not in folders
  const rootColumn = { title: '/', children: [] };

  // Process each child of the bookmarks bar
  bookmarksBar.children.forEach((node) => {
    if (node.children) {
      // If the node is a folder, create a new column
      const column = { title: node.title, children: [] };
      visit(column, node);
      columns.push(column);
    } else {
      // If the node is a bookmark, add it to the root column
      addBookmark(rootColumn, node);
    }
  });

  // Only add the root column if it has children
  if (rootColumn.children.length > 0) {
    columns.push(rootColumn);
  }

  // Render the columns to the page
  render(columns);
});

// Recursive function to visit bookmark nodes and their children
const visit = (column, node, path = []) => {
  if (!node.children) {
    // If the node is a bookmark (not a folder), add it to the column
    addBookmark(column, node, path);
    return;
  }

  // Process each child of the folder, maintaining the path for hierarchy
  node.children.forEach((child) => visit(column, child, [...path, node.title]));
};

// Function to add a bookmark to a column
const addBookmark = (column, node, path = []) => {
  if (!node.url || node.url.startsWith('javascript:')) {
    // Ignore bookmarklets and items without URLs
    return;
  }

  // Check if the bookmark is a separator
  const isSeparator =
    options.SEPARATORS.includes(node.title) || node.type === 'separator';

  // Add the bookmark to the column's children array
  column.children.push({
    title: node.title,
    url: node.url,
    path: path,
    isSeparator
  });
};

// Set the welcome message color when the DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('welcome').style.color = options.TITLE_COLOR;
});
