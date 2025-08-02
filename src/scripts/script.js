// BOOKMARKS PROCESSING - Main script for fetching and organizing bookmarks
const { api: browserAPI } = getBrowserInfo();

// Array to store bookmark columns for rendering
const columns = [];

/**
 * Initializes the bookmark processing and rendering
 */
const initializeBookmarks = () => {
  try {
    // Fetch the bookmark tree from browser's bookmarks API
    if (browserAPI.bookmarks && browserAPI.bookmarks.getTree) {
      browserAPI.bookmarks.getTree((items) => {
        try {
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
        } catch (error) {
          console.error('Error processing bookmarks:', error);
        }
      });
    } else {
      console.error('Bookmarks API not available');
    }
  } catch (error) {
    console.error('Error fetching bookmark tree:', error);
  }
};

// Initialize bookmarks when called
initializeBookmarks();

/**
 * Recursively processes bookmark nodes and their children
 * @param {Object} column - The column object to add bookmarks to
 * @param {Object} node - The bookmark node to process
 * @param {string[]} path - The hierarchical path to the current node
 */
const visit = (column, node, path = []) => {
  if (!node.children) {
    // If the node is a bookmark (not a folder), add it to the column
    addBookmark(column, node, path);
    return;
  }

  // Process each child of the folder, maintaining the path for hierarchy
  node.children.forEach((child) => visit(column, child, [...path, node.title]));
};

/**
 * Adds a bookmark to a column with proper filtering and formatting
 * @param {Object} column - The column object to add the bookmark to
 * @param {Object} node - The bookmark node to add
 * @param {string[]} path - The hierarchical path to the bookmark
 */
const addBookmark = (column, node, path = []) => {
  if (!node.url || node.url.startsWith('javascript:')) {
    // Ignore bookmarklets and items without URLs for security
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
