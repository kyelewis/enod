import { access, constants, readFile, writeFile, unlink } from "../src/fs";

access("/virtual/my-file", (error) => {
  console.log(error?.message || "OK");
  writeFile("/virtual/my-file", "testing", (error) => {
    console.log(error?.message || "OK");
    access("/virtual/my-file", (error) => {
      console.log(error?.message || "OK");
      readFile("/virtual/my-file", (error, data) => {
        console.log(error?.message || data);
        unlink("/virtual/my-file", (error) => {
          console.log(error?.message || "OK");
          readFile("/virtual/my-file", (error, data) => {
            console.log(error?.message || data);
          });
        });
      });
    });
  });
});
