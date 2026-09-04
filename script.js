function validateNric(value) {
  if (value === "") return { message: "", valid: false };
  if (/[a-z]/.test(value)) return { message: "❌ Lowercase involved", valid: false };

  const nric = value.trim();
  if (!/^[ST][0-9]{7}[A-Z]$/.test(nric)) {
    return { message: "❌ Invalid", valid: false };
  }

  const weights = [2, 7, 6, 5, 4, 3, 2];
  const weightedSum = weights.reduce(
    (sum, weight, index) => sum + Number(nric[index + 1]) * weight,
    nric[0] === "T" ? 4 : 0,
  );
  const expectedLetter = "JZIHGFEDCBA"[weightedSum % 11];
  const valid = nric.at(-1) === expectedLetter;

  return { message: valid ? "✅ Valid" : "❌ Invalid", valid };
}

const form = document.querySelector("#validator-form");
const input = document.querySelector("#nric");
const result = document.querySelector("#result");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const check = validateNric(input.value);
  result.textContent = check.message;
  result.className = check.message ? `result ${check.valid ? "valid" : "invalid"}` : "result";
});
