"use server";

export async function emergencyShutOff() {
  console.log("EMERGENCY SHUT OFF SIGNAL SENT TO REAL MOTOR");
  // Simulate a delay or an API call
  await new Promise(resolve => setTimeout(resolve, 1000));
  return { success: true, message: "Emergency shut-off signal initiated." };
}

export async function submitPythonCode(code: string) {
  console.log("Python code submitted to backend:");
  console.log(code);
  // Simulate processing or execution
  await new Promise(resolve => setTimeout(resolve, 500));
  return { success: true, message: "Python code received by backend.", relevantPart: code.substring(0, 100) + (code.length > 100 ? "..." : "") };
}
