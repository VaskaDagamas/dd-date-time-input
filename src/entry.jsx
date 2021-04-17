import 'babel-polyfill'
import React 				from 'react'
import { HashRouter } 		from 'react-router-dom'
import { render } 			from 'react-dom'
import store				from './store'
import { Provider } 		from 'react-redux'
import App 					from 'components/app'
import {setMomentLocale}    from './store/languages.jsx'
window.coCSS = 'color: green; font-weight: bold;';
if (!window.location.origin) {
  	window.location.origin = window.location.protocol + "//" + window.location.hostname + (window.location.port ? ':' + window.location.port: '');
}
setMomentLocale();
render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById('app_mountpoint')
)

hideHtmlPreloader();
function hideHtmlPreloader() {
	let preloaderImg = document.getElementById('first_pre');
	preloaderImg?
	preloaderImg.style.display = 'none':
	console.log("%c can't hide preloader. preloaderImg - ", 'color: green; font-weight: bold;', preloaderImg)
}






