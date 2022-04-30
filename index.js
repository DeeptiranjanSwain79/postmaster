console.log("Post Man clone Project");

//Utility Functions
//1. Utility function to get element from string
function getElementFromString(str) {
    let div = document.createElement('div');
    div.innerHTML += str;
    return div.firstElementChild;
}

//Initializing number of parameters
let addedParamsCount = 0;

//Hide the parameters box initially
const parametersBox = document.getElementById('parametersBox');
parametersBox.style.display = "none";

//if the user clicks on params box, then hide the JSON box
let paramsRadio = document.getElementById('paramsRadio');
paramsRadio.addEventListener('click', () => {
    parametersBox.style.display = "block";
    document.getElementById("requestJsonBox").style.display = "none"
})

//if the user clicks on JSON box, then hide the arams box
let jsonRadio = document.getElementById('jsonRadio');
jsonRadio.addEventListener('click', () => {
    parametersBox.style.display = "none";
    document.getElementById("requestJsonBox").style.display = "block"
})

//If the user clicks on the + button add more parameters
let addParams = document.getElementById("addParams");
addParams.addEventListener("click", () => {
    let params = document.getElementById("params");
    let str = `<div class="d-flex flex-direction-row my-2">
                    <label for="staticEmail2">Parameter ${addedParamsCount + 2}</label>
                    <div class="col-auto" style="margin-left: 5%;">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter Key">
                    </div>
                    <div class="col-auto mx-2">
                        <input type="text" class="form-control" id="parameterKey${addedParamsCount + 2}" placeholder="Enter Parameter Value">
                    </div>
                    <button class="btn btn-primary mx-2 deleteParam"> - </button>
                </div>`;
    //Convert element to DOM mode
    let paramElement = getElementFromString(str);
    params.appendChild(paramElement);

    //Add an eventListener to remove the parameter on clicking the - button
    let deleteParam = document.getElementsByClassName("deleteParam");
    for (item of deleteParam) {
        item.addEventListener("click", (e) => {
            if (window.confirm(`Are you sure to delete the parameter`) == true) {
                e.target.parentElement.remove();
            }
        })
    }
    addedParamsCount++;
})

//If the user clicks on submit button
let submit = document.getElementById("submit");
submit.addEventListener('click', () => {
    //Show please wait response from user
    document.getElementById('responsePrism').value = "Please Wait...Fetching response..."

    //Fetch all the values that user has entered
    let url = document.getElementById("url").value;
    let requestType = document.querySelector("input[name='requestType']:checked").value;
    let contentType = document.querySelector("input[name='ContentType']:checked").value;


    //If user has used params ind=stead of Json, collect all parameters as an object
    if (contentType == 'params') {
        data = {};
        for (i = 0; i < addedParamsCount; i++) {
            if ((document.getElementById('parameterKey' + (i + 1)) != undefined) && (document.getElementById('parameterValue' + (i + 1)) != undefined)) {
                let key = document.getElementById('parameterKey' + (i + 1)).value;
                let value = document.getElementById('parameterValue' + (i + 1)).value;
                data[key] = value;
            }
            console.log(data.key);
        }
        data = JSON.stringify(data);
    } else {
        data = document.getElementById('requestJsonText').value;
    }
    //Log all the values in console
    console.log(url, requestType, contentType, data);


    // if request type is get, invoke fetch api to get a request
    if (requestType == 'GET') {
        fetch(url, {
            method: 'GET',
        }).then(response => response.text())
            .then((text) => {
                document.getElementById('responsePrism').innerHTML = text;
                // document.getElementById('responseJsonText').value = text;
                Prism.highlightAll();
            })
    }else if(requestType == 'POST'){
        fetch(url, {
            method: 'POST',
            body: data,
            headers: {
                "Content-type": "application/json; charset=UTF-8"
            }
        }).then(response => response.text())
            .then((text) => {
                // document.getElementById('responseJsonText').value = text;
                document.getElementById('responsePrism').innerHTML = text;
                // console.log(text);
        })

    }
})




/*

For GET********************
https://randomuser.me/api

https://jsonplaceholder.typicode.com/todos/1

https://jsonplaceholder.typicode.com/posts


*/

/*

For POST**************
1. https://dummy.restapiexample.com/api/v1/create
    {"name":"test","salary":"123","age":"23"}



2. https://jsonplaceholder.typicode.com/posts
    {"title": "foo", "body": "bar", "userid": 1}

*/


