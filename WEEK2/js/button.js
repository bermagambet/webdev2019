
var count = 0;
/*function xd(ev) {
    if (ev.target.tagName === 'LI') {
      ev.target.classList.toggle('checked');
    }
}
document.querySelector('    list').addEventListener('click', xd, false);
*/
function addTask(){
    var li = document.createElement("li");
    var text = document.getElementById("textbox").value;
    var finalText = document.createTextNode(text);
    li.appendChild(finalText);
    li.style.width="300px";
    li.className ="checked";
    li.style.marginLeft="520px";
    li.style.marginTop="10px";
    count++;
    //li.style.backgroundColor = "wheat";
    document.getElementById("textbox").value ="";
    document.getElementById("list").appendChild(li);


  var span = document.createElement("SPAN");
  var txt = document.createTextNode("\u00D7");
  span.className = "close";
  span.onclick = function() {
    var div = this.parentElement;
    console.log(div);
    div.style.display = "none";
  };
  console.log(txt);
  span.appendChild(txt);
  li.appendChild(span);
  var checkbox = document.createElement('input'); 
    checkbox.type= 'checkbox';
    checkbox.className = "checkb";
  checkbox.onclick = function(){
    var div1 = this.parentElement;
    console.log(div1);
    var span1 = document.createElement("SPAN");
    var txt1 = document.createTextNode(text);
    span1.className = "lineth";
    span1.appendChild(txt1);
    li.removeChild(finalText);
    //var finText = document.createTextNode(text);
    //fin Text.className = "ddd";
    li.appendChild(span1);
    //div1.style.
    checkbox.disabled = true;
}
li.appendChild(checkbox);

  /*for (i = 0; i < close.length; i++) {
    close[i].onclick = function() {
      var div = this.parentElement;
      div.style.display = "none";
    }*/
} 


