// Simple HTML include loader: elements with `data-include="path"` will be replaced
document.addEventListener('DOMContentLoaded', function () {
  var nodes = document.querySelectorAll('[data-include]');
  nodes.forEach(function (el) {
    var path = el.getAttribute('data-include');
    if (!path) return;
    fetch(path).then(function (r) { return r.text(); }).then(function (html) {
      el.innerHTML = html;
    }).catch(function (err) {
      el.innerHTML = '<!-- include failed: ' + path + ' -->';
      console.error('Include failed', path, err);
    });
  });
});
