const Toast = ({ message, visible }) => {
  return (
    <div id="toast" className={visible ? 'show' : ''}>
      {message}
    </div>
  );
};

export default Toast;
