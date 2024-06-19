import React, { useState } from "react";

import styles from "./index.module.scss";
import { useCallback } from "react";

export const InputPlus = ({ onAdd, }) => {

  const [inputValue, setInputValue] = useState("");

  const onAddMemoizedCallback = useCallback(() => {
    onAdd(inputValue);
    setInputValue("");
  }, [inputValue])
  return (
    <div className={styles.inputPlus}>
      <input
        type="text"
        value={inputValue}
        className={styles.inputPlusValue}
        placeholder="Type here..."
        onChange={(event) => {
          setInputValue(event.target.value);
        }}
        onKeyDown={(event) => {
          if (event.key === "Enter") {
            onAddMemoizedCallback()
          }
        }}
      />
      <button
        onClick={onAddMemoizedCallback}
        aria-label="Add"
        className={styles.inputPlusButton}
      />
    </div>
  );
};
