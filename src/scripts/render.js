const render = (columns) => {
  const { COLOR_THEME: colors, TITLE } = options;
  const root = document.getElementById("bookmarks");

  root.innerHTML = ""; // Clear the root content once

  const fragment = document.createDocumentFragment(); // Use a fragment for batch DOM insertion

  columns.forEach((column, colorIndex) => {
    if (!column.children.length) return;

    const columnDiv = document.createElement("div");
    columnDiv.classList.add("column");

    const folderName = document.createElement("h2");
    folderName.classList.add(
      `folder-name`,
      `color-${colorIndex % colors.length}`
    );
    folderName.textContent = column.title;
    columnDiv.appendChild(folderName);

    const ul = document.createElement("ul");

    column.children.forEach((bookmark) => {
      const li = document.createElement("li");

      if (bookmark.isSeparator) {
        li.classList.add("separator");
        li.innerHTML = "&nbsp;";
      } else {
        const a = document.createElement("a");
        // const title = trunc(bookmark.path.slice(1).concat(bookmark.title).join("/"));
        // Using template literal for title
        const title = trunc(
          // `${bookmark.path.slice(1).join("/")}/${bookmark.title}`
          `${bookmark.path.slice(1).join("/")}${bookmark.title}`
        );

        a.href = bookmark.url;
        a.textContent = title;

        if (title.endsWith("…")) {
          a.title = bookmark.title;
        }
        li.appendChild(a);
      }

      ul.appendChild(li);
    });

    columnDiv.appendChild(ul);
    fragment.appendChild(columnDiv);
  });

  root.appendChild(fragment);
  document.getElementById("welcome").textContent = TITLE;
};
