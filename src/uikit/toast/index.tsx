import React from 'react';
import topView from 'rn-topview';
import ToastContainer from './ToastContainer';

function notice(content, type, duration = 3, onClose, mask = false, multipleStyle = false) {
  topView.remove();
  function animationEnd() {
    topView.remove();
  }
  topView.set(
    <ToastContainer
      content={content}
      duration={duration}
      onClose={onClose}
      type={type}
      mask={mask}
      onAnimationEnd={animationEnd}
      multipleStyle={multipleStyle}
    />,
  );
}

export default {
  SHORT: 3,
  LONG: 8,
  show(content: string, duration?: number, mask?: boolean, multipleStyle?: boolean) {
    return notice(content, 'info', duration, () => {
    }, mask, multipleStyle);
  },
  info(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
    return notice(content, 'info', duration, onClose, mask);
  },
  success(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
    return notice(content, 'success', duration, onClose, mask);
  },
  fail(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
    return notice(content, 'fail', duration, onClose, mask);
  },
  offline(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
    return notice(content, 'offline', duration, onClose, mask);
  },
  loading(content: string, duration?: number, onClose?: () => void, mask?: boolean) {
    return notice(content, 'loading', duration, onClose, mask);
  },
  hide() {
    topView.remove();
  },
};
