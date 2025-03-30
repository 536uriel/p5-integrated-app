//for p5 canvas
var callback = () => { };
function setup() {
    createCanvas(400, 400);

}



function draw() {
    background(225);
    callback();
}


// Initialize CodeMirror
var editor1 = CodeMirror.fromTextArea(document.getElementById("editor1"), {
    mode: "javascript",  // Syntax highlighting mode
    lineNumbers: true,   // Show line numbers
    theme: "default"
});


var editor2 = CodeMirror.fromTextArea(document.getElementById("editor2"), {
    mode: "javascript",  // Syntax highlighting mode
    lineNumbers: true,   // Show line numbers
    theme: "default"

});

editor1.setSize(500, 150);
editor2.setSize(500, 150);

// Function to execute code as online console
function runCode() {
    try {
        // Get the code from CodeMirror
        var preCode = editor1.getValue();
        var code = editor2.getValue();

        // Redirect console.log to display in the output div
        var outputDiv = document.getElementById("output");
        outputDiv.innerHTML = ''; // Clear previous output

        var originalConsoleLog = console.log;
        console.log = function (message) {
            outputDiv.innerHTML += message + '<br>';
            originalConsoleLog.apply(console, arguments);
        };


        //for the output div 
        new Function(preCode)();
        new Function(code)();

        // Run the JavaScript code dinamicly 
        /*
        new Function(code)();
        is equelevant to: 
        function(){
            console.log("code")
        }
        */
        callback = () => {
            //for execute p5 code
            new Function(code)();
        }



        // Restore original console.log
        console.log = originalConsoleLog;
    } catch (error) {
        document.getElementById("output").innerHTML = "Error: " + error.message;
    }
}
