const render = (columns) => {
    const colors = options.COLOR_THEME;
    const root = document.getElementById('bookmarks');

    let colorIndex = 0;
    root.innerHTML = '';

    columns.forEach((column) => {
        if (!column.children.length) return;

        const listItems = column.children
            .map((bookmark) => {
                const title = trunc(
                    bookmark.path.slice(1).concat(bookmark.title).join('/')
                );

                if (bookmark.isSeparator) {
                    return '<li class="separator">&nbsp;</li>';
                }

                const titleAttribute = title.endsWith('…') ? ` title="${bookmark.title}"` : '';
                return `<li><a href="${bookmark.url}"${titleAttribute}>${title}</a></li>`;
            })
            .join('');

        colorIndex = (colorIndex + 1) % colors.length;
        const columnHtml = `
        <div class="column">
          <h2 class="folder-name color-${colorIndex}">${column.title}</h2>
          <ul>${listItems}</ul>
        </div>`;

        root.innerHTML += columnHtml;
    });

    document.getElementById('welcome').textContent = options.TITLE;
};
