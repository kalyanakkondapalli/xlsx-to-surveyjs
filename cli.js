#!/usr/bin/env node
import { program } from "commander";
import fs from "fs";
import { convertXlsxToSurveyJS } from "./index.js";

program
  .name("xlsx2surveyjs")
  .description("Convert XLSX sheets into SurveyJS JSON forms")
  .argument("<file>", "XLSX file path")
  .option("-o, --output <file>", "Output JSON file")
  .action((file, options) => {
    const forms = convertXlsxToSurveyJS(file);
    const out = JSON.stringify(forms, null, 2);
    if (options.output) {
      fs.writeFileSync(options.output, out);
      console.log(`Saved output to ${options.output}`);
    } else {
      console.log(out);
    }
  });

program.parse(process.argv);
