import * as XLSX from "xlsx";

/**
 * Convert XLSX file into SurveyJS JSON forms
 * Each sheet -> one form
 */
export function convertXlsxToSurveyJS(filePath) {
  const workbook = XLSX.readFile(filePath);
  const forms = [];

  workbook.SheetNames.forEach((sheetName) => {
    const sheet = workbook.Sheets[sheetName];
    const json = XLSX.utils.sheet_to_json(sheet, { header: 1 });

    const survey = {
      title: sheetName,
      pages: [
        {
          name: "page1",
          elements: [],
        },
      ],
    };

    json.forEach((row, rowIndex) => {
      if (!row || row.length === 0) return;

      const [label, type, name, expression] = row;

      let element = {
        name: name || `q${rowIndex}`,
        title: label || `Question ${rowIndex + 1}`,
        type: mapType(type),
      };

      if (expression) {
        element.type = "expression";
        element.expression = excelToSurveyExpression(expression);
      }

      survey.pages[0].elements.push(element);
    });

    forms.push(survey);
  });

  return forms;
}

function mapType(type) {
  if (!type) return "text";
  const lower = type.toString().toLowerCase();
  if (["text", "string"].includes(lower)) return "text";
  if (["number", "int", "float"].includes(lower)) return "text";
  if (["boolean", "yesno"].includes(lower)) return "boolean";
  if (["dropdown", "select"].includes(lower)) return "dropdown";
  return "text";
}

function excelToSurveyExpression(formula) {
  if (!formula.startsWith("=")) return formula;
  return formula
    .substring(1)
    .replace(/[A-Z]+\d+/g, (cellRef) => `{${cellRef}}`);
}
