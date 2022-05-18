import React, { useEffect } from "react";

// Global store
import { useStore } from "store";

import { Alert } from "react-bootstrap";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import styles from "./notifications.module.scss";

const Notifications = () => {
  const {
    state: {
      // Notifications data
      notifications,
    },
    actions,
  } = useStore();

  useEffect(() => {
    if (notifications?.length > 0) {
      setTimeout(() => {
        actions.removeNotification(notifications[notifications?.length - 1].id);
      }, 5000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [notifications]);

  const messages = notifications?.map((notification) => (
    <CSSTransition
      key={notification.id}
      onDoubleClick={() => actions.removeNotification(notification.id)}
      classNames={{
        enter: styles.itemEnter,
        enterActive: styles.itemEnterActive,
        exitActive: styles.itemLeaveActive,
      }}
      className={
        notification.position === "top"
          ? styles.positionTop
          : styles.positionBottom
      }
      timeout={500}
    >
      <Alert variant={notification.type}>{notification.msg}</Alert>
    </CSSTransition>
  ));

  return (
    <TransitionGroup className={styles.box} style={{ zIndex: 10000 }}>
      {messages}
    </TransitionGroup>
  );
};

export default Notifications;
