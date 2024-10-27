function nextStep(currentStep) {
    const role = document.getElementById("role").value;
    
    // Step 1 -> Step 2
    if (currentStep === 1) {
        if (role === "student") {
            document.getElementById("step-1").classList.remove("active");
            document.getElementById("step-2-student").classList.add("active");
            document.getElementById("step2").classList.add("active");
        } else if (role === "alumni") {
            document.getElementById("step-1").classList.remove("active");
            document.getElementById("step-2-alumni").classList.add("active");
            document.getElementById("step2").classList.add("active");
        } else {
            alert("Please select a role.");
        }
    }
  
    // Step 2 -> Step 3
    else if (currentStep === 2) {
        if (role === "student") {
            document.getElementById("step-2-student").classList.remove("active");
            document.getElementById("step-3-student").classList.add("active");
            document.getElementById("step3").classList.add("active");
        } else if (role === "alumni") {
            document.getElementById("step-2-alumni").classList.remove("active");
            document.getElementById("step-3-alumni").classList.add("active");
            document.getElementById("step3").classList.add("active");
        }
    }
  }
  