import _ from 'lodash';
import './style.css';//styly, ktery nam zpracuje webpack(style-loader, css-loader) musime importovat
import Icon from './icon.png';//img, ktery nam zpracuje webpack(file-loader) musime importovat
import printMe from './print.js';//import funkce

function component() {
  const element = document.createElement('div');
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');
  element.classList.add('hello');

  const btn = document.createElement('button');
  btn.innerHTML = 'Click me and check the console!';
  btn.onclick = printMe;
  element.appendChild(btn);

//   const myIcon = new Image();
//   myIcon.src = Icon;
//   element.appendChild(myIcon);

  return element;
}
document.body.appendChild(component());

if (module.hot) {//soucast HMR
       module.hot.accept('./print.js', function() {
         console.log('Accepting the updated printMe module!');
         printMe();
       })
     }