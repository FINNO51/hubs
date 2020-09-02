import React, { forwardRef, memo } from "react";
import PropTypes from "prop-types";
import classNames from "classnames";
import styles from "./ToggleInput.scss";

export const ToggleInput = memo(
  forwardRef(({ className, label, value, disabled, ...rest }, ref) => {
    return (
      <label className={classNames(styles.toggleInput, { [styles.disabled]: disabled }, className)}>
        {label && <span className={styles.label}>{label}</span>}
        <div className={classNames(styles.track, { [styles.on]: !!value })}>
          <div className={styles.button} />
        </div>
        <input type="checkbox" {...rest} disabled={disabled} checked={!!value} value={value} ref={ref} />
      </label>
    );
  })
);

ToggleInput.propTypes = {
  value: PropTypes.bool,
  className: PropTypes.string
};
