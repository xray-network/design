/**
 * Sorting for plain HTML tables. Click a sort button to sort by that column; click again to reverse.
 * Cells sort by their data-value attribute when present (numbers, dates), otherwise by their text.
 *
 *   <th scope="col" aria-sort="descending" data-align="end"><button class="x-table-compact-sort" type="button">Requests …</button></th>
 *   <td data-align="end" data-value="182340">182,340</td>
 *
 * In an app that sorts on the server or in React, set aria-sort yourself and skip this controller.
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initTablesCompact(root = document) {
  const onClick = (event) => {
    const button = /** @type {Element} */ (event.target).closest(".x-table-compact-sort");
    const th = button?.closest("th");
    const table = th?.closest("table");
    const body = table?.tBodies[0];
    if (!th || !table || !body) return;

    const column = [...th.parentElement.children].indexOf(th);
    const direction = th.getAttribute("aria-sort") === "descending" ? "ascending" : "descending";
    for (const other of table.querySelectorAll("th[aria-sort]")) other.removeAttribute("aria-sort");
    th.setAttribute("aria-sort", direction);

    const key = (row) => {
      const cell = row.children[column];
      const raw = cell?.getAttribute("data-value") ?? cell?.textContent?.trim() ?? "";
      const n = Number(raw);
      return raw !== "" && !Number.isNaN(n) ? n : raw.toLowerCase();
    };
    const rows = [...body.rows].filter((r) => !r.classList.contains("x-table-compact-empty"));
    rows.sort((a, b) => {
      const x = key(a), y = key(b);
      const order = typeof x === "number" && typeof y === "number" ? x - y : String(x).localeCompare(String(y));
      return direction === "ascending" ? order : -order;
    });
    body.append(...rows);
  };
  root.addEventListener("click", onClick);
  return () => root.removeEventListener("click", onClick);
}
