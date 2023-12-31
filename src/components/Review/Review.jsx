import styles from "./styles.module.css";
import { Rating } from "../Rating/Rating";
import React from "react";
import { Size } from "../../constants/ui";
import classnames from "classnames";
import { useSelector } from "react-redux";
import { selectReviewById } from "../../store/review/selectors";
import { User } from "../User/User";

export const Review = ({ reviewId, className }) => {
  const review = useSelector((state) => selectReviewById(state, { reviewId }));

  if (!review) {
    return null;
  }

  return (
    <div className={classnames(styles.root, className)}>
      <div className={styles.mainInfo}>
        <User className={styles.user} userId={review.userId} />
        <Rating value={review.rating} size={Size.s} className={styles.rating} />
      </div>
      <span>{review.text}</span>
    </div>
  );
};
