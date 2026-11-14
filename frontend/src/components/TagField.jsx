import { useState } from "react";

// Tag input with suggestions. Duplicate values are ignored regardless of case.
export default function TagField({ id, label, values, options, onChange, placeholder }) {
  const [text, setText] = useState("");

  function addValue(value) {
    const trimmedValue = value.trim();

    if (!trimmedValue) {
      return;
    }

    const alreadyAdded = values.some(
      (item) => item.toLowerCase() === trimmedValue.toLowerCase()
    );

    if (!alreadyAdded) {
      onChange([...values, trimmedValue]);
    }

    setText("");
  }

  return (
    <div className="profile-field">
      <label htmlFor={id}>{label}</label>

      <div className="profile-tags">
        {values.map((value) => (
          <span className="profile-tag" key={value}>
            {value}
            <button
              type="button"
              aria-label={`Remove ${value}`}
              onClick={() => onChange(values.filter((item) => item !== value))}
            >
              ×
            </button>
          </span>
        ))}

        <input
          id={id}
          list={`${id}-options`}
          value={text}
          placeholder={placeholder}
          aria-describedby={`${id}-hint`}
          onChange={(event) => {
            const value = event.target.value;
            setText(value);

            if (options.includes(value)) {
              addValue(value);
            }
          }}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addValue(text);
            }
          }}
        />

        <datalist id={`${id}-options`}>
          {options.map((option) => (
            <option key={option} value={option} />
          ))}
        </datalist>

        {text.trim() && (
          <button
            type="button"
            className="profile-add"
            onClick={() => addValue(text)}
          >
            Add
          </button>
        )}
      </div>

      <p id={`${id}-hint`} className="profile-field-hint">
        Choose a suggestion or type a value and select Add.
      </p>
    </div>
  );
}
