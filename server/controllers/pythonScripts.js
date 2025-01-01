import { spawn } from "child_process";
import Student from "../models/Student.js";
import { io } from "../index.js";

let pythonProcess = null;
let count = 0;

async function executePythonScript(scriptPath, processOutput = false, sub) {
  count++;
  return new Promise((resolve, reject) => {
    pythonProcess = spawn("python", ["-u", scriptPath]);

    if (processOutput) {
      pythonProcess.stdout.on("data", async (data) => {
        try {
          const registerNo = data.toString().trim();

          const student = await Student.findOne({ registerNo });
          if (student) {
            console.log("Student found:", student);
            io.emit(
              "attendance-update",
              `Attendance marked for: ${student.name}`
            );
            const today = new Date();
            const formattedDate =
              today.getFullYear() +
              "-" +
              String(today.getMonth() + 1).padStart(2, "0") +
              "-" +
              String(today.getDate()).padStart(2, "0");

            student.attendance.push({
              date: formattedDate,
              subject: sub,
              present: true,
            });
            await student.save();
          } else {
            io.emit("error", "Fake face detected");
          }
        } catch (error) {
          io.emit(
            "error",
            error.message.toString().length > 100 ? "" : error.message
          );
        }
      });
    }

    pythonProcess.stderr.on("data", (data) => {
      if (!(data.toString().length > 100)) {
        io.emit("error", data.toString());
      }
    });

    pythonProcess.on("close", (code) => {
      if (count == 1) {
        io.emit("process-ended", `Images Loaded Successfully`);
      }

      pythonProcess = null;
      if (code === 0) resolve();
      else reject(new Error(`Successfully stopped capturing attendance`));
    });
  });
}

export const stopPythonScript = () => {
  if (pythonProcess) {
    pythonProcess.kill();
    return true;
  }
  return false;
};

export const runPythonScripts = async (sub) => {
  try {
    // Run EncodeGenerator.py silently

    await executePythonScript("ai/EncodeGenerator.py", false);

    // Run main.py and process its output
    await executePythonScript("ai/main.py", true, sub);
  } catch (error) {
    console.error("Error executing Python scripts:", error);
    throw error;
  }
};
