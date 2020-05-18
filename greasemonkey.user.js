// ==UserScript==
// @name set-font-size
// @description For better control over the browser's current font size 
// @version 0.1
// @author Gardhr
// @license MIT
// @include *
// @icon https://github.com/gardhr/set-font-size/blob/master/src/greasemonkey.gif
// @run-at document-end
// @grant none
// ==/UserScript==
/*

Copyright (c) 2000 Gardhr

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/
/*!	
* FitText.js 1.0 jQuery free version
*
* Copyright 2011, Dave Rupert http://daverupert.com 
* Released under the WTFPL license 
* http://sam.zoy.org/wtfpl/
* Modified by Slawomir Kolodziej http://slawekk.info
*
* Date: Tue Aug 09 2011 10:45:54 GMT+0200 (CEST)
*/

function get_size()
{
 return localStorage.getItem('size').valueOf() | 0
}

var size = get_size()
var step = 2;
var minimum = 5;
var maximum = 80;

function visit(element)
{

 function resize()
 {
  if(element.style)
   element.style.fontSize = get_size() + 'px';
 }

 function subscribe(event) 
 {
  if(window.addEventListener)
   window.addEventListener(event, resize, false);
  else
   window.attachEvent('on' + event, resize);
 }

 resize();

 subscribe('resize');
 subscribe('orientationchange');
 subscribe('visibilitychange');
 subscribe('focus');

 for(let member in element)
  if(element.hasOwnProperty(member))
   visit(element[member]);

 const length = element.length | 0;
 for(let index = 0; index < length; ++index)
  visit(element[index]);
}

function scale(amount)
{
 size += amount;
 if(size < minimum)
  size = minimum;
 else if(size > maximum)
  size = maximum
 localStorage.setItem('size', size);
 window.dispatchEvent(new Event('resize'));
}

function increase()
{
 scale(step);
}

function decrease()
{
 scale(-step);
}

let offset = '10px'

let div = document.createElement('div');
div.style.position = 'fixed';
div.style.top = 0;
div.style.left = 0;
document.body.appendChild(div);

let style = 
{
 padding: offset, 
 border: '2px solid #000', 
 'border-radius': offset
};

let increaser = document.createElement('button');
increaser.innerHTML = '▲';
for(let setting in style)
 increaser.style[setting] = style[setting];
increaser.onclick = increase;
div.appendChild(increaser);

let decreaser = document.createElement('button');
decreaser.innerHTML = '▼';
for(let setting in style)
 decreaser.style[setting] = style[setting];
decreaser.onclick = decrease;
div.appendChild(decreaser);

visit(document.body);





