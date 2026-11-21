/**
 * SendForm behavior for plain HTML: Max fills the amount, the summary follows the amount and the fee,
 * and an amount above the available balance shows an error.
 *
 *   <form class="x-send-form" data-available="12480.254221" data-ticker="USD"> …
 *     amount input [data-x-amount], Max button [data-x-max], fee radios with data-fee="0.17",
 *     summary cells [data-x-fee] and [data-x-total]
 *
 * @param {ParentNode} [root]
 * @returns {() => void} cleanup
 */
export function initSendForms(root = document) {
  const cleanups = [];
  for (const form of root.querySelectorAll(".x-send-form[data-available]:not([data-x-ready])")) {
    form.setAttribute("data-x-ready", "");
    const available = Number(form.getAttribute("data-available"));
    const ticker = form.getAttribute("data-ticker") ?? "";
    const amount = /** @type {HTMLInputElement | null} */ (form.querySelector("[data-x-amount]"));
    if (!amount) continue;
    const format = (n) => `${n.toLocaleString("en-US", { minimumFractionDigits: 2, maximumFractionDigits: 6 })} ${ticker}`;
    const fee = () => Number(form.querySelector('input[data-fee]:checked')?.getAttribute("data-fee") ?? 0);
    const value = () => Number(amount.value.replace(/,/g, "")) || 0;

    const update = () => {
      const f = fee();
      const total = value() + f;
      const feeCell = form.querySelector("[data-x-fee]");
      const totalCell = form.querySelector("[data-x-total]");
      if (feeCell) feeCell.textContent = format(f);
      if (totalCell) totalCell.textContent = format(total);

      // Over the balance: mark the amount invalid and show an error under it.
      const field = amount.closest(".x-field");
      const over = total > available;
      let error = field?.querySelector(".x-field-error");
      if (over) {
        amount.setAttribute("aria-invalid", "true");
        if (field && !error) {
          error = document.createElement("p");
          error.className = "x-field-error";
          error.id = `${amount.id}-error`;
          error.setAttribute("role", "alert");
          field.append(error);
          amount.setAttribute("aria-describedby", error.id);
        }
        if (error) error.textContent = `Not enough ${ticker}: the most you can send is ${format(Math.max(0, available - f))}`;
      } else {
        amount.removeAttribute("aria-invalid");
        if (error) {
          error.remove();
          const hint = field?.querySelector(".x-field-hint");
          if (hint?.id) amount.setAttribute("aria-describedby", hint.id);
        }
      }
    };
    const onClick = (event) => {
      if (!/** @type {Element} */ (event.target).closest("[data-x-max]")) return;
      amount.value = String(Math.max(0, available - fee()).toFixed(6)).replace(/\.?0+$/, "");
      update();
      amount.focus();
    };
    const onSubmit = (event) => {
      update();
      if (amount.getAttribute("aria-invalid") === "true") {
        event.preventDefault();
        amount.focus();
      }
    };
    form.addEventListener("input", update);
    form.addEventListener("change", update);
    form.addEventListener("click", onClick);
    form.addEventListener("submit", onSubmit);
    update();
    cleanups.push(() => {
      form.removeEventListener("input", update);
      form.removeEventListener("change", update);
      form.removeEventListener("click", onClick);
      form.removeEventListener("submit", onSubmit);
      form.removeAttribute("data-x-ready");
    });
  }
  return () => cleanups.forEach((fn) => fn());
}
