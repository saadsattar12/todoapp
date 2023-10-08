import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getDatabase,ref,set, push,  update,remove, onChildAdded,} from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";
  // TODO: Add SDKs for Firebase products that you want to use
  // https://firebase.google.com/docs/web/setup#available-libraries

  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  var firebaseConfig = {
    apiKey: "AIzaSyBuDeEClh8xM8TAz5UI8tjzW9i7ia6Osgs",
    authDomain: "todo-app-5de50.firebaseapp.com",
    databaseURL: "https://todo-app-5de50-default-rtdb.firebaseio.com",
    projectId: "todo-app-5de50",
    storageBucket: "todo-app-5de50.appspot.com",
    messagingSenderId: "654076718942",
    appId: "1:654076718942:web:a8aa29988339bb6c1a29cf",
    measurementId: "G-QVDWKPSN66"
  };

  // Initialize Firebase
  var app = initializeApp(firebaseConfig);
  var DATABASE = getDatabase(app);


  var input = document.getElementById("inp");
  var list = document.getElementById("list");
  var todoList = [];

 
  window.add = function() {
    var inputValue = input.value.trim();
    if (inputValue === "") {
      alert("Enter your value");
      return;
    }
    
    var userItem = {
      item: inputValue
    };
    
   
    todoList.push(userItem);
    
   
    input.value = "";
    
    
    var newItemRef = push(ref(DATABASE, "todoList"));
    var newItemKey = newItemRef.key;
    userItem.id = newItemKey;
    set(ref(DATABASE, "todoList/" + newItemKey), userItem);
    
    render();
  }


  function render() {
    list.innerHTML = "";
    for (var i = 0; i < todoList.length; i++) {
      list.innerHTML += `
        <li>${todoList[i].item}
          <button  id = "btn" onclick="edit(${i}, '${todoList[i].id}')">Edit</button>
          <button id = "btn" onclick="remove(${i}, '${todoList[i].id}')">Remove</button>
        </li>
      `;
    }
  }

  
  window.edit = function(index, id) {
    var newItem = prompt('Enter your value', todoList[index].item);
    if (newItem === null || newItem.trim() === "") {
      return; 
    }
    todoList[index].item = newItem;
    update(ref(DATABASE, `todoList/${id}`), { item: newItem });
    render();
  }

  
  window.remove = function(index, id) {
    todoList.splice(index, 1);
    remove(ref(DATABASE, `todoList/${id}`));
    render();
  }

window. clearList = function(index,id){
    todoList = [];
    var clearList = ref(DATABASE, "todoList");
    set(clearList, null);
    render();  
    

}

function getDataFromDatabase() {
  var reference = ref(DATABASE, "todoList");
  onChildAdded(reference, function (data) {
    render(data.val());
  });
}



window.onload = function () {
  getDataFromDatabase();
};


