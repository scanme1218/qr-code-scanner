var snackbar = {};
var snackBarElement = document.querySelector('.app__snackbar');
var snackbarMsg = null;
var deviceServiceURL = 'http://www.google.com';

//To show notification
snackbar.show = (msg, options = 4000) => {
  if (!msg) return;

  if (snackbarMsg) {
    snackbarMsg.remove();
  }

  if (msg.beginsWith('http') || msg.beginsWith('https')) {
    window.open(msg, '_blank');
  } else if (msg.beginsWith('deviceID:')) {
    window.open(deviceServiceURL + '?' + msg, '_blank');
  }

  snackbarMsg = document.createElement('div');
  snackbarMsg.className = 'app__snackbar-msg';
  snackbarMsg.textContent = msg;
  snackBarElement.appendChild(snackbarMsg);

  //Show toast for 3secs and hide it
  setTimeout(() => {
    snackbarMsg.remove();
  }, options);
};

exports.snackbar = snackbar;
