import React, { useState, useRef, useLayoutEffect } from "react";

import styles from "./index.module.scss";

export const InputTask = ({ title, id, onDone, onRemove, onEdited }) => {
  const [checked, setChecked] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [value, setValue] = useState(title);
  const editTitleInputRef = useRef(null);

  useLayoutEffect(() => {
    if (isEditMode && editTitleInputRef) {
      editTitleInputRef.current.focus;
    }
  }, [isEditMode]);

  return (
    <div className={styles.inputTask}>
      <label className={styles.inputTaskLabel}>
        <input
          type="checkbox"
          checked={checked}
          className={styles.inputTaskCheckbox}
          onChange={(event) => {
            setChecked(event.target.checked);
            setTimeout(() => {
              onDone(id);
            }, 300);
          }}
        />
        {isEditMode ? (
          <input
            ref={editTitleInputRef}
            className={styles.inputTaskTitleEdit}
            value={value}
            onChange={(event) => {
              setValue(event.target.value);
            }}
          />
        ) : (
          <h3 className={styles.inputTaskTitle}>{title}</h3>
        )}
      </label>

      {isEditMode ? (
        <button
          onClick={() => {
            // setIsEditMode(!isEditMode);
            onEdited(id, value);
            setIsEditMode(false);
          }}
          aria-label="Save"
          className={styles.inputTaskSave}
        />
      ) : (
        <button
          onClick={() => {
            setIsEditMode(!isEditMode);
          }}
          aria-label="Edit"
          className={styles.inputTaskEdit}
        />
      )}

      <button
        onClick={() => {
          if (confirm("Are you sure?")) {
            onRemove(id);
          }
        }}
        aria-label="Remove"
        className={styles.inputTaskRemove}
      />
    </div>
  );
};

/* For Edit mode
<input
    className={styles.inputTaskTitleEdit}
/>

<button
    aria-label="Save"
    className={styles.inputTaskSave}
/>
*/
