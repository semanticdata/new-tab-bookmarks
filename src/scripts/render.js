const render = (columns) => {
    const colors = options.COLOR_THEME;
    const root = document.getElementById('bookmarks');

    let colorIndex = 0;
    // Clear the root element safely
    while (root.firstChild) {
        root.removeChild(root.firstChild);
    }

    columns.forEach((column) => {
        if (!column.children.length) return;

        colorIndex = (colorIndex + 1) % colors.length;

        // Create DOM elements instead of using innerHTML
        const columnDiv = document.createElement('div');
        columnDiv.className = 'column';

        const heading = document.createElement('h2');
        heading.className = `folder-name color-${colorIndex}`;
        heading.textContent = column.title;

        const ul = document.createElement('ul');

        // Create list items using DOM methods instead of innerHTML
        column.children.forEach((bookmark) => {
            const li = document.createElement('li');

            if (bookmark.isSeparator) {
                li.className = 'separator';
                li.innerHTML = '&nbsp;'; // This is safe as it's a fixed string
            } else {
                const a = document.createElement('a');
                a.href = bookmark.url;

                const title = trunc(
                    bookmark.path.slice(1).concat(bookmark.title).join('/')
                );

                a.textContent = title;

                if (title.endsWith('…')) {
                    a.title = bookmark.title;
                }

                li.appendChild(a);
            }

            ul.appendChild(li);
        });

        columnDiv.appendChild(heading);
        columnDiv.appendChild(ul);
        root.appendChild(columnDiv);
    });

    document.getElementById('welcome').textContent = options.TITLE;
};
